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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 8500);
    return () => clearTimeout(timer);
  }, []);

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
        initial={{ opacity: 1, y: 0 }}
        animate={showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden ${showIntro ? "" : "pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_70%)]" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-[0.15em] uppercase text-gray-400">
            Hello
          </h2>
          <AppleHelloEnglishEffect speed={1.1} className="w-full max-w-2xl" />
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
