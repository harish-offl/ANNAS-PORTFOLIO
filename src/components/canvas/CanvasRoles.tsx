"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Building2, Lock, BarChart, Crown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const roles = [
  {
    icon: User,
    title: "Student",
    blurb: "Courses, assignments, grades, and progress in one view.",
  },
  {
    icon: GraduationCap,
    title: "Mentor",
    blurb: "Guide students, share resources, and track mentee progress.",
  },
  {
    icon: Building2,
    title: "Faculty / Staff",
    blurb: "Manage classes, rosters, and academic operations.",
  },
  {
    icon: Lock,
    title: "HOD",
    blurb: "Oversee departments, approve workflows, and review reports.",
  },
  {
    icon: BarChart,
    title: "Institution Admin",
    blurb: "Institutional settings, roles, and campus-wide reporting.",
  },
  {
    icon: Crown,
    title: "SaaS Super Admin",
    blurb: "Manage multiple institutions and platform-wide configuration.",
  },
];

export function CanvasRoles() {
  return (
    <section
      id="roles"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        Roles
      </span>

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="eyebrow">Role-aware workspaces</div>
          <h2 className="max-w-[55ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.06em] text-ink sm:text-[3rem]">
            A workspace for every role
          </h2>
          <p className="mt-4 max-w-[60ch] text-body leading-relaxed sm:text-base">
            Tailored views and permissions for students, mentors, faculty,
            staff, and administrators.
          </p>
        </div>

        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {roles.map((role) => (
            <motion.div
              key={role.title}
              variants={item}
              className="card p-6 flex flex-col gap-3 h-full group"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink shrink-0 group-hover:border-yellow transition-colors">
                <role.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold text-ink group-hover:text-ink">
                {role.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-body">
                {role.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <a
            href="#platform-preview"
            className="link-arrow"
          >
            Open platform preview
            <span className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
