import { renderShareImage, OG_SIZE } from "@/lib/seo/og-image"
import { isLocale, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

// CV share image, one per locale.
export const contentType = "image/png"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateImageMetadata({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "en"
  return [{ id: "og", alt: getDictionary(lang).meta.cvOgImageAlt, size: OG_SIZE, contentType }]
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getDictionary(isLocale(lang) ? lang : "en")
  return renderShareImage({
    eyebrow: t.cv.eyebrow,
    title: "Daniela Silva",
    subtitle: t.cv.tagline,
    footer: lang === "pt" ? "daniela-silva.vercel.app/pt/cv" : "daniela-silva.vercel.app/cv",
  })
}
