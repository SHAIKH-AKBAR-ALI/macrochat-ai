/** Locale list, URL shapes and the hreflang set. One place, imported everywhere.
 *
 * English lives at the root (`/calculator`), every other locale under a prefix
 * (`/es/calculator`) — prefixDefaultLocale: false in astro.config.mjs. Keep the
 * two in sync.
 */
export const DEFAULT_LOCALE = "en";

export const LOCALES = {
  en: { label: "English", htmlLang: "en" },
  es: { label: "Español", htmlLang: "es" },
  ja: { label: "日本語", htmlLang: "ja" },
  fr: { label: "Français", htmlLang: "fr" },
  de: { label: "Deutsch", htmlLang: "de" },
  pt: { label: "Português", htmlLang: "pt" },
  ko: { label: "한국어", htmlLang: "ko" },
  it: { label: "Italiano", htmlLang: "it" },
} as const;

export type Locale = keyof typeof LOCALES;

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

/** getStaticPaths() entry per locale. The default locale gets `undefined`, which
 * is what makes one `[...lang]/foo.astro` file serve both `/foo` and `/es/foo`. */
export function localePaths() {
  return LOCALE_CODES.map((l) => ({
    params: { lang: l === DEFAULT_LOCALE ? undefined : l },
  }));
}

/** Narrow whatever came out of Astro.params to a real Locale. */
export function toLocale(lang: string | undefined): Locale {
  return lang && (LOCALE_CODES as string[]).includes(lang)
    ? (lang as Locale)
    : DEFAULT_LOCALE;
}

/** "/calculator" -> "/es/calculator" (unchanged for the default locale). */
export function localeHref(lang: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return lang === DEFAULT_LOCALE ? p : `/${lang}${p}`;
}

/** "/es/foods/rice-macros/" -> "/foods/rice-macros/" — the locale-free path an
 * hreflang set is built from. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return m && (LOCALE_CODES as string[]).includes(m[1]) && m[1] !== DEFAULT_LOCALE
    ? pathname.slice(3) || "/"
    : pathname;
}
