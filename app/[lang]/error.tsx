"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { Header } from "@/components/header"
import { useI18n } from "@/components/i18n-provider"
import { localePath } from "@/lib/i18n/config"
import { StatusPage, STATUS_ACTION_CLASS, STATUS_PRIMARY_CLASS } from "@/components/status-page"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale, t } = useI18n()
  const copy = t.error
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <StatusPage
      code={copy.code}
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      documentTitle={t.meta.errorTitle}
      header={<Header />}
      actions={
        <>
          <button type="button" onClick={reset} className={STATUS_PRIMARY_CLASS}>
            <RotateCcw size={14} strokeWidth={2} />
            {copy.retry}
          </button>
          <Link href={localePath(locale)} className={STATUS_ACTION_CLASS}>
            <ArrowLeft size={14} strokeWidth={2} />
            {copy.back}
          </Link>
        </>
      }
    >
      {/* Server errors carry a digest that matches the server log entry. */}
      {error.digest && (
        <p className="mt-8 font-mono text-xs text-ink-subtle">
          {copy.reference}: {error.digest}
        </p>
      )}
    </StatusPage>
  )
}
