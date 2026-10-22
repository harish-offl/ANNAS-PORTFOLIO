"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe2 } from "lucide-react";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
  const statusLabels: Record<Project["status"], string> = {
    live: "Live",
    concept: "Concept",
    private: "Private",
  };

  const domain = project.demoUrl
    ? new URL(project.demoUrl).hostname.replace(/^www\./, "")
    : "Project preview";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -4 }}
      className="paper-card group flex h-full min-w-0 flex-col overflow-hidden"
    >
      <div
        role="img"
        aria-label={`${project.title} website preview placeholder`}
        className="relative flex h-24 items-center justify-center overflow-hidden border-b border-border/70 bg-secondary px-4"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div
          aria-hidden="true"
          className="absolute left-3 top-3 flex items-center gap-1.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative flex flex-col items-center gap-1">
          <Globe2 className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="max-w-full truncate text-xs text-muted-foreground">
            {domain}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex min-h-6 items-center justify-between gap-2">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
            {statusLabels[project.status]}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-3 flex min-h-7 flex-wrap content-start gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] leading-5 text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live Website: ${project.title} (opens in a new tab)`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Live Website
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="relative section-py overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-decorative grid-bg" />
      <div className="section-container relative z-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span className="eyebrow">Selected work</span>
          <h2 className="mt-4 font-display text-display-sm font-semibold text-balance text-foreground">
            Websites built to move ideas forward.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A selection of live websites and independent projects. Open any
            card to explore the finished work.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-4 overflow-guard sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProjectCard };
