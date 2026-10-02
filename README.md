# Daniela Silva — Portfolio

Personal portfolio of Daniela Silva, front-end developer and design engineer based in Porto, Portugal.

**Live:** [daniela-silva.vercel.app](https://daniela-silva.vercel.app/) · English at `/`, European Portuguese at `/pt`.

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router) · React 19 · TypeScript
- [Tailwind CSS](https://tailwindcss.com/) · [Framer Motion](https://motion.dev/)
- `next/image` (AVIF/WebP) · `next/og` share images · Vercel

## Structure

- `app/[lang]/` — localized routes (home, `/cv`, 404, error); the middleware maps `/` → English and `/pt` → Portuguese
- `lib/i18n/` — locale config and typed dictionaries (`en.ts` is the source shape, `pt.ts` must match)
- `lib/content/` — structural data for projects and the chronology (copy lives in the dictionaries)
- `lib/seo/` — JSON-LD and share-image rendering
- `lib/motion.ts` — shared easing; animations use framer-motion via `LazyMotion` + `m` components
- `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/`, `app/manifest.ts` — discovery files
- `app/api/cv/pdf/` — CV PDF export (Puppeteer)

## Development

Requires Node 22 and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build
```
