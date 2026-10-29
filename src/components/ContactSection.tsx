"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { profile } from "@/lib/data";
import { WhatsAppIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/Reveal";

type Status = "idle" | "error" | "ready";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: profile.socials.linkedin },
  { icon: Instagram, label: "Instagram", href: profile.socials.instagram },
  { icon: Github, label: "GitHub", href: profile.socials.github },
  { icon: WhatsAppIcon, label: "WhatsApp", href: profile.socials.whatsapp },
];

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const updateField =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailIsValid || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  };

  return (
    <section id="contact" className="relative section-pad">
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-end md:justify-between md:pt-16">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="mt-4 max-w-2xl text-section-title text-ink">
                Let&apos;s build something
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-body md:text-right">
              Have a project in mind? Send a note with the idea, the goal, and the
              timeline. I&apos;ll reply from Madurai.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6">
          <Reveal delay={0.05}>
            <div className="card flex h-full flex-col p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow text-ink">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink">
                    Say hello directly
                  </p>
                  <p className="mt-0.5 text-[11px] text-subtle">
                    Usually replies within 24 hours
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <a href={`mailto:${profile.email}`} className="pill group w-full">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-ink transition-colors group-hover:bg-yellow">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-subtle">
                      Email
                    </span>
                    <span className="block break-all text-xs font-semibold text-ink">
                      {profile.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="pill group w-full"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-ink transition-colors group-hover:bg-yellow">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-subtle">
                      Phone
                    </span>
                    <span className="block text-xs font-semibold text-ink">
                      {profile.phone}
                    </span>
                  </span>
                </a>

                <div className="flex w-full items-center gap-3 rounded-full border border-line bg-white px-3.5 py-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-ink">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-subtle">
                      Location
                    </span>
                    <span className="block text-xs font-semibold text-ink">
                      {profile.location}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="mb-3 text-[9px] font-extrabold uppercase tracking-[0.16em] text-subtle">
                  Find me online
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-ink transition-colors hover:border-yellow hover:bg-yellow/20"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {label}
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-subtle" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-line bg-surface p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink">
                  Through {profile.agency}
                </p>
                <a
                  href={profile.agencyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-2"
                >
                  Visit the agency
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="card h-full p-5 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-extrabold tracking-[-0.035em] text-ink">
                    Send a message
                  </h3>
                  <p className="mt-1 text-[11px] text-subtle">
                    This opens your email app with everything filled in.
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card text-ink">
                  <Send className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-subtle"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your name"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-subtle"
                  >
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="you@email.com"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-subtle"
                >
                  Project details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={updateField("message")}
                  rows={6}
                  placeholder="Tell me about the idea, the goal, and the timeline..."
                  required
                  className="input-field resize-y"
                />
              </div>

              <button type="submit" className="btn-dark mt-4 w-full">
                <Send className="h-4 w-4" aria-hidden="true" />
                Send message
              </button>

              <div aria-live="polite" className="mt-3">
                {status === "error" ? (
                  <p className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-[11px] font-semibold text-red-900">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Add your name, a valid email address, and a short message before sending.
                  </p>
                ) : null}
                {status === "ready" ? (
                  <p className="rounded-xl border border-yellow/60 bg-yellow/15 p-3 text-[11px] font-semibold text-ink">
                    Your email app should open with the message ready — nothing is
                    sent until you press send there. If it does not open, email{" "}
                    <a href={`mailto:${profile.email}`} className="underline">
                      {profile.email}
                    </a>
                    .
                  </p>
                ) : null}
              </div>

              <p className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-subtle">
                No spam. No fake confirmation screens.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
