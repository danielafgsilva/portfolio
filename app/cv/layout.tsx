import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV - Daniela Silva",
  description: "Curriculum Vitae for Daniela Silva, Junior Web Developer and UX/UI Designer.",
}

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="cv-page">{children}</body>
    </html>
  )
}
