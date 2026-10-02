"use client"

import type React from "react"
import { useRef } from "react"
import { m, useScroll, useSpring, useTransform } from "framer-motion"
// clsx, not cn(): these are conditional picks with no conflicting classes, and
// skipping tailwind-merge keeps ~19 KB out of the home page bundle.
import { clsx as cn } from "clsx"
import { EASE_EDITORIAL } from "@/lib/motion"

interface ChapterProps {
  id?: string
  number: string
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  children: React.ReactNode
  className?: string
  bleed?: boolean
  /** When true, sticky header sits on the right, content on the left (lg+ only). */
  reverse?: boolean
}

// Header reveal is driven by the <header> itself: the number row and title
// sit inside overflow-hidden masks, so an IntersectionObserver on those
// elements would see them as clipped and never fire.
const rise = {
  hidden: { y: 24, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_EDITORIAL } },
}
const maskRise = {
  hidden: { y: "105%" },
  shown: { y: "0%", transition: { duration: 0.9, delay: 0.12, ease: EASE_EDITORIAL } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: EASE_EDITORIAL } },
}

export function Chapter({
  id,
  number,
  eyebrow,
  title,
  intro,
  children,
  className,
  bleed,
  reverse,
}: ChapterProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Section reveal — subtle lift + fade as the chapter scrolls into view.
  // The raw scroll progress reacts to every wheel/trackpad micro-movement;
  // running it through a spring smooths jitter without adding perceivable
  // lag (high stiffness + high damping = fast catch-up, no wobble).
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  })
  const smoothSectionProgress = useSpring(sectionProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
    restDelta: 0.0005,
  })
  const sectionOpacity = useTransform(smoothSectionProgress, [0, 1], [0.4, 1])
  const sectionLift = useTransform(smoothSectionProgress, [0, 1], [24, 0])

  return (
    <m.section
      ref={sectionRef}
      id={id}
      style={{ opacity: sectionOpacity, y: sectionLift }}
      className={cn(
        "relative",
        bleed ? "py-14 sm:py-20 lg:py-28" : "py-12 sm:py-16 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          {/* Sticky on lg+, so the title and intro travel with the chapter. */}
          <m.header
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            className={cn(
              "lg:sticky lg:top-28 lg:self-start",
              reverse
                ? "lg:col-start-10 lg:col-span-3 lg:row-start-1"
                : "lg:col-span-4",
            )}
          >
            {/* Chapter number + eyebrow row */}
            <div className="overflow-hidden">
              <m.div variants={rise} className="flex items-baseline gap-3">
                <span className="chapter-number text-sm">{number}</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                <span className="eyebrow">{eyebrow}</span>
              </m.div>
            </div>

            {/* Title — cinematic mask reveal from below */}
            <div className="overflow-hidden mt-5 pb-1">
              <m.h2
                variants={maskRise}
                className="font-display font-semibold text-display-sm sm:text-display-md text-balance text-foreground leading-[0.95]"
              >
                {title}
              </m.h2>
            </div>

            {intro && (
              <m.div
                variants={fadeUp}
                className="mt-5 lg:mt-6 max-w-md text-base leading-relaxed text-ink-muted text-pretty"
              >
                {intro}
              </m.div>
            )}
          </m.header>
          <div
            className={cn(
              reverse
                ? "lg:col-start-4 lg:col-span-6 lg:row-start-1"
                : "lg:col-span-8",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </m.section>
  )
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan">{children}</span>
}
