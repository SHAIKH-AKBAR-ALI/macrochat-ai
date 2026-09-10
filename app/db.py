"""Supabase auth + persistence. Daily-total math lives here (Python), never in the LLM."""
from datetime import datetime, time, timedelta, timezone
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


def _today_start_utc(tz_name: str) -> str:
    """User-local-midnight as a UTC ISO string — the 'today' boundary for meals."""
    tz = ZoneInfo(tz_name)
    local_midnight = datetime.combine(datetime.now(tz).date(), time.min, tzinfo=tz)
    return local_midnight.astimezone(timezone.utc).isoformat()


def today_meals(user_id: str) -> list[dict]:
    """Today's meal rows (newest first), user time zone aware. For the dashboard list."""
    tz_name = (
        sb.table("profiles").select("time_zone").eq("id", user_id)
        .single().execute().data["time_zone"]
    )
    return (
        sb.table("meals")
        .select("id,created_at,items,total_calories,total_protein,total_carbs,total_fat")
        .eq("user_id", user_id)
        .gte("created_at", _today_start_utc(tz_name))
        .order("created_at", desc=True)
        .execute()
        .data
    )


def recent_meals(user_id: str, limit: int = 3) -> list[dict]:
    """Last `limit` DISTINCT meals (by item-name set), newest first — for re-log chips."""
    rows = (
        sb.table("meals")
        .select("id,created_at,items,total_calories")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(20)
        .execute()
        .data
    )
    seen: set = set()
    out: list[dict] = []
    for m in rows:
        sig = tuple(sorted(i.get("name", "") for i in (m.get("items") or [])))
        if not sig or sig in seen:
            continue
        seen.add(sig)
        out.append(m)
        if len(out) >= limit:
            break
    return out


def _sum_items(items: list[dict]) -> dict:
    key = lambda k: round(sum(i.get(k) or 0 for i in items), 1)
    return {"kcal": key("kcal"), "protein": key("protein"),
            "carbs": key("carbs"), "fat": key("fat")}


def _meal_or_404(user_id: str, meal_id: str, cols: str) -> dict:
    row = (
        sb.table("meals").select(cols)
        .eq("user_id", user_id).eq("id", meal_id)
        .execute().data
    )
    if not row:
        raise HTTPException(404, "Meal not found")
    return row[0]


def update_meal(user_id: str, meal_id: str, grams_by_index: dict[str, float]) -> dict:
    """Edit item grams — scale that item's stored macros, re-sum. No lookup, no LLM."""
    row = _meal_or_404(user_id, meal_id, "items")
    items = row["items"]
    for idx_s, new_g in grams_by_index.items():
        idx = int(idx_s)
        if idx < 0 or idx >= len(items) or new_g <= 0:
            continue
        it = items[idx]
        old_g = it.get("portion_grams") or 0
        if old_g <= 0:
            continue
        f = new_g / old_g
        for k in ("kcal", "protein", "carbs", "fat"):
            if it.get(k) is not None:
                it[k] = round(it[k] * f, 1)
        it["portion_grams"] = new_g
    totals = _sum_items(items)
    (
        sb.table("meals").update({
            "items": items,
            "total_calories": totals["kcal"], "total_protein": totals["protein"],
            "total_carbs": totals["carbs"], "total_fat": totals["fat"],
        }).eq("user_id", user_id).eq("id", meal_id).execute()
    )
    return totals


def delete_meal(user_id: str, meal_id: str) -> None:
    _meal_or_404(user_id, meal_id, "id")
    sb.table("meals").delete().eq("user_id", user_id).eq("id", meal_id).execute()


def meals_range(user_id: str, days: int = 30) -> list[dict]:
    """All meal rows in the last `days` (user-local), newest first — for /history."""
    tz_name = (
        sb.table("profiles").select("time_zone").eq("id", user_id)
        .single().execute().data["time_zone"]
    )
    tz = ZoneInfo(tz_name)
    start_local = datetime.now(tz).date() - timedelta(days=days - 1)
    start_utc = datetime.combine(start_local, time.min, tzinfo=tz).astimezone(timezone.utc)
    return (
        sb.table("meals")
        .select("id,created_at,items,total_calories,total_protein,total_carbs,total_fat")
        .eq("user_id", user_id)
        .gte("created_at", start_utc.isoformat())
        .order("created_at", desc=True)
        .execute()
        .data
    )


