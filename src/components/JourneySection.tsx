"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Rocket, Sparkles } from "lucide-react";
import { journey, profile } from "@/lib/data";
import {
  Cloud,
  PixelHeart,
  PixelStar,
  SectionHeading,
  Starburst,
} from "@/components/RetroDecor";

const ease = [0.22, 1, 0.36, 1] as const;

export function JourneySection() {
  const reduce = useReducedMotion();

  return (
    <section id="journey" className="relative overflow-hidden section-pad">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Cloud className="absolute -left-8 top-24 w-52 text-white/35" />
        <Starburst className="absolute left-[52%] top-[6%] h-4 w-4 text-white/70" />
        <PixelHeart className="absolute right-[6%] bottom-[12%] h-7 w-7 rotate-6" />
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
            eyebrow="My journey"
            title="The road so far"
            subtitle="A few real milestones from the last few years of learning, making, and working with people."
          />
          <span className="hand max-w-[220px] rotate-2 text-xl text-cream md:text-right">
            no shortcuts,
            <br />
            just lots of reps.
          </span>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="space-y-5"
          >
            <div className="paper paper-yellow relative rotate-[-1.5deg] p-5">
              <span className="tape -top-2.5 right-5 bg-yellow/60" aria-hidden="true" />
              <p className="font-heading text-lg leading-none text-ink">By the numbers</p>
              <div className="mt-4 divide-y-2 divide-ink/15">
                {profile.metrics.map((metric) => (
                  <div key={metric.label} className="py-3 first:pt-0 last:pb-0">
                    <div className="font-heading text-[2.6rem] leading-none text-forest">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-ink/60">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-forest" aria-hidden="true" />
            </div>

            <div className="paper rotate-[1.2deg] bg-white p-4">
              <p className="hand text-xl leading-tight text-forest">
                3+ years of doing the work, not just talking about it.
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-forest hover:text-green"
              >
                Add your project
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="paper relative p-5 sm:p-7"
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />
            <div className="flex items-center justify-between gap-3">
              <span className="sticky-note">The timeline</span>
              <span className="grid h-9 w-9 rotate-6 place-items-center border-2 border-ink bg-green text-white shadow-[3px_3px_0_rgba(0,48,22,0.3)]">
                <Rocket className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <ol className="relative mt-6 space-y-6 border-l-2 border-dashed border-forest/30 pl-7 sm:pl-8">
              {journey.map((milestone, index) => (
                <motion.li
                  key={milestone.marker}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease }}
                  className="relative"
                >
                  <span
                    className="absolute -left-[38px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-forest bg-grass text-forest sm:-left-[42px]"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                  </span>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-green">
                    {milestone.marker}
                  </p>
                  <h3 className="mt-0.5 font-heading text-xl leading-none text-forest">
                    {milestone.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-ink/65">
                    {milestone.description}
                  </p>
                </motion.li>
              ))}
            </ol>

            <PixelStar className="absolute -bottom-3 -right-3 h-7 w-7" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
