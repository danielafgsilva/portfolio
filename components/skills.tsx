"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { StackIcon } from "./stack-icon";
import type { StackIconName } from "@/lib/stack-icon-svgs";
import { useI18n } from "./i18n-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  Layers,
  Package,
  Users,
  PenTool,
  Accessibility,
  Database,
  FileCode,
  Sprout,
  Blocks,
} from "lucide-react";

type LucideIcon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type ToolKey = keyof Dictionary["toolbox"]["tools"];

// Technologies keep their product `name`; concepts use a dictionary `key`.
type Tool = {
  name?: string;
  key?: ToolKey;
  stack?: StackIconName; // Brand icon (see lib/stack-icon-svgs.ts)
  Icon?: LucideIcon; // Fallback for concept icons
  letter?: string; // Short letter mark (e.g., "PT" / "EN")
};

type Group = {
  id: keyof Dictionary["toolbox"]["groups"];
  index: string;
  tools: Tool[];
};

const groups: Group[] = [
  {
    id: "frontend",
    index: "01",
    tools: [
      { name: "Next.js", stack: "nextjs" },
      { name: "React", stack: "react" },
      { name: "TypeScript", stack: "typescript" },
      { name: "JavaScript", stack: "js" },
      { name: "Vue.js", stack: "vuejs" },
      { name: "HTML", stack: "html5" },
      { name: "CSS", stack: "css3" },
      { name: "Tailwind CSS", stack: "tailwindcss" },
      { name: "Sass", stack: "sass" },
      { name: "Framer Motion", stack: "framer" },
    ],
  },
  {
    id: "design",
    index: "02",
    tools: [
      { name: "Figma", stack: "figma" },
      { key: "designSystems", Icon: Layers },
      { key: "componentLibraries", Icon: Package },
      { key: "userResearch", Icon: Users },
      { key: "prototyping", Icon: PenTool },
      { key: "accessibility", Icon: Accessibility },
    ],
  },
  {
    id: "backend",
    index: "03",
    tools: [
      { name: "PHP", stack: "php" },
      { name: "Laravel", stack: "laravel" },
      { name: "Supabase", stack: "supabase" },
      { name: "MySQL", stack: "mysql" },
      { name: "DBeaver", Icon: Database },
      { name: "WordPress", stack: "wordpress" },
      { name: "Bedrock", stack: "bedrock" },
      { name: "Blade", Icon: FileCode },
      { name: "Sage", Icon: Sprout },
      { name: "Gutenberg", Icon: Blocks },
      { name: "GitHub", stack: "github" },
      { name: "Vercel", stack: "vercel" },
      { name: "Docker", stack: "docker" },
      { name: "Azure DevOps", stack: "azure" },
    ],
  },
  {
    id: "languages",
    index: "04",
    tools: [
      { key: "portuguese", letter: "PT" },
      { key: "english", letter: "EN" },
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Theme-aware variant so StackIcon picks the right colour set.
function useIconVariant(): "light" | "dark" {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark ? "dark" : "light";
}

function TechTile({
  tool,
  variant,
}: {
  tool: Tool;
  variant: "light" | "dark";
}) {
  const { t } = useI18n();
  const name = tool.name ?? t.toolbox.tools[tool.key!];
  return (
    <li className="group flex flex-col items-center gap-3 w-24 sm:w-28 lg:w-32">
      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-md border border-rule bg-paper-tint/40 transition-all duration-200 ease-editorial group-hover:border-cyan group-hover:bg-cyan/5">
        {tool.stack ? (
          <span className="h-8 w-8 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full transition-transform duration-200 group-hover:scale-110">
            <StackIcon name={tool.stack} variant={variant} />
          </span>
        ) : tool.letter ? (
          <span className="font-mono font-semibold text-base sm:text-lg text-foreground tracking-tight transition-transform duration-200 group-hover:scale-110">
            {tool.letter}
          </span>
        ) : tool.Icon ? (
          <tool.Icon
            size={32}
            strokeWidth={1.5}
            className="text-foreground transition-transform duration-200 group-hover:scale-110"
          />
        ) : (
          <span className="font-display font-semibold text-xl text-foreground">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <span className="font-mono text-[11px] sm:text-xs text-center text-ink-muted leading-tight group-hover:text-foreground transition-colors duration-200">
        {name}
      </span>
    </li>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const variant = useIconVariant();
  const { t } = useI18n();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  });
  // Spring-smoothed so the reveal glides like the other sections — otherwise
  // this one would jitter under trackpad micro-movements while the rest stay
  // buttery.
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
      id="toolbox"
      style={{ opacity: sectionOpacity, y: sectionLift }}
      className="relative py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header line */}
        <div className="flex items-baseline gap-3 mb-6 sm:mb-8 lg:mb-10">
          <h2 className="eyebrow">{t.toolbox.eyebrow}</h2>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>

        {/* Categories */}
        <div>
          {groups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-10 lg:py-14 border-b border-rule"
            >
              {/* Left — number + label + description */}
              <div className="lg:col-span-4">
                <h3 className="font-display font-semibold text-3xl lg:text-[2.5rem] text-foreground leading-[1.05] tracking-tight">
                  {t.toolbox.groups[group.id].label}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed max-w-sm">
                  {t.toolbox.groups[group.id].description}
                </p>
              </div>

              {/* Right — tech tiles */}
              <div className="lg:col-span-8 flex items-center">
                <ul className="flex flex-wrap gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7">
                  {group.tools.map((tool) => (
                    <TechTile key={tool.name ?? tool.key} tool={tool} variant={variant} />
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
