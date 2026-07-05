# CLAUDE.md — MacroChat AI (personal project)

## Project overview
An AI nutrition tracker. User sends a meal photo and/or text (e.g. "200g chicken, 1 roti").
The system identifies food, resolves portions, looks up macros from a real nutrition
database, and returns calories/protein/carbs/fat. Optionally tracks daily totals against
a user's goal.

Core principle: the LLM's job is identification and portion reasoning. It is NEVER the
source of truth for calorie/macro numbers — those always come from a real database
(INDB for Indian foods, USDA for everything else). The LLM should also never be trusted
to do arithmetic for daily totals — that's backend/SQL, not a chat response.

## Tech stack
- LLM: OpenAI GPT-4o-mini (food identification, cheap/high-volume) and GPT-4o (reasoning,
  conversational responses)
- Orchestration: LangGraph
- Backend: FastAPI (Python)
- Frontend: Astro
- Auth + DB: Supabase (Postgres)
- Nutrition data: INDB (Indian Nutrient Databank — recipes + ingredients) loaded into
  Supabase, plus USDA FoodData Central API for generic/international foods
- Fuzzy matching: rapidfuzz (Python) to map LLM food descriptions to database entries
- No barcode scanning in this project (explicitly out of scope)
- No LlamaIndex / RAG — nutrition lookup is structured DB query, not semantic search

## Core pipeline (LangGraph nodes)
1. **Input** — photo and/or text from user
2. **Identify food** (GPT-4o-mini, vision) — name each food item, note visible prep
   style (grilled/fried/curry/etc.), note visible sauces/oil if apparent
3. **Resolve portion**:
   - If user gave text portions (e.g. "200g chicken") → use directly, high confidence,
     skip confirmation
   - If no text → LLM estimates portion from photo, LOW confidence → go to confirm step
4. **Confirm with user** (only on low confidence) — show the guessed portion, let user
   adjust before proceeding. Never silently log a low-confidence guess.
5. **Nutrition lookup** — query INDB first for Indian dishes/ingredients, fall back to
   USDA for anything not found. Use rapidfuzz to match LLM's food description to DB
   entry names. Preparation style from step 2 determines which DB entry to pick
   (e.g. "grilled chicken breast" vs "fried chicken").
6. **Aggregate macros** — sum calories/protein/carbs/fat across all items in the meal.
   Tag overall confidence (high if all portions were text-given, mixed/low otherwise).
7. **Save meal to database** (Supabase) — store per-item and total macros, tied to
   user_id and a UTC timestamp.
8. **Update daily totals** (backend SQL, not LLM) — sum today's meals for that user,
   filtered by the user's stored time zone (local midnight to midnight), compare
   against their daily goal.
9. **Respond to user** (GPT-4o) — phrase the results conversationally, including
   remaining calories/macros for the day if tracking is enabled. The LLM only narrates
   numbers the backend already computed — it must not recompute or guess totals.

## Data model (Supabase, rough shape)
- `users`: id, email, height, weight, age, sex, activity_level, goal, time_zone,
  daily_calorie_goal, daily_protein_goal, daily_carb_goal, daily_fat_goal
- `meals`: id, user_id, created_at (UTC), items (jsonb: name, grams, prep_style,
  confidence), total_calories, total_protein, total_carbs, total_fat
- `nutrition_db`: source (INDB/USDA), food_name, per_100g macros, prep_style variants

## Daily goal calculation
Use Mifflin-St Jeor equation for BMR from height/weight/age/sex, multiply by an
activity factor, adjust for stated goal (lose/maintain/gain). This is plain backend
math — do not ask the LLM to compute this.

## Confirmation UX rule (locked decision)
- Exact text portions given → auto-log, no confirmation needed
- Photo-only, portion guessed → always confirm with user before saving to daily totals

## Time zone handling (locked decision)
Capture time zone at signup (auto-detect + let user confirm/override). Store per-user.
All "today" boundaries for daily totals must filter using the user's stored time zone,
not server time or a hardcoded zone.

## Build phases

