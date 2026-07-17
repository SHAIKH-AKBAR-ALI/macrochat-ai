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
- LLM (logged-in): OpenAI GPT-4o-mini (food identification, cheap/high-volume) and
  GPT-4o (reasoning, conversational responses)
- LLM (guest / not logged in): Gemini 2.5 Flash via its OpenAI-compatible endpoint
  (`GEMINI_API_KEY`; falls back to OpenAI if unset) — saves OpenAI spend
- Orchestration: LangGraph
- Backend: FastAPI (Python)
- Frontend: Astro
- Auth + DB: Supabase (Postgres)
- Nutrition data: INDB (Indian Nutrient Databank — recipes + ingredients) loaded
  in-memory from `data/INDB.xlsx` (NOT in Supabase — locked decision, no benefit for
  single server), plus USDA FoodData Central API for generic/international foods
- Fuzzy matching: rapidfuzz (Python) to map LLM food descriptions to database entries
- Hosting: Render (Singapore, free tier) — see Deployment section
- No barcode scanning in this project (explicitly out of scope)
- No LlamaIndex / RAG — nutrition lookup is structured DB query, not semantic search

## Core pipeline (LangGraph nodes)
1. **Input** — photo and/or text from user
2. **Identify food** (GPT-4o-mini vision; Gemini for guests) — name each food item
   with the SIMPLEST literal reading (plain apple = "apple", never a dish/product
   containing it), note visible prep style and sauces/oil. User text naming a food is
   ground truth for identity — `reconcile_identity` strips vision's over-specific
   names to the user's plainer wording, and an outright identity conflict forces the
   confirm step (never auto-saves)
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

### Deployment — ✅ LIVE (2026-07-05)
- GitHub: https://github.com/SHAIKH-AKBAR-ALI/macrochat-ai (public); Render (Singapore, free):
  backend `macrochat-api` (srv-d94qovlckfvc73af7b70) → https://macrochat-api.onrender.com,
  static site `macrochat` (srv-d94qp2faqgkc73e983v0) → https://macrochat-d6oi.onrender.com
- Auto-deploy on push works (required installing the Render GitHub App on the repo —
  repo created via API had no webhook; "Git deployment credentials" in Render ≠ app install)
- Render pip-installs root requirements.txt even for the STATIC site → both services
  need `PYTHON_VERSION=3.12.7` env var; frontend bakes `PUBLIC_API_URL` at build
- Free tier: backend cold-starts ~50s after 15 min idle

### Misidentification bug-fix round — ✅ DONE (2026-07-05)
User repro: apple photo → "apple croissant" 381 kcal; banana photo + "one small banana"
text → "dehydrated banana meal" auto-saved. Root causes were BOTH in `lookup_usda`
ranking, not just vision:
- `token_set_ratio` name filter scores subset matches 100 ("apple" ⊂ "Croissants,
  apple") and fails on plurals ("apple" vs "Apples, raw" = 40 < 70 cutoff → all raw
  apples filtered out, croissant kept). Fixed: crude singularizer on both sides before
  comparing; pageSize 5→25 (USDA relevance is weak — "apple" top-5 had no raw apple)
- Ranking used WRatio which saturates at 90 on substrings (croissant == raw apple).
  Fixed: rank by (primary-phrase-covered, token_set+token_sort). USDA convention puts
  the primary food before the first comma — entries whose primary phrase is fully
  covered by the query outrank dishes/products containing it (crackers/noodles/flour)
- `IDENTIFY_SYSTEM`: literal-reading rule (plain apple = "apple" unless visual evidence
  of prep/processing) + user text names the food = that IS the food
- `reconcile_identity` (graph.py): user text is ground truth for identity — vision name
  ⊇ user's food words → strip to user's plainer name; zero overlap → force confirm
  (reuses portion_confidence="low"), never auto-save on identity conflict
- Tests: `test_identity.py` (reconcile logic, no LLM), plain apple/banana kcal-range
  asserts in `test_nutrition.py`. Known ceiling: bare "rice" (no prep) → "Rice
  crackers"; vision always supplies prep so unreached in practice
- Also: guest (unauthenticated) LLM traffic now runs Gemini 2.5 Flash via its
  OpenAI-compatible endpoint (`GEMINI_API_KEY`, falls back to OpenAI if unset);
  config.py needed `extra = "ignore"` (pydantic 2.13 forbids unknown .env keys)

