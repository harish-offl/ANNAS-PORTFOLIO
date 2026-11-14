import React from "react";
import Image from "next/image";

interface P { size?: number; className?: string }

/* ── Real-image logos — use a sized wrapper so the full PNG fills correctly ── */
function ImgLogo({ src, alt, size, className }: { src: string; alt: string; size: number; className: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={className}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </span>
  );
}

export function IconChatGPT({ size = 36, className = "" }: P) {
  return <ImgLogo src="/tools/chatgpt.png" alt="ChatGPT" size={size} className={className} />;
}

export function IconCanva({ size = 36, className = "" }: P) {
  return <ImgLogo src="/tools/canva.png" alt="Canva" size={size} className={className} />;
}

export function IconCapCut({ size = 36, className = "" }: P) {
  return <ImgLogo src="/tools/capcut.webp" alt="CapCut" size={size} className={className} />;
}

export function IconVSCode({ size = 36, className = "" }: P) {
  return <ImgLogo src="/tools/vscode.webp" alt="VS Code" size={size} className={className} />;
}

export function IconKiro({ size = 36, className = "" }: P) {
  return <ImgLogo src="/tools/kiro.webp" alt="Kiro" size={size} className={className} />;
}

/* ?? SVG logos for the rest ?? */
export function IconReact({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23 23 20.46" className={className} aria-hidden="true" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

export function IconNodejs({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 283" className={className} aria-hidden="true">
      <path d="M128 0L0 74v128l128 74 128-74V74z" fill="#539E43"/>
      <path d="M128 0v276L256 202V74z" fill="#3E7B37"/>
      <path d="M128 24L16 88v106l112 65 112-65V88z" fill="#6CC04A"/>
      <path d="M128 24v246l112-65V88z" fill="#539E43"/>
      <text x="50%" y="57%" dominantBaseline="middle" textAnchor="middle" fontSize="96" fontWeight="800" fontFamily="monospace" fill="#fff">N</text>
    </svg>
  );
}

export function IconHTML5({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path d="M107.6 471L74 100h364l-33.6 371L256 480z" fill="#E34F26"/>
      <path d="M256 450.9l119.4-33.1L404.3 150H256z" fill="#EF652A"/>
      <path d="M256 268h-62l-4.3-48H256v-47H142l11.3 126H256zm0 94.9l-.2.1-50-13.5-3.2-36H156l6.3 71.1 93.5 26z" fill="#fff"/>
      <path d="M255.9 268H317l-5.7 65-55.4 14.9v49.1l93.6-26 11.6-130.2H256zm0-115v47h116.7l3.6-47z" fill="#ebebeb"/>
    </svg>
  );
}

export function IconCSS3({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path d="M107.6 471L74 100h364l-33.6 371L256 480z" fill="#1572B6"/>
      <path d="M256 450.9l119.4-33.1L404.3 150H256z" fill="#33A9DC"/>
      <path d="M256 268v47h57.4l-5.4 60.3L256 390v49.3l93.6-26 12.6-141.3zm0-115v47h112l3.6-47z" fill="#ebebeb"/>
      <path d="M256 315h-56.7l-3.9-43.8H256v-47H148.4l1 11.2 10.5 117.9H256zm0-115H144.5l1.1 12 2.5 35H256z" fill="#fff"/>
    </svg>
  );
}

export function IconSupabase({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 109 113" className={className} aria-hidden="true">
      <path d="M63.7 110.2c-2.4 3-7.1 1.4-7.3-2.4L54.3 50H100c7.9 0 12.3 9.1 7.5 15.3z" fill="url(#sb-a)"/>
      <path d="M63.7 110.2c-2.4 3-7.1 1.4-7.3-2.4L54.3 50H100c7.9 0 12.3 9.1 7.5 15.3z" fill="url(#sb-b)" opacity="0.2"/>
      <path d="M45.3 2.1c2.4-3 7.1-1.4 7.3 2.4L54.3 63H8.4C.5 63-3.9 53.9.9 47.7z" fill="#3ECF8E"/>
      <defs>
        <linearGradient id="sb-a" x1="53.9" y1="54.9" x2="94.1" y2="71.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361"/><stop offset="1" stopColor="#3ECF8E"/>
        </linearGradient>
        <linearGradient id="sb-b" x1="36" y1="30.9" x2="54.4" y2="65.1" gradientUnits="userSpaceOnUse">
          <stop/><stop offset="1" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconVercel({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 76 65" className={className} aria-hidden="true">
      <path d="M37.5 0L75 65H0z" fill="#000"/>
    </svg>
  );
}

export function IconGitHub({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 98 96" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.9 0C21.9 0 0 22 0 49.2c0 21.7 14 40.1 33.5 46.6 2.4.5 3.3-1.1 3.3-2.3v-8.1c-13.5 2.9-16.4-6.5-16.4-6.5-2.2-5.6-5.4-7.1-5.4-7.1-4.4-3 .3-3 .3-3 4.9.4 7.5 5 7.5 5 4.4 7.5 11.4 5.3 14.2 4.1.4-3.2 1.7-5.3 3.1-6.5-10.8-1.2-22.1-5.4-22.1-24 0-5.3 1.9-9.6 5-13-.5-1.2-2.1-6.2.5-12.9 0 0 4-1.3 13.3 5a46 46 0 0124.2 0c9.2-6.3 13.2-5 13.2-5 2.6 6.7 1 11.7.5 12.9 3.1 3.4 5 7.7 5 13 0 18.7-11.4 22.8-22.2 24 1.7 1.5 3.3 4.5 3.3 9.1v13.4c0 1.3.8 2.8 3.3 2.3A49.2 49.2 0 0098 49.2C98 22 76.1 0 48.9 0z" fill="#181717"/>
    </svg>
  );
}

export function IconPromptEng({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect width="48" height="48" rx="10" fill="#18181B"/>
      <path d="M10 16h28M10 24h18M10 32h22" stroke="#A3D026" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 29l5 5-5 5" stroke="#A3D026" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export const toolIconMap: Record<string, ({ size, className }: P) => React.ReactElement> = {
  "ChatGPT": IconChatGPT,
  "Canva": IconCanva,
  "CapCut": IconCapCut,
  "VS Code": IconVSCode,
  "Kiro": IconKiro,
  "React": IconReact,
  "Node.js": IconNodejs,
  "HTML5": IconHTML5,
  "CSS3": IconCSS3,
  "Supabase": IconSupabase,
  "Vercel": IconVercel,
  "GitHub": IconGitHub,
  "Prompt Engineering": IconPromptEng,
};
