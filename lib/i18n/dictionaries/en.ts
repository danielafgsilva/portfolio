// English — the original copy and the source of truth for the dictionary
// shape (`Dictionary`). Proper names, technologies and project names are not
// translated. `*word*` marks the accented/emphasised part of a sentence
// (rendered by `rich()`); `{name}` is an interpolation slot (`fmt()`).
// " ·" glues a middot to the previous word so it never wraps alone.

const en = {
  meta: {
    title: "Daniela Silva — Front-End & Full-Stack Developer",
    description:
      "Portfolio of Daniela Silva — front-end-leaning full-stack developer based in Porto, Portugal. Selected work in Next.js, React, Vue and Laravel.",
    cvTitle: "CV — Daniela Silva, Front-End Developer",
    cvDescription:
      "Curriculum vitae of Daniela Silva, front-end developer in Porto, Portugal: experience at Dyn-Link and Bliss Applications, projects, education, awards and skills.",
    notFoundTitle: "Page not found — Daniela Silva",
    errorTitle: "Something went wrong — Daniela Silva",
    ogImageAlt: "Daniela Silva — Front-End Developer and Design Engineer",
    cvOgImageAlt: "Curriculum vitae — Daniela Silva",
  },

  breadcrumb: {
    label: "Breadcrumb",
    home: "Home",
    cv: "CV",
  },

  nav: {
    language: "Language",
    languageNames: { en: "English", pt: "Português (Portugal)" },
    sections: "Section navigation",
    chapter: "Chapter {num} — {label}",
    chapters: {
      home: "Index",
      work: "Work",
      story: "Story",
      toolbox: "Toolbox",
      offDuty: "Off Duty",
      contact: "Contact",
    },
    skip: "Skip to content",
    backToTop: "Back to top",
    backToTopShort: "back to top",
  },

  loader: {
    hi: "Hi",
    name: "I'm Daniela",
    findOut: "Find out what I'm up to",
    roles: ["Front-End Developer", "Design Engineer"],
  },

  hero: {
    // Full H1 for crawlers and screen readers; the visible mark is "Daniela."
    heading: "Daniela Silva — Front-End Developer and Design Engineer",
    intro:
      "I build *user-centered* web experiences, bridging the gap between technology and the people using it.",
    meta: {
      role: { label: "ROLE", value: "Front-End Developer · Design Engineer" },
      based: { label: "BASED", value: "Porto, Portugal" },
      status: { label: "STATUS", value: "Open to opportunities" },
      stack: { label: "STACK", value: "Next.js · React · Vue · Laravel" },
    },
  },

  projects: {
    eyebrow: "Selected Work",
    stack: "stack",
    visitSite: "Visit site",
    live: "live",
    inDevelopment: "In development",
    viewPreview: "View preview",
    previewSoon: "Preview coming soon",
    previous: "Previous project",
    next: "Next project",
    goTo: "Go to project {n}: {title}",
    pause: "Pause auto-play",
    resume: "Resume auto-play",
    coverAlt: "{title} project cover",
    items: {
      twovest: {
        role: "UI/UX Design & Front-End Development",
        description:
          "A second-hand fashion platform built to make sustainable consumption the obvious choice. Designed the full experience in Figma, then shipped the interface in Next.js with Supabase as the backbone. Won two awards for design and execution.",
        awards: [
          { title: "Academy Award · Media Play", issuer: "University of Aveiro, 2024" },
          { title: "Best Project 2023/2024", issuer: "Mindera × Master's Programme" },
        ],
      },
      gomes: {
        role: "Web Design & Development",
        description:
          "A professional site for a law firm needing to signal credibility online. Designed for clarity — clean information architecture, considered typography, responsive across every breakpoint, and clear calls-to-action that translated into measurable inquiry lift.",
        awards: [] as { title: string; issuer: string }[],
      },
      dogwarts: {
        role: "Full-Stack Development",
        description:
          "A canine-care marketplace connecting dog owners with service providers. Role-based UI built with Next.js and TypeScript, with Sanity CMS powering editorial content. Currently in active development.",
        awards: [] as { title: string; issuer: string }[],
      },
      eperfil: {
        role: "Web Design & Front-End Development",
        description:
          "A new website for e+Perfil, an aluminium-systems manufacturer in Vila do Conde. Built around the people behind the service — a dedicated sales team, in-house stock and finishing — for the installers who rely on them. Currently in development.",
        awards: [] as { title: string; issuer: string }[],
      },
      officium: {
        role: "Web Design & Development",
        description:
          "A website for Offici'um, an accounting and business-consulting firm — from bookkeeping and tax support to company formation and HR, with a recruitment area for candidates. Currently in development.",
        awards: [] as { title: string; issuer: string }[],
      },
    },
  },

  story: {
    eyebrow: "The Story",
    intertitle: "intertitle",
    quote:
      "Bridging technology and user experience — creating digital solutions that feel as considered as they look.",
    bio: [
      "Hi — I'm a junior full-stack developer with a strong front-end orientation. I build web experiences that pay attention to the person on the other side of the screen, and I lean on design literacy to do it well.",
      "My academic background runs through audiovisual technology and web communication — so I came into code already thinking in compositions, hierarchies, and rhythm. My internships have stretched that into shipping real software in real teams.",
    ],
    traits: ["Proactive", "Empathic", "Collaborative", "Innovative"],
    chronology: "chronology",
    pauseMotion: "Pause gallery motion",
    badges: { work: "work", study: "study" },
    timeline: {
      dyn: {
        title: "Full-Stack Developer · Project Manager",
        org: "Dyn-Link",
        location: "Aveiro, Portugal",
        years: "2025 - now",
        bullets: [
          "Designed and shipped Plan4Marketing — a multi-tenant SaaS with a drag-and-drop email builder, campaigns, and contacts, served by one component library across many client brands.",
          "Led SEAC's migration to a component-first TypeScript architecture on the Front-End and shipped a Google Calendar integration.",
          "Rescued a broken Stripe integration on Scopphu — production payments stabilised.",
          "Stepped into Project Manager for the company's core software, running product workshops for international clients.",
        ],
      },
      bliss: {
        title: "Front-End Developer Internship",
        org: "Bliss Applications",
        location: "Porto, Portugal",
        years: "2024 — 2025",
        bullets: [
          "Shipped every block of the marketing site from Figma design to pixel-perfect production — Hero, Why Bliss, Where We've Been, Scandinavian office, Quotes, and Brands.",
          "Rebuilt the project-card component pattern across the Projects pages for consistency and reuse.",
          "Documented every implementation to keep the component library maintainable for the team.",
        ],
      },
      digimedia: {
        title: "Research · Immersive Web",
        org: "Digital Media & Interaction Research Centre",
        location: "Aveiro, Portugal",
        years: "2023 - 2024",
        bullets: [
          "Pitched the immersive-web education concept to the research centre and set up the codebase.",
          "Ran baseline user-research interviews and shaped the learning-experience blocks.",
          "Designed and prototyped the immersive VR environment for the StudySphere platform. Presented at Students@DigiMedia#03.",
          "Conducted manual VR usability testing across the experience.",
        ],
      },
      mctw: {
        title: "Master's, Web Communication & Technologies",
        org: "Universidade de Aveiro",
        location: "Aveiro, Portugal",
        years: "2023 - 2025",
        bullets: [
          "Focused on immersive environments, interaction design, and the human side of the web.",
          "Where Twovest grew from a brief into an award-winning platform — 2× recognition for design and execution.",
          "Trained the instincts that make me useful in the seam between design and code.",
        ],
      },
      tcav: {
        title: "Licentiate, Audiovisual & Communication Technology",
        org: "Escola Superior de Media Artes e Design",
        location: "Vila do Conde, Portugal",
        years: "2020 - 2023",
        bullets: [
          "Where the eye for composition started — design, video, photography, sound.",
          "The foundation underneath every interface I build now: timing, hierarchy, rhythm.",
        ],
      },
    },
  },

  toolbox: {
    eyebrow: "Toolbox",
    groups: {
      frontend: {
        label: "Front-End",
        description:
          "The layer where craft meets code — components, motion, and pixel-precise interfaces.",
      },
      design: {
        label: "Design & UX",
        description:
          "Where thinking starts before code — research, prototypes, and the systems that hold a product together.",
      },
      backend: {
        label: "Back-End & Tools",
        description:
          "The scaffolding that makes shipping possible — APIs, data, deploys, and the environments in between.",
      },
      languages: {
        label: "Languages",
        description: "Communication is a craft too — for people and for machines.",
      },
    },
    // Concepts (not product names), so they translate.
    tools: {
      designSystems: "Design Systems",
      componentLibraries: "Component Libraries",
      userResearch: "User Research",
      prototyping: "Prototyping",
      accessibility: "Accessibility",
      portuguese: "Portuguese (Native)",
      english: "English (Professional)",
    },
  },

  offDuty: {
    eyebrow: "Off Duty",
    title: "What I do when I'm *not* coding.",
    intro:
      "The shorthand version of a longer truth: I'm more useful to a team when I'm a full person, not just a developer. Here's where the rest of me lives.",
    volunteering: {
      eyebrow: "volunteering · a value, not a footnote",
      text: "Food collection with the Food Bank Against Hunger — organising and gathering donations so neighbours don't go hungry.",
      location: "Porto, Portugal",
    },
    viewPortfolio: "View portfolio",
    photoAlt:
      "Daniela's photography portfolio cover — 'Hello, welcome to my corner of the world'",
    featured: "featured",
    pursuits: {
      photography: {
        name: "Photography",
        kicker: "visual practice · portfolio →",
        detail:
          "The eye I bring to interfaces comes from years behind a camera. Frames, light, the patience to wait for it.",
      },
      football: {
        name: "Football",
        kicker: "4th national division",
        detail:
          "Competing at the national level — where I learned that teams beat lone stars, every time.",
      },
      padel: {
        name: "Padel",
        kicker: "weekly ritual",
        detail:
          "The other racquet. Picked up between dev sprints — quick rallies, sharper reflexes.",
      },
      music: {
        name: "Music",
        kicker: "@danizmusic",
        detail:
          "I sing. The other place I think about timing, tone, and what an audience actually needs to feel.",
      },
    },
  },

  contact: {
    eyebrow: "Get in Touch",
    status: "Currently open to opportunities",
    title: "Let's build *something* worth shipping.",
    body: "Looking for a junior front-end developer or design engineer who cares about the craft? I'd love to hear about the role, the team, and what you're building!",
    download: "download",
    cv: "View / Download CV",
    channels: "channels",
    emailSubject: "Hello Daniela",
  },

  footer: {
    navLabel: "Site",
    development: "development",
    builtBy: "Designed & built by Daniela Silva.",
    edition: "edition",
  },

  cv: {
    eyebrow: "curriculum vitae",
    tagline: "Design Engineer · Front-End Developer",
    download: "Download CV as PDF",
    generating: "Generating PDF...",
    downloadError: "Failed to download PDF. Please try again.",
    pdfFilename: "Daniela_Silva_CV.pdf",
    contactPortfolio: "portfolio",
    sections: {
      about: "about",
      experience: "professional experience",
      projects: "projects",
      education: "education",
      awards: "awards",
      skills: "skills",
    },
    skillGroups: {
      frontend: "front-end",
      design: "design & UX",
      backend: "back-end & tools",
      languages: "languages",
    },
    about:
      "Front-End developer who thinks like a designer and edits like a filmmaker. My audiovisual background isn't a past life — it's how I reason about timing, rhythm, and hierarchy, the same instincts that make a scene land make a component land. I ship pixel-perfect, component-first UI in Next.js, React, and TypeScript, live in Figma, and care about the details a good interaction hides: motion timing, typographic detail, accessibility, state transitions. Happiest at the seam between design and code.",
    inProgress: "In Progress",
    experience: {
      dyn: {
        role: "Full-Stack Developer · Project Manager",
        company: "Dynamikfloat | Dyn-Link",
        date: "08/2025 — now",
        location: "Aveiro, Portugal",
        bullets: [
          "Contributed to multiple software development projects.",
          "Stepped into the role of Project Manager for the company's core software, leading delivery for international clients.",
          "Joined the support team and conducted workshops across all of the company's software products for international clients.",
          "Strengthened skills in Back-End development by working with Laravel (REST APIs, business logic, and database interactions) and used DBeaver to manage data.",
          "Worked with Vue.js on the Front-End to build and integrate components with Back-End services, gaining hands-on experience in full-stack workflows, best practices, and team-based development.",
          "Performed QA across selected projects, prepared technical and process documentation, and collaborated with the design team on small tasks such as newsletters and social media posts.",
        ],
      },
      bliss: {
        role: "Front-End Developer Internship",
        company: "Bliss Applications",
        date: "12/2024 — 06/2025",
        location: "Porto, Portugal",
        bullets: [
          "Created the company website, which served as a foundation for the online presence and showcased the company's services effectively.",
          "Developed the website using WordPress, PHP, Sass, HTML and JavaScript, helping to meet diverse needs and improve their online visibility.",
          "Enhanced the user experience and functionality, leading to increased satisfaction and engagement.",
        ],
      },
      digimedia: {
        role: "Research in Immersive Web Environments",
        company: "Digital Media and Interaction Research Centre",
        date: "11/2023 — 07/2024",
        location: "Aveiro, Portugal",
        bullets: [
          "Pitched the immersive-web education concept to the research centre and set up the codebase.",
          "Ran baseline user-research interviews and shaped the learning-experience blocks.",
          "Designed and prototyped the immersive VR environment for the StudySphere platform. Presented at Students@DigiMedia#03.",
          "Conducted manual VR usability testing across the experience.",
        ],
      },
    },
    projects: {
      twovest: {
        role: "Front-End Developer · UX/UI Designer",
        company: "Twovest",
        date: "07/2024",
        location: "Aveiro, Portugal",
        bullets: [
          "Ran UX interviews for the first prototype and translated the findings into a component-first design system for the platform.",
          "Designed and shipped the homepage slider, the Profile page, and the (front-end) Purchase Process — one of the primary user flows.",
          "Prototyped the backoffice (unlaunched), the delivery-point page, brand pages, and the look-submission flow.",
          "Built the MediaPlay Showcase landing page and a library of reusable, pixel-precise components.",
          "Implemented components as a Front-End developer and performed manual QA on live builds.",
          "Pitched the project to professors, the Mindera engineering team, and the Showcase audience — a full end-to-end product story from research to launch.",
        ],
      },
      gomes: {
        role: "Front-End Developer · UX/UI Designer",
        company: "Gomes Rego & Associados Website",
        date: "12/2024",
        location: "Porto, Portugal",
        bullets: [
          "Designed and built a credibility-first professional site with a considered, clarity-driven information architecture.",
          "Implemented responsive, motion-rich UI with Framer Motion — pixel-perfect across every breakpoint.",
          "Delivered clear calls-to-action that translated into a measurable lift in client inquiries.",
        ],
      },
      dogwarts: {
        role: "Full-Stack Developer",
        company: "Dogwarts Website",
        date: "08/2025",
        location: "Porto, Portugal",
        bullets: [
          "Modern website for a canine-care service — built with a component-first architecture designed to scale to more service categories.",
          "Role-based UI (owners vs. providers) with Sanity CMS powering editorial content.",
        ],
      },
    },
    education: [
      {
        title: "Master's, Web Communication & Technologies",
        school: "Universidade de Aveiro",
        date: "09/2023 — 12/2025",
      },
      {
        title: "Licentiate, Audiovisual & Communication Technology",
        school: "Escola Superior de Media Artes e Design",
        date: "10/2020 — 07/2023",
      },
    ],
    awards: [
      {
        title: "Academy Award",
        issuer: "University of Aveiro · 07/2024",
        detail:
          "For the Twovest Project, recognizing contributions to sustainable fashion technology.",
      },
      {
        title: "Best Project 2023/2024",
        issuer: "Mindera · 07/2024",
        detail: "For the Twovest Project, highlighting excellence in design and user experience.",
      },
    ],
  },

  // Error pages borrow the film-set voice of the bio ("edits like a filmmaker").
  notFound: {
    code: "404",
    eyebrow: "scene missing",
    title: "Cut! This scene didn't make the final edit.",
    body: "The page you're looking for was moved, renamed, or never shot. The good takes are still here:",
    back: "Back to home",
    suggestionsLabel: "Suggested pages",
    suggestions: { work: "Selected work", story: "The story", contact: "Get in touch", cv: "CV" },
  },

  error: {
    code: "500",
    eyebrow: "take two",
    title: "Something broke on set.",
    body: "An unexpected error interrupted this page. It's usually a one-off — try again, or head back home.",
    retry: "Try again",
    back: "Back to home",
    reference: "Reference",
  },
}

export type Dictionary = typeof en
export default en
