import type { ReactNode } from "react"

/** Primary CTA — same as "View / Download CV" in Contact. */
export const STATUS_PRIMARY_CLASS =
  "inline-flex items-center gap-2 mono text-sm text-foreground border border-foreground rounded-md px-5 py-3 transition-colors duration-200 ease-editorial hover:bg-foreground hover:text-paper"
/** Secondary action — same as "Visit site" in Projects. */
export const STATUS_ACTION_CLASS =
  "inline-flex items-center gap-2 mono text-sm text-foreground border border-rule rounded-md px-5 py-3 hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"

/**
 * Shared shell for the 404, error and global-error pages. Purely presentational
 * (no i18n context) so global-error — which renders without the root layout —
 * can use it too. The big code mirrors the chronology's year numerals.
 */
export function StatusPage({
  code,
  eyebrow,
  title,
  body,
  documentTitle,
  header,
  actions,
  children,
}: {
  code?: string
  eyebrow: string
  title: string
  body: string
  /** not-found.tsx can't export metadata; React 19 hoists this <title> into <head>. */
  documentTitle?: string
  header?: ReactNode
  actions: ReactNode
  /** Extra content under the actions (suggested links, error reference). */
  children?: ReactNode
}) {
  return (
    <>
      {documentTitle && <title>{documentTitle}</title>}
      {header}
      <main id="main" className="min-h-[100dvh] flex items-center bg-background text-foreground">
        <div className="mx-auto max-w-[1440px] w-full px-6 sm:px-10 lg:px-16 pt-28 pb-20 sm:pt-32">
          <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10 items-end">
            {code && (
              <p
                aria-hidden="true"
                className="lg:col-span-4 font-display font-bold leading-[0.85] tracking-[-0.045em] text-cyan/55 text-7xl sm:text-8xl lg:text-9xl select-none"
              >
                {code}
              </p>
            )}
            <div className={code ? "lg:col-span-8" : "lg:col-span-10"}>
              <div className="flex items-baseline gap-3 mb-5 sm:mb-6">
                <span className="eyebrow text-cyan">{eyebrow}</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
              </div>
              <h1 className="font-display font-semibold text-display-sm sm:text-display-md text-foreground leading-[0.95] tracking-[-0.035em] text-balance">
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted text-pretty">{body}</p>
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
