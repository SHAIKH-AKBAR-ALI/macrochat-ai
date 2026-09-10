"""Parse the USDA FoodData Central *SR Legacy* CSV bulk export into
data/indb.sqlite as `usda_foods` (+ FTS5) — per-100 g kcal/protein/carb/fat plus
fiber, sugar, sodium and saturated fat.

Source CSVs (not committed — ~36 MB): download
https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip
and unzip `food.csv`, `food_nutrient.csv`, `nutrient.csv` into data/usda_src/.

  python scripts/build_usda_db.py

Runtime resolves these offline (app/nutrition.lookup_usda_local); the live FDC API
stays only as a last-resort fallback. Also feeds the /foods/ + /compare/ SEO pages
via scripts/export_seo_data.py.
"""
import csv
import re
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "usda_src"
DB = ROOT / "data" / "indb.sqlite"

# SR Legacy nutrient numbers -> our column names
NUTR = {
    "1008": "kcal", "1003": "protein", "1004": "fat", "1005": "carb",
    "1079": "fiber", "2000": "sugar", "1093": "sodium", "1258": "satfat",
}

# Force a specific SR Legacy row for high-value slugs (regex, case-insensitive,
# matched against the full description). Everything else is auto-slugged from the
# phrase before the first comma. Keeps "chicken-breast" from collapsing to "chicken".
CURATED = {
    "chicken-breast": r"chicken.*breast, meat only, cooked, roasted",
    "chicken-thigh": r"chicken.*thigh, meat only, cooked, roasted",
    "ground-beef": r"ground beef, 85% lean.*crumbles.*pan-browned|ground, 85% lean.*cooked, pan-browned",
    "turkey-breast": r"turkey, .*breast, meat only,.*roasted",
    "pork-chop": r"pork, .*loin.*separable lean only, cooked",
    "bacon": r"pork, cured, bacon, cooked",
    "salmon": r"fish, salmon, atlantic, farmed, cooked, dry heat",
    "tuna": r"fish, tuna, light, canned in water, drained solids",
    "shrimp": r"crustaceans, shrimp, cooked",
    "cod": r"fish, cod, atlantic, cooked, dry heat",
    "sardines": r"fish, sardine, atlantic, canned in oil, drained solids",
    "egg": r"egg, whole, cooked, hard-boiled",
    "egg-white": r"egg, white, raw, fresh",
    "milk": r"milk, whole, 3\.25% milkfat, with added vitamin d",
    "skim-milk": r"milk, nonfat, fluid, with added vitamin a and vitamin d",
    "greek-yogurt": r"yogurt, greek, plain, nonfat",
    "cheddar-cheese": r"cheese, cheddar",
    "mozzarella": r"cheese, mozzarella,.*part.?skim",
    "cottage-cheese": r"cheese, cottage, lowfat, 2% milkfat",
    "cream-cheese": r"cheese, cream$",
    "butter": r"butter, salted",
    "olive-oil": r"oil, olive, salad or cooking",
    "white-rice": r"rice, white, long-grain, regular, enriched, cooked",
    "brown-rice": r"rice, brown, long-grain, cooked",
    "quinoa": r"quinoa, cooked",
    "oats": r"^cereals, oats, regular and quick, not fortified, dry|^oats$",
    "whole-wheat-bread": r"bread, whole-wheat, commercially prepared$",
    "white-bread": r"bread, white, commercially prepared",
    "pasta": r"pasta, cooked, enriched, without added salt",
    "potato": r"potatoes, .*flesh and skin, .*baked",
    "sweet-potato": r"sweet potato, cooked, baked in skin, flesh, without salt",
    "banana": r"bananas, raw",
    "apple": r"apples, raw, with skin",
    "orange": r"oranges, raw, all commercial varieties",
    "strawberries": r"strawberries, raw",
    "blueberries": r"blueberries, raw",
    "grapes": r"grapes, red or green.*raw",
    "mango": r"mangos, raw",
    "pineapple": r"pineapple, raw, all varieties",
    "watermelon": r"watermelon, raw",
    "peach": r"peaches, .*raw|peaches, yellow, raw",
    "pear": r"pears, raw",
    "avocado": r"avocados, raw, all commercial varieties",
    "almonds": r"nuts, almonds$",
    "peanut-butter": r"peanut butter, smooth style, with salt|peanut butter, smooth, vitamin",
    "walnuts": r"nuts, walnuts, english",
    "cashews": r"nuts, cashew nuts, dry roasted",
    "broccoli": r"broccoli, cooked, boiled, drained, without salt",
    "spinach": r"spinach, raw",
    "kale": r"kale, raw",
    "carrot": r"carrots, raw",
    "tomato": r"tomatoes, red, ripe, raw, year round average",
    "cucumber": r"cucumber, with peel, raw",
    "onion": r"onions, raw",
    "bell-pepper": r"peppers, sweet, red, raw",
    "mushrooms": r"mushrooms, white, raw",
    "cauliflower": r"cauliflower, raw",
    "green-peas": r"peas, green, frozen, cooked, boiled, drained, without salt",
    "corn": r"corn, sweet, yellow, cooked, boiled, drained, without salt",
    "zucchini": r"squash, summer, zucchini, includes skin, raw",
    "lettuce": r"lettuce, .*(romaine|cos).*raw|lettuce, green leaf, raw",
    "black-beans": r"beans, black, mature seeds, cooked, boiled, without salt",
    "chickpeas": r"chickpeas .*mature seeds, cooked, boiled, without salt",
    "kidney-beans": r"beans, kidney, red, mature seeds, cooked, boiled, without salt",
    "lentils": r"lentils, mature seeds, cooked, boiled, without salt",
    "tofu": r"tofu, raw, firm, prepared with calcium sulfate",
    "edamame": r"edamame, frozen, prepared",
    "honey": r"^honey$",
    "sugar": r"sugars, granulated",
    "maple-syrup": r"syrups, maple",
    "dark-chocolate": r"chocolate, dark, 70-85% cacao solids",
    "sour-cream": r"cream, sour, cultured",
    "ham": r"ham, sliced, regular .*11% fat",
    "sausage": r"sausage, .*pork,.*cooked|pork sausage.*cooked",
    "ground-turkey": r"turkey, ground, cooked",
}
CURATED_RX = {s: re.compile(rx, re.I) for s, rx in CURATED.items()}

