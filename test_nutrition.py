"""Nutrition-layer check, no LLM calls. Run: python test_nutrition.py"""
from app import nutrition
from app.graph import aggregate, lookup as lookup_node


def main():
    # Staple list: "rice" -> plain cooked rice, NOT USDA "Rice crackers" (bug 2026-07-18).
    hit = nutrition.lookup("rice")
    assert hit and hit["source"] == "STAPLE", hit
    assert 110 < hit["kcal_100g"] < 160, hit          # cooked rice ~130, crackers ~380
    assert "cracker" not in hit["matched_name"].lower(), hit
    assert hit["score"] == 100.0, hit                  # exact staple = max confidence
    for alias in ("cooked rice", "white rice", "boiled rice", "dal", "cooked dal"):
        assert nutrition.lookup(alias) and nutrition.lookup(alias)["source"] == "STAPLE", alias
    # deterministic: unrelated processed terms must NOT overmatch into the staple table
    assert nutrition.match_staple("rice crackers") is None
    assert nutrition.match_staple("rice flour") is None

    # Qualified dal names (bug 2026-07-18): the LLM says "dal fry"/"toor dal"/etc,
    # not the bare alias -> token fallback maps them to plain cooked dal, not NO_MATCH.
    for q in ("dal fry", "dal tadka", "toor dal", "moong dal", "yellow dal", "dal (lentils)"):
        h = nutrition.lookup(q)
        assert h and h["source"] == "STAPLE", (q, h)
        assert 110 < h["kcal_100g"] < 160, (q, h)
    # a curated specific dish still beats the plain-dal fallback (INDB runs first)
    assert nutrition.lookup("dal makhani")["source"] == "INDB"

    # Match-confidence gate (deterministic, isolated): a weak match forces confirmation,
    # a strong one auto-saves. Separate from portion/vision confirm flow.
    base = {"portion_confidence": "high", "kcal": 100, "protein": 1, "carbs": 1, "fat": 1}
    weak = {"items": [base | {"match_confidence": 55.0}]}
    out = aggregate(weak)
    assert out["needs_confirmation"] is True, out
    assert weak["items"][0]["match_needs_confirm"] is True
    strong = {"items": [base | {"match_confidence": 95.0}]}
    out = aggregate(strong)
    assert out["needs_confirmation"] is False, out

    # NO_MATCH item (bug 2026-07-18): unmatched food (null macros) is dropped from the
    # total, so the total is partial -> must force confirmation, never silently save.
    nomatch = {"items": [
        base | {"match_confidence": 100.0},
        {"portion_confidence": "high", "kcal": None, "protein": None,
         "carbs": None, "fat": None, "match_confidence": None},
    ]}
    out = aggregate(nomatch)
    assert out["needs_confirmation"] is True, out
    assert out["totals_partial"] is True, out
    assert nomatch["items"][1]["match_needs_confirm"] is True

    # Integration (nutrition layer, no LLM): the reported bug meal stays well under the
    # bogus 1,134 kcal it produced when "rice" hit "Rice crackers".
    meal = {"items": [
        {"name": "chicken breast", "prep_style": "grilled", "portion_grams": 200, "portion_confidence": "high"},
        {"name": "rice", "prep_style": None, "portion_grams": 150, "portion_confidence": "high"},
    ]}
    meal |= lookup_node(meal)
    meal |= aggregate(meal)
    rice_item = next(i for i in meal["items"] if i["name"] == "rice")
    assert rice_item["source"] == "STAPLE", rice_item
    assert meal["totals"]["kcal"] < 800, meal["totals"]   # was 1,134 with crackers
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
