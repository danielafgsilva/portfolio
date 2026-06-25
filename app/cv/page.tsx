import type React from "react"
import type { Metadata } from "next"
import { Github, Linkedin, Mail, Phone, Globe, MapPin } from "lucide-react"
import { DownloadCVButton } from "@/app/cv/download-button"

export const metadata: Metadata = {
  title: "CV — Daniela Silva",
  description: "Curriculum Vitae for Daniela Silva.",
}

const Section = ({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) => (
  <section className="mb-10 print:mb-7">
    <div className="flex items-baseline gap-3 mb-5 print:mb-4">
      <span className="chapter-number text-sm">{number}</span>
      <span className="eyebrow">// {title}</span>
      <span className="h-px flex-1 bg-rule" aria-hidden="true" />
    </div>
    {children}
  </section>
)

const ExperienceItem = ({
  role,
  company,
  date,
  location,
  description,
  link,
  status,
}: {
  role: string
  company: string
  date: string
  location: string
  description: string[]
  link?: string
  status?: string
}) => (
  <div className="mb-6 print:mb-5 last:mb-0 pb-6 print:pb-5 border-b border-rule last:border-b-0 print:break-inside-avoid">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
      <h3 className="font-display font-semibold text-lg text-foreground leading-tight">{role}</h3>
      <p className="mono text-xs text-ink-subtle">{date}</p>
    </div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
      <p className="mono text-sm text-cyan">{company}</p>
      <p className="mono text-xs text-ink-subtle">{location}</p>
    </div>
    <ul className="space-y-1.5 text-sm text-ink-muted leading-relaxed">
      {description.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span className="text-cyan mt-1.5 shrink-0" aria-hidden="true">
            <span className="block h-1 w-1 bg-cyan rounded-full" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
    {(link || status) && (
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-foreground border-b border-foreground hover:text-cyan hover:border-cyan transition-colors duration-200"
          >
            {link.replace(/^https?:\/\//, "").replace(/\/$/, "")} →
          </a>
        )}
        {status && (
          <span className="badge badge-accent">{status}</span>
        )}
      </div>
    )}
  </div>
)

export default function CVPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-14 bg-background text-foreground font-sans">
      <div className="mb-6 flex justify-end no-print">
        <DownloadCVButton />
      </div>

      <div id="cv-print-content">
        {/* Header */}
        <header className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 print:mb-8 pb-8 border-b border-rule items-end">
          <div className="sm:col-span-2">
            <p className="eyebrow mb-2">// curriculum vitae</p>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground tracking-tight leading-[0.95]">
              Daniela Silva<span className="text-cyan">.</span>
            </h1>
            <p className="mt-4 mono text-sm text-ink-muted">
              Junior Web Developer · Front-End Oriented
            </p>
          </div>

          <ul className="space-y-1.5 mono text-xs text-ink-muted sm:text-right">
            <li>
              <a
                href="mailto:danif.gsilva2000@gmail.com"
                className="inline-flex items-center justify-end gap-2 hover:text-cyan transition-colors"
              >
                <Mail size={12} strokeWidth={1.75} /> danif.gsilva2000@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+351918763080"
                className="inline-flex items-center justify-end gap-2 hover:text-cyan transition-colors"
              >
                <Phone size={12} strokeWidth={1.75} /> +351 918 763 080
              </a>
            </li>
            <li className="inline-flex items-center justify-end gap-2">
              <MapPin size={12} strokeWidth={1.75} /> Porto, Portugal
            </li>
            <li>
              <a
                href="https://daniela-silva.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-end gap-2 hover:text-cyan transition-colors"
              >
                <Globe size={12} strokeWidth={1.75} /> daniela-silva.vercel.app
              </a>
            </li>
            <li>
              <a
                href="https://github.com/danielafgsilva"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-end gap-2 hover:text-cyan transition-colors"
              >
                <Github size={12} strokeWidth={1.75} /> @danielafgsilva
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/danielafgsilva"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-end gap-2 hover:text-cyan transition-colors"
              >
                <Linkedin size={12} strokeWidth={1.75} /> @danielafgsilva
              </a>
            </li>
          </ul>
        </header>

        {/* About */}
        <Section number="01" title="about">
          <p className="text-base leading-relaxed text-ink-muted text-pretty max-w-3xl">
            Hi! I'm a Junior Web Developer with a strong focus on Front-End, driven by curiosity
            and a constant desire to improve. I enjoy building clean, engaging, and user-focused
            web experiences that balance performance with thoughtful design. Naturally adaptable,
            I'm comfortable stepping beyond Front-End when the team needs it, always prioritizing
            collaboration and teamwork. I value clear communication, positive team dynamics and
            delivering high-quality work with attention to detail and professionalism.
          </p>
        </Section>

        {/* Experience */}
        <Section number="02" title="professional experience">
          <ExperienceItem
            role="Full-Stack Professional Internship"
            company="Dynamikfloat | Dyn-Link"
            date="08/2025 — now"
            location="Aveiro, Portugal"
            description={[
              "Contributed to multiple software development projects.",
              "Stepped into the role of Project Manager for the company's core software, leading delivery for international clients.",
              "Joined the support team and conducted workshops across all of the company's software products for international clients.",
              "Strengthened skills in Back-End development by working with Laravel (REST APIs, business logic, and database interactions) and used DBeaver to manage data.",
              "Worked with Vue.js on the Front-End to build and integrate components with Back-End services, gaining hands-on experience in full-stack workflows, best practices, and team-based development.",
              "Performed QA across selected projects, prepared technical and process documentation, and collaborated with the design team on small tasks such as newsletters and social media posts.",
            ]}
          />
          <ExperienceItem
            role="Web Platforms Internship"
            company="Bliss Applications"
            date="12/2024 — 06/2025"
            location="Porto, Portugal"
            description={[
              "Created the company website, which served as a foundation for the online presence and showcased the company's services effectively.",
              "Developed the website using WordPress, PHP, Sass, HTML and JavaScript, helping to meet diverse needs and improve their online visibility.",
              "Enhanced the user experience and functionality, leading to increased satisfaction and engagement.",
            ]}
            link="https://blissapplications.com/"
          />
          <ExperienceItem
            role="Research in Immersive Web Environments"
            company="Digital Media and Interaction Research Centre"
            date="11/2023 — 07/2024"
            location="Aveiro, Portugal"
            description={[
              "Collaborated on the project 'O Metaverso na Educação' (Immersive Web Environments in Education), exploring immersive web environments in education.",
              "Developed engaging projects highlighting how immersive web technologies can enhance educational experiences.",
              "Presented findings and showcased the StudySphere platform at the Students@DigiMedia#03 event.",
            ]}
          />
        </Section>

        {/* Projects */}
        <Section number="03" title="projects">
          <ExperienceItem
            role="Full-Stack Developer"
            company="Dogwarts Website"
            date="08/2025"
            location="Porto, Portugal"
            description={[
              "Developed a modern website for Dogwarts, using Next.js, TypeScript, and Tailwind CSS.",
              "Designed a role-based UI and integrated with the Back-End and Sanity CMS for content management.",
            ]}
            status="In Progress"
          />
          <ExperienceItem
            role="Front-End Developer · UX/UI Designer"
            company="Gomes Rego & Associados Website"
            date="12/2024"
            location="Porto, Portugal"
            description={[
              "Designed a professional website, enhancing the company's online presence and credibility.",
              "Focused on UI/UX to make it easier for clients to navigate and find information.",
              "Implemented responsive design features for accessibility across various devices.",
            ]}
            link="https://grasroc.pt/"
          />
          <ExperienceItem
            role="Front-End Developer · UX/UI Designer"
            company="Twovest"
            date="07/2024"
            location="Aveiro, Portugal"
            description={[
              "Designed an intuitive user interface using Figma, enhancing customer interaction and satisfaction.",
              "Utilized Next.js, Tailwind CSS, Redux Toolkit, and Supabase to build a robust platform.",
            ]}
            link="https://twovest.com/"
          />
        </Section>

        {/* Two-column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 print:break-inside-avoid">
          <Section number="04" title="education">
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-semibold text-base text-foreground leading-tight">
                  Master's, Web Communication &amp; Technologies
                </h3>
                <p className="mt-1 mono text-xs text-cyan">Universidade de Aveiro</p>
                <p className="mono text-xs text-ink-subtle">09/2023 — 12/2025</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-foreground leading-tight">
                  Licentiate, Audiovisual &amp; Communication Technology
                </h3>
                <p className="mt-1 mono text-xs text-cyan">Escola Superior de Media Artes e Design</p>
                <p className="mono text-xs text-ink-subtle">10/2020 — 07/2023</p>
              </div>
            </div>
          </Section>

          <Section number="05" title="awards">
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-semibold text-base text-foreground leading-tight">
                  Academy Award
                </h3>
                <p className="mt-1 mono text-xs text-cyan">University of Aveiro · 07/2024</p>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                  For the Twovest Project, recognizing contributions to sustainable fashion technology.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-foreground leading-tight">
                  Best Project 2023/2024
                </h3>
                <p className="mt-1 mono text-xs text-cyan">Mindera · 07/2024</p>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                  For the Twovest Project, highlighting excellence in design and user experience.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Skills */}
        <Section number="06" title="skills">
          <div className="space-y-5">
            <div>
              <p className="eyebrow mb-3">programming</p>
              <ul className="flex flex-wrap gap-2">
                {["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "React", "Next.js", "Vue.js"].map((s) => (
                  <li key={s} className="badge">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">tools &amp; platforms</p>
              <ul className="flex flex-wrap gap-2">
                {[
                  "Figma",
                  "Tailwind",
                  "Laravel",
                  "Sass",
                  "Supabase",
                  "Docker",
                  "GitHub",
                  "DBeaver",
                  "WordPress",
                  "Bedrock",
                  "Blade",
                ].map((s) => (
                  <li key={s} className="badge">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">languages</p>
              <ul className="flex flex-wrap gap-2">
                {["Portuguese (Native)", "English (Professional)"].map((s) => (
                  <li key={s} className="badge">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
