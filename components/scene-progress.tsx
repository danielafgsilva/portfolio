"use client"

import { useEffect, useState } from "react"
import { m, useScroll, useSpring } from "framer-motion"
import { useI18n } from "./i18n-provider"
import { fmt } from "@/lib/i18n/format"
import { EASE_EDITORIAL } from "@/lib/motion"

// `key` → nav.chapters in the dictionary.
const CHAPTERS = [
  { num: "01", id: "home", key: "home" },
  { num: "02", id: "work", key: "work" },
  { num: "03", id: "story", key: "story" },
  { num: "04", id: "toolbox", key: "toolbox" },
  { num: "05", id: "off-duty", key: "offDuty" },
  { num: "06", id: "contact", key: "contact" },
] as const

export function SceneProgress() {
  const [active, setActive] = useState("home")
  const { t } = useI18n()
  const { scrollYProgress } = useScroll()
  // Spring-smoothed so the fill glides instead of stepping per wheel tick.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 40,
    mass: 0.3,
    restDelta: 0.0005,
  })
  // Position-based active detection via IntersectionObserver — one browser
  // callback per crossing rather than a full DOM sweep per scroll event.
  // Feels lighter under fast scroll and keeps the main thread free for the
  // spring animations elsewhere on the page.
  useEffect(() => {
    const intersecting = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            intersecting.set(id, entry.intersectionRatio)
          } else {
            intersecting.delete(id)
          }
        }
        // Pick the last chapter (in document order) that has any visibility
        // above the viewport-top threshold — the visible section that has
        // travelled the furthest into the pane.
        let current: string = CHAPTERS[0].id
        for (const c of CHAPTERS) {
          if (intersecting.has(c.id)) current = c.id
        }
        setActive(current)
      },
      {
        // rootMargin shifts the "trip line" to ~35% down the viewport, so
        // a section becomes active once its top passes that line — the
        // same rule the old scroll-listener used.
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.01],
      },
    )
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: y, behavior: "smooth" })
    // Update the URL without triggering a hashchange scroll jump
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <m.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6, ease: EASE_EDITORIAL }}
      className="fixed right-6 top-[calc(50%-2.5rem)] -translate-y-1/2 z-30 hidden lg:block"
      aria-label={t.nav.sections}
    >
      <div className="relative flex flex-col items-center gap-10 py-2">
        {/* Track */}
        <div
          className="absolute top-3 bottom-3 w-px bg-rule"
          aria-hidden="true"
        />
        {/* Progress fill — transform-only (scaleY), so no layout per frame. */}
        <m.div
          className="absolute top-3 bottom-3 w-px bg-cyan origin-top"
          style={{ scaleY: smoothProgress }}
          aria-hidden="true"
        />
        {CHAPTERS.map((c) => {
          const isActive = active === c.id
          const label = t.nav.chapters[c.key]
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={(e) => handleNavigate(e, c.id)}
              // p-2/-m-2: 24x24 hit area around the 8px dot, same layout.
              className="group relative z-10 flex items-center p-2 -m-2"
              aria-label={fmt(t.nav.chapter, { num: c.num, label })}
            >
              <span
                className={`block h-2 w-2 rounded-full border transition-all duration-300 ease-editorial ${
                  isActive
                    ? "bg-cyan border-cyan scale-125 shadow-[0_0_0_4px_hsl(var(--cyan)/0.15)]"
                    : "bg-background border-rule group-hover:border-cyan"
                }`}
              />
              <span
                className={`absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-cyan translate-x-0"
                    : "opacity-0 text-ink-subtle translate-x-1 group-hover:opacity-80 group-hover:translate-x-0"
                }`}
              >
                {c.num} · {label}
              </span>
            </a>
          )
        })}
      </div>
    </m.nav>
  )
}
