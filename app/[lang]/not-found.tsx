"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { useI18n } from "@/components/i18n-provider"
import { localePath } from "@/lib/i18n/config"
import { StatusPage, STATUS_PRIMARY_CLASS } from "@/components/status-page"

export default function NotFound() {
  const { locale, t } = useI18n()
  const copy = t.notFound
  const home = localePath(locale)
  const suggestions = [
    { href: `${home}#work`, label: copy.suggestions.work },
    { href: `${home}#story`, label: copy.suggestions.story },
    { href: `${home}#contact`, label: copy.suggestions.contact },
    { href: localePath(locale, "/cv"), label: copy.suggestions.cv },
  ]
  return (
    <StatusPage
      code={copy.code}
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      documentTitle={t.meta.notFoundTitle}
      header={<Header />}
      actions={
        <Link href={home} className={STATUS_PRIMARY_CLASS}>
          <ArrowLeft size={14} strokeWidth={2} />
          {copy.back}
        </Link>
      }
    >
      <nav aria-label={copy.suggestionsLabel} className="mt-10">
        <ul className="flex flex-wrap gap-x-6 font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-ink-subtle">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="inline-block py-1 hover:text-cyan transition-colors duration-200">
                {s.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StatusPage>
  )
}
