"use client";

import React, { useState } from "react";
import {
  siTypescript,
  siJavascript,
  siPython,
  siHtml5,
  siCss,
  siTailwindcss,
  siBootstrap,
  siMongodb,
  siNodedotjs,
  siReact,
  siNextdotjs,
  siExpress,
  siArchlinux,
  siFfmpeg,
  siObsidian,
  siObsstudio,
  siKdenlive,
  siStripe,
  siWebrtc,
  siSocketdotio,
  siPostman,
  siClerk,
  siGoogle,
  siYoutube,
  siPostgresql,
  siRedis,
  siFastapi,
  siFirebase,
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

const languages: Tool[] = [
  { name: "TypeScript", icon: siTypescript },
  { name: "JavaScript", icon: siJavascript },
  { name: "Python", icon: siPython },
  { name: "HTML", icon: siHtml5 },
  { name: "CSS", icon: siCss },
];

const tools: Tool[] = [
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Bootstrap", icon: siBootstrap },
  { name: "MongoDB", icon: siMongodb },
  { name: "Node.js", icon: siNodedotjs },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Express", icon: siExpress },
  { name: "Clerk", icon: siClerk },
  { name: "Google OAuth", icon: siGoogle },
  { name: "Arch Linux", icon: siArchlinux },
  { name: "FFmpeg", icon: siFfmpeg },
  { name: "yt-dlp", icon: siYoutube },
  { name: "Obsidian", icon: siObsidian },
  { name: "OBS Studio", icon: siObsstudio },
  { name: "Kdenlive", icon: siKdenlive },
  { name: "Stripe", icon: siStripe },
  { name: "WebRTC", icon: siWebrtc },
  { name: "Socket.io", icon: siSocketdotio },
  { name: "Postman", icon: siPostman },
];

// Combine all tech stack into one array
const allTech = [...languages, ...tools];

// Split into two rows equally
const midPoint = Math.ceil(allTech.length / 2);
const row1Tech = allTech.slice(0, midPoint);
const row2Tech = allTech.slice(midPoint);

// Duplicate arrays multiple times for seamless infinite loop
const duplicatedRow1 = Array(8).fill(row1Tech).flat();
const duplicatedRow2 = Array(8).fill(row2Tech).flat();

// Organized tech stack by category for full view
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
    { name: "Redis", icon: siRedis },
    { name: "Firebase", icon: siFirebase },
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
        <div className="grid gap-8 mt-6 pb-4">
          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categorizedTech.languages.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={tech.icon.path} />
                  </svg>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Frontend
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categorizedTech.frontend.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={tech.icon.path} />
                  </svg>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend & DB */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Backend & DB
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categorizedTech.backend.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={tech.icon.path} />
                  </svg>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infra & Tools */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Infra & Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categorizedTech.infra.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={tech.icon.path} />
                  </svg>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Tools */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Integration & APIs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categorizedTech.tools.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={tech.icon.path} />
                  </svg>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
