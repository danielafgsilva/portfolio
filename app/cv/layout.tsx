"use client"

import { useEffect } from "react"

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    document.body.classList.add("cv-page")
    return () => {
      document.body.classList.remove("cv-page")
    }
  }, [])

  return <>{children}</>
}
