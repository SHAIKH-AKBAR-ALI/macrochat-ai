# MacroChat AI — Latest Update Plan (Full Rework)

**Status:** SHIPPED — rework R1–R10 + R10.2 built, deployed and live on Render.
**Date:** 2026-09-10 (this doc kept as the plan-of-record + competitor notes)
**Base:** commit 8aef953; rework rides on top, auto-deploys on push to `main`.

---

## Direction

Full rework. Core insight from competitor research:

> **Stop gating everything behind signup. Ship free unauthed calculators as the
> top-of-funnel. Our photo AI + real nutrition DB become the logged-in layer on top.**

### Access split (locked)

| Tier | Gets |
| :--- | :--- |
| **Public — no signup** | Calculator pages, macro-split sliders + goal presets, hero preview/demo, blog/FAQ |
| **Signup only** | Full AI meal analysis (photo/text), save meals, daily tracking, history, dashboard, saved meals, export |
| **Guest demo** | 2-3 AI analyses per session (localStorage counter), no save |

### Build order

AI pipeline is DONE and stays as-is. Build the public/steal layer FIRST, wire the
existing AI + tracking in LAST as the logged-in payoff. Do NOT touch `app/graph.py`
/ `app/nutrition.py` unless a steal item needs it.

Guest AI: 2-3 free analyses per session (localStorage counter) then signup wall.

---

## DESIGN + STRUCTURE NORTH STAR — macronutrients.com

User's favorite. Copy the feel, not the fakery.

- **Editorial, not SaaS.** White + ONE teal accent, dark navy footer, big bold
  display headline, heavy whitespace. Reads like a health publication.
- **"Free Tools · No Signup"** badge in hero. Trust strip everywhere:
  Free forever · No email · 60 seconds · "we don't sell supplements/coaching".
- **Two-tier calculator:** Quick (hero sidebar, 7 fields, one button) +
  Full (`/calculator/` — units toggle, body-fat %, training experience,
  5 diet-style radio cards showing `40C/30P/30F`, Advanced Options accordion).
- **"How This Calculator Works"** section — real formulas in code blocks
  (Mifflin-St Jeor + Katch-McArdle), activity-multiplier table, goal ranges,
  kcal/g. PubMed citations. Transparency = trust.
- **"Macros in Common Foods" table** on the calc page, each row links to a
  `/foods/<food>-macros/` page.
- **localStorage** — "saves your numbers automatically", no account.
- **Programmatic SEO pillars:** `/foods/` (181 pages), `/compare/` (12,285
  pages), `/restaurants/`, `/guides/` (editorial, author bylines, read time),
  14 calculators, author pages ("MS RD", "PhD"), last-updated dates.

**Our wedge on top:** we already have the real thing they fake — a real nutrition
DB (USDA for global foods + INDB, 1,014 recipes) + an AI photo layer. Positioning
is **worldwide** — USDA is the default and most content targets global foods.
Indian-food coverage (INDB) is a *feature we happen to do better than anyone*, not
the brand. Lean into it only where it's free SEO upside (few sites have good
Indian-dish macro pages), never in the top-line pitch.

Screenshots: `screenshot/claude/macronutrients-full.png`, `screenshot/claude/macronutrients-hero.png`,
`screenshot/claude/macronutrients-calc.png`.

---

## Competitors analyzed

### 1. macroscalculators.com
Content/SEO play. One page, no auth: calculator + converter + AI coach + testimonials
+ 20-Q FAQ. Rich form (BMR formula picker, 11 diet presets, medical-condition presets,
custom macro %). Results panel beside the form, instant: kcal / BMR / TDEE / BMI /
water / per-meal split / pie + radar chart.

### 3. macronutrients.com — see NORTH STAR section above

### 2. macrotrackr.com
Direct competitor. Manual tracker, dark + green (near-identical palette to ours),
freemium + open source. Tagline "Know what you ate. Without the admin." Interactive
tabbed hero preview. Free calculator hub (`/tools`). Lockable macro-split sliders +
goal presets + live target summary. Freemium: free = last 7 days + 5 saved meals;
Pro $3.99 = 30/90-day history + trends. CSV export, delete-all.

**Their gap (our edge):** no photo input, no conversational AI, weaker food DB
(no Indian-dish coverage).

---

## STEAL LIST (ranked — public layer, build first)

