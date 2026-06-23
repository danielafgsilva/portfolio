"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChapterProps {
  id?: string
  number: string
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  children: React.ReactNode
  className?: string
  bleed?: boolean
}

export function Chapter({ id, number, eyebrow, title, intro, children, className, bleed }: ChapterProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        bleed ? "py-20 sm:py-28 lg:py-36" : "py-16 sm:py-24 lg:py-32",
        className,
      )}
    >
      <div className={cn("mx-auto", bleed ? "max-w-[1440px] px-6 sm:px-10 lg:px-16" : "container")}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex items-baseline gap-3">
              <span className="chapter-number text-sm">{number}</span>
              <div className="h-px flex-1 bg-rule" aria-hidden="true" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h2 className="font-display font-semibold text-display-sm sm:text-display-md mt-5 text-balance text-foreground leading-[0.95]">
              {title}
            </h2>
            {intro && (
              <div className="mt-5 text-base leading-relaxed text-ink-muted text-pretty max-w-md">
                {intro}
              </div>
            )}
          </motion.header>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan">{children}</span>
}
