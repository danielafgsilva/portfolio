"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useI18n } from "./i18n-provider";
import { ChronologyPath } from "./chronology";
import { EASE_EDITORIAL } from "@/lib/motion";
import { useSectionReveal } from "@/lib/use-section-reveal";

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
    <m.span style={{ opacity }} className="inline-block">
      {children}
      <span>&nbsp;</span>
    </m.span>
  );
}

function CinematicQuote() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });
  const words = t.story.quote.split(" ");
  return (
    <div ref={ref}>
      {/* Intertitle label — sits above, no line beside it */}
      <div className="mb-4 sm:mb-5">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-cyan">
          {t.story.intertitle}
        </span>
      </div>

      {/* Quote with left border — line starts here, below the label */}
      <div className="border-l-2 border-cyan pl-6 sm:pl-8 lg:pl-12">
        <p
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground"
        >
          <span className="sr-only">{t.story.quote}</span>
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

// The Story chapter: quote + bio, then the chronology, in one <section
// id="story"> so the side nav tracks them as a single chapter.
export function About() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const reveal = useSectionReveal(sectionRef);

  return (
    <m.section
      ref={sectionRef}
      id="story"
      style={reveal}
      className="relative"
    >
      {/* Quote + bio */}
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          {/* Header line */}
          <div className="flex items-baseline gap-3 mb-6 sm:mb-8 lg:mb-10">
            <h2 className="eyebrow">{t.story.eyebrow}</h2>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          </div>

          {/* Intertitle */}
          <div className="py-4 sm:py-8 lg:py-12">
            <CinematicQuote />
          </div>

          {/* Bio */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_EDITORIAL }}
            className="mt-10 lg:mt-14 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-ink-muted text-pretty"
          >
            {t.story.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-4">
              {t.story.traits.map((trait) => (
                <li key={trait} className="badge">
                  {trait}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </div>

      {/* Chronology — each entry has its own media gallery. */}
      <div className="py-4 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <ChronologyPath />
        </div>
      </div>
    </m.section>
  );
}
