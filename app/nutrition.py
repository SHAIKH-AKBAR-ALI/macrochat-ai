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
        return _row_to_hit(exact.iloc[0])
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
    return _row_to_hit(row)


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
                "pageSize": 5,
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
    foods = [
        f for f in foods
        if fuzz.token_set_ratio(base, f.get("description", ""),
                                processor=utils.default_process) >= USDA_NAME_MATCH
    ]
    # best match first; skip entries with no kcal (e.g. "Flour, quinoa") instead of bailing
    for best in sorted(foods, key=lambda f: fuzz.WRatio(query, f.get("description", "")),
                       reverse=True):
        macros = {}
        for n in best.get("foodNutrients", []):
            key = USDA_NUTRIENTS.get(str(n.get("nutrientNumber")))
            if key:
                macros[key] = n.get("value", 0.0)
        if "kcal" not in macros:
            continue
        return {
            "matched_name": best["description"],
            "source": "USDA",
            "kcal_100g": float(macros.get("kcal", 0)),
            "protein_100g": float(macros.get("protein_g", 0)),
            "carb_100g": float(macros.get("carb_g", 0)),
            "fat_100g": float(macros.get("fat_g", 0)),
        }
    return None


def lookup(name: str, prep_style: str | None = None) -> dict | None:
    """INDB first (with prep style), then USDA. None = unmatched, never invent."""
    queries = [f"{prep_style} {name}".strip(), name] if prep_style else [name]
    for q in queries:
        if hit := match_indb(q):
            return hit
    for q in queries:
        if hit := lookup_usda(q, name=name):
            return hit
    return None
