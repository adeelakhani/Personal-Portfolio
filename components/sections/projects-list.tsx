"use client";

import { useState } from "react";
import { ArrowDown, Users } from "lucide-react";

type ProjectStat = {
  value: number;
  kind: "downloads" | "installs" | "users";
  variant?: "peak" | "total";
};

type Project = {
  title: string;
  description: string;
  links: { label: string; href: string }[];
  stat?: ProjectStat;
};

function formatCount(value: number) {
  if (value >= 1000) {
    const rounded = value / 1000;
    return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return value.toLocaleString();
}

function ProjectStatBadge({ stat }: { stat: ProjectStat }) {
  const Icon = stat.kind === "installs" || stat.kind === "users" ? Users : ArrowDown;
  const unit = stat.variant === "peak" ? "peak" : stat.kind;

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] leading-none text-white/35">
      <Icon className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.75} />
      <span className="tabular-nums font-medium text-white">
        {formatCount(stat.value)}
      </span>
      <span>{unit}</span>
    </span>
  );
}

const projects: Project[] = [
  {
    title: "localdocs",
    description: "fully local RAG documentation search, runs entirely on-device via Ollama",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/localDocs" },
      { label: "npm", href: "https://www.npmjs.com/package/@adeel712/localdocs" },
      { label: "post", href: "https://x.com/adeel_712/status/2050517228030701938" },
    ],
    stat: { value: 1607, kind: "downloads", variant: "total" },
  },
  {
    title: "Scope AI",
    description: "VS Code extension that explains code across five abstraction levels",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/codieumextension" },
      { label: "marketplace", href: "https://marketplace.visualstudio.com/items?itemName=Scope.scope" },
      { label: "demo", href: "https://www.loom.com/share/a6096a5c0ac14224a3782d738bbf6e2c" },
    ],
    stat: { value: 104, kind: "installs", variant: "total" },
  },
  {
    title: "Around Me",
    description: "AI agents that mine Reddit, 311, and local news for hyperlocal discovery on a 3D map",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/around-me-agent" },
      { label: "post", href: "https://x.com/adeel_712/status/1956911754539159795" },
    ],
  },
  {
    title: "LoopyAI",
    description: "agent that filters PostHog session replays for issues, being rebuilt as Swing",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/LoopyAI-Backend" },
      { label: "github", href: "https://github.com/adeelakhani/LoopyAI" },
      { label: "npm", href: "https://www.npmjs.com/package/swing-sdk" },
    ],
    stat: { value: 2802, kind: "downloads", variant: "total" },
  },
  {
    title: "LooLines",
    description: "estimates Tim Hortons line length at UWaterloo using Bluetooth RSSI",
    links: [
      { label: "github", href: "https://github.com/Leonardomontesqui/BluetoothDetection" },
      { label: "live", href: "https://loolines.vercel.app/" },
    ],
  },
  {
    title: "LetsCook",
    description: "cooking turned into a game, post and try community challenges",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/LetsCook" },
      { label: "live", href: "https://letscook-silk.vercel.app/" },
    ],
  },
  {
    title: "MakeSomething",
    description: "generate recipes based on whatever ingredients you have on hand",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/MakeSomething-" },
      { label: "live", href: "https://makesomething.vercel.app/" },
    ],
  },
  {
    title: "RememberGranny",
    description: "password protection tools + story-based memory assistance for the elderly",
    links: [
      { label: "github", href: "https://github.com/hhyxn/newhack_FINALFINAL" },
    ],
  },
  {
    title: "Monopoly",
    description: "full Monopoly Express clone with persistent game stats",
    links: [
      { label: "github", href: "https://github.com/adeelakhani/Monopoly-With-Java-UI" },
    ],
  },
  {
    title: "Grendel, The Game",
    description: "video game exploring Grendel's love for the Shaper and Wealtheow",
    links: [],
  },
];

const INITIAL_COUNT = 4;

const linkClass = "text-white/30 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/40";

export function ProjectsListSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-xl">
        <p className="mb-6 text-[15px] font-medium text-white">projects</p>

        <div className="space-y-5">
          {visible.map((project) => (
            <div key={project.title}>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-[15px] font-medium text-white">
                  {project.title}
                </p>
                {project.stat && <ProjectStatBadge stat={project.stat} />}
              </div>
              <p className="mt-0.5 text-[14px] text-white/40">
                {project.description}
              </p>
              {project.links.length > 0 && (
                <p className="mt-1.5 flex flex-wrap gap-x-4 text-[13px]">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-6 text-[13px] text-white/30 transition-colors hover:text-[hsl(33,94%,61%)]"
          >
            {expanded ? "show less" : `show more (${projects.length - INITIAL_COUNT})`}
          </button>
        )}
      </div>
    </section>
  );
}
