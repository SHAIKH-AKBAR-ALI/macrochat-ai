"""Security-hardening checks (S2-S5). No network, no LLM.

Run: .venv\Scripts\python test_security.py
"""
import io

from fastapi.testclient import TestClient
from pydantic import ValidationError

from app import db, nutrition, ratelimit
from app.main import MAX_PHOTO_BYTES, SignupBody, app


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
    test_public_ratelimit()
    print("security checks OK")
