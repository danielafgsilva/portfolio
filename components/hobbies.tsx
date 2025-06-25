"use client"

import { motion } from "framer-motion"
// Updated imports: Removed Dumbbell, Added TennisRacket
import { Music, HeartHandshake, Camera, Dribbble, PaintRollerIcon as Flame } from "lucide-react"

const volunteering = {
  role: "Food collection",
  organization: "Food Bank Against Hunger",
  location: "Porto, Portugal",
  description:
    "Assisted in organizing and collecting food donations, supporting the local community by ensuring food security for those in need.",
}

const hobbiesList = [
  {
    name: "Photography Enthusiast",
    icon: <Camera size={28} />,
    href: "https://danielapv.myportfolio.com/",
  },
  {
    name: "Soccer Player",
    subtitle: "4th National Division",
    icon: <Dribbble size={28} />,
    href: "https://www.zerozero.pt/jogador/daniela-silva/732215?epoca_id=154",
  },
  {
    name: "Padel Enthusiast",
    icon: <Flame size={28} />, // Changed icon here
    href: "https://app.playtomic.io/profile/user/5882533?utm_source=app_ios&utm_campaign=share",
  },
  {
    name: "Musician",
    icon: <Music size={28} />,
    href: "https://www.instagram.com/danizmusic/",
  },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Volunteering & Hobbies</h2>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Volunteering</h3>
            <motion.div
              className="max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md flex gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-accent/30 text-accent-foreground dark:bg-accent/50 dark:text-accent-foreground rounded-full flex items-center justify-center">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold">{volunteering.role}</h4>
                <p className="text-md font-semibold text-muted-foreground">
                  {volunteering.organization} - {volunteering.location}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{volunteering.description}</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Hobbies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {hobbiesList.map((hobby, index) => (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={hobby.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-md text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      {hobby.icon}
                    </div>
                    <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">{hobby.name}</h4>
                    {hobby.subtitle && <p className="text-sm text-muted-foreground">{hobby.subtitle}</p>}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
