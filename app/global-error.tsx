"use client"

import { useEffect, useState } from "react"
import { RotateCcw, ArrowLeft } from "lucide-react"
import { StatusPage, STATUS_ACTION_CLASS, STATUS_PRIMARY_CLASS } from "@/components/status-page"
import { fontVariables } from "@/lib/fonts"
import { htmlLang, localePath, type Locale } from "@/lib/i18n/config"
import { globalErrorCopy } from "@/lib/i18n/dictionaries/global-error"
import "./globals.css"

// Replaces the root layout when the layout itself throws, so it renders its own
// <html>/<body>, fonts and styles. The locale comes from the URL ("/pt…")
// because the I18nProvider lives in the layout that just failed.
export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const [locale, setLocale] = useState<Locale>("en")
  useEffect(() => {
    if (/^\/pt(\/|$)/.test(window.location.pathname)) setLocale("pt")
    console.error(error)
  }, [error])
  const copy = globalErrorCopy[locale]

  return (
    <html lang={htmlLang[locale]} className={`dark ${fontVariables}`}>
      <body className="font-sans antialiased">
        <StatusPage
          eyebrow={copy.eyebrow}
          title={copy.heading}
          body={copy.body}
          documentTitle={copy.title}
          header={
            <header className="fixed top-0 left-0 right-0 z-50">
              <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 flex items-center justify-center h-14 sm:h-16 lg:h-20">
                <span className="font-display font-semibold text-base sm:text-lg lg:text-xl text-foreground tracking-tight">
                  Daniela<span className="text-cyan">.</span>
                </span>
              </div>
            </header>
          }
          actions={
            <>
              {/* A full reload is the reliable retry when the layout itself failed. */}
              <button type="button" onClick={() => window.location.reload()} className={STATUS_PRIMARY_CLASS}>
                <RotateCcw size={14} strokeWidth={2} />
                {copy.reload}
              </button>
              {/* Plain <a>: client navigation would reuse the broken layout. */}
              <a href={localePath(locale)} className={STATUS_ACTION_CLASS}>
                <ArrowLeft size={14} strokeWidth={2} />
                {copy.home}
              </a>
            </>
          }
        >
          {error.digest && (
            <p className="mt-8 font-mono text-xs text-ink-subtle">
              {copy.reference}: {error.digest}
            </p>
          )}
        </StatusPage>
      </body>
    </html>
  )
}
