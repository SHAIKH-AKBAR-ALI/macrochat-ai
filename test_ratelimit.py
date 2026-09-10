"""Rate-limit / guest-budget checks (S1). No network, no LLM.

Run: .venv\\Scripts\\python test_ratelimit.py
"""
import time
import types

from fastapi import HTTPException

from app import ratelimit as rl


def fake_request(xff=None, peer="9.9.9.9"):
    headers = {"x-forwarded-for": xff} if xff else {}
    return types.SimpleNamespace(
        headers=headers, client=types.SimpleNamespace(host=peer)
    )


def main():
    rl._reset_for_tests()

    # --- sliding window: allows exactly `limit`, then blocks ---
    for i in range(3):
        assert rl.hit("t", "k", 3, 60) is True, i
    assert rl.hit("t", "k", 3, 60) is False
    # a blocked hit must NOT be recorded (it can't extend its own window)
    assert len(rl._hits[("t", "k")]) == 3

    # --- keys are isolated ---
    assert rl.hit("t", "other", 3, 60) is True
    assert rl.hit("other-bucket", "k", 3, 60) is True

    # --- entries outside the window fall out ---
    rl._reset_for_tests()
    assert rl.hit("w", "k", 1, 1) is True
    assert rl.hit("w", "k", 1, 1) is False
    time.sleep(1.05)
    assert rl.hit("w", "k", 1, 1) is True, "window did not expire"

    # --- client_ip: rightmost XFF wins (leftmost is attacker-controlled) ---
    assert rl.client_ip(fake_request(xff="1.1.1.1, 2.2.2.2, 3.3.3.3")) == "3.3.3.3"
    assert rl.client_ip(fake_request(xff="evil-spoof")) == "evil-spoof"  # single hop
    assert rl.client_ip(fake_request()) == "9.9.9.9"

    # --- guests are capped per IP, signed-in users are not (until much later) ---
    rl._reset_for_tests()
    req = fake_request(xff="10.0.0.1")
    for i in range(rl.GUEST_HOURLY):
        rl.check_analyze(req, is_guest=True)  # must not raise
    try:
        rl.check_analyze(req, is_guest=True)
        raise AssertionError("guest cap did not fire")
    except HTTPException as e:
        assert e.status_code == 429, e
        assert "Sign up" in e.detail, e.detail

    # a different IP is unaffected by the first one's cap
    rl.check_analyze(fake_request(xff="10.0.0.2"), is_guest=True)

    # signed-in traffic from the capped IP still goes through
    rl.check_analyze(req, is_guest=False)

    # --- global guest budget is a hard backstop across all IPs ---
    rl._reset_for_tests()
    for i in range(rl.GLOBAL_GUEST_DAILY):
        assert rl.hit("guest_global", "all", rl.GLOBAL_GUEST_DAILY, rl.DAY) is True
    try:
        rl.check_analyze(fake_request(xff="172.16.0.1"), is_guest=True)
        raise AssertionError("global guest budget did not fire")
    except HTTPException as e:
        assert e.status_code == 429 and "today's limit" in e.detail, e.detail

    rl._reset_for_tests()
    print("all checks passed")


if __name__ == "__main__":
    main()
