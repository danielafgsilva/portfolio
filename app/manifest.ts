import type { MetadataRoute } from "next"

// Colours match the dark editorial palette (--paper / --cyan in globals.css).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daniela Silva — Portfolio",
    short_name: "Daniela",
    description: "Portfolio of Daniela Silva, front-end developer and design engineer based in Porto, Portugal.",
    start_url: "/",
    display: "browser",
    background_color: "#080C16",
    theme_color: "#080C16",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  }
}
