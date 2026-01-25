"use client";

import React from "react";
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
} from "simple-icons";

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

// Duplicate arrays multiple times for seamless infinite loop
const duplicatedLanguages = [...languages, ...languages, ...languages, ...languages, ...languages, ...languages];
const duplicatedTools = [...tools, ...tools, ...tools, ...tools];

const ToolBadge = ({ tool }: { tool: Tool }) => {
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5 bg-muted/30 backdrop-blur-sm rounded-full border border-border/40 whitespace-nowrap hover:bg-muted/50 hover:border-border/60 transition-all duration-300">
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-4 h-4 shrink-0 fill-current opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={tool.icon.path} />
      </svg>
      <span className="text-xs font-medium tracking-wide">{tool.name}</span>
    </div>
  );
};

export function ToolsMarquee() {
  return (
    <div className="w-full space-y-5 mt-6">
      <div className="space-y-1">
        <h4 className="text-sm font-bold">Skills & Tools</h4>
        <p className="text-xs text-muted-foreground">Technologies I work with</p>
      </div>

      {/* Row 1: Languages - Right to Left */}
      <div className="relative overflow-hidden py-1">
        <div className="flex gap-3 animate-marquee-rtl hover:[animation-play-state:paused]">
          {duplicatedLanguages.map((tool, index) => (
            <ToolBadge key={`lang-${index}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* Row 2: Tools - Left to Right */}
      <div className="relative overflow-hidden py-1">
        <div className="flex gap-3 animate-marquee-ltr hover:[animation-play-state:paused]">
          {duplicatedTools.map((tool, index) => (
            <ToolBadge key={`tool-${index}`} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
