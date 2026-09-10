"""Security-hardening checks (S2-S8). No network, no LLM.

Run: .venv\Scripts\python test_security.py
"""
import io

from fastapi.testclient import TestClient
from pydantic import ValidationError

from app import db, nutrition, ratelimit
from app.main import MAX_PHOTO_BYTES, MealPatch, SignupBody, app


def test_upload_guard():
    """S2: oversized / non-image uploads die before read() + base64."""
    c = TestClient(app)
    big = io.BytesIO(b"\0" * (MAX_PHOTO_BYTES + 1))
    r = c.post("/analyze", files={"photo": ("big.jpg", big, "image/jpeg")})
    assert r.status_code == 413, r.status_code
    r = c.post("/analyze", files={"photo": ("x.pdf", io.BytesIO(b"%PDF"), "application/pdf")})
    assert r.status_code == 415, r.status_code


def test_live_usda_optout():
    """S3: allow_live=False never reaches the network."""
    real = nutrition.lookup_usda
    nutrition.lookup_usda = lambda *a, **k: (_ for _ in ()).throw(AssertionError("live call"))
    try:
        assert nutrition.lookup("zzz nonexistent food zzz", allow_live=False) is None
        assert nutrition.lookup("rice", allow_live=False)["source"] == "STAPLE"
    finally:
        nutrition.lookup_usda = real


def test_rls_scoped_client():
    """S4: a token-carrying user id routes through an RLS-scoped client, not the
    service client that bypasses RLS."""
    plain = "00000000-0000-0000-0000-000000000000"
    assert db._c(plain) is db.sb
    u = db.AuthUser(plain)
    u.token = "fake.jwt.token"
    assert u == plain  # still a plain str everywhere it is used
    scoped = db._c(u)
    assert scoped is not db.sb
    assert scoped.postgrest.headers["Authorization"] == "Bearer fake.jwt.token"


def test_signup_validation():
    """S5: the API validates, not just the form."""
    good = dict(email="a@b.co", password="longenough", height_cm=170, weight_kg=70,
                age=30, sex="male", activity_level="light", goal="maintain",
                time_zone="Asia/Kolkata")
    SignupBody(**good)
    for bad in ({"password": "short"}, {"email": "not-an-email"}, {"email": "a@b"}):
        try:
            SignupBody(**{**good, **bad})
            raise AssertionError(f"accepted {bad}")
        except ValidationError:
            pass


def test_security_headers_and_cors():
    """S6: API responses carry the cheap headers; CORS is pinned to our origins."""
    h = TestClient(app).get("/health").headers
    assert h["X-Content-Type-Options"] == "nosniff"
    assert h["X-Frame-Options"] == "DENY"
    assert h["Referrer-Policy"] == "strict-origin-when-cross-origin"
    for origin, allowed in (("https://macrochat-d6oi.onrender.com", True),
                            ("https://evil-tenant.onrender.com", False),
                            ("http://localhost:4321", True)):
        r = TestClient(app).get("/health", headers={"Origin": origin})
        assert ("access-control-allow-origin" in r.headers) is allowed, origin


def test_time_zone_validation():
    """S7: a junk zone is rejected at signup, and a junk zone already stored
    degrades to UTC instead of 500ing the account's endpoints forever."""
    good = dict(email="a@b.co", password="longenough", height_cm=170, weight_kg=70,
                age=30, sex="male", activity_level="light", goal="maintain")
    SignupBody(**good, time_zone="Asia/Kolkata")
    try:
        SignupBody(**good, time_zone="Mars/Olympus")
        raise AssertionError("accepted a junk time zone")
    except ValidationError:
        pass
    assert db._tz("Not/AZone").key == "UTC"
    assert db._tz("Asia/Kolkata").key == "Asia/Kolkata"


def test_meal_patch_keys():
    """S8: a non-numeric grams key is a 422 at the model, not an int() 500 in db."""
    assert MealPatch(grams={"0": 150}).grams == {0: 150.0}
    try:
        MealPatch(grams={"abc": 150})
        raise AssertionError("accepted a non-numeric index")
    except ValidationError:
        pass


def test_public_ratelimit():
    """S5/S3: unauthenticated non-LLM endpoints are capped per IP."""
    import types
    ratelimit._reset_for_tests()
    r = types.SimpleNamespace(headers={}, client=types.SimpleNamespace(host="1.2.3.4"))
    for _ in range(3):
        ratelimit.check_public(r, "t", 3)
    try:
        ratelimit.check_public(r, "t", 3)
        raise AssertionError("no cap")
    except Exception as e:
        assert getattr(e, "status_code", None) == 429


if __name__ == "__main__":
    test_upload_guard()
    test_live_usda_optout()
    test_rls_scoped_client()
    test_signup_validation()
    test_security_headers_and_cors()
    test_time_zone_validation()
    test_meal_patch_keys()
    test_public_ratelimit()
    print("security checks OK")
