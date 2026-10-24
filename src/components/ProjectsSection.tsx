"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { projects } from "@/lib/data";

const projectImages: Record<string, { src: string; alt: string }> = {
  "bangles-by-beauty": {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    alt: "Gold jewellery displayed on a dark surface",
  },
  "smp-food-products": {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
    alt: "Freshly baked bread arranged for a food product display",
  },
  "arrise-digital": {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    alt: "Analytics dashboard on a laptop screen",
  },
  "vaigai-namma-taxi": {
    src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=85",
    alt: "Car ready for a journey",
  },
  focura: {
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
    alt: "Study notes and materials spread across a desk",
  },
  "rml-gate-management": {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern office buildings viewed from below",
  },
  "personal-portfolio": {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    alt: "Creative team collaborating around a laptop",
  },
};

const statusLabels = {
  live: "Live",
  concept: "Concept",
  private: "Private",
} as const;

export function ProjectsSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section
      id="work"
      className="relative section-py overflow-hidden bg-[#f4e8bf] text-[#292416]"
    >
      <div className="section-container relative z-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span className="eyebrow text-[#795d23]">Selected work</span>
          <h2 className="mt-4 font-heading text-display-sm font-semibold text-balance text-[#292416]">
            Websites built to move ideas forward.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-body leading-relaxed text-[#625a45] sm:text-base">
            A selection of websites and independent projects. Select a card to
            explore the project.
          </p>
        </motion.div>

        <div
          id="website-project-grid"
          className="mx-auto grid w-full grid-cols-1 gap-x-5 gap-y-10 overflow-guard min-[768px]:grid-cols-2 min-[1200px]:grid-cols-4"
        >
          {visibleProjects.map((project) => {
            const image = projectImages[project.id];

            if (!project.demoUrl || !image) return null;

            return (
              <NotchedProjectCard
                key={project.id}
                href={project.demoUrl}
                title={project.title}
                description={project.description}
                image={image.src}
                imageAlt={image.alt}
                badge={project.year}
                tags={[
                  statusLabels[project.status],
                  ...project.tags.slice(0, 1),
                ]}
                monochrome
                surface="#f4e8bf"
                accent="#e87528"
                titleClassName="min-h-12 text-base sm:text-lg"
                descriptionClassName="flex-1 text-xs sm:text-sm"
                tagClassName="bg-[#e8d9a9] text-[#4a3c20]"
                className="h-full min-w-0"
              />
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={showAllProjects}
            aria-controls="website-project-grid"
            onClick={() => setShowAllProjects((showAll) => !showAll)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#795d23]/35 bg-[#fff8e6] px-6 py-2.5 text-sm font-semibold text-[#4a3c20] transition-colors hover:border-[#e87528] hover:bg-[#e87528] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87528] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4e8bf]"
          >
            {showAllProjects ? "Show Less" : "View All Projects"}
          </button>
        </div>
      </div>
    </section>
  );
}
