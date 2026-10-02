"use client"

import type React from "react"
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

/**
 * App-wide animation setup.
 *
 * LazyMotion + `m` components (instead of `motion`) ship only the features the
 * site uses — animations, variants, exit, hover/tap/focus and inView — and
 * leave out layout/projection and drag. `strict` throws if a full `motion`
 * component sneaks back in, which would pull those features in again.
 *
 * MotionConfig `reducedMotion="user"` makes every framer-motion animation
 * respect `prefers-reduced-motion` (transforms jump to their end state;
 * opacity still fades). The CSS media query in globals.css only covers CSS
 * animations/transitions; this is the equivalent switch on the JS side.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
