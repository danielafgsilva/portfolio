"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image, { getImageProps } from "next/image";
import { AutoplayVideo } from "./autoplay-video";
import { useI18n } from "./i18n-provider";
import { fmt } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
} from "lucide-react";

// Structural data only — role, description and awards are translated in the
// dictionary (projects.items[id]). Titles are proper names, not translated.
type Project = {
  id: keyof Dictionary["projects"]["items"];
  index: string;
  title: string;
  year: string;
  image: string;
  tech: string[];
  status?: "live" | "in-progress";
  liveUrl?: string;
  video?: string;
  /** Scales the video up, anchored to the bottom, so the top edge gets cropped
   *  (useful when a screen recording has a browser URL bar at the top). */
  videoZoom?: number;
};

const projects: Project[] = [
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
];

const EASE = [0.22, 1, 0.36, 1] as const;
// Browser frame is 7/12 of the ≤1440px container on lg+, full width below.
const COVER_SIZES = "(min-width: 1440px) 780px, (min-width: 1024px) 55vw, 100vw";
const AUTO_ADVANCE_MS = 8000;

function ProjectInfo({ project }: { project: Project }) {
  const { t } = useI18n();
  const copy = t.projects.items[project.id];
  return (
    <>
      {/* Take shot log */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="eyebrow">{project.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight text-balance">
        {project.title}
      </h3>

      {/* Role */}
      <p className="mt-2 mono text-sm text-cyan">{copy.role}</p>

      {/* Description */}
      <p className="mt-5 text-base leading-relaxed text-ink-muted text-pretty">
        {copy.description}
      </p>

      {/* Awards */}
      {copy.awards.length > 0 && (
        <ul className="mt-5 space-y-2 border-l-2 border-cyan pl-4">
          {copy.awards.map((a) => (
            <li
              key={a.title}
              className="text-sm flex items-baseline gap-2"
            >
              <Award
                size={13}
                className="shrink-0 text-cyan translate-y-0.5"
                strokeWidth={1.75}
              />
              <div>
                <span className="font-medium text-foreground">
                  {a.title}
                </span>
                <span className="text-ink-subtle"> — {a.issuer}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Stack */}
      <div className="mt-6">
        <p className="eyebrow mb-3">{t.projects.stack}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="badge">
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Visit link */}
      {project.liveUrl && (
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 mono text-sm text-foreground border border-rule rounded-md px-3 py-2 hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"
        >
          {t.projects.visitSite}
          <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      )}
    </>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const { t } = useI18n();
  const total = projects.length;
  const current = projects[currentIndex];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  });
  // Spring-smoothed so the reveal glides even when the trackpad jitters.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
    restDelta: 0.0005,
  });
  const sectionOpacity = useTransform(smoothProgress, [0, 1], [0.4, 1]);
  const sectionLift = useTransform(smoothProgress, [0, 1], [24, 0]);

  // Video only loads/plays while the browser frame itself is on screen (it
  // sits below the fold on every viewport). Once the section is within a
  // viewport, warm every project's cover (low priority) so the poster is
  // ready before the frame scrolls in and when rotating projects.
  const frameColRef = useRef<HTMLDivElement | null>(null);
  const onScreen = useInView(frameColRef);
  const near = useInView(sectionRef, { once: true, margin: "100% 0px 100% 0px" });
  useEffect(() => {
    if (!near) return;
    // A detached <img> with the same srcset/sizes warms exactly the variant
    // next/image will request (a <link rel=preload> would warn when the later
    // projects aren't shown within a few seconds).
    for (const p of projects) {
      const { props } = getImageProps({ src: p.image, alt: "", fill: true, sizes: COVER_SIZES });
      const img = new window.Image();
      img.fetchPriority = "low";
      img.sizes = props.sizes ?? "";
      img.srcset = props.srcSet ?? "";
      img.src = props.src;
    }
  }, [near]);

  // Auto-advance timer — resets on index change or pause change.
  // Progress is a motion value driving scaleX on the track below, so the bar
  // animates every frame without re-rendering this section. Pausing stops it
  // where it is; resuming restarts from 0 (same as the timer).
  useEffect(() => {
    if (paused) return;
    progress.set(0);
    const fill = animate(progress, 1, {
      duration: AUTO_ADVANCE_MS / 1000,
      ease: "linear",
    });

    const advance = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => {
      fill.stop();
      clearTimeout(advance);
    };
  }, [currentIndex, paused, total, progress]);

  const goTo = (idx: number) => {
    const next = ((idx % total) + total) % total;
    setCurrentIndex(next);
    progress.set(0);
  };
  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  return (
    <motion.section
      ref={sectionRef}
      id="work"
      style={{ opacity: sectionOpacity, y: sectionLift }}
      className="relative py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header line */}
        <div className="flex items-baseline gap-3 mb-6 sm:mb-8 lg:mb-10">
          <span className="eyebrow">{t.projects.eyebrow}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>

        {/* Rotator */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Info panel — LEFT (stays on the left, updates per project).
              Every project's info is stacked invisibly in the same grid cell
              so the panel always reserves the tallest one — rotating projects
              never changes its height or shifts the page below (CLS). */}
          <div className="lg:col-span-5 xl:col-span-5 relative lg:min-h-[28rem] grid">
            {projects.map((p) => (
              <div key={p.index} aria-hidden="true" className="invisible col-start-1 row-start-1">
                <ProjectInfo project={p} />
              </div>
            ))}
            <div className="col-start-1 row-start-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <ProjectInfo project={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Browser frame — RIGHT (rotates through projects) */}
          <div ref={frameColRef} className="lg:col-span-7 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden rounded-md border border-rule bg-paper shadow-sm"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 bg-paper-tint border-b border-rule">
                  <div className="flex gap-1.5 shrink-0" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                    <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 min-w-0 flex justify-center">
                    <span className="mono text-[11px] sm:text-xs text-ink-subtle px-2.5 py-1 bg-paper rounded border border-rule max-w-full truncate">
                      {current.status === "live" && current.liveUrl
                        ? current.liveUrl
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")
                        : `~/${current.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, "")} (dev)`}
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {current.status === "live" && (
                      <span className="inline-flex items-center gap-1.5 mono text-[11px] sm:text-xs text-foreground">
                        <span
                          className="relative flex h-2 w-2"
                          aria-hidden="true"
                        >
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                        </span>
                        <span className="hidden sm:inline">{t.projects.live}</span>
                      </span>
                    )}
                    {current.status === "in-progress" && (
                      <span className="inline-flex items-center gap-1.5 mono text-[11px] sm:text-xs text-foreground">
                        <span
                          className="relative flex h-2 w-2"
                          aria-hidden="true"
                        >
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                        </span>
                        <span className="hidden sm:inline">{t.projects.inProgress}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-[5/3] bg-paper-tint overflow-hidden">
                  {current.video ? (
                    <AutoplayVideo
                      key={current.video}
                      src={current.video}
                      poster={current.image}
                      alt={fmt(t.projects.coverAlt, { title: current.title })}
                      sizes={COVER_SIZES}
                      play={onScreen}
                      className="object-cover object-top"
                      style={
                        current.videoZoom
                          ? {
                              transform: `scale(${current.videoZoom})`,
                              transformOrigin: "center bottom",
                            }
                          : undefined
                      }
                    />
                  ) : (
                    <Image
                      src={current.image || "/placeholder.svg"}
                      alt={fmt(t.projects.coverAlt, { title: current.title })}
                      fill
                      className="object-cover object-top"
                      sizes={COVER_SIZES}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress + controls */}
        <div className="mt-10 lg:mt-14 flex items-center gap-4 sm:gap-6">
          {/* Prev */}
          <button
            type="button"
            onClick={handlePrev}
            className="group flex h-10 w-10 items-center justify-center border border-rule rounded-full text-ink-subtle hover:text-cyan hover:border-cyan transition-colors duration-200"
            aria-label={t.projects.previous}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>

          {/* Progress track */}
          <div className="flex-1 flex items-center gap-4 sm:gap-5">
            {projects.map((p, i) => {
              const isCurrent = i === currentIndex;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => goTo(i)}
                  className="group flex-1 flex items-center gap-2"
                  aria-label={fmt(t.projects.goTo, { n: i + 1, title: p.title })}
                >
                  <span
                    className={`chapter-number text-xs shrink-0 transition-colors duration-200 hidden sm:inline ${
                      isCurrent
                        ? "text-cyan"
                        : "text-ink-subtle group-hover:text-cyan"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative h-[2px] flex-1 bg-rule overflow-hidden">
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 bg-cyan origin-left"
                        style={{ scaleX: progress }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pause / play + Next */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="group flex h-10 w-10 items-center justify-center border border-rule rounded-full text-ink-subtle hover:text-cyan hover:border-cyan transition-colors duration-200"
            aria-label={paused ? t.projects.resume : t.projects.pause}
          >
            {paused ? (
              <Play size={14} strokeWidth={1.5} />
            ) : (
              <Pause size={14} strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="group flex h-10 w-10 items-center justify-center border border-rule rounded-full text-ink-subtle hover:text-cyan hover:border-cyan transition-colors duration-200"
            aria-label={t.projects.next}
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
