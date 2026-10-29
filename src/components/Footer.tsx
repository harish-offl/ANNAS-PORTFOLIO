import {
  ArrowUp,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { WhatsAppIcon } from "@/components/brand-icons";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: profile.socials.linkedin },
  { icon: Instagram, label: "Instagram", href: profile.socials.instagram },
  { icon: Github, label: "GitHub", href: profile.socials.github },
  { icon: WhatsAppIcon, label: "WhatsApp", href: profile.socials.whatsapp },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-yellow/15 py-10 sm:py-12 text-ink">
      <div className="section-container py-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="group inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-[11px] font-extrabold text-ink transition-colors group-hover:border-yellow group-hover:bg-yellow">
                {profile.monogram}
              </span>
              <span>
                <span className="block text-sm font-bold tracking-[-0.02em] text-ink">
                  {profile.name}
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-subtle">
                  {profile.shortRole}
                </span>
              </span>
            </a>
            <p className="mt-4 text-[12px] leading-relaxed text-body">
              Building modern digital experiences through {profile.agency}. Based
              in Madurai, working with clients everywhere.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
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
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email Annamalai"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <a href="#home" className="btn-light !min-h-[36px] !px-3 !py-1.5 !text-[9px]">
              Back to top
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 text-[9px] font-semibold uppercase tracking-[0.1em] text-subtle sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
