"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const faqs = [
  {
    q: "Is this a live Canvas service?",
    a:
      "No. This is a static product preview. No live account, institution data, or real authentication is included.",
  },
  {
    q: "Who is the product designed for?",
    a:
      "Students, mentors, faculty, staff, academic leaders, institution admins, and finance teams at colleges, universities, schools, and training centres.",
  },
  {
    q: "Are pricing and plan limits active?",
    a:
      "No. Pricing is not configured in this preview — all plans say \"Discuss pricing\" and require direct contact.",
  },
];

export function CanvasFAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        FAQ
      </span>

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="eyebrow">Frequently asked questions</div>
          <h2 className="max-w-[55ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.06em] text-[#080808] sm:text-[3rem]">
            Common questions
          </h2>
          <p className="mt-4 max-w-[60ch] text-[#626262] leading-relaxed sm:text-base">
            Everything you need to know about the Arrise Canvas preview.
          </p>
        </div>

        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="mt-12 max-w-[50ch] mx-auto space-y-3"
        >
          {faqs.map(({ q, a }) => (
            <motion.div
              key={q}
              variants={item}
              className="card p-5"
            >
              <button
                className="flex w-full items-center justify-between py-3 text-left"
                aria-expanded="false"
              >
                <h3 className="text-sm font-semibold text-[#080808]">{q}</h3>
                <ChevronDown className="h-4 w-4 text-[#858585] transition-transform" aria-hidden="true" />
              </button>
              <p className="mt-3 text-[13px] leading-relaxed text-[#626262]">
                {a}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="link-arrow"
          >
            Browse all FAQs
            <span className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
