"use client";

import { motion } from "framer-motion";
import { Camera, Film, Palette, Cpu, Code, Layout } from "lucide-react";

const collageItems = [
  {
    title: "Website Mockup",
    label: "Web Design",
    icon: Layout,
    rotate: "tilt-n3",
    color: "border-border/70 bg-card",
  },
  {
    title: "Mobile Interface",
    label: "App Design",
    icon: Camera,
    rotate: "tilt-2",
    color: "border-border/70 bg-card",
  },
  {
    title: "Video Timeline",
    label: "Video Editing",
    icon: Film,
    rotate: "tilt-n5",
    color: "border-border/70 bg-card",
  },
  {
    title: "Brand Identity",
    label: "Graphic Design",
    icon: Palette,
    rotate: "tilt-3",
    color: "border-border/70 bg-card",
  },
  {
    title: "AI Automation",
    label: "AI Workflow",
    icon: Cpu,
    rotate: "tilt-n2",
    color: "border-border/70 bg-card",
  },
  {
    title: "Code Editor",
    label: "Development",
    icon: Code,
    rotate: "tilt-4",
    color: "border-primary/30 bg-primary/10",
  },
];

export function CreativeShowcase() {
  return (
    <section
      id="showcase"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      <div className="section-container relative z-content">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 mb-8 overflow-guard">
            <span className="sticky-note tilt-n2 shrink-0">
              <span className="font-space text-xs font-bold text-foreground uppercase tracking-tighter">
                BUILT WITH CURIOSITY
              </span>
            </span>
            <h2 className="font-display font-normal leading-[1.05] text-display-sm heading-gradient text-center sm:text-left text-balance">
              A Little Bit of Everything.
            </h2>
          </div>
          <p className="mx-auto max-w-lg text-muted-foreground text-center text-sm md:text-base text-balance leading-relaxed">
            A curated collage of visual experiments — website mockups, mobile
            interfaces, video timelines, brand identities, and AI concepts.
          </p>
        </div>

          <div
            className="mt-16 relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto overflow-guard"
          >
            {collageItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`relative group cursor-default overflow-guard ${item.rotate}`}
              >
              <div
                className={`polaroid p-2 ${item.color} shadow-sm transition-all duration-300 group-hover:shadow-md`}
              >
                <div className="h-24 md:h-32 rounded-sm overflow-hidden border border-border/40 bg-secondary/40 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                </div>
                <div className="mt-3">
                  <span className="block text-[10px] font-space font-bold uppercase tracking-widest text-muted-foreground/70">
                    {item.label}
                  </span>
                  <span className="block text-xs font-display text-foreground mt-0.5">
                    {item.title}
                  </span>
                </div>
              </div>
              <div
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-card border border-border/60 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-[9px] font-bold text-primary">✓</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
