"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { localePath } from "@/lib/i18n/config"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { locale } = useI18n()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-editorial ${
        isScrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="relative flex items-center justify-center h-14 sm:h-16 lg:h-20">
          <Link href={localePath(locale)} className="flex items-baseline gap-2">
            <span className="font-display font-semibold text-base sm:text-lg lg:text-xl text-foreground tracking-tight">
              Daniela<span className="text-cyan">.</span>
            </span>
          </Link>
          {/* Absolutely positioned so the wordmark stays optically centred. */}
          <LanguageSwitcher className="absolute right-0 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </motion.header>
  )
}
