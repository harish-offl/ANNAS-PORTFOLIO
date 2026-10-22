"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
  const statusColors: Record<string, string> = {
    live: "bg-green-100 border-green-200 text-green-900",
    concept: "bg-yellow-100 border-yellow-200 text-yellow-900",
    private: "bg-secondary border-border/60 text-foreground",
  };

  const statusLabels: Record<string, string> = {
    live: "LIVE",
    concept: "CONCEPT",
    private: "PRIVATE",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -3 }}
      className="group relative overflow-guard min-w-0"
    >
      <Link
        href={`#project-${project.id}`}
        className="block"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById(`project-${project.id}`);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="paper-card p-0 overflow-hidden">
          <div className="relative aspect-16-10 overflow-hidden">
            <div
              className="absolute inset-0 bg-secondary/30 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                <Play className="h-6 w-6 text-primary" />
                <span className="font-space text-xs font-bold text-primary uppercase">
                  View Project
                </span>
              </div>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="p-5 overflow-guard">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`inline-block px-2 py-0.5 rounded text-[10px] font-space font-bold uppercase ${statusColors[project.status]}`}
              >
                {statusLabels[project.status]}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="h-3 w-3 text-primary" />
              </div>
            </div>
            <h3 className="font-display text-lg font-normal text-foreground mb-1 tracking-tighter">
              {project.title}
            </h3>
            <span className="text-[10px] font-space font-bold text-muted-foreground/70 uppercase tracking-widest block mb-2">
              {project.category}
            </span>
            <p className="mt-0 text-xs font-space text-muted-foreground/80 leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 overflow-guard">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-0.5 rounded border border-border/60 bg-card/50 text-[10px] font-space font-bold text-muted-foreground/80 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.year && (
              <span className="mt-3 block text-[10px] font-space font-bold text-muted-foreground tracking-widest uppercase">
                {project.year}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="work"
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
                SELECTED WORKS
              </span>
            </span>
          </div>
          <h2 className="font-display font-normal leading-[1.05] text-display-sm heading-gradient mb-6 text-balance">
            My Portfolio.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-balance">
            A selection of websites, digital products, and creative projects
            I&apos;ve worked on.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-6xl mx-auto overflow-guard">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProjectCard };
