"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    role: "Web platforms Internship",
    company: "Bliss Applications",
    date: "12/2024",
    location: "Portugal",
    description:
      "Created the company website, which served as a foundation for our online presence and showcased our services effectively. Developed multiple client websites using WordPress, PHP, SaaS, HTML, and JavaScript, helping to meet diverse client needs and improve their online visibility. Enhanced user experience and functionality across all projects, leading to increased client satisfaction and engagement.",
  },
  {
    role: "Social Media Manager",
    company: "C.U.D. Leverense",
    date: "09/2024",
    location: "Porto, Portugal",
    description:
      "Managed social media platforms to boost engagement and brand visibility, which helped the organization connect better with its audience. Developed content strategies that aligned with our organizational goals, ensuring that our messaging resonated effectively with followers. Created engaging posts and campaigns that sparked conversations, leading to a noticeable increase in interactions and community growth. Analyzed social media metrics to refine our approach, helping us understand what content performed best and why. Collaborated with cross-functional teams to integrate social media efforts with broader marketing campaigns, enhancing overall brand consistency.",
  },
  {
    role: "Research in Immersive Web Environments",
    company: "Digital Media and Interaction Research Centre",
    date: "11/2023 – 07/2024",
    location: "Aveiro, Portugal",
    description:
      "Collaborated on the 'O Metaverso na Educação' project, which focused on developing innovative strategies to explore the potential of immersive web environments in education, helping to advance the integration of technology in learning. Developed engaging projects that highlighted how immersive web technologies can enhance educational experiences, resulting in increased interest and investment in digital education initiatives. Presented findings and showcased the StudySphere platform at the Students@DigiMedia#03 event, contributing to critical discussions about the future of digital education and promoting awareness of emerging educational tools. Engaged with peers and stakeholders during the event, fostering valuable connections that could lead to future collaborations and advancements in educational technology.",
  },
  {
    role: "Frontend Developer | UX/UI Designer",
    company: "Twovest (Project)",
    date: "09/2023 – 07/2024",
    location: "Remote/Project-based",
    description:
      "Developed Twovest, a fashion platform that promotes sustainability and ethical consumption, focusing on second-hand clothing, which encourages environmentally conscious shopping habits. Designed an intuitive user interface using Figma, which significantly enhanced customer interaction and satisfaction by making navigation smoother. Utilized Next.js, Tailwind CSS, Redux Toolkit, and Supabase to build a robust platform, helping to ensure a seamless and responsive experience for users. Improved the overall user experience, which contributed to higher engagement rates and increased customer loyalty.",
  },
  {
    role: "Frontend Developer | UX/UI Designer",
    company: "Gomes Rego & Associados Website (Project)",
    date: "12/2023",
    location: "Remote/Project-based",
    description:
      "Designed a professional website for Gomes Rego & Associados, which enhanced the company's online presence and credibility. Focused on user interface and experience, making it easier for clients to navigate and find information, which improved overall client engagement. Implemented responsive design features, ensuring the website is accessible across various devices, which helped reach a broader audience. Integrated clear calls-to-action, guiding potential clients through their journey, ultimately increasing inquiry rates.",
  },
  {
    role: "Frontend Developer",
    company: "Slooze Challenge",
    date: "06/2025 – 06/2025",
    location: "Porto, Portugal",
    description:
      "Developed a modern, role-based commodities management system using React, TypeScript, and Tailwind CSS, which streamlined product management and enhanced user experience. Implemented a secure email/password authentication system, ensuring safe login for users and protecting sensitive information. Created a responsive design that works seamlessly across all devices, ensuring a mobile-first approach that improved usability for all users. Designed a role-based UI with dynamic menu restrictions, tailoring user experiences based on roles and enhancing security and usability.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Adjusted amount due to more content
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Professional Experience</h2>
          <div className="mt-16 max-w-3xl mx-auto">
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
                  <div className={`w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`w-full md:w-5/12 p-6 bg-card rounded-lg shadow-md ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    >
                      <p className="text-sm text-muted-foreground">
                        {exp.date} | {exp.location}
                      </p>
                      <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                      <p className="text-md font-semibold text-primary">{exp.company}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
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