### Stale-token 401 + Groq fallback + LangSmith — ✅ DONE (2026-07-17)
- "Guest photo → Something went wrong" root cause was NOT Gemini/vision (verified
  live: key valid, image + structured output + PNG-as-jpeg all pass): Render logs
  showed `/analyze → 401` — an expired `mc_token` (~1h, no refresh) sent as Bearer
  hard-failed `current_user_id`. Fix: `/analyze` degrades invalid token to guest
  analysis + `auth_expired` flag; chat.astro clears token + shows session-expired
  note. `/confirm` `/today` `/history` stay strict 401.
- Guest LLM chain now Gemini → Groq `meta-llama/llama-4-scout-17b-16e-instruct`
  (OpenAI-compat `api.groq.com/openai/v1`) → OpenAI, via per-model
  `with_structured_output` then `.with_fallbacks` (RunnableWithFallbacks has no
  with_structured_output). Groq needs `method="json_schema"` — its tool-calling
  emits bools as strings. `GROQ_API_KEY` in config (`GROQ_API_KEY_2` unused).
- LangSmith tracing on (env-only: `LANGCHAIN_TRACING_V2/API_KEY/PROJECT=macrochat`);
  monitoring decision: LangSmith only — no Ragas (no RAG), no Prometheus (Render
  dashboard covers infra).
- Render env updated (merge) + deployed; live-verified guest and stale-token
  `/analyze` both 200, `auth_expired: true` on stale.

### Frontend round 2 — ✅ DONE (2026-07-05)
- Dark-mode invisible text: form controls don't inherit `color` — composer input and
  gram-input showed UA-default black on dark paper. Fixed + `color-scheme` per theme
- Chat composer: separate 📷 Camera (`capture="environment"`) and + File inputs;
  whichever picked last wins
- New pages: /about, /privacy, /terms, /contact, 404, 500 (Render serves dist/404.html
  automatically); footer links to all + /#faq
- Landing: FAQ section (native details/summary, amber open state), staggered step
  reveals, amber highlight wipe on h1, drifting demo card — all motion gated on
  prefers-reduced-motion

### UI redesign — clean light modern + cold-start fixes — ✅ DONE + DEPLOYED (2026-07-18)
Full frontend restyle away from neo-brutalist to **clean light modern**, plus chat/premium
sections and free-tier cold-start UX. `npm run build` passing; live-verified locally
(backend + frontend both up). Deployed to Render alongside the two nutrition-matching
rounds below.
- **Design pivot** (user rejected neo-brutalist after seeing it): warm white bg, deep
  green-charcoal ink, fresh emerald accent (`--amber` = `#17a672`), citrus-coral
  secondary (`--burnt`). Rounded cards (16px), pill buttons/composer/chips, soft layered
  shadows — NO hard borders. Fonts: Plus Jakarta Sans (display+body) replaces
  Anton/Archivo; IBM Plex Mono kept for macro numbers. Dark mode inverts to deep
  green-black, accent brightens.
  - Trick that kept the diff small: **reused every CSS class name AND `:root` var name**
    (`--amber/--burnt/--paper/--card/--ink/--on-amber/--mute/--border/--bw`), only
    remapped their VALUES + component rules. So page markup, inline `style="var(--…)"`,
    and `anim.ts` donut colors resolve unchanged. Rewrite lived almost entirely in
    `frontend/src/styles/global.css` (full rewrite) + the font `<link>` in `Layout.astro`.
  - Heavy use of CSS `color-mix()` for tints (accent 12% over card, etc.) — modern
    browsers only, acceptable for a static Astro site.
- **New premium landing** (`index.astro`, ~146→~420 lines, 10 sections): count-up stats
  band, how-it-works w/ hand-drawn inline-SVG doodles, product-shot browser frame
  (centerpiece, contains a mock chat + donut), 6-cell feature grid, comparison strip
  (typical app vs MacroChat), receipts band (real logs, not fake testimonials), FAQ
  expanded 6→10 (added photo-vs-text, ~50s cold start, no-barcode, dark mode), mega CTA
  with drawn arrow.
- **Chat upgrades** (`chat.astro`): quick-action chips (tap→`requestSubmit`, hide after
  first send), typing indicator (pulsing dots via `typingEl()`), photo thumbnail in user
  bubble (`URL.createObjectURL`, revoke on load), animated macro donut ring on every
  facts panel, numbers count up on live/confirm (not history replay).
