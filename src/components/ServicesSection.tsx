import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Code2,
  LayoutDashboard,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { serviceCards } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutDashboard,
  clapperboard: Clapperboard,
  palette: Palette,
  camera: Camera,
  sparkles: Sparkles,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative section-pad">
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-end md:justify-between md:pt-16">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-4 max-w-2xl text-section-title text-ink">
                What I can build with you
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-body md:text-right">
              One creative partner across development, design, video, and content
              — from the first idea to the final delivery.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <Reveal key={service.id} delay={0.03 + index * 0.04}>
                <article className="group card flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow hover:shadow-soft sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-300 group-hover:border-yellow group-hover:bg-yellow">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold tracking-[-0.035em] text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-body">
                    {service.description}
                  </p>

                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink transition-colors hover:text-body"
                  >
                    Discuss this
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:p-6">
            <p className="max-w-xl text-[13px] leading-relaxed text-body">
              Need something that does not fit neatly into one category? I also
              work on AI automation, digital products, and custom creative
              solutions.
            </p>
            <a href="#contact" className="btn-dark shrink-0">
              Tell me about it
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
