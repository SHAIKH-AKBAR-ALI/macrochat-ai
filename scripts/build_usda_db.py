"""Fetch per-100g macros for a curated set of common global foods from USDA
FoodData Central, cache them, and load into data/indb.sqlite as `usda_foods`
(+ FTS5). One-time / occasional: run when the FOODS list changes.

  python scripts/build_usda_db.py

Runtime then resolves these offline (app/nutrition.lookup_usda_local); the live
FDC API stays as a fallback for the long tail. Raw results are cached to
data/usda_seed.json so the sqlite can be rebuilt without network.
"""
import json
import sqlite3
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from app.config import settings  # noqa: E402

DATA = Path(__file__).resolve().parent.parent / "data"
DB = DATA / "indb.sqlite"
CACHE = DATA / "usda_seed.json"
SEARCH = "https://api.nal.usda.gov/fdc/v1/foods/search"
NUTR = {"208": "kcal", "203": "protein", "204": "fat", "205": "carb"}

# slug -> search query. slug is the URL identity (/foods/<slug>-macros/).
FOODS = {
    "chicken-breast": "chicken breast cooked roasted",
    "chicken-thigh": "chicken thigh cooked roasted",
    "ground-beef": "ground beef cooked pan-browned 85",
    "salmon": "salmon cooked dry heat",
    "tuna": "tuna light canned in water drained",
    "shrimp": "shrimp cooked moist heat",
    "cod": "fish cod cooked dry heat",
    "pork-chop": "pork loin chop cooked broiled",
    "bacon": "pork bacon cooked pan-fried",
    "turkey-breast": "turkey breast roasted",
    "egg": "egg whole cooked hard-boiled",
    "egg-white": "egg white raw",
    "milk": "milk whole 3.25 milkfat",
    "skim-milk": "milk nonfat fluid",
    "greek-yogurt": "yogurt greek plain nonfat",
    "cheddar-cheese": "cheese cheddar",
    "mozzarella": "cheese mozzarella part skim",
    "cottage-cheese": "cheese cottage lowfat 2%",
    "butter": "butter salted",
    "olive-oil": "oil olive salad or cooking",
    "white-rice": "rice white long-grain cooked",
    "brown-rice": "rice brown long-grain cooked",
    "quinoa": "quinoa cooked",
    "oats": "oats raw",
    "whole-wheat-bread": "bread whole-wheat commercially prepared",
    "white-bread": "bread white commercially prepared",
    "pasta": "pasta cooked enriched",
    "potato": "potato flesh and skin baked",
    "sweet-potato": "sweet potato cooked baked in skin",
    "banana": "banana raw",
    "apple": "apple raw with skin",
    "orange": "orange raw all commercial varieties",
    "strawberries": "strawberries raw",
    "blueberries": "blueberries raw",
    "grapes": "grapes red or green raw",
    "mango": "mango raw",
    "pineapple": "pineapple raw all varieties",
    "watermelon": "watermelon raw",
    "avocado": "avocado raw all commercial varieties",
    "almonds": "nuts almonds",
    "peanut-butter": "peanut butter smooth",
    "walnuts": "nuts walnuts english",
    "cashews": "nuts cashew nuts dry roasted",
    "broccoli": "broccoli cooked boiled drained",
    "spinach": "spinach raw",
    "kale": "kale raw",
    "carrot": "carrots raw",
    "tomato": "tomatoes red ripe raw",
    "cucumber": "cucumber with peel raw",
    "onion": "onions raw",
    "bell-pepper": "peppers sweet red raw",
    "mushrooms": "mushrooms white raw",
    "cauliflower": "cauliflower raw",
    "green-peas": "peas green frozen cooked boiled drained",
    "corn": "corn sweet yellow cooked boiled drained",
    "zucchini": "squash summer zucchini includes skin raw",
    "lettuce": "lettuce romaine raw",
    "black-beans": "beans black mature seeds cooked boiled",
    "chickpeas": "chickpeas garbanzo cooked boiled",
    "kidney-beans": "beans kidney red mature seeds cooked boiled",
    "lentils": "lentils mature seeds cooked boiled",
    "tofu": "tofu firm prepared with calcium sulfate",
    "edamame": "edamame frozen prepared",
    "honey": "honey",
    "sugar": "sugars granulated",
    "maple-syrup": "syrups maple",
    "dark-chocolate": "chocolate dark 70-85% cacao solids",
    "cream-cheese": "cheese cream",
    "sour-cream": "cream sour cultured",
    "ham": "ham sliced regular",
    "sausage": "sausage pork cooked",
    "ground-turkey": "ground turkey cooked",
    "sardines": "fish sardine atlantic canned in oil drained",
    "peach": "peaches raw",
    "pear": "pears raw",
}


def fetch(query: str) -> dict | None:
    r = httpx.get(SEARCH, params={
        "api_key": settings.usda_api_key, "query": query,
        "dataType": ["Foundation", "SR Legacy"], "pageSize": 5,
    }, timeout=15)
    r.raise_for_status()
    for food in r.json().get("foods", []):
        m = {}
        for n in food.get("foodNutrients", []):
            k = NUTR.get(str(n.get("nutrientNumber")))
            if k:
                m[k] = round(float(n.get("value", 0)), 2)
        if "kcal" in m and m["kcal"] > 0:
            return {"usda_desc": food["description"],
                    "kcal": m["kcal"], "protein": m.get("protein", 0.0),
                    "carb": m.get("carb", 0.0), "fat": m.get("fat", 0.0)}
    return None


def label(slug: str) -> str:
    return slug.replace("-", " ").title()


def main():
    rebuild_only = "--from-cache" in sys.argv
    rows: dict[str, dict] = {}
    if rebuild_only and CACHE.exists():
        rows = json.loads(CACHE.read_text())
    else:
        for slug, q in FOODS.items():
            try:
                hit = fetch(q)
            except httpx.HTTPError as e:
                print(f"  ! {slug}: {e}")
                continue
            if hit:
                rows[slug] = hit
                print(f"  {slug:20} {hit['usda_desc'][:34]:34} {hit['kcal']} kcal")
            else:
                print(f"  ! {slug}: no usable hit")
            time.sleep(0.2)
        CACHE.write_text(json.dumps(rows, indent=1))

    con = sqlite3.connect(DB)
    con.executescript(
        """
        DROP TABLE IF EXISTS usda_foods;
        DROP TABLE IF EXISTS usda_fts;
        CREATE TABLE usda_foods (
            slug TEXT PRIMARY KEY, name TEXT NOT NULL,
            kcal REAL, protein REAL, carb REAL, fat REAL
        );
        CREATE VIRTUAL TABLE usda_fts USING fts5(name, content='usda_foods', content_rowid='rowid');
        """
    )
    con.executemany(
        "INSERT INTO usda_foods (slug, name, kcal, protein, carb, fat) VALUES (?,?,?,?,?,?)",
        [(s, label(s), r["kcal"], r["protein"], r["carb"], r["fat"]) for s, r in rows.items()],
    )
    con.execute("INSERT INTO usda_fts(usda_fts) VALUES('rebuild')")
    con.commit()
    n = con.execute("SELECT count(*) FROM usda_foods").fetchone()[0]
    con.close()
    print(f"wrote usda_foods ({n} rows) into {DB}")


if __name__ == "__main__":
    main()
