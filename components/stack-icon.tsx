"use client"

import { useId, type CSSProperties } from "react"
import { stackIconSvgs, type StackIconName } from "@/lib/stack-icon-svgs"

// Same output as tech-stack-icons' <StackIcon>: ids are prefixed per instance
// so clip-paths/gradients from different icons on the page don't collide.
function scopeIds(svg: string, prefix: string) {
  let out = svg
  const ids = new Set(Array.from(svg.matchAll(/\bid="([^"]+)"/g), (m) => m[1]))
  for (const id of ids) {
    const scoped = `${prefix}-${id}`
    out = out
      .replaceAll(`id="${id}"`, `id="${scoped}"`)
      .replaceAll(`url(#${id})`, `url(#${scoped})`)
      .replaceAll(`href="#${id}"`, `href="#${scoped}"`)
  }
  return out
}

export function StackIcon({
  name,
  variant = "light",
  className,
  style,
}: {
  name: StackIconName
  variant?: "light" | "dark"
  className?: string
  style?: CSSProperties
}) {
  const id = useId()
  const html = scopeIds(stackIconSvgs[name][variant], id).replace(
    /<svg([^>]*)>/,
    '<svg$1 style="width: 100%; height: 100%; display: block;">',
  )
  return (
    <span
      className={className}
      style={{ display: "inline-block", lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
