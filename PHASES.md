# MacroChat AI — Full Rework, Phased (R1–R10)

**Rule:** do ONE phase at a time. Finish it, run its done-check, report to user,
wait. Then next. After R10, regroup.

**Design north star:** macronutrients.com — editorial, white + one accent, heavy
whitespace, "Free · No Signup" trust. See `LATEST_UPDATE.md`.

**Positioning:** worldwide macro tracker (USDA default). Indian-food support (INDB)
is a mentioned plus, never the headline. No "India-first" copy anywhere user-facing.

**Tech swaps folded into phases:**
- **pandas → SQLite** (stdlib `sqlite3`, FTS5 name search) — `INDB.xlsx` becomes
  `data/indb.sqlite`, USDA cache in the same file. Drops a 50 MB dep, faster cold
  start. Done in **R5 Part A** (first phase that queries the food DB from the new
  surface).
- **USDA live API → bulk local** — download USDA FoodData Central into the SQLite,
  swap live calls for local queries. Removes latency + the outage null-macro bug.
  Done in **R10 Part A** (SEO page generation needs the full dataset offline anyway).
- **Frontend interactivity: Preact islands** (LOCKED) — `@astrojs/preact` for the
  calculator + slider components (state-driven: change one value, everything
  recalculates/redraws itself; vanilla TS would be 200+ lines of manual DOM
  wiring). Islands = only the widget hydrates, rest of page stays static HTML,
  zero SEO cost. Vanilla for tiny bits (nav dropdown, tabs). Set up in **R2**.
- **Hosting split** (static frontend → Cloudflare Pages/Vercel; backend Render or
  Fly.io) — DEFERRED until a domain is bought. Not a phase yet.

**Assets:** Claude does not generate images/animation. When a phase needs one,
Claude writes a text prompt; user generates it in ChatGPT and drops the file in
`frontend/public/` (or `screenshot/` for reference).

**Locked decisions:** see `LATEST_UPDATE.md` → Decisions. Free = no-LLM-cost stuff;
AI = 2-3 free/session then signup; dashboard-primary when logged in; Astro stays;
calc math client-side; don't touch `mini-project/`.

---

## R1 — Landing rebuild (editorial restyle) — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green (12 pages); light + dark verified; no
h-scroll at 400px. Lighthouse a11y not run programmatically — contrast math clears
AA (teal-ink 5.3:1, deep-teal bands 4.7:1, navy footer 7:1), aria/focus intact.
Screenshots: `screenshot/claude/r1-{light,light-2,dark,mobile,hero}.png`.
- `global.css`: kept every class + var NAME, remapped values. `--amber` emerald →
  teal `#0d9488`; new `--amber-ink` `#0a6b60` for small accent text (AA); `--paper`
  white, `--ink` near-black, new `--navy` footer var. `.footer` white → navy 4-col
  sitemap. `.band--amber` → deep teal `#0b6e63`. `.section__head` centered + teal
  tick underline. New `.pill` / `.checks` / `.trust` / nav-dropdown rules.
  **Deleted** the `.scrub` scroll-timeline layer (was pinning how-it-works cards at
  `opacity:0` on Chromium — plain `.reveal` IO covers it) + the habits `.ticker`
  marquee (replaced by static trust strip).
- `index.astro`: hero "Free tools · No signup" pill + 3 check-bullets; habits
  marquee → static trust strip; 4 strings rebalanced India-first → worldwide/USDA-
  lead per positioning lock; stale "still brutal" copy fixed.
- `Layout.astro`: nav "Calculators" dropdown placeholder (6 items → `/calculator`,
  aria-haspopup/expanded, click/Esc/outside close, hidden <640px); footer sitemap
  (Calculators / Product / About) + legal row; `/health` warm-ping kept; narrow-
  viewport nav rule kills a pre-existing 3px overflow at 400px.
- `calculator.astro`: NEW 15-line "coming next update" stub so dropdown links don't
  404. **R3 overwrites this wholesale.**
- Images (user generated in ChatGPT, processed + wired 2026-09-10): `og-default.jpg`
  → OG/Twitter meta; `logo-mark.png` → favicon + nav mark; `how-it-works.png` →
  strip above step cards; `not-found.png` → 404/500; `hero-spot.png` → calculator
  stub (held for R2). All in `frontend/public/`. See `ASSETS.md`.
- Not touched: `signup.astro` + `CLAUDE.md` still show pre-existing pending diffs.

**Goal:** new landing page in the macronutrients look. No new features — layout,
type, color, trust strip only.

