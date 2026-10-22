"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { devProcess } from "@/lib/data";

const stepIcons: Record<string, LucideIcon> = {
  "01": Search,
  "02": PenTool,
  "03": Code,
  "04": Rocket,
};

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative section-py overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-decorative grid-bg" />
      <div className="section-container relative z-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-4xl text-center mb-16 overflow-guard"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="sticky-note tilt-n3">
              <span className="font-space text-xs font-bold text-foreground uppercase tracking-tighter">
                THE PROCESS
              </span>
            </span>
          </div>
          <h2 className="font-display font-normal leading-[1.05] text-display-sm heading-gradient mb-6 text-balance">
            From Idea to Something Real.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-balance">
            A personal, four-step approach to every project I take on.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl overflow-guard">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 w-px bg-primary/20"
          />

          {devProcess.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ x: 4 }}
              className="relative mb-6 grid min-w-0 grid-cols-[40px_minmax(0,1fr)] items-start gap-4 last:mb-0 sm:gap-6"
            >
              <span className="relative z-content mt-5 grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card font-display text-xs font-bold text-primary shadow-sm">
                {step.step}
              </span>

              <div className="paper-card min-w-0 p-5 sm:p-6">
                <div className="mb-3 flex min-w-0 items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    {React.createElement(stepIcons[step.step], {
                      className: "h-4 w-4",
                      "aria-hidden": true,
                    })}
                  </div>
                  <span className="min-w-0 font-display text-xs font-bold uppercase tracking-widest text-foreground sm:text-sm">
                    STEP {step.step} — {step.title}
                  </span>
                </div>
                <p className="text-sm font-space leading-relaxed text-muted-foreground/90">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
