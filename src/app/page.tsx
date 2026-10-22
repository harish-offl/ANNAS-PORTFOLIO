import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CreativeShowcase } from "@/components/CreativeShowcase";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VideoEditingPortfolioSection } from "@/components/VideoEditingPortfolioSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <HeroSection />
        <CreativeShowcase />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <VideoEditingPortfolioSection />
        <ProcessSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
