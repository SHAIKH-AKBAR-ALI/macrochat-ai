import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// ponytail: no domain yet — same placeholder as Layout.astro's SITE. Swap both when bought.
export default defineConfig({
  site: "https://macrochat-d6oi.onrender.com",
  integrations: [preact(), sitemap()],
});
