"use client"

import type React from "react"
import { motion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

export function AnimatedSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10 print:mb-7">
      <div className="flex items-baseline gap-3 mb-5 print:mb-4 overflow-hidden">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-baseline gap-3 flex-1"
        >
          <span className="chapter-number text-sm">{number}</span>
          <span className="eyebrow">// {title}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        {children}
      </motion.div>
    </section>
  )
}
