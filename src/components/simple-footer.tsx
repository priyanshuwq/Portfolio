"use client";

import { DATA } from "@/data/resume";
import { VisitorCounter } from "./visitor-counter";
import { CommandMenu } from "./command-menu";

export function SimpleFooter() {
  const openAI = () => window.dispatchEvent(new CustomEvent("open-ai-chat"));

  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-2xl px-6">
        {/* AI nudge line */}
        <div className="pb-3">
          <button
            onClick={openAI}
            className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200 text-left"
          >
            scrolled this far? ask me anything about Priyanshu&nbsp;&nbsp;<span className="text-muted-foreground/25">~ portfolio assistant</span>
          </button>
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
