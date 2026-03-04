"use client";

import { DATA } from "@/data/resume";
import { VisitorCounter } from "./visitor-counter";
import { CommandMenu } from "./command-menu";
import { Icons } from "./icons";
import Link from "next/link";

export function SimpleFooter() {
  const openAI = () => window.dispatchEvent(new CustomEvent("open-ai-chat"));

  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-2xl px-6">
        {/* AI nudge + GitHub star row */}
        <div className="pb-4 flex items-end justify-between gap-4">
          <button
            onClick={openAI}
            className="group text-left"
          >
            <p className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-200">
              curious about me?
            </p>
            <p className="text-[11px] text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors duration-200 mt-0.5 group-hover:underline underline-offset-2 decoration-dashed">
              click to ask anything — projects, skills, experience
            </p>
          </button>

          <Link
            href="https://github.com/priyanshuwq/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-foreground transition-colors duration-200 shrink-0"
          >
            <Icons.github className="size-3.5 fill-current" />
            Star on GitHub
          </Link>
        </div>

        <div className="border-t border-border/40 py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Developed by <span className="font-medium text-foreground">{DATA.name.split(" ")[0]}</span>
            </p>
            <div className="flex items-center gap-4">
              <CommandMenu variant="footer" />
              <VisitorCounter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
