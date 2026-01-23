"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center text-center bg-background relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-foreground font-harmony uppercase">DANIELA SILVA</h1>
        <p className="mt-4 text-lg md:text-2xl text-muted-foreground">Junior Full-Stack Developer | Front-End Oriented</p>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
          Crafting meaningful, user-centered web experiences with passion and precision.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10"
      >
        <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
        </Link>
      </motion.div>

      {/* Background decorative elements - using new brand colors */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-soft-cyan rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-brand-pale-cyan rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-brand-strong-blue rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}
