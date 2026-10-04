import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/content/contact"
import { projects } from "@/lib/content/projects"
import { absoluteUrl, localePath } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

// llms.txt (https://llmstxt.org): a plain-markdown summary for LLM crawlers,
// generated from the English dictionary so it never drifts from the site.
export const dynamic = "force-static"


export function GET() {
  const t = getDictionary("en")
  const pt = getDictionary("pt")
  const lines = [
    "# Daniela Silva",
    "",
    `> ${t.meta.description}`,
    "",
    `${t.hero.intro.replace(/\*/g, "")} ${t.story.bio.join(" ")}`,
    "",
    "## Pages",
    "",
    `- [Portfolio (English)](${absoluteUrl(localePath("en"))}): ${t.meta.description}`,
    `- [Portfólio (Português)](${absoluteUrl(localePath("pt"))}): ${pt.meta.description}`,
    `- [CV (English)](${absoluteUrl(localePath("en", "/cv"))}): ${t.meta.cvDescription}`,
    `- [CV (Português)](${absoluteUrl(localePath("pt", "/cv"))}): ${pt.meta.cvDescription}`,
    "",
    "## Selected work",
    "",
    ...projects.map((p) => {
      const copy = t.projects.items[p.id]
      const name = p.liveUrl ? `[${p.title}](${p.liveUrl})` : p.title
      const status = p.status === "in-progress" ? ", in progress" : ""
      return `- ${name} (${p.year}${status}) — ${copy.role}. ${copy.description} Stack: ${p.tech.join(", ")}.`
    }),
    "",
    "## Experience and education",
    "",
    ...Object.values(t.story.timeline).map((e) => `- ${e.title} — ${e.org}, ${e.location} (${e.years}). ${e.bullets[0]}`),
    "",
    "## Contact",
    "",
    `- Email: ${EMAIL}`,
    `- [GitHub](${GITHUB_URL})`,
    `- [LinkedIn](${LINKEDIN_URL})`,
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
