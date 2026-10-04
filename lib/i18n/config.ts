// Locale routing: English is the original and lives at the root ("/", "/cv");
// European Portuguese lives under "/pt". The middleware rewrites unprefixed
// URLs to the internal "/en/..." segment, so "/en" never appears publicly.

export const locales = ["en", "pt"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

/** BCP 47 tags for <html lang>, hreflang and switcher links. */
export const htmlLang: Record<Locale, string> = { en: "en", pt: "pt-PT" }
export const ogLocale: Record<Locale, string> = { en: "en_US", pt: "pt_PT" }

/** Set only when the visitor picks a language in the switcher. */
export const LOCALE_COOKIE = "NEXT_LOCALE"

export const SITE_URL = "https://daniela-silva.vercel.app"

/** "/cv" → "https://daniela-silva.vercel.app/cv" ("/" → the bare origin). */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}

/** Public URL of `path` ("/" or "/cv") in `locale`. */
export function localePath(locale: Locale, path = "/") {
  if (locale === defaultLocale) return path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

/**
 * Strips any locale prefix: "/pt/cv" → "/cv", "/pt" → "/". Also "/en/..." —
 * during SSR usePathname() returns the middleware's internal rewrite ("/en"),
 * not the public URL.
 */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(en|pt)(?=\/|$)/, "")
  return stripped === "" ? "/" : stripped
}

/** Canonical + hreflang alternates for a page, for generateMetadata. */
export function alternatesFor(locale: Locale, path = "/") {
  return {
    canonical: localePath(locale, path),
    languages: {
      [htmlLang.en]: localePath("en", path),
      [htmlLang.pt]: localePath("pt", path),
      "x-default": localePath(defaultLocale, path),
    },
  }
}
