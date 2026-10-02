"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  m,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Pause, Play } from "lucide-react";
import { AutoplayVideo, whenDecoded } from "./autoplay-video";
import { useI18n } from "./i18n-provider";
import { timeline, type MediaSize, type TimelineEntry } from "@/lib/content/timeline";

// Sticky-scroll chronology — one experience at a time inside a pinned viewport.
function ChronologySlide({
  entry,
  index,
  total,
  progress,
  load,
  onScreen,
  paused,
}: {
  entry: TimelineEntry;
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** Fetch this slide's media (current or next two — see ChronologyPath). */
  load: boolean;
  /** Chronology stage is on screen — gates video playback. */
  onScreen: boolean;
  /** Visitor paused gallery motion (WCAG 2.2.2). */
  paused: boolean;
}) {
  const { t } = useI18n();
  const copy = t.story.timeline[entry.id];
  const slice = 1 / total;
  const start = index * slice;
  const end = start + slice;
  // Cross-fade half-width: each slice boundary becomes a cross-fade zone shared
  // with the neighbour slide. ±15% of a slice (~16vh of scroll) keeps the fade
  // smooth while leaving ~70% of each slice as a clean, single-slide reading
  // zone — wider zones left two slides overlapping at most scroll positions.
  const halfT = slice * 0.15;

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
  // Fully transparent slides skip paint (visibility: hidden) — spares the
  // compositor from ~5 stacked full-viewport layers when only 1-2 are in
  // view. `pointer-events` follows so hidden slides don't intercept touch.
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? "hidden" : "visible"));
  const pointerEvents = useTransform(opacity, (o) => (o < 0.01 ? "none" : "auto"));
  // React state only flips at the visibility threshold, not every frame.
  const [visible, setVisible] = useState(() => opacity.get() >= 0.01);
  useMotionValueEvent(opacity, "change", (o) => setVisible(o >= 0.01));

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
  const galleryRef = useRef<HTMLDivElement | null>(null);
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

  // The gallery stays transparent until every tile (clones included) has its
  // image or poster decoded, then fades in — the marquee never shows an empty
  // tile. Clones reuse the same URLs, so they resolve from cache. Sticky once
  // revealed; an 8s fallback guarantees it never stays hidden on a bad network.
  const [loadedTiles, setLoadedTiles] = useState(0);
  const [galleryReady, setGalleryReady] = useState(false);
  const onTileReady = () => setLoadedTiles((n) => n + 1);
  useEffect(() => {
    if (!galleryReady && loadedTiles >= marqueeItems.length && marqueeItems.length > 0) setGalleryReady(true);
  }, [loadedTiles, marqueeItems.length, galleryReady]);
  useEffect(() => {
    if (!load || galleryReady) return;
    const t = setTimeout(() => setGalleryReady(true), 8000);
    return () => clearTimeout(t);
  }, [load, galleryReady]);
  const shiftPct = 100 / copies;
  // Marquee animates the `transform` string (not `x`) so framer-motion hands it
  // to WAAPI and it runs on the compositor — `x` would tick on the main thread
  // every frame for all five slides. Reduced-motion users get a static row.
  const reduceMotion = useReducedMotion();
  // The marquee runs as WAAPI animations on the row; pause/resume them in place.
  useEffect(() => {
    for (const a of rowRef.current?.getAnimations() ?? []) {
      if (paused) a.pause();
      else a.play();
    }
  }, [paused, shiftPct, reduceMotion]);

  return (
    <m.div
      style={{
        opacity,
        y,
        zIndex,
        visibility,
        pointerEvents,
        willChange: "transform, opacity",
        // Layout containment only — `paint` would clip the gallery's
        // full-bleed negative margins. Hidden slides already skip paint via
        // `visibility` above.
        contain: "layout",
      }}
      className="absolute inset-0 flex flex-col min-h-0 gap-3 sm:gap-4 lg:gap-5"
    >
      {/* Top — text block at its natural height, so type keeps its size and
          wraps instead of being squeezed. It only shrinks (and clips) once the
          gallery below has given up all it can. bg-background + isolate keep
          the text painting over the gallery zone in any case. */}
      <div className="chronology-text relative z-10 shrink min-h-0 overflow-hidden flex flex-col bg-background isolate">
        {/* Inner grid — year on the left, content on the right. */}
        <div className="grid gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-x-10 min-h-0">
          {/* Year — big display type, editorial-magazine style */}
          <div className="lg:col-span-4 flex flex-col">
            <span
              aria-hidden="true"
              className="chronology-year pointer-events-none select-none font-display font-bold leading-[0.9] tracking-[-0.045em] text-cyan/55 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {copy.years}
            </span>
            <span
              className={`chronology-badge mt-2 sm:mt-4 self-start w-fit badge ${entry.type === "work" ? "badge-accent" : ""}`}
            >
              {t.story.badges[entry.type]}
            </span>
          </div>

          {/* Content — right column */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <p className="chronology-title font-display font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground leading-tight tracking-tight">
              {copy.title}
            </p>

            <p className="chronology-org mt-1 mono text-xs sm:text-sm text-cyan">
              {copy.org}
              {copy.location && (
                <span className="text-ink-subtle"> · {copy.location}</span>
              )}
            </p>

            {/* Mobile shows the two most recent bullets — the rest reveal on
                sm+ where the stage has room. On short viewports of any
                width the same rule kicks in (see globals.css). */}
            <ul className="chronology-bullets mt-2 sm:mt-3 lg:mt-5 space-y-1 sm:space-y-2 text-sm lg:text-base text-ink-muted leading-snug sm:leading-relaxed max-w-3xl">
              {copy.bullets.map((b, i) => (
                <li
                  key={i}
                  className={`chronology-bullet flex gap-2 sm:gap-3 ${i >= 2 ? "hidden sm:flex" : ""}`}
                >
                  <span className="text-cyan mt-[7px] sm:mt-1.5 shrink-0" aria-hidden="true">
                    <span className="block h-1 w-1 bg-cyan rounded-full" />
                  </span>
                  <span className="text-pretty">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom — gallery: takes the room the text leaves, between 22% of
          the stage and the usual cap (min(36%, 18rem) on phones, 42% on sm+).
          mt-auto parks any leftover space between text and gallery. Tiles are
          sized by height + aspect ratio so their widths follow the row height.
          mx-[calc(50%-50vw)] bleeds it to the viewport edges at any width,
          including ultrawide where the 1440px container leaves side gutters. */}
      {entry.media.length > 0 && (
        <div
          ref={galleryRef}
          aria-hidden="true"
          className="chronology-gallery relative z-0 mt-auto flex-1 min-h-[22%] max-h-[min(36%,18rem)] sm:max-h-[42%] overflow-hidden mx-[calc(50%-50vw)] transition-opacity duration-500 ease-editorial"
          style={{ opacity: galleryReady ? 1 : 0 }}
        >
          <m.ul
            ref={rowRef}
            className="flex items-end h-full"
            style={{ willChange: "transform" }}
            animate={
              reduceMotion
                ? undefined
                : { transform: ["translateX(0%)", `translateX(-${shiftPct}%)`] }
            }
            transition={{
              duration: Math.max(30, entry.media.length * 6),
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((item, i) => (
              <li
                key={`${item.src}-${i}`}
                className={`relative shrink-0 ${TILE_CLASS[item.size]} ${i > 0 ? "-ml-3 sm:-ml-4 lg:-ml-6" : ""} rounded-xl overflow-hidden border border-rule bg-paper-tint shadow-sm`}
              >
                {load && (
                  <MediaTile
                    src={item.src}
                    // Videos wait for the images/posters (galleryReady) so they
                    // don't compete for bandwidth with what's about to show.
                    play={visible && onScreen && galleryReady && !paused}
                    galleryRef={galleryRef}
                    onReady={onTileReady}
                  />
                )}
              </li>
            ))}
          </m.ul>
        </div>
      )}
    </m.div>
  );
}

// Video vs image detection based on extension.
const VIDEO_EXTS = new Set(["mp4", "mov", "webm", "m4v"]);
function isVideo(src: string): boolean {
  const ext = src.split(".").pop()?.toLowerCase() ?? "";
  return VIDEO_EXTS.has(ext);
}

// Tiles are sized by the gallery's height (≤18rem on phones, ~42% of the
// stage elsewhere) × aspect ratio, so they're never wider than ~320px on
// phones or ~42vh on larger screens.
const TILE_SIZES = "(max-width: 639px) 320px, 42vh";

// Gallery media is decorative (the slide text carries the information, and
// the marquee repeats every tile), so tiles use alt="" and the strip is
// aria-hidden.
type TileProps = {
  src: string;
  play: boolean;
  galleryRef: RefObject<HTMLDivElement | null>;
  onReady: () => void;
};

function MediaTile(props: TileProps) {
  return isVideo(props.src) ? <VideoTile {...props} /> : <ImageTile {...props} />;
}

// A video tile only mounts its <video> while it's inside (or about to enter)
// the gallery's visible strip — marquee clones parked off to the side show
// their poster, so each clip is fetched/decoded once instead of per clone.
function VideoTile({ src, play, galleryRef, onReady }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inStrip = useInView(ref, { root: galleryRef, margin: "0px 25% 0px 25%" });
  return (
    <div ref={ref} className="absolute inset-0">
      <AutoplayVideo
        src={src}
        poster={src.replace(/\.[^.]+$/, "-poster.jpg")}
        alt=""
        sizes={TILE_SIZES}
        play={play && inStrip}
        eager
        onPosterReady={onReady}
        // Screen recordings usually have a browser URL bar at the top —
        // scale up from the bottom edge so only the site content is shown
        // and the chrome gets clipped by the tile's overflow-hidden.
        style={{ transform: "scale(1.14)", transformOrigin: "center bottom" }}
      />
    </div>
  );
}

function ImageTile({ src, onReady }: TileProps) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={TILE_SIZES}
      // Rendering is already gated by the slide's load window; native lazy
      // loading would never fetch marquee clones parked off to the side.
      loading="eager"
      className="object-cover"
      onLoad={(e) => whenDecoded(e.currentTarget, onReady)}
      onError={onReady}
    />
  );
}

export function ChronologyPath() {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
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

  // Media loading window: nothing until the chronology is within a viewport
  // of the screen, then the current slide + the next two (images are ~150KB
  // per slide as AVIF, so a fast scroll never outruns them). `reached` only
  // grows, so slides already loaded stay loaded when scrolling back.
  const near = useInView(ref, { once: true, margin: "100% 0px 100% 0px" });
  const onScreen = useInView(ref);
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(total - 1, Math.floor(p * total));
    setReached((r) => Math.max(r, i));
  });
  return (
    <div
      ref={ref}
      style={{ height: `${scrollHeightVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-14 sm:top-16 lg:top-20 flex flex-col h-[calc(90dvh-3.5rem)] sm:h-[calc(90vh-4rem)] lg:h-[calc(90vh-5rem)] bg-background pt-4 sm:pt-5 lg:pt-6 pb-4 sm:pb-5 lg:pb-6">
        {/* Section label — pinned to the top of the sticky area */}
        <div className="flex items-baseline gap-3 mb-3 sm:mb-4 lg:mb-5 shrink-0">
          <span className="eyebrow">{t.story.chronology}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={t.story.pauseMotion}
              // -my-2 keeps the label row's height, so the stage below doesn't move.
              className="self-center -my-2 flex h-8 w-8 items-center justify-center border border-rule rounded-full text-ink-subtle hover:text-cyan hover:border-cyan transition-colors duration-200"
            >
              {paused ? <Play size={12} strokeWidth={1.75} /> : <Pause size={12} strokeWidth={1.75} />}
            </button>
          )}
        </div>

        {/* Screen-reader copy of the whole chronology: the visual stage shows
            one slide at a time (the rest are visibility:hidden), which would
            leave all but one entry unreachable without scrolling. */}
        <ol className="sr-only">
          {timeline.map((entry) => {
            const copy = t.story.timeline[entry.id];
            return (
              <li key={entry.id}>
                <h3>{copy.title}</h3>
                <p>
                  {copy.org} · {copy.location} · {copy.years} · {t.story.badges[entry.type]}
                </p>
                <ul>
                  {copy.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        {/* Stage — slides fill the remaining sticky area (visual only; the
            list above carries the content for assistive tech). */}
        <div className="relative flex-1 min-h-0" aria-hidden="true">
          {timeline.map((entry, i) => (
            <ChronologySlide
              key={entry.id}
              entry={entry}
              index={i}
              total={total}
              progress={scrollYProgress}
              load={near && i <= reached + 2}
              onScreen={onScreen}
              paused={paused}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
