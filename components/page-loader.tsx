"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { loaderSignal } from "@/lib/loader-signal"

const EASE = [0.22, 1, 0.36, 1] as const
const HOLD_MS = 3200

export function PageLoader() {
  const pathname = usePathname()
  const skip = pathname?.startsWith("/cv")
  const [visible, setVisible] = useState(!skip)

  // Skip on CV / covers etc.
  useEffect(() => {
    if (skip) {
      setVisible(false)
      loaderSignal.signal()
    }
  }, [skip])

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
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
          aria-hidden="true"
        >
          {/* Top hairline strip */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOLD_MS / 1000 - 0.4, ease: EASE }}
            className="origin-left h-[2px] bg-cyan w-full"
          />

          {/* Center intro sequence — horizontally and vertically centered on page */}
          <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-24">
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
              {/* Hi 👋 */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
                className="font-mono text-xs sm:text-sm text-cyan uppercase tracking-[0.18em] mb-6 sm:mb-8"
              >
                Hi <span aria-hidden="true">👋🏻</span>
              </motion.p>

              {/* I'm Daniela. — mask reveal */}
              <div className="overflow-hidden pb-2">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
                  className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-[-0.03em]"
                >
                  I&apos;m Daniela<span className="text-cyan">.</span>
                </motion.h1>
              </div>

              {/* Find out what I'm up to. — mask reveal, offset */}
              <div className="overflow-hidden pb-2 mt-1 sm:mt-2">
                <motion.h2
                  initial={{ y: "125%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
                  className="font-display font-bold text-xl sm:text-xl md:text-xl lg:text-xl text-ink-muted leading-[0.95] tracking-[-0.02em]"
                >
                  Find out what I'm up to <span aria-hidden="true">👀</span>
                </motion.h2>
              </div>

              {/* Role tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.9, ease: EASE }}
                className="mt-8 sm:mt-10 font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-ink-subtle"
              >
                Front-End Developer <span className="text-cyan">|</span> Design Engineer
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
