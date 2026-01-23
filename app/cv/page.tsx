import type React from "react"
import type { Metadata } from "next"
import { Github, Linkedin, Mail, Phone, Globe, MapPin, Download } from "lucide-react"
import { DownloadCVButton } from "@/app/cv/download-button"

export const metadata: Metadata = {
  title: "CV - Daniela Silva",
  description: "Curriculum Vitae for Daniela Silva.",
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">{title}</h2>
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
}: { role: string; company: string; date: string; location: string; description: string[]; link?: string }) => (
  <div className="mb-6 p-6 bg-muted/30 dark:bg-muted/20 border-2 border-primary/20 dark:border-primary/30 rounded-xl shadow-lg hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300">
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-xl font-semibold">{role}</h3>
      <p className="text-sm text-muted-foreground font-medium">{date}</p>
    </div>
    <div className="flex justify-between items-baseline mb-4">
      <p className="font-medium text-primary text-lg">{company}</p>
      <p className="text-sm text-muted-foreground">{location}</p>
    </div>
    <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
      {description.map((item, index) => (
        <li key={index} className="leading-relaxed">{item}</li>
      ))}
    </ul>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary hover:underline mt-3 inline-block font-medium"
      >
        View Project
      </a>
    )}
  </div>
)

export default function CVPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 sm:p-12 bg-background text-foreground font-sans">
      <div className="mb-6 flex justify-end no-print">
        <DownloadCVButton />
      </div>
      <div id="cv-print-content">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <div>
          <h1 className="text-6xl md:text-7xl font-extrabold font-harmony uppercase">DANIELA SILVA</h1>
          <p className="text-xl text-muted-foreground mt-1">Junior Full-Stack Developer | Front-End Oriented</p>
        </div>
        <div className="text-sm mt-4 sm:mt-0 sm:text-right space-y-1">
          <p className="flex items-center justify-end gap-2">
            <Mail size={14} /> danif.gsilva2000@gmail.com
          </p>
          <p className="flex items-center justify-end gap-2">
            <Phone size={14} /> +351 918763080
          </p>
          <p className="flex items-center justify-end gap-2">
            <MapPin size={14} /> Porto, Portugal
          </p>
          <a
            href="https://daniela-silva.vercel.app/"
            className="flex items-center justify-end gap-2 hover:underline text-primary"
          >
            <Globe size={14} /> daniela-silva.vercel.app
          </a>
          <a
            href="https://github.com/danielafgsilva"
            className="flex items-center justify-end gap-2 hover:underline text-primary"
          >
            <Github size={14} /> @danielafgsilva
          </a>
          <a
            href="https://linkedin.com/in/danielafgsilva"
            className="flex items-center justify-end gap-2 hover:underline text-primary"
          >
            <Linkedin size={14} /> @danielafgsilva
          </a>
        </div>
      </header>

      <Section title="About">
        <p className="text-muted-foreground">
          Hi! I'm a Junior Full-Stack Developer with a strong focus on Front-End development, who showcases a solid work
          ethic and adaptability. I demonstrate ability to create engaging web solutions that enhance user experience
          and performance, contributing with fresh perspectives and a passion for learning. I also offer a commitment to
          innovation and continuous improvement, and I'm always ready to make a meaningful impact in web development
          projects.
          <br />
          Academic and professional experiences emphasize adaptability, creativity, and a commitment to detail, supported
          by certifications in digital transformation and AI. The goal is to bridge technology and user experience,
          creating impactful digital solutions while deepening expertise in web communication technologies.
        </p>
      </Section>

      <Section title="Professional Experience">
        <ExperienceItem
          role="Full-Stack Professional Internship"
          company="Dynamikfloat"
          date="08/2025"
          location="Portugal"
          description={[
            "Contributed to multiple software development projects, collaborating with the team to implement new features, fix issues, and support ongoing releases.",
            "Strengthened skills in backend development by working with Laravel (REST APIs, business logic, and database interactions) and used DBeaver to query, manage, and troubleshoot data.",
            "Worked with Vue.js on the frontend to build and integrate components with backend services, gaining hands-on experience in full-stack workflows, best practices, and team-based development.",
          ]}
        />
        <ExperienceItem
          role="Web platforms Internship"
          company="Bliss Applications"
          date="12/2024"
          location="Portugal"
          description={[
            "Created the company website, which served as a foundation for our online presence and showcased our services effectively.",
            "Developed multiple client websites using WordPress, PHP, SaaS, HTML, and JavaScript, helping to meet diverse client needs and improve their online visibility.",
            "Enhanced user experience and functionality across all projects, leading to increased client satisfaction and engagement.",
          ]}
        />
        <ExperienceItem
          role="Research in Immersive Web Environments"
          company="Digital Media and Interaction Research Centre"
          date="11/2023 – 07/2024"
          location="Aveiro, Portugal"
          description={[
            "Collaborated on the 'O Metaverso na Educação' project, exploring immersive web environments in education.",
            "Developed engaging projects highlighting how immersive web technologies can enhance educational experiences.",
            "Presented findings and showcased the StudySphere platform at the Students@DigiMedia#03 event.",
          ]}
        />
      </Section>

      <Section title="Projects">
      <ExperienceItem
          role="Full-Stack Developer"
          company="Dogwarts Website"
          date="08/2025"
          location="Porto, Portugal"
          description={[
            "Developed a modern website for Dogwarts, using Next.js, TypeScript, and Tailwind CSS.",
            "Designed a role-based UI and integrated with the backend.",
             "Used Sanity CMS for content management.",
          ]}
          link="https://dogwarts.vercel.app/"
        />
        <ExperienceItem
          role="Frontend Developer | UX/UI Designer"
          company="Gomes Rego & Associados Website"
          date="12/2023"
          location="Porto, Portugal"
          description={[
            "Designed a professional website, enhancing the company's online presence and credibility.",
            "Focused on UI/UX to make it easier for clients to navigate and find information.",
            "Implemented responsive design features for accessibility across various devices.",
          ]}
          link="https://gomes-rego-website.vercel.app/"
        />
        <ExperienceItem
          role="Frontend Developer | UX/UI Designer"
          company="Twovest"
          date="09/2023 – 07/2024"
          location="Aveiro, Portugal"
          description={[
            "Developed a fashion platform promoting sustainability and ethical consumption for second-hand clothing.",
            "Designed an intuitive user interface using Figma, enhancing customer interaction and satisfaction.",
            "Utilized Next.js, Tailwind CSS, Redux Toolkit, and Supabase to build a robust platform.",
          ]}
          link="https://twovest.com/"
        />
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div>
          <Section title="Education">
            <div className="mb-4">
              <h3 className="font-semibold">Web Communication and Technologies | Master's degree</h3>
              <p className="text-sm text-muted-foreground">Universidade de Aveiro | 09/2023 – Present</p>
            </div>
            <div>
              <h3 className="font-semibold">Audiovisual and Communication Technology | Licentiate degree</h3>
              <p className="text-sm text-muted-foreground">
                Escola Superior de Media Artes e Design | 10/2020 – 07/2023
              </p>
            </div>
          </Section>

          <Section title="Awards">
            <div className="mb-4">
              <h3 className="font-semibold">Academy Award</h3>
              <p className="text-sm text-muted-foreground">University of Aveiro | 07/2024</p>
              <p className="text-xs text-muted-foreground mt-1">
                For the Twovest Project, recognizing contributions to sustainable fashion technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Best Project 2023/2024</h3>
              <p className="text-sm text-muted-foreground">Mindera | 07/2024</p>
              <p className="text-xs text-muted-foreground mt-1">
                For the Twovest Project, highlighting excellence in design and user experience.
              </p>
            </div>
          </Section>
        </div>

        <div>
          <Section title="Skills">
            <h4 className="font-semibold mb-2">Programming Languages</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {["HTML", "CSS", "JavaScript", "PHP", "React", "Next.js"].map((s) => (
                <span key={s} className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
            <h4 className="font-semibold mb-2">Tools & Platforms</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {["WordPress", "Figma", "SaaS", "Supabase", "Docker", "GitHub", "Tailwind", "Laravel", "DBeaver", "Vue.js"].map((s) => (
                <span key={s} className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
            <h4 className="font-semibold mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {["Portuguese (Native)", "English (Professional)"].map((s) => (
                <span key={s} className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>
      </div>
    </div>
  )
}
