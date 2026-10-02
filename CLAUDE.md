# Portfolio — Daniela Silva

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3 · shadcn/ui · framer-motion. Deployed on Vercel (no `vercel.json`).

## Environment
- Node comes from Herd's nvm (`~/Library/Application Support/Herd/config/nvm`, default 22). Package manager: **pnpm** (pinned in `packageManager`). Don't use npm/yarn.
- Dev server: `.claude/launch.json` → `.claude/dev.sh` (loads nvm itself).

## Commands
- `pnpm dev` · `pnpm build` · `pnpm typecheck` · `pnpm lint`
- `next.config.mjs` ignores TS/ESLint errors during build — a green build is not proof; always run `pnpm typecheck` and `pnpm lint` too.

## Working rules
- Keep the current visual identity (editorial palette tokens in `app/globals.css`, fonts in `app/layout.tsx`). No arbitrary visual changes.
- Incremental changes; reuse existing components; no new dependencies without a clear need.
- Work in steps; end each step with: changes, files touched, issues found/fixed/pending, tests run, build result, validation checklist. Don't start the next step unprompted.
- Leave no TS, ESLint, build or browser-console errors.

## Skills / tools to consult
- `ponytail` — simplest change that works, but keep the per-step reports in full.
- `vercel-react-best-practices` — React/Next performance work.
- `web-design-guidelines` + `ui-ux-pro-max` — UI, accessibility, responsive review.
- `shadcn` + shadcn MCP — when touching `components/ui`.
- `context7-mcp` — current docs for Next.js, React, Tailwind, framer-motion before relying on memory.
- `playwright-cli` — browser checks (responsive, console errors).
- `/security-review` — before merging changes that touch `app/api`.
