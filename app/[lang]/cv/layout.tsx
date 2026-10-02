"use client"

import { useEffect } from "react"

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const html = document.documentElement
    document.body.classList.add("cv-page")
    // CV is always light mode (both on-screen and in the exported PDF).
    const hadDark = html.classList.contains("dark")
    html.classList.remove("dark")
    return () => {
      document.body.classList.remove("cv-page")
      if (hadDark) html.classList.add("dark")
    }
  }, [])

  return <>{children}</>
}
