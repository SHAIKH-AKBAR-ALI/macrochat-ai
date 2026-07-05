import base64
from typing import Literal

from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

from app import db
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
    user_id = db.current_user_id(cred) if cred is not None else None
    # today's totals go INTO the pipeline so the reply can narrate remaining macros
    today = db.today_totals(user_id) if user_id else None
    result = pipeline.invoke({"image_b64": image_b64, "text": text, "today": today,
                              "guest": user_id is None})

    response = {
        "is_food_log": result["is_food_log"],
        "items": result["items"],
        "totals": result["totals"],
        "overall_confidence": result["overall_confidence"],
        "needs_confirmation": result["needs_confirmation"],
        "reply": result["reply"],
        "saved": False,
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


@app.get("/today")
def today(user_id: str = Depends(db.current_user_id)):
    return db.today_totals(user_id)


@app.get("/history")
def history(user_id: str = Depends(db.current_user_id)):
    return {"messages": db.chat_history(user_id)}
