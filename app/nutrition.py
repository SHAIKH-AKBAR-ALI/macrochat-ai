"""Nutrition lookup: INDB (local xlsx) first, USDA FoodData Central fallback.

Per CLAUDE.md: this module is the ONLY source of truth for macro numbers.
"""
from pathlib import Path

import httpx
import pandas as pd
from rapidfuzz import fuzz, process, utils

from app.config import settings

INDB_PATH = Path(__file__).resolve().parent.parent / "data" / "INDB.xlsx"

# ponytail: score cutoff is a calibration knob — lower it if real foods miss,
# raise it if garbage matches slip through. 88 keeps "chicken breast" from
# hitting "Chicken consomme" (WRatio 86) so it correctly falls through to USDA.
FUZZ_CUTOFF = 88

# Weak text->DB matches (score below this, 0-100 scale) must not silently auto-save —
# they set needs_confirmation. Scores by source: STAPLE=100, INDB=its WRatio (>=88 by
# the FUZZ_CUTOFF), USDA=100 if the match's primary phrase is the queried food else 50
# (found only inside another product, e.g. "Rice crackers"/"Oil, oat"). 70 sits in the
# gap so only the USDA "50" bucket is gated. ponytail: calibration knob.
MATCH_CONFIDENCE_MIN = 70

# Hand-maintained canonical macros for high-volume PLAIN COOKED staples, per 100g.
# Checked before INDB/USDA so a bare staple word never falls to weak fuzzy/relevance
# matching (the "rice" -> USDA "Rice crackers" bug). Deterministic: exact alias match
# only, so "rice crackers" / "rice flour" never resolve here. Extend from query logs
# as needed. Values from USDA SR Legacy cooked forms. NOTE roti/chapati are absent on
# purpose — INDB already matches them correctly ("Chapati/Roti", 202 kcal); a staple
# entry would override that curated value with a guess.
_STAPLE_ENTRIES: dict[str, dict] = {
    "cooked rice": {  # USDA: Rice, white, long-grain, regular, enriched, cooked
        "aliases": {"rice", "cooked rice", "plain rice", "plain cooked rice",
                    "white rice", "cooked white rice", "boiled rice", "steamed rice"},
        "kcal": 130.0, "protein": 2.7, "carb": 28.2, "fat": 0.3,
    },
    "cooked dal": {  # USDA: Lentils, mature seeds, cooked, boiled, without salt
        "aliases": {"dal", "daal", "dhal", "cooked dal", "plain dal", "boiled dal",
                    "lentils", "cooked lentils", "boiled lentils"},
        "kcal": 116.0, "protein": 9.0, "carb": 20.1, "fat": 0.4,
    },
}
_STAPLE_ALIAS = {a: name for name, e in _STAPLE_ENTRIES.items() for a in e["aliases"]}

# Token fallback: the LLM almost always QUALIFIES dal — "dal fry", "toor dal",
# "moong dal", "dal tadka", "yellow dal" — none are exact aliases, INDB has no plain
# dal, and USDA has no "dal fry", so they hit NO_MATCH. Any of these tokens in the
# name means the lentil-based dish; map to plain cooked dal. Checked AFTER INDB so a
# specific curated entry ("Dal Makhani", creamier/higher-cal) still wins. Rice is
# deliberately NOT token-matched — qualified rice ("fried rice", "rice crackers",
# "rice flour", "brown rice") is a genuinely different food, unlike qualified dal.
# ponytail: token containment for the dal family only; a "dal papad" (fried) would
# undercount — extend the block below only if such a case actually shows up.
_STAPLE_TOKENS = {"dal": "cooked dal", "daal": "cooked dal", "dhal": "cooked dal",
                  "lentil": "cooked dal", "lentils": "cooked dal"}


def _staple_hit(name: str) -> dict:
    e = _STAPLE_ENTRIES[name]
    return {
        "matched_name": name, "source": "STAPLE",
        "kcal_100g": e["kcal"], "protein_100g": e["protein"],
        "carb_100g": e["carb"], "fat_100g": e["fat"],
        "score": 100.0, "candidates": [],
    }


