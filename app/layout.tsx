import type React from "react"
import type { Metadata } from "next"
import "./globals.css" // Assuming globals.css is in the app directory

export const metadata: Metadata = {
  title: "Daniela Silva Portfolio", // Updated title
  description: "Personal portfolio for Daniela Silva, Junior Web Developer and UX/UI Designer.",, // Optional: Updated description
  // generator: 'v0.dev', // Optional: You can keep or remove this
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
