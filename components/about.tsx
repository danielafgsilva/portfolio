"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User, Heart, Users, Lightbulb } from "lucide-react"

export function About() {
  const personalTraits = [
    { icon: <User size={24} />, text: "Proactive" },
    { icon: <Heart size={24} />, text: "Empathic" },
    { icon: <Users size={24} />, text: "Collaborative" },
    { icon: <Lightbulb size={24} />, text: "Innovative" },
  ]

  const aboutText =
    "Hi! I'm a Junior Full-Stack Developer with a strong focus on Front-End development, who showcases a solid work ethic and adaptability. I demonstrate ability to create engaging web solutions that enhance user experience and performance, contributing with fresh perspectives and a passion for learning. I also offer a commitment to innovation and continuous improvement, and I'm always ready to make a meaningful impact in web development projects.\n\nAcademic and professional experiences emphasize adaptability, creativity, and a commitment to detail, supported by certifications in digital transformation and AI. The goal is to bridge technology and user experience, creating impactful digital solutions while deepening expertise in web communication technologies."

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">About Me</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <motion.div
              className="md:col-span-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                <Image
                  src="/images/daniela-silva.jpg"
                  alt="Daniela Silva"
                  fill
                  className="rounded-full object-cover shadow-lg"
                />
              </div>
            </motion.div>
            <div className="md:col-span-2">
              <p className="text-lg text-muted-foreground">{aboutText}</p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {personalTraits.map((trait, index) => (
                  <motion.div
                    key={trait.text}
                    className="flex flex-col items-center text-center p-4 bg-muted/50 dark:bg-card rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="text-primary mb-2">{trait.icon}</div>
                    <span className="font-semibold">{trait.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
