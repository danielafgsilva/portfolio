"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Award } from "lucide-react"
import { Chapter, Accent } from "./chapter"

type Project = {
  index: string
  title: string
  year: string
  role: string
  description: string
  image: string
  tech: string[]
  status?: "live" | "in-progress"
  liveUrl?: string
  awards?: { title: string; issuer: string }[]
}

const projects: Project[] = [
  {
    index: "01",
    title: "Twovest",
    year: "2024",
    role: "UI/UX Design & Front-End Development",
    description:
      "A second-hand fashion platform built to make sustainable consumption the obvious choice. Designed the full experience in Figma, then shipped the interface in Next.js with Supabase as the backbone. Won two awards for design and execution.",
    image: "/images/twovest-cover.png",
    tech: ["Next.js", "Tailwind CSS", "Redux Toolkit", "Supabase", "Figma"],
    status: "live",
    liveUrl: "https://twovest.com/",
    awards: [
      { title: "Academy Award · Media Play", issuer: "University of Aveiro, 2024" },
      { title: "Best Project 2023/2024", issuer: "Mindera × Master's Programme" },
    ],
  },
  {
    index: "02",
    title: "Gomes Rego & Associados",
    year: "2024",
    role: "Web Design & Development",
    description:
      "A professional site for a law firm needing to signal credibility online. Designed for clarity — clean information architecture, considered typography, responsive across every breakpoint, and clear calls-to-action that translated into measurable inquiry lift.",
    image: "/images/gomes-rego-cover.png",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    status: "live",
    liveUrl: "https://grasroc.pt/",
  },
  {
    index: "03",
    title: "Dogwarts",
    year: "2025",
    role: "Full-Stack Development",
    description:
      "A canine-care marketplace connecting dog owners with service providers. Role-based UI built with Next.js and TypeScript, with Sanity CMS powering editorial content. Currently in active development.",
    image: "/images/dogwarts-cover.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    status: "in-progress",
  },
]

export function Projects() {
  return (
    <Chapter
      id="work"
      number="02 //"
      eyebrow="Selected Work"
      title={
        <>
          Work I'm <Accent>proud</Accent> of.
        </>
      }
      intro={
        <p>
          Three projects spanning sustainable fashion, professional services, and a marketplace
          in progress — each one a chance to think about real people on the other side of the screen.
        </p>
      }
    >
      <div className="space-y-20 lg:space-y-28">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            {/* Header line */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="chapter-number text-sm">{project.index}</span>
              <span className="h-px flex-1 bg-rule" aria-hidden="true" />
              <span className="eyebrow">{project.year}</span>
            </div>

            {/* Browser-frame mockup */}
            <div className="overflow-hidden rounded-md border border-rule bg-paper shadow-sm">
              {/* Chrome */}
              <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 bg-paper-tint border-b border-rule">
                <div className="flex gap-1.5 shrink-0" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 min-w-0 flex justify-center">
                  <span className="mono text-[11px] sm:text-xs text-ink-subtle px-2.5 py-1 bg-paper rounded border border-rule max-w-full truncate">
                    {project.status === "live" && project.liveUrl
                      ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                      : `~/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} (dev)`}
                  </span>
                </div>
                <div className="shrink-0 flex items-center">
                  {project.status === "live" && (
                    <span className="inline-flex items-center gap-1.5 mono text-[11px] sm:text-xs text-foreground">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                      </span>
                      <span className="hidden sm:inline">live</span>
                    </span>
                  )}
                  {project.status === "in-progress" && (
                    <span className="inline-flex items-center gap-1.5 mono text-[11px] sm:text-xs text-foreground">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                      </span>
                      <span className="hidden sm:inline">in progress</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative aspect-[5/3] bg-paper-tint overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} project cover`}
                  fill
                  priority={i === 0}
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
            </div>

            {/* Caption block */}
            <div className="mt-6 grid gap-x-6 gap-y-5 sm:gap-x-8 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-foreground leading-tight">
                  {project.title}
                </h3>
                <p className="mt-2 mono text-sm text-cyan">{project.role}</p>
                <p className="mt-4 text-base leading-relaxed text-ink-muted text-pretty">
                  {project.description}
                </p>

                {project.awards && (
                  <ul className="mt-5 space-y-2 border-l-2 border-cyan pl-4">
                    {project.awards.map((a) => (
                      <li key={a.title} className="text-sm flex items-baseline gap-2">
                        <Award size={13} className="shrink-0 text-cyan translate-y-0.5" strokeWidth={1.75} />
                        <div>
                          <span className="font-medium text-foreground">{a.title}</span>
                          <span className="text-ink-subtle"> — {a.issuer}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="sm:col-span-5 sm:border-l sm:border-rule sm:pl-6">
                <p className="eyebrow mb-3">// stack</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li key={t} className="badge">
                      {t}
                    </li>
                  ))}
                </ul>

                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 mono text-sm text-foreground border border-rule rounded-md px-3 py-2 hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"
                  >
                    Visit site
                    <ArrowUpRight size={14} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Chapter>
  )
}
