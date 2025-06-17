"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

const awards = [
  {
    title: "Media Play Award for Twovest",
    issuer: "University of Aveiro",
    date: "Jul 2024",
  },
  {
    title: "Best Project 2023/2024",
    issuer: "Mindera",
    date: "Jul 2024",
  },
]

export function Awards() {
  return (
    <section id="awards" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Awards</h2>
          <div className="mt-16 max-w-2xl mx-auto grid gap-10">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent/30 text-accent-foreground dark:bg-accent/50 dark:text-accent-foreground rounded-full flex items-center justify-center">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{award.title}</h3>
                  <p className="mt-1 text-md font-semibold text-muted-foreground">{award.issuer}</p>
                  <p className="text-sm text-muted-foreground">{award.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
