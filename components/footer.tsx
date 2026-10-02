"use client"

import Link from "next/link"
import { useI18n } from "./i18n-provider"
import { localePath } from "@/lib/i18n/config"

// Crawlable links to every section plus the CV (the side nav is lg-only).
const SECTIONS = [
  { id: "work", key: "work" },
  { id: "story", key: "story" },
  { id: "toolbox", key: "toolbox" },
  { id: "off-duty", key: "offDuty" },
  { id: "contact", key: "contact" },
] as const

export function Footer() {
  const { locale, t } = useI18n()
  const home = localePath(locale)
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <nav aria-label={t.footer.navLabel} className="mb-8 sm:mb-10">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-ink-subtle">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <Link href={`${home}#${s.id}`} className="hover:text-cyan transition-colors duration-200">
                  {t.nav.chapters[s.key]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localePath(locale, "/cv")} className="hover:text-cyan transition-colors duration-200">
                {t.breadcrumb.cv}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start sm:items-end">
          <div>
            <p className="eyebrow">{t.footer.development}</p>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">{t.footer.builtBy}</p>
          </div>

          <div className="sm:text-right">
            <p className="eyebrow">{t.footer.edition}</p>
            <p className="mt-2 mono text-xs text-ink-muted">
              v2026.08 &nbsp;·&nbsp;{" "}
              <Link href={localePath(locale)} className="hover:text-cyan transition-colors">
                © Daniela Silva
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
