"use client"

import { motion } from "framer-motion"
import { Music, HeartHandshake, Camera, Disc } from "lucide-react"

const hobbies = [
  { name: "Violinist", icon: <Music size={28} /> },
  { name: "Soccer Player", icon: <Disc size={28} /> },
  { name: "Photography", icon: <Camera size={28} /> },
  { name: "Volunteering", icon: <HeartHandshake size={28} /> },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Volunteering & Hobbies</h2>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-md text-primary mb-4">
                  {hobby.icon}
                </div>
                <h3 className="text-lg font-semibold">{hobby.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
