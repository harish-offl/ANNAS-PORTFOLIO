"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={project.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      className="group block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 rounded-[30px]"
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
    >
      <div className="flex flex-col items-center rounded-[30px] bg-[#EEEEEE] p-[10px] sm:p-3">
        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: "1/1" }}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 639px) calc(50vw - 24px), (max-width: 1023px) calc(50vw - 48px), 280px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        {/* Title */}
        <div className="flex w-full items-center justify-between gap-2 px-2 pb-1 pt-4">
          <p className="flex-1 text-center text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[#080808] sm:text-[17px]">
            {project.title}
          </p>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#858585] transition-colors group-hover:text-[#080808]" aria-hidden="true" />
        </div>
      </div>
    </motion.a>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative section-pad pt-0">
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="mt-4 text-section-title text-ink">Selected work</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body">
                Web experiences, visual stories, and creative digital solutions.
              </p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
              {String(projects.length).padStart(2, "0")} projects / 2024?2025
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease: [0.22,1,0.36,1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-subtle">Have a project in mind?</p>
              <p className="mt-1.5 text-lg font-bold tracking-[-0.03em] text-ink">Let&apos;s build something useful and memorable.</p>
            </div>
            <a href="#contact" className="btn-dark shrink-0">
              Start a Project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
