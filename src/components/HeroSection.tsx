"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  connectLinks,
  experienceCard,
  profile,
  projects,
  specializations,
} from "@/lib/data";
import { WhatsAppIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const connectIconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
  mail: Mail,
  whatsapp: WhatsAppIcon,
};

export function HeroSection() {
  const reduce = useReducedMotion();
  const featured = projects.find((project) => project.id === "bangles-by-beauty") ?? projects[0];

  return (
    <section
      id="about"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        Developer
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -right-16 top-28 h-52 w-52 rounded-full border border-yellow/50" />
        <span className="absolute right-10 top-44 h-2.5 w-2.5 rounded-full bg-yellow" />
        <span className="absolute left-[4%] top-[52%] hidden h-24 w-px bg-line lg:block" />
        <span className="absolute left-[4%] top-[52%] hidden h-2 w-2 -translate-x-[3.5px] rounded-full bg-yellow lg:block" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:items-start lg:gap-10 xl:gap-16">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="min-w-0"
          >
            <motion.div variants={item} className="eyebrow">
              Partners in progress
            </motion.div>

            <motion.div variants={item} className="relative mt-6">
              <div className="mb-5 flex justify-end sm:absolute sm:right-0 sm:top-0 sm:mb-0">
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.06, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="grid h-16 w-16 place-items-center rounded-full border border-yellow bg-white text-lg font-extrabold tracking-[-0.04em] text-ink shadow-soft sm:h-[72px] sm:w-[72px] sm:text-xl"
                  aria-label="MA monogram"
                >
                  {profile.monogram}
                </motion.div>
              </div>

              <h1 className="max-w-[12ch] text-hero-name text-ink">
                {profile.name}
              </h1>

              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-body sm:text-[15px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink">
                  {profile.founderTitle}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-yellow sm:block" aria-hidden="true" />
                <span className="text-subtle">Madurai, India</span>
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-7 max-w-[62ch] text-[15px] leading-[1.85] text-body sm:text-base"
            >
              {profile.aboutProfile}
            </motion.p>

            <motion.div variants={item} className="mt-9">
              <div className="group card-soft relative overflow-hidden border-l-[3px] border-l-yellow p-5 transition-colors duration-300 hover:border-yellow sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Featured project
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
                    Live website
                  </span>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center lg:grid-cols-[minmax(0,1fr)_190px]">
                  <div className="min-w-0">
                    <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-ink sm:text-[28px]">
                      {featured.title}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-body sm:text-sm">
                      {featured.description}
                    </p>
                    <a
                      href={featured.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow mt-4"
                    >
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <a
                    href={featured.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${featured.title} website`}
                    className="relative block aspect-[4/3] overflow-hidden rounded-xl border border-line bg-white"
                  >
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 72px), 190px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-9">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink">
                  Connect
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {connectLinks.map((link) => {
                  const Icon = connectIconMap[link.icon];
                  const external = link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {};

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      {...external}
                      className="pill group min-w-0"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-ink transition-colors duration-200 group-hover:bg-yellow">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-subtle">
                          {link.label}
                        </span>
                        <span className="block truncate text-xs font-semibold text-ink">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="ml-auto h-3.5 w-3.5 shrink-0 text-subtle transition-colors group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
              
              <div className="mt-6 h-px bg-gradient-to-r from-yellow/50 via-yellow to-transparent" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <aside className="min-w-0 space-y-5 lg:pt-2">
            <Reveal delay={0.08}>
              <div className="card p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink">
                    Specializations
                  </h2>
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
                </div>

                <ul className="mt-5 space-y-0">
                  {specializations.map((specialization) => (
                    <li
                      key={specialization}
                      className="flex items-center gap-3 border-b border-line py-2.5 text-[13px] font-medium text-ink last:border-0 last:pb-0 first:pt-0"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" aria-hidden="true" />
                      {specialization}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="card relative overflow-hidden p-6">
                <span
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-yellow/60"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink">
                    Experience
                  </h2>
                  <Clock3 className="h-4 w-4 text-subtle" aria-hidden="true" />
                </div>
                <p className="mt-5 text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none tracking-[-0.06em] text-ink">
                  {experienceCard.value}
                </p>
                <p className="mt-3 max-w-[30ch] text-[13px] leading-relaxed text-body">
                  {experienceCard.description}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="card-soft p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-yellow text-ink">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink">
                      Available for freelance
                    </p>
                    <p className="mt-0.5 text-[11px] text-subtle">Remote &amp; on-site projects</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5 border-t border-line pt-4">
                  <p className="flex items-center gap-2 text-[11px] font-medium text-body">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
                    {profile.location}
                  </p>
                  <p className="flex items-center gap-2 text-[11px] font-medium text-body">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
                    Founder at {profile.agency}
                  </p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
