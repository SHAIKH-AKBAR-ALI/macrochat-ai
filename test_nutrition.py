"""Nutrition-layer check, no LLM calls. Run: python test_nutrition.py"""
from app import nutrition


def main():
    # Indian dish -> INDB
    hit = nutrition.lookup("roti")
    assert hit is not None, "roti should match INDB"
    assert hit["source"] == "INDB", hit
    assert 200 < hit["kcal_100g"] < 400, hit

    # prep style influences match
    hit = nutrition.lookup("chicken breast", "grilled")
    assert hit is not None, "grilled chicken breast should resolve"
    assert 15 < hit["protein_100g"] < 45, hit

    # plain produce must match the raw food, not a dish containing it
    # (bug 2026-07-05: "apple" -> "Croissants, apple", "banana" -> dehydrated powder)
    hit = nutrition.lookup("apple")
    assert hit and hit["kcal_100g"] < 100, hit  # raw apple ~50, croissant/strudel ~250+
    hit = nutrition.lookup("banana")
    assert hit and hit["kcal_100g"] < 150, hit  # raw banana ~89, dehydrated 346

    # garbage -> None, never invented
    assert nutrition.lookup("zzqxv nonsense food") is None

    print("all checks passed")


if __name__ == "__main__":
    main()
