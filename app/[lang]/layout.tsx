import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { PageLoader } from "@/components/page-loader"
import { MotionProvider } from "@/components/motion-provider"
import { I18nProvider } from "@/components/i18n-provider"
import { alternatesFor, htmlLang, isLocale, locales, ogLocale, SITE_URL, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import "../globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

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

  return (
    <html lang={htmlLang[locale]} className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
          <MotionProvider>
            <PageLoader />
            {children}
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