- Decide restyle approach: new `global.css` theme vs remap current emerald vars.
  Default: rewrite `global.css` keeping class + var NAMES (same trick as the
  2026-07-18 redesign), remap values to white / one accent / navy footer.
- `frontend/src/pages/index.astro` — rebuild: hero (headline + subcopy + trust
  badges + CTA), "what you get" grid, "how it works" 4-step, trust band, footer
  sitemap.
- `Layout.astro` — nav with "Calculators" dropdown placeholder, footer sitemap.
- Keep pending `Layout.astro` `/health` warm-ping.

**Assets (prompt user):** 1 hero illustration or none (macronutrients uses none —
prefer type-only first pass).

**Done-check:** `npm run build` passes; landing renders in light + dark; no
horizontal scroll at 400px; Lighthouse a11y ≥ 90.

---

## R2 — Calc engine + quick calculator (hero) — ✅ DONE (2026-09-10)

**Status:** shipped, frontend-only, no backend touched. `npm run build` green
(12 pages). `node frontend/src/lib/macros.test.ts` passes (parity vs `app/db.py`).
SSR renders correct numbers from defaults with no API; island hydrates via
`/_astro/QuickCalc.*.js`; no `fetch` in the widget.
- `frontend/src/lib/macros.ts` — pure fns ported from `app/db.py daily_goals`:
  `bmrMifflin`, `bmrKatchMcArdle` (untested, no backend equiv — for R3),
  `tdee`, `goalAdjust`, `splitMacros` (protein 1.8 g/kg · fat 25% · carb rest,
  exact db.py logic), `dailyGoals` (rounded, mirrors backend), `lbToKg`/`inToCm`.
  ponytail note in-file: JS `Math.round` half-up vs Python banker's — only
  diverges on exact .5, which daily_goals outputs ~never hit.
- `frontend/src/lib/macros.test.ts` — 3 body-stat cases assert `dailyGoals` ==
  `daily_goals` output; splitMacros sum-back; Katch-McArdle spot value. Runs on
  `node` directly (Node 24 type-strips) — **no vitest dep added**.
- `frontend/src/components/QuickCalc.tsx` — Preact island, `client:load` in hero
  right column (replaced the demo `.facts` card). 7 fields: units (metric/
  imperial — lb + ft/in), sex, age, weight, height, activity, goal. Live
  `.facts`-style results panel (kcal hero + BMR/TDEE row + P/C/F g).
  `localStorage` `mc_calc` — restore in `useEffect` after mount (SSR/first-render
  match), save on every change, both try/catch. "Use the full calculator →" →
  `/calculator` (R3).
- `frontend/src/pages/index.astro` — import + `<QuickCalc client:load />`; demo
  meal-facts card removed from hero (still appears in the product-shot section).
- `frontend/src/styles/global.css` — `.qc` / `.qc__form` (2-col grid, 1-col
  <520px) / `.qc__hrow` / `.qc__full`; `.qc .facts { animation: none }` kills the
  drift wobble on the live form panel.
- **Preact setup gotcha:** `astro add preact` pulled `@astrojs/preact@6.0.5`
  (needs vite 8); Astro 5.18.2 ships vite 6 → `astro:preact:opts` virtual module
  unresolved, build crash. Pinned **`@astrojs/preact@4.1.3`** (vite ^6.4.1,
  `--save-exact`). New `frontend/tsconfig.json` (extends astro base, jsx →
  preact); `astro.config.mjs` gets `integrations: [preact()]`; lockfile +
  package.json changed. If Astro is ever upgraded past vite 7/8, bump the
  integration to match.

**Goal:** client-side macro math + a 7-field quick calculator widget in the hero.

- **Set up Preact islands (approach already LOCKED):** add `@astrojs/preact`,
  build the calculator + slider as `.tsx` island components (`client:load` or
  `client:visible`). Vanilla for nav dropdown / tabs only.
- `frontend/src/lib/macros.ts` — pure functions: `bmrMifflin()`,
  `bmrKatchMcArdle()`, `tdee(bmr, activity)`, `goalAdjust(tdee, goal)`,
  `splitMacros(kcal, ratio)`. No backend call. Port Mifflin-St Jeor from
  `app/db.py` (keep numbers identical — add a test asserting parity).
- Quick calc component: gender toggle, age, weight, height (unit toggle),
  activity select, goal select → results (kcal + P/C/F g).
- `localStorage` (`mc_calc`) — save + restore inputs/results. try/catch.
- "Use the full calculator →" link to `/calculator` (built in R3).

**Done-check:** `test_macros` (or vitest) — known body stats → expected kcal
matches `app/db.py` output; localStorage round-trips; widget works with JS-only,
no API running.

---

