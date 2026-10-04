import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/content/contact"
import { projects } from "@/lib/content/projects"
import { absoluteUrl, htmlLang, localePath, SITE_URL, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

// Schema.org JSON-LD built only from facts already published on the site.
// Person (not LocalBusiness/ProfessionalService): Daniela is an individual
// developer looking for a role — there is no business entity, address,
// opening hours or service catalogue to describe, and inventing them would be
// misleading. Projects are CreativeWork (no public source repos to point a
// SoftwareSourceCode at).

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

const SAME_AS = [
  GITHUB_URL,
  LINKEDIN_URL,
  "https://danielapv.myportfolio.com/",
  "https://www.instagram.com/danizmusic/",
]

const KNOWS_ABOUT = [
  "Front-end development",
  "UI/UX design",
  "Design systems",
  "Accessibility",
  "Next.js",
  "React",
  "TypeScript",
  "Vue.js",
  "Tailwind CSS",
  "Framer Motion",
  "Laravel",
  "Figma",
]

function person(locale: Locale) {
  const t = getDictionary(locale)
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Daniela Silva",
    url: absoluteUrl(localePath(locale)),
    jobTitle: "Front-End Developer",
    description: t.meta.description,
    email: `mailto:${EMAIL}`,
    address: { "@type": "PostalAddress", addressLocality: "Porto", addressCountry: "PT" },
    worksFor: { "@type": "Organization", name: "Dyn-Link" },
    alumniOf: t.cv.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    award: t.cv.awards.map((a) => `${a.title} — ${a.issuer}`),
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ["pt-PT", "en"],
    sameAs: SAME_AS,
  }
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Daniela Silva",
    inLanguage: [htmlLang.en, htmlLang.pt],
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  }
}

export function homeJsonLd(locale: Locale) {
  const t = getDictionary(locale)
  const url = absoluteUrl(localePath(locale))
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      person(locale),
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: htmlLang[locale],
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        hasPart: projects.map((p) => ({
          "@type": "CreativeWork",
          name: p.title,
          ...(p.liveUrl && { url: p.liveUrl }),
          description: t.projects.items[p.id].description,
          dateCreated: p.year,
          ...(p.image && { image: absoluteUrl(p.image) }),
          keywords: p.tech.join(", "),
          creator: { "@id": PERSON_ID },
          ...(p.status === "in-progress" && { creativeWorkStatus: "In progress" }),
        })),
      },
    ],
  }
}

export function cvJsonLd(locale: Locale) {
  const t = getDictionary(locale)
  const home = absoluteUrl(localePath(locale))
  const url = absoluteUrl(localePath(locale, "/cv"))
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      person(locale),
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.cvTitle,
        description: t.meta.cvDescription,
        inLanguage: htmlLang[locale],
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.breadcrumb.home, item: home },
          { "@type": "ListItem", position: 2, name: t.breadcrumb.cv, item: url },
        ],
      },
    ],
  }
}
