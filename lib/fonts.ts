import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"

// Shared by app/[lang]/layout.tsx and app/global-error.tsx (which replaces the
// layout when it crashes) so both render with the same type system.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

/** Class list for <html>: the three font CSS variables. */
export const fontVariables = `${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`
