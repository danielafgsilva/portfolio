import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Education } from "@/components/education"
import { Certificates } from "@/components/certificates"
import { Skills } from "@/components/skills"
import { Awards } from "@/components/awards"
import { Hobbies } from "@/components/hobbies"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Certificates />
        <Skills />
        <Awards />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
