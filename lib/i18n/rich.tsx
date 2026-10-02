import { Fragment, type ReactNode } from "react"

/** Renders "Let's build *something* great" with `wrap` around the starred part. */
export function rich(text: string, wrap: (chunk: string) => ReactNode) {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1 ? <Fragment key={i}>{wrap(part)}</Fragment> : part,
  )
}
