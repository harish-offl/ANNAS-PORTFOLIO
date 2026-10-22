"use client";

import { motion } from "framer-motion";

export function StickyNote({
  children,
  color = "bg-yellow-100 border-yellow-200 text-yellow-900",
  rotate = "tilt-0",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  rotate?: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative inline-block p-3 rounded-sm shadow-sm border ${color} ${rotate} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function PolaroidCard({
  children,
  rotate = "tilt-0",
  className = "",
  imageClassName = "",
}: {
  children: React.ReactNode;
  rotate?: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative ${rotate} ${className}`}
    >
      <div className="polaroid p-3 shadow-sm">
        <div className="relative overflow-hidden rounded-sm border border-border/40 mb-2">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const containerClass =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={containerClass}>
      <div
        className={`flex items-center gap-2 mb-6 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <span className="sticky-note bg-yellow-100 border-yellow-200 tilt-n3 shrink-0">
          <span className="font-space text-xs font-bold text-yellow-900 uppercase tracking-tighter">
            {eyebrow}
          </span>
        </span>
      </div>
      <h2 className="font-display font-normal leading-[1.05] text-display-sm heading-gradient mb-6 text-balance">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}
