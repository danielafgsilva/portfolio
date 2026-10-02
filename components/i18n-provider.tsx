"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"

const I18nContext = createContext<{ locale: Locale; t: Dictionary } | null>(null)

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: ReactNode
}) {
  return <I18nContext.Provider value={{ locale, t: dictionary }}>{children}</I18nContext.Provider>
}

/** `t` is the active locale's dictionary; `locale` is "en" | "pt". */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>")
  return ctx
}