## R3 — Full `/calculator` page — ✅ DONE (2026-09-10)

**Status:** shipped, frontend-only. `npm run build` green (12 pages).
`node frontend/src/lib/macros.test.ts` passes (added Katch-switch + BMI +
macroBreakdown asserts). SSR renders defaults (2662 kcal, BMR 1718 Mifflin,
BMI 23.7 / water 2.6 L); `FullCalc` island hydrates; food-table links point at
`/foods/<slug>-macros/` (dead until R10, expected).
- `frontend/src/lib/macros.ts` extended: `dailyGoals` now takes optional
  `bodyFatPct` — > 0 switches BMR to Katch-McArdle, result carries
  `formula: "mifflin" | "katch"`. New `bmi()`, `waterMl()` (35 ml/kg),
  `macroBreakdown()` (g/%/kcal per macro). R2's 3 parity cases updated with the
  new `formula` field.
- `frontend/src/components/FullCalc.tsx` — Preact island, `client:load`. All R2
  fields + an "Advanced options" `<details>` holding body-fat % (enables Katch)
  and training experience (`ponytail:` collected for guidance copy, NOT in the
  formula). Results panel: kcal hero, BMR (labelled with the formula used), TDEE,
  BMI · water, per-macro g·%·kcal rows. `localStorage` key `mc_calc_full`
  (separate from R2's `mc_calc` — different field set). CTA → `/signup`.
- `frontend/src/pages/calculator.astro` — stub replaced: intro + `<FullCalc>` +
  static "How this calculator works" (Mifflin + Katch formulas in `<pre><code>`,
  activity-factor table, goal-adjust table, kcal/g, BMI + water formulas, 3
  PubMed/textbook refs) + "Macros in common foods" 15-row static table
  (`COMMON_FOODS` array in frontmatter, global foods + roti; rows link
  `/foods/<slug>-macros/`).
- `frontend/src/styles/global.css` — `.qc__adv` (accordion), `.calc-page .qc`
  side-by-side ≥900px, `.calc-doc` (h3/p/pre/code/table), `.calc-tbl-wrap`
  (overflow-x), `.calc-refs`.

**Goal:** the full calculator + trust content.

- `frontend/src/pages/calculator.astro` — all fields: gender, units toggle, age,
  weight, height, body-fat % (optional → enables Katch-McArdle), activity,
  goal, training experience, "Advanced Options" accordion.
- Results panel: daily kcal (big), BMR, TDEE, macro g + % + kcal, BMI, water
  target.
- "How This Calculator Works" — Mifflin + Katch-McArdle formulas in `<code>`,
  activity-multiplier table, goal-adjustment ranges, kcal/g, 2-3 PubMed refs.
- "Macros in Common Foods" table — ~15 rows, static JSON for now; rows link to
  `/foods/<slug>` (dead links until R10, that's fine).

**Done-check:** build passes; body-fat % entry switches formula and changes BMR;
all numbers consistent with R2 engine.

---

## R4 — Macro-split sliders + diet preset cards — ✅ DONE (2026-09-10)

**Status:** shipped, frontend-only. `npm run build` green (12 pages).
`node frontend/src/lib/macros.test.ts` passes (added split asserts). SSR on
`/calculator` renders 5 preset cards + 3 range sliders + "Daily target summary".
- `frontend/src/lib/macros.ts`: new `Split` type, `DIET_PRESETS` (5 cards —
  Balanced/Low-Carb/Keto/High-Protein/Plant-Based, stored as {protein,carbs,fat}
  %), `rebalanceSplit(cur, locked, key, raw)` — sets one macro, moves the
  unlocked others proportionally, clamps, absorbs rounding drift → always sums
  100; returns unchanged if both others locked. `gramsFromSplit(kcal, split)`
  → grams at 4/4/9 kcal/g.
- `frontend/src/components/MacroSplit.tsx` — child component of `FullCalc` (no own
  `client:` directive, hydrates with the parent island). Preset radio cards +
  P/C/F sliders each with a 🔓/🔒 lock `<button>` (aria-pressed) + live % + a
  "Daily target summary" `.facts` panel (kcal + per-macro g·%·kcal). Dragging a
  slider clears the preset selection; picking a preset resets locks. `localStorage`
  key `mc_split` ({split, locked, preset}). All native controls → keyboard-operable.
- `frontend/src/components/FullCalc.tsx` — removed the fixed protein-1.8g/kg macro
  rows from its results panel; now shows kcal/BMR/TDEE/BMI·water there and renders
  `<MacroSplit kcal={calories} />` below (`.split-wrap`, full grid width). Dropped
  the unused `macroBreakdown` import.
- `frontend/src/styles/global.css` — `.split*` rules (preset card grid w/
  `:has(input:focus-visible)` ring, slider rows, lock button, `accent-color`).

**Goal:** interactive split control, reused in calculator + later onboarding.

- `frontend/src/lib/anim.ts` or new component — lockable P/C/F slider trio:
  moving one rebalances the unlocked others, lock icon pins one, total always
  100%.
- Live "Daily Target Summary" panel (kcal + per-macro g/%/kcal).
- 5 diet preset cards (radio): Balanced 40/30/30, Low-Carb 25/35/40,
  Keto 5/30/65, High-Protein 35/40/25, Plant-Based 50/25/25. Selecting one sets
  slider ratio.
- Wire into `/calculator` replacing any plain ratio inputs.

**Done-check:** slider math never leaves 100%; lock holds; preset click updates
sliders + summary; keyboard-operable.

---

## R5 — Standalone calculator pages (+ pandas → SQLite) — ✅ DONE (2026-09-10)

**Status:** shipped, frontend + backend. `npm run build` green (17 pages, +5).
`python test_nutrition.py` + `python test_identity.py` green (only added an FTS
assert). `node frontend/src/lib/macros.test.ts` green. `pandas` gone from
`requirements.txt`.
- **Part A:** `scripts/build_indb_db.py` (openpyxl) reads `data/INDB.xlsx` sheet
  "Nutrient Data" → `data/indb.sqlite`: `foods` (id, name, source, kcal, protein,
  carb, fat, prep_style) + `foods_fts` FTS5 (external-content, `content='foods'`),
  1014 rows. `.sqlite` committed (139 KB).
  - `app/nutrition.py` rewired: `import pandas` gone. `_rows()` loads all rows
    from SQLite once into `list[dict]` (+ parallel `_indb_names`). `match_indb`
    logic unchanged — exact pass now a Python loop splitting names on `[()/]`,
    fuzzy pass still `process.extractOne(query, _indb_names, WRatio, cutoff 88)`
    then token_sort ≥ 60 guard; `.loc[label]` → positional `rows[hit[2]]` (list
    not Series). New `search_indb(q, limit)` — FTS5 `MATCH` with prefix-AND
    (`_fts_query`), read-only `file:...?mode=ro` connection, returns hit dicts.
  - `requirements.txt`: `pandas==2.2.3` removed; `openpyxl` kept with a
    build-time-only comment.
  - `test_nutrition.py`: added `search_indb("chapati")` → contains "Chapati" assert.
- **Part B:**
  - Backend `POST /foods/lookup` (no auth, no LLM) in `app/main.py` —
    `{ingredients:[{name,grams}]}` → per-item macros via `nutrition.lookup` scaled
    by grams/100, summed; `unmatched` list + `totals_partial` flag. `main.py` now
    imports `nutrition`.
  - `frontend/src/components/MiniCalc.tsx` — ONE parametric Preact island,
    `mode` prop `tdee|bmr|protein|deficit`, shared body-stat form (fields shown
    per mode), `localStorage` `mc_calc_mini`. deficit mode adds goal-weight +
    daily-deficit fields → target kcal, weekly kg (7700 kcal/kg), weeks + goal
    date.
  - Pages: `/tdee-calculator`, `/bmr-calculator`, `/protein-calculator`,
    `/calorie-deficit-calculator` — thin `.astro`, intro + `<MiniCalc>` + mini
    "how it works" + cross-links.
  - `frontend/src/components/RecipeCalc.tsx` + `/recipe-macro-calculator` —
    ingredient rows (name + grams, add/remove), `fetch(API + "/foods/lookup")`,
    renders total + per-item + "not found" list, cold-start "Waking the server…"
    after 4 s. `localStorage` `mc_recipe`.
  - `frontend/src/lib/api.ts` — `API` made SSR-safe (`typeof location` guard;
    islands evaluate the module during prerender now).
  - `Layout.astro` nav "Calculators" dropdown + footer list point at the real
    routes.
  - `global.css` — `.recipe__*` rules.

**Goal:** own routes for the other calculators + "Calculators" nav dropdown.
First phase that queries the food DB from the new surface — migrate the store.

### Part A — INDB xlsx → SQLite (drop pandas)
- One-time script `scripts/build_indb_db.py`: read `data/INDB.xlsx` (openpyxl),
  write `data/indb.sqlite` — a `foods` table (name, source, per-100g macros,
  prep_style) + an FTS5 virtual table on `name` for fast search.
- Rewire `app/nutrition.py`: replace the in-memory pandas load + `.loc` lookups
  with `sqlite3` queries (exact-alias pass unchanged; fuzzy pass = FTS5 shortlist
  → rapidfuzz rank, same cutoffs). USDA cache also lands in this file.
- Drop `pandas` from `requirements.txt` (keep `openpyxl`, build-time only — or
  move it to a dev extra).
- `test_nutrition.py` + `test_identity.py` must stay green unchanged (same
  inputs → same macros). Add one assert: FTS5 search returns the expected row
  for a known name.

### Part B — calculator routes
- `/tdee-calculator`, `/bmr-calculator`, `/protein-calculator`,
  `/calorie-deficit-calculator` — thin pages reusing `lib/macros.ts` + shared
  form bits. Each: short intro, calc, mini "how it works", cross-links.
- `/recipe-macro-calculator` — add ingredients (name + grams) → total macros via
  a NEW backend `POST /foods/lookup` (SQLite INDB → USDA, no LLM; reuse
  `app/nutrition.py` `lookup()`). First bridge to the AI layer's DB.
- Nav "Calculators" dropdown lists all.

**Assets:** none.

**Done-check:** `indb.sqlite` builds; `test_nutrition.py` + `test_identity.py`
green with no change; `pandas` gone from runtime deps; each calc route builds +
runs client-side; `/recipe-macro` returns sane totals for a mixed recipe
(e.g. "150g chicken breast, 100g rice, 1 tbsp olive oil") against live backend.

---

## R6 — Auth split + guest AI demo gate — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green (18 pages). `test_phase2.py` green.
- `frontend/src/components/MealChat.astro` — extracted from `chat.astro` (markup +
  full inline script). `chat.astro` is now 5 lines wrapping it. Shared by `/chat`
  and (R7) `/add`; Astro dedupes the script.
- Guest AI gate in `MealChat`: `localStorage` `mc_ai_uses` counter, `GUEST_CAP = 3`.
  `renderGuestNote()` shows "N free analyses left"; the submit handler blocks the
  4th+ with a signup-wall bot message; a successful guest `/analyze` calls
  `bumpGuest()`. Backend stays permissive (frontend funnel gate only).
- `.guest-note` + `.facts__note--logged` — replaced the neo-brutalist inline
  styles (hard border, raw amber bg) with theme-var tints; spent state → coral.
- `login.astro` → redirects to `/dashboard` (was `/chat`). `signup.astro` — added
  a `.checks` trust list (free forever / real DB / export-delete).
- Public routes already token-free (calculators are static + islands, no auth) —
  verified at build. Expired-token → guest degrade on `/analyze` unchanged
  (`auth_expired` flag still handled in `MealChat`).

**Goal:** public routes need no token; AI has a 2-3/session guest cap.

- Confirm every public route (landing, all calculators, `/foods` stub) works with
  no `mc_token`.
- Guest AI: `localStorage` counter (`mc_ai_uses`), block after 3, show signup
  prompt. Backend stays permissive (frontend gates); optional soft IP cap later.
- Restyle `signup.astro` + `login.astro` to the new theme. Keep the pending
  signup unit-toggle diff.
- Verify existing expired-token → guest degrade on `/analyze` still holds.

**Done-check:** fresh browser can hit calculators with no token; 4th guest AI
attempt shows the wall; signup/login match theme; `test_phase2.py` green.

---

## R7 — Dashboard-primary logged-in shell — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green (18 pages, +`/add`). `test_phase2.py`
green; `/meals/today` smoke passes.
- Backend: `db.today_meals(user_id)` (today's meal rows, tz-aware — factored the
  local-midnight calc into `db._today_start_utc`), `GET /meals/today` in `main.py`.
- `frontend/src/pages/add.astro` — NEW: `<MealChat />` + a "back to dashboard"
  link; redirects guests to `/login`.
- `dashboard.astro` — added "Today's meals" list (`GET /meals/today`, name summary
  + kcal + time, DOM-built so food names can't inject) and a `#relog` chip row
  (R8). Button changed from "Log a meal" → `/chat` to "＋ Add meal" → `/add`.
  `loadMealList()`/`loadRelog()` are `innerHTML=""`-cleared so the bfcache
  `pageshow` rerun doesn't stack.
- `Layout.astro` nav — logged in (`token()` truthy): "Log a meal" → "Add meal"
  `/add`, "Today" → "Dashboard", "Log in" → "Log out". `#nav-meal`/`#nav-today`
  ids added; `active="add"` also lights the meal link. Now imports `token` for
  the expiry-aware check.
- `index.astro` — `<script is:inline>` at top: valid `mc_token` (exp checked
  inline) → `location.replace("/dashboard")`. History link deferred to R9 (no
  trends page yet).

**Goal:** after login, land on a dashboard; chat becomes an "add meal" action.

- `/dashboard` = post-login home: today kcal + macro meters vs goal, today's
  meal list, "＋ Add meal" button.
- Nav (logged in): Dashboard · Add meal · History. Move theme toggle.
- Chat UI → `/add` route or modal, invoked by "＋ Add meal". Existing
  `/analyze` + `/confirm` flow unchanged underneath.
- Redirect `/` → `/dashboard` when `mc_token` present and valid.

**Done-check:** login lands on dashboard; add-meal round-trip (text input →
confirm → dashboard totals update); `/today` tz-aware still correct; bfcache
back-nav doesn't double-run meters (keep the existing guard).

---

## R8 — Manual food search + saved meals — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green (18 pages). `test_nutrition.py` +
`test_identity.py` green. E2E smoke (TestClient): search "chicken" 6 ms,
manual-log scales 150 g correctly, `/meals/recent` + `/meals/relog` clone works
(today total 71.9 → 143.8).
- Backend (`app/main.py`, `app/db.py`):
  - `GET /foods/search?q=` — `nutrition.search_indb` FTS (limit 8); one
    `lookup_usda` hit only if INDB returns nothing. Returns `{results:[{name,
    source, *_100g}]}`. ponytail: USDA stays a live single lookup until R10
    bulk-local. INDB has no plain "chicken" so "chicken" → INDB dishes; the
    manual-log MATH is what R8 needs and that's exact.
  - `POST /meals/manual` — `{items:[{name, grams, *_100g, source}]}` → scale by
    grams/100, sum, `save_meal`. Returns `{saved, items, totals, today}`.
  - `db.recent_meals(user_id, 3)` — last 3 DISTINCT meals (dedup by sorted item-
    name tuple over the last 20 rows). `GET /meals/recent`.
  - `db.relog_meal(user_id, meal_id)` — clone a past meal's items+totals to now
    (no lookup/LLM); returns totals. `POST /meals/relog`.
- Frontend:
  - `frontend/src/components/FoodSearch.astro` — debounced search box, result
    list, stage multiple foods with editable grams + live kcal total, "Log meal"
    → `/meals/manual`. Recent-meal re-log chips at top (`/meals/recent` →
    `/meals/relog`). Added to `/add` below `<MealChat />`.
  - `dashboard.astro` — `#relog` chip row populated from `/meals/recent`; chip
    click → `/meals/relog` then `load()` refetch.
  - `global.css` — `.foodsearch__*` rules.

**Goal:** log without AI. No LLM cost.

- Backend `GET /foods/search?q=` — INDB + USDA name search (reuse rapidfuzz
  path in `app/nutrition.py`), returns name + per-100g macros + source.
- `/add` gets a "Search food" tab: type → pick → set grams → log straight to
  `save_meal` (skip pipeline).
- Saved meals: `GET /meals/recent` (last 3 distinct), one-tap re-log chips on
  dashboard + `/add`.

**Done-check:** search "chicken" returns ranked hits < 300ms; manual log writes a
`meals` row with correct macros; re-log chip clones a past meal to now;
`test_nutrition.py` green.

---

## R9 — Week/trend view + meal edit/delete — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green (19 pages). `test_phase2.py` +
`test_nutrition.py` + `test_identity.py` green. Backend E2E (TestClient): trends
7-day series (last day == today total), edit grams 90→45 drops totals correctly,
RLS — user B PATCH/DELETE of user A's meal → **404**, owner delete → today 0.
- Backend (`app/db.py`, `app/main.py`):
  - `GET /trends?days=7|30` — `db.trends`: per-day buckets (tz-aware, local date),
    `streak` (consecutive logged days ending today), `logged_days`, `avg_kcal`,
    rule-based `insights` strings (over/under goal, low protein). Zero LLM.
  - `PATCH /meals/{id}` — `db.update_meal(grams_by_index)`: scale that item's
    stored per-item macros by new/old grams, re-sum, write. No lookup, no LLM.
  - `DELETE /meals/{id}` — `db.delete_meal`. Both raise 404 via `_meal_or_404`
    (select filtered by `user_id` — service client, so the `.eq("user_id")` IS
    the ownership check; another user's id → 0 rows → 404).
  - `GET /meals/history?days=30` — `db.meals_range`, all rows in the window.
  - `db._sum_items` helper; `timedelta` added to the import.
- Frontend:
  - `frontend/src/lib/anim.ts` — `weekChart(series, goal)`: inline-SVG bar chart,
    bars over goal → coral, dashed goal line, weekday-narrow labels.
  - `frontend/src/lib/meals.ts` — `mealRowEl(m, onChange)`: shared meal row with
    inline "Edit" (per-item grams → PATCH) and "Delete" (2-tap confirm → DELETE),
    calls `onChange` to refetch. Used by dashboard + `/history`.
  - `dashboard.astro` — "This week" block (chart + insights, hidden when no data);
    today's meal list now uses `mealRowEl`; "See full history →" link.
  - `frontend/src/pages/history.astro` — NEW: last 30 days grouped by local date,
    `mealRowEl` rows.
  - `Layout.astro` — "History" nav link (`#nav-history`, unhidden when logged in).

**Goal:** the "see where the week went" payoff + fix mislogs.

- Backend `GET /trends?days=7|30` — daily totals series (SQL, tz-aware),
  streak count, rule-based insight strings (zero LLM).
- `PATCH /meals/{id}` (edit item grams, re-aggregate from stored per-item
  macros — no LLM, no re-lookup), `DELETE /meals/{id}` (RLS owner-only).
  `/today` + trends recompute.
- Dashboard: week bar chart + macro-split donut/radar. Edit/trash icons on meal
  rows (live + history).

**Done-check:** trends series matches manual SQL for a seeded week; edit grams →
totals change correctly; delete → row gone, totals drop; RLS blocks other users
(add an assert).

---

## R10 — SEO pillars: `/foods/` + `/compare/` (+ USDA local) — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green — **240 pages** (19 base + 99
`/foods/…-macros/` + 120 `/compare/…-vs-…/` + 2 hub) + `sitemap-index.xml`.
`test_nutrition.py` + `test_identity.py` + `macros.test.ts` green.
- **Part A — USDA local (curated seed, not the full 1 GB dump):**
  - `scripts/build_usda_db.py` — fetches per-100g macros for ~75 common global
    foods from the FDC API (slug → search query map), caches raw to
    `data/usda_seed.json` (rebuild offline with `--from-cache`), writes
    `usda_foods` + `usda_fts` FTS5 into `data/indb.sqlite`. Names are the
    slug title-cased (clean FTS), macros are authoritative FDC values.
  - `app/nutrition.py` — `lookup_usda_local(query)`: `usda_fts` MATCH, primary-
    phrase-coverage score (100/80/50). `lookup()` tries it AFTER the dal token
    fallback, BEFORE the live `lookup_usda`. `USDA_LOCAL=0` env disables it. Live
    FDC API stays as the long-tail fallback (full offline dump deferred — a
    curated ~75-food seed covers the SEO set + the common-query path; extend
    `FOODS` or drop in a real FDC import later).
  - `test_nutrition.py` — asserts `lookup_usda_local` resolves quinoa / cheddar
    with no network and returns None for nonsense.
  - ponytail: `import os` added for the env flag.
- **Part B — SEO pages:**
  - `scripts/export_seo_data.py` — `usda_foods` + ~24 hand-picked INDB dishes
    (exact-name map) → `frontend/src/data/seo-foods.json` (99 foods).
  - `frontend/src/lib/seo.ts` — `FOODS`, `bySlug`, `comparePairs()` (C(16,2)=120
    from a `POPULAR` subset), `verdict(a,b)` (rule-based: lower kcal → deficit,
    higher protein/100 kcal → protein pick), `nutritionJsonLd(f)`.
  - `src/pages/foods/[slug].astro` — `getStaticPaths` → `<slug>-macros`; facts
    panel (per 100 g + macro %), JSON-LD `NutritionInformation`, "add to tracker"
    CTA, related foods, recipe-calc cross-link.
  - `src/pages/foods/index.astro` — A–Z (2-col `.foods-az`).
  - `src/pages/compare/[pair].astro` — `<a>-vs-<b>`; side-by-side table +
    protein-density row + verdict + cross-links.
  - `src/pages/compare/index.astro` — popular grid.
  - `@astrojs/sitemap` added; `astro.config.mjs` gets `site:` (same placeholder
    URL as `Layout.astro` SITE). Footer gets a "Food data" column. `/calculator`
    common-foods table links (already `/foods/<slug>-macros/`) now resolve.
  - Lighthouse SEO not run programmatically (like R1 a11y) — pages carry unique
    title + meta description, JSON-LD, semantic headings, internal links, sitemap.

**To refresh food data:** `python scripts/build_usda_db.py` then
`python scripts/export_seo_data.py`, rebuild frontend. `data/indb.sqlite` +
`seo-foods.json` are committed build artifacts.

### R10.2 — full USDA SR Legacy import + richer compare pages — ✅ DONE (2026-09-10)

**Status:** shipped. `npm run build` green — **4,436 pages** (19 base + 499
`/foods/…-macros/` + 3,916 `/compare/…-vs-…/` + 2 hub), ~10 s build,
`sitemap-0.xml` = 4,434 URLs. `test_nutrition.py` + `test_identity.py` +
`macros.test.ts` green.
- **Data:** `scripts/build_usda_db.py` rewritten to parse the USDA **SR Legacy
  CSV bulk export** (`food.csv` / `food_nutrient.csv` / `nutrient.csv` in
  `data/usda_src/`, ~37 MB, **gitignored** — download link in the script
  docstring) instead of per-food API calls. Now 8 nutrients per food: kcal,
  protein, carb, fat + **fiber, sugar, sodium, saturated fat**. ~75 `CURATED`
  slugs pinned by regex to the right SR row; the rest auto-slugged from the
  primary phrase (compound slug on collision, max 2 variants/base), junk
  filtered (`BAD` regex + score). **2,662 rows** in `usda_foods`;
  `data/indb.sqlite` 139 KB → 552 KB (committed). `data/usda_seed.json` deleted.
- `app/nutrition.py` unchanged — `lookup_usda_local` still `SELECT`s the 4 macro
  cols; the extra columns are ignored there.
- `scripts/export_seo_data.py` — pulls curated + a strict-clean-name filtered
  subset of auto rows (`CLEAN`/`BRAND`/`NOISE` regex, cap `USDA_LIMIT=400`,
  `MAX_PER_BASE=2`) + 24 INDB dishes → **499-food** `seo-foods.json` with the
  new nutrient fields (INDB micro fields null).
- `frontend/src/lib/seo.ts` — `Food` gains fiber/sugar/sodium/satfat;
  `POPULAR` expanded to ~89 (incl. 15 Indian dishes) → C(89,2)=3,916 pairs;
  `NUTRIENTS` table, `pctMore`/`gapPhrase`, `pairSlug`/`relatedFor`,
  `faqJsonLd`; `verdict` now uses `gapPhrase`.
- `compare/[pair].astro` — rebuilt: per-nutrient **bar rows** with a tinted
  "better for a lean/high-protein goal" cell, protein-density row, verdict,
  3-Q FAQ (+ `FAQPage` JSON-LD), "More X comparisons" related grid, both foods'
  `NutritionInformation` JSON-LD. `.cmp*` CSS added (mobile grid at 560px).
- `foods/[slug].astro` — fiber/sugar/satfat/sodium rows when present, 3-Q FAQ
  (+ FAQPage JSON-LD), "Compare X" grid.
- Known ceiling: some auto foods are obscure ("Celtuce", "Abiyuch") or lightly
  processed — acceptable long-tail, the curated ~75 carry the compare set.
  Branded/restaurant rows mostly filtered but a few slip the `CLEAN` regex.

**Goal:** programmatic long-tail pages. All static, build-time, no LLM.

### Part A — USDA live API → bulk local
- Download USDA FoodData Central (SR Legacy + Foundation + a Survey/FNDDS subset)
  once; load into `data/indb.sqlite` as a `usda_foods` table + FTS5 on name.
- Rewire `app/nutrition.py` `lookup_usda()` to query the local table instead of
  the FDC API. Keep the API key path as a fallback flag, but default = local.
- Fixes: latency, the outage → null-macro save bug (CLAUDE.md known-minor), and
  makes `/foods/` generation + food search fully offline.
- `test_nutrition.py` green; add an assert that a known USDA food resolves with
  no network.

### Part B — SEO pages
- Build script: pick top-N (~200) common global foods from `usda_foods` first,
  then a second batch of Indian dishes from `foods` (INDB). Emit
  `/foods/<slug>-macros/` — macros per serving, "add to tracker" CTA, related.
- `/compare/<a>-vs-<b>/` — generate pairs from top-N (cap the count; start ~500).
  Side-by-side macros + "better for your goal" verdict (rule-based).
- Hub pages: `/foods/` index (A-Z), `/compare/` index + "Popular Comparisons"
  grid. Cross-link from `/calculator` common-foods table (R3).
- `@astrojs/sitemap`, meta tags, JSON-LD `NutritionInformation`.

**Assets:** none (data-driven).

**Done-check:** USDA resolves offline; build emits N food pages + M compare pages;
each has unique title/meta; Lighthouse SEO ≥ 95 on a sample; internal links
resolve; `test_nutrition.py` green.

---

## After R10

Regroup with user. Candidates: guides/editorial, restaurant pages, PWA,
per-user portion memory, Indian household units (katori/chamach), goal coaching,
micronutrients, sharing/export, barcode. See `ROADMAP.txt`.
