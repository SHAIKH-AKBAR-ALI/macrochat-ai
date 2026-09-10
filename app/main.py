import base64
from typing import Literal

from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

from app import db, nutrition
from app.graph import aggregate, lookup, pipeline

app = FastAPI(title="MacroChat AI — Phase 3")
app.add_middleware(
    CORSMiddleware,
    # Astro dev on this machine or any device on the private LAN
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+):4321|https://[a-z0-9-]+\.onrender\.com",
    allow_methods=["*"],
    allow_headers=["*"],
)

_optional_bearer = HTTPBearer(auto_error=False)


@app.get("/health")
def health():
    return {"ok": True}


# --- auth ---

class SignupBody(BaseModel):
    email: str
    password: str
    height_cm: float
    weight_kg: float
    age: int
    sex: Literal["male", "female"]
    activity_level: Literal["sedentary", "light", "moderate", "active", "very_active"]
    goal: Literal["lose", "maintain", "gain"]
    time_zone: str  # IANA name, e.g. "Asia/Kolkata"; frontend auto-detects, user confirms


@app.post("/signup")
def signup(body: SignupBody):
    try:
        # ponytail: admin create with instant confirm — skips confirmation email
        # (and its 2/hr rate limit). Switch to sign_up if email verification ever matters.
        res = db.sb.auth.admin.create_user(
            {"email": body.email, "password": body.password, "email_confirm": True}
        )
    except Exception as e:
        raise HTTPException(400, str(e))
    goals = db.daily_goals(body.height_cm, body.weight_kg, body.age,
                           body.sex, body.activity_level, body.goal)
    db.sb.table("profiles").insert({
        "id": res.user.id,
        "height_cm": body.height_cm, "weight_kg": body.weight_kg,
        "age": body.age, "sex": body.sex,
        "activity_level": body.activity_level, "goal": body.goal,
        "time_zone": body.time_zone, **goals,
    }).execute()
    return {"user_id": res.user.id, "goals": goals}  # then POST /login for a token


class LoginBody(BaseModel):
    email: str
    password: str


@app.post("/login")
def login(body: LoginBody):
    res = db.password_login(body.email, body.password)
    return {"access_token": res["access_token"], "user_id": res["user"]["id"]}


# --- analysis + tracking ---

@app.post("/analyze")
async def analyze(
    photo: UploadFile | None = File(None),
    text: str | None = Form(None),
    cred: HTTPAuthorizationCredentials | None = Depends(_optional_bearer),
):
    if photo is None and not text:
        raise HTTPException(422, "Provide a photo, text, or both.")
    image_b64 = base64.b64encode(await photo.read()).decode() if photo else None
    # Stale/expired token must not hard-fail analysis — degrade to guest and flag it
    # so the client can clear the token. Save/confirm/today still require real auth.
    auth_expired = False
    user_id = None
    if cred is not None:
        try:
            user_id = db.current_user_id(cred)
        except HTTPException:
            auth_expired = True
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


@app.post("/foods/lookup")
def foods_lookup(body: RecipeBody):
    """Sum macros for a list of (name, grams) via nutrition.lookup — INDB then USDA,
    no LLM. Powers the recipe-macro calculator; same DB the AI layer uses."""
    items = []
    totals = {"kcal": 0.0, "protein": 0.0, "carbs": 0.0, "fat": 0.0}
    for ing in body.ingredients:
        hit = nutrition.lookup(ing.name)
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
def foods_search(q: str):
    """Name search for the manual-log picker. INDB FTS (fast); one USDA hit if INDB
    has nothing. ponytail: USDA stays a live single lookup until R10 bulk-local."""
    q = q.strip()
    if len(q) < 2:
        return {"results": []}
    hits = nutrition.search_indb(q, limit=8)
    if not hits:
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
    # index (as string) -> new grams for that item
    grams: dict[str, float] = Field(min_length=1)


@app.patch("/meals/{meal_id}")
def patch_meal(meal_id: str, body: MealPatch,
               user_id: str = Depends(db.current_user_id)):
    totals = db.update_meal(user_id, meal_id, body.grams)
    return {"updated": True, "totals": totals, "today": db.today_totals(user_id)}


@app.delete("/meals/{meal_id}")
def remove_meal(meal_id: str, user_id: str = Depends(db.current_user_id)):
    db.delete_meal(user_id, meal_id)
    return {"deleted": True, "today": db.today_totals(user_id)}
