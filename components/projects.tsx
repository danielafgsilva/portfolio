"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
} from "lucide-react";

type Project = {
  index: string;
  title: string;
  year: string;
  role: string;
  description: string;
  image: string;
  tech: string[];
  status?: "live" | "in-progress";
  liveUrl?: string;
  awards?: { title: string; issuer: string }[];
  video?: string;
  /** Scales the video up, anchored to the bottom, so the top edge gets cropped
   *  (useful when a screen recording has a browser URL bar at the top). */
  videoZoom?: number;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Twovest",
    year: "2024",
    role: "UI/UX Design & Front-End Development",
    description:
      "A second-hand fashion platform built to make sustainable consumption the obvious choice. Designed the full experience in Figma, then shipped the interface in Next.js with Supabase as the backbone. Won two awards for design and execution.",
    image: "/images/twovest-cover.png",
    video: "/videos/twovest-video.mp4",
    videoZoom: 1.12,
    tech: ["Next.js", "Tailwind CSS", "Redux Toolkit", "Supabase", "Figma"],
    status: "live",
    liveUrl: "https://twovest.com/",
    awards: [
      {
        title: "Academy Award · Media Play",
        issuer: "University of Aveiro, 2024",
      },
      {
        title: "Best Project 2023/2024",
        issuer: "Mindera × Master's Programme",
      },
    ],
  },
  {
    index: "02",
    title: "Gomes Rego & Associados",
    year: "2024",
    role: "Web Design & Development",
    description:
      "A professional site for a law firm needing to signal credibility online. Designed for clarity — clean information architecture, considered typography, responsive across every breakpoint, and clear calls-to-action that translated into measurable inquiry lift.",
    image: "/images/gomes-rego-cover.png",
    video: "/videos/gomes-video.mp4",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    status: "live",
    liveUrl: "https://grasroc.pt/",
  },
  {
    index: "03",
    title: "Dogwarts",
    year: "2025",
    role: "Full-Stack Development",
    description:
      "A canine-care marketplace connecting dog owners with service providers. Role-based UI built with Next.js and TypeScript, with Sanity CMS powering editorial content. Currently in active development.",
    image: "/images/dogwarts-cover.png",
    video: "/videos/dogwarts-video.mp4",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    status: "in-progress",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 8000;

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
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

  // Auto-advance timer — resets on index change or pause change
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const INTERVAL = 50;
    const STEP = (INTERVAL / AUTO_ADVANCE_MS) * 100;

    const tick = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + STEP));
    }, INTERVAL);

    const advance = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(advance);
    };
  }, [currentIndex, paused, total]);

  const goTo = (idx: number) => {
    const next = ((idx % total) + total) % total;
    setCurrentIndex(next);
    setProgress(0);
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
          <span className="eyebrow">Selected Work</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>

        {/* Rotator */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Info panel — LEFT (stays on the left, updates per project) */}
          <div className="lg:col-span-5 xl:col-span-5 relative lg:min-h-[28rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {/* Take shot log */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="eyebrow">{current.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight text-balance">
                  {current.title}
                </h3>

                {/* Role */}
                <p className="mt-2 mono text-sm text-cyan">{current.role}</p>

                {/* Description */}
                <p className="mt-5 text-base leading-relaxed text-ink-muted text-pretty">
                  {current.description}
                </p>

                {/* Awards */}
                {current.awards && (
                  <ul className="mt-5 space-y-2 border-l-2 border-cyan pl-4">
                    {current.awards.map((a) => (
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
                  <p className="eyebrow mb-3">stack</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {current.tech.map((t) => (
                      <li key={t} className="badge">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visit link */}
                {current.liveUrl && (
                  <Link
                    href={current.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 mono text-sm text-foreground border border-rule rounded-md px-3 py-2 hover:border-cyan hover:text-cyan transition-colors duration-200 ease-editorial"
                  >
                    Visit site
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Browser frame — RIGHT (rotates through projects) */}
          <div className="lg:col-span-7 xl:col-span-7">
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
                        <span className="hidden sm:inline">live</span>
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
                        <span className="hidden sm:inline">in progress</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-[5/3] bg-paper-tint overflow-hidden">
                  {current.video ? (
                    <video
                      key={current.video}
                      src={current.video}
                      poster={current.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover object-top"
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
                      alt={`${current.title} project cover`}
                      fill
                      priority={currentIndex === 0}
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 60vw, 100vw"
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
            aria-label="Previous project"
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
                  aria-label={`Go to project ${i + 1}: ${p.title}`}
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
                        className="absolute inset-y-0 left-0 bg-cyan"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
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
            aria-label={paused ? "Resume auto-play" : "Pause auto-play"}
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
            aria-label="Next project"
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
