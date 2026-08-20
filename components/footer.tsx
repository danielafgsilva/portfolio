import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start sm:items-end">
          <div>
            <p className="eyebrow">development</p>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              Designed &amp; built by Daniela Silva.
            </p>
          </div>

          <div className="sm:text-right">
            <p className="eyebrow">edition</p>
            <p className="mt-2 mono text-xs text-ink-muted">
              v2026.08 &nbsp;·&nbsp;{" "}
              <Link href="/" className="hover:text-cyan transition-colors">
                © Daniela Silva
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
