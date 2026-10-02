import type { MetadataRoute } from "next"
import { alternatesFor, locales, SITE_URL } from "@/lib/i18n/config"

// Every page in every locale, each with its hreflang alternates. Regenerated on
// every build, so lastModified tracks the latest deploy.
const PAGES = [
  { path: "/", priority: 1 },
  { path: "/cv", priority: 0.8 },
]

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PAGES.flatMap(({ path, priority }) =>
    locales.map((locale) => {
      const { canonical, languages } = alternatesFor(locale, path)
      return {
        url: abs(canonical),
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([lang, href]) => [lang, abs(href)])),
        },
      }
    }),
  )
}
