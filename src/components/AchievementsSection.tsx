"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export function AchievementsSection() {
  return (
    <section
      className="relative py-20 sm:py-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-decorative grid-bg" />
      <div className="section-container relative z-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-2xl text-center mb-12 overflow-guard"
        >
          <span className="sticky-note tilt-2">
            <span className="font-space text-xs font-bold text-foreground uppercase tracking-tighter">
              THE JOURNEY SO FAR
            </span>
          </span>
          <h2 className="font-display font-normal leading-[1.05] mt-4 text-display-sm heading-gradient text-balance">
            Numbers That Speak.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 max-w-2xl mx-auto overflow-guard">
          {profile.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4 }}
              className="paper-card p-6 text-center border-l-4 border-primary overflow-guard"
            >
              <div className="font-display font-normal text-primary mb-1 tracking-tighter text-3xl md:text-4xl">
                {metric.value}
              </div>
              <span className="font-space text-xs font-bold text-muted-foreground/80 uppercase tracking-widest">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
