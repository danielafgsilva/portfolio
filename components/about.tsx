"use client";

import { useEffect, useRef, useState } from "react";
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
  "Bridging technology and user experience — creating digital solutions that feel as considered as they look.";

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
  // Raise the more visible slide during cross-fades so a fading slide's
  // images can't sit on the incoming slide's text. 0.45 threshold gives the
  // incoming slide priority slightly before it crosses the midpoint.
  const zIndex = useTransform(opacity, (o) => (o > 0.45 ? 2 : 1));

  // Tile classes — driven by row height + aspect ratio so widths follow
  // heights (no fixed min-widths that fight the rhythm on small phones).
  // Med/short use `self-end` so their tops rise from a shared bottom
  // baseline for the Pixelmatters staircase feel.
  const TILE_CLASS: Record<MediaSize, string> = {
    tall: "h-full aspect-[3/4]",
    med: "h-[80%] aspect-[4/3] self-end",
    short: "h-[62%] aspect-[16/9] self-end",
  };

  // Marquee copies — measured at runtime so the row is always at least twice
  // as wide as the gallery viewport. Otherwise a short media list (5 tiles
  // on ESMAD, e.g.) leaves visible dead space on wide screens where you can
  // see the "end" of the loop before the next copy comes in.
  const rowRef = useRef<HTMLUListElement | null>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const compute = () => {
      const ul = rowRef.current;
      const parent = ul?.parentElement;
      if (!ul || !parent) return;
      const viewportW = parent.offsetWidth;
      const mediaCount = entry.media.length;
      if (mediaCount === 0 || ul.children.length < 2 * mediaCount) return;
      // Distance between start of first copy and start of second copy is one
      // copy's rendered width (including tile overlaps). Independent of the
      // current `copies` value, so no feedback loop.
      const tile0 = ul.children[0] as HTMLElement;
      const tileN = ul.children[mediaCount] as HTMLElement;
      const singleCopyW = tileN.offsetLeft - tile0.offsetLeft;
      if (singleCopyW <= 0) return;
      // Row width ≥ 2× viewport so the second copy is always in place by
      // the time the first scrolls fully off — no visible seam.
      const needed = Math.max(2, Math.ceil((viewportW * 2) / singleCopyW));
      if (needed !== copies) setCopies(needed);
    };
    compute();
    const parent = rowRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(compute);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [copies, entry.media.length]);

  const marqueeItems = Array.from({ length: copies }, () => entry.media).flat();
  const shiftPct = 100 / copies;

  return (
    <motion.div
      style={{ opacity, y, zIndex, willChange: "transform, opacity" }}
      className="absolute inset-0 flex flex-col min-h-0 gap-3 sm:gap-4 lg:gap-5"
    >
      {/* Top — text block: flex-1 so it takes whatever room is left after
          the gallery below claims its share. Never grows into the gallery
          because it's a sibling in a flex column, not a layered element.
          bg-background + isolate guarantee the text always paints over the
          gallery zone even if a browser fails to clip a stray overflow. */}
      <div className="chronology-text relative z-10 flex-1 min-h-0 overflow-hidden flex flex-col bg-background isolate">
        {/* Inner grid — year on the left, content on the right. h-full so it
            fills the text zone; the outer wrapper's overflow-hidden clips
            any content that exceeds. */}
        <div className="grid gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-x-10 min-h-0 h-full">
          {/* Year — big display type, editorial-magazine style */}
          <div className="lg:col-span-4 flex flex-col">
            <span
              aria-hidden="true"
              className="chronology-year pointer-events-none select-none font-display font-bold leading-[0.9] tracking-[-0.045em] text-cyan/55 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {entry.displayYear}
            </span>
            <span
              className={`chronology-badge mt-2 sm:mt-4 self-start w-fit badge ${entry.type === "work" ? "badge-accent" : ""}`}
            >
              {entry.type === "work" ? "work" : "study"}
            </span>
          </div>

          {/* Content — right column */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <h3 className="chronology-title font-display font-semibold text-lg sm:text-2xl lg:text-3xl text-foreground leading-tight tracking-tight">
              {entry.title}
            </h3>

            <p className="chronology-org mt-1 mono text-xs sm:text-sm text-cyan">
              {entry.org}
              {entry.location && (
                <span className="text-ink-subtle"> · {entry.location}</span>
              )}
            </p>

            {/* Mobile shows the two most recent bullets — the rest reveal on
                sm+ where the stage has room. On short viewports of any
                width the same rule kicks in (see globals.css). */}
            <ul className="chronology-bullets mt-2 sm:mt-3 lg:mt-5 space-y-1 sm:space-y-2 text-[11px] sm:text-sm lg:text-base text-ink-muted leading-snug sm:leading-relaxed max-w-3xl">
              {entry.bullets.map((b, i) => (
                <li
                  key={i}
                  className={`chronology-bullet flex gap-2 sm:gap-3 ${i >= 2 ? "hidden sm:flex" : ""}`}
                >
                  <span className="text-cyan mt-[6px] sm:mt-1.5 shrink-0" aria-hidden="true">
                    <span className="block h-1 w-1 bg-cyan rounded-full" />
                  </span>
                  <span className="text-pretty line-clamp-2 sm:line-clamp-none">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom — gallery: fixed fraction of the stage on every screen. On
          the shortest phones we drop to ~36% so the text zone above always
          holds the full content; sm+ (with more real estate) can afford the
          fuller 42%. Short-height viewports (Chromebooks, landscape phones,
          tablets in landscape) shrink further via .chronology-gallery in
          globals.css so the text zone never overflows. Tiles are sized by
          height + aspect ratio so their widths follow the row height. */}
      {entry.media.length > 0 && (
        <div className="chronology-gallery relative z-0 shrink-0 h-[min(36%,18rem)] sm:h-[42%] overflow-hidden -mx-6 sm:-mx-10 lg:-mx-16">
          <motion.ul
            ref={rowRef}
            className="flex items-end h-full"
            style={{ willChange: "transform" }}
            animate={{ x: ["0%", `-${shiftPct}%`] }}
            transition={{
              duration: Math.max(30, entry.media.length * 6),
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((item, i) => (
              <li
                key={`${item.src}-${i}`}
                className={`shrink-0 ${TILE_CLASS[item.size]} ${i > 0 ? "-ml-3 sm:-ml-4 lg:-ml-6" : ""} rounded-xl overflow-hidden border border-rule bg-paper-tint shadow-sm`}
              >
                <MediaTile src={item.src} alt={`${entry.org} — media`} />
              </li>
            ))}
          </motion.ul>
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
        className="block h-full w-full object-cover"
      />
    );
  }
  return (
    // Native <img> — the tile itself now dictates aspect ratio + height, so
    // the image just fills the tile with object-cover.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className="block h-full w-full object-cover"
    />
  );
}

function ChronologyPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: ref,
    offset: ["start start", "end 90%"],
  });
  // Snappy spring — high stiffness + light mass gives buttery cross-fades
  // without perceivable input lag on either desktop or touch devices.
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 420,
    damping: 55,
    mass: 0.3,
    restDelta: 0.0005,
  });
  const total = timeline.length;
  const scrollHeightVh = total * 55;
  return (
    <div
      ref={ref}
      style={{ height: `${scrollHeightVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-14 sm:top-16 lg:top-20 flex flex-col h-[calc(90dvh-3.5rem)] sm:h-[calc(90vh-4rem)] lg:h-[calc(90vh-5rem)] bg-background pt-4 sm:pt-5 lg:pt-6 pb-4 sm:pb-5 lg:pb-6">
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
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
    restDelta: 0.0005,
  });
  const sectionOpacity = useTransform(smoothProgress, [0, 1], [0.4, 1]);
  const sectionLift = useTransform(smoothProgress, [0, 1], [24, 0]);

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
          <div className="flex items-baseline gap-3 mb-6 sm:mb-8 lg:mb-10">
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
