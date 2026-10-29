import { Navbar } from "@/components/Navbar";
import { CurvedBanner } from "@/components/CurvedBanner";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CreativeWorkSection } from "@/components/CreativeWorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
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
