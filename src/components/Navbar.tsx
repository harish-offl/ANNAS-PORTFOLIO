"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon, X, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("#", ""));
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-nav transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <div className="section-container">
        <nav
          className={`flex items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border border-border/80 bg-card/90 backdrop-blur-md shadow-sm"
              : "border-transparent"
          }`}
        >
          {/* Logo - Space Grotesk */}
          <a
            href="#home"
            className="group flex items-center gap-2.5"
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-card font-heading text-sm font-bold text-foreground tracking-tighter group-hover:rotate-[-2deg] transition-transform duration-300`}
            >
              {profile.monogram}
            </span>
            <span className="font-heading text-xs font-semibold tracking-widest uppercase text-foreground">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation - Inter Medium */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
                  active === link.href.replace("#", "")
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle - Inter */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            {/* CTA Button - Space Grotesk Bold */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase transition-transform hover:scale-105"
            >
              LET&apos;S TALK
              <ArrowUpRight className="h-3 w-3" />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation - Inter Medium */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 overflow-hidden rounded-xl border border-border/80 bg-card/95 backdrop-blur-md p-3 md:hidden shadow-lg z-mobile-menu"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg bg-primary px-4 py-3 text-center text-xs font-bold text-primary-foreground uppercase"
              >
                LET&apos;S TALK
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
