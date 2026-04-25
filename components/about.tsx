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
  "Hi! I'm a Junior Full-Stack Developer with a strong focus on Frontend, driven by curiosity and a constant desire to improve. I enjoy building clean, engaging, and user-focused web experiences that balance performance with thoughtful design. Naturally adaptable, I’m comfortable stepping beyond Frontend when the team needs it — always prioritizing collaboration and impact over titles. I bring a proactive mindset, fresh perspectives, and a genuine passion for learning and solving problems. I value clear communication, positive team dynamics, and delivering high-quality work with attention to detail and professionalism. My goal is simple: help build meaningful digital experiences while growing alongside the team."
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
