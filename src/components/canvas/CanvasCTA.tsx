"use client";

import { motion } from "framer-motion";

export function CanvasCTA() {
  return (
    <section
      id="platform-preview"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 bg-[#f7f7f7]"
    >
      <div className="section-container relative z-10">
        <div className="card p-10 sm:p-16 lg:p-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 overflow-hidden relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#fff000] to-transparent blur-lg opacity-20" aria-hidden="true" />
          <div className="relative z-10 flex-1">
            <h2 className="text-[clamp(1.6rem,4vw,2rem)] font-extrabold leading-none tracking-[-0.04em] text-[#080808] sm:text-[2.25rem]">
              Preview the roles and shared platform architecture
            </h2>
            <p className="mt-4 max-w-[45ch] text-[#626262] leading-relaxed sm:text-base">
              Explore how students, mentors, faculty, and administrators each
              experience Arrise Canvas.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <a href="/signup" className="btn-dark">
              Get started
            </a>
            <a href="/contact" className="btn-light">
              Talk to our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
