"use client"

import { motion } from "framer-motion"
import { AwardIcon } from "lucide-react" // Renamed to avoid conflict

const awardsData = [
  {
    title: "Academy Award",
    issuer: "University of Aveiro",
    description:
      "Academy award on Media Play for the Twovest Project, recognizing innovative contributions to sustainable fashion technology.",
    date: "07/2024",
  },
  {
    title: "Best Project 2023/2024",
    issuer: "Mindera",
    description:
      "Best Project of the 2023/2024 Master's Program for the Twovest Project, highlighting excellence in design and user experience.",
    date: "07/2024",
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
            {awardsData.map((award, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start" // Changed to items-start for better alignment with description
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent/30 text-accent-foreground dark:bg-accent/50 dark:text-accent-foreground rounded-full flex items-center justify-center">
                  <AwardIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{award.title}</h3>
                  <p className="mt-1 text-md font-semibold text-muted-foreground">
                    {award.issuer} - {award.date}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
