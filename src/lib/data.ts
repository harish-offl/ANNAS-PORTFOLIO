export const profile = {
  name: "M.RM. Annamalai",
  firstName: "Annamalai",
  wordmark: "M.RM. ANNAMALAI",
  monogram: "MA",
  role: "Developer · Video Editor · Graphic Designer",
  shortRole: "Developer & Digital Creator",
  founderTitle: "Founder & Digital Developer at Arrise Digital",
  tagline: "Turning ideas into visual stories",
  location: "Madurai, Tamil Nadu, India",
  education: "AI & Data Science, Ramco Institute of Technology",
  experience: "3+ years",
  availability: "Freelance / Remote",
  agency: "Arrise Digital",
  portfolio: "https://annamalaiportfolio.vercel.app/",
  agencyWebsite: "https://arrisedigital.vercel.app/",
  email: "connectwithannamalai@gmail.com",
  phone: "+91 93639 73591",
  portfolioFiles:
    "https://drive.google.com/drive/folders/1UXeMZt3F0YkpEaOqrdAnl8xcWxlp1ggI?usp=drive_link",
  socials: {
    github: "https://github.com/harish-offl",
    linkedin: "https://linkedin.com/in/mrmannamalai",
    instagram: "https://instagram.com/annamalai_offl",
    whatsapp: "https://wa.me/919363973591",
  },
  heroDescription:
    "I turn ideas into engaging visual stories, digital experiences, and content that helps brands communicate clearly and stand out online.",
  about:
    "I'm M.RM. Annamalai, a multidisciplinary creative focused on video editing, content creation, graphic design, and web development.\n\nFrom short-form videos and social media campaigns to modern websites, I combine creativity, storytelling, and technology to deliver meaningful digital work.\n\nThrough Arrise Digital, I collaborate with businesses and creators on practical digital solutions that strengthen their online presence.",
  aboutProfile:
    "M.RM. Annamalai is a developer, video editor, and digital creator focused on building modern, responsive, and user-friendly digital experiences. Through Arrise Digital, he helps businesses strengthen their online presence through website development, thoughtful interface design, creative media production, and practical digital solutions.",
  aboutParagraphs: [
    "I'm Annamalai, a multidisciplinary creative focused on video editing, content creation, graphic design, and web development.",
    "I turn ideas into engaging visual stories, digital experiences, and content that helps brands communicate clearly and stand out online.",
    "From short-form videos and social media campaigns to modern websites, I combine creativity, storytelling, and technology to deliver meaningful digital work.",
  ],
  metrics: [
    { label: "YEARS OF EXPERIENCE", value: "3+" },
    { label: "PROJECTS COMPLETED", value: "75+" },
    { label: "HAPPY CLIENTS", value: "10+" },
  ],
  skills: [
    "Video Editing",
    "Content Creation",
    "Graphic Design",
    "Web Development",
    "Branding",
    "AI Automation",
    "Social Media",
    "Visual Storytelling",
  ],
};

export const specializations = [
  "Web Development",
  "UI/UX Design",
  "Video Editing",
  "Graphic Design",
  "Content Creation",
  "Digital Solutions",
];

export const experienceCard = {
  value: "3+ years",
  description:
    "Experience across web development, creative production, and digital design.",
};

export type ConnectLink = {
  label: string;
  value: string;
  href: string;
  icon: "instagram" | "linkedin" | "github" | "phone" | "mail" | "whatsapp";
  external?: boolean;
};

