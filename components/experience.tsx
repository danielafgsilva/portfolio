"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    role: "Internship",
    company: "Bliss Applications",
    date: "Dec 2024",
    description:
      "Gained hands-on experience in a professional development environment, contributing to front-end projects and collaborating with senior developers.",
  },
  {
    role: "Social Media Manager",
    company: "C.U.D. Leverense",
    date: "Sep 2024",
    description:
      "Managed social media presence, creating engaging content and strategies to grow the online community.",
  },
  {
    role: "Research Assistant",
    company: "DigiMedia",
    date: "Jul 2024",
    description:
      "Assisted in research projects related to digital media, contributing to data collection and analysis.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Experience</h2>
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" aria-hidden="true"></div>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative mb-12"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full border-2 border-primary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div className={`w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`w-full md:w-5/12 p-6 bg-card rounded-lg shadow-md ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    >
                      <p className="text-sm text-muted-foreground">{exp.date}</p>
                      <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                      <p className="text-md font-semibold text-primary">{exp.company}</p>
                      <p className="mt-2 text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
