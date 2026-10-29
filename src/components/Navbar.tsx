"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      const marker = window.scrollY + 140;
      let current = "home";

      for (const link of navLinks) {
        const element = document.querySelector(link.href) as HTMLElement | null;
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = link.href.slice(1);
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_12px_36px_-30px_rgba(8,8,8,0.45)]" : "border-transparent"
      }`}
    >
      <div className="section-container flex h-[72px] items-center justify-between gap-4">
        <a
          href="#home"
          className="group flex min-w-0 items-center gap-3"
          aria-label="M.RM. Annamalai — back to home"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-[11px] font-extrabold tracking-[-0.02em] text-ink transition-all duration-300 group-hover:border-yellow group-hover:bg-yellow">
            {profile.monogram}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-sm">
              {profile.name}
            </span>
            <span className="mt-0.5 block truncate text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-subtle sm:text-[10px]">
              {profile.shortRole}
            </span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={active === id}
                aria-current={active === id ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[11px] font-semibold text-body transition-colors hover:border-yellow hover:text-ink xl:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.phone}
          </a>

          <a href="#contact" className="btn-dark hidden !min-h-[40px] !px-4 !py-2 sm:inline-flex">
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-yellow hover:bg-yellow lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="section-container flex flex-col gap-1 py-4"
            >
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active === id
                        ? "bg-yellow text-ink"
                        : "text-body hover:bg-card hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}

              <div className="mt-3 grid gap-2 border-t border-line pt-4">
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-body"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {profile.phone}
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-dark w-full"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
