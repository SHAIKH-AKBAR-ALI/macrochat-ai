/** Page copy, English — the source of truth. Every other locale file mirrors
 * these keys; `pageT()` falls back here for anything missing.
 *
 * Sections are added as pages get translated: `landing` first, calculators,
 * /foods/ and /compare/ after.
 */
export const en = {
  landing: {
    "hero.pill": "Free · No signup · Saved on your device",
    "hero.h1a": "Free macro tools.",
    "hero.h1b": "Real database numbers.",
    "hero.lead":
      "Work out your calories and macro split, break down a recipe, compare two foods — all free, all in your browser, nothing to sign up for. Every number traces back to USDA or INDB, never a guess.",
    "hero.check1": "Six calculators — macro, TDEE, BMR, protein, deficit, recipe",
    "hero.check2": "Macro pages for ~500 foods, plus side-by-side food comparisons",
    "hero.check3": "Your inputs save on this device — no account needed",
    "hero.ctaCalc": "Open the calculator",
    "hero.ctaTracking": "See meal tracking ↓",
    "hero.quickLabel": "Quick macro calculator",
    "hero.quickEyebrow": "Try it now · quick calculator",

    "trust.1": "Free forever",
    "trust.2": "No email to start",
    "trust.3": "Under 60 seconds",
    "trust.4": "We don't sell supplements or coaching",

    "tools.eyebrow": "Free · no account",
    "tools.h2": "Every tool, no sign-up wall.",
    "tools.lead":
      "Six calculators that run in your browser and remember your last inputs, plus ~500 food macro pages and thousands of head-to-head comparisons. Sign up only when you want them to track a day.",
    "tools.open": "Open →",
    "tool.macro": "Calories + protein/carb/fat split from your body stats.",
    "tool.tdee": "Your maintenance calories — what you burn in a day.",
    "tool.bmr": "Resting burn, Mifflin-St Jeor or Katch-McArdle.",
    "tool.protein": "A daily protein target scaled to your weight.",
    "tool.deficit": "Pick a deficit, see the weekly rate and goal date.",
    "tool.recipe": "Add ingredients and grams, get the whole-meal total.",
    "tool.compare":
      "Chicken vs rice, roti vs bread — bars, per-serving portions, a verdict for your goal.",
    "tool.az": "Per-100 g calories and macros for ~500 foods, USDA and INDB.",

    "stats.usda": "USDA food entries",
    "stats.indb": "INDB regional recipes",
    "stats.guessed": "Numbers the AI guessed",
    "stats.calcs": "Free calculators",

    "tracker.eyebrow": "The signed-in layer",
    "tracker.h2": "Want it to track your day? Sign up free.",
    "tracker.lead":
      "Everything above works with no account. Make one and the same real-database engine logs your meals — a photo or a sentence in, calories and macros out, checked against your goal.",
    "tracker.imgAlt":
      "Describe your meal, MacroChat looks it up in a real database, you confirm the portion.",

    "step1.label": "Step 1",
    "step1.title": "Say it or snap it",
    "step1.body":
      "Type your meal, attach a photo, or both. The AI names each food and spots the prep style — grilled, fried, curry.",
    "step2.label": "Step 2",
    "step2.title": "Real database lookup",
    "step2.body":
      "Every calorie comes from the Indian Nutrient Databank or USDA FoodData Central — matched to your food, never guessed from the AI's memory.",
    "step3.label": "Step 3",
    "step3.title": "You stay in control",
    "step3.body":
      "Stated a portion? Logged instantly. Photo-only estimate? You confirm the grams before anything counts toward your day.",

    "shot.eyebrow": "Signed in",
    "shot.h2": "A meal in, the facts out.",
    "shot.lead":
      "No dropdowns, no barcode hunt. Snap the plate, and MacroChat hands back a nutrition-facts panel with the macro split and every source labelled — INDB or USDA, right on the row.",
    "shot.cta": "Create a free account",
    "shot.you": "You",
    "shot.msg": "1 bowl veg biryani",
    "shot.factsTitle": "Meal facts",
    "shot.calories": "Calories",
    "shot.protein": "Protein",
    "shot.carbs": "Carbs",
    "shot.fat": "Fat",
    "shot.item": "Veg biryani · 1 bowl",
    "shot.donutLabel": "Protein 22%, Carbs 58%, Fat 20%",

    "feat.eyebrow": "What tracking adds",
    "feat.h2": "Built for how you actually eat.",
    "feat1.title": "Photo, text, or both",
    "feat1.body":
      "Snap the plate, type the portion, or do both. Text with grams logs instantly.",
    "feat2.title": "Real meals, not just packages",
    "feat2.body":
      "USDA for everyday foods worldwide, plus 1,000+ INDB recipes for regional dishes — dal, biryani, dosa.",
    "feat3.title": "You confirm the grams",
    "feat3.body":
      "Estimated a portion from a photo? Nothing counts until you approve it.",
    "feat4.title": "Manual search too",
    "feat4.body":
      "Skip the AI — search the same database, set the grams, log it straight to your day.",
    "feat5.title": "Week trends",
    "feat5.body":
      "A 7-day chart against your goal, a logging streak, and plain-language nudges — no AI cost.",
    "feat6.title": "Your midnight, not ours",
    "feat6.body":
      "Daily totals reset on your timezone's midnight — captured once at signup.",

    "vs.eyebrow": "Why it's different",
    "vs.h2": "A typical calorie app vs. MacroChat.",
    "vs.them": "Typical app",
    "vs.us": "MacroChat",
    "vs.them1": "Signup wall before you can use anything",
    "vs.us1": "Calculators + food data, no account",
    "vs.them2": "AI or crowd guesses the numbers",
    "vs.us2": "Only INDB + USDA lookups",
    "vs.them3": "Endless food-search dropdowns",
    "vs.us3": "One sentence, or one photo",
    "vs.them4": "Silently logs whatever it thinks",
    "vs.us4": "You confirm estimated portions",
    "vs.them5": "Barcode-first, home cooking missing",
    "vs.us5": "USDA + INDB, cooked dishes included",

    "receipts.eyebrow": "Real logs",
    "receipts.h2": "Not reviews. Receipts.",
    "receipts.q1": "2 rotis and dal — logged in 6 seconds, 348 kcal, source INDB.",
    "receipts.by1": "— A real log, not a review",
    "receipts.q2":
      "Photo of a plate → “grilled chicken breast, 210g?” → confirmed → 347 kcal.",
    "receipts.by2": "— The confirm step, working",
    "receipts.q3":
      "“boiled quinoa” resolved to USDA quinoa, not chicken feet. Fixed, tested.",
    "receipts.by3": "— One less junk match",

    "faq.eyebrow": "FAQ",
    "faq.h2": "Fair questions.",
    "faq.q1": "Do the calculators cost anything?",
    "faq.a1":
      "No. Every calculator and food page is free and needs no account — your inputs save in your browser. You only sign up if you want meal tracking with saved history and daily totals.",
    "faq.q2": "How accurate are the calorie counts?",
    "faq.a2":
      "Numbers come from the Indian Nutrient Databank and USDA FoodData Central — real lab-measured data, never AI guesses. The uncertain part is portion size: state grams in text and it's as exact as your scale; from a photo it's an estimate, and we always ask you to confirm it before it counts.",
    "faq.q3": "What formulas do the calculators use?",
    "faq.a3":
      "Mifflin-St Jeor for BMR by default, Katch-McArdle if you enter a body-fat %. TDEE multiplies by an activity factor; the macro split uses 1.8 g/kg protein, 25% of calories from fat, carbs for the rest. All shown on the ",
    "faq.a3link": "calculator page",
    "faq.q4": "Can I try the meal tracker without an account?",
    "faq.a4pre": "Yes — ",
    "faq.a4link": "guest mode",
    "faq.a4post":
      " analyses up to three meals per session. An account saves them, tracks your day, and lifts the limit.",
    "faq.q5": "Does it know Indian food?",
    "faq.a5":
      "Yes — 1,000+ recipes and ingredients from the Indian Nutrient Databank: roti, dal, sabzi, biryani, dosa. Everything else falls back to USDA's database.",
    "faq.q6": "Why does the first meal analysis sometimes take ~50 seconds?",
    "faq.a6":
      "The AI backend runs on a free tier that sleeps when idle; the first request wakes it. The calculators don't touch it — they're instant.",
    "faq.q7": "Does it scan barcodes?",
    "faq.a7":
      "No, on purpose. Barcodes only cover packaged food; most real meals — dal, sabzi, home-cooked anything — have no barcode. Describe or photograph the plate instead.",
    "faq.q8": "Is there a dark mode?",
    "faq.a8":
      "Yes — the ◐ toggle in the nav. Same ink-on-paper system, inverted; the teal holds. Your choice is remembered and follows your OS by default.",
    "faq.q9": "What happens to my photos and data?",
    "faq.a9":
      "Photos are used only to identify the food. Your meal history is stored in Supabase with row-level security — only your account can read it. See the ",
    "faq.a9link": "privacy policy",

    "cta.h2": "Start with a number.",
    "cta.btn1": "Open the calculator",
    "cta.btn2": "Sign up to track",
    "cta.sub": "No card. No barcode. No AI-invented numbers.",

    "meta.title": "MacroChat — Free macro calculators + real-database meal tracking",
    "meta.description":
      "Free macro, TDEE, BMR, protein, deficit and recipe calculators — no signup, saved on your device. Calorie and macro numbers come from USDA and INDB, never guessed.",
  },

  /** Shared by every calculator island (QuickCalc, FullCalc, MiniCalc,
   * MacroSplit, RecipeCalc). Islands get this as a plain object prop, so the
   * strings ship with the page instead of the locale bundle. */
  calc: {
    units: "Units",
    "units.metric": "Metric (kg, cm)",
    "units.imperial": "Imperial (lb, ft/in)",
    sex: "Sex",
    "sex.male": "Male",
    "sex.female": "Female",
    age: "Age",
    weight: "Weight",
    heightCm: "Height (cm)",
    height: "Height",
    "height.feet": "Height feet",
    "height.inches": "Height inches",
    activity: "Activity",
    "act.sedentary": "Sedentary",
    "act.sedentaryLong": "Sedentary — desk job, little exercise",
    "act.light": "Light",
    "act.lightLong": "Light — 1–3 workouts/week",
    "act.moderate": "Moderate",
    "act.moderateLong": "Moderate — 3–5 workouts/week",
    "act.active": "Active",
    "act.activeLong": "Active — 6–7 workouts/week",
    "act.veryActive": "Very active",
    "act.veryActiveLong": "Very active — hard training / physical job",
    goal: "Goal",
    "goal.lose": "Lose fat (−500 kcal)",
    "goal.maintain": "Maintain",
    "goal.gain": "Gain (+300 kcal)",
    advanced: "Advanced options",
    bodyfat: "Body fat % (enables Katch-McArdle)",
    bodyfatShort: "Body fat % (optional → Katch-McArdle)",
    optional: "optional",
    experience: "Training experience",
    "exp.beginner": "Beginner (< 1 yr)",
    "exp.intermediate": "Intermediate (1–3 yr)",
    "exp.advanced": "Advanced (3+ yr)",

    "fc.note":
      "Pick a diet style or drag the split below. Saved on this device — no account. Sign up to track meals against this target.",

    result: "Result",
    yourTarget: "Your daily target",
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    bmr: "BMR",
    tdeeMaint: "TDEE (maintenance)",
    bmiWater: "BMI · Water",
    fillFields: "Fill in the fields",
    formula: "Formula",
    "unit.kcalDay": "kcal/day",
    "unit.gDay": "g/day",
    "unit.kgWeek": "kg/week",
    "unit.weeks": "weeks",

    "mini.activityFactor": "Activity factor",
    "mini.proteinTarget": "Target (1.8 g/kg)",
    "mini.range": "Reasonable range",
    "mini.dailyCalories": "Daily calories",
    "mini.maintenance": "Maintenance",
    "mini.weeklyRate": "Weekly rate",
    "mini.timeToGoal": "Time to goal",
    "mini.setLower": "set a lower goal weight",
    "mini.goalWeight": "Goal weight",
    "mini.dailyDeficit": "Daily deficit (kcal)",

    "qc.note":
      "Mifflin-St Jeor · protein 1.8 g/kg · fat 25% of calories. Saved on this device, no account.",
    "qc.full": "Use the full calculator →",
    "qc.fullMini": "Full macro calculator →",
    "qc.save": "Save to your account →",

    "split.dietStyle": "Diet style",
    "split.summary": "Daily target summary",
    "split.lock": "Lock",
    "split.unlock": "Unlock",
    "split.note":
      "Lock a macro to pin it while you drag the others — the split always totals 100%. Grams use 4/4/9 kcal per gram.",
    "diet.balanced": "Balanced",
    "diet.lowCarb": "Low-Carb",
    "diet.keto": "Keto",
    "diet.highProtein": "High-Protein",
    "diet.plantBased": "Plant-Based",
    "diet.initialC": "C",
    "diet.initialP": "P",
    "diet.initialF": "F",

    "recipe.ingredient": "Ingredient (e.g. paneer, oats, banana)",
    "recipe.grams": "g",
    "recipe.remove": "Remove",
    "recipe.add": "+ Add ingredient",
    "recipe.calc": "Calculate macros",
    "recipe.calculating": "Calculating…",
    "recipe.waking": "Waking the server…",
    "recipe.total": "Recipe total",
    "recipe.noMatch": "no match",
    "recipe.empty": "Add ingredients and calculate",
  },

  /** Prose on the six calculator pages. Page h1s reuse the tool names in
   * src/i18n/ui.ts so a calculator is named the same thing everywhere. */
  calcPages: {
    pill: "Free tools · No signup",
    how: "How it works",
    seeAlso: "See also",

    "macro.lead":
      "Your daily calories and protein / carb / fat split from Mifflin-St Jeor (or Katch-McArdle if you know your body-fat %). Runs entirely in your browser — the numbers match what MacroChat uses when you track a meal.",
    "macro.eyebrow": "Transparency",
    "macro.h2": "How this calculator works",
    "macro.s1": "1 · Basal metabolic rate (BMR)",
    "macro.s1a": "Calories your body burns at complete rest. The default formula is Mifflin-St Jeor:",
    "macro.s1b":
      "Enter a body-fat % under Advanced options and it switches to Katch-McArdle, which is more accurate for lean or very heavy people because it works from lean mass:",
    "macro.s2": "2 · Total daily energy expenditure (TDEE)",
    "macro.s2a": "BMR multiplied by an activity factor:",
    "macro.thActivity": "Activity",
    "macro.thFactor": "Factor",
    "macro.s3": "3 · Goal adjustment",
    "macro.thGoal": "Goal",
    "macro.thChange": "Daily change",
    "macro.goalLose": "Lose fat",
    "macro.goalLoseVal": "−500 kcal (≈ 0.45 kg / week)",
    "macro.goalMaintain": "Maintain",
    "macro.goalGain": "Gain",
    "macro.goalGainVal": "+300 kcal (lean gain)",
    "macro.s4": "4 · Macro split",
    "macro.s4a":
      "Protein is set to 1.8 g per kg bodyweight (an active-adult target), fat to 25% of total calories, and carbs take whatever calories are left. Energy per gram: protein 4, carbs 4, fat 9.",
    "macro.s4b":
      "BMI is weight(kg) / height(m)²; the water target is a rough 35 ml per kg of bodyweight.",
    "macro.refs": "References",
    "macro.tblEyebrow": "Reference",
    "macro.tblH2": "Macros in common foods",
    "macro.tblLead": "Per typical serving. Tap a food for its full page, or ",
    "macro.tblLeadLink": "compare two foods side by side",
    "macro.thFood": "Food",
    "macro.thServing": "Serving",

    "tdee.lead":
      "Total Daily Energy Expenditure — the calories you burn in a day, resting plus activity. It's your maintenance number: eat that to stay the same weight, less to lose, more to gain.",
    "tdee.h2": "BMR × activity factor",
    "tdee.p1":
      "We take your BMR (Mifflin-St Jeor, or Katch-McArdle if you enter a body-fat %) and multiply by an activity factor: 1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 active, 1.9 very active.",

    "bmr.lead":
      "Basal Metabolic Rate — the calories your body burns at complete rest just keeping you alive. It's the floor your daily calorie target is built on.",
    "bmr.h2": "Mifflin-St Jeor",
    "bmr.p1":
      "Enter a body-fat % and it switches to Katch-McArdle (370 + 21.6 · lean mass), which is more accurate for lean or very heavy people.",

    "protein.lead":
      "How much protein to aim for each day, based on your bodyweight. This is the same target MacroChat uses when it builds your macro split.",
    "protein.h2": "1.8 g per kg bodyweight",
    "protein.p1":
      "The default target is 1.8 g/kg — a solid active-adult number. The range 1.6–2.2 g/kg covers most goals: the lower end for general health, the upper end when dieting hard or building muscle. Protein is 4 kcal per gram.",

    "deficit.lead":
      "Pick a daily deficit and a goal weight — see your daily calorie target, the weekly rate of loss, and roughly when you'd hit the goal.",
    "deficit.h2": "Deficit → rate → date",
    "deficit.p1":
      "Daily calories = your TDEE minus the deficit you choose. About 7,700 kcal ≈ 1 kg of body fat, so a 500 kcal/day deficit is roughly 0.45 kg/week. Time to goal = weight to lose ÷ weekly rate.",
    "deficit.p2":
      "A 300–750 kcal/day deficit is a sustainable range for most people. Very large deficits cost muscle and are hard to hold.",

    "recipe.lead":
      "List the ingredients and grams — get the total calories, protein, carbs and fat. Every number is a real database lookup (USDA and INDB), not an AI estimate.",
    "recipe.h2": "Lookup, scale, sum",
    "recipe.p1":
      "Each ingredient name is matched to an INDB (Indian dishes and ingredients) or USDA FoodData Central entry — plain staples like rice and dal use a fixed canonical value. The per-100 g macros are scaled to your grams and added up.",
    "recipe.p2":
      "Plain names match best: \"rice\", \"chicken breast\", \"olive oil\". An ingredient that can't be matched is listed separately and left out of the total. The first request after a while can take ~50 s while the free-tier server wakes.",
    "recipe.p3": "Want it done from a photo or a sentence instead? ",
    "recipe.p3link": "Try the meal chat",
  },
} as const;

export type PageStrings = typeof en;
