"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type MediaSize = "tall" | "med" | "short";
type MediaItem = { src: string; size: MediaSize };

type TimelineEntry = {
  type: "work" | "study";
  title: string;
  org: string;
  location?: string;
  bullets: string[];
  displayYear: string;
  /** Media (images or videos) to feature in the timeline gallery below the
   *  chronology. Vertical/portrait items should be "tall", horizontal images
   *  "med", and videos "short" (helps hide the URL bar crop). */
  media: MediaItem[];
};

const timeline: TimelineEntry[] = [
  // Work — reverse chronological
  {
    type: "work",
    title: "Full-Stack Developer · Project Manager",
    org: "Dyn-Link",
    location: "Aveiro, Portugal",
    bullets: [
      "Designed and shipped Plan4Marketing — a multi-tenant SaaS with a drag-and-drop email builder, campaigns, and contacts, served by one component library across many client brands.",
      "Led SEAC's migration to a component-first TypeScript architecture on the Front-End and shipped a Google Calendar integration.",
      "Rescued a broken Stripe integration on Scopphu — production payments stabilised.",
      "Stepped into Project Manager for the company's core software, running product workshops for international clients.",
    ],
    displayYear: "2025 - now",
    media: [
      // vertical / horizontal image / video / vertical / video / vertical
      { src: "/timeline/dyn/team - building.jpg", size: "tall" },
      { src: "/timeline/dyn/IMG_0272.jpg", size: "med" },
      { src: "/timeline/dyn/P4M - convention.mp4", size: "short" },
      { src: "/timeline/dyn/IMG_2389.jpg", size: "tall" },
      { src: "/timeline/dyn/Screen Recording 2026-08-20 at 15.22.23.mov", size: "short" },
      { src: "/timeline/dyn/post-dyn.png", size: "med" },
    ],
  },
  {
    type: "work",
    title: "Front-End Developer Internship",
    org: "Bliss Applications",
    location: "Porto, Portugal",
    bullets: [
      "Shipped every block of the marketing site from Figma design to pixel-perfect production — Hero, Why Bliss, Where We've Been, Scandinavian office, Quotes, and Brands.",
      "Rebuilt the project-card component pattern across the Projects pages for consistency and reuse.",
      "Documented every implementation to keep the component library maintainable for the team.",
    ],
    displayYear: "2024 — 2025",
    media: [
      // all horizontal here — vary med/short to keep rhythm
      { src: "/timeline/bliss/2. Introdução.png", size: "med" },
      { src: "/timeline/bliss/Screen Recording 2026-08-20 at 13.40.06.mov", size: "short" },
      { src: "/timeline/bliss/IMG_1287.jpeg", size: "med" },
      { src: "/timeline/bliss/IMG_1288.JPG", size: "short" },
    ],
  },
  {
    type: "work",
    title: "Research · Immersive Web",
    org: "Digital Media & Interaction Research Centre",
    location: "Aveiro, Portugal",
    bullets: [
      "Pitched the immersive-web education concept to the research centre and set up the codebase.",
      "Ran baseline user-research interviews and shaped the learning-experience blocks.",
      "Designed and prototyped the immersive VR environment for the StudySphere platform. Presented at Students@DigiMedia#03.",
      "Conducted manual VR usability testing across the experience.",
    ],
    displayYear: "2023 - 2024",
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
    type: "study",
    title: "Master's, Web Communication & Technologies",
    org: "Universidade de Aveiro",
    location: "Aveiro, Portugal",
    bullets: [
      "Focused on immersive environments, interaction design, and the human side of the web.",
      "Where Twovest grew from a brief into an award-winning platform — 2× recognition for design and execution.",
      "Trained the instincts that make me useful in the seam between design and code.",
    ],
    displayYear: "2023 - 2025",
    media: [
      // 1 vertical (tall) + 3 horizontals — anchor tall between shorter ones
      { src: "/timeline/mctw/file cover - 2.png", size: "tall" },
      { src: "/timeline/mctw/IMG_2573.jpg", size: "short" },
      { src: "/timeline/mctw/IMG_0122.jpeg", size: "med" },
      { src: "/timeline/mctw/Imagem WhatsApp 2024-05-29 às 20.42 1.png", size: "short" },
    ],
  },
  {
    type: "study",
    title: "Licentiate, Audiovisual & Communication Technology",
    org: "Escola Superior de Media Artes e Design",
    location: "Vila do Conde, Portugal",
    bullets: [
      "Where the eye for composition started — design, video, photography, sound.",
      "The foundation underneath every interface I build now: timing, hierarchy, rhythm.",
    ],
    displayYear: "2020 - 2023",
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

const traits = ["Proactive", "Empathic", "Collaborative", "Innovative"];

const EASE = [0.22, 1, 0.36, 1] as const;

// Scroll-linked word reveal — each word "lights up" as the user reads.
function ReadingWord({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      <span>&nbsp;</span>
    </motion.span>
  );
}

const QUOTE_TEXT =
  "I want to bridge technology and user experience — creating digital solutions that feel as considered as they look.";

function CinematicQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });
  const words = QUOTE_TEXT.split(" ");
  return (
    <div ref={ref}>
      {/* Intertitle label — sits above, no line beside it */}
      <div className="mb-4 sm:mb-5">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-cyan">
          intertitle
        </span>
      </div>

      {/* Quote with left border — line starts here, below the label */}
      <div className="border-l-2 border-cyan pl-6 sm:pl-8 lg:pl-12">
        <p
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground"
          aria-label={QUOTE_TEXT}
        >
          <span aria-hidden="true">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = Math.min(1, start + 1.5 / words.length);
              return (
                <ReadingWord
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </ReadingWord>
              );
            })}
          </span>
        </p>
      </div>
    </div>
  );
}

