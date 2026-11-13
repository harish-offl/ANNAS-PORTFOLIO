"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Users, ShieldCheck, Laptop, BarChart3 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const solutions = [
  {
    icon: BookOpen,
    title: "Learning management",
    blurb: "Courses, subjects, and structured materials for every learner.",
  },
  {
    icon: Calendar,
    title: "Assignments & assessments",
    blurb: "Assignment and quiz workflows with due dates and grades.",
  },
  {
    icon: Users,
    title: "Attendance & calendar",
    blurb: "Academic schedules, attendance tracking, and key dates.",
  },
  {
    icon: ShieldCheck,
    title: "Mentoring & communication",
    blurb: "Mentor relationships, announcements, and notifications.",
  },
  {
    icon: Laptop,
    title: "Department operations",
    blurb: "Department, staff, and faculty workflows in one place.",
  },
  {
    icon: BarChart3,
    title: "Administration & reporting",
    blurb: "Institutional settings, role views, and reporting.",
  },
];

export function CanvasSolutions() {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 bg-card"
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="eyebrow">One connected platform</div>
          <h2 className="max-w-[55ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.06em] text-ink sm:text-[3rem]">
            Six workspaces, one institution
          </h2>
          <p className="mt-4 max-w-[60ch] text-body leading-relaxed sm:text-base">
            Role-aware views for students, mentors, faculty, staff, and
            administrators — all sharing the same data.
          </p>
        </div>

        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.title}
              variants={item}
              className="card p-6 flex flex-col gap-3 h-full"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink shrink-0">
                <solution.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold text-ink">{solution.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-body">
                {solution.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
