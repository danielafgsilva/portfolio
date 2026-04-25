"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    role: "Full-Stack Professional Internship",
    company: "Dynamikfloat",
    date: "08/2025",
    location: "Portugal",
    description:
      "Contributed to multiple software development projects, collaborating with the team to implement new features, fix issues, and support ongoing releases. Strengthened skills in backend development by working with Laravel (REST APIs, business logic, and database interactions) and used DBeaver to query, manage, and troubleshoot data. Worked with Vue.js on the frontend to build and integrate components with backend services, gaining hands-on experience in full-stack workflows, best practices, and team-based development. Provided support to international clients, performed QA across selected projects, prepared technical and process documentation, and collaborated with the design team on small tasks such as newsletters and social media posts.",
  },
  {
    role: "Web platforms Internship",
    company: "Bliss Applications",
    date: "12/2024",
    location: "Portugal",
    description:
      "Created the company website, which served as a foundation for the online presence and showcased the company's services effectively. Developed the website using WordPress, PHP, SaaS, HTML, and JavaScript, helping to meet diverse needs and improve their online visibility. Enhanced the user experience and functionality, leading to increased satisfaction and engagement.",
  },
  {
    role: "Research in Immersive Web Environments",
    company: "Digital Media and Interaction Research Centre",
    date: "11/2023 – 07/2024",
    location: "Aveiro, Portugal",
    description:
      "Collaborated on the 'O Metaverso na Educação' project, which focused on developing innovative strategies to explore the potential of immersive web environments in education, helping to advance the integration of technology in learning. Developed engaging projects that highlighted how immersive web technologies can enhance educational experiences, resulting in increased interest and investment in digital education initiatives. Presented findings and showcased the StudySphere platform at the Students@DigiMedia#03 event, contributing to critical discussions about the future of digital education and promoting awareness of emerging educational tools. Engaged with peers and stakeholders during the event, fostering valuable connections that could lead to future collaborations and advancements in educational technology.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Professional Experience</h2>
          <div className="mt-16 max-w-5xl mx-auto">
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
                  <div className={`w-full flex ${index % 2 === 0 ? "justify-start pr-8 md:pr-0" : "justify-end pl-8 md:pl-0"}`}>
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] max-w-[calc(50%-2rem)] p-6 bg-background dark:bg-card border-2 border-primary/20 dark:border-primary/30 rounded-xl shadow-lg hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    >
                      <p className="text-sm text-muted-foreground font-medium">
                        {exp.date} | {exp.location}
                      </p>
                      <h3 className="text-xl font-bold mt-2">{exp.role}</h3>
                      <p className="text-lg font-semibold text-primary mt-1">{exp.company}</p>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
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
