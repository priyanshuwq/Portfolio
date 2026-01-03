"use client";

import { DATA } from "@/data/resume";

export function SimpleFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="border-t pt-6 pb-6">
          <div className="flex flex-col items-center gap-3">
          {/* Social Links */}
          <div className="flex items-center gap-4 text-sm">
            {Object.entries(DATA.contact.social)
              .filter(([_, social]) => social.navbar)
              .map(([name, social]) => (
                <a
                  key={name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {name}
                </a>
              ))}
          </div>
          
          {/* Footer Text */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-muted-foreground">
              Designed & Developed by <span className="font-semibold text-foreground">{DATA.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
