import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Hobbies } from "@/components/hobbies"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SceneProgress } from "@/components/scene-progress"
import { BackToTop } from "@/components/back-to-top"

export default function PortfolioPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        {/* Index */}
        <Hero />
        {/* Selected Work */}
        <Projects />
        {/* The Story (About + Experience + Education merged) */}
        <About />
        {/* Toolbox */}
        <Skills />
        {/* Off Duty (Hobbies + Volunteering) */}
        <Hobbies />
        {/* Get in Touch */}
        <Contact />
      </main>
      <Footer />
      <SceneProgress />
      <BackToTop />
    </div>
  )
}
