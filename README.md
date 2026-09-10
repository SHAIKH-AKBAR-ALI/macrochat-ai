# MacroChat AI

A worldwide macro tracker. Free calculators and food-macro pages up front (no
signup); an AI meal logger and daily tracking once you sign in.

**Core principle:** the LLM only identifies food and reasons about portions.
Calorie/macro numbers always come from a real nutrition database (USDA
FoodData Central worldwide, INDB for Indian dishes), and daily totals are
computed in backend SQL — never by the LLM.

Live: frontend <https://macrochat-d6oi.onrender.com> · API
<https://macrochat-api.onrender.com>

## Features

### Free — no account
- **Six calculators** (client-side, save inputs in `localStorage`): macro, TDEE,
  BMR (Mifflin-St Jeor / Katch-McArdle), protein, calorie-deficit, and a
  recipe calculator that sums real ingredients via the food DB.
- **Lockable P/C/F macro-split sliders** + five diet-preset cards.
- **~500 `/foods/<food>-macros/` pages** and **~3,900 `/compare/<a>-vs-<b>/`
  pages** — per-100 g calories + macros + fiber/sugar/sodium/sat-fat from USDA
  and INDB, with per-nutrient bar charts, an interactive portion / serving-size
  control, FAQs and JSON-LD. Sitemap included.

### Signed in
- 📷 Photo and/or text meal logging (GPT-4o-mini vision; Gemini/Groq for guests).
- ✅ Confirm-before-save for low-confidence portion guesses; exact text portions
  auto-log. Guest demo is metered server-side (5/hour, 20/day per IP, plus a
  global daily backstop) — see `app/ratelimit.py`.
- 🔎 Manual food search + one-tap re-log of recent meals (no LLM).
- 📊 Time-zone-aware daily dashboard, week trend chart + streak, meal edit/delete,
  30-day history.
- 🎯 Personal daily goals via Mifflin-St Jeor. 🌗 Light/dark, editorial teal theme.

## Stack

| Layer | Tech |
|---|---|
| LLM (signed in) | OpenAI GPT-4o-mini (identify) + GPT-4o (respond) |
| LLM (guest) | Gemini 2.5 Flash → Groq Llama-4 Scout → OpenAI (fallback chain) |
| Orchestration | LangGraph |
| Backend | FastAPI (Python) |
| Frontend | Astro + Preact islands (`@astrojs/preact`), no framework for static pages |
| Auth + DB | Supabase (Postgres, RLS) — user profiles + meals only |
| Nutrition data | `data/indb.sqlite` — INDB (1,014 recipes) + a USDA SR Legacy import (~2,600 foods), both with FTS5; USDA live API as a last-resort fallback |
| Fuzzy matching | rapidfuzz + SQLite FTS5 |
| Hosting | Render (Singapore, free tier) |

Out of scope: barcode scanning, RAG / semantic search.

## Run locally

Backend:

```bash
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
copy .env.example .env   # fill in keys
.venv\Scripts\uvicorn app.main:app --port 8000 --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev   # http://localhost:4321
```

`data/indb.sqlite` and `frontend/src/data/seo-foods.json` are committed, so no
data build is needed to run the app. To rebuild the food data:

```bash
python scripts/build_indb_db.py       # data/INDB.xlsx -> data/indb.sqlite
python scripts/build_usda_db.py       # needs the SR Legacy CSVs in data/usda_src/ (see script docstring)
python scripts/export_seo_data.py     # -> frontend/src/data/seo-foods.json
```

### Environment variables

| Var | What |
|---|---|
| `OPENAI_API_KEY` | OpenAI key (signed-in LLM calls) |
| `GEMINI_API_KEY`, `GROQ_API_KEY` | guest LLM fallback chain (optional) |
| `USDA_API_KEY` | USDA FoodData Central key — fallback only; `DEMO_KEY` works for testing |
| `USDA_LOCAL` | `0` to force the live USDA API instead of the local table (default on) |
| `SUPABASE_URL`, `SUPABASE_SECRET_KEY` | Supabase project URL + service-role key (backend only) |
| `LANGCHAIN_*` | LangSmith tracing (optional) |

Frontend: `PUBLIC_API_URL` — backend base URL (defaults to `http://<host>:8000`).

## Tests

```bash
.venv\Scripts\python test_nutrition.py      # nutrition layer, no LLM
.venv\Scripts\python test_identity.py       # identity reconciliation, no LLM
.venv\Scripts\python test_ratelimit.py      # rate limit / guest budget, no network
.venv\Scripts\python test_phase2.py         # signup/login/confirm/today — needs live Supabase
node frontend/src/lib/macros.test.ts        # calc-engine parity vs app/db.py (Node 24)
```

## API

Public (no auth, no LLM):

| Endpoint | What |
|---|---|
| `GET /health` | liveness ping |
| `POST /foods/lookup` | sum macros for a list of `{name, grams}` ingredients |
| `GET /foods/search?q=` | food name search for the manual-log picker |

Signed in:

| Endpoint | What |
|---|---|
| `POST /signup`, `POST /login` | Supabase auth; signup computes daily goals |
| `POST /analyze` | photo + optional text → macro breakdown (auto-saves when high-confidence) |
| `POST /confirm` | save a meal after adjusting low-confidence portions |
| `POST /meals/manual` | log a meal from picked search results |
| `GET /meals/today`, `GET /meals/history?days=` | meal rows for the dashboard / history |
| `GET /meals/recent`, `POST /meals/relog` | recent distinct meals + one-tap re-log |
| `PATCH /meals/{id}`, `DELETE /meals/{id}` | edit item grams (re-aggregate) / delete |
| `GET /today` | time-zone-aware daily totals vs. goal |
| `GET /trends?days=7\|30` | per-day series, streak, rule-based insights |
| `GET /history` | chat history |
