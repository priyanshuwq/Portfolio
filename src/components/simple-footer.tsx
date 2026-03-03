"use client";

import { DATA } from "@/data/resume";
import { VisitorCounter } from "./visitor-counter";
import { CommandMenu } from "./command-menu";

export function SimpleFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="border-t border-border/40 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: copyright */}
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Developed by <span className="font-medium text-foreground">{DATA.name.split(" ")[0]}</span>
            </p>

            {/* Right: keybind hint + visitor counter */}
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
