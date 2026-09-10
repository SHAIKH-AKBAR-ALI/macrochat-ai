import base64
from typing import Literal

from zoneinfo import available_timezones

from fastapi import Depends, FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field, field_validator

from app import db, nutrition, ratelimit
from app.graph import aggregate, lookup, pipeline

app = FastAPI(title="MacroChat AI — Phase 3")
app.add_middleware(
    CORSMiddleware,
    # Astro dev on this machine or any device on the private LAN, plus OUR static
    # site only — `[a-z0-9-]+.onrender.com` let any Render tenant call this API
    # with a user's browser credentials.
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+):4321|https://macrochat-d6oi\.onrender\.com",
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def security_headers(request: Request, call_next):
    """Cheap, always-safe response headers. The JSON API is never framed and never
    needs content sniffing; a CSP belongs on the static site, not here."""
    r = await call_next(request)
    r.headers["X-Content-Type-Options"] = "nosniff"
    r.headers["X-Frame-Options"] = "DENY"
    r.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return r


_optional_bearer = HTTPBearer(auto_error=False)

# A meal photo off any phone is < 8 MB. Anything bigger is not a meal photo, and
# base64 inflates it another 33% in RAM on a 512 MB instance.
MAX_PHOTO_BYTES = 8 * 1024 * 1024


@app.get("/health")
def health():
    return {"ok": True}


# --- auth ---

