export interface ToolCategory {
  number: string;
  title: string;
  tools: string[];
}

export const toolCategories: ToolCategory[] = [
  { number: "01", title: "AI & Prompt Engineering", tools: ["ChatGPT", "Prompt Engineering"] },
  { number: "02", title: "Design", tools: ["Canva"] },
  { number: "03", title: "Video Editing", tools: ["CapCut"] },
  { number: "04", title: "Development", tools: ["VS Code", "Kiro", "React", "Node.js", "HTML5", "CSS3"] },
  { number: "05", title: "Backend & Deployment", tools: ["Supabase", "Vercel", "GitHub"] },
];

export const logoTools = [
  "Canva", "ChatGPT", "VS Code", "Kiro", "CapCut",
  "React", "Node.js", "Supabase", "HTML5", "CSS3",
  "Vercel", "GitHub", "Prompt Engineering",
];

export const toolBrandColors: Record<string, string> = {
  "ChatGPT": "#10A37F",
  "Canva": "#00C4CC",
  "CapCut": "#1D1D1D",
  "VS Code": "#007ACC",
  "Kiro": "#FF6B35",
  "React": "#61DAFB",
  "Node.js": "#339933",
  "HTML5": "#E34F26",
  "CSS3": "#1572B6",
  "Supabase": "#3ECF8E",
  "Vercel": "#555555",
  "GitHub": "#333333",
  "Prompt Engineering": "#A3D026",
};
