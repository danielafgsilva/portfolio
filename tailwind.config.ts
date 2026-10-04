import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Editorial palette
        paper: "hsl(var(--paper))",
        "paper-tint": "hsl(var(--paper-tint))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          muted: "hsl(var(--ink-muted))",
          subtle: "hsl(var(--ink-subtle))",
        },
        cyan: "hsl(var(--cyan))",
        green: "hsl(var(--green))",
        rule: "hsl(var(--rule))",
        // CV download button. Not redefined on the light CV page, so it keeps
        // the dark palette's ink (a light button on the light page).
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": [
          "clamp(2rem, 5vw, 3.25rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(2.75rem, 7vw, 5rem)",
          { lineHeight: "1", letterSpacing: "-0.025em" },
        ],
        "display-xl": [
          "clamp(4rem, 12vw, 9rem)",
          { lineHeight: "0.9", letterSpacing: "-0.045em" },
        ],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      borderRadius: {
        md: "calc(var(--radius) - 2px)",
      },
    },
  },
} satisfies Config

export default config
