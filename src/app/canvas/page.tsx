"use client";

import { CanvasNavbar } from "@/components/canvas/CanvasNavbar";
import { CanvasHero } from "@/components/canvas/CanvasHero";
import { CanvasFeatures } from "@/components/canvas/CanvasFeatures";
import { CanvasSolutions } from "@/components/canvas/CanvasSolutions";
import { CanvasRoles } from "@/components/canvas/CanvasRoles";
import { CanvasHowItWorks } from "@/components/canvas/CanvasHowItWorks";
import { CanvasPricing } from "@/components/canvas/CanvasPricing";
import { CanvasAbout } from "@/components/canvas/CanvasAbout";
import { CanvasFAQ } from "@/components/canvas/CanvasFAQ";
import { CanvasCTA } from "@/components/canvas/CanvasCTA";
import { CanvasFooter } from "@/components/canvas/CanvasFooter";

export default function CanvasPage() {
  return (
    <>
      <a
        href="#canvas-home"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full border border-ink bg-yellow px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-ink focus:not-sr-only"
      >
        Skip to content
      </a>

      <span id="canvas-home" className="absolute top-0" aria-hidden="true" />

      <CanvasNavbar />

      <main className="relative overflow-x-clip">
        <CanvasHero />
        <CanvasFeatures />
        <CanvasSolutions />
        <CanvasRoles />
        <CanvasHowItWorks />
        <CanvasPricing />
        <CanvasAbout />
        <CanvasFAQ />
        <CanvasCTA />
      </main>

      <CanvasFooter />
    </>
  );
}
