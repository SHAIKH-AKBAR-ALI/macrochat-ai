"""Export the food set powering /foods/ + /compare/ to a JSON the Astro build
imports. USDA (from usda_foods) + a hand-picked set of well-known INDB dishes.

  python scripts/export_seo_data.py   ->  frontend/src/data/seo-foods.json

USDA_LIMIT caps how many auto-slugged USDA foods ship as pages (the curated ~75
always ship). Compare-pair count is driven by POPULAR in src/lib/seo.ts.
"""
import json
import re
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB = ROOT / "data" / "indb.sqlite"
OUT = ROOT / "frontend" / "src" / "data" / "seo-foods.json"

USDA_LIMIT = 400   # auto rows; the curated ~75 are always included
MAX_PER_BASE = 2   # e.g. keep "apple" + "apples-dried", not 8 apple variants

# processed / branded / composite names — never SEO pages
NOISE = re.compile(
    r"\b(entree|dinner|pot pie|bologna|composite|luncheon|formula|gravy|"
    r"pudding|drink mix|imitation|baby|infant|puree|strained|junior|"
    r"restaurant|fast food)\b", re.I
)
# a clean whole-food name: Title word, then 0-2 lowercase words, optional ", qualifier"
CLEAN = re.compile(r"^[A-Z][a-z]+([ -][a-z]+){0,2}(, [a-z][a-z ]{2,20})?$")
BRAND = re.compile(r"[A-Z]{3,}|['’]S\b")

INDB_PICKS = {
    "roti": "Chapati/Roti", "naan": "Naan", "idli": "Idli", "sambar": "Sambar",
    "masala-dosa": "Masala dosa", "plain-dosa": "Plain dosa",
    "vegetable-biryani": "Vegetable biryani/biriyani",
    "mutton-biryani": "Mutton biryani/biriyani", "poha": "Poha",
    "plain-pulao": "Plain pulao", "mixed-vegetable-pulao": "Mixed vegetable pulao",
    "rajma": "Kidney bean curry (Rajmah curry)", "dal-makhani": "Dal makhani",
    "paratha": "Plain parantha/paratha",
    "aloo-paratha": "Potato parantha/paratha (Aloo ka parantha/paratha)",
    "samosa": "Potato samosa (Aloo ka samosa)",
    "gajar-halwa": "Carrot halwa (Gajar ka halwa)",
    "gulab-jamun": "Gulab Jamun with khoya",
    "sweet-lassi": "Sweet Lassi (Meethi lassi)", "butter-chicken": "Butter chicken",
    "chicken-curry": "Chicken curry",
    "palak-paneer": "Spinach paneer (Palak paneer)",
    "khichdi": "Plain khitchdi (Plain khichri/khichdi)", "rice-upma": "Rice upma",
}

CURATED_SLUGS = None  # filled from scripts.build_usda_db import


def _curated_set():
    import importlib.util
    spec = importlib.util.spec_from_file_location("bu", ROOT / "scripts" / "build_usda_db.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return set(mod.CURATED)


def main():
    curated = _curated_set()
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    out = []

    usda = con.execute(
        "SELECT slug,name,kcal,protein,carb,fat,fiber,sugar,sodium,satfat FROM usda_foods"
    ).fetchall()
    auto = []
    for r in usda:
        rec = {
            "slug": r["slug"], "name": r["name"], "source": "USDA",
            "kcal": round(r["kcal"], 1), "protein": round(r["protein"], 1),
            "carb": round(r["carb"], 1), "fat": round(r["fat"], 1),
            "fiber": round(r["fiber"], 1), "sugar": round(r["sugar"], 1),
            "sodium": round(r["sodium"]), "satfat": round(r["satfat"], 1),
        }
        if r["slug"] in curated:
            out.append(rec)
        elif (not NOISE.search(r["name"]) and not BRAND.search(r["name"])
              and CLEAN.match(r["name"])):
            auto.append(rec)
    # cap variants per primary word, then take the alpha-first N
    auto.sort(key=lambda x: x["name"].lower())
    per_base: dict[str, int] = {}
    kept = []
    for rec in auto:
        base = rec["slug"].split("-")[0]
        if per_base.get(base, 0) >= MAX_PER_BASE:
            continue
        per_base[base] = per_base.get(base, 0) + 1
        kept.append(rec)
    out += kept[:USDA_LIMIT]

    for slug, name in INDB_PICKS.items():
        row = con.execute(
            "SELECT name,kcal,protein,carb,fat FROM foods WHERE lower(name)=lower(?)",
            (name,),
        ).fetchone()
        if not row:
            print(f"  ! INDB miss: {name!r}")
            continue
        disp = row["name"].split("/")[0].split("(")[0].strip()
        out.append({
            "slug": slug, "name": disp, "source": "INDB",
            "kcal": round(row["kcal"], 1), "protein": round(row["protein"], 1),
            "carb": round(row["carb"], 1), "fat": round(row["fat"], 1),
            "fiber": None, "sugar": None, "sodium": None, "satfat": None,
        })

    con.close()
    out.sort(key=lambda x: x["name"].lower())
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=0))
    u = sum(1 for x in out if x["source"] == "USDA")
    print(f"wrote {OUT}  ({len(out)} foods: {u} USDA, {len(out) - u} INDB)")


if __name__ == "__main__":
    main()
