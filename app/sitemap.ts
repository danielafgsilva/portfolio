import type { MetadataRoute } from "next"
import { absoluteUrl, alternatesFor, locales } from "@/lib/i18n/config"

// Every page in every locale, each with its hreflang alternates. Regenerated on
// every build, so lastModified tracks the latest deploy.
const PAGES = [
  { path: "/", priority: 1 },
  { path: "/cv", priority: 0.8 },
]


export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PAGES.flatMap(({ path, priority }) =>
    locales.map((locale) => {
      const { canonical, languages } = alternatesFor(locale, path)
      return {
        url: absoluteUrl(canonical),
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([lang, href]) => [lang, absoluteUrl(href)])),
        },
      }
    }),
  )
}
