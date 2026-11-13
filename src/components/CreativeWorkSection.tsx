import {
  ArrowUpRight,
  Clapperboard,
  Megaphone,
  MonitorPlay,
  Play,
  Smartphone,
} from "lucide-react";
import { profile, videoFormats } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const formatIcons = [Smartphone, MonitorPlay, Megaphone];

export function CreativeWorkSection() {
  return (
    <section id="creative" className="relative section-pad pt-0 pb-0">
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-5 border-t border-line pt-12 md:flex-row md:items-end md:justify-between md:pt-16">
            <div>
              <p className="eyebrow">Creative work</p>
              <h2 className="mt-4 max-w-2xl text-section-title text-ink">
                Beyond the browser
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-body md:text-right">
              Video edits, visual direction, and the creative thinking behind the
              digital work.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:gap-16">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h3 className="text-xl font-extrabold tracking-[-0.04em] text-ink sm:text-2xl">
                  Video Editing &amp; Motion
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">
                  Reels · Shorts · Promos
                </span>
              </div>
            </Reveal>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
              <Reveal delay={0.06}>
                <a
                  href={profile.portfolioFiles}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-6 transition-colors duration-300 hover:border-yellow sm:p-8"
                >
                  <span
                    className="pointer-events-none absolute -bottom-7 right-3 select-none text-[7.5rem] font-extrabold leading-none tracking-[-0.09em] text-white sm:text-[9rem]"
                    aria-hidden="true"
                  >
                    REEL
                  </span>

                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink">
                      <Clapperboard className="h-3 w-3" aria-hidden="true" />
                      Video portfolio
                    </span>
                    <h4 className="mt-5 max-w-md text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink">
                      Stories told in motion.
                      <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink">
                        REEL
                      </span>
                    </h4>
                    <p className="mt-3 max-w-md text-[13px] leading-relaxed text-body">
                      Short-form edits, long-form storytelling, and promotional
                      videos. The full reel archive opens in Google Drive.
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center justify-between gap-4">
                    <span className="link-arrow">
                      Open video archive
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-yellow text-ink shadow-pill transition-transform duration-300 group-hover:scale-105">
                      <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {videoFormats.map((format, index) => {
                  const Icon = formatIcons[index] ?? Clapperboard;
                  return (
                    <Reveal key={format.label} delay={0.1 + index * 0.05}>
                      <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 transition-colors duration-300 hover:border-yellow">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card text-ink">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink">
                            {format.label}
                          </p>
                          <p className="mt-1 text-[12px] leading-snug text-body">
                            {format.detail}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 text-[10px] font-medium text-subtle">
              Video files open in Google Drive. No video is loaded on this page.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
