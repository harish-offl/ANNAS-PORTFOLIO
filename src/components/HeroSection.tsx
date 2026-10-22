"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] md:min-h-[85vh] flex flex-col items-center justify-center pt-20 sm:pt-24 section-py-lg"
    >
      <div className="pointer-events-none absolute inset-0 z-decorative">
        <div className="absolute inset-0 grid-bg" />
        <div
          className="absolute -inset-1 rounded-full bg-primary/20 blur-[140px] animate-[pulse_8s_ease-in-out_infinite]"
        />
        <div
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-200/30 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]"
        />
        <div
          className="absolute -bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-pink-200/30 blur-[100px] animate-[pulse_12s_ease-in-out_infinite]"
        />
      </div>

      <div className="section-container relative z-content">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="text-center overflow-guard w-full max-w-[900px] mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 overflow-guard">
              <span className="sticky-note bg-yellow-100 border-yellow-200 tilt-n2">
                <span className="font-space text-[10px] sm:text-xs font-bold text-yellow-900 uppercase tracking-tighter">
                  CREATIVE DEVELOPER
                </span>
              </span>
              <span className="sticky-note bg-blue-100 border-blue-200 tilt-2">
                <span className="font-space text-[10px] sm:text-xs font-bold text-blue-900 uppercase tracking-tighter">
                  VIDEO EDITOR
                </span>
              </span>
              <span className="sticky-note bg-pink-100 border-pink-200 tilt-n3">
                <span className="font-space text-[10px] sm:text-xs font-bold text-pink-900 uppercase tracking-tighter">
                  DIGITAL CREATOR
                </span>
              </span>
            </div>

            <motion.h1
              variants={item}
              className="mt-2 mb-6 font-display font-normal leading-[0.95] text-display-lg heading-gradient animate-foil break-words"
            >
              I&apos;M ANNAMALAI.
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-0 mb-8 sm:mb-10 max-w-[640px] text-base sm:text-lg font-space text-muted-foreground leading-[1.7] text-balance"
            >
              I build digital experiences and create content that moves brands
              forward.
            </motion.p>

            <motion.p
              variants={item}
              className="mx-auto max-w-[640px] text-sm font-space text-muted-foreground/80 leading-relaxed text-balance"
            >
              I&apos;m an AI &amp; Data Science student, creative developer, and content
              creator helping businesses turn ideas into websites, visual stories,
              and digital experiences.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 overflow-guard"
            >
              <a
                href="#work"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-display font-bold text-primary-foreground uppercase tracking-widest transition-all hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              >
                <Play className="h-4 w-4" />
                VIEW MY WORK
              </a>
              <a
                href="#contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border/60 bg-card px-6 py-3.5 text-xs font-display font-bold text-foreground uppercase tracking-widest transition-all hover:bg-secondary hover:-translate-y-0.5"
              >
                LET&apos;S COLLABORATE
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4 overflow-guard"
            >
              <span className="sticky-note bg-mint-100 border-mint-200 tilt-n1">
                <span className="font-space text-[10px] font-bold text-mint-900 uppercase tracking-tighter">
                  Ideas &rarr; Impact
                </span>
              </span>
              <span className="sticky-note bg-lavender-100 border-lavender-200 tilt-3">
                <span className="font-space text-[10px] font-bold text-lavender-900 uppercase tracking-tighter">
                  3+ YEARS CREATING
                </span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
