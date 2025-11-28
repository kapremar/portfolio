"use client";

import { motion } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Compass,
  Contact2,
  Cpu,
  Flame,
  Layers3,
  LibraryBig,
  NotebookPen,
  Palette,
  Sparkles,
} from "lucide-react";

const focusPillars = [
  {
    title: "Visual systems",
    description:
      "Building token-driven themes that translate mood boards into modular components and grid stacks.",
    icon: Palette,
  },
  {
    title: "Engineering rigor",
    description:
      "Modeling APIs, state, and error paths carefully so interfaces stay resilient under pressure.",
    icon: Cpu,
  },
  {
    title: "People-first flow",
    description:
      "Interviewing classmates, journaling friction points, and iterating until interactions feel effortless.",
    icon: Contact2,
  },
];

const chapters = [
  {
    year: "2022",
    label: "Seed phase",
    notes:
      "Rebuilt classic websites from scratch, obsessed over semantic HTML, and learned to love flexbox math.",
  },
  {
    year: "2023",
    label: "Collab groove",
    notes:
      "Led BSIT lab teams, introduced Git workflows, and automated QA scripts to keep submissions clean.",
  },
  {
    year: "2024",
    label: "Systems thinking",
    notes:
      "Documenting design decisions, writing API specs, and polishing motion states for better storytelling.",
  },
];

const researchTracks = [
  {
    title: "Studio rituals",
    bullets: [
      "Daily micro-journals for every build",
      "Design critiques captured in Notion",
      "Accessibility-first component checklist",
    ],
  },
  {
    title: "Tech experiments",
    bullets: [
      "Hybrid rendering with Next.js App Router",
      "Express middleware for clean API contracts",
      "Type-safe utilities to reduce runtime bugs",
    ],
  },
  {
    title: "Community impact",
    bullets: [
      "Peer mentoring for freshman BSIT sections",
      "Co-facilitating campus dev workshops",
      "Open-sourcing study helpers & templates",
    ],
  },
];

const signalCards = [
  {
    label: "Disciplines",
    value: "Product design, frontend, backend",
  },
  {
    label: "Learning style",
    value: "Prototype → test → document",
  },
  {
    label: "Mission",
    value: "Make student tools feel premium",
  },
];

const hyperlinks = [
  { text: "Download resume", href: "/remar.pdf" },
  { text: "Say hello", href: "mailto:remarsansait39@gmail.com" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border-2 border-border p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-mono">
            <span className="flex items-center gap-2 px-3 py-1 border-2 border-primary text-primary">
              <Sparkles className="w-4 h-4" />
              About Remar Sansait
            </span>
            <span>BSIT · Cebu · 3rd Year</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground">
                I architect learning tools and digital stories that feel futuristic yet grounded.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                The classroom is my test bed. I treat briefs like product launches, documenting
                research, drafting scripts, and building prototypes that support classmates. My stack
                blends React, Next.js, Express, and motion design—always wrapped in tight QA.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {signalCards.map((card) => (
                  <div key={card.label} className="border-2 border-border p-4 bg-background/70">
                    <p className="text-xs uppercase text-muted-foreground font-mono">
                      {card.label}
                    </p>
                    <p className="text-lg font-semibold text-primary mt-1">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 border border-border/60 p-5 bg-background/70">
              <p className="text-sm text-muted-foreground">
                I keep a running ship log for every iteration—what inspired it, what confused users,
                and what we tried next. It&apos;s how I stay honest about progress.
              </p>
              <div className="flex flex-wrap gap-3">
                {hyperlinks.map((link) => (
                  <motion.a
                    key={link.text}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-border hover:border-primary text-sm font-semibold transition-colors"
                  >
                    {link.text}
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {focusPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bg-card border-2 border-border p-6 space-y-3">
                <div className="w-12 h-12 border-2 border-primary bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            );
          })}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8"
        >
          <div className="bg-card border-2 border-border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 border-2 border-primary bg-primary/10">
                <NotebookPen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Chapters</p>
                <h2 className="text-2xl font-bold text-foreground">BSIT growth log</h2>
              </div>
            </div>
            <div className="space-y-6">
              {chapters.map((chapter) => (
                <div
                  key={chapter.year}
                  className="border-l-4 border-primary pl-4 py-3 hover:bg-background/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase text-muted-foreground font-mono">
                      {chapter.year}
                    </p>
                    <span className="text-sm text-primary font-semibold">{chapter.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{chapter.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border-2 border-border p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 border-2 border-primary bg-primary/10">
                <LibraryBig className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Research tracks</p>
                <h2 className="text-2xl font-bold text-foreground">How I study & teach</h2>
              </div>
            </div>
            <div className="space-y-5">
              {researchTracks.map((track) => (
                <div key={track.title} className="border border-border/70 p-4 bg-background/60">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-primary" />
                    {track.title}
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {track.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <Layers3 className="w-4 h-4 text-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card border-2 border-border p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 border-2 border-primary bg-primary/10">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground font-mono">Operating system</p>
              <h2 className="text-2xl font-bold text-foreground">Guiding prompts I use daily</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Compass check", body: "Who benefits from this screen and how do they feel?" },
              {
                title: "Clarity audit",
                body: "Can this interaction be explained in one sentence to a classmate?",
              },
              {
                title: "Momentum",
                body: "What experiment keeps energy high without sacrificing code quality?",
              },
            ].map((card) => (
              <div key={card.title} className="border border-border/60 p-4 bg-background/70">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary" />
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{card.body}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
