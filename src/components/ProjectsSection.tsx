"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  ExternalLink,
  Lock,
} from "lucide-react";
import { projectFilters, projects, type Project } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const initialCount = 4;

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  concept: "Concept",
  private: "Private",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-yellow hover:shadow-lift">
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} project`}
        className="relative block aspect-16-10 overflow-hidden border-b border-line bg-card"
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 560px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-yellow px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-ink">
          {project.shortCategory}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-ink/75 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          {project.status === "private" ? (
            <Lock className="h-2.5 w-2.5" aria-hidden="true" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
          )}
          {statusLabel[project.status]}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-subtle">
              {project.category}
            </p>
            <h3 className="mt-1.5 text-xl font-extrabold tracking-[-0.035em] text-ink">
              {project.title}
            </h3>
          </div>
          {project.year ? (
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-subtle">
              {project.year}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-body"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-between gap-2 border-t border-line pt-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink transition-colors hover:text-body"
        >
          <span className="inline-flex items-center gap-2">
            {project.status === "private" ? (
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {project.status === "private" ? "Open login" : "View Project"}
          </span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [expanded, setExpanded] = useState(false);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(filter));
  const visible = expanded ? filtered : filtered.slice(0, initialCount);
  const canExpand = filtered.length > initialCount;

  const handleFilter = (next: (typeof projectFilters)[number]) => {
    setFilter(next);
    setExpanded(false);
  };

  return (
    <section id="projects" className="relative section-pad">
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="mt-4 text-section-title text-ink">Selected work</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body">
                Web experiences, visual stories, and creative digital solutions.
              </p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
              {String(projects.length).padStart(2, "0")} projects / 2024—2025
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {projectFilters.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleFilter(option)}
                className="filter-pill"
                data-active={filter === option}
                aria-pressed={filter === option}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 22, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : (index % 2) * 0.05,
                  ease,
                }}
                className="min-w-0"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-line bg-surface p-6 text-sm text-body">
            No projects in this category yet.
          </p>
        ) : null}

        {canExpand ? (
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="btn-dark"
            >
              {expanded ? "Show Less" : "View All Projects"}
              {expanded ? (
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        ) : null}

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-subtle">
                Have a project in mind?
              </p>
              <p className="mt-1.5 text-lg font-bold tracking-[-0.03em] text-ink">
                Let&apos;s build something useful and memorable.
              </p>
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
