"use client";

import { DATA } from "@/data/resume";
import { VisitorCounter } from "./visitor-counter";

export function SimpleFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="pt-6 pb-6">
          <div className="flex flex-col items-center gap-3">
          
          {/* Footer Text */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-muted-foreground">
              Developed with <span className="inline-block" style={{ filter: 'grayscale(100%)', opacity: 0.5 }}>🤍</span> by <span className="font-semibold text-foreground">{DATA.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>

          {/* Visitor Counter */}
          <div className="pt-2">
            <VisitorCounter />
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
