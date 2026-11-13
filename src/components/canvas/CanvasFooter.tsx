import { ArrowUp } from "lucide-react";

export function CanvasFooter() {
  return (
    <footer className="border-t border-line bg-yellow/15 py-10 sm:py-12 text-ink">
      <div className="section-container py-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#canvas-home" className="group inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-[11px] font-extrabold text-ink transition-colors group-hover:border-yellow group-hover:bg-yellow">
                AC
              </span>
              <span>
                <span className="block text-sm font-bold tracking-[-0.02em] text-ink">
                  Arrise Canvas
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-subtle">
                  Educational SaaS Platform
                </span>
              </span>
            </a>
            <p className="mt-4 text-[12px] leading-relaxed text-body">
              A calmer, clearer canvas for teaching and learning. One intelligent
              workspace for every institution.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            {[
              { label: "Features", href: "#features" },
              { label: "Solutions", href: "#solutions" },
              { label: "Pricing", href: "#pricing" },
              { label: "About", href: "#about" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold text-body transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <a href="#canvas-home" className="btn-light !min-h-[36px] !px-3 !py-1.5 !text-[9px]">
              Back to top
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 text-[9px] font-semibold uppercase tracking-[0.1em] text-subtle sm:flex-row sm:items-center">
          <p>© 2026 Arrise Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
