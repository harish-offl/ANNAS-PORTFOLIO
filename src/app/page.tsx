"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CreativeWorkSection } from "@/components/CreativeWorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      if (animationDone) {
        setShowIntro(false);
      }
    }, 300);
    const safetyTimer = setTimeout(() => {
      setShowIntro(false);
    }, 8000);
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(safetyTimer);
    };
  }, [animationDone]);

  return (
    <>
      <a
        href="#home"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full border border-ink bg-yellow px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-ink focus:not-sr-only"
      >
        Skip to content
      </a>

      <span id="home" className="absolute top-0" aria-hidden="true" />

      <Navbar />

      <motion.div
        initial={{ y: 0 }}
        animate={showIntro ? { y: 0 } : { y: "-100vh" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden ${showIntro ? "" : "pointer-events-none"}`}
      >
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <AppleHelloEnglishEffect
            speed={1.2}
            className="w-full max-w-2xl"
            onAnimationComplete={() => setAnimationDone(true)}
          />
        </div>
      </motion.div>

      <main className="relative overflow-x-clip">
        <HeroSection />
        <ProjectsSection />
        <CreativeWorkSection />
        <ServicesSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
