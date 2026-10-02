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
import { JsonLd } from "@/components/json-ld"
import { homeJsonLd } from "@/lib/seo/structured-data"
import type { Locale } from "@/lib/i18n/config"

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={homeJsonLd(lang as Locale)} />
      <Header />
      {/* Fixed-position side nav: placed after the header in the DOM so it
          comes early in the tab order (visually it's unaffected). */}
      <SceneProgress />
      <main id="main">
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
      <BackToTop />
    </div>
  )
}
