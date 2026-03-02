"use client";

import React, { useState } from "react";
import {
  siTypescript,
  siJavascript,
  siPython,
  siHtml5,
  siCss,
  siTailwindcss,
  siMongodb,
  siNodedotjs,
  siReact,
  siNextdotjs,
  siExpress,
  siArchlinux,
  siStripe,
  siWebrtc,
  siSocketdotio,
  siPostman,
  siClerk,
  siGoogle,
  siPostgresql,
  siFastapi,
  siDocker,
  siGit,
  siGithub,
  siLinux,
  siFramer,
  siShadcnui,
} from "simple-icons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { languages as languageNames, tools as toolNames } from "@/data/tools";

interface Tool {
  name: string;
  icon: any;
}

// Organized tech stack by category — single source of truth
const categorizedTech = {
  languages: [
    { name: "TypeScript", icon: siTypescript },
    { name: "JavaScript", icon: siJavascript },
    { name: "Python", icon: siPython },
    { name: "HTML", icon: siHtml5 },
    { name: "CSS", icon: siCss },
  ],
  frontend: [
    { name: "React", icon: siReact },
    { name: "Next.js", icon: siNextdotjs },
    { name: "Tailwind CSS", icon: siTailwindcss },
    { name: "Shadcn UI", icon: siShadcnui },
    { name: "Framer Motion", icon: siFramer },
  ],
  backend: [
    { name: "FastAPI", icon: siFastapi },
    { name: "Node.js", icon: siNodedotjs },
    { name: "Express", icon: siExpress },
    { name: "PostgreSQL", icon: siPostgresql },
    { name: "MongoDB", icon: siMongodb },
  ],
  infra: [
    { name: "Docker", icon: siDocker },
    { name: "Google Cloud", icon: siGoogle },
    { name: "Vercel", icon: siArchlinux },
    { name: "Git", icon: siGit },
    { name: "GitHub", icon: siGithub },
    { name: "Linux", icon: siLinux },
  ],
  tools: [
    { name: "Clerk", icon: siClerk },
    { name: "Stripe", icon: siStripe },
    { name: "WebRTC", icon: siWebrtc },
    { name: "Socket.io", icon: siSocketdotio },
    { name: "Postman", icon: siPostman },
  ],
};

// Derive marquee items from the same source so both views are always in sync
const allTech: Tool[] = Object.values(categorizedTech).flat();

// Split into two rows equally
const midPoint = Math.ceil(allTech.length / 2);
const row1Tech = allTech.slice(0, midPoint);
const row2Tech = allTech.slice(midPoint);

// Duplicate arrays multiple times for seamless infinite loop
const duplicatedRow1 = Array(8).fill(row1Tech).flat();
const duplicatedRow2 = Array(8).fill(row2Tech).flat();

const ToolBadge = ({ tool }: { tool: Tool }) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-muted/30 backdrop-blur-sm rounded-full border border-border/40 whitespace-nowrap hover:bg-muted/50 hover:border-border/60 transition-all duration-300">
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 fill-current opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={tool.icon.path} />
      </svg>
      <span className="text-[10px] sm:text-xs font-medium tracking-wide">{tool.name}</span>
    </div>
  );
};

export function ToolsMarquee() {
  const [showFullStack, setShowFullStack] = useState(false);

  return (
    <div className="w-full space-y-5 mt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-bold">Skills & Tools</h4>
          <p className="text-xs text-muted-foreground">Technologies I work with</p>
        </div>
        
        <button
          onClick={() => setShowFullStack(!showFullStack)}
          className="group flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-foreground/80 transition-colors relative"
        >
          <span className="relative">
            {showFullStack ? "Show Less" : "View Full Stack"}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-300" />
          </span>
          {showFullStack ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Marquee Rows */}
      {!showFullStack && (
        <>
          {/* Row 1: First Half - Right to Left */}
          <div className="relative overflow-hidden py-1">
            <div className="flex gap-2 sm:gap-3 animate-marquee-rtl hover:[animation-play-state:paused]">
              {duplicatedRow1.map((tool, index) => (
                <ToolBadge key={`row1-${index}`} tool={tool} />
              ))}
            </div>
          </div>

          {/* Row 2: Second Half - Left to Right */}
          <div className="relative overflow-hidden py-1">
            <div className="flex gap-2 sm:gap-3 animate-marquee-ltr hover:[animation-play-state:paused]">
              {duplicatedRow2.map((tool, index) => (
                <ToolBadge key={`row2-${index}`} tool={tool} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Full Stack View */}
      {showFullStack && (
        <div className="space-y-3 mt-4 pb-2">
          {([
            { label: "Languages",      items: categorizedTech.languages },
            { label: "Frontend",       items: categorizedTech.frontend },
            { label: "Backend & DB",   items: categorizedTech.backend },
            { label: "Infra & Tools",  items: categorizedTech.infra },
            { label: "APIs",           items: categorizedTech.tools },
          ] as { label: string; items: { name: string }[] }[]).map(({ label, items }) => (
            <div key={label} className="flex gap-4 text-sm">
              <span className="w-28 shrink-0 text-xs text-muted-foreground pt-0.5">{label}</span>
              <span className="text-foreground/80 leading-relaxed">
                {items.map((t, i) => (
                  <span key={t.name}>
                    {t.name}{i < items.length - 1 && <span className="text-muted-foreground/50 mx-1">·</span>}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
