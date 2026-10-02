import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, LOCALE_COOKIE } from "@/lib/i18n/config"

// "/pt/..."  → served as is (Portuguese).
// "/en/..."  → 308 to the unprefixed URL, so English has a single canonical URL.
// "/..."     → English, rewritten to the internal "/en/..." route — unless the
//              visitor picked Portuguese in the switcher (cookie), then 307 to "/pt/...".
// No Accept-Language sniffing: English stays the default for everyone else.
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === "/pt" || pathname.startsWith("/pt/")) return NextResponse.next()

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    return NextResponse.redirect(url, 308)
  }

  if (request.cookies.get(LOCALE_COOKIE)?.value === "pt") {
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/" ? "/pt" : `/pt${pathname}`
    return NextResponse.redirect(url, 307)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
  url.search = search
  return NextResponse.rewrite(url)
}

export const config = {
  // Pages only: skip API routes, Next internals, metadata image routes
  // (icons, per-locale opengraph-image) and any file with an extension
  // (robots.txt, sitemap.xml, llms.txt, manifest.webmanifest, media).
  matcher: ["/((?!api|_next|icon|apple-icon|favicon.ico|.*opengraph-image|.*\\..*).*)"],
}
