"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

const education = [
  {
    degree: "Web Communication and Technologies | Master's degree",
    institution: "Universidade de Aveiro",
    date: "09/2023 – Present", // Assuming ongoing based on CV structure
  },
  {
    degree: "Audiovisual and Communication Technology | Licentiate degree",
    institution: "Escola Superior de Media Artes e Design",
    date: "10/2020 – 07/2023",
  },
]

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Education</h2>
          <div className="mt-16 max-w-2xl mx-auto grid gap-10">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="flex gap-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="mt-1 text-md font-semibold text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
