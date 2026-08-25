"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const CHAPTERS = [
  { num: "01", id: "home", label: "Index" },
  { num: "02", id: "work", label: "Work" },
  { num: "03", id: "story", label: "Story" },
  { num: "04", id: "toolbox", label: "Toolbox" },
  { num: "05", id: "off-duty", label: "Off Duty" },
  { num: "06", id: "contact", label: "Contact" },
]

export function SceneProgress() {
  const [active, setActive] = useState("home")
  const { scrollYProgress } = useScroll()
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Position-based active detection. Works for any section height (including
  // the very tall sticky-scroll story section) by picking the last chapter
  // whose top has crossed a threshold near the top of the viewport.
  useEffect(() => {
    const compute = () => {
      const threshold = window.innerHeight * 0.35
      let current = CHAPTERS[0].id
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top - threshold <= 0 && rect.bottom > threshold) {
          current = c.id
        }
      }
      setActive(current)
    }
    compute()
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
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
    // Update history without triggering a hashchange scroll jump
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${id}`)
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-6 top-[calc(50%-2.5rem)] -translate-y-1/2 z-30 hidden lg:block"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col items-center gap-10 py-2">
        {/* Track */}
        <div
          className="absolute top-3 bottom-3 w-px bg-rule"
          aria-hidden="true"
        />
        {/* Progress fill */}
        <motion.div
          className="absolute top-3 w-px bg-cyan origin-top"
          style={{ height: fillHeight, maxHeight: "calc(100% - 24px)" }}
          aria-hidden="true"
        />
        {CHAPTERS.map((c) => {
          const isActive = active === c.id
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={(e) => handleNavigate(e, c.id)}
              className="group relative z-10 flex items-center"
              aria-label={`Chapter ${c.num} — ${c.label}`}
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
                {c.num} · {c.label}
              </span>
            </a>
          )
        })}
      </div>
    </motion.aside>
  )
}
