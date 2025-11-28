"use client";

import { motion } from "framer-motion";
import { Mail, Github, Send, MapPin, Calendar } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "jaimeperalta124@gmail.com",
    link: "mailto:jaimeperalta124@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "jaimeETH",
    link: "https://github.com/jaimeETH",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-primary/10 border-2 border-primary inline-block">
              <Send className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s connect and explore opportunities to work together on exciting projects
          </p>
        </motion.div>

        {/* Contact Cards - New Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card border-2 border-border p-6 sm:p-8 hover:border-primary transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 border-2 border-primary flex items-center justify-center mb-4"
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.label}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors break-all font-mono text-sm sm:text-base">
                  {item.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* Additional Info - New Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card border-2 border-border p-6 sm:p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground text-center">Let&apos;s Work Together</h3>
          <p className="text-muted-foreground leading-relaxed mb-6 text-center">
            Whether you have a project idea, want to collaborate, or just want to connect, I&apos;d love to hear from you. Feel free to reach out through email or check out my work on GitHub.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Philippines</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Available for Projects</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
