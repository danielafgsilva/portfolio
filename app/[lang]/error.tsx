"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { localePath } from "@/lib/i18n/config"
import { StatusPage, STATUS_ACTION_CLASS } from "@/components/status-page"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale, t } = useI18n()
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <StatusPage eyebrow={t.error.eyebrow} title={t.error.title} body={t.error.body}>
      <button type="button" onClick={reset} className={STATUS_ACTION_CLASS}>
        <RotateCcw size={14} strokeWidth={2} />
        {t.error.retry}
      </button>
      <Link href={localePath(locale)} className={STATUS_ACTION_CLASS}>
        <ArrowLeft size={14} strokeWidth={2} />
        {t.error.back}
      </Link>
    </StatusPage>
  )
}
