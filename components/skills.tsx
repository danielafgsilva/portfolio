"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Code, Wrench, LanguagesIcon } from "lucide-react" // Changed Languages to LanguagesIcon

const skillsData = {
  programming: ["HTML", "CSS", "JavaScript", "PHP", "React", "Next.js"],
  tools: ["WordPress", "Figma", "SaaS", "Supabase", "Docker", "GitHub", "Tailwind"],
  languages: ["English (Professional)", "Portuguese (Native)"],
}

const SkillCategory = ({ title, skills, icon }: { title: string; skills: string[]; icon: React.ReactNode }) => (
  <motion.div
    className="p-6 bg-card rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="text-primary">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 text-sm font-medium bg-background text-foreground dark:bg-muted dark:text-foreground rounded-full shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
)

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Skills</h2>
          <div className="mt-16 grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <SkillCategory title="Programming Languages" skills={skillsData.programming} icon={<Code size={24} />} />
            <SkillCategory title="Tools & Platforms" skills={skillsData.tools} icon={<Wrench size={24} />} />
            <SkillCategory title="Languages" skills={skillsData.languages} icon={<LanguagesIcon size={24} />} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
