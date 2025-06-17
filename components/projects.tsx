"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Twovest",
    description:
      "Developed Twovest, a fashion platform that promotes sustainability and ethical consumption, focusing on second-hand clothing, which encourages environmentally conscious shopping habits. Designed an intuitive user interface using Figma, which significantly enhanced customer interaction and satisfaction by making navigation smoother. Improved the overall user experience, which contributed to higher engagement rates and increased customer loyalty.",
    image: "/images/twovest-cover.png",
    tech: ["Next.js", "Tailwind CSS", "Redux Toolkit", "Supabase", "Figma"],
    liveUrl: "https://twovest.com/",
  },
  {
    title: "Gomes Rego & Associados Website",
    description:
      "Designed a professional website for Gomes Rego & Associados, which enhanced the company's online presence and credibility. Focused on user interface and experience, making it easier for clients to navigate and find information, which improved overall client engagement. Implemented responsive design features, ensuring the website is accessible across various devices, which helped reach a broader audience. Integrated clear calls-to-action, guiding potential clients through their journey, ultimately increasing inquiry rates.",
    image: "/images/gomes-rego-cover.png",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"], // Assuming from previous, add Figma if applicable
    liveUrl: "https://gomes-rego-website.vercel.app/",
  },
  // Slooze challenge is more of an experience item, already added there.
]

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Highlighted Projects</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-1 lg:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group flex flex-col md:flex-row gap-8 items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? "md:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-lg shadow-xl aspect-[5/3] bg-muted/50">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="mt-4 text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-primary dark:text-primary font-semibold hover:underline"
                  >
                    View Live Site <ExternalLink size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
