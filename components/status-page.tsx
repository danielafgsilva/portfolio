"use client"

import type { ReactNode } from "react"

/** Same look as the "Visit site" button in Projects. */
export const STATUS_ACTION_CLASS =
  "inline-flex items-center gap-2 mono text-sm text-foreground border border-rule rounded-md px-3 py-2 hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"

/** Shared shell for the 404 and error pages — same editorial look as the site. */
export function StatusPage({
  eyebrow,
  title,
  body,
  documentTitle,
  children,
}: {
  eyebrow: string
  title: string
  body: string
  /** not-found.tsx can't export metadata; React 19 hoists this <title> into <head>. */
  documentTitle?: string
  children: ReactNode
}) {
  return (
    <main className="min-h-[100dvh] flex items-center bg-background text-foreground">
      {documentTitle && <title>{documentTitle}</title>}
      <div className="mx-auto max-w-[1440px] w-full px-6 sm:px-10 lg:px-16 py-24">
        <div className="flex items-baseline gap-3 mb-6 sm:mb-8">
          <span className="eyebrow text-cyan">{eyebrow}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display font-semibold text-display-sm sm:text-display-md text-foreground leading-[0.95] tracking-[-0.035em] text-balance max-w-4xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted">{body}</p>
        <div className="mt-10 flex flex-wrap gap-3">{children}</div>
      </div>
    </main>
  )
}
