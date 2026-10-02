/** @type {import('next').NextConfig} */

// Static media in /public isn't content-hashed, so cache for a week and
// revalidate in the background instead of `immutable` — replacing a file keeps
// its URL and must still reach visitors.
const MEDIA_CACHE = "public, max-age=604800, stale-while-revalidate=86400"

// Content-Security-Policy. Everything the site loads is same-origin (fonts are
// self-hosted by next/font, images go through /_next/image, no third-party
// scripts). 'unsafe-inline' scripts are required by Next's inline bootstrap and
// the JSON-LD blocks — nonces would force every page to render per request and
// lose static CDN delivery. Preview deployments allow the Vercel toolbar.
const isPreview = process.env.VERCEL_ENV === "preview"
const vercelLive = isPreview ? " https://vercel.live" : ""
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob:${isPreview ? " https://vercel.live https://vercel.com" : ""}`,
  "media-src 'self' blob:",
  `font-src 'self' data:${isPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ")

const SECURITY_HEADERS = [
  // Dev skips CSP: HMR needs eval and a websocket.
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: CSP }] : []),
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
]

const nextConfig = {
  poweredByHeader: false,
  // Explicit (also Next's default): no public browser source maps in production
  // builds. No error-monitoring tool is configured that would need them; dev
  // keeps its own source maps.
  productionBrowserSourceMaps: false,
  images: {
    // next/image serves AVIF/WebP at the width each device needs.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      ...["/timeline/:path*", "/images/:path*", "/videos/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
      })),
    ]
  },
  // Lets .claude/prod.sh build next to a running dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  devIndicators: false,
}

export default nextConfig
