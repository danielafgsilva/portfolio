import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { fontVariables } from "@/lib/fonts"
import { PageLoader } from "@/components/page-loader"
import { MotionProvider } from "@/components/motion-provider"
import { I18nProvider } from "@/components/i18n-provider"
import { alternatesFor, htmlLang, isLocale, locales, ogLocale, SITE_URL, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import "../globals.css"

// Both locales are prerendered. The middleware only ever routes "en" or "pt"
// here; the isLocale check below 404s anything else. (No dynamicParams=false:
// it would also apply to [...rest] and bypass this layout for localized 404s.)
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang).meta
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, "/"),
    openGraph: {
      type: "website",
      siteName: "Daniela Silva",
      title: t.title,
      description: t.description,
      url: alternatesFor(lang, "/").canonical,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    authors: [{ name: "Daniela Silva", url: SITE_URL }],
    creator: "Daniela Silva",
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Params
}>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const locale: Locale = lang
  const t = getDictionary(locale)

  return (
    <html lang={htmlLang[locale]} className={`dark ${fontVariables}`}>
      <body className="font-sans antialiased">
        {/* Skip link: first Tab stop, visible only while focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-foreground focus:border focus:border-cyan"
        >
          {t.nav.skip}
        </a>
        <I18nProvider locale={locale} dictionary={t}>
          <MotionProvider>
            <PageLoader />
            {children}
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
