"use client";

import { motion } from "framer-motion";
import { Code, GraduationCap, Target, Zap, Briefcase } from "lucide-react";

const skills = [
  { name: "HTML", level: 92 },
  { name: "CSS", level: 88 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Next.js", level: 78 },
  { name: "Express.js", level: 75 },
  { name: "Figma", level: 82 },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-primary/10 border-2 border-primary inline-block">
              <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
            About Me
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know my journey, skills, and what drives me as a developer
          </p>
        </motion.div>

        {/* Main Content Grid - New Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-card border-2 border-border p-6 sm:p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 border-2 border-primary">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 text-foreground">My Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I&apos;m <strong className="text-primary">Jaime Peralta</strong>, a dedicated <strong className="text-primary">BSIT 3rd Year Student</strong> with an unwavering passion for web development. My journey began with curiosity about how websites work, and it has evolved into a deep love for creating digital solutions that make a difference.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code and designing intuitive user experiences. Every project is an opportunity to learn, grow, and push the boundaries of what&apos;s possible in web development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border-2 border-border p-6 sm:p-8"
          >
            <div className="p-3 bg-primary/10 border-2 border-primary mb-4 inline-block">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Quick Facts</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Education</p>
                <p className="text-lg font-semibold text-primary">BSIT Student</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Focus</p>
                <p className="text-lg font-semibold text-primary">Full-Stack Dev</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section - New Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card border-2 border-border p-6 sm:p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 border-2 border-primary">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Technical Skills</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground font-mono">{skill.name}</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-muted border border-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.6 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="h-full bg-primary border-r border-primary/50"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Goals & Vision - New Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card border-2 border-border p-6 sm:p-8"
          >
            <div className="p-3 bg-primary/10 border-2 border-primary mb-4 inline-block">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">My Goals</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become a proficient full-stack developer who creates scalable, efficient, and user-friendly applications. I aim to contribute to open-source projects and build a portfolio of impactful digital solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card border-2 border-border p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold mb-4 text-foreground">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {["HTML", "CSS", "JavaScript", "React", "Next.js", "Express.js", "Figma"].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.8 + index * 0.05,
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-primary/10 border border-primary text-primary text-sm font-mono font-semibold hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
