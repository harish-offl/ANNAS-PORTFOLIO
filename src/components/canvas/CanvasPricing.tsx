"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

const tiers = [
  {
    name: "Learner access",
    price: "Discuss pricing",
    blurb: "Access for individual learners and students.",
    features: ["Course access", "Assignments & grades", "Progress tracking", "Mobile app"],
    cta: "Contact us",
  },
  {
    name: "Institution",
    price: "Discuss pricing",
    blurb: "Full workspace for schools and colleges.",
    features: ["All learner features", "Faculty & staff roles", "Department management", "Attendance & calendar", "Reports & analytics"],
    cta: "Contact us",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Discuss pricing",
    blurb: "Multi-institution and district-level deployment.",
    features: ["All institution features", "Multi-institution control", "SaaS super admin", "Custom SLAs", "Priority support"],
    cta: "Contact us",
  },
];

export function CanvasPricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
    >
      <span className="bg-word top-14 hidden sm:block" aria-hidden="true">
        Pricing
      </span>

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="eyebrow">Simple, transparent pricing</div>
          <h2 className="max-w-[55ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-[-0.06em] text-ink sm:text-[3rem]">
            Pricing that fits your institution
          </h2>
          <p className="mt-4 max-w-[60ch] text-body leading-relaxed sm:text-base">
            All plans are discussed directly with our team to match your
            institution&apos;s needs.
          </p>
        </div>

        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={`card p-8 flex flex-col gap-5 h-full relative ${
                tier.featured
                  ? "border-yellow/50 shadow-[0_20px_40px_-12px_rgba(255,240,0,0.25)]"
                  : ""
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink">
                  Most popular
                </span>
              )}
              <h3 className="text-sm font-semibold text-ink">{tier.name}</h3>
              <p className="text-[clamp(1.8rem,4vw,2.2rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                {tier.price}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-body">
                {tier.blurb}
              </p>
              <ul className="mt-3 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[12px] text-body">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow mt-0.5" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="btn-dark w-full text-center"
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
