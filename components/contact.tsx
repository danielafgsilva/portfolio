"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Download, Mail, Github, Linkedin } from "lucide-react"
import { Accent } from "./chapter"

const EMAIL = "danif.gsilva2000@gmail.com"

const channels = [
  {
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}?subject=Hello%20Daniela`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    handle: "/in/danielafgsilva",
    href: "https://linkedin.com/in/danielafgsilva",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    handle: "@danielafgsilva",
    href: "https://github.com/danielafgsilva",
    icon: Github,
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header line */}
          <div className="flex items-baseline gap-3 mb-10">
            <span className="chapter-number text-sm">06 //</span>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
            <span className="eyebrow">Get in Touch</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mono text-xs text-cyan mb-6">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                </span>
                Currently open to opportunities
              </div>

              <h2 className="font-display font-semibold text-display-sm sm:text-display-md text-foreground leading-[0.95] tracking-[-0.035em] text-balance">
                Let's build <Accent>something</Accent> worth shipping.
              </h2>

              <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">
                Looking for a junior front-end or full-stack developer who cares about the craft?
                I'd love to hear about the role, the team, and what you're building.
              </p>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-8">
              <p className="eyebrow mb-4">// download</p>
              <Link
                href="/cv"
                target="_blank"
                className="group inline-flex w-full items-center justify-between gap-3 border border-foreground rounded-md px-5 py-4 mono text-sm text-foreground transition-colors duration-200 ease-editorial hover:bg-foreground hover:text-paper"
              >
                <span className="flex items-center gap-3">
                  <Download size={16} strokeWidth={1.75} />
                  View / Download CV
                </span>
                <ArrowUpRight size={16} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Channels — equal weight tiles */}
          <div className="mt-16">
            <p className="eyebrow mb-5">// channels</p>
            <ul className="grid gap-3 md:grid-cols-3">
              {channels.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.li
                    key={c.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link
                      href={c.href}
                      target={c.label === "Email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex h-full items-start justify-between gap-4 border border-rule rounded-md p-5 sm:p-6 transition-all duration-300 ease-editorial hover:border-cyan hover:bg-cyan/5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 text-ink-subtle group-hover:text-cyan transition-colors duration-200">
                          <Icon size={18} strokeWidth={1.75} />
                          <span className="eyebrow text-current">{c.label}</span>
                        </div>
                        <p className="mt-4 mono text-sm sm:text-base text-foreground group-hover:text-cyan transition-colors duration-200 truncate">
                          {c.handle}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="shrink-0 text-ink-subtle group-hover:text-cyan transition-all duration-200 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
