/** Translated food names, slug -> name, one JSON per locale.
 *
 * The 499 /foods/ entries come from the database in English. Names are the
 * page's h1, title and every link label, so a locale that leaves them English
 * ranks for nothing. A missing slug falls back to the English name, which is
 * what lets these files land in batches.
 *
 * Slugs (and therefore URLs) stay English on purpose — one path set, one
 * sitemap, and hreflang keeps the locales tied together.
 */
import es from "./foods/es.json";
import ja from "./foods/ja.json";
import fr from "./foods/fr.json";
import de from "./foods/de.json";
import pt from "./foods/pt.json";
import ko from "./foods/ko.json";
import it from "./foods/it.json";
import type { Locale } from "./config";

const NAMES: Partial<Record<Locale, Record<string, string>>> = { es, ja, fr, de, pt, ko, it };

export const foodName = (lang: Locale, slug: string, english: string): string =>
  NAMES[lang]?.[slug] ?? english;

/** Same food object with its name translated. Everything downstream reads
 * `.name`, so one call at the top of a page localises the whole page. */
export const tf = <T extends { slug: string; name: string }>(lang: Locale, f: T): T =>
  ({ ...f, name: foodName(lang, f.slug, f.name) });
