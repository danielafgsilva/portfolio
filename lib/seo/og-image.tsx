import { ImageResponse } from "next/og"

// Share images and app icons, drawn with the site's dark editorial palette
// (--paper, --ink, --cyan … in globals.css) and Space Grotesk.
export const OG_SIZE = { width: 1200, height: 630 }
export const BRAND = {
  paper: "#080C16",
  ink: "#F2F5F8",
  subtle: "#7D8A9E",
  rule: "#222C3B",
  cyan: "#38BCFA",
}

/** Space Grotesk subset as TTF via the Google Fonts CSS API (Vercel's documented
 *  pattern). Returns undefined offline so the build falls back to the default font. */
async function spaceGrotesk(weight: 500 | 700, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text())
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : undefined
  } catch {
    return undefined
  }
}

export async function renderShareImage({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string
  title: string
  subtitle: string
  footer: string
}) {
  const text = eyebrow + title + subtitle + footer + "."
  const [bold, medium] = await Promise.all([spaceGrotesk(700, text), spaceGrotesk(500, text)])
  const fonts = [
    ...(bold ? [{ name: "Space Grotesk", data: bold, weight: 700 as const }] : []),
    ...(medium ? [{ name: "Space Grotesk", data: medium, weight: 500 as const }] : []),
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND.paper,
          color: BRAND.ink,
          fontFamily: "Space Grotesk",
          padding: "0 80px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 4, width: "100%", background: BRAND.cyan, marginBottom: 64 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontSize: 26, fontWeight: 500, color: BRAND.cyan, letterSpacing: 6, textTransform: "uppercase" }}>
              {eyebrow}
            </span>
            <div style={{ flex: 1, height: 2, background: BRAND.rule }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 700, letterSpacing: -7, lineHeight: 0.95 }}>
            {title}
            <span style={{ color: BRAND.cyan }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 40, fontWeight: 500, color: BRAND.subtle }}>{subtitle}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${BRAND.rule}`,
            paddingTop: 28,
            fontSize: 26,
            fontWeight: 500,
            color: BRAND.subtle,
          }}
        >
          <span>{footer}</span>
          <span>Porto, Portugal</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  )
}

/** Square brand mark (dark tile, "D", cyan dot) — same design as app/icon.svg. */
export async function renderIcon(size: number) {
  const bold = await spaceGrotesk(700, "D")
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          borderRadius: size * 0.1875,
          color: "#F8FAFC",
          fontFamily: "Space Grotesk",
          fontSize: size * 0.75,
          fontWeight: 700,
          position: "relative",
        }}
      >
        <span style={{ marginLeft: -size * 0.12, marginTop: -size * 0.04 }}>D</span>
        <div
          style={{
            position: "absolute",
            right: size * 0.17,
            bottom: size * 0.2,
            width: size * 0.16,
            height: size * 0.16,
            borderRadius: "50%",
            background: "#0EA5E9",
          }}
        />
      </div>
    ),
    { width: size, height: size, fonts: bold ? [{ name: "Space Grotesk", data: bold, weight: 700 }] : [] },
  )
}
