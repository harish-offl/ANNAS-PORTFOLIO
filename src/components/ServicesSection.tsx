"use client";

import { motion } from "framer-motion";
import { Code2, Video, Palette, Bot, ShoppingCart, Brain } from "lucide-react";
import { profile } from "@/lib/data";

const services = [
  {
    id: "web",
    number: "01",
    title: "Web Development",
    icon: Code2,
    description:
      "I design and develop responsive websites, landing pages, portfolios, and e-commerce experiences that combine usability with strong visual identity.",
    tags: ["Next.js", "React", "Tailwind", "E-commerce"],
    color: "bg-blue-50 border-blue-200 text-blue-900",
    iconBg: "bg-blue-50/60 text-blue-900 border-blue-200/60",
  },
  {
    id: "video",
    number: "02",
    title: "Video Editing",
    icon: Video,
    description:
      "I create engaging short-form and long-form content for brands, creators, and businesses, with a focus on pacing, storytelling, and audience retention.",
    tags: ["Reels", "Shorts", "CapCut", "Premiere Pro"],
    color: "bg-pink-50 border-pink-200 text-pink-900",
    iconBg: "bg-pink-50/60 text-pink-900 border-pink-200/60",
  },
  {
    id: "design",
    number: "03",
    title: "Graphic Design",
    icon: Palette,
    description:
      "I design social media creatives, promotional graphics, visual assets, and branded content that communicate clearly and consistently.",
    tags: ["Branding", "Canva", "Social Media", "Visual Identity"],
    color: "bg-mint-50 border-mint-200 text-mint-900",
    iconBg: "bg-mint-50/60 text-mint-900 border-mint-200/60",
  },
  {
    id: "ai",
    number: "04",
    title: "AI Automation",
    icon: Bot,
    description:
      "I explore practical AI-powered workflows that reduce repetitive tasks and help businesses operate more efficiently.",
    tags: ["AI", "Automation", "Workflows", "Prompt Engineering"],
    color: "bg-lavender-50 border-lavender-200 text-lavender-900",
    iconBg: "bg-lavender-50/60 text-lavender-900 border-lavender-200/60",
  },
  {
    id: "products",
    number: "05",
    title: "Digital Products",
    icon: ShoppingCart,
    description:
      "I develop practical web applications, dashboards, and business tools that solve real workflow problems.",
    tags: ["Web Apps", "Dashboards", "Tools", "Product Design"],
    color: "bg-yellow-50 border-yellow-200 text-yellow-900",
    iconBg: "bg-yellow-50/60 text-yellow-900 border-yellow-200/60",
  },
  {
    id: "strategy",
    number: "06",
    title: "Creative Strategy",
    icon: Brain,
    description:
      "I combine content, design, technology, and branding to help businesses present their ideas effectively online.",
    tags: ["Strategy", "Branding", "Content", "Consulting"],
    color: "bg-secondary border-border/60 text-foreground",
    iconBg: "bg-secondary/60 text-foreground border-border/60",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative section-py overflow-hidden"
    >
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
                WHAT I DO
              </span>
            </span>
          </div>
          <h2 className="font-display font-normal leading-[1.05] text-display-sm heading-gradient mb-6 text-balance">
            What I Bring to the Table.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-balance">
            From code to camera, I work across disciplines to help ideas become
            reality.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto overflow-guard">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4 }}
              className={`relative group paper-card p-6 ${service.color} overflow-guard min-w-0`}
            >
              <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white border border-border/60 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-bold text-primary">✓</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${service.iconBg} shadow-sm shrink-0`}>
                  <service.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-bold text-foreground uppercase tracking-widest">
                  #{service.number}
                </span>
              </div>
              <h3 className="font-space text-lg font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm font-space text-muted-foreground/90 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 overflow-guard">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-0.5 rounded border border-border/60 bg-card/50 text-[10px] font-space font-bold text-muted-foreground/80 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center overflow-guard">
          <span className="sticky-note bg-mint-100 border-mint-200 tilt-2">
            <span className="font-space text-xs font-bold text-mint-900 uppercase tracking-tighter">
              Available for freelance & remote work
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
