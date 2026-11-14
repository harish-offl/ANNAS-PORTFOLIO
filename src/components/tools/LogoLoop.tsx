"use client";
import React, { useRef, useEffect, useCallback } from "react";
import "./LogoLoop.css";
import {
  IconChatGPT, IconCanva, IconCapCut, IconVSCode, IconKiro,
  IconReact, IconNodejs, IconHTML5, IconCSS3,
  IconSupabase, IconVercel, IconGitHub, IconPromptEng,
} from "./ToolIcons";
import { logoTools, toolBrandColors } from "./toolsData";

// Build the map here ? avoids circular-init issues
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

interface LogoLoopProps {
  bgColor?: string;
  iconSize?: number;
}

export function LogoLoop({ bgColor = "#fff", iconSize = 48 }: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const items = [...logoTools, ...logoTools];

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    const mat = new DOMMatrix(getComputedStyle(el).transform);
    scrollLeft.current = mat.m41;
    el.setPointerCapture(e.pointerId);
    el.style.animationPlayState = "paused";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.style.transform = `translateX(${scrollLeft.current + dx}px)`;
  }, []);

  const onPointerUp = useCallback(() => { isDragging.current = false; }, []);

  useEffect(() => {
    const wrap = trackRef.current?.parentElement;
    if (!wrap) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        }
      },
      { threshold: 0 }
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="ll-track-wrap"
      style={{ ["--ll-bg" as string]: bgColor }}
      aria-label="Tools and technologies I work with"
      role="region"
    >
      <div
        className="ll-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((name, i) => {
          const Icon = ICON_MAP[name];
          if (!Icon) return null;
          return (
            <button
              key={`${name}-${i}`}
              className="ll-logo-btn"
              tabIndex={i < logoTools.length ? 0 : -1}
              aria-label={name}
              style={{ ["--brand" as string]: toolBrandColors[name] ?? "#080808" }}
            >
              <span className="ll-icon-wrap"><Icon size={iconSize} /></span>
              <span className="ll-label">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
