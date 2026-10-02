import { renderShareImage, OG_SIZE } from "@/lib/seo/og-image"
import { isLocale, locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

// Home share image, one per locale (alt text is localized too).
export const contentType = "image/png"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateImageMetadata({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "en"
  return [{ id: "og", alt: getDictionary(lang).meta.ogImageAlt, size: OG_SIZE, contentType }]
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getDictionary(isLocale(lang) ? lang : "en")
  return renderShareImage({
    eyebrow: lang === "pt" ? "Portefólio" : "Portfolio",
    title: "Daniela",
    subtitle: t.hero.meta.role.value.replace(/ /g, " "),
    footer: "daniela-silva.vercel.app",
  })
}