def match_staple(query: str) -> dict | None:
    """Exact alias match against the plain-staple table. Max confidence, no fuzz."""
    name = _STAPLE_ALIAS.get(" ".join(query.lower().split()))
    return _staple_hit(name) if name else None


def match_staple_token(query: str) -> dict | None:
    """Fallback: a dal-family token anywhere in the name -> plain cooked dal."""
    for w in query.lower().split():
        if name := _STAPLE_TOKENS.get(w):
            return _staple_hit(name)
    return None


USDA_SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search"
# USDA nutrient numbers for kcal/protein/fat/carbs
USDA_NUTRIENTS = {"208": "kcal", "203": "protein_g", "204": "fat_g", "205": "carb_g"}

_indb: pd.DataFrame | None = None


def load_indb() -> pd.DataFrame:
    global _indb
    if _indb is None:
        df = pd.read_excel(INDB_PATH, sheet_name="Nutrient Data")
        _indb = df[["food_name", "energy_kcal", "protein_g", "carb_g", "fat_g"]].dropna(
            subset=["food_name"]
        )
    return _indb


def _row_to_hit(row) -> dict:
    return {
        "matched_name": row["food_name"],
        "source": "INDB",
        "kcal_100g": float(row["energy_kcal"]),
        "protein_100g": float(row["protein_g"]),
        "carb_100g": float(row["carb_g"]),
        "fat_100g": float(row["fat_g"]),
    }


def match_indb(query: str) -> dict | None:
    df = load_indb()
    q = query.lower().strip()
    # exact pass: INDB names like "Chapati/Roti" or "Hot tea (Garam Chai)" —
    # match query against each alias split on "/" and parentheses
    aliases = df["food_name"].str.lower().str.replace(r"[()]", "/", regex=True)
    exact = df[aliases.str.split("/").apply(lambda parts: q in [p.strip() for p in parts])]
    if not exact.empty:
        return _row_to_hit(exact.iloc[0]) | {"score": 100.0, "candidates": []}
    hit = process.extractOne(
        query, df["food_name"], scorer=fuzz.WRatio, score_cutoff=FUZZ_CUTOFF
    )
    if hit is None:
        return None
    # WRatio scores substrings ~90, so "broccoli" hits "Cream of broccoli soup".
    # token_sort penalizes the length gap between an ingredient and a whole dish.
    # ponytail: 60 is a calibration knob like FUZZ_CUTOFF.
    if fuzz.token_sort_ratio(query, hit[0], processor=utils.default_process) < 60:
        return None
    # extractOne on a Series returns the index LABEL — .loc, not .iloc
    row = df.loc[hit[2]]
    # top alternative INDB names (for the confidence gate / future disambiguation UI)
    alts = process.extract(query, df["food_name"], scorer=fuzz.WRatio, limit=4)
    candidates = [a[0] for a in alts if a[0] != hit[0]][:3]
    return _row_to_hit(row) | {"score": float(hit[1]), "candidates": candidates}


# ponytail: calibration knob — how strongly the USDA description must contain the
# actual food name. Raise if junk slips through, lower if real foods get filtered.
USDA_NAME_MATCH = 70


