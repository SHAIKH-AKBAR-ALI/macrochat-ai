/** Page-copy registry. One module per locale, English as the fallback so a
 * key that is not translated yet renders English instead of a blank.
 */
import { DEFAULT_LOCALE, type Locale } from "../config";
import { en, type PageStrings } from "./en";
import { es } from "./es";
import { ja } from "./ja";
import { fr } from "./fr";
import { de } from "./de";
import { pt } from "./pt";
import { ko } from "./ko";
import { it } from "./it";

type Partialised = { [S in keyof PageStrings]?: Partial<PageStrings[S]> };

const pages: Record<Locale, PageStrings | Partialised> = {
  en, es, ja, fr, de, pt, ko, it,
};

/** Translator for one page section, e.g. pageT("es", "landing")("hero.h1a"). */
export function pageT<S extends keyof PageStrings>(lang: Locale, section: S) {
  const dict = (pages[lang] as Partialised)[section] ?? {};
  const fallback = pages[DEFAULT_LOCALE][section] as Record<string, string>;
  return (key: keyof PageStrings[S]): string =>
    (dict as Record<string, string>)[key as string] ?? fallback[key as string];
}
