"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LogoLoop } from "./LogoLoop";
import "./ToolsSection.css";

export function ToolsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="ts-section section-pad" id="tools" aria-labelledby="tools-heading">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          className="ts-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">What I work with</span>
          <h2 id="tools-heading" className="ts-heading">
            Tools &amp; Technologies.
          </h2>
          <p className="ts-desc">
            From creative ideas to functional digital experiences, these are the
            tools and technologies I use to bring my work to life.
          </p>
          <div className="ts-meta">
            <span className="ts-meta-pill">CREATIVE × TECHNOLOGY</span>
            <span className="ts-meta-pill">13 tools &amp; skills</span>
          </div>
        </motion.div>

        {/* ── Logo Loop ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="ts-loop-wrap"
        >
          <LogoLoop />
        </motion.div>

      </div>
    </section>
  );
}
