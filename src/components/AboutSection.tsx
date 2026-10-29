"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  FolderOpen,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";
import {
  Cloud,
  DoodleArrow,
  PaperLabel,
  PixelHeart,
  PixelSmiley,
  PixelStar,
  Starburst,
} from "@/components/RetroDecor";

const ease = [0.22, 1, 0.36, 1] as const;

const facts = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Briefcase, label: "Experience", value: `${profile.experience} of creative work` },
  { icon: GraduationCap, label: "Education", value: profile.education },
  { icon: Sparkles, label: "Availability", value: profile.availability },
];

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden section-pad">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Cloud className="absolute right-[-3rem] top-16 w-56 text-white/45" />
        <Cloud className="absolute -left-10 bottom-24 w-48 text-white/30" />
        <PixelStar className="absolute left-[5%] top-[20%] h-8 w-8 animate-twinkle" />
        <PixelHeart className="absolute right-[7%] bottom-[18%] h-6 w-6 rotate-12" />
        <Starburst className="absolute left-[48%] top-[8%] h-4 w-4 text-white/70" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10"
        >
          <div>
            <PaperLabel>About me</PaperLabel>
            <h2 className="billboard-text mt-5 max-w-2xl text-[clamp(2.1rem,5.4vw,4.3rem)] leading-[0.9] text-balance">
              More than just a creator
            </h2>
          </div>
          <p className="hand max-w-[230px] -rotate-2 text-[clamp(1.3rem,2.5vw,1.7rem)] text-yellow">
            curiosity, craft &amp; a lot of coffee
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="paper relative rotate-[-0.4deg] p-5 sm:p-8 lg:p-10"
        >
          <span className="tape -top-3 left-10 sm:left-20" aria-hidden="true" />
          <span className="tape tape-green -top-2 right-8 rotate-3 sm:right-24" aria-hidden="true" />

          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="relative">
              <span className="sticky-note mb-4">Introducing</span>
              <h3 className="max-w-md font-heading text-[clamp(1.7rem,3.4vw,2.7rem)] leading-[0.94] text-forest">
                Creative by nature.
                <br />
                Practical by design.
              </h3>
              <p className="hand mt-4 max-w-sm rotate-[-1deg] text-[clamp(1.35rem,2.4vw,1.8rem)] text-ink/75">
                &ldquo;Good work starts with a clear idea.&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3" aria-hidden="true">
                <span className="sticker h-12 w-12 -rotate-6 !bg-green text-white">
                  <PixelSmiley className="h-7 w-7" />
                </span>
                <span className="grid h-10 w-10 rotate-6 place-items-center border-2 border-ink bg-yellow text-ink shadow-[3px_3px_0_rgba(0,48,22,0.3)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="hand text-lg text-forest/70">make it mean something.</span>
              </div>

              <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start gap-2.5 border-2 border-forest/15 bg-white/70 p-2.5"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-grass/15 text-forest">
                      <fact.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-extrabold uppercase tracking-[0.12em] text-forest/55">
                        {fact.label}
                      </span>
                      <span className="block text-[11px] font-semibold leading-snug text-ink">
                        {fact.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="space-y-4">
                {profile.aboutParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-[1.75] text-ink/80 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {profile.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="border-2 border-forest/25 bg-grass/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.07em] text-forest"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#work" className="btn-retro btn-green w-full sm:w-auto">
                  Explore my work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={profile.portfolioFiles}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro btn-white w-full sm:w-auto"
                >
                  <FolderOpen className="h-4 w-4" aria-hidden="true" />
                  Video portfolio
                </a>
              </div>

              <DoodleArrow
                className="absolute -bottom-12 right-2 hidden h-14 w-20 rotate-[155deg] text-forest/35 sm:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <span className="hand -rotate-1 text-xl text-cream drop-shadow-[1px_1px_0_rgba(0,64,30,0.6)]">
            still learning, still building.
          </span>
          <span className="sticky-note">Madurai → everywhere</span>
        </div>
      </div>
    </section>
  );
}
