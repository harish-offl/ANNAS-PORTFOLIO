"use client";

import { motion } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const features = [
  {
    icon: Layers,
    label: "Course overview",
    blurb: "Structured subjects, lessons, and learning materials in one place.",
  },
  {
    icon: Sparkles,
    label: "My learning",
    blurb: "Personal dashboards that track progress and upcoming work.",
  },
  {
    icon: Layers,
    label: "Assignments",
    blurb: "Assignment and quiz workflows with clear due dates.",
  },
  {
    icon: Sparkles,
    label: "Course materials",
    blurb: "Lecture notes, readings, and resources for every course.",
  },
];

export function CanvasFeatures() {
  return (
    <section
      id="features"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        Features
      </span>

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            variants={container}
            initial={false}
            animate="show"
            className="flex-1 min-w-0 space-y-8 lg:pr-8"
          >
            <div className="eyebrow">Your learning overview</div>
            <h2 className="max-w-[45ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.06em] text-ink sm:text-[3rem]">
              Everything your institution needs
            </h2>
            <p className="mt-5 max-w-[55ch] text-body leading-relaxed sm:text-base">
              Bring learning, academic management, mentoring, attendance,
              communication, and institutional workflows together in one
              connected platform.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial={false}
            animate="show"
            className="grid w-full gap-4 lg:grid-cols-2 lg:gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                variants={item}
                className="card p-6 flex items-start gap-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink shrink-0">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-ink">
                    {feature.label}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-body">
                    {feature.blurb}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
