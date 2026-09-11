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
  "better for a lean/high-protein goal" cell, protein-density line, verdict,
  3-Q FAQ (+ `FAQPage` JSON-LD), "More X comparisons" related grid, both foods'
  `NutritionInformation` JSON-LD. `.cmp*` CSS added (mobile grid at 560px).
- **`CompareTool.tsx` Preact island** (`client:load`) — replaces the static
  table: portion control (Per 100 g / Per serving / custom grams per food) that
  recomputes every bar + a live "N g X = K kcal" summary. `lib/servings.ts` —
  household serving grams for the ~89 POPULAR foods (katori/piece for Indian
  dishes); foods without an entry get 100 g / custom only. SSR renders the
  100 g state so crawlers + no-JS see real numbers.
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

## Post-R10 rounds — ✅ ALL SHIPPED & DEPLOYED (2026-09-10)

Not phases; ad-hoc rounds after R10. Listed newest last.

**1 · Deploy pass** — everything since `8aef953` committed and pushed; Render
auto-deploys both services on push to `main`. `.gitignore` gained
`frontend/.astro/`, `mini-project/`, `screenshot/` (and later `data/usda_src/`);
the generated `.astro` cache was untracked. Live-verified `/foods/search`,
`/trends` → 401, `/foods/` index, `/calculator`.

**2 · Design polish** — the UI read as templated (one typeface, native form
controls). Fixes, all in `global.css` + `Layout.astro` font link + `anim.ts`:
- **Fraunces** variable serif added as `--font-display` (h1/h2, facts hero
  number, logo) against Plus Jakarta Sans body + IBM Plex Mono data — real
  typographic contrast. Tabular figures wherever numbers align.
- New tokens `--paper-2` (recessed surface), `--ink-2`, `--line-2`,
  `--amber-hi`, `--shadow-teal`, `--section-y`; re-tuned shadows.
- **Custom range sliders** (webkit + moz) replacing `accent-color`; fill driven
  by a `--fill` CSS var set in `MacroSplit.tsx` so it's right pre-hydration.
- **Meters** recessed track + gradient fill + goal notch; **week chart** rebuilt
  with a ±8% goal band, rounded bars, today emphasised, hover `<title>` value.
- **Facts panel**: mono eyebrow title over a heavy rule, serif hero number, row
  tick-marks.
- ⚠️ Regression caught in review: the pass set `color: var(--ink)` on
  `h1/h2/h3`, which beat the light colour inherited from `.band--ink` /
  `.band--amber` → headings went invisible on dark bands. Fixed to
  `color: inherit` — **never set a hard colour on the heading rule.**
- Mobile tuning: smaller serif hero number ≤560px, fatter slider hit area on
  `pointer: coarse`, tighter facts/table padding.

**3 · Landing rework** — the page still sold the AI tracker with a calculator in
the corner, contradicting the rework thesis. Resequenced `index.astro`:
hero headline + CTAs now lead with the free calculators (primary →
`/calculator`, secondary scrolls to `#tracker`); new "Every tool, no sign-up
wall" card grid right after the trust strip; the AI pipeline, 3 steps,
product-shot and feature grid all moved below into `#tracker` as the signed-in
payoff; stats swapped one tile to "6 free calculators"; FAQ reordered (cost /
formulas / guest limit first); mega CTA split into *Open the calculator* /
*Sign up to track*. New `.cell--link` / `.cta-mega__btns` CSS + anchor
`scroll-margin`.