BAD = re.compile(
    r"\b(baby ?food|infant formula|fast ?foods?|restaurant|mcdonald|"
    r"burger king|wendy|taco bell|kfc|denny|pizza hut|subway|"
    r"school lunch|USDA Commodity|reduced fat|low sodium|NFS|"
    r"puffs|toddler)\b",
    re.I,
)


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return re.sub(r"-{2,}", "-", s)


def score(desc: str) -> int:
    d = desc.lower()
    n = 0
    if re.search(r"\b(raw|cooked)\b", d):
        n += 4
    if "roasted" in d or "boiled" in d or "baked" in d:
        n += 1
    n -= max(0, desc.count(",") - 3)  # SR Legacy is comma-heavy; only punish the long tail
    for k in ("dehydrated", "prepared from recipe", "from concentrate"):
        if k in d:
            n -= 2
    for k in ("canned", "dried", "frozen", "juice", "sweetened"):
        if k in d:
            n -= 1
    return n


def load_nutrients():
    """fdc_id -> {col: per-100g amount} for the nutrients we keep."""
    out: dict[str, dict] = {}
    with open(SRC / "food_nutrient.csv", newline="", encoding="utf-8") as f:
        r = csv.reader(f)
        next(r)
        for row in r:
            nid = row[2]
            col = NUTR.get(nid)
            if not col:
                continue
            try:
                amt = float(row[3])
            except (ValueError, IndexError):
                continue
            out.setdefault(row[1], {})[col] = amt
    return out


