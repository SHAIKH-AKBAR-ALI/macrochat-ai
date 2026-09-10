import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// Keep in sync with src/i18n/config.ts (LOCALES). English stays at the root, so
// every existing URL is unchanged; the other seven get a /<lang>/ prefix.
const locales = ["en", "es", "ja", "fr", "de", "pt", "ko", "it"];

// ponytail: no domain yet — same placeholder as Layout.astro's SITE. Swap both when bought.
export default defineConfig({
  site: "https://macrochat-d6oi.onrender.com",
  i18n: {
    locales,
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    preact(),
    // Puts xhtml:link alternates in the sitemap itself, on top of the <link
    // rel="alternate"> tags Layout.astro renders in each page's head.
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: Object.fromEntries(locales.map((l) => [l, l])),
      },
    }),
  ],
});
