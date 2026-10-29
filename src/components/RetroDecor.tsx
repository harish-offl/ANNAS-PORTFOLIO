import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PaperLabel({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode;
  tone?: "green" | "white" | "yellow";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "paper-label",
        tone === "white" && "paper-label--white",
        tone === "yellow" && "paper-label--yellow",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative",
        align === "center" && "text-center",
        className,
      )}
    >
      <PaperLabel>{eyebrow}</PaperLabel>
      <h2 className="billboard-text mt-5 text-[clamp(2.1rem,5.4vw,4.3rem)] leading-[0.9] text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "section-subtitle mt-4 max-w-2xl text-balance",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function SelectionFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="selection-outline" aria-hidden="true" />
      <span className="selection-handle -left-[7px] -top-[7px]" aria-hidden="true" />
      <span className="selection-handle -right-[7px] -top-[7px]" aria-hidden="true" />
      <span className="selection-handle -bottom-[7px] -left-[7px]" aria-hidden="true" />
      <span className="selection-handle -bottom-[7px] -right-[7px]" aria-hidden="true" />
      {children}
    </div>
  );
}

export function PixelSmiley({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("pixelated", className)}
    >
      <circle cx="8" cy="8" r="7.2" fill="#FFE52B" stroke="#151515" strokeWidth="1.2" />
      <rect x="4.4" y="4.8" width="2.2" height="2.6" fill="#151515" />
      <rect x="9.4" y="4.8" width="2.2" height="2.6" fill="#151515" />
      <path d="M4.4 10.2h1.6v1.1h4v-1.1h1.6v1.1h-1.6v1.1H6v-1.1H4.4z" fill="#151515" />
    </svg>
  );
}

export function PixelStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className={cn("pixelated", className)}
    >
      <path
        d="M9 0.8 11 6l5.3 0.4-4.1 3.4 1.3 5.2L9 12l-4.5 3 1.3-5.2L1.7 6.4 7 6z"
        fill="#FFE52B"
        stroke="#151515"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PixelBolt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 18"
      aria-hidden="true"
      className={cn("pixelated", className)}
    >
      <path
        d="M8.6 0.6 1 10.2h4.2L4.1 17.4l8.9-11.1H8L8.6 0.6Z"
        fill="#FFE52B"
        stroke="#151515"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PixelHeart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 15"
      aria-hidden="true"
      className={cn("pixelated", className)}
    >
      <path
        d="M2 2h4v2h4V2h4v2h1v6h-2v2H9v2H7v-2H4v-2H3V4H2V2Z"
        fill="#FFE52B"
        stroke="#151515"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PixelCursor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M3 1.8 19.4 12l-6.3 1.7-3.2 6.4L3 1.8Z"
        fill="#FFFDF2"
        stroke="#151515"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 12c19 28 42 40 76 39 10 0 17-3 23-9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="m95 28 13 14-19 2"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31c7 1 14 5 17 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 5"
      />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 9c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Cloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 100"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <ellipse cx="92" cy="58" rx="74" ry="30" />
      <circle cx="54" cy="50" r="30" />
      <circle cx="104" cy="34" r="38" />
      <circle cx="150" cy="54" r="27" />
      <ellipse cx="96" cy="78" rx="62" ry="16" />
    </svg>
  );
}

export function Starburst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 0.5 14 9l8.5 3L14 15l-2 8.5L10 15 1.5 12 10 9z" />
    </svg>
  );
}

export function GrassDivider({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0 96C170 46 318 40 480 82c160 42 286 38 460-8 148-39 300-34 500 18v148H0V96Z"
          fill="#006B36"
        />
        <path
          d="M0 132c188-48 360-38 540 0 178 38 338 26 520-16 152-35 286-24 380 4v120H0V132Z"
          fill="#008744"
        />
        <path
          d="M0 172c198-34 382-22 566 8 194 32 360 20 532-18 126-28 238-22 342 0v78H0v-68Z"
          fill="#48B916"
        />
        <g fill="#3EA30F" opacity="0.75">
          <path d="M120 170c-4-12-1-22 5-28 3 10 2 19-5 28Z" />
          <path d="M134 174c6-12 14-17 22-17-3 9-10 15-22 17Z" />
          <path d="M360 178c-3-11 0-20 6-25 2 9 1 17-6 25Z" />
          <path d="M690 170c-5-11-2-20 4-26 3 9 2 18-4 26Z" />
          <path d="M1010 166c-4-12 0-21 7-27 2 10 0 19-7 27Z" />
          <path d="M1270 172c7-11 15-15 23-15-4 9-12 14-23 15Z" />
        </g>
        <g fill="#5FCF2B" opacity="0.8">
          <path d="M250 186c-4-13 0-23 6-29 3 10 1 20-6 29Z" />
          <path d="M520 190c7-12 15-17 24-17-4 10-12 16-24 17Z" />
          <path d="M860 184c-4-12 0-22 6-28 3 10 1 19-6 28Z" />
          <path d="M1160 190c7-11 15-16 23-16-4 9-12 15-23 16Z" />
        </g>
      </svg>
    </div>
  );
}
