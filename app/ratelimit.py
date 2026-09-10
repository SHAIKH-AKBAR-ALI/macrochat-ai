"""In-process rate limiting + a global guest LLM budget.

Guards the money-losing path: /analyze needs no auth, so without this a loop of
curl calls drains the OpenAI/Gemini/Groq credits. The frontend's localStorage
counter (mc_ai_uses) is UX only — this is the actual control.

ponytail: plain in-memory sliding windows, no Redis. Counters reset on deploy and
don't span instances, which is correct for one free-tier Render service. Swap the
_hits store for Redis if we ever run more than one.
"""
import threading
import time
from collections import deque

from fastapi import HTTPException, Request

# Guest (no account) — deliberately generous enough for a real trial, tight
# enough that abuse costs nothing meaningful. Tune from logs.
GUEST_HOURLY = 5
GUEST_DAILY = 20
# A signed-in human logging meals; still bounded so a stolen token can't run wild.
USER_HOURLY = 60
# Hard backstop: total guest analyses across ALL IPs per day. Caps the worst-case
# daily spend even under a distributed attack.
GLOBAL_GUEST_DAILY = 300

HOUR = 3600
DAY = 86400

_lock = threading.Lock()
_hits: dict[tuple[str, str], deque] = {}
_MAX_KEYS = 20_000


def client_ip(request: Request) -> str:
    """Caller IP.

    Behind Render's proxy X-Forwarded-For is a chain. A client can prepend its own
    XFF header, so the LEFTMOST entry is attacker-controlled — take the RIGHTMOST,
    which is the peer our proxy actually saw.
    """
    xff = request.headers.get("x-forwarded-for")
    if xff:
        parts = [p.strip() for p in xff.split(",") if p.strip()]
        if parts:
            return parts[-1]
    return request.client.host if request.client else "unknown"


def _prune(now: float) -> None:
    for k, dq in list(_hits.items()):
        while dq and dq[0] < now - DAY:
            dq.popleft()
        if not dq:
            del _hits[k]


def hit(bucket: str, key: str, limit: int, window: int) -> bool:
    """Record one hit. Returns False (and records nothing) if it would exceed
    `limit` within the trailing `window` seconds."""
    now = time.time()
    with _lock:
        if len(_hits) > _MAX_KEYS:
            _prune(now)
        dq = _hits.setdefault((bucket, key), deque())
        cutoff = now - window
        while dq and dq[0] < cutoff:
            dq.popleft()
        if len(dq) >= limit:
            return False
        dq.append(now)
        return True


def check_analyze(request: Request, is_guest: bool) -> None:
    """Gate /analyze before any LLM work happens. Raises 429 when over budget."""
    ip = client_ip(request)
    if not is_guest:
        if not hit("user_hr", ip, USER_HOURLY, HOUR):
            raise HTTPException(429, "Too many requests — give it a minute and try again.")
        return
    # per-IP first so a blocked client doesn't consume the global budget
    if not hit("guest_hr", ip, GUEST_HOURLY, HOUR) or not hit("guest_day", ip, GUEST_DAILY, DAY):
        raise HTTPException(
            429,
            "That's the free guest limit for now. Sign up (free, no card) for "
            "unlimited meal logging and a saved daily total.",
        )
    if not hit("guest_global", "all", GLOBAL_GUEST_DAILY, DAY):
        raise HTTPException(
            429,
            "The free guest demo has hit today's limit. Sign up (free) to keep "
            "analysing meals.",
        )


def _reset_for_tests() -> None:
    with _lock:
        _hits.clear()
