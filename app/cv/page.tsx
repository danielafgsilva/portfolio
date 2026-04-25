import type React from "react"
import type { Metadata } from "next"
import { Github, Linkedin, Mail, Phone, Globe, MapPin, Download } from "lucide-react"
import { DownloadCVButton } from "@/app/cv/download-button"
import { Badge } from "@/components/ui/badge"

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
  status,
}: { role: string; company: string; date: string; location: string; description: string[]; link?: string; status?: string }) => (
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
    {status && (
      <Badge variant="cv" className="text-sm mt-3 inline-block font-medium">{status}</Badge>
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
            <p className="text-xl text-muted-foreground mt-1">Junior Web Developer | Front-End Oriented</p>
          </div>
          <div className="text-sm mt-4 sm:mt-0 sm:text-right space-y-1">
            <p className="flex items-center justify-end gap-2">
              <Mail size={14} /> <a href="mailto:danif.gsilva2000@gmail.com">danif.gsilva2000@gmail.com</a>
            </p>
            <p className="flex items-center justify-end gap-2">
              <Phone size={14} /> <a href="tel:+351918763080">+351 918 763 080</a>
            </p>
            <p className="flex items-center justify-end gap-2">
              <MapPin size={14} /> Porto, Portugal
            </p>
            <a
              href="https://daniela-silva.vercel.app/"
              target="_blank"
              className="flex items-center justify-end gap-2 hover:underline text-primary"
            >
              <Globe size={14} /> daniela-silva.vercel.app
            </a>
            <a
              href="https://github.com/danielafgsilva"
              target="_blank"
              className="flex items-center justify-end gap-2 hover:underline text-primary"
            >
              <Github size={14} /> @danielafgsilva
            </a>
            <a
              href="https://linkedin.com/in/danielafgsilva"
              target="_blank"
              className="flex items-center justify-end gap-2 hover:underline text-primary"
            >
              <Linkedin size={14} /> @danielafgsilva
            </a>
          </div>
        </header>

        <Section title="About">
          <p className="text-muted-foreground text-justify">
            Hi! I'm a Junior Web Developer with a strong focus on Front-End, driven by curiosity and a constant desire to improve.
            I enjoy building clean, engaging, and user-focused web experiences that balance performance with thoughtful design.
            Naturally adaptable, I’m comfortable stepping beyond Front-End when the team needs it, always prioritizing collaboration and teamwork.
            I bring a proactive mindset, fresh perspectives and a genuine passion for learning and solving problems.
            I value clear communication, positive team dynamics and delivering high-quality work with attention to detail and professionalism.
            My goal is simple: help building meaningful digital experiences while growing alongside the team.
          </p>
        </Section>

        <Section title="Professional Experience">
          <ExperienceItem
            role="Full-Stack Professional Internship"
            company="Dynamikfloat | Dyn-Link"
            date="08/2025 - "
            location="Aveiro, Portugal"
            description={[
              "Contributed to multiple software development projects.",
              "Strengthened skills in Back-End development by working with Laravel (REST APIs, business logic, and database interactions) and used DBeaver to manage data.",
              "Worked with Vue.js on the Front-End to build and integrate components with Back-End services, gaining hands-on experience in full-stack workflows, best practices, and team-based development.",
              "Provided support to international clients, performed QA across selected projects, prepared technical and process documentation, and collaborated with the design team on small tasks such as newsletters and social media posts.",
            ]}
          />
          <ExperienceItem
            role="Web Platforms Internship"
            company="Bliss Applications"
            date="12/2024 - 06/2025"
            location="Porto, Portugal"
            description={[
              "Created the company website, which served as a foundation for the online presence and showcased the company's services effectively.",
              "Developed the website using WordPress, PHP, SaaS, HTML and JavaScript, helping to meet diverse needs and improve their online visibility.",
              "Enhanced the user experience and functionality, leading to increased satisfaction and engagement.",
            ]}
            link="https://blissapplications.com/"
          />
          <ExperienceItem
            role="Research in Immersive Web Environments"
            company="Digital Media and Interaction Research Centre"
            date="11/2023 – 07/2024"
            location="Aveiro, Portugal"
            description={[
              "Collaborated on the project 'O Metaverso na Educação' (Immersive Web Environments in Education), exploring immersive web environments in education.",
              "Developed engaging projects highlighting how immersive web technologies can enhance educational experiences.",
              "Presented findings and showcased the StudySphere platform at the Students@DigiMedia#03 event.",
            ]}
          />
        </Section>

        <div className="print:break-inside-avoid">
          <Section title="Projects">
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
              role="Front-End Developer | UX/UI Designer"
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
              role="Front-End Developer | UX/UI Designer"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <div>
            <Section title="Education">
              <div className="mb-4">
                <h3 className="font-semibold">Web Communication and Technologies | Master's degree</h3>
                <p className="text-sm text-muted-foreground">Universidade de Aveiro | 09/2023 – 12/2025</p>
              </div>
              <div>
                <h3 className="font-semibold">Audiovisual and Communication Technology | Undergraduate degree</h3>
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
                {["WordPress", "Bedrock", "Blade", "Figma", "SaaS", "Supabase", "Docker", "GitHub", "Tailwind", "Laravel", "DBeaver", "Vue.js"].map((s) => (
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