def lookup_usda(query: str, name: str | None = None) -> dict | None:
    try:
        resp = httpx.get(
            USDA_SEARCH_URL,
            params={
                "api_key": settings.usda_api_key,
                "query": query,
                "dataType": ["Foundation", "SR Legacy"],
                # USDA relevance is weak for one-word queries ("apple" top-5 lacks
                # "Apples, raw") — fetch wide, rank locally
                "pageSize": 25,
            },
            timeout=10,
        )
        resp.raise_for_status()
    except httpx.HTTPError:
        return None
    foods = resp.json().get("foods", [])
    # The prep word ("boiled") must never outweigh the food itself: require the
    # food NAME in the description, or "boiled quinoa" matches "Chicken, feet, boiled".
    base = name or query

    # ponytail: crude singularizer — "Apples" vs "apple" otherwise fails exact-token
    # comparison; mangling is applied to both sides so it cancels out
    def _sing(w: str) -> str:
        return w[:-1] if w.endswith("s") else w

    def _norm(s: str) -> str:
        return " ".join(_sing(w) for w in utils.default_process(s).split())

    base_n = _norm(base)
    query_n = _norm(query)
    foods = [
        f for f in foods
        if fuzz.token_set_ratio(base_n, _norm(f.get("description", ""))) >= USDA_NAME_MATCH
    ]

    # token_set_ratio scores subsets 100, so "apple" passes for "Croissants, apple".
    # USDA convention: the primary food is the phrase before the first comma
    # ("Apples, raw, with skin" / "Rice flour, white"). Rank entries whose primary
    # phrase is fully covered by the query ahead of dishes/products that merely
    # contain the queried food (croissants, crackers, noodles, flour...).
    qwords = set(query_n.split()) | set(base_n.split())

    def rank(f):
        desc = f.get("description", "")
        primary = _norm(desc.split(",")[0]).split()
        primary_is_queried_food = primary and all(w in qwords for w in primary)
        # WRatio saturates at 90 on substrings — no signal. token_set rewards
        # covering the query's prep words; token_sort penalizes dish-length noise.
        desc_n = _norm(desc)
        score = fuzz.token_set_ratio(query_n, desc_n) + fuzz.token_sort_ratio(query_n, desc_n)
        return (0 if primary_is_queried_food else 1, -score)

    # best match first; skip entries with no kcal (e.g. "Flour, quinoa") instead of bailing
    ranked = sorted(foods, key=rank)
    for i, best in enumerate(ranked):
        macros = {}
        for n in best.get("foodNutrients", []):
            key = USDA_NUTRIENTS.get(str(n.get("nutrientNumber")))
            if key:
                macros[key] = n.get("value", 0.0)
        if "kcal" not in macros:
            continue
        # Confidence (0-100, comparable to INDB's WRatio): the real good-vs-bad signal
        # is whether the chosen match's PRIMARY phrase (before the first comma) is fully
        # covered by the query — "Apples, raw"/"Quinoa, cooked" (the food itself) vs
        # "Rice crackers"/"Oil, oat" (the food only as part of another product). A
        # fuzzy-string average can't tell these apart (a short query scores low on
        # token_sort even for a correct match). Coarse but honest: covered=confident,
        # not-covered=we could only find the food inside something else -> confirm.
        # ponytail: binary primary-coverage; refine the covered bucket only if a real
        # wrong match ever ranks group-0.
        primary = _norm(best.get("description", "").split(",")[0]).split()
        score = 100.0 if (primary and all(w in qwords for w in primary)) else 50.0
        candidates = [f["description"] for f in ranked[i + 1:i + 4]]
        return {
            "matched_name": best["description"],
            "source": "USDA",
            "kcal_100g": float(macros.get("kcal", 0)),
            "protein_100g": float(macros.get("protein_g", 0)),
            "carb_100g": float(macros.get("carb_g", 0)),
            "fat_100g": float(macros.get("fat_g", 0)),
            "score": float(score),
            "candidates": candidates,
        }
    return None


def lookup(name: str, prep_style: str | None = None) -> dict | None:
    """Staples first, then INDB (with prep style), then USDA. None = unmatched.

    Every hit carries "score" (0-100 match confidence) and "candidates" (alt names).
    """
    queries = [f"{prep_style} {name}".strip(), name] if prep_style else [name]
    for q in queries:
        if hit := match_staple(q):
            return hit
    for q in queries:
        if hit := match_indb(q):
            return hit
    # dal-family token fallback runs AFTER INDB so curated dishes (e.g. Dal Makhani)
    # win, but qualified dal INDB/USDA both miss ("dal fry") still resolves to plain dal
    for q in queries:
        if hit := match_staple_token(q):
            return hit
    for q in queries:
        if hit := lookup_usda(q, name=name):
            return hit
    return None
