# MacroChat — Image assets (prompts + decisions)

Claude does NOT generate images. Claude writes the prompt; user generates in
ChatGPT / DALL·E and drops the file in `frontend/public/`. Claude then wires it in.

**Locked visual system (already baked into each prompt below):**
Editorial health-publication look (ref: macronutrients.com). Pure white `#ffffff`
background. ONE accent: deep teal `#0d9488`. Ink/line: near-black `#111c19`.
Flat 2D. NO gradients, NO 3D, NO bevels, NO drop shadows, NO photorealism, NO
glossy stock-art. Even confident strokes, lots of whitespace. PNG output; spot
illustrations on transparent background.

---

## R1 — editorial landing (5 prompts)

### 1. Social share card — `frontend/public/og-default.png`
**Use:** the preview image when the site link is shared (WhatsApp, X, iMessage,
Slack). Zero SEO risk, social-only upside. **Size: 1200 × 630 px.**

> A 1200x630 social-share banner. Flat 2D editorial style, pure white background,
> generous ~90px margins. Left half: bold headline in a heavy geometric sans-serif,
> tight leading, near-black #111c19, reading "Tell it what you ate." on two lines
> then "It does the math." in deep teal #0d9488. Above it a small teal rounded
> pill with uppercase mono text "FREE TOOLS · NO SIGNUP". Right half: a simple
> flat line-art nutrition-facts label, near-black outline, a stack of thin
> horizontal rules, the top "Calories" row filled with a pale teal tint. No
> gradients, no shadows, no 3D, no texture. Calm, like a health-magazine cover.

### 2. Hero spot illustration — `frontend/public/hero-spot.png`
**Use:** optional drawing beside the headline if the hero looks bare. Keep file
<50KB. **Size: ~900 × 900 px, transparent background.**

> Flat 2D editorial spot illustration on a transparent background. A top-down
> dinner plate as a clean thin near-black (#111c19) circular outline, the food
> inside split into three pie wedges: one solid deep teal (#0d9488), one pale
> teal tint, one plain white with a thin outline. A thin near-black fork and
> knife lie beside the plate. Even line weight throughout. No gradients, no
> shadows, no 3D, no texture. Minimal, calm, lots of empty space.

### 3. Logomark — `frontend/public/favicon.svg` replacement + nav mark
**Use:** browser-tab icon and the small mark next to "MACROCHAT" in the nav.
**Size: 512 × 512 px, transparent background, centered with padding.**

> A minimal flat 2D app logomark on a transparent background, centered with even
> padding. A circle drawn in deep teal (#0d9488) with one quarter-wedge cut out
> like a pie chart or a plate with a bite taken, the cut-out edges a clean thin
> near-black (#111c19) line. Solid shapes, geometric, perfectly balanced. No
> gradients, no shadows, no 3D, no text, no letters. Simple enough to read at
> 16 pixels.

### 4. "How it works" process strip — `frontend/public/how-it-works.png`
**Use:** one wide banner above the 3 step cards. **Size: 1600 × 500 px,
transparent background.**

> A wide flat 2D editorial illustration, transparent background, three simple
> line-art scenes evenly spaced left to right, connected by thin near-black
> (#111c19) arrows. Scene 1: a rounded speech bubble containing a tiny fork,
> outline near-black. Scene 2: a small database cylinder / stacked-disks icon in
> near-black line with a pale teal (#0d9488) tint. Scene 3: a checkmark inside a
> square, the check in deep teal (#0d9488). Even thin strokes, generous spacing,
> no gradients, no shadows, no 3D, no text.

### 5. Empty / 404 illustration — `frontend/public/not-found.png`
**Use:** the `/404` and `/500` pages. **Size: ~800 × 800 px, transparent
background.**

> Flat 2D editorial spot illustration, transparent background. A single empty
> dinner plate drawn as a thin near-black (#111c19) circular outline with a fork
> and knife crossed over it, also thin near-black line. Nothing on the plate. A
> small deep teal (#0d9488) dashed circle hovers above like a missing item. Even
> line weight, lots of whitespace, no gradients, no shadows, no 3D, no text.

---

## Decisions log
- 2026-09-10: R1 ships type-only (matches macronutrients — no hero image needed to
  call R1 done). Later phases (R2–R10) need no generated images per PHASES.md.
- 2026-09-10: user generated all 5. Processed (resize + palette-quantize / JPEG) into
  `frontend/public/` and wired in:
  - `og-default.jpg` (1200×630, 76 KB) → OG + Twitter `<meta>` in `Layout.astro`.
    `SITE` const = Render URL for now; swap when domain bought.
  - `logo-mark.png` (256², 2 KB) → PNG favicon + 22px mark beside the nav wordmark.
  - `how-it-works.png` (1600×533, 9 KB) → `.how-strip` banner above the R1 step cards.
  - `not-found.png` (800², 14 KB) → `.art-spot` on `/404` + `/500`.
  - `hero-spot.png` (900², 30 KB) → `/calculator` stub for now; held for R2 onboarding.
  - Dark mode: art carries its own light fill, so `.how-strip` / `.art-spot` sit on a
    light chip in dark rather than filter-invert (fills would go black). Regenerate as
    true transparent line-art later if we want them to float on dark.
  - Originals kept in `~/Downloads`, not committed. `favicon.svg` kept as secondary icon.
