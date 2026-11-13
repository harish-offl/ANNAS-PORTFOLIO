"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Check, Building, Presentation, Calendar } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const steps = [
  {
    step: "01",
    title: "Create an institution workspace",
    blurb: "Set up your college, school, or training centre workspace.",
    icon: Building,
  },
  {
    step: "02",
    title: "Configure departments, courses and academic terms",
    blurb: "Structure subjects, courses, and academic calendars.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Invite students and employees",
    blurb: "Add learners and staff with role-based access.",
    icon: Users,
  },
  {
    step: "04",
    title: "Assign authorized roles and permissions",
    blurb: "Set who can view, edit, and manage each area.",
    icon: Check,
  },
  {
    step: "05",
    title: "Coordinate teaching, learning and operations",
    blurb: "Run classes, assignments, and daily workflows together.",
    icon: Presentation,
  },
  {
    step: "06",
    title: "Review reports and progress",
    blurb: "Track performance and institutional progress at a glance.",
    icon: ArrowRight,
  },
];

export function CanvasHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 bg-card"
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="eyebrow">How it works</div>
          <h2 className="max-w-[55ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.06em] text-ink sm:text-[3rem]">
            From setup to learning in six steps
          </h2>
          <p className="mt-4 max-w-[60ch] text-body leading-relaxed sm:text-base">
            Get your institution up and running on Arrise Canvas quickly and
            with clarity.
          </p>
        </div>

        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.step}
              variants={item}
              className="card p-6 flex flex-col gap-4 h-full"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink shrink-0">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-subtle">
                {step.step}
              </span>
              <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-body">
                {step.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-[11px] text-subtle text-center max-w-[55ch] mx-auto">
          Illustrative workflow. Actual setup, roles, and data access require
          separate configuration.
        </p>
      </div>
    </section>
  );
}
