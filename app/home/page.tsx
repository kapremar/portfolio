"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Code, Sparkles } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section - New Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-lg overflow-hidden border-2 border-primary shadow-lg"
              >
                <Image
                  src="/profile2.jpg"
                  alt="Jaime Peralta"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-primary/20 border-2 border-primary rounded-lg -z-10" />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border-2 border-primary text-sm text-primary font-mono">
                <Code className="w-4 h-4" />
                <span>Developer & Designer</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary">Jaime</span>
                <br />
                <span className="text-foreground">Peralta</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium"
            >
              Building modern web applications with clean code and innovative design
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Passionate BSIT student specializing in full-stack development. I transform ideas into functional, beautiful digital experiences using cutting-edge technologies.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground border-2 border-primary font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <FileText className="w-5 h-5" />
                <span>View Resume</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-card border-2 border-border text-foreground font-semibold hover:border-primary transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Grid - New Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
        >
          {["HTML", "CSS", "JavaScript", "React", "Next.js", "Express.js"].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card border-2 border-border p-4 text-center hover:border-primary transition-colors"
            >
              <p className="text-sm font-mono font-semibold text-foreground">{tech}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