def trends(user_id: str, days: int = 7) -> dict:
    """Per-day totals for the last `days`, streak, and rule-based insight strings.
    All backend math + SQL — zero LLM (per CLAUDE.md non-goals)."""
    p = (
        sb.table("profiles")
        .select("time_zone,daily_calorie_goal,daily_protein_goal,daily_carb_goal,daily_fat_goal")
        .eq("id", user_id).single().execute().data
    )
    tz = ZoneInfo(p["time_zone"])
    start_local = datetime.now(tz).date() - timedelta(days=days - 1)
    start_utc = datetime.combine(start_local, time.min, tzinfo=tz).astimezone(timezone.utc)
    rows = (
        sb.table("meals")
        .select("created_at,total_calories,total_protein,total_carbs,total_fat")
        .eq("user_id", user_id).gte("created_at", start_utc.isoformat())
        .execute().data
    )
    buckets = {
        str(start_local + timedelta(days=i)): {"kcal": 0.0, "protein": 0.0, "carbs": 0.0, "fat": 0.0}
        for i in range(days)
    }
    for m in rows:
        d = str(datetime.fromisoformat(m["created_at"]).astimezone(tz).date())
        b = buckets.get(d)
        if not b:
            continue
        b["kcal"] += m["total_calories"] or 0
        b["protein"] += m["total_protein"] or 0
        b["carbs"] += m["total_carbs"] or 0
        b["fat"] += m["total_fat"] or 0
    series = [
        {"date": k, **{kk: round(vv, 1) for kk, vv in v.items()}}
        for k, v in sorted(buckets.items())
    ]
    logged = [d for d in series if d["kcal"] > 0]
    n = len(logged)
    streak = 0
    for d in reversed(series):
        if d["kcal"] > 0:
            streak += 1
        else:
            break
    goal = p["daily_calorie_goal"]
    pgoal = p["daily_protein_goal"]
    avg_kcal = round(sum(d["kcal"] for d in logged) / n) if n else 0
    avg_p = round(sum(d["protein"] for d in logged) / n) if n else 0
    insights: list[str] = []
    if streak >= 3:
        insights.append(f"{streak}-day logging streak — keep it going.")
    if n:
        if avg_kcal > goal * 1.08:
            insights.append(f"Averaging {avg_kcal} kcal/day, ~{avg_kcal - goal} over your {goal} goal.")
        elif avg_kcal < goal * 0.92:
            insights.append(f"Averaging {avg_kcal} kcal/day, ~{goal - avg_kcal} under your {goal} goal.")
        else:
            insights.append(f"Averaging {avg_kcal} kcal/day — right around your {goal} goal.")
        if avg_p < pgoal * 0.85:
            insights.append(f"Protein averaging {avg_p} g vs your {pgoal} g target — add a protein source.")
    else:
        insights.append("No meals logged in this window yet.")
    return {
        "days": days, "series": series, "streak": streak, "logged_days": n,
        "avg_kcal": avg_kcal,
        "goals": {"kcal": goal, "protein": pgoal,
                  "carbs": p["daily_carb_goal"], "fat": p["daily_fat_goal"]},
        "insights": insights,
    }


def relog_meal(user_id: str, meal_id: str) -> dict:
    """Clone a past meal's items + totals to a new row at now. No lookup, no LLM."""
    row = (
        sb.table("meals")
        .select("items,total_calories,total_protein,total_carbs,total_fat")
        .eq("user_id", user_id).eq("id", meal_id)
        .single().execute().data
    )
    totals = {
        "kcal": row["total_calories"], "protein": row["total_protein"],
        "carbs": row["total_carbs"], "fat": row["total_fat"],
    }
    save_meal(user_id, row["items"], totals)
    return totals


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
