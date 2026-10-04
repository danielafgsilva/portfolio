import type { RefObject } from "react"
import { useScroll, useSpring, useTransform } from "framer-motion"

/**
 * Section reveal shared by the home chapters: a subtle lift + fade as the
 * section scrolls into view. Pass the result to an `m.section`'s `style`.
 * The spring smooths trackpad micro-movements (high stiffness + damping =
 * fast catch-up, no wobble).
 */
export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.2"] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4, restDelta: 0.0005 })
  const opacity = useTransform(progress, [0, 1], [0.4, 1])
  const y = useTransform(progress, [0, 1], [24, 0])
  return { opacity, y }
}
