"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clapperboard, FolderOpen } from "lucide-react";
import { profile } from "@/lib/data";

export function VideoEditingPortfolioSection() {
  return (
    <section
      id="video-editing-portfolio"
      className="section-py border-y border-border/70 bg-secondary/40"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8 md:flex-row md:text-left"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Clapperboard className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">Video editing portfolio</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Stories told through video.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Browse my video editing work and creative portfolio materials
                in Google Drive.
              </p>
            </div>
          </div>
          <a
            href={profile.portfolioFiles}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FolderOpen className="h-4 w-4" aria-hidden="true" />
            View Video Editing Portfolio
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
