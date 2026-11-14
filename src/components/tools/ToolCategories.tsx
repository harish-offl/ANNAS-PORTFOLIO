"use client";
import React, { useState } from "react";
import { toolCategories, toolBrandColors } from "./toolsData";
import {
  IconChatGPT, IconCanva, IconCapCut, IconVSCode, IconKiro,
  IconReact, IconNodejs, IconHTML5, IconCSS3,
  IconSupabase, IconVercel, IconGitHub, IconPromptEng,
} from "./ToolIcons";

type IconFn = (props: { size?: number; className?: string }) => React.ReactElement;
const ICON_MAP: Record<string, IconFn> = {
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

export function ToolCategories() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="tc-grid">
      {toolCategories.map((cat) => (
        <div key={cat.number} className="tc-category">
          <div className="tc-cat-header">
            <span className="tc-cat-num">{cat.number}</span>
            <h3 className="tc-cat-title">{cat.title}</h3>
          </div>
          <div className="tc-tools">
            {cat.tools.map((name) => {
              const Icon = ICON_MAP[name];
              const brand = toolBrandColors[name] ?? "#080808";
              const isHovered = hovered === `${cat.number}-${name}`;
              return (
                <div
                  key={name}
                  className="tc-tool"
                  onMouseEnter={() => setHovered(`${cat.number}-${name}`)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(`${cat.number}-${name}`)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  role="listitem"
                  aria-label={name}
                  style={{
                    borderColor: isHovered ? brand : undefined,
                    background: isHovered ? `${brand}18` : undefined,
                  }}
                >
                  {Icon && (
                    <span className="tc-tool-icon" style={{ transform: isHovered ? "scale(1.12)" : "scale(1)" }}>
                      <Icon size={28} />
                    </span>
                  )}
                  <span className="tc-tool-name">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