### 1. Free unauthed calculator pages
SEO + funnel to signup. **All 3** competitors do this. Backend Mifflin-St Jeor math
already exists — do it **client-side JS** so calcs work even when the API is cold.
Each calc = own route, cross-linked. "Calculators" nav dropdown. localStorage
"saves your numbers automatically, no signup". "Save to your account → sign up" CTA.

- **Two-tier** (macronutrients pattern): Quick calc in the hero (7 fields: gender
  toggle, age, weight, height, activity, goal, one button) + Full calc at
  `/calculator/` (adds unit toggle, body-fat %, training experience, diet-style
  cards, Advanced accordion).
- **"How This Calculator Works"** block on `/calculator/` — Mifflin + Katch-McArdle
  formulas in code blocks, activity-multiplier table, goal ranges, kcal/g, 2-3
  PubMed citations. Cheap, huge trust win.
- **"Macros in Common Foods" table** on `/calculator/` — rows link to `/foods/` pages.

**Calculator set** (macronutrients has 14 — see `screenshot/claude/macronutrients-*.png`):
| Calc | Ship |
| :--- | :---: |
| Macro (pairs with slider panel #2) | v1 |
| TDEE · BMR · Protein | v1 |
| Calorie Deficit (deficit → weekly rate + goal date) | v1 |
| **Recipe / Meal Macro** (sum multi-ingredient via INDB/USDA — bridges to AI layer) | v1 |
| Body Fat (Navy tape method) · Lean Body Mass · Ideal Weight | later |
| Carb · Fat · Maintenance Calorie | later |
| One Rep Max · Walking Calorie | later / maybe skip |

### 2. Lockable macro-split sliders + goal presets + live target panel
Replaces our plain activity/goal dropdowns. Drag protein → carbs/fat rebalance;
lock icon pins one. Goal presets (Fat Loss -500 kcal, Maintain, Lean Bulk +300…).
Live "Daily Target Summary" panel: big kcal, per-macro g + % + kcal.
Use in BOTH the free calculator AND signup onboarding.
- macrotrackr does exactly this — see `screenshot/claude/macrotrackr-calc.png`.

### 3. Interactive hero preview with tabs
Tabbed mock UI (Log a day / See the week / Hit the goal) with realistic fake data —
calorie bar, macro progress bars. Shows product before signup. We already have a
"product-shot browser frame" from the redesign — add tabs + live-feel data.
Pure static/mock, no API.

### 3b. Programmatic SEO pillars (the real growth engine)
All reuse INDB/USDA, no LLM, all public/no-signup. macronutrients.com + the
"Compare Foods" screenshot both prove the model.
- **`/foods/<food>-macros/`** — one page per food, macros per serving + "add to
  tracker" CTA. Global foods first (USDA + common items). Indian dishes (INDB) are
  a second batch — low competition there, easy wins, but not the priority set.
- **`/compare/<a>-vs-<b>/`** — two foods side-by-side + "better for your goal".
  Competitors ship 11k-12k of these pages. Generate at build time from top-N foods.
  "Popular Comparisons" grid on the hub page.
- **`/guides/`** — editorial articles, author bylines, read time. Later.
- **`/restaurants/`** — global chains first (Chipotle, McDonald's…). Much later.

### 4. Diet-style preset cards
Radio cards (emoji + name + ratio label), macronutrients pattern:
Balanced `40C/30P/30F` · Low-Carb `25C/35P/40F` · Keto `5C/30P/65F` ·
High-Protein `35C/40P/25F` · Plant-Based `50C/25P/25F`.
Sets the slider ratio (#2). Medical-condition presets (PCOS/diabetes/GLP-1) =
later differentiator. Ratio overrides only, low code.

### 5. Richer results display (calculator + dashboard)
Show the derivation: BMR, TDEE, BMI, water target, per-meal split
(breakfast/lunch/dinner/snack kcal + P/C/F), radar chart
(cal/pro/carb/fat/water vs goal). macroscalculators.com does all of this.

### 6. Sharper hero copy + trust badges
Benefit-first one-liner. Badges: "Free · no card", "Export or delete anytime",
"No AI guessing on numbers — real database". Tighten ours.

---

## STEAL LIST — logged-in layer (build after public layer)

### 7. Week / trend view
7 / 30 day totals vs goals, streak counter, rule-based insight strings (zero LLM
cost, backend SQL). Possible paywall line if we ever charge (macrotrackr caps free
at 7 days).

### 8. Saved meals / quick-log
Top 3 recent meals as one-tap chips. Skip pipeline, straight to save.

### 9. CSV export + "delete everything"
Trust signal. Cheap. Near-roadmap item already.

### 10. Meal edit / delete
`PATCH`/`DELETE /meals/{id}`, re-aggregate from stored per-item macros, `/today`
recalculates. No LLM, no re-lookup.

---

## ATTACH LAST — existing AI (already done, do not rebuild)

- AI meal analysis pipeline (`app/graph.py`, `app/nutrition.py`) — LangGraph,
  INDB + USDA + staple seed list, confidence gate. **Ready.**
- Wire into the new logged-in surface once the public layer + tracking are in.
- Guest access: 1 free analysis then signup wall (decision pending above).

---

## SEO / switching-cost pages (much later)
Blog, /compare (alternatives), /migrate (import history from other apps).

---

## Decisions (locked 2026-09-10)

- **Monetization:** free forever for anything with no per-use LLM cost (calculators,
  food DB, compare, manual search, tracking). AI photo/text = **2-3 free uses per
  session** (localStorage counter) then signup. No paid tier for now.
- **Logged-in home:** dashboard-primary. Photo/chat = one "＋ add meal" input, not
  the whole app.
- **Manual food search:** yes — v2 (logged-in layer). Reuses INDB + USDA already in
  memory, no LLM. Same backend powers `/foods/` SEO pages.
- **Calculator math:** client-side JS (works when API is cold).
- **Stack:** stay Astro. Tech swaps (see `PHASES.md` top):
  - pandas → SQLite (`sqlite3` + FTS5), `INDB.xlsx` → `data/indb.sqlite` — **R5**
  - USDA live API → bulk local into the same SQLite — **R10**
  - Frontend interactivity → **Preact islands** (`@astrojs/preact`) for
    calculator/sliders (LOCKED); vanilla for small bits — set up **R2**
  - Hosting split (frontend → Cloudflare Pages/Vercel) — **deferred until domain**
  - Keep: FastAPI, Supabase, rapidfuzz, OpenAI SDK, LangGraph (frozen)
- **`mini-project/`:** user's learning project — do not touch, do not commit.
- **Design restyle vs rebuild:** decide later (#6 below).

## Version plan → phased R1–R10

Full phase breakdown in **`PHASES.md`**. One phase at a time, report after each.

**Progress:** R1 ✅ DONE 2026-09-10 — editorial restyle + 5 wired images (OG card,
favicon/nav mark, how-it-works strip, 404 art, calc-stub art). In `frontend/`, not
yet deployed. R2 ✅ DONE 2026-09-10 — `lib/macros.ts` client-side engine (parity
test vs `app/db.py`), 7-field `QuickCalc.tsx` Preact island in the hero,
`localStorage` `mc_calc`. Preact pinned `@astrojs/preact@4.1.3` (v6 needs vite 8;
Astro 5.18 = vite 6). R3 ✅ DONE 2026-09-10 — full `/calculator` page:
`FullCalc.tsx` island (advanced accordion, body-fat % → Katch-McArdle), results
panel (kcal/BMR/TDEE/BMI/water/macro g·%·kcal), static "how it works" formulas +
refs + 15-row common-foods table linking `/foods/<slug>-macros/`. R4 ✅ DONE
2026-09-10 — `MacroSplit.tsx` (lockable P/C/F sliders, 5 diet preset cards,
live daily-target summary) wired into `FullCalc` on `/calculator`;
`rebalanceSplit`/`gramsFromSplit`/`DIET_PRESETS` in `lib/macros.ts`. R5 ✅ DONE
2026-09-10 — Part A: INDB xlsx→`data/indb.sqlite` (+FTS5, `scripts/build_indb_db.py`),
pandas dropped from runtime deps, `nutrition.py` rewired (tests green unchanged).
Part B: 4 thin calc routes (one `MiniCalc.tsx` island: tdee/bmr/protein/deficit)
+ `/recipe-macro-calculator` (`RecipeCalc.tsx`) backed by new no-auth no-LLM
`POST /foods/lookup`; nav dropdown wired. 17 pages build.
R6 ✅ / R7 ✅ / R8 ✅ DONE 2026-09-10 — **v1 public + v2 logged-in (minus R9)
complete.** R6: `MealChat.astro` extracted, guest AI gate (`mc_ai_uses`, cap 3),
login→/dashboard. R7: `/add` page, dashboard meal list (`GET /meals/today`),
logged-in nav (Dashboard·Add meal·Log out), `/`→/dashboard redirect. R8:
`GET /foods/search` (INDB FTS + USDA fallback), `POST /meals/manual`,
`/meals/recent` + `/meals/relog`, `FoodSearch.astro` on `/add` + re-log chips on
dashboard. 18 pages; test_phase2 + test_nutrition + test_identity green.
R9 ✅ / R10 ✅ DONE 2026-09-10 — **rework R1–R10 all complete, undeployed.**
R9: `GET /trends`, `PATCH`/`DELETE /meals/{id}` (RLS via user_id filter, 404 for
others), `/meals/history`, dashboard week bar chart + insights, `mealRowEl` inline
edit/delete, `/history` page, History nav link. R10 Part A: `lookup_usda_local`
(~75-food FDC seed in `data/indb.sqlite` `usda_foods`+FTS, `scripts/build_usda_db.py`),
tried before live FDC API. R10 Part B: `/foods/<slug>-macros/` (99) +
`/compare/<a>-vs-<b>/` (120) + hubs, `@astrojs/sitemap`, JSON-LD; data from
`scripts/export_seo_data.py` → `seo-foods.json`.

**Post-R10, all DEPLOYED 2026-09-10** (see `PHASES.md` for detail):
- **Deploy** — everything since 8aef953 pushed + auto-deployed to Render; live
  verified (`/foods/search`, `/trends` 401, SEO pages, calculators).
- **Design pass** — Fraunces serif display face; custom sliders / meters / week
  chart; `--paper-2`/`--ink-2` tokens; heading-on-dark-band colour fix.
- **Landing rework** — free calculators are the hero + a dedicated tools grid;
  the AI tracker moved below into `#tracker`. Mobile tuning.
- **Free-tools surfacing** — nav dropdown renamed "Free tools" with a Food data
  section (`/compare/`, `/foods/`); Compare gets its own landing card;
  `/calculator` cross-links to it. The 3,916-page compare pillar was previously
  footer-only.
- **R10.2** — full USDA SR Legacy CSV import → 2,662 foods × 8 nutrients;
  `/foods/` 499 + `/compare/` 3,916 pages with bar viz + FAQ + FAQPage/
  NutritionInformation JSON-LD + related grids; `CompareTool.tsx` island
  (portion / per-serving / custom-grams live recompute); sitemap 4,434 URLs.

## Next
Regroup — see `PHASES.md` "After R10" + `ROADMAP.txt`. Still open:
- domain purchase + hosting split (frontend → CF Pages/Vercel), kill the ~50 s
  backend cold start (keepalive cron mitigates; GH cron drifts + auto-disables
  after 60 days)
- silent JWT refresh, PWA, household units, meal templates — all in `ROADMAP.txt`
- doc tidy: `README.md` refresh; `DESIGN.md` is a stray Vercel design-system
  dump, unrelated — delete when convenient
- widen `POPULAR` in `lib/seo.ts` if more `/compare/` volume is wanted (each
  +10 foods ≈ +1k pages)

| Version | Phases | Contents | Login |
| :--- | :--- | :--- | :---: |
| **v1 — public layer** | R1–R6 | editorial landing · calc engine + quick calc (Preact islands, locked) · full `/calculator` · macro sliders + diet cards · standalone calc pages + **pandas→SQLite** · auth split + guest AI gate | no |
| **v2 — logged-in layer** | R7–R9 | dashboard-primary shell · manual food search + saved meals · week/trend view + meal edit/delete | yes |
| **v3 — SEO** | R10 | **USDA→bulk local** · `/foods/` + `/compare/` programmatic pages | no |

## Assets workflow

Claude does NOT generate images/animation. When a phase needs one, Claude writes a
text prompt; user generates in ChatGPT and drops the file in `frontend/public/`.

## Positioning

**Worldwide macro tracker.** USDA is the default DB; landing / calculators / SEO
copy target a global audience. Indian-food support (INDB) is a capability we
mention as a plus, never the headline. No "India-first" framing anywhere
user-facing.

## Still open

- [ ] #6 — full restyle (editorial white/teal) vs remap current emerald theme
- [ ] More competitors to review (user has more links)
- [ ] Hosting split — revisit after domain purchase (frontend → CF Pages/Vercel;
      backend Render vs Fly.io; kill the ~50s cold start before the SEO push)

---

## Pending uncommitted work (decide: keep or fold into rework)

- `Layout.astro` — warm backend `/health` ping on page load
- `signup.astro` — height ft/in + weight lb unit toggles
