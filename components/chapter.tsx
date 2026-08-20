"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
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
  /** When true, sticky header sits on the right, content on the left (lg+ only). */
  reverse?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

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
  const introRef = useRef<HTMLDivElement | null>(null)
  const [ranges, setRanges] = useState<[number, number]>([0, 0])

  // Section reveal — subtle lift + fade as the chapter scrolls into view.
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  })
  const sectionOpacity = useTransform(sectionProgress, [0, 1], [0.4, 1])
  const sectionLift = useTransform(sectionProgress, [0, 1], [24, 0])

  // Intro travel — linear descent. Aligned with the section top when the
  // section enters the viewport; aligned with the section bottom when it exits.
  const { scrollYProgress: descentProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const rawIntroY = useTransform(descentProgress, [0, 1], ranges)
  // Spring-smoothed for a gentler descent — a bit of easing without lag.
  const introY = useSpring(rawIntroY, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  })

  useEffect(() => {
    if (!intro) return
    const update = () => {
      if (!sectionRef.current || !introRef.current) return
      const sectionH = sectionRef.current.offsetHeight
      const vh = window.innerHeight
      const introH = introRef.current.offsetHeight
      const topPx = 96
      const bottomPx = Math.max(topPx, sectionH - 96 - introH)
      setRanges(sectionH >= vh ? [topPx, bottomPx] : [bottomPx, topPx])
    }
    update()
    const ro = new ResizeObserver(update)
    if (sectionRef.current) ro.observe(sectionRef.current)
    if (introRef.current) ro.observe(introRef.current)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [intro])

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{ opacity: sectionOpacity, y: sectionLift }}
      className={cn(
        "relative",
        bleed ? "py-14 sm:py-20 lg:py-28" : "py-12 sm:py-16 lg:py-24",
        className,
      )}
    >
      {/* Desktop travelling intro — always in the left column, slides linearly
          from section top to section bottom as the user scrolls the chapter. */}
      {intro && (
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 h-full">
            <div className="grid grid-cols-12 gap-x-10 h-full">
              <motion.div
                ref={introRef}
                style={{ y: introY }}
                className={cn(
                  "self-start max-w-md text-base leading-relaxed text-ink-muted text-pretty pointer-events-auto",
                  reverse ? "col-start-10 col-span-3" : "col-start-1 col-span-4",
                )}
              >
                {intro}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "mx-auto",
          bleed ? "max-w-[1440px] px-6 sm:px-10 lg:px-16" : "container",
        )}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <header
            className={cn(
              "lg:sticky lg:top-28 lg:self-start",
              reverse
                ? "lg:col-start-10 lg:col-span-3 lg:row-start-1"
                : "lg:col-span-4",
            )}
          >
            {/* Chapter number + eyebrow row */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-baseline gap-3"
              >
                <span className="chapter-number text-sm">{number}</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                <span className="eyebrow">{eyebrow}</span>
              </motion.div>
            </div>

            {/* Title — cinematic mask reveal from below */}
            <div className="overflow-hidden mt-5 pb-1">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
                className="font-display font-semibold text-display-sm sm:text-display-md text-balance text-foreground leading-[0.95]"
              >
                {title}
              </motion.h2>
            </div>

            {/* Mobile intro — under the title on smaller viewports */}
            {intro && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="lg:hidden mt-5 max-w-md text-base leading-relaxed text-ink-muted text-pretty"
              >
                {intro}
              </motion.div>
            )}
          </header>
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
    </motion.section>
  )
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan">{children}</span>
}