export const connectLinks: ConnectLink[] = [
  {
    label: "Instagram",
    value: "@annamalai_offl",
    href: profile.socials.instagram,
    icon: "instagram",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "in/mrmannamalai",
    href: profile.socials.linkedin,
    icon: "linkedin",
    external: true,
  },
  {
    label: "GitHub",
    value: "harish-offl",
    href: profile.socials.github,
    icon: "github",
    external: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: "phone",
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
  {
    label: "WhatsApp",
    value: "Message directly",
    href: profile.socials.whatsapp,
    icon: "whatsapp",
    external: true,
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  shortCategory: string;
  categories: string[];
  description: string;
  longDescription: string;
  tags: string[];
  year?: string;
  demoUrl?: string;
  status: "live" | "concept" | "private";
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "bangles-by-beauty",
    title: "Bangles by Beauty",
    category: "E-commerce",
    shortCategory: "E-commerce",
    categories: ["Web Development", "UI/UX Design"],
    description:
      "An elegant, accessible online shopping experience for a handcrafted jewellery brand in Pattukottai.",
    longDescription:
      "Bangles by Beauty is a made-to-order jewellery storefront from Pattukottai, Tamil Nadu. Visitors can browse collections and product details, then submit their selected items for confirmation through WhatsApp rather than paying online.",
    tags: ["E-commerce", "Handcrafted Jewellery", "Responsive Design"],
    year: "2024",
    demoUrl: "https://banglesbybeauty.in",
    status: "live",
    image: "/projects/real/bangles-by-beauty.webp",
    imageAlt: "Bangles by Beauty website homepage",
    featured: true,
  },
  {
    id: "arrise-digital",
    title: "Arrise Digital",
    category: "Agency Website / Branding",
    shortCategory: "Agency",
    categories: ["Web Development", "UI/UX Design"],
    description:
      "A digital agency website presenting growth-focused marketing, website services, content, and AI-powered business solutions.",
    longDescription:
      "Arrise Digital presents growth-focused services including social media marketing, local business growth, website services, content, and AI-powered solutions, with clear contact pathways for prospective clients.",
    tags: ["Digital Agency", "Marketing", "Web Development"],
    year: "2024",
    demoUrl: profile.agencyWebsite,
    status: "live",
    image: "/projects/real/arrise-digital.webp",
    imageAlt: "Arrise Digital website homepage",
    featured: true,
  },
  {
    id: "vaigai-namma-taxi",
    title: "Vaigai Namma Taxi",
    category: "Taxi Service",
    shortCategory: "Taxi",
    categories: ["Web Development"],
    description:
      "A taxi service website introducing rides across Tamil Nadu and making travel information easy to find.",
    longDescription:
      "Vaigai Namma Taxi presents a taxi service for travel across Tamil Nadu. The website introduces the service and makes ride information accessible to visitors.",
    tags: ["Taxi Service", "Business Website", "Responsive Design"],
    year: "2025",
    demoUrl: "https://vaigainammataxi.netlify.app/",
    status: "live",
    image: "/projects/real/vaigai-namma-taxi.webp",
    imageAlt: "Vaigai Namma Taxi website homepage",
    featured: true,
  },
  {
    id: "focura",
    title: "Focura",
    category: "Digital Product",
    shortCategory: "Product",
    categories: ["UI/UX Design", "Web Development"],
    description:
      "A study and productivity platform concept designed to help students organise sessions, manage tasks, and track progress.",
    longDescription:
      "Focura is a concept-stage productivity platform for students. It helps organize study sessions, manage tasks, and track progress over time.\n\nNote: This project is in concept stage. Some features shown may be incomplete or not yet implemented.",
    tags: ["React", "Productivity", "UI/UX", "Concept"],
    year: "2024",
    demoUrl: "https://arrisedigitalfocura.vercel.app/",
    status: "concept",
    image: "/projects/real/focura.webp",
    imageAlt: "Focura productivity platform homepage",
    featured: true,
  },
  {
    id: "rml-gms",
    title: "RML GMS",
    category: "Enterprise Software",
    shortCategory: "Enterprise",
    categories: ["Web Development", "UI/UX Design"],
    description:
      "A gate management system focused on organising operational workflows and supporting structured information management.",
    longDescription:
      "RML Gate Management System is an enterprise-focused tool for organizing operational workflows. The system supports structured information management for gate operations and access control.\n\nOnly verified, implemented functionality is described here.",
    tags: ["Enterprise", "Workflow", "TypeScript", "Next.js"],
    year: "2024",
    demoUrl: "https://rmlgate.vercel.app/login",
    status: "private",
    image: "/projects/real/rml-gate-management.webp",
    imageAlt: "RML Gate Management sign-in screen",
  },
];

export const projectFilters = [
  "All",
  "Web Development",
  "UI/UX Design",
] as const;

export type Service = {
  id: string;
  title: string;
  icon: "clapperboard" | "palette" | "camera" | "code";
  blurb: string;
  items: string[];
};

export const services: Service[] = [
  {
    id: "video",
    title: "Video Editing",
    icon: "clapperboard",
    blurb:
      "Short-form and long-form edits built around pacing, story, and retention.",
    items: [
      "Instagram Reels",
      "YouTube videos",
      "YouTube Shorts",
      "Promotional videos",
      "Short-form storytelling",
    ],
  },
  {
    id: "design",
    title: "Graphic Design",
    icon: "palette",
    blurb:
      "Clear, consistent visuals that make a brand easy to recognise and remember.",
    items: [
      "Posters",
      "Carousels",
      "Social media creatives",
      "Branding & thumbnails",
      "Promotional graphics",
    ],
  },
  {
    id: "content",
    title: "Content Creation",
    icon: "camera",
    blurb:
      "Content concepts and creative direction that turn everyday ideas into stories.",
    items: [
      "Content concepts",
      "Creative direction",
      "Social media content",
      "Visual storytelling",
      "Campaign support",
    ],
  },
  {
    id: "web",
    title: "Web Development",
    icon: "code",
    blurb:
      "Modern, responsive websites designed to be useful, fast, and memorable.",
    items: [
      "Business websites",
      "Responsive development",
      "Portfolio websites",
      "Landing pages",
      "E-commerce experiences",
    ],
  },
];

export type ServiceCard = {
  id: string;
  title: string;
  icon:
    | "code"
    | "layout"
    | "clapperboard"
    | "palette"
    | "camera"
    | "sparkles";
  description: string;
};

export const serviceCards: ServiceCard[] = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "code",
    description:
      "Fast, responsive websites and digital experiences built with modern tools.",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: "layout",
    description:
      "Clear interfaces and thoughtful user flows that make products easy to use.",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: "clapperboard",
    description:
      "Short-form and long-form edits built around pacing, story, and retention.",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: "palette",
    description:
      "Posters, social creatives, and brand visuals that communicate quickly.",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    icon: "camera",
    description:
      "Content concepts and creative direction that turn ideas into stories.",
  },
  {
    id: "digital-solutions",
    title: "Digital Solutions",
    icon: "sparkles",
    description:
      "Practical digital systems, automation, and support for growing businesses.",
  },
];

