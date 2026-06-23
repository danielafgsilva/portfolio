"use client"

import { motion } from "framer-motion"
import { Chapter, Accent } from "./chapter"

type Tool = { name: string }

type Group = {
  index: string
  label: string
  tools: Tool[]
}

const groups: Group[] = [
  {
    index: "01",
    label: "Front-End",
    tools: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Vue.js" },
      { name: "Tailwind CSS" },
      { name: "Sass" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    index: "02",
    label: "Back-End & Data",
    tools: [
      { name: "Laravel" },
      { name: "PHP" },
      { name: "Supabase" },
      { name: "DBeaver" },
      { name: "Docker" },
    ],
  },
  {
    index: "03",
    label: "Design & Workflow",
    tools: [
      { name: "Figma" },
      { name: "Git / GitHub" },
      { name: "WordPress" },
      { name: "Framer Motion" },
    ],
  },
]

const languages = [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Professional" },
]

export function Skills() {
  return (
    <Chapter
      id="toolbox"
      number="04 //"
      eyebrow="Toolbox"
      title={
        <>
          What I <Accent>build</Accent> with.
        </>
      }
      intro={
        <p>
          Roughly grouped by where I spend my hours.
        </p>
      }
    >
      <div className="space-y-12">
        {groups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="chapter-number text-sm">{group.index}</span>
              <span className="eyebrow">// {group.label}</span>
              <span className="h-px flex-1 bg-rule" aria-hidden="true" />
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.tools.map((t) => (
                <li key={t.name} className="badge">
                  {t.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="chapter-number text-sm">04</span>
            <span className="eyebrow">// Languages</span>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-md">
            {languages.map((l) => (
              <div key={l.name} className="flex items-baseline justify-between border border-rule rounded-md px-4 py-3">
                <dt className="font-medium text-foreground">{l.name}</dt>
                <dd className="mono text-xs text-cyan">{l.level}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Chapter>
  )
}
