"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StackIcon from "tech-stack-icons";
import type { IconName } from "tech-stack-icons";
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
import { Accent } from "./chapter";

type LucideIcon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type Tool = {
  name: string;
  stack?: IconName; // Icon from tech-stack-icons library
  Icon?: LucideIcon; // Fallback for concept icons
  letter?: string; // Short letter mark (e.g., "PT" / "EN")
};

type Group = {
  index: string;
  label: string;
  description: string;
  tools: Tool[];
};

const groups: Group[] = [
  {
    index: "01",
    label: "Front-End",
    description:
      "The layer where craft meets code — components, motion, and pixel-precise interfaces.",
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
    index: "02",
    label: "Design & UX",
    description:
      "Where thinking starts before code — research, prototypes, and the systems that hold a product together.",
    tools: [
      { name: "Figma", stack: "figma" },
      { name: "Design Systems", Icon: Layers },
      { name: "Component Libraries", Icon: Package },
      { name: "User Research", Icon: Users },
      { name: "Prototyping", Icon: PenTool },
      { name: "Accessibility", Icon: Accessibility },
    ],
  },
  {
    index: "03",
    label: "Back-End & Tools",
    description:
      "The scaffolding that makes shipping possible — APIs, data, deploys, and the environments in between.",
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
    index: "04",
    label: "Languages",
    description: "Communication is a craft too — for people and for machines.",
    tools: [
      { name: "Portuguese (Native)", letter: "PT" },
      { name: "English (Professional)", letter: "EN" },
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Theme-aware variant so tech-stack-icons picks the right colour set.
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
            {tool.name.charAt(0)}
          </span>
        )}
      </div>
      <span className="font-mono text-[11px] sm:text-xs text-center text-ink-muted leading-tight group-hover:text-foreground transition-colors duration-200">
        {tool.name}
      </span>
    </li>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const variant = useIconVariant();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const sectionLift = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="toolbox"
      style={{ opacity: sectionOpacity, y: sectionLift }}
      className="relative py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header line */}
        <div className="flex items-baseline gap-3 mb-10">
          <span className="eyebrow">Toolbox</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>

        {/* Categories */}
        <div>
          {groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-10 lg:py-14 border-b border-rule"
            >
              {/* Left — number + label + description */}
              <div className="lg:col-span-4">
                <h3 className="font-display font-semibold text-3xl lg:text-[2.5rem] text-foreground leading-[1.05] tracking-tight">
                  {group.label}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed max-w-sm">
                  {group.description}
                </p>
              </div>

              {/* Right — tech tiles */}
              <div className="lg:col-span-8 flex items-center">
                <ul className="flex flex-wrap gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7">
                  {group.tools.map((tool) => (
                    <TechTile key={tool.name} tool={tool} variant={variant} />
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
