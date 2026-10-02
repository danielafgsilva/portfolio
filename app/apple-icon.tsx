import { renderIcon } from "@/lib/seo/og-image"

// iOS home-screen icon (Safari doesn't use SVG favicons); matches app/icon.svg.
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default async function AppleIcon() {
  return renderIcon(180)
}
