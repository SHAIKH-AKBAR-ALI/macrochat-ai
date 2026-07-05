"""Phase 2 smoke test: signup -> login -> confirm meal -> today totals.

Skips /analyze (LLM cost); /confirm exercises the same lookup+aggregate+save path.
Run: .venv\\Scripts\\python test_phase2.py
"""
import uuid

from fastapi.testclient import TestClient

from app import db
from app.main import app

client = TestClient(app)
email = f"test-{uuid.uuid4().hex[:8]}@mailinator.com"  # example.com rejected by Supabase auth

# signup
r = client.post("/signup", json={
    "email": email, "password": "test-pass-123!",
    "height_cm": 175, "weight_kg": 70, "age": 30, "sex": "male",
    "activity_level": "moderate", "goal": "maintain", "time_zone": "Asia/Kolkata",
})
assert r.status_code == 200, r.text
user_id = r.json()["user_id"]
goals = r.json()["goals"]
# Mifflin-St Jeor: 10*70 + 6.25*175 - 5*30 + 5 = 1648.75; *1.55 = 2555.6
assert goals["daily_calorie_goal"] == 2556, goals

# login
r = client.post("/login", json={"email": email, "password": "test-pass-123!"})
assert r.status_code == 200, r.text
headers = {"Authorization": f"Bearer {r.json()['access_token']}"}

# bad token rejected
assert client.get("/today", headers={"Authorization": "Bearer junk"}).status_code == 401

# empty day
r = client.get("/today", headers=headers)
assert r.status_code == 200, r.text
assert r.json()["eaten"]["kcal"] == 0 and r.json()["meals_logged"] == 0

# confirm a meal (user-adjusted portions -> save)
r = client.post("/confirm", headers=headers, json={
    "items": [{"name": "chicken breast", "prep_style": "grilled", "portion_grams": 200}],
})
assert r.status_code == 200, r.text
body = r.json()
assert body["saved"] and body["totals"]["kcal"] > 0, body
assert body["today"]["meals_logged"] == 1
assert body["today"]["remaining"]["kcal"] == round(2556 - body["totals"]["kcal"], 1)

# chat history: /confirm wrote a bot message
r = client.get("/history", headers=headers)
assert r.status_code == 200, r.text
msgs = r.json()["messages"]
assert msgs and msgs[-1]["role"] == "bot" and msgs[-1]["content"]["saved"], msgs

# cleanup test user (cascades to profile + meals + chat)
db.sb.auth.admin.delete_user(user_id)

print(f"OK — meal kcal={body['totals']['kcal']}, remaining={body['today']['remaining']['kcal']}")
