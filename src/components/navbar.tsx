"use client";

import { ThemeToggleButton } from "@/components/theme/ThemeSwitch";
import { DATA } from "@/data/resume";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="w-full max-w-2xl h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between pointer-events-auto bg-background/70 backdrop-blur-sm border-b border-border/40"
      >
        {/* Logo/Name - Responsive text size */}
        <Link href="/" className="font-bold text-base sm:text-lg tracking-tight hover:text-foreground/80 transition-colors">
          {DATA.name}
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

          {/* Theme Toggle */}
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
