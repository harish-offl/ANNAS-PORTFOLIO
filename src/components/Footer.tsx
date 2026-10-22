"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-6 pb-12 sm:flex-row sm:items-center sm:gap-8 overflow-guard">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-card font-display text-xs font-bold text-foreground tracking-tighter shrink-0"
            >
              {profile.monogram}
            </span>
            <span className="font-space text-xs font-bold tracking-widest uppercase text-foreground truncate">
              {profile.name}
            </span>
          </div>
          <p className="max-w-sm text-[11px] font-space text-muted-foreground/80 leading-relaxed text-balance">
            Designed with curiosity. Built with purpose.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-3 py-1.5 text-[10px] font-space font-bold text-muted-foreground uppercase transition-colors hover:bg-secondary hover:text-foreground shrink-0"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </a>
        </div>

        <div className="relative flex overflow-hidden border-y border-border/60 py-6">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] will-change-transform">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-12 pr-12"
              >
                {[
                  "Web Development",
                  "Video Editing",
                  "Graphic Design",
                  "AI Automation",
                  "Branding",
                  "Content Creation",
                ].map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="flex items-center gap-3 text-[10px] font-space font-bold text-muted-foreground/60 uppercase tracking-widest shrink-0 whitespace-nowrap"
                  >
                    {word}
                    <span className="h-1 w-1 rounded-full bg-primary/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-[10px] font-space text-muted-foreground/60 sm:flex-row overflow-guard">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-center">
            Built with Next.js · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
