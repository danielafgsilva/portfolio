"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const
const SCROLL_THRESHOLD = 200

/**
 * Floating "back to top" pill.
 * Shows an arrow only, expands to reveal the label on hover. Hides itself
 * once the footer becomes visible so it doesn't overlap with it.
 */
export function BackToTop() {
  const [pastThreshold, setPastThreshold] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  // Reveal after the user has scrolled a bit.
  useEffect(() => {
    const onScroll = () =>
      setPastThreshold(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Watch the footer so we can hide the pill when the user reaches it.
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) {
      setFooterVisible(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.01 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const shouldShow = pastThreshold && !footerVisible

  return (
    <motion.button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : 12,
      }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ pointerEvents: shouldShow ? "auto" : "none" }}
      aria-hidden={!shouldShow}
      className="group fixed bottom-6 right-6 z-40 flex flex-row-reverse items-center gap-2 h-10 rounded-full border border-rule bg-background/80 backdrop-blur-md px-3 mono text-sm text-foreground hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"
      aria-label="Back to top"
    >
      <ArrowUp
        size={14}
        strokeWidth={1.75}
        className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
      />
      <span className="max-w-0 opacity-0 whitespace-nowrap overflow-hidden group-hover:max-w-[8rem] group-hover:opacity-100 transition-[max-width,opacity] duration-300 ease-editorial">
        back to top
      </span>
    </motion.button>
  )
}
