"use client";

import { DATA } from "@/data/resume";
import Image from "next/image";

export function SimpleFooter({ showGif = false }: { showGif?: boolean }) {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8">
        {/* Porsche GIF - Only on homepage */}
        {showGif && (
          <div className="mb-6 relative w-full h-[200px] sm:h-[250px] rounded-lg overflow-hidden bg-gradient-to-b from-background/50 to-muted/30">
            <Image
              src="/porsche_911_gt3.gif"
              alt="Porsche 911 GT3"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
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
    </footer>
  );
}
