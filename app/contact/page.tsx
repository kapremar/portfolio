"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  MessageSquare,
  Radio,
  FileText,
} from "lucide-react";

const contactChannels = [
  {
    title: "Email",
    value: "remarsansait39@gmail.com",
    icon: Mail,
    link: "mailto:remarsansait39@gmail.com",
    description: "Best for project briefs, collaboration ideas, and formal conversations.",
  },
  {
    title: "GitHub",
    value: "github.com/remarsansait",
    icon: Github,
    link: "https://github.com/remarsansait",
    description: "Browse current experiments, forks, and documentation.",
  },
  {
    title: "Resume deck",
    value: "remar.pdf",
    icon: FileText,
    link: "/remar.pdf",
    description: "Download the latest snapshot of my work, values, and project index.",
  },
];

const pulses = [
  { label: "Location", value: "Cebu City, Philippines", icon: MapPin },
  { label: "Response time", value: "Usually within a day", icon: Radio },
  { label: "Preferred collabs", value: "Student tools, design systems, motion UI", icon: MessageSquare },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border-2 border-border p-6 sm:p-8 text-center space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
            Contact · Studio Inbox
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Let&apos;s build courageous products together.
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I collaborate with classmates, org partners, and mentors on web products that need
            expressive interfaces and reliable engineering. Reach out through any channel below.
          </p>
        </motion.header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.title}
                href={channel.link}
                target={channel.link.startsWith("http") ? "_blank" : undefined}
                rel={channel.link.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border-2 border-border p-6 flex flex-col gap-4 hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 border-2 border-primary bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground font-mono">
                    {channel.title}
                  </p>
                  <p className="text-lg font-semibold text-foreground break-words">
                    {channel.value}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{channel.description}</p>
                <div className="text-sm font-semibold text-primary flex items-center gap-1">
                  Open channel
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.a>
            );
          })}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border-2 border-border p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-muted-foreground font-mono">Collab pulse</p>
              <h2 className="text-2xl font-bold text-foreground">
                What to expect when we work together
              </h2>
            </div>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:remarsansait39@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-border hover:border-primary text-sm font-semibold transition-colors"
            >
              Draft an email
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </motion.a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pulses.map((pulse) => {
              const Icon = pulse.icon;
              return (
                <div key={pulse.label} className="border border-border/70 p-4 bg-background/70">
                  <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground font-mono">
                    <Icon className="w-4 h-4 text-primary" />
                    {pulse.label}
                  </div>
                  <p className="text-lg font-semibold text-foreground mt-2">{pulse.value}</p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            I document every step—from kickoff questions to delivery checklists—so progress stays
            transparent. Expect weekly updates, recorded Loom demos when needed, and a shared board
            for tasks.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