- **New shared file** `frontend/src/lib/anim.ts`: `REDUCED` (prefers-reduced-motion),
  `countUp(el)` (rAF, reads `data-count`/`data-suffix`), `donut(p,c,f)` (SVG kcal-split
  ring, protein/carb/fat = 4/4/9, returns null if any macro null). `Layout.astro` IO
  reveal-observer also runs `countUp` on `[data-count]` children. New `public/favicon.svg`.
- **Dashboard**: meters grow from 0 (rAF after 0-width paint), remaining numbers count
  up, today's macro-split donut; all guarded against bfcache re-run stacking.
- **Cold-start UX** (the "Failed to fetch" a guest hits on the LIVE free tier — backend
  sleeps after 15 min idle, first request wakes it in ~50s):
  - `chat.astro`: after 4s the typing text switches to "Waking the server — first request
    can take ~50s…"; a network-error (`Failed to fetch`) auto-retries the fetch once;
    friendlier catch message instead of raw error.
  - `app/main.py`: added `GET /health` → `{"ok": True}` (cheap ping target).
  - `.github/workflows/keepalive.yml`: GitHub Actions cron pings `/health` every 10 min
    so the backend never sleeps. Ceiling: GH cron drifts a few min + auto-disables after
    60 days repo inactivity. Free-tier 750 instance-hrs/mo ≈ 730 hrs in a month, so one
    always-on service still fits the quota.
  - Diagnosis note: local "Failed to fetch" was just the backend not started (only ran
    frontend). LIVE stack verified healthy — frontend baked to
    `https://macrochat-api.onrender.com`, CORS allows `*.onrender.com`, `/analyze` 200
    (but 55s cold). Run BOTH servers locally: backend
    `.venv\Scripts\uvicorn app.main:app --port 8000 --reload`, frontend `cd frontend; npm run dev`.
- **TODO next session**: commit + push to deploy (Render auto-deploys static site +
  backend; GitHub starts the keepalive cron). Then live-verify brother's guest flow.
  Optionally revisit the emerald shade if user wants a different green (one-line var swap).

### Staple seed list + match-confidence gate — ✅ DONE + DEPLOYED (2026-07-18)
User repro: "200g grilled chicken, rice" → "rice" fuzzy-hit USDA "Rice crackers" → 1,134
kcal (should be ~590). Two root causes: no preference for plain staples over processed
variants, and no confidence signal on weak text→DB matches (a garbage-above-cutoff match
looked identical to a perfect one, so nothing gated it and it could auto-save silently).
`test_nutrition.py` + `test_identity.py` passing.
- **Part 1 — staple seed list** (`app/nutrition.py`): `_STAPLE_ENTRIES` hand-maintained
  table of PLAIN COOKED macros per 100g, exact-alias `match_staple()` checked FIRST in
  `lookup()` (before INDB/USDA), deterministic (no fuzz/API), so "rice crackers"/"rice
  flour" never resolve here. Only **rice** (130/2.7/28.2/0.3) + **dal/lentils**
  (116/9.0/20.1/0.4) — probed INDB first: rice/dal/lentils → None (fell to USDA junk);
  roti/chapati DELIBERATELY excluded, INDB already nails them ("Chapati/Roti" 202 kcal),
  a staple entry would override that curated value AND break the roti→INDB test. Values
  from USDA SR Legacy cooked forms. Extend from query logs when available.
