"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { loaderSignal } from "@/lib/loader-signal"

const VISIBLE_MS = 1600

export function PageLoader() {
  const pathname = usePathname()
  const skip = pathname?.startsWith("/cv")
  const [loading, setLoading] = useState(!skip)
  const [pct, setPct] = useState(0)

  // Skip-immediate path
  useEffect(() => {
    if (skip) {
      setLoading(false)
      loaderSignal.signal()
    }
  }, [skip])

  // Loader timer
  useEffect(() => {
    if (skip) return
    const timer = setTimeout(() => setLoading(false), VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [skip])

  // Percentage counter — uses RAF for smoothness, no Date.now (uses performance.now)
  useEffect(() => {
    if (skip || !loading) return
    let raf = 0
    const start = performance.now()
    const duration = VISIBLE_MS - 200
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setPct(Math.round(t * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [loading, skip])

  // Signal others as soon as we start exiting (so hero can begin while we fade out)
  useEffect(() => {
    if (!loading) loaderSignal.signal()
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
          aria-hidden="true"
        >
          {/* Top progress bar — drawing left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: VISIBLE_MS / 1000 - 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left h-[2px] bg-cyan w-full"
          />

          {/* Top mono strip */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute top-8 left-8 right-8 flex items-center justify-between"
          >
            <span className="eyebrow">// loading portfolio</span>
            <span className="eyebrow hidden sm:inline">v2026.06</span>
          </motion.div>

          {/* Center mark */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="relative flex flex-col items-start gap-5">
              {/* D + period */}
              <div className="flex items-end font-display font-bold text-8xl sm:text-9xl text-foreground leading-none tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  D
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: -40, scale: 0.4 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                  className="text-cyan inline-block"
                >
                  .
                </motion.span>
              </div>

              {/* Cyan accent line below */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="origin-left h-[3px] w-24 sm:w-32 bg-cyan rounded-full"
              />

              {/* Mono percentage counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.95 }}
                className="flex items-center gap-3 mono text-sm text-ink-subtle"
              >
                <span className="text-cyan tabular-nums w-12">{String(pct).padStart(3, "0")}%</span>
                <span className="text-ink-subtle">·</span>
                <span>{pct < 100 ? "compiling" : "ready"}</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom mono strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute bottom-8 left-8 right-8 flex items-center justify-between"
          >
            <span className="eyebrow">build · 01</span>
            <span className="eyebrow hidden sm:inline">daniela silva</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