class SignupBody(BaseModel):
    # The API is the trust boundary — the frontend's minlength/type are not validation.
    email: str = Field(min_length=5, max_length=254, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    password: str = Field(min_length=8, max_length=128)
    height_cm: float
    weight_kg: float
    age: int
    sex: Literal["male", "female"]
    activity_level: Literal["sedentary", "light", "moderate", "active", "very_active"]
    goal: Literal["lose", "maintain", "gain"]
    time_zone: str  # IANA name, e.g. "Asia/Kolkata"; frontend auto-detects, user confirms

    @field_validator("time_zone")
    @classmethod
    def known_zone(cls, v: str) -> str:
        # Stored once, then fed to ZoneInfo on every /today, /trends and
        # /meals/today — junk here bricks those endpoints for the account forever.
        if v not in available_timezones():
            raise ValueError("Unknown IANA time zone")
        return v


@app.post("/signup")
def signup(body: SignupBody, request: Request):
    ratelimit.check_public(request, "signup", 5)
    try:
        # ponytail: admin create with instant confirm — skips confirmation email
        # (and its 2/hr rate limit). Switch to sign_up if email verification ever matters.
        res = db.sb.auth.admin.create_user(
            {"email": body.email, "password": body.password, "email_confirm": True}
        )
    except Exception:
        # Never echo the provider's error — it leaks internals and confirms which
        # emails exist. Server logs keep the detail.
        raise HTTPException(400, "Could not create that account. Check the email and try again.")
    goals = db.daily_goals(body.height_cm, body.weight_kg, body.age,
                           body.sex, body.activity_level, body.goal)
    try:
        db.sb.table("profiles").insert({
            "id": res.user.id,
            "height_cm": body.height_cm, "weight_kg": body.weight_kg,
            "age": body.age, "sex": body.sex,
            "activity_level": body.activity_level, "goal": body.goal,
            "time_zone": body.time_zone, **goals,
        }).execute()
    except Exception:
        # Signup is not half-done: an auth user with no profile can log in but
        # 500s on /today forever, and the email is then taken.
        db.sb.auth.admin.delete_user(res.user.id)
        raise HTTPException(500, "Could not finish signup. Try again.")
    return {"user_id": res.user.id, "goals": goals}  # then POST /login for a token


class LoginBody(BaseModel):
    email: str = Field(max_length=254)
    password: str = Field(max_length=128)


@app.post("/login")
def login(body: LoginBody, request: Request):
    ratelimit.check_public(request, "login", 20)
    res = db.password_login(body.email, body.password)
    return {"access_token": res["access_token"], "user_id": res["user"]["id"]}


# --- analysis + tracking ---

@app.post("/analyze")
async def analyze(
    request: Request,
    photo: UploadFile | None = File(None),
    text: str | None = Form(None),
    cred: HTTPAuthorizationCredentials | None = Depends(_optional_bearer),
):
    if photo is None and not text:
        raise HTTPException(422, "Provide a photo, text, or both.")
    if photo is not None:
        # Checked BEFORE read()/base64 so a huge body costs nothing but the
        # multipart spool. ponytail: a true request-body cap belongs at the proxy.
        if not (photo.content_type or "").startswith("image/"):
            raise HTTPException(415, "That file isn't an image.")
        if photo.size is not None and photo.size > MAX_PHOTO_BYTES:
            raise HTTPException(413, "Image too large — keep it under 8 MB.")
    # Stale/expired token must not hard-fail analysis — degrade to guest and flag it
    # so the client can clear the token. Save/confirm/today still require real auth.
    auth_expired = False
    user_id = None
    if cred is not None:
        try:
            user_id = db.current_user_id(cred)
        except HTTPException:
            auth_expired = True
    # Budget gate BEFORE any LLM work — this endpoint needs no auth, so it is the
    # only thing standing between a curl loop and the API bill. The frontend's
    # localStorage counter is UX; this is the control.
    ratelimit.check_analyze(request, is_guest=user_id is None)
    image_b64 = base64.b64encode(await photo.read()).decode() if photo else None
    # today's totals go INTO the pipeline so the reply can narrate remaining macros
    today = db.today_totals(user_id) if user_id else None
    result = pipeline.invoke({"image_b64": image_b64, "text": text, "today": today,
                              "guest": user_id is None})

    response = {
        "is_food_log": result["is_food_log"],
        "items": result["items"],
        "totals": result["totals"],
        "totals_partial": result.get("totals_partial", False),
        "overall_confidence": result["overall_confidence"],
        "needs_confirmation": result["needs_confirmation"],
        "reply": result["reply"],
        "saved": False,
        "auth_expired": auth_expired,
    }
    # High confidence food + logged in -> auto-log. Low confidence -> client POSTs /confirm.
    if user_id and result["is_food_log"] and not result["needs_confirmation"]:
        db.save_meal(user_id, result["items"], result["totals"])
        response["saved"] = True
        response["today"] = db.today_totals(user_id)
    if user_id:
        db.save_chat(user_id, "user", {"text": text, "photo": photo is not None})
        db.save_chat(user_id, "bot", {k: response[k] for k in
                     ("reply", "items", "totals", "needs_confirmation", "saved")})
    return response


class ConfirmItem(BaseModel):
    name: str
    prep_style: str | None = None
    portion_grams: float = Field(gt=0)


class ConfirmBody(BaseModel):
    # items from /analyze with user-adjusted grams; never empty
    items: list[ConfirmItem] = Field(min_length=1)


@app.post("/confirm")
def confirm(body: ConfirmBody, user_id: str = Depends(db.current_user_id)):
    # User confirmed portions -> treat as high confidence, re-run lookup + aggregate.
    state = {"items": [
        i.model_dump() | {"portion_confidence": "high"} for i in body.items
    ]}
    state |= lookup(state)
    state |= aggregate(state)
    db.save_meal(user_id, state["items"], state["totals"])
    result = {
        "items": state["items"],
        "totals": state["totals"],
        "saved": True,
        "today": db.today_totals(user_id),
    }
    db.save_chat(user_id, "bot", {
        "reply": "Confirmed and logged.", "items": state["items"],
        "totals": state["totals"], "needs_confirmation": False, "saved": True,
    })
    return result


# --- public: recipe / ingredient macro lookup (no auth, no LLM) ---

class Ingredient(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    grams: float = Field(gt=0, le=10000)


class RecipeBody(BaseModel):
    ingredients: list[Ingredient] = Field(min_length=1, max_length=50)


# 50 ingredients x one live USDA call would pin a worker for minutes and burn the
# API quota, unauthenticated. Local data (staples/INDB/USDA seed) stays unlimited.
MAX_LIVE_USDA_PER_RECIPE = 5


@app.post("/foods/lookup")
def foods_lookup(body: RecipeBody, request: Request):
    """Sum macros for a list of (name, grams) via nutrition.lookup — INDB then USDA,
    no LLM. Powers the recipe-macro calculator; same DB the AI layer uses."""
    ratelimit.check_public(request, "foods_lookup", 60)
    items = []
    live_left = MAX_LIVE_USDA_PER_RECIPE
    totals = {"kcal": 0.0, "protein": 0.0, "carbs": 0.0, "fat": 0.0}
    for ing in body.ingredients:
        hit = nutrition.lookup(ing.name, allow_live=live_left > 0)
        if hit and hit.get("live"):
            live_left -= 1
        if not hit or hit.get("kcal_100g") is None:
            items.append({"name": ing.name, "grams": ing.grams, "matched": None})
            continue
        f = ing.grams / 100.0
        m = {
            "kcal": round(hit["kcal_100g"] * f, 1),
            "protein": round(hit["protein_100g"] * f, 1),
            "carbs": round(hit["carb_100g"] * f, 1),
            "fat": round(hit["fat_100g"] * f, 1),
        }
        for k in totals:
            totals[k] += m[k]
        items.append({"name": ing.name, "grams": ing.grams,
                      "matched": hit["matched_name"], "source": hit["source"], **m})
    unmatched = [i["name"] for i in items if i["matched"] is None]
    return {
        "items": items,
        "totals": {k: round(v, 1) for k, v in totals.items()},
        "unmatched": unmatched,
        "totals_partial": bool(unmatched),
    }


@app.get("/today")
def today(user_id: str = Depends(db.current_user_id)):
    return db.today_totals(user_id)


@app.get("/meals/today")
def meals_today(user_id: str = Depends(db.current_user_id)):
    """Today's meal rows for the dashboard list (newest first, tz-aware)."""
    return {"meals": db.today_meals(user_id)}


# --- manual food search + log (no LLM) ---

@app.get("/foods/search")
def foods_search(q: str, request: Request):
    """Name search for the manual-log picker. INDB FTS (fast); one USDA hit if INDB
    has nothing. ponytail: USDA stays a live single lookup until R10 bulk-local."""
    q = q.strip()[:120]
    if len(q) < 2:
        return {"results": []}
    hits = nutrition.search_indb(q, limit=8)
    if not hits:
        ratelimit.check_public(request, "foods_search_live", 60)  # only the live path
        u = nutrition.lookup_usda(q)
        if u:
            hits = [u]
    return {"results": [
        {"name": h["matched_name"], "source": h["source"],
         "kcal_100g": h["kcal_100g"], "protein_100g": h["protein_100g"],
         "carb_100g": h["carb_100g"], "fat_100g": h["fat_100g"]}
        for h in hits
    ]}


class ManualItem(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    grams: float = Field(gt=0, le=10000)
    kcal_100g: float = Field(ge=0)
    protein_100g: float = Field(ge=0)
    carb_100g: float = Field(ge=0)
    fat_100g: float = Field(ge=0)
    source: str | None = None


class ManualBody(BaseModel):
    items: list[ManualItem] = Field(min_length=1, max_length=30)


@app.post("/meals/manual")
def meals_manual(body: ManualBody, user_id: str = Depends(db.current_user_id)):
    """Log a meal from picked search results — scale per-100g by grams, sum, save."""
    items = []
    totals = {"kcal": 0.0, "protein": 0.0, "carbs": 0.0, "fat": 0.0}
    for it in body.items:
        f = it.grams / 100.0
        m = {
            "kcal": round(it.kcal_100g * f, 1),
            "protein": round(it.protein_100g * f, 1),
            "carbs": round(it.carb_100g * f, 1),
            "fat": round(it.fat_100g * f, 1),
        }
        for k in totals:
            totals[k] += m[k]
        items.append({"name": it.name, "portion_grams": it.grams,
                      "prep_style": None, "source": it.source, **m})
    totals = {k: round(v, 1) for k, v in totals.items()}
    db.save_meal(user_id, items, totals)
    return {"saved": True, "items": items, "totals": totals,
            "today": db.today_totals(user_id)}


@app.get("/meals/recent")
def meals_recent(user_id: str = Depends(db.current_user_id)):
    return {"meals": db.recent_meals(user_id)}


class RelogBody(BaseModel):
    meal_id: str


@app.post("/meals/relog")
def meals_relog(body: RelogBody, user_id: str = Depends(db.current_user_id)):
    totals = db.relog_meal(user_id, body.meal_id)
    return {"saved": True, "totals": totals, "today": db.today_totals(user_id)}


@app.get("/history")
def history(user_id: str = Depends(db.current_user_id)):
    return {"messages": db.chat_history(user_id)}


# --- trends + meal edit/delete (R9, no LLM) ---

@app.get("/trends")
def get_trends(days: int = 7, user_id: str = Depends(db.current_user_id)):
    return db.trends(user_id, 30 if days >= 30 else 7)


@app.get("/meals/history")
def meals_history(days: int = 30, user_id: str = Depends(db.current_user_id)):
    return {"meals": db.meals_range(user_id, 30 if days >= 30 else 7)}


class MealPatch(BaseModel):
    # item index -> new grams. dict[int, ...] makes pydantic coerce/reject the key,
    # instead of int() blowing up as a 500 deeper in db.update_meal.
    grams: dict[int, float] = Field(min_length=1)


@app.patch("/meals/{meal_id}")
def patch_meal(meal_id: str, body: MealPatch,
               user_id: str = Depends(db.current_user_id)):
    totals = db.update_meal(user_id, meal_id, body.grams)
    return {"updated": True, "totals": totals, "today": db.today_totals(user_id)}


@app.delete("/meals/{meal_id}")
def remove_meal(meal_id: str, user_id: str = Depends(db.current_user_id)):
    db.delete_meal(user_id, meal_id)
    return {"deleted": True, "today": db.today_totals(user_id)}