- **Part 2 — match-confidence gate**: `lookup()` hits now carry `score` (0-100) +
  `candidates` (2-3 alt names). Scores: STAPLE=100, INDB=its WRatio (≥88 by FUZZ_CUTOFF),
  USDA=100 if the match's PRIMARY phrase (before first comma) is the queried food else 50
  (found only inside another product — "Rice crackers"/"Oil, oat"). `MATCH_CONFIDENCE_MIN
  = 70` sits in the gap → only the USDA-50 bucket gates. `graph.py` `aggregate` sets
  per-item `match_needs_confirm` + forces meal `needs_confirmation` on any weak item →
  no silent auto-save; `lookup` node attaches `match_confidence`/`match_candidates` to
  each item (candidates flow to frontend via existing `response["items"]`, editable-match
  UI NOT built yet). `main.py` unchanged — existing `needs_confirmation` guard blocks save.
  - **Metric dead-end worth remembering**: first tried score = avg(token_set, token_sort).
    Rejected — it gated CORRECT matches (apple 69, chicken 73, quinoa 77: token_sort
    punishes short-query-vs-long-USDA-desc regardless of correctness) and passed WRONG
    ones. The primary-phrase-coverage flag (already computed in `lookup_usda`'s `rank()`)
    is the real good-vs-bad signal; reused it. ceiling: coarse binary — a wrong match that
    still ranks group-0 wouldn't gate; refine the covered bucket only if that shows up.
  - Kept the gate on a SEPARATE `match_needs_confirm` flag rather than overloading
    `portion_confidence="low"` (as `reconcile_identity` does) so bad-portion vs bad-match
    stay distinguishable + independently testable. Flagged, not merged.
- Tests added to `test_nutrition.py`: staple hit + non-overmatch, deterministic gate
  (weak/strong `match_confidence` → aggregate `needs_confirmation`), bug-meal integration
  (rice→STAPLE, total < 800 kcal).

### Dal no-match + partial-total + guest session-expired misfire — ✅ DONE + DEPLOYED (2026-07-18)
Three bugs after the staple/gate round, all reproduced then fixed; `test_nutrition.py`
+ `test_identity.py` passing, `npm run build` passing. Deployed to Render with the
staple/gate round and the UI redesign in one push.
- **#1 dal → NO_MATCH.** `match_staple` is exact-alias, but the LLM almost always
  QUALIFIES dal ("dal fry"/"toor dal"/"moong dal"/"dal tadka"/"yellow dal") — none are
  aliases, INDB has no plain dal, USDA has no "dal fry" → NO_MATCH. (`match_staple("dal")`
  itself works; verified the bare name resolves.) Fix: `match_staple_token()` in
  `nutrition.py` — a dal-family token (`dal/daal/dhal/lentil/lentils`) anywhere in the
  name → plain cooked dal, wired into `lookup()` **after INDB** so a curated "Dal Makhani"
  still wins. Rice deliberately NOT token-matched (qualified rice = "fried rice"/"rice
  crackers"/"rice flour" is a different food; qualified dal is still ~plain dal). ceiling:
  a fried "dal papad" would undercount. `reconcile_identity` doesn't rescue qualified
  names because its `user_set ⊆ item_set` test uses the whole meal's food words, so a
  second item ("roti") breaks the subset — left as-is, token fallback covers it.
- **#2 no-match item silently dropped from total.** `aggregate`'s gate had
  `score is not None` which let a fully-unmatched item (`match_confidence=None`) escape →
  with high portions the partial total auto-saved as if complete (repro: "2 rotis and
  dal" → 404.6 kcal roti-only, dal missing). Fix: `unmatched = kcal is None` also fires
  `match_needs_confirm` → forces `needs_confirmation`; added `totals_partial` flag
  threaded State → respond summary → API response (`main.py`) so reply/UI can say the
  total excludes unmatched items.
- **#3 "session expired" misfires in guest flow.** `authHeaders()` sent `Bearer mc_token`
  whenever the token existed — a lingering ~1h-expired token from a prior login tagged
  along into guest analysis → `/analyze` 401 → `auth_expired` → scary notice mid guest
  turn. Fix: `token()` in `frontend/src/lib/api.ts` now reads the JWT `exp` client-side
  (no network) and drops an expired token before it's sent; backend `auth_expired` stays
  as the safety net. Notice now only appears on genuine mid-session expiry.
- Tests: qualified-dal → STAPLE (+ dal makhani → INDB), unmatched → `needs_confirmation`
  + `totals_partial` in `test_nutrition.py`.

### Phase 4+ — Later / not yet scoped
Full 10-phase future plan lives in `ROADMAP.txt` (2026-07-05): session polish (token
refresh, cold-start UX), meal edit/delete/re-log, history & trends, quick-log
favorites, mobile PWA, Indian household portion units (katori/chamach) + per-user
portion memory, goal coaching, micronutrients, sharing/export, and finally barcode +
packaged foods. Highlights previously listed here (barcode, multi-day trends, RAG
meal-history querying) are folded into it.

## Project docs (root, not code)
- `ROADMAP.txt` — 10 future phases ordered by user value, with sequencing logic
- `INTERVIEW_QA.txt` — 35 Q&A prep: project overview (10), problems faced + approach
  (15), tech stack & architecture (10)

## Explicit non-goals
- Do not claim or imply 100% accurate calorie counts — always communicate confidence
  level (exact vs. estimated range)
- Do not let the LLM's trained "memory" of calorie values override the actual
  nutrition database lookup
- Do not do daily-total arithmetic inside the LLM prompt/response — always backend-computed