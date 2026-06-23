"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-start sm:items-end">
          <div>
            <p className="eyebrow">// development</p>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              Designed &amp; built by Daniela Silva.
            </p>
          </div>

          <div className="sm:text-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 mono text-sm text-foreground border border-rule rounded-md px-3 py-1.5 hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"
              aria-label="Back to top"
            >
              <ArrowUp size={14} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              back to top
            </button>
          </div>

          <div className="sm:text-right">
            <p className="eyebrow">// edition</p>
            <p className="mt-2 mono text-xs text-ink-muted">
              v2026.06 &nbsp;·&nbsp;{" "}
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
