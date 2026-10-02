import { renderIcon } from "@/lib/seo/og-image"

// PNG favicon for browsers without SVG favicon support; matches app/icon0.svg.
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon() {
  return renderIcon(32)
}