### Phase 1 — Core pipeline (no auth, no tracking) — ✅ DONE (2026-07-05, photo-only path still unverified)
Status: built and verified with text input (200g grilled chicken + 2 rotis → 504 kcal,
chicken via USDA, roti via INDB). Photo-only input not yet tested — needs a real meal photo.
- Code: `app/nutrition.py` (INDB in-memory + exact-alias pass + rapidfuzz WRatio cutoff 88 + USDA fallback),
  `app/graph.py` (LangGraph), `app/main.py` (`POST /analyze`), `test_nutrition.py` (passing)
- INDB.xlsx in `data/` (1,014 recipes); loaded in-memory, NOT in Supabase yet (Phase 2)
- Confirm round-trip deferred to Phase 2 — API returns `needs_confirmation` flag instead
- Keys in `.env` (OpenAI + USDA), both validated
- Run: `.venv\Scripts\uvicorn app.main:app --reload`

- LangGraph flow: input → identify → resolve portion → confirm (if needed) → lookup →
  aggregate → respond
- Load INDB dataset into a local/Supabase table; wire up USDA API as fallback
- Basic FastAPI endpoint: accepts photo + optional text, returns macro breakdown JSON
- No persistence of meals yet — one-shot analysis only
- Goal: prove the pipeline gives sane, well-reasoned macro estimates for both
  text+photo and photo-only inputs

### Phase 2 — Auth, persistence, daily tracking — ✅ DONE (2026-07-05)
Status: built and verified end-to-end against live Supabase (`test_phase2.py` passing:
signup → login → confirm meal → tz-aware today totals; `test_nutrition.py` still passing;
security advisors clean).
- Schema live in Supabase: `profiles` (goals + time_zone) and `meals` (items jsonb +
  totals), both RLS-enabled with owner-only policies
- Code: `app/db.py` (service client, bearer-token auth dep, Mifflin-St Jeor goals,
  save_meal, today_totals via stdlib zoneinfo), `app/main.py` (`/signup`, `/login`,
  `/analyze` auto-saves only high-confidence when authed, `/confirm`, `/today`)
- Signup uses admin create_user with instant email confirm (no confirmation email —
  avoids Supabase 2/hr email rate limit); switch to sign_up if verification ever matters
- Login is a stateless GoTrue REST call — never sign_in on the shared service client
  (it would swap the client's auth to the user's JWT and poison later requests)
- supabase-py upgraded 2.11.0 → 2.31.0 (old version rejected `sb_secret_` keys)
- Deferred: LLM narration of remaining daily macros → Phase 3; INDB stays in-memory
  (not moved to Supabase — no benefit for single server)

- Supabase auth (signup/login)
- Signup form collects height/weight/age/sex/activity/goal/time zone
- Compute and store daily goals (Mifflin-St Jeor)
- Save each analyzed meal to `meals` table
- Backend endpoint/query for "today's totals" (time-zone-aware)
- Wire the confirm-before-save UX for low-confidence portion guesses

### Phase 3 — Frontend polish — ✅ DONE (2026-07-05)
Status: Astro frontend built in `frontend/` (landing, /login, /signup, /chat, /dashboard),
wired to live FastAPI endpoints; `npm run build` passing; CORS added to `app/main.py`
for localhost:4321. Visual style: neo-brutalist (cream/black/amber, Anton + Archivo +
IBM Plex Mono, hard 3px borders, no radius/shadow/gradient); signature element is
FDA-nutrition-facts-style panels for all macro data.
- Token stored in localStorage (`mc_token`); guest mode works on /chat (analyze only,
  no save); confirm flow renders editable grams inputs inside the facts panel
- Signup auto-detects time zone via `Intl.DateTimeFormat().resolvedOptions().timeZone`
- Run: backend `.venv\Scripts\uvicorn app.main:app --reload`; frontend: `cd frontend` then `npm run dev`
- Note: Edge headless clamps window width to ~500px — mobile screenshots below that are
  cropped artifacts, not layout bugs

