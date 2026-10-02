import type React from "react";
import type { Metadata } from "next";
import { Github, Linkedin, Mail, Phone, Globe, MapPin } from "lucide-react";
import { DownloadCVButton } from "./download-button";
import { AnimatedSection } from "./animated-section";
import { LanguageSwitcher } from "@/components/language-switcher";
import { alternatesFor, isLocale, localePath, ogLocale, SITE_URL, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    title: t.cvTitle,
    description: t.cvDescription,
    alternates: alternatesFor(lang, "/cv"),
    openGraph: {
      title: t.cvTitle,
      description: t.cvDescription,
      url: alternatesFor(lang, "/cv").canonical,
      locale: ogLocale[lang],
    },
  };
}

// Technologies per entry — not translated, so they stay out of the dictionary.
const STACKS: Record<string, string[]> = {
  bliss: ["WordPress Headless", "PHP", "Blade", "Sass", "Bedrock", "Sage", "Gutenberg", "Figma", "GitHub", "Azure DevOps"],
  twovest: ["Next.js", "Tailwind CSS", "Supabase", "Figma", "Vercel", "Docker", "GitHub"],
  gomes: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
  dogwarts: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
};

const SKILLS = {
  frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Vue.js", "HTML", "CSS", "Tailwind CSS", "Sass", "Framer Motion"],
  backend: ["PHP", "Laravel", "Supabase", "MySQL", "DBeaver", "WordPress", "Bedrock", "Blade", "Sage", "Gutenberg", "GitHub", "Vercel", "Docker", "Azure DevOps"],
};

const ExperienceItem = ({
  role,
  company,
  date,
  location,
  description,
  status,
  stack,
}: {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string[];
  link?: string;
  status?: string;
  stack?: string[];
}) => (
  <div className="mb-6 print:mb-5 last:mb-0 pb-6 print:pb-5 border-b border-rule last:border-b-0 print:break-inside-avoid">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
      <h3 className="font-display font-semibold text-lg text-foreground leading-tight">
        {role}
      </h3>
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
    {stack && stack.length > 0 && (
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <li
            key={s}
            className="inline-flex items-center font-mono text-xs font-medium px-2.5 py-1 rounded-md border border-rule text-ink-muted bg-transparent"
          >
            {s}
          </li>
        ))}
      </ul>
    )}
    {status && <span className="badge badge-accent">{status}</span>}
  </div>
);

export default async function CVPage({ params }: { params: Params }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getDictionary(locale);
  const cv = t.cv;
  const tools = t.toolbox.tools;

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-14 bg-background text-foreground font-sans">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <LanguageSwitcher />
        <DownloadCVButton />
      </div>

      <div id="cv-print-content">
        {/* Header */}
        <header className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-6 sm:gap-8 mb-10 print:mb-6 pb-8 border-b border-rule items-end">
          <div>
            <p className="eyebrow mb-2">{cv.eyebrow}</p>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground tracking-tight leading-[0.95]">
              Daniela Silva<span className="text-cyan">.</span>
            </h1>
            <p className="mt-4 mono text-sm text-ink-muted">{cv.tagline}</p>
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
                href={`${SITE_URL}${localePath(locale)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-end gap-2 hover:text-cyan transition-colors"
              >
                <Globe size={12} strokeWidth={1.75} /> {cv.contactPortfolio}
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
        <AnimatedSection title={cv.sections.about}>
          <p className="text-base leading-relaxed text-ink-muted text-pretty max-w-3xl">{cv.about}</p>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection title={cv.sections.experience}>
          {Object.entries(cv.experience).map(([id, e]) => (
            <ExperienceItem
              key={id}
              role={e.role}
              company={e.company}
              date={e.date}
              location={e.location}
              description={e.bullets}
              stack={STACKS[id]}
            />
          ))}
        </AnimatedSection>

        {/* Projects — Twovest first as the flagship design-eng story */}
        <AnimatedSection title={cv.sections.projects}>
          {Object.entries(cv.projects).map(([id, e]) => (
            <ExperienceItem
              key={id}
              role={e.role}
              company={e.company}
              date={e.date}
              location={e.location}
              description={e.bullets}
              stack={STACKS[id]}
              status={id === "dogwarts" ? cv.inProgress : undefined}
            />
          ))}
        </AnimatedSection>

        {/* Two-column: Education + Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 print:break-inside-avoid">
          <AnimatedSection title={cv.sections.education}>
            <div className="space-y-5">
              {cv.education.map((e) => (
                <div key={e.title}>
                  <h3 className="font-display font-semibold text-base text-foreground leading-tight">{e.title}</h3>
                  <p className="mt-1 mono text-xs text-cyan">{e.school}</p>
                  <p className="mono text-xs text-ink-subtle">{e.date}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection title={cv.sections.awards}>
            <div className="space-y-5">
              {cv.awards.map((a) => (
                <div key={a.title}>
                  <h3 className="font-display font-semibold text-base text-foreground leading-tight">{a.title}</h3>
                  <p className="mt-1 mono text-xs text-cyan">{a.issuer}</p>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">{a.detail}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Skills */}
        <AnimatedSection title={cv.sections.skills}>
          <div className="space-y-5">
            {[
              { label: cv.skillGroups.frontend, items: SKILLS.frontend },
              {
                label: cv.skillGroups.design,
                items: ["Figma", tools.designSystems, tools.componentLibraries, tools.userResearch, tools.prototyping, tools.accessibility],
              },
              { label: cv.skillGroups.backend, items: SKILLS.backend },
              { label: cv.skillGroups.languages, items: [tools.portuguese, tools.english] },
            ].map((group) => (
              <div key={group.label}>
                <p className="eyebrow mb-3">{group.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li key={s} className="badge">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
