"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { localePath } from "@/lib/i18n/config"
import { StatusPage, STATUS_ACTION_CLASS } from "@/components/status-page"

export default function NotFound() {
  const { locale, t } = useI18n()
  return (
    <StatusPage eyebrow={t.notFound.eyebrow} title={t.notFound.title} body={t.notFound.body} documentTitle={t.meta.notFoundTitle}>
      <Link href={localePath(locale)} className={STATUS_ACTION_CLASS}>
        <ArrowLeft size={14} strokeWidth={2} />
        {t.notFound.back}
      </Link>
    </StatusPage>
  )
}
