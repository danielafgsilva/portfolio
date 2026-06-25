"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { loaderSignal } from "@/lib/loader-signal"

const meta = [
  { label: "ROLE", value: "Front-End Developer" },
  { label: "BASED", value: "Porto, Portugal" },
  { label: "STATUS", value: "Open to opportunities", live: true },
  { label: "STACK", value: "Next.js · React · Vue · Laravel" },
]

const REPLAY_INTERVAL_MS = 60_000

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [ready, setReady] = useState(false)

  // Wait for loader to finish before starting typewriter
  useEffect(() => {
    if (loaderSignal.isDone()) {
      setReady(true)
      return
    }
    const unsubscribe = loaderSignal.subscribe(() => setReady(true))
    return unsubscribe
  }, [])

  // Re-animate every 60s while in view (only after loader done)
  useEffect(() => {
    if (!ready) return
    const el = sectionRef.current
    if (!el) return

    let interval: ReturnType<typeof setInterval> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (interval === null) {
            interval = setInterval(() => {
              setAnimKey((k) => k + 1)
            }, REPLAY_INTERVAL_MS)
          }
        } else {
          if (interval !== null) {
            clearInterval(interval)
            interval = null
          }
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (interval !== null) clearInterval(interval)
    }
  }, [ready])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col bg-background overflow-hidden"
    >
      {/* Top meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-20 left-0 right-0 z-10 hidden sm:block"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between gap-6">
            <span className="eyebrow">portfolio</span>
          </div>
        </div>
      </motion.div>

      {/* Main mark */}
      <div className="flex-1 flex items-center pt-32 sm:pt-40">
        <div className="mx-auto max-w-[1440px] w-full px-6 sm:px-10 lg:px-16 pb-20">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10 items-end">
            <div className="lg:col-span-12">
              <motion.h1
                key={`${animKey}-${ready ? "go" : "wait"}`}
                className="font-display font-bold text-display-xl text-foreground leading-[0.88] tracking-[-0.045em]"
                aria-label="Daniela."
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: { delayChildren: 0.15, staggerChildren: 0.085 },
                  },
                }}
              >
                <span className="inline-flex items-baseline">
                  {Array.from("Daniela").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      transition={{ duration: 0.01 }}
                      className="inline-block"
                      aria-hidden="true"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.01 }}
                    className="inline-block text-cyan"
                    aria-hidden="true"
                  >
                    .
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: [0, 1, 1, 0, 0, 1, 1, 0] } : { opacity: 0 }}
                    transition={{
                      delay: 0.15 + "Daniela".length * 0.085 + 0.18,
                      duration: 1.8,
                      times: [0, 0.04, 0.28, 0.30, 0.52, 0.54, 0.76, 1],
                      ease: "linear",
                    }}
                    className="ml-3 sm:ml-4 inline-block h-[1em] w-[0.035em] bg-cyan"
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-ink-muted leading-snug text-balance max-w-2xl">
                I build <span className="text-foreground font-medium">user-centered</span> web
                experiences, bridging the gap between technology and the people using it.
              </p>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="lg:col-span-4 lg:col-start-9 grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-6 w-full"
            >
              {meta.map((m) => (
                <div key={m.label} className="border-t border-rule pt-3">
                  <dt className="eyebrow">{m.label}</dt>
                  <dd className="mt-1.5 mono text-foreground flex items-center gap-2">
                    {m.live && (
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                      </span>
                    )}
                    <span className="text-foreground">{m.value}</span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  )
}
