"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

const certificates = [
  { name: "Introduction to Frontend Development", issuer: "Meta", date: "04/2025" },
  { name: "React Basics", issuer: "Meta", date: "04/2025" },
  { name: "Become a WordPress Developer: Unlocking Power with Code", issuer: "Udemy", date: "02/2025" },
  { name: "WordPress for Beginners – Master WordPress Quickly", issuer: "Udemy", date: "02/2025" },
  { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", date: "12/2024" },
  { name: "Python", issuer: "Santander", date: "12/2024" },
  { name: "AI and Productivity", issuer: "Santander", date: "08/2024" },
  { name: "Digital Transformation", issuer: "Santander", date: "08/2024" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "08/2024" },
  {
    name: "Creation of the visual identity for the celebration of the 30th anniversary of Multimedia teaching in Portugal",
    issuer: "Universidade de Aveiro",
    date: "07/2024",
  },
  // Adding previously listed ones if they are not duplicates and still relevant
  { name: "Foundations of User Experience (UX) Design", issuer: "Google", date: "Issued May 2024" },
  { name: "Agile with Atlassian Jira", issuer: "Atlassian", date: "Issued May 2024" },
  { name: "EF SET Certificate (C2 Proficient)", issuer: "EF Standard English Test", date: "Issued Apr 2024" },
  { name: "Programming with JavaScript", issuer: "Meta", date: "Issued Apr 2024" }, // Duplicate of JS Algos? No, different.
  { name: "Version Control", issuer: "Meta", date: "Issued Apr 2024" },
  { name: "Scrum Foundation Professional Certificate SFPC™", issuer: "CertiProf", date: "Issued Feb 2024" },
  { name: "Foundations: Data, Data, Everywhere", issuer: "Google", date: "Issued Jan 2023" },
]

export function Certificates() {
  return (
    <section id="certificates" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Adjusted due to more content
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Certificates</h2>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={`${cert.name}-${cert.issuer}`}
                className="p-6 bg-card rounded-lg shadow-md flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="flex items-center mb-3">
                  <Award className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-bold leading-tight">{cert.name}</h3>
                </div>
                <p className="text-md text-muted-foreground">
                  <span className="font-semibold">Issuer:</span> {cert.issuer}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-semibold">Date:</span> {cert.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
