"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import { useReducedMotion } from "framer-motion"

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/** False for reduced-motion users, Data Saver, and 2G connections — they get
 *  the poster only. Starts false so SSR and first paint never fetch video. */
export function useCanAutoplayVideo() {
  const reduceMotion = useReducedMotion()
  const [networkOk, setNetworkOk] = useState(false)
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: NetworkInformation }).connection
    setNetworkOk(!c?.saveData && !/2g/.test(c?.effectiveType ?? ""))
  }, [])
  return networkOk && !reduceMotion
}

/** Fires `cb` once the image is decoded, so revealing it can't flash blank. */
export function whenDecoded(img: HTMLImageElement, cb?: () => void) {
  if (!cb) return
  img.decode().catch(() => {}).finally(cb)
}

/**
 * Optimised poster image always underneath; the <video> mounts only while
 * `play` is true and fades in once it has a frame — so the tile is never
 * empty, and off-screen / inactive videos aren't downloaded or decoded.
 * Screens ≤767px get the `-sm.mp4` rendition (smaller resolution, ~1/3–2/3
 * the bytes).
 */
export function AutoplayVideo({
  src,
  poster,
  alt,
  sizes,
  play,
  style,
  className = "object-cover",
  eager = false,
  onPosterReady,
}: {
  src: string
  poster: string
  alt: string
  sizes: string
  play: boolean
  style?: CSSProperties
  className?: string
  /** Skip native lazy-loading when the caller already gates rendering. */
  eager?: boolean
  onPosterReady?: () => void
}) {
  const canAutoplay = useCanAutoplayVideo()
  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={className}
        style={style}
        onLoad={(e) => whenDecoded(e.currentTarget, onPosterReady)}
        onError={onPosterReady}
      />
      {play && canAutoplay && <FadeInVideo src={src} className={className} style={style} />}
    </>
  )
}

function FadeInVideo({ src, className, style }: { src: string; className: string; style?: CSSProperties }) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  // src is set here rather than via <source> so it can be emptied on unmount:
  // removing a <video> doesn't stop its download, and a clip scrolled past
  // shouldn't keep competing for bandwidth with what's on screen.
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const small = window.matchMedia("(max-width: 767px)").matches
    v.src = encodeURI(small ? src.replace(/\.mp4$/, "-sm.mp4") : src)
    v.play().catch(() => {})
    return () => {
      v.pause()
      v.removeAttribute("src")
      v.load()
    }
  }, [src])
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full ${className} transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
      style={style}
    />
  )
}