export const videoFormats = [
  {
    label: "Short-form",
    detail: "Reels, Shorts and social edits",
  },
  {
    label: "Long-form",
    detail: "YouTube and brand storytelling",
  },
  {
    label: "Promotional",
    detail: "Product and campaign videos",
  },
];

export type DesignWork = {
  title: string;
  label: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const designWork: DesignWork[] = [
  {
    title: "Bangles by Beauty",
    label: "Brand visual direction",
    image: "/projects/real/bangles-by-beauty.webp",
    imageAlt: "Bangles by Beauty jewellery brand website",
    href: "https://banglesbybeauty.in",
  },
  {
    title: "Arrise Digital",
    label: "Web art direction",
    image: "/projects/real/arrise-digital.webp",
    imageAlt: "Arrise Digital agency website",
    href: "https://arrisedigital.vercel.app/",
  },
  {
    title: "Focura",
    label: "Product interface",
    image: "/projects/real/focura.webp",
    imageAlt: "Focura productivity product interface",
    href: "https://arrisedigitalfocura.vercel.app/",
  },
  {
    title: "Vaigai Namma Taxi",
    label: "Brand website",
    image: "/projects/real/vaigai-namma-taxi.webp",
    imageAlt: "Vaigai Namma Taxi brand website",
    href: "https://vaigainammataxi.netlify.app/",
  },
];

export type SkillGroup = {
  title: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Video & Motion",
    caption: "Edit. Pace. Tell the story.",
    skills: ["CapCut", "Premiere Pro", "Video Editing", "Reels & Shorts"],
  },
  {
    title: "Design & Content",
    caption: "Create. Shape. Communicate.",
    skills: ["Canva", "Graphic Design", "Social Media Content", "Visual Storytelling"],
  },
  {
    title: "Web & Automation",
    caption: "Build. Ship. Improve.",
    skills: ["Next.js", "React", "JavaScript", "TypeScript", "Tailwind CSS", "Git"],
  },
];

