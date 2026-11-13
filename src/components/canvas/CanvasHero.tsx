"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

export function CanvasHero() {
  return (
    <section
      id="canvas-home"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-28"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        Canvas
      </span>

      <div className="section-container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <motion.div variants={container} initial={false} animate="show">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-yellow px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink">
              <span className="h-1 w-1 rounded-full bg-ink" aria-hidden="true" />
              Static product preview
            </div>
            <h1 className="mt-6 max-w-[50ch] text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.08em] text-ink sm:text-[3.5rem]">
              One intelligent workspace for every
              <span className="text-yellow">institution.</span>
            </h1>
            <p className="mt-5 max-w-[55ch] text-body leading-relaxed sm:text-base">
              Bring learning, academic management, mentoring, attendance,
              communication, and institutional workflows together in one
              connected platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href="/contact" className="btn-dark w-full sm:w-auto">
                Talk to our team
              </a>
              <a href="#features" className="btn-light w-full sm:w-auto">
                Explore the platform
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial={false}
            animate="show"
            className="relative min-w-0"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-card shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-subtle">
                <span className="flex items-center gap-2">
                  <Layers className="h-6 w-6" aria-hidden="true" />
                  Platform preview mockup
                </span>
              </div>
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur px-3 py-2 rounded-full border border-line shadow-sm">
                <Sparkles className="h-4 w-4 text-yellow" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-ink">Arrise Canvas</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-subtle text-center">
              Static product preview · No live account or institution data
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
