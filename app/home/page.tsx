"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CircuitBoard,
  Code2,
  Globe,
  Layers,
  Mail,
  PenTool,
  Sparkles,
} from "lucide-react";

const quickFacts = [
  { label: "Based in", value: "Cebu, PH" },
  { label: "Focus", value: "Expressive full-stack web" },
  { label: "Availability", value: "Open for collabs" },
];

const studioPanels = [
  {
    title: "Interface Lab",
    copy: "Designing punchy, high-contrast UI systems that stay accessible on any screen.",
    icon: PenTool,
  },
  {
    title: "Systems Lab",
    copy: "Building resilient APIs, auth flows, and data loops using Node.js & Express.",
    icon: CircuitBoard,
  },
  {
    title: "Motion Lab",
    copy: "Shipping micro-interactions with Framer Motion to keep stories kinetic.",
    icon: Sparkles,
  },
];

const buildNotes = [
  {
    tag: "Now",
    title: "Campus research archive",
    detail: "Managing contributor submissions + reviewer dashboards.",
  },
  {
    tag: "Lab",
    title: "SJF scheduling visualizer",
    detail: "Refined animations for shortest-job-first logic.",
  },
  {
    tag: "Next",
    title: "UX pattern library",
    detail: "Codifying typography, grids, and rhythms for future projects.",
  },
];

const skillTracks = [
  {
    heading: "Interface & Narrative",
    items: ["Figma wireframes", "Design tokens", "Responsive typography", "Design QA"],
  },
  {
    heading: "Frontend Engineering",
    items: ["React / Next.js", "TypeScript", "Motion systems", "State modeling"],
  },
  {
    heading: "Backend & Ops",
    items: ["Node.js & Express", "REST APIs", "MongoDB", "GitHub automation"],
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card border-2 border-border p-6 sm:p-8 flex flex-col gap-6"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-mono">
              <span className="flex items-center gap-2 px-3 py-1 border-2 border-primary text-primary">
                <Sparkles className="w-4 h-4" />
                Studio log
              </span>
              <span>Remar Sansait · BSIT Year 3</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground">
              I blend bold storytelling with dependable engineering for web products that feel alive.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every semester is a sandbox to rethink layout systems, motion choreography, and API
              structure. I take class briefs, hackathons, and freelance collabs from wireframe to
              deployed experience with care.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-2 border-border p-4 bg-background/70 shadow-sm"
                >
                  <p className="text-xs uppercase text-muted-foreground font-mono">{fact.label}</p>
                  <p className="text-lg font-semibold text-primary mt-1">{fact.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open("/remar.pdf", "_blank")}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground border-2 border-primary font-semibold shadow-lg"
              >
                Download resume
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:remarsansait39@gmail.com"
                className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-border text-foreground font-semibold hover:border-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                remarsansait39@gmail.com
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border-2 border-border p-6 sm:p-8 flex flex-col gap-6"
          >
            <div className="relative w-full h-72 border-2 border-primary overflow-hidden shadow-lg">
              <Image
                src="/profile3.jpg"
                alt="Portrait of Remar Sansait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                I keep multiple labs running—design research, rapid code prototypes, and in-between
                experiments that test out typography, grids, and interactive data stories.
              </p>
              <p>
                Outside class, I mentor younger BSIT students, co-run dev workshops, and contribute
                to campus tooling that automates repetitive workflows.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studioPanels.map((panel, index) => {
            const Icon = panel.icon;
            return (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card border-2 border-border p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 border-2 border-primary bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{panel.title}</h3>
                <p className="text-sm text-muted-foreground">{panel.copy}</p>
              </motion.div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card border-2 border-border p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 border-2 border-primary bg-primary/10">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Build log</p>
                <h2 className="text-2xl font-bold text-foreground">What I&apos;m shaping</h2>
              </div>
            </div>
            <div className="space-y-5">
              {buildNotes.map((note) => (
                <div key={note.title} className="border border-border/70 p-4 bg-background/70">
                  <p className="text-xs uppercase text-muted-foreground font-mono">{note.tag}</p>
                  <h3 className="text-lg font-semibold text-foreground">{note.title}</h3>
                  <p className="text-sm text-muted-foreground">{note.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border-2 border-border p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 border-2 border-primary bg-primary/10">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Stacks</p>
                <h2 className="text-2xl font-bold text-foreground">Tracks I dive into</h2>
              </div>
            </div>
            <div className="space-y-6">
              {skillTracks.map((track) => (
                <div key={track.heading}>
                  <h3 className="text-lg font-semibold text-foreground">{track.heading}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {track.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
