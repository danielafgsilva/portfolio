import en from "./en"
import pt from "./pt"
import type { Locale } from "../config"

export type { Dictionary } from "./en"

// Server-side only: the layout passes the active locale's dictionary down
// through I18nProvider, so client bundles never ship both languages.
const dictionaries = { en, pt }

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
