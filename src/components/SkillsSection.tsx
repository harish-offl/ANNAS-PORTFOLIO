"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { toolGroups } from "@/lib/data";
import {
  Cloud,
  PixelCursor,
  PixelSmiley,
  SectionHeading,
  Starburst,
} from "@/components/RetroDecor";

const ease = [0.22, 1, 0.36, 1] as const;

export function SkillsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative overflow-hidden section-pad">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Cloud className="absolute right-[4%] top-[12%] w-48 text-white/35" />
        <Starburst className="absolute left-[8%] bottom-[18%] h-5 w-5 text-yellow/80" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <SectionHeading
            eyebrow="Skills & tools"
            title="The creative toolkit"
            subtitle="Tools I use to bring ideas to life — organised like my desktop, not a list of logos."
          />
          <span className="sticky-note -rotate-2">double-click not required</span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          className="relative mx-auto mt-10 max-w-5xl"
        >
          <div className="retro-window">
            <div className="retro-window__bar">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="retro-dot bg-yellow" />
                <span className="retro-dot bg-cream" />
                <span className="retro-dot bg-grass" />
              </div>
              <span className="min-w-0 flex-1 truncate text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/90">
                skills_and_tools.exe
              </span>
              <div className="flex items-center gap-2 text-white/80" aria-hidden="true">
                <Minus className="h-3.5 w-3.5" />
                <Square className="h-3 w-3" />
                <X className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="bg-cream p-4 sm:p-6 lg:p-8">
              <div className="grid gap-7 md:grid-cols-3 md:gap-5 lg:gap-8">
                {toolGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="flex items-center gap-2 border-b-2 border-dashed border-forest/25 pb-2 font-heading text-lg leading-none text-forest">
                      <span className="h-2.5 w-2.5 bg-grass" aria-hidden="true" />
                      {group.title}
                    </h3>
                    <ul className="mt-3 grid grid-cols-2 gap-2">
                      {group.items.map((tool) => (
                        <li
                          key={tool.name}
                          className="group flex min-w-0 items-center gap-2 border-2 border-forest/15 bg-white p-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/40 hover:bg-yellow/25"
                        >
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center border border-ink/20 font-heading text-[13px] leading-none text-white shadow-[2px_2px_0_rgba(21,21,21,0.18)]"
                            style={{ backgroundColor: tool.color }}
                            aria-hidden="true"
                          >
                            {tool.abbr}
                          </span>
                          <span className="min-w-0 break-words text-[10px] font-extrabold leading-tight text-ink/80">
                            {tool.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-forest/20 pt-4">
                <p className="hand text-lg text-forest">
                  creative + technical = better results.
                </p>
                <div className="flex items-center gap-2" aria-hidden="true">
                  <PixelSmiley className="h-6 w-6" />
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-ink/40">
                    constantly learning
                  </span>
                </div>
              </div>
            </div>
          </div>

          <PixelCursor className="absolute -bottom-5 -right-3 h-10 w-10 sm:-right-6" />
          <span className="absolute -left-3 -top-3 hidden h-5 w-5 bg-yellow sm:block" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