// Sticky-scroll chronology — one experience at a time inside a pinned viewport.
function ChronologySlide({
  entry,
  index,
  total,
  progress,
}: {
  entry: TimelineEntry;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const start = index * slice;
  const end = start + slice;
  // Cross-fade half-width: each slice boundary becomes a cross-fade zone shared
  // with the neighbour slide, so any scroll produces visible change (no dead scroll).
  const halfT = slice * 0.35;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacityFrames = isFirst
    ? [0, end - halfT, end + halfT]
    : isLast
      ? [start - halfT, start + halfT, 1]
      : [start - halfT, start + halfT, end - halfT, end + halfT];
  const opacityValues = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const yValues = isFirst ? [0, 0, -24] : isLast ? [24, 0, 0] : [24, 0, 0, -24];

  const opacity = useTransform(progress, opacityFrames, opacityValues);
  const y = useTransform(progress, opacityFrames, yValues);

  // Height map based on each media item's orientation. Verticals get the
  // full row height, horizontals sit in the middle band, videos stay short
  // (also helps hide the URL-bar crop). Pixelmatters-style variable-height
  // staircase with a shared bottom baseline.
  const HEIGHT_BY_SIZE: Record<MediaSize, string> = {
    tall: "h-full",
    med: "h-[70%]",
    short: "h-[52%]",
  };

  // Duplicated media for a seamless marquee loop — translating the row by
  // -50% brings the second copy exactly where the first started.
  const marqueeItems = [...entry.media, ...entry.media];

  return (
    <motion.div
      style={{ opacity, y, willChange: "transform, opacity" }}
      className="absolute inset-0 flex flex-col"
    >
      {/* Top — text block: year on the left, chapter content on the right. */}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-10 shrink-0">
        {/* Year — big display type, editorial-magazine style */}
        <div className="lg:col-span-4 flex flex-col">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-display font-bold leading-[0.9] tracking-[-0.045em] text-cyan/55 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {entry.displayYear}
          </span>
          <span
            className={`mt-3 sm:mt-4 self-start w-fit badge ${entry.type === "work" ? "badge-accent" : ""}`}
          >
            {entry.type === "work" ? "work" : "study"}
          </span>
        </div>

        {/* Content — right column */}
        <div className="lg:col-span-8 flex flex-col">
          <h3 className="font-display font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground leading-tight tracking-tight">
            {entry.title}
          </h3>

          <p className="mt-1 mono text-sm text-cyan">
            {entry.org}
            {entry.location && (
              <span className="text-ink-subtle"> · {entry.location}</span>
            )}
          </p>

          <ul className="mt-4 lg:mt-5 space-y-2 text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
            {entry.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-cyan mt-1.5 shrink-0" aria-hidden="true">
                  <span className="block h-1 w-1 bg-cyan rounded-full" />
                </span>
                <span className="text-pretty">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom — gallery: bottom-aligned marquee that auto-scrolls right→left
          continuously. Items overlap slightly (negative margins) and use
          heights driven by each item's own orientation, so verticals tower
          over horizontals for a Pixelmatters-style composition. */}
      {entry.media.length > 0 && (
        <div className="flex-1 min-h-0 mt-6 sm:mt-8 lg:mt-10 overflow-hidden">
          <ul
            className="flex items-end h-full animate-marquee-x"
            style={{
              // Longer loops for entries with more media.
              animationDuration: `${Math.max(30, entry.media.length * 6)}s`,
            }}
          >
            {marqueeItems.map((item, i) => (
              <li
                key={`${item.src}-${i}`}
                className={`shrink-0 ${HEIGHT_BY_SIZE[item.size]} ${i > 0 ? "-ml-3 sm:-ml-4 lg:-ml-6" : ""} rounded-xl overflow-hidden border border-rule bg-paper-tint shadow-sm`}
              >
                <MediaTile src={item.src} alt={`${entry.org} — media`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

// Video vs image detection based on extension.
const VIDEO_EXTS = new Set(["mp4", "mov", "webm", "m4v"]);
function isVideo(src: string): boolean {
  const ext = src.split(".").pop()?.toLowerCase() ?? "";
  return VIDEO_EXTS.has(ext);
}

function MediaTile({ src, alt }: { src: string; alt: string }) {
  const url = encodeURI(src);
  if (isVideo(src)) {
    return (
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        // Screen recordings usually have a browser URL bar at the top —
        // scale up from the bottom edge so only the site content is shown
        // and the chrome gets clipped by the tile's overflow-hidden.
        style={{ transform: "scale(1.14)", transformOrigin: "center bottom" }}
        className="block h-full w-auto max-w-none object-cover"
      />
    );
  }
  return (
    // Native <img> — timeline media has arbitrary aspect ratios and we want the
    // browser to keep each item at the row's height with natural width.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className="block h-full w-auto max-w-none object-cover"
    />
  );
}

function ChronologyPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: ref,
    offset: ["start start", "end 80%"],
  });
  // Spring-smoothed progress. All slides share this value so cross-fades feel
  // gently damped instead of tracking every raw scroll delta.
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 280,
    damping: 42,
    mass: 0.5,
    restDelta: 0.001,
  });
  const total = timeline.length;
  const scrollHeightVh = total * 55;
  return (
    <div
      ref={ref}
      style={{ height: `${scrollHeightVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-14 sm:top-16 lg:top-20 flex flex-col h-[calc(80vh-3.5rem)] sm:h-[calc(80vh-4rem)] lg:h-[calc(80vh-5rem)] bg-background pt-4 sm:pt-5 lg:pt-6 pb-4 sm:pb-5 lg:pb-6">
        {/* Section label — pinned to the top of the sticky area */}
        <div className="flex items-baseline gap-3 mb-3 sm:mb-4 lg:mb-5 shrink-0">
          <span className="eyebrow">chronology</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>

        {/* Stage — slides fill the remaining sticky area */}
        <div className="relative flex-1 min-h-0">
          {timeline.map((entry, i) => (
            <ChronologySlide
              key={entry.title + entry.displayYear}
              entry={entry}
              index={i}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- The Story chapter ---
// Three independent full-width blocks, wrapped in one <section id="story">
// so SceneProgress / SceneCounter still track the chapter.
export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const sectionLift = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="story"
      style={{ opacity: sectionOpacity, y: sectionLift }}
      className="relative"
    >
      {/* Block 1 — Chapter opener + Bio */}
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          {/* Header line */}
          <div className="flex items-baseline gap-3 mb-10">
            <span className="eyebrow">The Story</span>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          </div>

          {/* Block — Intertitle (aligned to container edge) */}
          <div className="py-4 sm:py-8 lg:py-12">
            <CinematicQuote />
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-10 lg:mt-14 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-ink-muted text-pretty"
          >
            <p>
              Hi — I&apos;m a junior full-stack developer with a strong
              front-end orientation. I build web experiences that pay attention
              to the person on the other side of the screen, and I lean on
              design literacy to do it well.
            </p>
            <p>
              My academic background runs through audiovisual technology and web
              communication — so I came into code already thinking in
              compositions, hierarchies, and rhythm. My internships have
              stretched that into shipping real software in real teams.
            </p>
            <ul className="flex flex-wrap gap-2 pt-4">
              {traits.map((t) => (
                <li key={t} className="badge">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Block 3 — Chronology (full container width). Each entry contains its
          own bottom-aligned Pixelmatters-style gallery of media. */}
      <div className="py-4 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <ChronologyPath />
        </div>
      </div>
    </motion.section>
  );
}
