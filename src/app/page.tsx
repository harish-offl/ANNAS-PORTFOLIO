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
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 3300);
    return () => clearTimeout(timer);
  }, [showIntro]);

  if (introComplete) {
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
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <AppleHelloEnglishEffect speed={1.1} className="w-full max-w-2xl" />
        </div>
      </motion.div>
    </>
  );
}
