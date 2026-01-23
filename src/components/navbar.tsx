"use client";

import { ThemeToggleButton } from "@/components/theme/ThemeSwitch";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    // { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="w-full max-w-2xl h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between pointer-events-auto bg-background/70 backdrop-blur-sm border-b border-border/40 relative"
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Logo/Name - Responsive text size */}
        <Link href="/" className="font-bold text-sm sm:text-base tracking-tight hover:text-foreground/80 transition-colors" style={{ fontFamily: 'Secretoria, sans-serif' }}>
          Shkhr
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="flex items-center gap-3 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Command Menu - Hidden on mobile */}
          <div className="hidden sm:block">
            <CommandMenu />
          </div>

          {/* Theme Toggle */}
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
