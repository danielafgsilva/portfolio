"use client"

import type React from "react"
import { m } from "framer-motion"
import { EASE_EDITORIAL } from "@/lib/motion"

/**
 * CV section with a scroll reveal. `reveal={false}` renders it static: use it
 * for the first section, which is on screen at load — a reveal there keeps the
 * LCP text at opacity 0 until hydration (Lighthouse: ~3 s of render delay).
 */
export function AnimatedSection({
  title,
  reveal = true,
  children,
}: {
  title: string
  reveal?: boolean
  children: React.ReactNode
}) {
  const heading = (
    <>
      <h2 className="eyebrow">{title}</h2>
      <span className="h-px flex-1 bg-rule" aria-hidden="true" />
    </>
  )
  if (!reveal) {
    return (
      <section className="mb-10 print:mb-7">
        <div className="flex items-baseline gap-3 mb-5 print:mb-4">{heading}</div>
        <div>{children}</div>
      </section>
    )
  }
  return (
    <section className="mb-10 print:mb-7">
      <div className="flex items-baseline gap-3 mb-5 print:mb-4 overflow-hidden">
        <m.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
          className="flex items-baseline gap-3 flex-1"
        >
          {heading}
        </m.div>
      </div>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_EDITORIAL }}
      >
        {children}
      </m.div>
    </section>
  )
}
