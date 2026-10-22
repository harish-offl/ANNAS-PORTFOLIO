"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import { devProcess } from "@/lib/data";

const stepIcons: Record<string, any> = {
  Search,
  PenTool,
  Code,
  Rocket,
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
            <span className="sticky-note bg-yellow-100 border-yellow-200 tilt-n3">
              <span className="font-space text-xs font-bold text-yellow-900 uppercase tracking-tighter">
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

        <div className="relative max-w-3xl mx-auto overflow-guard">
          {/* Vertical timeline line - desktop only */}
          <div className="hidden md:block absolute left-[12%] top-0 bottom-0 w-px bg-primary/20" />

          {devProcess.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ x: 4 }}
              className="relative mb-12 md:mb-16 group overflow-guard"
            >
              <div
                className={`relative z-content mb-4 flex items-center gap-3 md:absolute md:top-4 md:mb-0 ${
                  i % 2 === 0 ? "md:left-[-72px] md:right-auto" : "md:left-auto md:right-[-72px]"
                }`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card font-display text-xs font-bold text-primary shadow-sm shrink-0">
                  {step.step}
                </span>
                <div
                  className={`h-10 w-10 rounded-full border border-border/60 shadow-sm shrink-0 ${
                    i % 2 === 0
                      ? "bg-blue-50 border-blue-200 tilt-n3"
                      : "bg-pink-50 border-pink-200 tilt-3"
                  }`}
                />
              </div>

              <div
                className={`paper-card p-5 sm:p-6 ${
                  i % 2 === 0 ? "md:pl-[72px] md:pr-0" : "md:pl-0 md:pr-[72px]"
                } ${i % 2 === 0 ? "" : "bg-secondary/30"} overflow-guard min-w-0`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    {stepIcons[step.step] ? (
                      React.createElement(stepIcons[step.step], {
                        className: "h-4 w-4",
                      })
                    ) : null}
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest min-w-0">
                    STEP {step.step} — {step.title}
                  </span>
                </div>
                <p className="text-sm font-space text-muted-foreground/90 leading-relaxed">
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
