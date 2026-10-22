"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Send,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { profile } from "@/lib/data";
import { WhatsAppIcon } from "@/components/brand-icons";

const socials = [
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
    }, 1500);
  };

  const setField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const projectTypes = [
    "Website Development",
    "Video Editing",
    "Graphic Design",
    "AI Automation",
    "Digital Products",
    "Creative Strategy",
  ];

  const budgetRanges = ["Under $500", "$500 - $1,500", "$1,500 - $5,000", "$5,000+"];

  return (
    <section id="contact" className="relative section-py overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-decorative grid-bg" />
      <div className="section-container relative z-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-4xl text-center mb-16 overflow-guard"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="sticky-note bg-yellow-100 border-yellow-200 tilt-n3">
              <span className="font-space text-xs font-bold text-yellow-900 uppercase tracking-tighter">
                LET&apos;S TALK
              </span>
            </span>
          </div>
          <h2 className="font-display font-normal leading-[1.05] text-display-sm heading-gradient mb-6 text-balance">
            Let&apos;s Make Something Good.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-balance">
            Have a website idea, a brand that needs better content, or a digital
            problem worth solving? Let&apos;s talk about it.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2 max-w-5xl mx-auto overflow-guard">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-8 overflow-guard"
          >
            <div className="paper-card p-6 sm:p-8 overflow-guard">
              <div className="space-y-6 overflow-guard">
                <div>
                  <h3 className="font-space text-lg font-bold text-foreground mb-2">
                    Get in Touch
                  </h3>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">
                    I usually reply within 24 hours. Tell me about your project
                    and I&apos;ll get back to you.
                  </p>
                </div>

                <div className="space-y-5 overflow-guard">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card hover:bg-secondary/50 transition-colors"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-space font-bold uppercase tracking-widest text-muted-foreground">
                        Email
                      </span>
                      <span className="block text-sm font-space text-foreground truncate">
                        {profile.email}
                      </span>
                    </div>
                  </a>
                  <a
                    href={profile.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card hover:bg-secondary/50 transition-colors"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(37,211,102,0.16)] text-[#25D366] shrink-0">
                      <WhatsAppIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-space font-bold uppercase tracking-widest text-muted-foreground">
                        WhatsApp
                      </span>
                      <span className="block text-sm font-space text-foreground truncate">
                        {profile.phone}
                      </span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-space font-bold uppercase tracking-widest text-muted-foreground">
                        Location
                      </span>
                      <span className="block text-sm font-space text-foreground truncate">
                        {profile.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 overflow-guard">
                  <p className="mb-3 text-xs font-space font-bold uppercase tracking-widest text-muted-foreground">
                    Find me online
                  </p>
                  <div className="flex flex-wrap gap-3 overflow-guard">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="paper-card p-6 sm:p-8 overflow-guard">
              <div className="flex items-center gap-2 mb-1 overflow-guard">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-display text-lg font-bold text-foreground">
                  Arrise Digital
                </span>
              </div>
              <p className="text-xs font-space font-bold text-primary-foreground uppercase tracking-widest mb-6">
                Partners in Progress
              </p>
              <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6">
                A creative technology agency working across web development,
                content production, and automation. Based in Madurai, India.
              </p>
              <div className="space-y-4 overflow-guard">
                <div className="flex items-center gap-3 text-sm font-space overflow-guard">
                  <span className="text-muted-foreground">Portfolio:</span>
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-2 hover:underline truncate"
                  >
                    {profile.portfolio}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            onSubmit={handleSubmit}
            className="space-y-4 overflow-guard"
          >
            <div className="grid gap-4 sm:grid-cols-2 overflow-guard">
              <div>
                <label className="mb-2 block text-[10px] font-space font-bold text-muted-foreground uppercase tracking-widest">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="Jane Doe"
                  required
                  className="w-full rounded-xl border border-border/60 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-space font-bold text-muted-foreground uppercase tracking-widest">
                  Your Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="jane@email.com"
                  required
                  className="w-full rounded-xl border border-border/60 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div className="overflow-guard">
              <label className="mb-2 block text-[10px] font-space font-bold text-muted-foreground uppercase tracking-widest">
                Project Type
              </label>
              <select
                value={form.projectType}
                onChange={setField("projectType")}
                className="w-full rounded-xl border border-border/60 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select a project type</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-guard">
              <label className="mb-2 block text-[10px] font-space font-bold text-muted-foreground uppercase tracking-widest">
                Budget Range
              </label>
              <select
                value={form.budget}
                onChange={setField("budget")}
                className="w-full rounded-xl border border-border/60 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="overflow-guard">
              <label className="mb-2 block text-[10px] font-space font-bold text-muted-foreground uppercase tracking-widest">
                Project Description
              </label>
              <textarea
                value={form.message}
                onChange={setField("message")}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-border/60 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full rounded-xl px-6 py-3 text-xs font-display font-bold text-primary-foreground uppercase tracking-widest transition-all disabled:opacity-50 ${
                status === "loading"
                  ? "bg-secondary text-secondary-foreground cursor-not-allowed"
                  : "bg-primary hover:bg-yellow-400/90 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {status === "loading" ? (
                <>
                  <span className="animate-spin h-4 w-4" />
                  SENDING...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> SEND PROJECT ENQUIRY
                </>
              )}
            </button>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-3 rounded-lg bg-green-100 border border-green-200 text-green-900 text-[11px] font-space font-bold flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Enquiry sent successfully.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-3 rounded-lg bg-red-100 border border-red-200 text-red-900 text-[11px] font-space font-bold flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" />
                Please fill in all required fields.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
