import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Hobbies } from "@/components/hobbies"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        {/* 01 — Index */}
        <Hero />
        {/* 02 — Selected Work */}
        <Projects />
        {/* 03 — The Story (About + Experience + Education merged) */}
        <About />
        {/* 04 — Toolbox */}
        <Skills />
        {/* 05 — Off Duty (Hobbies + Volunteering) */}
        <Hobbies />
        {/* 06 — Get in Touch */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
