/** @type {import('next').NextConfig} */

// Static media in /public isn't content-hashed, so cache for a week and
// revalidate in the background instead of `immutable` — replacing a file keeps
// its URL and must still reach visitors.
const MEDIA_CACHE = "public, max-age=604800, stale-while-revalidate=86400"

const nextConfig = {
  images: {
    // next/image serves AVIF/WebP at the width each device needs.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
  },
  async headers() {
    return ["/timeline/:path*", "/images/:path*", "/videos/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
    }))
  },
  // Lets .claude/prod.sh build next to a running dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  devIndicators: false,
}

export default nextConfig