**4 · Surface `/compare/` + `/foods/`** — the 3,916-page compare pillar was only
reachable from the footer. Nav dropdown renamed **"Calculators" → "Free tools"**
with two labelled sections (Calculators · Food data → *Compare two foods*,
*Food macros A–Z*); the landing grid's shared wide card split into two proper
cards; hero/section copy corrected ("99+ foods" → "~500 foods plus
comparisons"); `/calculator`'s common-foods table cross-links to `/compare/`.

---

## S — Security hardening (audit 2026-09-10)

Full audit of `app/*.py`, `frontend/src/**`, CORS and the Supabase access
pattern. **Clean:** no SQL injection (FTS input stripped to `[a-z0-9]+` *and*
bound as a parameter; sqlite opened `mode=ro` on constant paths; Supabase via
postgrest), no IDOR (cross-user `PATCH`/`DELETE /meals/{id}` → 404, verified),
no XSS (all user/LLM strings go through `textContent`/`createElement`; the three
`innerHTML` sites use static or numeric-only values), no secrets in git, and the
LLM cannot forge macro numbers (they come from the DB).

**Severity calibration (revised after the first pass).** The original ratings
were too hot. Two things damp the *practical* risk today: the app is unlaunched
(no domain, no traffic, URL effectively unknown), and the Render free tier is a
single slow instance — it is its own bottleneck, so an attacker hits downtime
long before a large bill. Guest LLM traffic also runs Gemini 2.5 Flash first, at
fractions of a cent per call. **Every item below is still a real defect worth
fixing before launch** — buying a domain and getting the 4,400 SEO pages indexed
removes the obscurity that is currently doing most of the work.

Revised view:
- **Most likely to actually bite:** S2 — one 400 MB POST, no loop needed, kills
  the only instance.
- **Worst consequence if it ever goes wrong:** S4 — the app-level `user_id`
  filter is the sole tenant boundary.
- S1 was fixed first (money path, cheap insurance) but is 🟠, not 🔴.
- S5–S8 are hygiene.

Work top-down; each item is independent. **S1–S8 all done 2026-09-10** (S5 minus
email verification, S6 minus the static-site headers that need Render dashboard
config). S1 `b654074`, S2–S5 `6e25bad`, S6–S8 in the round below.
Live-verified on `macrochat-api` after the deploy: short password → 422,
`/analyze` with a PDF → 415, with a 9 MB jpeg → 413.

- [x] **S1 · 🟠 (orig. 🔴) `/analyze` unauthenticated + unmetered LLM spend** — ✅ FIXED
      2026-09-10. `app/ratelimit.py`: stdlib sliding-window counters (no Redis —
      one Render instance; swap the `_hits` store if we scale out).
      `check_analyze()` runs in `/analyze` **before** `photo.read()` and the
      pipeline, so a blocked call costs ~7 ms and zero LLM tokens (verified).
      Limits: guest **5/h, 20/day per IP**, signed-in **60/h per IP**, plus a
      **300/day global guest backstop** so a distributed attack still can't drain
      credits. `client_ip()` takes the **rightmost** `X-Forwarded-For` entry —
      the leftmost is attacker-supplied. Frontend surfaces the 429 detail and
      marks the guest allowance spent; `mc_ai_uses` stays UX-only.
      Tests: `test_ratelimit.py` (window expiry, blocked hits not recorded, key
      isolation, XFF spoof resistance, guest cap, global backstop).
- [x] **S2 · 🟠 No upload size/type limit — highest real-world likelihood** — ✅ FIXED
      2026-09-10. `/analyze` now rejects a non-`image/*` content type (415) and
      anything over `MAX_PHOTO_BYTES` = 8 MB (413) **before** `photo.read()` and
      the base64 blow-up, so a huge body costs only Starlette's multipart spool
      (which goes to disk past 1 MB, not RAM). ponytail: a true request-body cap
      belongs at the proxy — Render's free tier gives us no such knob.
      Test: `test_security.py::test_upload_guard` (9 MB jpeg → 413, PDF → 415).
- [x] **S3 · 🟠 `/foods/lookup` request amplification** — ✅ FIXED 2026-09-10.
      `nutrition.lookup(..., allow_live=False)` stops before the live USDA API;
      `/foods/lookup` allows `MAX_LIVE_USDA_PER_RECIPE` = 5 live calls per request
      and goes local-only after that (live hits are tagged `"live": True` so the
      local R10 seed — same `source: "USDA"` — doesn't spend the budget). Live
      `USDA_TIMEOUT` 10 s → 3 s (knob in `nutrition.py`). Worst case per request
      ~15 s, was ~500 s. Also `ratelimit.check_public` at 60/h per IP on
      `/foods/lookup`, 60/h on the `/foods/search` **live** path only (INDB FTS
      stays unmetered), and `q` capped at 120 chars.
      Test: `test_security.py::test_live_usda_optout` (no network when off).
- [x] **S4 · 🟠 Service-role key bypasses RLS — worst blast radius** — ✅ FIXED
      2026-09-10. All 16 user-data queries now run through `db._c(user_id)`, which
      returns an anon-key client authenticated as the caller
      (`create_client(...).postgrest.auth(jwt)`, `@lru_cache(256)` per token — pure
      object setup, no network), so Postgres RLS is a second boundary behind the
      `.eq("user_id", …)` filter. `current_user_id` returns `db.AuthUser`, a **str
      subclass** carrying the JWT — every existing `user_id: str` signature and call
      site is unchanged, which is what kept this a ~30-line diff. Service client
      stays for signup/admin (`db.sb`) and is the fallback when there is no token.
      Supabase needed two missing policies (migration
      `own_meals_update_delete_policies`): `meals` had SELECT/INSERT but no UPDATE
      or DELETE for `authenticated`, so `PATCH`/`DELETE /meals/{id}` would have
      silently no-opped once scoped.
      Tests: `test_security.py::test_rls_scoped_client`; `test_phase2.py` extended
      with a live PATCH + DELETE round-trip — the whole live path (profile select,
      meal insert/select/update/delete, chat insert/select) passes under RLS.
      **Deploy:** `SUPABASE_PUBLISHABLE_KEY` set on the Render backend
      (`macrochat-api`) 2026-09-10 — without it `_c()` falls back to the service
      client and S4 is inert in prod (deliberate: degrade, never crash).
      Gotcha worth remembering: a Render env-var change queues its own deploy, so
      the push right after it sat *behind* that one — the live API served the old
      build for several minutes while reporting healthy. Probe a deployed
      behaviour change, not `/health`, before believing a fix is live.
- [x] **S5 · 🟡 Signup abuse + weak validation** — ✅ FIXED 2026-09-10 (except email
      verification). `SignupBody`: email `pattern` + 254-char cap, password
      `min_length=8, max_length=128` (frontend `minlength` 6 → 8 to match);
      `LoginBody` length-capped. `/signup` metered at 5/h per IP, `/login` at 20/h
      via `ratelimit.check_public`. Supabase's `str(e)` no longer reaches the
      client — generic 400, so no internals and no "this email exists" oracle.
      Still open by choice: `email_confirm: True` (no verification email) — flipping
      it means a real signup→confirm→login UX and Supabase's 2/hr email cap; do it
      when there's a domain and real traffic.
      Test: `test_security.py::test_signup_validation`, `::test_public_ratelimit`.
- [x] **S6 · 🟡 CORS too broad + no security headers** — ✅ FIXED 2026-09-10.
      `allow_origin_regex` pinned to `macrochat-d6oi.onrender.com` (+ localhost/LAN
      dev) — `[a-z0-9-]+\.onrender\.com` let *any* Render tenant's page call this
      API with a user's credentials. A `security_headers` middleware adds
      `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and
      `Referrer-Policy: strict-origin-when-cross-origin` to every API response.
      Static site: `Layout.astro` ships a one-line frame-buster
      (`if (window.top !== window.self) …`) because `frame-ancestors` is ignored in
      a `<meta>` tag. **Still open, needs the Render dashboard** (static sites take
      headers from service config, not a file in `dist/`): add
      `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
      `Referrer-Policy: strict-origin-when-cross-origin` on `macrochat`. A real CSP
      is a separate job — Astro islands ship inline scripts, so it needs hashes.
      Test: `test_security.py::test_security_headers_and_cors` (headers present,
      our origin allowed, another `onrender.com` tenant refused).
- [x] **S7 · 🟡 `time_zone` unvalidated** — ✅ FIXED 2026-09-10. `SignupBody` has a
      `field_validator` checking the value against `zoneinfo.available_timezones()`
      (422 on junk), and every read-side `ZoneInfo(...)` — all 5 call sites — now
      goes through `db._tz()`, which falls back to UTC. Validation alone would have
      left any bad row already in the table permanently 500ing.
      Test: `test_security.py::test_time_zone_validation`.
- [x] **S8 · 🔵 Small stuff** — ✅ FIXED 2026-09-10. `MealPatch.grams` is now
      `dict[int, float]`, so pydantic rejects a non-numeric index with a 422
      instead of `int()` raising a 500 inside `db.update_meal`. `/foods/search?q=`
      capped at 120 chars (done with S3). Signup wraps the profile insert and
      deletes the just-created auth user if it fails — no more orphan account that
      can log in, 500s on `/today` and holds the email hostage. Unchanged by
      choice: the token lives in `localStorage`, 1 h, no refresh (no XSS sink
      found; a refresh flow is a Phase-4 item).
      Test: `test_security.py::test_meal_patch_keys`.

### S — left for later (nothing urgent)

Both leftovers are 🔵 **second-layer** defences, not open holes — the first layer
is already in place for each. Ordered by when they start to matter.

- [ ] **Static-site security headers — do this at launch (~2 min).** Render takes
      static-site headers from *service settings*, not from a file in `dist/`, so
      this can't ship in code. Render dashboard → `macrochat` → Redirects/Rewrites
      → Headers, path `/*`:
      `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
      `Referrer-Policy: strict-origin-when-cross-origin`.
      Covers: clickjacking (someone framing `/dashboard` invisibly to steal a
      click). Already covered by the `Layout.astro` frame-buster — the header is
      the version that can't be turned off by a script-blocking edge case. Low
      because it needs a logged-in user *and* a reason to target us: no domain, no
      users yet.
- [ ] **A real CSP — when there's real traffic or money.** Astro islands ship
      inline `<script>`s, so a useful policy needs per-script hashes (or a nonce +
      SSR, which we don't run) — an hour of work, not five minutes. Covers: limits
      the blast radius *if* an XSS ever lands. Low because the audit found no XSS
      sink — every user/LLM string goes through `textContent`/`createElement`, and
      the three `innerHTML` sites use static or numeric-only values. This is the
      second layer, not the first.

Not security, but the same "matters at scale, not now" bucket — see the ceilings
noted in S1 and S4:
- `current_user_id` costs one Supabase round-trip per request; verify the JWT
  locally when latency starts to show.
- Rate-limit counters live in process memory; they need Redis the day we run more
  than one instance.
- `mc_token` in `localStorage`, 1 h, no refresh flow (Phase-4 session polish).

---

## I — Internationalisation (branch `i18n`, in progress 2026-09-10)

Goal: rank on non-English keywords ("calculadora de macros", "マクロ計算ツール",
"Kaloriendefizit-Rechner"). **7 languages added** — Español, 日本語, Français,
Deutsch, Português, 한국어, Italiano — with English staying at the root so no
existing URL changes.

**Scope decision (user's call):** the whole site, all 4,436 pages × 8 locales
≈ **35,432 pages**, and all 499 food names translated. Build 15 s → ~140 s.

**Architecture.** Astro `i18n` config, `prefixDefaultLocale: false` (English at
`/`, others under `/es/`, `/ja/`…). Every SEO page moved under
`src/pages/[...lang]/` — a **rest param that can be undefined**, so ONE file
serves `/calculator` *and* `/es/calculator`; there is no per-locale copy of a
page to keep in sync. The two dynamic routes cross their existing path list with
the locales. Signed-in app pages (login, signup, dashboard, chat, add, history,
404, 500) stay English-only at the root and pass `localized={false}` — no
hreflang, no switcher: they are behind auth and have no SEO value.

**Strings.** `src/i18n/config.ts` (locales, `localeHref`, `stripLocale`),
`src/i18n/ui.ts` (nav/footer chrome), `src/i18n/pages/<locale>.ts` (page copy,
one module per locale) with `pageT()` falling back to English **per key**, so an
untranslated key renders readable English instead of a blank. Islands can't take
a function across the server/client boundary, so they get `pageDict()` — the
same section as a plain object — as a `t` prop.

**hreflang.** `Layout.astro` renders the full 8-locale `<link rel="alternate">`
set + `x-default` + a canonical, built from `stripLocale(Astro.url.pathname)`;
`@astrojs/sitemap`'s `i18n` option repeats the alternates in the sitemap.

- [x] **I1 · routing + hreflang + chrome** — ✅ `7c7b8dd`. Config, `[...lang]/`
      move, hreflang/canonical, language switcher in the nav, nav+footer in all
      8. 4,436 → 35,432 pages, 15 s → 126 s build.
- [x] **I2 · landing page** — ✅ `baf1602`. ~95 keys × 8. FAQ answers that carry a
      link are split into pre/link/post keys instead of embedding markup in a
      translated string.
- [x] **I3 · calculators** — ✅ `c2b8b31` (islands) + `2ad5982` (page copy).
      The five Preact islands take a `t` dictionary prop (~60 labels), incl.
      MiniCalc's result rows and MacroSplit's diet-preset names, which stay keyed
      by their stable ids. Page prose (~35 keys) covers all six calculators;
      mid-sentence links became a plain paragraph + a "See also" link line, which
      cut three keys per sentence down to one. Formula `<pre>` blocks and paper
      citations deliberately stay English.
- [x] **I4 · `/foods/` + `/compare/`** — ✅ `8c9ed38`. ~110 keys × 8 across 4,417
      generated pages. These sentences are built from database rows, so the
      strings are templates with `{placeholders}` filled by `fmt()` — that keeps
      names/numbers out of the translations and lets each language choose its own
      word order. `verdict()` and `gapPhrase()` in `lib/seo.ts` used to
      concatenate English fragments; they now take the compare dictionary.
      `CompareTool` takes the same dict, and its nutrient labels are translated
      in the page so `NUTRIENTS` keeps its data keys.
- [x] **I5 · 499 food names × 7** — ✅ the long grind (3,493 strings), all seven
      locales complete. `src/i18n/foods/<locale>.json` is a flat slug → name map
      and `i18n/foods.ts` exposes `foodName()` + `tf()` (a food with its `.name`
      swapped), so one call at the top of a page localises every h1, title, link
      label and related-grid entry downstream. A missing slug falls back to the
      English name per key, which is what let the files land one locale at a
      time. Slugs and URLs stay English on purpose — one path set, one sitemap,
      hreflang ties the locales together. `/foods/` groups by first letter of the
      TRANSLATED name and sorts with `localeCompare(…, lang)`. Build green:
      35,432 pages in 169 s.
- [x] **I6 · about / privacy / terms / contact** — ✅ one `legal` section, 48 keys
      × 8 in `i18n/pages/<locale>.ts`, and the four pages now read it through
      `pageT(lang, "legal")`. Mid-sentence links (privacy → contact, terms §5)
      use the pre/link/post key split from I2 and point at `localeHref(lang, …)`
      so a Spanish reader lands on `/es/contact`. The translated privacy and
      terms pages carry a governing-language line ("the English version
      governs") that the English pages don't render — machine-quality legal text
      in seven languages is a liability without it.
      `404.astro` / `500.astro` stay English at the root: they're
      `localized={false}` app pages, Render serves one `dist/404.html`, and
      there's no locale routing to hang them off.
      **Encoding trap worth remembering:** a heredoc through the Bash tool
      double-encodes non-ASCII (`mayoría` → `mayorÃ­a`) and a Python
      `write_text` that fails mid-encode leaves the target file 0 bytes — it
      truncated a committed `ja.ts` before erroring. Locale blocks are written
      with the Write tool to a scratch file and appended by script; every locale
      file is swept for `Ã`/U+FFFD after writing.

**I1–I6 all done (2026-09-11).** Build green at 35,432 pages in ~148 s. The
branch is ready to merge to `main` and deploy — the reason it was held back (a
half-translated site publishing 31k English duplicate pages under locale
prefixes) no longer applies.

---

## Mobile nav overflow — ✅ FIXED (2026-09-11)

User reported the landing page "overlapping" on mobile. Reproduced with
Playwright against the live site at 390px: page `scrollWidth` 414 in a 391px
viewport — the logo collided with "Log a meal", the theme toggle sat off-screen
and the whole page scrolled sideways. Three independent causes, all in
`frontend/src/styles/global.css`:

1. **`[hidden]` did nothing in the nav.** The UA's `[hidden]` rule is a bare
   attribute selector, so `.nav__links a { display: flex }` outranked it and the
   History link — markup has `hidden`, JS unhides it only when logged in — was
   visible to every logged-out visitor, 64px of it. Fixed with a global
   `[hidden] { display: none !important; }` next to the `img` base rule, so this
   can't bite anywhere else either.
2. **`.stats` used bare `1fr` tracks.** A `1fr` track floors at the content's
   max-content width, and the unbreakable count-up string `1,000+` forced the
   two-column band wider than the phone. Now `minmax(0, 1fr)` in both the base
   rule and the ≤860 override.
3. **The nav row could not fit its own contents.** Measured, not guessed: the
   logged-in labels (Add meal · Dashboard · History · Log out) need 350px and
   the wordmark 164px, so the row needs a 570px viewport — and with both
   dropdowns it needs 749px in English, more in German. The wordmark now
   collapses to its mark below 860px (`font-size: 0`, so it stays in the
   accessibility tree), and the dropdown-hide breakpoint moved 640 → 860 to
   match, since i18n added a second dropdown the old 640 never accounted for.

Verified on the built site at 360 / 390 / 430 / 500 / 680 / 880 / 1280 px, in
both auth states, on `/` and on `/pt/` (the longest labels): zero overflowing
elements at every combination, desktop unchanged. Before/after in
`screenshot/claude/mobile-nav-{overflow-before,fixed-after}-390.png`.

Also checked and NOT a bug: the dark-band heading in the user's
`screenshot/fix these colour and text overlap.png` measures 16.3:1 contrast in
both themes on the live site — that screenshot predates the fix already
recorded in CLAUDE.md.

🔵 **Left open:** the language switcher is a `.nav__drop`, so it is now hidden
below 860px — there is no way to change language on a phone. Give it a home in
the footer when that matters.

---

## Parked — next up after i18n (2026-09-11)

User's own list, in the order agreed. Nothing here is started.

- 🔵 **Login** — sign-in is failing for the user; exact symptom not captured yet.
  Suspect list: the ~1h Supabase token with no refresh (known open item), or a
  cold-start `Failed to fetch`. Get the real error before touching code.
- 🔵 **Google sign-in** — "like other websites". Lazy path is Supabase's built-in
  Google provider (enable in the Supabase dashboard + a Google Cloud OAuth
  client). Catch: the frontend talks to FastAPI through `lib/api.ts` and does
  NOT load supabase-js, so this needs either that client or a redirect-callback
  route. Scope it before building.
- 🔵 **Mobile UI** — a section overlaps on mobile, plus a general mobile rework.
  Needs a screenshot (`screenshot/claude/`) and the viewport width. Remember Edge
  headless clamps to ~500 px, so anything narrower is a capture artifact.
- 🔵 **Food agent check** — user wants to check something in the AI pipeline
  (`app/graph.py`, `app/nutrition.py`). Deliberately deferred to LAST, after the
  three above. Ask what to check: a specific meal that came out wrong, or a
  general review.

---

## After R10

Regroup with user. Candidates: guides/editorial, restaurant pages, PWA,
per-user portion memory, Indian household units (katori/chamach), goal coaching,
micronutrients, sharing/export, barcode. See `ROADMAP.txt`.
