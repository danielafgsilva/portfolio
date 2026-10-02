import Link from "next/link"

/** Visible breadcrumb trail; the last item is the current page. Mirrors the BreadcrumbList JSON-LD. */
export function Breadcrumbs({ label, items }: { label: string; items: { name: string; href: string }[] }) {
  return (
    <nav aria-label={label}>
      <ol className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-ink-subtle">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="inline-block py-1 -my-1 hover:text-cyan transition-colors duration-200">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
