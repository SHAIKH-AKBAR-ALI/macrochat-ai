"""Supabase auth + persistence. Daily-total math lives here (Python), never in the LLM."""
from datetime import datetime, time, timezone
from zoneinfo import ZoneInfo

import httpx
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from supabase import create_client
from supabase.lib.client_options import SyncClientOptions

from app.config import settings

# Server-side client: never persist user sessions, or user JWTs would
# replace the secret key on subsequent requests.
sb = create_client(
    settings.supabase_url,
    settings.supabase_secret_key,
    SyncClientOptions(auto_refresh_token=False, persist_session=False),
)

_bearer = HTTPBearer(auto_error=False)


def password_login(email: str, password: str) -> dict:
    """Stateless login via GoTrue REST. Never sign_in on the shared service
    client — it swaps its auth to the user's JWT and poisons later calls."""
    r = httpx.post(
        f"{settings.supabase_url}/auth/v1/token?grant_type=password",
        json={"email": email, "password": password},
        headers={"apikey": settings.supabase_secret_key},
    )
    if r.status_code != 200:
        raise HTTPException(401, "Invalid credentials")
    return r.json()  # access_token, user, ...


def current_user_id(
    cred: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> str:
    """FastAPI dependency: user id from Bearer token, 401 otherwise."""
    if cred is None:
        raise HTTPException(401, "Missing bearer token")
    try:
        # ponytail: network round-trip per request; verify JWT locally if latency matters
        return sb.auth.get_user(cred.credentials).user.id
    except Exception:
        raise HTTPException(401, "Invalid or expired token")


# --- daily goals (Mifflin-St Jeor, plain backend math) ---

ACTIVITY_FACTORS = {
    "sedentary": 1.2, "light": 1.375, "moderate": 1.55,
    "active": 1.725, "very_active": 1.9,
}
GOAL_KCAL_ADJUST = {"lose": -500, "maintain": 0, "gain": 300}


def daily_goals(height_cm: float, weight_kg: float, age: int, sex: str,
                activity_level: str, goal: str) -> dict:
    bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age + (5 if sex == "male" else -161)
    kcal = bmr * ACTIVITY_FACTORS[activity_level] + GOAL_KCAL_ADJUST[goal]
    protein_g = 1.8 * weight_kg                      # standard active-adult target
    fat_g = kcal * 0.25 / 9                          # 25% of calories from fat
    carb_g = (kcal - protein_g * 4 - fat_g * 9) / 4  # remainder
    return {
        "daily_calorie_goal": round(kcal),
        "daily_protein_goal": round(protein_g),
        "daily_carb_goal": round(carb_g),
        "daily_fat_goal": round(fat_g),
    }


# --- meals ---

def save_meal(user_id: str, items: list[dict], totals: dict) -> None:
    sb.table("meals").insert({
        "user_id": user_id,
        "items": items,
        "total_calories": totals["kcal"],
        "total_protein": totals["protein"],
        "total_carbs": totals["carbs"],
        "total_fat": totals["fat"],
    }).execute()


def save_chat(user_id: str, role: str, content: dict) -> None:
    sb.table("chat_messages").insert(
        {"user_id": user_id, "role": role, "content": content}
    ).execute()


def chat_history(user_id: str, limit: int = 100) -> list[dict]:
    """Last `limit` messages, oldest first (fetch newest-first, then reverse)."""
    rows = (
        sb.table("chat_messages")
        .select("role,content,created_at")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
        .data
    )
    return rows[::-1]


def today_totals(user_id: str) -> dict:
    """Sum today's meals using the user's stored time zone (local midnight boundary)."""
    profile = (
        sb.table("profiles").select("*").eq("id", user_id).single().execute().data
    )
    tz = ZoneInfo(profile["time_zone"])
    local_midnight = datetime.combine(datetime.now(tz).date(), time.min, tzinfo=tz)
    start_utc = local_midnight.astimezone(timezone.utc)

    meals = (
        sb.table("meals")
        .select("total_calories,total_protein,total_carbs,total_fat")
        .eq("user_id", user_id)
        .gte("created_at", start_utc.isoformat())
        .execute()
        .data
    )
    eaten = {
        "kcal": round(sum(m["total_calories"] for m in meals), 1),
        "protein": round(sum(m["total_protein"] for m in meals), 1),
        "carbs": round(sum(m["total_carbs"] for m in meals), 1),
        "fat": round(sum(m["total_fat"] for m in meals), 1),
    }
    return {
        "eaten": eaten,
        "goals": {
            "kcal": profile["daily_calorie_goal"],
            "protein": profile["daily_protein_goal"],
            "carbs": profile["daily_carb_goal"],
            "fat": profile["daily_fat_goal"],
        },
        "remaining": {
            "kcal": round(profile["daily_calorie_goal"] - eaten["kcal"], 1),
            "protein": round(profile["daily_protein_goal"] - eaten["protein"], 1),
            "carbs": round(profile["daily_carb_goal"] - eaten["carbs"], 1),
            "fat": round(profile["daily_fat_goal"] - eaten["fat"], 1),
        },
        "meals_logged": len(meals),
    }
