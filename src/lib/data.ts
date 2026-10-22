export const profile = {
  name: "M. RM. Annamalai",
  firstName: "Annamalai",
  monogram: "MA",
  role: "Creative Developer & Digital Creator",
  tagline: "Partners in Progress",
  location: "Madurai, Tamil Nadu, India",
  education: "AI & Data Science student at Ramco Institute of Technology",
  experience: "3+ years",
  agency: "Arrise Digital",
  portfolio: "https://editorannamalai.bolt.host",
  email: "hello@annamalai.dev",
  phone: "+91 93639 73591",
  availability: "Available for select projects",
  socials: {
    github: "https://github.com/harish-offl",
    linkedin: "https://linkedin.com/in/mrmannamalai",
    instagram: "https://instagram.com/annamalai_offl",
    whatsapp: "https://wa.me/919363973591",
  },
  heroDescription:
    "I'm an AI & Data Science student, creative developer, and content creator helping businesses turn ideas into websites, visual stories, and digital experiences.",
  about:
    "I'm M. RM. Annamalai, an AI & Data Science student, creative developer, and content creator from Madurai, India. I enjoy combining technology, design, storytelling, and automation to create meaningful digital experiences.\n\nFrom developing websites and digital products to editing videos and creating social media content, I work across disciplines to help ideas become reality.\n\nThrough Arrise Digital, I collaborate with businesses and creators to build practical digital solutions, strengthen their online presence, and turn creative ideas into real projects.\n\nI'm always learning, experimenting, and exploring better ways to build.",
  metrics: [
    { label: "YEARS OF EXPERIENCE", value: "3+" },
    { label: "CLIENTS WORKED WITH", value: "10+" },
    { label: "CREATIVE PROJECTS", value: "75+" },
  ],
  skills: [
    "Creative Development",
    "Web Development",
    "Video Editing",
    "UI/UX",
    "Content Creation",
    "AI Automation",
    "Branding",
    "Problem Solving",
  ],
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  year?: string;
  demoUrl?: string;
  sourceUrl?: string;
  status: "live" | "concept" | "private";
};

export const projects: Project[] = [
  {
    id: "bangles-by-beauty",
    title: "Bangles by Beauty",
    category: "E-commerce / Web Development",
    description:
      "A premium bangle-shopping experience focused on elegant product presentation, product discovery, and a smooth customer journey.",
    longDescription:
      "Bangles by Beauty is an e-commerce storefront designed for elegant product presentation and a frictionless customer journey. The project focuses on clean product discovery, clear categorization, and a checkout flow that keeps the focus on the product.\n\nThe implementation includes product listing pages, product detail views, and a responsive layout that works across mobile and desktop. Payment processing and order management are concept-stage unless verified as deployed.",
    image: "/projects/bangles.jpg",
    tags: ["Next.js", "Tailwind CSS", "E-commerce", "Responsive Design"],
    year: "2024",
    demoUrl: "#",
    sourceUrl: "#",
    status: "concept",
  },
  {
    id: "smp-food-products",
    title: "SMP Food Products",
    category: "E-commerce / Brand Website",
    description:
      "A product-focused food brand website showcasing traditional and health-oriented products with a strong visual identity.",
    longDescription:
      "SMP Food Products is a brand website for a food company that emphasizes traditional and health-oriented products. The design puts product photography and brand storytelling at the center, with dedicated product pages and category navigation.\n\nProduct cards, brand presentation, and a clean e-commerce layout are included where assets are available.",
    image: "/projects/smp-food.jpg",
    tags: ["Next.js", "Brand Identity", "Product Design", "E-commerce"],
    year: "2024",
    demoUrl: "#",
    sourceUrl: "#",
    status: "concept",
  },
  {
    id: "arrise-digital",
    title: "Arrise Digital",
    category: "Agency Website / Branding",
    description:
      "The digital home of Arrise Digital, a creative technology agency working across web development, content production, and automation.",
    longDescription:
      "Arrise Digital is the agency brand behind this portfolio. The website presents the agency's services across web development, content production, and automation, with a focus on the 'Partners in Progress' positioning.\n\nThe site includes service pages, case studies, and contact pathways for potential clients.",
    image: "/projects/arrise.jpg",
    tags: ["Next.js", "Branding", "Agency", "Web Development"],
    year: "2024",
    demoUrl: "https://editorannamalai.bolt.host",
    sourceUrl: "#",
    status: "live",
  },
  {
    id: "focura",
    title: "Focura",
    category: "Productivity / Digital Product",
    description:
      "A study and productivity platform concept designed to help students organize study sessions, manage tasks, and track their progress.",
    longDescription:
      "Focura is a concept-stage productivity platform for students. It helps organize study sessions, manage tasks, and track progress over time.\n\nNote: This project is in concept stage. Some features shown may be incomplete or not yet implemented.",
    image: "/projects/focura.jpg",
    tags: ["React", "Productivity", "UI/UX", "Concept"],
    year: "2024",
    demoUrl: "#",
    sourceUrl: "#",
    status: "concept",
  },
  {
    id: "rml-gate-management",
    title: "RML Gate Management System",
    category: "Enterprise Software / Workflow Management",
    description:
      "A gate management system project focused on organizing operational workflows and supporting structured information management.",
    longDescription:
      "RML Gate Management System is an enterprise-focused tool for organizing operational workflows. The system supports structured information management for gate operations and access control.\n\nOnly verified, implemented functionality is described here.",
    image: "/projects/rml-gate.jpg",
    tags: ["Enterprise", "Workflow", "TypeScript", "Next.js"],
    year: "2024",
    demoUrl: "#",
    sourceUrl: "#",
    status: "private",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Personal Branding / Web Development",
    description:
      "A personal portfolio exploring creative development, motion, editorial layouts, and interactive storytelling.",
    longDescription:
      "This portfolio website itself — built with Next.js, React, Tailwind CSS, and Framer Motion. It explores editorial layouts, paper-inspired design details, and interactive storytelling for a creative developer's personal brand.",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    year: "2025",
    demoUrl: "https://editorannamalai.bolt.host",
    sourceUrl: "https://github.com/harish-offl",
    status: "live",
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Development",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Git"],
  },
  {
    title: "Design & Content",
    skills: ["UI/UX", "Video Editing", "Graphic Design", "Canva", "CapCut", "Content Creation"],
  },
  {
    title: "Automation & AI",
    skills: ["AI Automation", "Prompt Engineering", "Workflow Solutions", "Digital Products"],
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const devProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the objective, audience, constraints, and desired outcome.",
  },
  {
    step: "02",
    title: "Plan",
    description: "Define the structure, visual direction, technical approach, and project scope.",
  },
  {
    step: "03",
    title: "Create",
    description: "Design, develop, edit, and refine the work through focused iterations.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Test the final result, prepare delivery, and support the next stage of improvement.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
