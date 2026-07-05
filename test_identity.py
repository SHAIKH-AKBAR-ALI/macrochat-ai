"""Identity-reconciliation checks, no LLM calls. Run: python test_identity.py

Covers the two reproduced bugs (2026-07-05): vision over-specifying plain foods,
and user-stated food names losing to wrong vision guesses on auto-save.
"""
from app.graph import reconcile_identity


def main():
    # Repro 2: banana photo + "one small banana" -> vision said "dehydrated banana meal".
    # User's plainer name must win; text-stated portion stays high confidence.
    items = [{"name": "dehydrated banana meal", "portion_grams": 80, "portion_confidence": "high"}]
    reconcile_identity(items, "one small banana")
    assert items[0]["name"] == "banana", items
    assert items[0]["portion_confidence"] == "high", items

    # Repro 1 variant: apple photo + text "apple" -> vision said "apple croissant".
    items = [{"name": "apple croissant", "portion_grams": 120, "portion_confidence": "high"}]
    reconcile_identity(items, "apple")
    assert items[0]["name"] == "apple", items

    # Outright conflict between stated and identified food -> never auto-save.
    items = [{"name": "croissant", "portion_grams": 100, "portion_confidence": "high"}]
    reconcile_identity(items, "one small banana")
    assert items[0]["portion_confidence"] == "low", items

    # Good multi-item case untouched (incl. plural "rotis" vs "roti").
    items = [{"name": "chicken breast", "portion_grams": 200, "portion_confidence": "high"},
             {"name": "roti", "portion_grams": 90, "portion_confidence": "high"}]
    reconcile_identity(items, "200g grilled chicken and 2 rotis")
    assert items[0]["name"] == "chicken breast", items
    assert all(i["portion_confidence"] == "high" for i in items), items

    # No food words in text ("my lunch") -> no-op, photo estimate flow unchanged.
    items = [{"name": "apple", "portion_grams": 150, "portion_confidence": "low"}]
    reconcile_identity(items, "my lunch today")
    assert items[0]["name"] == "apple" and items[0]["portion_confidence"] == "low", items

    print("all checks passed")


if __name__ == "__main__":
    main()
