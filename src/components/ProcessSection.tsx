import {
  CheckCircle2,
  Compass,
  PenTool,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";
import { workProcess } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Understand: Search,
  Plan: Compass,
  "Design & produce": PenTool,
  "Review & refine": CheckCircle2,
  Deliver: Rocket,
};

export function ProcessSection() {
  return (
    <section id="process" className="relative section-pad">
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-end md:justify-between md:pt-16">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="mt-4 max-w-2xl text-section-title text-ink">
                From idea to delivery
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-body md:text-right">
              A simple, honest process — clear steps, steady progress, and no
              mystery about what happens next.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-9">
          <div
            className="absolute left-0 right-0 top-[52px] hidden border-t border-line lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workProcess.map((step, index) => {
              const Icon = iconMap[step.title] ?? PenTool;
              return (
                <Reveal key={step.step} delay={0.03 + index * 0.05}>
                  <li className="relative">
                    <div className="card flex h-full flex-col p-5 transition-colors duration-300 hover:border-yellow">
                      <div className="flex items-center justify-between gap-2">
                        <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-ink">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-[11px] font-extrabold tracking-[0.12em] text-subtle">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="mt-5 text-base font-extrabold tracking-[-0.03em] text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[12px] leading-relaxed text-body">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-subtle">
                Ready when you are
              </p>
              <p className="mt-1.5 text-lg font-bold tracking-[-0.03em] text-ink">
                Tell me what you are building.
              </p>
            </div>
            <a href="#contact" className="btn-dark shrink-0">
              Start a Project
              <Rocket className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
