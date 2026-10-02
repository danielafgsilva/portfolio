"use client"

import type { MouseEvent } from "react"
import { usePathname } from "next/navigation"
import { useI18n } from "@/components/i18n-provider"
import { htmlLang, localePath, locales, LOCALE_COOKIE, stripLocale, type Locale } from "@/lib/i18n/config"

/** Read by PageLoader so switching language doesn't replay the intro. */
export const SKIP_INTRO_KEY = "skip-intro"

/**
 * "EN · PT". Plain <a> (full navigation) on purpose: the choice is stored in a
 * cookie the middleware reads, and a prefetched client navigation could carry a
 * redirect computed with the old cookie. The current #section is kept.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n()
  const path = stripLocale(usePathname() || "/")

  const choose = (e: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (target === locale) {
      e.preventDefault()
      return
    }
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`
    try {
      sessionStorage.setItem(SKIP_INTRO_KEY, "1")
    } catch {}
    e.currentTarget.href += window.location.hash
  }

  return (
    <nav aria-label={t.nav.language} className={className}>
      <ul className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em]">
        {locales.map((l, i) => {
          const active = l === locale
          return (
            <li key={l} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-ink-subtle/60" aria-hidden="true">
                  ·
                </span>
              )}
              <a
                href={localePath(l, path)}
                hrefLang={htmlLang[l]}
                lang={htmlLang[l]}
                aria-label={t.nav.languageNames[l]}
                aria-current={active ? "true" : undefined}
                onClick={(e) => choose(e, l)}
                className={`py-1 transition-colors duration-200 ${
                  active ? "text-cyan" : "text-ink-subtle hover:text-foreground"
                }`}
              >
                {l}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
