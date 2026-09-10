"""One-time build: data/INDB.xlsx -> data/indb.sqlite (foods table + FTS5 name index).

Run after INDB.xlsx changes:  python scripts/build_indb_db.py
The app reads the .sqlite at runtime; pandas is no longer a runtime dependency.
"""
import sqlite3
from pathlib import Path

import openpyxl

DATA = Path(__file__).resolve().parent.parent / "data"
XLSX = DATA / "INDB.xlsx"
DB = DATA / "indb.sqlite"

COLS = ("food_name", "energy_kcal", "protein_g", "carb_g", "fat_g")


def read_rows():
    wb = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)
    ws = wb["Nutrient Data"]
    it = ws.iter_rows(values_only=True)
    header = list(next(it))
    idx = {c: header.index(c) for c in COLS}
    for r in it:
        name = r[idx["food_name"]]
        if not name or not str(name).strip():
            continue
        yield (
            str(name).strip(),
            "INDB",
            _f(r[idx["energy_kcal"]]),
            _f(r[idx["protein_g"]]),
            _f(r[idx["carb_g"]]),
            _f(r[idx["fat_g"]]),
        )


def _f(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def main():
    rows = list(read_rows())
    DB.unlink(missing_ok=True)
    con = sqlite3.connect(DB)
    con.executescript(
        """
        CREATE TABLE foods (
            id         INTEGER PRIMARY KEY,
            name       TEXT NOT NULL,
            source     TEXT NOT NULL,
            kcal       REAL,
            protein    REAL,
            carb       REAL,
            fat        REAL,
            prep_style TEXT
        );
        CREATE VIRTUAL TABLE foods_fts USING fts5(
            name, content='foods', content_rowid='id'
        );
        """
    )
    con.executemany(
        "INSERT INTO foods (name, source, kcal, protein, carb, fat) VALUES (?,?,?,?,?,?)",
        rows,
    )
    con.execute("INSERT INTO foods_fts(foods_fts) VALUES('rebuild')")
    con.commit()
    n = con.execute("SELECT count(*) FROM foods").fetchone()[0]
    con.close()
    print(f"wrote {DB}  ({n} rows)")


if __name__ == "__main__":
    main()
