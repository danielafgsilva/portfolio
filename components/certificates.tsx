"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react" // Using Award icon as a generic certificate icon

const certificates = [
  { name: "React Basics", issuer: "Meta", date: "Apr 2025" },
  { name: "WordPress Developer", issuer: "Udemy", date: "Feb 2025" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Aug 2024" },
  { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", date: "Issued Jun 2024" },
  { name: "Foundations of User Experience (UX) Design", issuer: "Google", date: "Issued May 2024" },
  { name: "Agile with Atlassian Jira", issuer: "Atlassian", date: "Issued May 2024" },
  { name: "EF SET Certificate (C2 Proficient)", issuer: "EF Standard English Test", date: "Issued Apr 2024" },
  { name: "Programming with JavaScript", issuer: "Meta", date: "Issued Apr 2024" },
  { name: "Version Control", issuer: "Meta", date: "Issued Apr 2024" },
  { name: "Introduction to Front-End Development", issuer: "Meta", date: "Issued Mar 2024" },
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Certificates</h2>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="p-6 bg-card rounded-lg shadow-md flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.05 }} // Reduced delay for more items
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
