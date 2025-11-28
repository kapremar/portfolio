"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  const resumeContent = `
    REMAR SANSAIT
    BSIT 3rd Year Student | Full-Stack Explorer
    
    CONTACT INFORMATION
    Email: remarsansait39@gmail.com
    GitHub: github.com/remarsansait
    
    EDUCATION
    Bachelor of Science in Information Technology (BSIT)
    3rd Year • Focus on product-driven development and UI engineering
    
    SKILLS SNAPSHOT
    • UI: HTML, CSS, Tailwind, Framer Motion
    • Frontend: JavaScript, TypeScript, React, Next.js
    • Backend: Node.js, Express.js, REST APIs, MongoDB
    • Tooling: Git & GitHub, Figma, Agile collaboration
    
    FEATURED PROJECTS
    • Portfolio Redesign — High-contrast theme with responsive grids and motion-first interactions.
    • FCFS CPU Scheduling Visualizer — Interactive tool that simulates processes with animated Gantt charts.
    • Campus Utility Apps — Built CRUD dashboards and auth flows for class-wide submissions.
    
    ABOUT ME
    I bring a bold visual style to reliable engineering. My workflow balances research,
    prototyping, and system thinking so every build feels fast, intentional, and accessible.
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-card rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-xl font-semibold">My Resume</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                {resumeContent}
              </pre>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