export type ToolGroup = {
  title: string;
  items: { name: string; abbr: string; color: string }[];
};

export const toolGroups: ToolGroup[] = [
  {
    title: "Video & Motion",
    items: [
      { name: "Premiere Pro", abbr: "Pr", color: "#2D0B59" },
      { name: "CapCut", abbr: "Cc", color: "#151515" },
      { name: "Video Editing", abbr: "Ve", color: "#008744" },
      { name: "Reels & Shorts", abbr: "Rs", color: "#0878F9" },
    ],
  },
  {
    title: "Design & Content",
    items: [
      { name: "Canva", abbr: "Ca", color: "#00A6A6" },
      { name: "Graphic Design", abbr: "Gd", color: "#B4418E" },
      { name: "Social Content", abbr: "Sc", color: "#E4572E" },
      { name: "Visual Storytelling", abbr: "Vs", color: "#6A4C93" },
    ],
  },
  {
    title: "Web & Automation",
    items: [
      { name: "Next.js", abbr: "N", color: "#151515" },
      { name: "React", abbr: "R", color: "#0878F9" },
      { name: "TypeScript", abbr: "Ts", color: "#3178C6" },
      { name: "JavaScript", abbr: "Js", color: "#8A7500" },
      { name: "Tailwind CSS", abbr: "Tw", color: "#0E7490" },
      { name: "Git", abbr: "Git", color: "#C2410C" },
    ],
  },
];

export type JourneyMilestone = {
  marker: string;
  title: string;
  description: string;
};

export const journey: JourneyMilestone[] = [
  {
    marker: "START",
    title: "Creative foundations",
    description:
      "Began exploring video editing and graphic design, learning by making, experimenting, and publishing.",
  },
  {
    marker: "LEARN",
    title: "Content & storytelling",
    description:
      "Built a practical understanding of short-form content, pacing, visual hierarchy, and social media storytelling.",
  },
  {
    marker: "BUILD",
    title: "Freelance client work",
    description:
      "Started working with businesses and creators on edits, designs, and social content — 75+ projects for 10+ clients.",
  },
  {
    marker: "GROW",
    title: "Web development",
    description:
      "Expanded into responsive websites and digital products with Next.js, React, Tailwind CSS, and modern tooling.",
  },
  {
    marker: "NOW",
    title: "Arrise Digital & AI studies",
    description:
      "Collaborating through Arrise Digital while studying AI & Data Science at Ramco Institute of Technology.",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const workProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    description:
      "We start with the goal, audience, and the real problem the work needs to solve.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "I shape the creative direction, structure, and scope before production begins.",
  },
  {
    step: "03",
    title: "Design & produce",
    description:
      "The idea becomes edits, visuals, content, or code through focused iterations.",
  },
  {
    step: "04",
    title: "Review & refine",
    description:
      "We review the work together and tighten the details that make it feel right.",
  },
  {
    step: "05",
    title: "Deliver",
    description:
      "You receive the final files, website, or content package — ready to use.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
