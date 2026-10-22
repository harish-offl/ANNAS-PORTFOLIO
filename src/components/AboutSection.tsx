"use client";

import { motion } from "framer-motion";
import { Clapperboard, Rocket, Wand2, Users, MapPin } from "lucide-react";
import { profile, skillGroups } from "@/lib/data";

const aboutParagraphs = profile.about.split("\n\n").filter(Boolean);

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative section-py overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-decorative grid-bg" />
      <div className="section-container relative z-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-center overflow-guard">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-1 lg:col-span-1"
          >
            <div className="mb-6 flex items-center gap-2 overflow-guard">
              <span className="sticky-note bg-yellow-100 border-yellow-200 tilt-n3">
                <span className="font-space text-xs font-bold text-yellow-900 uppercase tracking-tighter">
                  ABOUT ME
                </span>
              </span>
            </div>
            <h2 className="font-display font-normal leading-[1.02] text-display-md heading-gradient text-balance">
              Meet Annamalai.
            </h2>
            <div className="rule-gradient mt-6 w-24" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-1 lg:col-span-2"
          >
            <div className="relative overflow-guard">
              <div className="relative rounded-xl overflow-hidden border border-border/60 shadow-lg">
                <div className="relative h-56 sm:h-72 md:h-80 bg-secondary/30 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 px-4 text-center">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border-4 border-primary/30 bg-secondary flex items-center justify-center">
                      <Clapperboard className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary" />
                    </div>
                    <span className="font-caveat text-base sm:text-lg italic text-muted-foreground">
                      Creative Developer &amp; Content Creator
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 left-3 z-content sticky-note bg-mint-100 border-mint-200 tilt-3">
                <span className="font-space text-[10px] font-bold text-mint-900 uppercase tracking-tighter">
                  MADURAI, INDIA
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-2 lg:col-span-2 space-y-6 overflow-guard"
          >
            {aboutParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-base sm:text-lg font-space leading-relaxed text-foreground/90 text-balance"
              >
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4 overflow-guard"
          >
            <div className="space-y-4 overflow-guard">
              {[
                { icon: MapPin, label: "Location", value: profile.location },
                { icon: Users, label: "Education", value: profile.education },
                { icon: Rocket, label: "Experience", value: profile.experience },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 overflow-guard"
                >
                  <div className="mt-1 grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-card text-primary shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-space font-bold uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="block text-sm font-space text-foreground">
                      {item.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="col-span-1 md:col-span-2 lg:col-span-3 mt-4 lg:mt-0 overflow-guard"
          >
            <div className="flex flex-wrap gap-2.5 overflow-guard">
              {profile.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                  whileHover={{ y: -2 }}
                  className="sticky-note bg-primary/5 border-primary/25 tilt-n1 hover:bg-primary/10 hover:border-primary/40 transition-colors shrink-0"
                >
                  <span className="font-space text-[11px] font-bold text-primary uppercase tracking-tighter">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
