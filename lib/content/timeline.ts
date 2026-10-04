import type { Dictionary } from "@/lib/i18n/dictionaries"

export type MediaSize = "tall" | "med" | "short";
export type MediaItem = { src: string; size: MediaSize };

// Structural data only — title, org, location, years and bullets are
// translated in the dictionary (story.timeline[id]).
export type TimelineEntry = {
  id: keyof Dictionary["story"]["timeline"];
  type: "work" | "study";
  /** Media (images or videos) to feature in the timeline gallery below the
   *  chronology. Vertical/portrait items should be "tall", horizontal images
   *  "med", and videos "short" (helps hide the URL bar crop). */
  media: MediaItem[];
};

export const timeline: TimelineEntry[] = [
  // Work — reverse chronological
  {
    id: "dyn",
    type: "work",
    media: [
      // vertical / horizontal image / video / vertical / video / vertical
      { src: "/timeline/dyn/team - building.jpg", size: "tall" },
      { src: "/timeline/dyn/IMG_0272.jpg", size: "med" },
      { src: "/timeline/dyn/P4M - convention.mp4", size: "short" },
      { src: "/timeline/dyn/IMG_2389.jpg", size: "tall" },
      { src: "/timeline/dyn/Screen Recording 2026-08-20 at 15.22.23.mp4", size: "short" },
      { src: "/timeline/dyn/post-dyn.jpg", size: "med" },
    ],
  },
  {
    id: "bliss",
    type: "work",
    media: [
      // all horizontal here — vary med/short to keep rhythm
      { src: "/timeline/bliss/introducao.png", size: "med" },
      { src: "/timeline/bliss/Screen Recording 2026-08-20 at 13.40.06.mp4", size: "short" },
      { src: "/timeline/bliss/IMG_1287.jpeg", size: "med" },
      { src: "/timeline/bliss/IMG_1288.JPG", size: "short" },
    ],
  },
  {
    id: "digimedia",
    type: "work",
    media: [
      // all 16:9 screenshots — alternate med / short for rhythm
      { src: "/timeline/studysphere/1.png", size: "med" },
      { src: "/timeline/studysphere/2.png", size: "short" },
      { src: "/timeline/studysphere/11.png", size: "med" },
      { src: "/timeline/studysphere/13.png", size: "short" },
    ],
  },
  // Study — reverse chronological
  {
    id: "mctw",
    type: "study",
    media: [
      // 1 vertical (tall) + 3 horizontals — anchor tall between shorter ones
      { src: "/timeline/mctw/file cover - 2.jpg", size: "tall" },
      { src: "/timeline/mctw/IMG_2573.jpg", size: "short" },
      { src: "/timeline/mctw/IMG_0122.jpeg", size: "med" },
      { src: "/timeline/mctw/whatsapp-2024-05-29.jpg", size: "short" },
    ],
  },
  {
    id: "tcav",
    type: "study",
    media: [
      // 1 vertical anchor + horizontals + 1 video, alternating heights
      { src: "/timeline/tcav/3a631b88-bbf6-4fb7-86c2-9643d336b9b0.JPG", size: "tall" },
      { src: "/timeline/tcav/DSC_0011.JPG", size: "med" },
      { src: "/timeline/tcav/IMG_0300.mp4", size: "short" },
      { src: "/timeline/tcav/DSC_0195.JPG", size: "med" },
      { src: "/timeline/tcav/af986686-1fe9-44bc-a331-515f90990492.JPG", size: "short" },
    ],
  },
];
