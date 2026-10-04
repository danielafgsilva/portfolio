import type { Dictionary } from "@/lib/i18n/dictionaries"

// Structural data only — role, description and awards are translated in the
// dictionary (projects.items[id]). Titles are proper names, not translated.
// Shared by the Projects section and the JSON-LD.
export type Project = {
  id: keyof Dictionary["projects"]["items"]
  title: string
  year: string
  /** Cover / video poster. Optional: projects without one get a styled
   *  "in development" frame instead. */
  image?: string
  tech: string[]
  /** "in-progress" = still in development: never presented as finished. */
  status?: "live" | "in-progress"
  /** Public URL — optional (unreleased projects have none; never invent one). */
  liveUrl?: string
  video?: string
  /** Scales the video up, anchored to the bottom, so the top edge gets cropped
   *  (useful when a screen recording has a browser URL bar at the top). */
  videoZoom?: number
}

export const projects: Project[] = [
  {
    id: "twovest",
    title: "Twovest",
    year: "2024",
    image: "/images/twovest-cover.jpg",
    video: "/videos/twovest-video.mp4",
    videoZoom: 1.12,
    tech: ["Next.js", "Tailwind CSS", "Redux Toolkit", "Supabase", "Figma"],
    status: "live",
    liveUrl: "https://twovest.com/",
  },
  {
    id: "gomes",
    title: "Gomes Rego & Associados",
    year: "2024",
    image: "/images/gomes-rego-cover.jpg",
    video: "/videos/gomes-video.mp4",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    status: "live",
    liveUrl: "https://grasroc.pt/",
  },
  {
    id: "dogwarts",
    title: "Dogwarts",
    year: "2025",
    image: "/images/dogwarts-cover.jpg",
    video: "/videos/dogwarts-video.mp4",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    status: "in-progress",
  },
  {
    id: "eperfil",
    title: "e+Perfil",
    year: "2026",
    image: "/images/eperfil-cover.jpg",
    tech: ["React", "Vite", "Tailwind CSS"],
    status: "in-progress",
    liveUrl: "https://e-perfil.vercel.app/",
  },
  {
    // No definitive URL yet — no link and no cover until there is one.
    id: "officium",
    title: "Offici'um",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    status: "in-progress",
  },
]
