"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Camera, Music, Dribbble, HeartHandshake } from "lucide-react"
import { Chapter, Accent } from "./chapter"

type Pursuit = {
  index: string
  name: string
  kicker: string
  detail: string
  href: string
  icon: React.ReactNode
  featured?: boolean
}

const pursuits: Pursuit[] = [
  {
    index: "01",
    name: "Photography",
    kicker: "visual practice · portfolio →",
    detail:
      "The eye I bring to interfaces comes from years behind a camera. Frames, light, the patience to wait for it.",
    href: "https://danielapv.myportfolio.com/",
    icon: <Camera size={20} strokeWidth={1.5} />,
    featured: true,
  },
  {
    index: "02",
    name: "Football",
    kicker: "4th national division",
    detail:
      "Competing at the national level — where I learned that teams beat lone stars, every time.",
    href: "https://www.zerozero.pt/jogador/daniela-silva/732215?epoca_id=154",
    icon: <Dribbble size={18} strokeWidth={1.5} />,
  },
  {
    index: "03",
    name: "Padel",
    kicker: "weekly ritual",
    detail:
      "The other racquet. Picked up between dev sprints — quick rallies, sharper reflexes.",
    href: "https://app.playtomic.io/profile/user/5882533?utm_source=app_ios&utm_campaign=share",
    icon: <Dribbble size={18} strokeWidth={1.5} />,
  },
  {
    index: "04",
    name: "Music",
    kicker: "@danizmusic",
    detail:
      "I sing. The other place I think about timing, tone, and what an audience actually needs to feel.",
    href: "https://www.instagram.com/danizmusic/",
    icon: <Music size={18} strokeWidth={1.5} />,
  },
]

export function Hobbies() {
  const [photography, ...rest] = pursuits

  return (
    <Chapter
      id="off-duty"
      number="05 //"
      eyebrow="Off Duty"
      title={
        <>
          What I do when I'm <Accent>not</Accent> coding.
        </>
      }
      intro={
        <p>
          The shorthand version of a longer truth: I'm more useful to a team when I'm a full
          person, not just a developer. Here's where the rest of me lives.
        </p>
      }
    >
      {/* Volunteering block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border border-rule rounded-md p-5 sm:p-6 mb-10 bg-paper-tint/50"
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border border-cyan/40 bg-cyan/10 text-cyan rounded-md">
            <HeartHandshake size={20} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="eyebrow text-cyan">// volunteering · a value, not a footnote</p>
            <p className="mt-2 font-display font-medium text-xl sm:text-2xl text-foreground leading-snug text-balance">
              Food collection with the Food Bank Against Hunger — organising and gathering
              donations so neighbours don't go hungry.
            </p>
            <p className="mt-2 mono text-xs text-ink-subtle">// Porto, Portugal</p>
          </div>
        </div>
      </motion.div>

      {/* Featured photography */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <Link
          href={photography.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-rule rounded-md overflow-hidden transition-all duration-300 ease-editorial hover:border-cyan"
        >
          <div className="grid sm:grid-cols-5 gap-0">
            <div className="sm:col-span-2 aspect-[4/3] sm:aspect-auto bg-ink relative overflow-hidden border-b sm:border-b-0 sm:border-r border-rule bg-black">
              <Image
                src="/images/photography-cover.png"
                alt="Daniela's photography portfolio cover — 'Hello, welcome to my corner of the world'"
                fill
                className="object-contain transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 40vw, 100vw"
              />
            </div>
            <div className="sm:col-span-3 p-5 sm:p-6 lg:p-8 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="chapter-number text-sm">{photography.index}</span>
                  <span className="eyebrow text-cyan">featured</span>
                </div>
                <h3 className="mt-4 font-display font-semibold text-2xl sm:text-3xl text-foreground leading-tight group-hover:text-cyan transition-colors duration-300">
                  {photography.name}
                </h3>
                <p className="mt-2 mono text-xs text-ink-subtle">// {photography.kicker}</p>
                <p className="mt-4 text-base text-ink-muted leading-relaxed text-pretty">
                  {photography.detail}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 mono text-sm text-foreground group-hover:text-cyan transition-colors duration-200">
                View portfolio
                <ArrowUpRight size={16} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Rest of pursuits */}
      <ol className="grid gap-3 sm:grid-cols-3">
        {rest.map((p, i) => (
          <motion.li
            key={p.name}
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
                  {p.name}
                </h3>
                <p className="mt-1 mono text-xs text-ink-subtle">// {p.kicker}</p>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">{p.detail}</p>
            </Link>
          </motion.li>
        ))}
      </ol>
    </Chapter>
  )
}
