"""Export the food set powering the /foods/ + /compare/ SEO pages to a JSON the
Astro build imports. Combines usda_foods (R10 seed) with a hand-picked set of
well-known INDB dishes.

  python scripts/export_seo_data.py   ->  frontend/src/data/seo-foods.json
"""
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB = ROOT / "data" / "indb.sqlite"
OUT = ROOT / "frontend" / "src" / "data" / "seo-foods.json"

# slug -> exact INDB name (matched case-insensitively).
INDB_PICKS = {
    "roti": "Chapati/Roti",
    "naan": "Naan",
    "idli": "Idli",
    "sambar": "Sambar",
    "masala-dosa": "Masala dosa",
    "plain-dosa": "Plain dosa",
    "vegetable-biryani": "Vegetable biryani/biriyani",
    "mutton-biryani": "Mutton biryani/biriyani",
    "poha": "Poha",
    "plain-pulao": "Plain pulao",
    "mixed-vegetable-pulao": "Mixed vegetable pulao",
    "rajma": "Kidney bean curry (Rajmah curry)",
    "dal-makhani": "Dal makhani",
    "paratha": "Plain parantha/paratha",
    "aloo-paratha": "Potato parantha/paratha (Aloo ka parantha/paratha)",
    "samosa": "Potato samosa (Aloo ka samosa)",
    "gajar-halwa": "Carrot halwa (Gajar ka halwa)",
    "gulab-jamun": "Gulab Jamun with khoya",
    "sweet-lassi": "Sweet Lassi (Meethi lassi)",
    "butter-chicken": "Butter chicken",
    "chicken-curry": "Chicken curry",
    "palak-paneer": "Spinach paneer (Palak paneer)",
    "khichdi": "Plain khitchdi (Plain khichri/khichdi)",
    "rice-upma": "Rice upma",
}


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    out = []

    for r in con.execute("SELECT slug, name, kcal, protein, carb, fat FROM usda_foods ORDER BY name"):
        out.append({"slug": r["slug"], "name": r["name"], "source": "USDA",
                    "kcal": round(r["kcal"], 1), "protein": round(r["protein"], 1),
                    "carb": round(r["carb"], 1), "fat": round(r["fat"], 1)})

    for slug, name in INDB_PICKS.items():
        row = con.execute(
            "SELECT name, kcal, protein, carb, fat FROM foods WHERE lower(name) = lower(?)",
            (name,),
        ).fetchone()
        if not row:
            print(f"  ! INDB miss: {name!r}")
            continue
        # display name = the readable part before any slash / paren
        disp = row["name"].split("/")[0].split("(")[0].strip()
        out.append({"slug": slug, "name": disp, "source": "INDB",
                    "kcal": round(row["kcal"], 1), "protein": round(row["protein"], 1),
                    "carb": round(row["carb"], 1), "fat": round(row["fat"], 1)})

    con.close()
    out.sort(key=lambda x: x["name"])
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=1))
    print(f"wrote {OUT}  ({len(out)} foods: "
          f"{sum(1 for x in out if x['source']=='USDA')} USDA, "
          f"{sum(1 for x in out if x['source']=='INDB')} INDB)")


if __name__ == "__main__":
    main()
