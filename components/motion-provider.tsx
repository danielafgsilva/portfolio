"use client"

import type React from "react"
import { MotionConfig } from "framer-motion"

/**
 * Wraps the app in a MotionConfig so every framer-motion animation on the
 * page respects the user's `prefers-reduced-motion` setting.
 *
 * `reducedMotion="user"` means:
 *   - If the OS/browser prefers reduced motion → transforms are skipped (jumps
 *     straight to the end state), opacity/color/size transitions still run.
 *   - Otherwise → everything animates as authored.
 *
 * CSS `@media (prefers-reduced-motion: reduce)` in globals.css only affects
 * CSS animations/transitions; framer-motion's JS-driven springs are opaque to
 * it. This wrapper is the equivalent switch on the JS side.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
