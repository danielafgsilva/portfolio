import type { Dictionary } from "@/lib/i18n/dictionaries"

// Structural data only — role, description and awards are translated in the
// dictionary (projects.items[id]). Titles are proper names, not translated.
// Shared by the Projects section and the JSON-LD.
export type Project = {
  id: keyof Dictionary["projects"]["items"]
  index: string
  title: string
  year: string
  image: string
  tech: string[]
  status?: "live" | "in-progress"
  liveUrl?: string
  video?: string
  /** Scales the video up, anchored to the bottom, so the top edge gets cropped
   *  (useful when a screen recording has a browser URL bar at the top). */
  videoZoom?: number
}

export const projects: Project[] = [
  {
    id: "twovest",
    index: "01",
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
    index: "02",
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
    index: "03",
    title: "Dogwarts",
    year: "2025",
    image: "/images/dogwarts-cover.jpg",
    video: "/videos/dogwarts-video.mp4",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    status: "in-progress",
  },
]
