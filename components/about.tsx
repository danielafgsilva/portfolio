"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Chapter, Accent } from "./chapter"

type TimelineEntry = {
  type: "work" | "study"
  year: string
  title: string
  org: string
  location?: string
  detail: string
}

const timeline: TimelineEntry[] = [
  // Work — reverse chronological
  {
    type: "work",
    year: "2025 — now",
    title: "Full-Stack Developer · Internship",
    org: "Dynamikfloat",
    location: "Portugal",
    detail:
      "Shipping features end-to-end on a Laravel backend (REST APIs, business logic, DBeaver for data work) with a Vue.js front-end. First taste of full-stack workflows in a real team.",
  },
  {
    type: "work",
    year: "2024",
    title: "Web Platforms · Internship",
    org: "Bliss Applications",
    location: "Portugal",
    detail:
      "Built the company site and several client projects in WordPress, PHP, JavaScript, and Sass. Learned to make design and delivery hold hands under deadline.",
  },
  {
    type: "work",
    year: "2023 — 2024",
    title: "Research · Immersive Web",
    org: "Digital Media & Interaction Research Centre",
    location: "Aveiro",
    detail:
      'Worked on "O Metaverso na Educação" and shipped StudySphere — an immersive learning platform presented at Students@DigiMedia#03. Where I learned to demo, not just build.',
  },
  // Study — reverse chronological
  {
    type: "study",
    year: "2023 — 2025",
    title: "Master's, Web Communication & Technologies",
    org: "Universidade de Aveiro",
    detail:
      "Focused on immersive environments, interaction design, and the human side of the web. Where Twovest grew from a brief into an award-winning platform.",
  },
  {
    type: "study",
    year: "2020 — 2023",
    title: "Licentiate, Audiovisual & Communication Technology",
    org: "Escola Superior de Media Artes e Design",
    detail:
      "Where the eye for composition started — design, video, photography, sound. The foundation underneath every interface I build now.",
  },
]

const traits = ["Proactive", "Empathic", "Collaborative", "Innovative"]

export function About() {
  return (
    <Chapter
      id="story"
      number="03 //"
      eyebrow="The Story"
      title={
        <>
          A developer with a <Accent>designer's</Accent> eye.
        </>
      }
      intro={
        <p>
          Two degrees, three internships, one award-winning project. The short version of how
          I got here — and why I care about the things I care about.
        </p>
      }
    >
      {/* Lead paragraph + portrait */}
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <div className="relative aspect-square w-full max-w-xs mx-auto md:mx-0 overflow-hidden rounded-full bg-paper-tint border border-rule">
            <Image
              src="/images/daniela-silva.jpg"
              alt="Daniela Silva"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 320px, 320px"
            />
          </div>
        </motion.div>

        <div className="md:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-ink-muted text-pretty">
          <p>
            Hi — I'm a junior full-stack developer with a strong front-end orientation. I build
            web experiences that pay attention to the person on the other side of the screen,
            and I lean on design literacy to do it well.
          </p>
          <p>
            My academic background runs through audiovisual technology and web communication —
            so I came into code already thinking in compositions, hierarchies, and rhythm. My
            internships have stretched that into shipping real software in real teams.
          </p>

          <ul className="flex flex-wrap gap-2 pt-4">
            {traits.map((t) => (
              <li key={t} className="badge">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pull-quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="my-16 lg:my-24 border-l-2 border-cyan pl-6 md:pl-8"
      >
        <p className="font-display font-medium text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground text-balance">
          "I want to bridge technology and user experience — creating digital solutions that
          feel as considered as they look."
        </p>
      </motion.blockquote>

      {/* Timeline */}
      <div>
        <div className="flex items-baseline gap-3 mb-8">
          <span className="eyebrow">// chronology</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="eyebrow">{timeline.length} entries</span>
        </div>

        <ol className="space-y-8">
          {timeline.map((entry, i) => (
            <motion.li
              key={entry.title + entry.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid grid-cols-12 gap-x-4 sm:gap-x-6 pb-8 border-b border-rule last:border-b-0"
            >
              <div className="col-span-12 sm:col-span-3">
                <span className={`badge ${entry.type === "work" ? "badge-accent" : ""}`}>
                  {entry.type === "work" ? "work" : "study"}
                </span>
                <p className="mt-3 mono text-foreground">{entry.year}</p>
              </div>
              <div className="col-span-12 sm:col-span-9 mt-3 sm:mt-0">
                <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground leading-tight">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  {entry.org}
                  {entry.location && <span className="text-ink-subtle"> · {entry.location}</span>}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty max-w-2xl">
                  {entry.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Chapter>
  )
}
