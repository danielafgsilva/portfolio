"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { m, AnimatePresence } from "framer-motion"
import { loaderSignal } from "@/lib/loader-signal"
import { useI18n } from "@/components/i18n-provider"
import { SKIP_INTRO_KEY } from "@/components/language-switcher"
import { stripLocale } from "@/lib/i18n/config"
import { EASE_EDITORIAL } from "@/lib/motion"

const HOLD_MS = 3200

export function PageLoader() {
  const pathname = usePathname()
  const { t } = useI18n()
  // The intro belongs to the home page only (not the CV, 404s, etc.).
  const skip = stripLocale(pathname || "/") !== "/"
  const [visible, setVisible] = useState(!skip)
  // Coming from the language switcher: the visitor already saw the intro.
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    if (skip) {
      setVisible(false)
      loaderSignal.signal()
    }
  }, [skip])

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SKIP_INTRO_KEY)) {
        sessionStorage.removeItem(SKIP_INTRO_KEY)
        setInstant(true)
        setVisible(false)
      }
    } catch {}
  }, [])

  // Play the intro, then dismiss
  useEffect(() => {
    if (skip) return
    const t = setTimeout(() => setVisible(false), HOLD_MS)
    return () => clearTimeout(t)
  }, [skip])

  // Signal hero once we start exiting
  useEffect(() => {
    if (!visible) loaderSignal.signal()
  }, [visible])

  return (
    // `custom` reaches the exiting child, so the switcher's skip is instant
    // (an exiting element keeps the props it had before being removed).
    <AnimatePresence custom={instant}>
      {visible && (
        <m.div
          initial={{ opacity: 1 }}
          custom={instant}
          variants={{ exit: (skip: boolean) => ({ opacity: 0, transition: { duration: skip ? 0 : 0.7, ease: EASE_EDITORIAL } }) }}
          exit="exit"
          className="fixed inset-0 z-[100] bg-background flex flex-col"
          aria-hidden="true"
        >
          {/* Top hairline strip */}
          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOLD_MS / 1000 - 0.4, ease: EASE_EDITORIAL }}
            className="origin-left h-[2px] bg-cyan w-full"
          />

          {/* Center intro sequence — horizontally and vertically centered on page */}
          <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-24">
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
              {/* Hi 👋 */}
              <m.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE_EDITORIAL }}
                className="font-mono text-xs sm:text-sm text-cyan uppercase tracking-[0.18em] mb-6 sm:mb-8"
              >
                {t.loader.hi} <span aria-hidden="true">👋🏻</span>
              </m.p>

              {/* I'm Daniela. — mask reveal */}
              <div className="overflow-hidden pb-2">
                <m.p
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.65, ease: EASE_EDITORIAL }}
                  className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-[-0.03em]"
                >
                  {t.loader.name}<span className="text-cyan">.</span>
                </m.p>
              </div>

              {/* Find out what I'm up to. — mask reveal, offset */}
              <div className="overflow-hidden pb-2 mt-1 sm:mt-2">
                <m.p
                  initial={{ y: "125%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 1.15, ease: EASE_EDITORIAL }}
                  className="font-display font-bold text-xl sm:text-xl md:text-xl lg:text-xl text-ink-muted leading-[0.95] tracking-[-0.02em]"
                >
                  {t.loader.findOut} <span aria-hidden="true">👀</span>
                </m.p>
              </div>

              {/* Role tagline */}
              <m.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.9, ease: EASE_EDITORIAL }}
                className="mt-8 sm:mt-10 font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-ink-subtle"
              >
                {t.loader.roles[0]} <span className="text-cyan">|</span> {t.loader.roles[1]}
              </m.p>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