- Astro frontend: chat-style input (photo upload + text box)
- Dashboard view: calories/protein/carbs/fat progress bars vs. daily goal (reference:
  MacroChat.io style dashboard)
- Chat responses styled conversationally, referencing remaining daily macros

### Phase 1–3 audit — ✅ patched (2026-07-05)
Reviewed all backend + frontend code; three bugs fixed and verified (targeted asserts +
`test_nutrition.py` passing):
- `app/graph.py` aggregate: empty items list was `all([]) == True` → auto-saved 0-kcal
  meals for non-food input; now forces `needs_confirmation` when no items
- `app/main.py` `/confirm`: `portion_grams` now `Field(gt=0)`, `items` `min_length=1`
  (API is a trust boundary — frontend `min="1"` isn't validation)
- `app/nutrition.py` `match_indb`: rapidfuzz `extractOne` on a pandas Series returns the
  index LABEL, code used `.iloc` (positional) → wrong row if INDB index ever has gaps;
  now `.loc`. Latent only (current INDB: 1,014 rows, zero NaN names, contiguous index)
Known-minor, not fixed: orphan auth user if profile insert fails mid-signup (`/today`
500s for that account); `/confirm` re-runs lookup so a USDA outage at confirm time saves
null-macro items (undercount, item tagged null); Supabase tokens expire ~1h, no refresh
(dashboard redirects to login on 401).

### Bug-fix + polish round — ✅ DONE (2026-07-05)
User-reported bugs fixed and verified (`test_nutrition.py`, `test_phase2.py`, live-LLM
intent E2E all passing; `npm run build` passing):
- USDA junk matches ("boiled quinoa" → "Chicken, feet, boiled"): `lookup_usda` now
  filters candidates by food-NAME token_set_ratio ≥ `USDA_NAME_MATCH` (70, knob) using
  `utils.default_process` (raw token_set_ratio dies on USDA's commas), and skips
  kcal-less entries (e.g. "Flour, quinoa") instead of returning None
- INDB substring trap ("broccoli" → "Cream of broccoli soup", WRatio 90): fuzzy pass
  adds token_sort_ratio ≥ 60 guard (dish-vs-ingredient length penalty)
- "what did I eat today?" analyzed as a meal: identify returns `is_food_log`;
  conditional edge routes non-food to a chat respond path answering from
  backend-computed `today` totals (now passed into pipeline state when authed — meal
  replies also narrate remaining-today, the deferred Phase-3 item) and never saves;
  main.py auto-save guard includes `is_food_log`
- Chat history not persisted: `chat_messages` table (Supabase, RLS owner-only),
  `db.save_chat`/`chat_history`, `GET /history`; chat.astro replays on load (history
  facts panels render static, never re-confirmable)
- Dashboard stale after logging: back-nav restored from bfcache without re-running
  the script — `pageshow`+`persisted` refetch, meters cleared on rerun
- Replies too long: RESPOND_SYSTEM rewritten (2–4 sentences + one tip); CHAT_SYSTEM
  for question turns
- Dark mode: `data-theme` on `<html>` (pre-paint inline script, `mc_theme` in
  localStorage, OS fallback); inverted paper/card/ink/mute; amber constant with
  `--on-amber` dark text wherever amber is a background; ◐ nav toggle
- Landing: hero staggered rise, `.reveal` IntersectionObserver sections, hard-shadow
  hover lifts, health-tips marquee; all motion gated on prefers-reduced-motion
- Mobile: sticky composer, full-width messages, wrapping facts rows

### Phase 4 — Later / not yet scoped
- Barcode scanning (explicitly skipped for now)
- Multi-day history / trends
- Any RAG-style "ask about my meal history" natural language querying (would justify
  LlamaIndex later — not needed now)

## Explicit non-goals
- Do not claim or imply 100% accurate calorie counts — always communicate confidence
  level (exact vs. estimated range)
- Do not let the LLM's trained "memory" of calorie values override the actual
  nutrition database lookup
- Do not do daily-total arithmetic inside the LLM prompt/response — always backend-computed