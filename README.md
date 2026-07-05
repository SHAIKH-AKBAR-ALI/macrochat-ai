# MacroChat AI

AI nutrition tracker. Send a meal photo and/or text ("200g chicken, 1 roti") — it identifies the food, resolves portions, looks up real macros, and tracks your day against a personal goal.

**Core principle:** the LLM only identifies food and reasons about portions. Calorie/macro numbers always come from a real nutrition database (INDB for Indian foods, USDA for everything else), and daily totals are computed in backend SQL — never by the LLM.

## Features

- 📷 Photo and/or text meal logging (GPT-4o-mini vision for identification)
- 🇮🇳 INDB (Indian Nutrient Databank, 1,014 recipes) + USDA FoodData Central fallback, matched with rapidfuzz
- ✅ Confirm-before-save for low-confidence portion guesses; exact text portions auto-log
- 🎯 Personal daily goals via Mifflin-St Jeor (height/weight/age/sex/activity/goal)
- 📊 Time-zone-aware daily dashboard (calories/protein/carbs/fat vs. goal)
- 💬 Chat history persisted; "what did I eat today?" answered from backend totals
- 🌗 Neo-brutalist UI with dark mode; macro data rendered as FDA-nutrition-facts panels

## Stack

| Layer | Tech |
|---|---|
| LLM | OpenAI GPT-4o-mini (identify) + GPT-4o (respond) |
| Orchestration | LangGraph |
| Backend | FastAPI (Python) |
| Frontend | Astro |
| Auth + DB | Supabase (Postgres, RLS) |
| Nutrition data | INDB (in-memory) + USDA FoodData Central API |

## Run locally

Backend:

```bash
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
copy .env.example .env   # fill in keys
.venv\Scripts\uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev   # http://localhost:4321
```

### Environment variables

| Var | What |
|---|---|
| `OPENAI_API_KEY` | OpenAI key |
| `USDA_API_KEY` | USDA FoodData Central key (`DEMO_KEY` works for light testing) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Supabase service-role key (backend only) |

Frontend: `PUBLIC_API_URL` — backend base URL (defaults to `http://<host>:8000` for local dev).

## Tests

```bash
.venv\Scripts\python test_nutrition.py
.venv\Scripts\python test_phase2.py   # needs live Supabase
```

## API

| Endpoint | What |
|---|---|
| `POST /signup`, `POST /login` | Supabase auth; signup computes daily goals |
| `POST /analyze` | photo + optional text → macro breakdown (auto-saves when high-confidence + authed) |
| `POST /confirm` | save a meal after adjusting low-confidence portions |
| `GET /today` | time-zone-aware daily totals vs. goal |
| `GET /history` | chat history |
