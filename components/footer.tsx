"use client"

import Link from "next/link"
import { useI18n } from "./i18n-provider"
import { localePath } from "@/lib/i18n/config"

export function Footer() {
  const { locale, t } = useI18n()
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
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
