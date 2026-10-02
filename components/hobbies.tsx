"use client"

import { m } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Camera, Music, Dribbble, HeartHandshake } from "lucide-react"
import { Chapter, Accent } from "./chapter"
import { useI18n } from "./i18n-provider"
import { rich } from "@/lib/i18n/rich"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { EASE_EDITORIAL } from "@/lib/motion"

// Structural data only — name, kicker and detail live in the dictionary
// (offDuty.pursuits[id]).
type Pursuit = {
  id: keyof Dictionary["offDuty"]["pursuits"]
  index: string
  href: string
  icon: React.ReactNode
  featured?: boolean
}

const pursuits: Pursuit[] = [
  {
    id: "photography",
    index: "01",
    href: "https://danielapv.myportfolio.com/",
    icon: <Camera size={20} strokeWidth={1.5} />,
    featured: true,
  },
  {
    id: "football",
    index: "02",
    href: "https://www.zerozero.pt/jogador/daniela-silva/732215?epoca_id=154",
    icon: <Dribbble size={18} strokeWidth={1.5} />,
  },
  {
    id: "padel",
    index: "03",
    href: "https://app.playtomic.io/profile/user/5882533?utm_source=app_ios&utm_campaign=share",
    icon: <Dribbble size={18} strokeWidth={1.5} />,
  },
  {
    id: "music",
    index: "04",
    href: "https://www.instagram.com/danizmusic/",
    icon: <Music size={18} strokeWidth={1.5} />,
  },
]

export function Hobbies() {
  const [photography, ...rest] = pursuits
  const { t } = useI18n()
  const copy = t.offDuty

  return (
    <Chapter
      id="off-duty"
      number="05"
      eyebrow={copy.eyebrow}
      title={<>{rich(copy.title, (c) => <Accent>{c}</Accent>)}</>}
      intro={<p>{copy.intro}</p>}
    >
      {/* Volunteering block */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
        className="border border-rule rounded-md p-5 sm:p-6 mb-10 bg-paper-tint/50"
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border border-cyan/40 bg-cyan/10 text-cyan rounded-md">
            <HeartHandshake size={20} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="eyebrow text-cyan">{copy.volunteering.eyebrow}</p>
            <p className="mt-2 font-display font-medium text-xl sm:text-2xl text-foreground leading-snug text-balance">
              {copy.volunteering.text}
            </p>
            <p className="mt-2 mono text-xs text-ink-subtle">{copy.volunteering.location}</p>
          </div>
        </div>
      </m.div>

      {/* Featured photography */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
        className="mb-6"
      >
        <Link
          href={photography.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-rule rounded-md overflow-hidden transition-all duration-300 ease-editorial hover:border-cyan"
        >
          <div className="grid sm:grid-cols-5 gap-0">
            <div className="sm:col-span-2 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-rule bg-black min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
              <Image
                src="/images/photography-cover.jpg"
                alt={copy.photoAlt}
                fill
                className="object-contain transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
                sizes="(min-width: 1440px) 560px, (min-width: 640px) 40vw, 100vw"
              />
            </div>
            <div className="sm:col-span-3 p-5 sm:p-6 lg:p-8 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="chapter-number text-sm">{photography.index}</span>
                  <span className="eyebrow text-cyan">{copy.featured}</span>
                </div>
                <h3 className="mt-4 font-display font-semibold text-2xl sm:text-3xl text-foreground leading-tight group-hover:text-cyan transition-colors duration-300">
                  {copy.pursuits[photography.id].name}
                </h3>
                <p className="mt-2 mono text-xs text-ink-subtle">{copy.pursuits[photography.id].kicker}</p>
                <p className="mt-4 text-base text-ink-muted leading-relaxed text-pretty">
                  {copy.pursuits[photography.id].detail}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 mono text-sm text-foreground group-hover:text-cyan transition-colors duration-200">
                {copy.viewPortfolio}
                <ArrowUpRight size={16} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </m.div>

      {/* Rest of pursuits */}
      <ol className="grid gap-3 sm:grid-cols-3">
        {rest.map((p, i) => (
          <m.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between gap-5 border border-rule rounded-md p-5 transition-all duration-300 ease-editorial hover:border-cyan hover:bg-cyan/5"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="chapter-number text-xs">{p.index}</span>
                  <span className="text-ink-subtle group-hover:text-cyan transition-colors duration-200">
                    {p.icon}
                  </span>
                </div>
                <h3 className="mt-3 font-display font-semibold text-xl text-foreground leading-tight group-hover:text-cyan transition-colors duration-200">
                  {copy.pursuits[p.id].name}
                </h3>
                <p className="mt-1 mono text-xs text-ink-subtle">{copy.pursuits[p.id].kicker}</p>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">{copy.pursuits[p.id].detail}</p>
            </Link>
          </m.li>
        ))}
      </ol>
    </Chapter>
  )
}