def main():
    if not (SRC / "food.csv").exists():
        sys.exit(f"missing {SRC}/food.csv — see this script's docstring for the download")

    foods = {}
    with open(SRC / "food.csv", newline="", encoding="utf-8") as f:
        r = csv.reader(f)
        next(r)
        for row in r:
            if row[1] == "sr_legacy_food":
                foods[row[0]] = row[2].strip()

    nut = load_nutrients()

    # candidate rows: need kcal, skip obvious junk
    cands = []
    for fdc, desc in foods.items():
        m = nut.get(fdc, {})
        if "kcal" not in m or m["kcal"] <= 0 or BAD.search(desc):
            continue
        cands.append((fdc, desc, m))

    picked: dict[str, tuple] = {}  # slug -> (desc, macros, score)

    # 1) curated slugs win their regex, best-scored match
    for slug, rx in CURATED_RX.items():
        best = None
        for fdc, desc, m in cands:
            if rx.search(desc):
                sc = score(desc)
                if best is None or sc > best[2]:
                    best = (desc, m, sc)
        if best:
            picked[slug] = best
        else:
            print(f"  ! curated miss: {slug}")

    # 2) auto-slug the rest. First food to claim a primary phrase gets the bare
    #    slug; the next one with the same primary gets "<primary>-<2nd part>", so
    #    e.g. beef -> beef-loin -> beef-chuck instead of all collapsing to "beef".
    STOP = {"raw", "cooked", "nfs", "boiled", "baked"}
    for fdc, desc, m in cands:
        parts = [p.strip() for p in desc.split(",") if p.strip()]
        if not parts:
            continue
        base = slugify(parts[0])
        if not base or base in CURATED:
            continue
        sc = score(desc)
        slug = base
        if slug in picked:
            snd = next((p for p in parts[1:] if p.lower() not in STOP and len(p.split()) <= 3), "")
            slug = slugify(f"{parts[0]} {snd}")[:48] if snd else base
        if slug in CURATED:
            continue
        if slug not in picked or (slug != base and picked.get(slug, (None, None, -99))[2] < sc):
            picked[slug] = (desc, m, sc)

    # cap: all curated + top auto by score, ~2800 total
    curated_rows = {s: v for s, v in picked.items() if s in CURATED}
    auto_rows = sorted(
        ((s, v) for s, v in picked.items() if s not in CURATED),
        key=lambda kv: (-kv[1][2], kv[0]),
    )[: 2800 - len(curated_rows)]
    final = {**curated_rows, **dict(auto_rows)}

    def display_name(slug, desc):
        if slug in CURATED:
            return slug.replace("-", " ").title()
        parts = [p.strip() for p in desc.split(",") if p.strip()]
        # keep enough leading parts to be recognisable, drop trailing method noise
        keep = [p for p in parts[:3] if p.lower() not in {"raw", "cooked", "nfs"}]
        return ", ".join(keep[:2] or parts[:1])

    rows = []
    for slug, (desc, m, _sc) in final.items():
        name = display_name(slug, desc)
        rows.append((
            slug, name,
            round(m.get("kcal", 0), 1), round(m.get("protein", 0), 2),
            round(m.get("carb", 0), 2), round(m.get("fat", 0), 2),
            round(m.get("fiber", 0), 2), round(m.get("sugar", 0), 2),
            round(m.get("sodium", 0), 1), round(m.get("satfat", 0), 2),
        ))
    rows.sort(key=lambda r: r[1])

    con = sqlite3.connect(DB)
    con.executescript(
        """
        DROP TABLE IF EXISTS usda_foods;
        DROP TABLE IF EXISTS usda_fts;
        CREATE TABLE usda_foods (
            slug TEXT PRIMARY KEY, name TEXT NOT NULL,
            kcal REAL, protein REAL, carb REAL, fat REAL,
            fiber REAL, sugar REAL, sodium REAL, satfat REAL
        );
        CREATE VIRTUAL TABLE usda_fts USING fts5(name, content='usda_foods', content_rowid='rowid');
        """
    )
    con.executemany(
        "INSERT INTO usda_foods (slug,name,kcal,protein,carb,fat,fiber,sugar,sodium,satfat) "
        "VALUES (?,?,?,?,?,?,?,?,?,?)", rows,
    )
    con.execute("INSERT INTO usda_fts(usda_fts) VALUES('rebuild')")
    con.commit()
    n = con.execute("SELECT count(*) FROM usda_foods").fetchone()[0]
    con.close()
    print(f"wrote usda_foods ({n} rows: {len(curated_rows)} curated + {len(auto_rows)} auto) into {DB}")


if __name__ == "__main__":
    main()
