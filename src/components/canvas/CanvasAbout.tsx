"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

export function CanvasAbout() {
  return (
    <section
      id="about"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 bg-card"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        About
      </span>

      <div className="section-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">
          <motion.div variants={container} initial={false} animate="show">
            <div className="eyebrow">About Arrise Canvas</div>
            <h2 className="mt-6 max-w-[45ch] text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none tracking-[-0.06em] text-ink sm:text-[2.75rem]">
              A calmer, more connected way to learn
            </h2>
            <p className="mt-5 max-w-[50ch] text-body leading-relaxed sm:text-base">
              Arrise Canvas is a concept-stage educational SaaS platform
              designed to bring learning, academic management, mentoring,
              attendance, communication, and institutional workflows together
              in one connected workspace.
            </p>
            <p className="mt-5 max-w-[50ch] text-body leading-relaxed sm:text-base">
              Built for colleges, universities, schools, and training centres,
              it gives students, mentors, faculty, and administrators role-aware
              views over shared institutional data.
            </p>
            <a
              href="#features"
              className="link-arrow mt-8 inline-block"
            >
              Explore features
              <span className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div variants={container} initial={false} animate="show" className="relative">
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow to-transparent blur-lg opacity-20" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-ink">The idea</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-body">
                Education works best when it&apos;s calm, clear, and connected.
                Arrise Canvas removes clutter so institutions can focus on
                teaching and learning.
              </p>
              <div className="mt-6 pt-6 border-t border-line">
                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-subtle mb-3">
                  Built by
                </h4>
                <p className="text-[12px] font-medium text-ink">
                  Arrise Digital
                </p>
                <p className="mt-1 text-[11px] text-body">
                  Digital products and brand experiences
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
