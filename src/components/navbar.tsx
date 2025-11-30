"use client";

import { ThemeToggleButton } from "@/components/theme/ThemeSwitch";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const floatProgress = Math.min(scrollY / 120, 1);
  const isFloating = floatProgress > 0.01;
  const translateY = floatProgress * 24;
  const scale = 1 - floatProgress * 0.03;
  const shadowOpacity = 0.08 + floatProgress * 0.12;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#projects", label: "Projects" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav
        className={cn(
          "w-full max-w-2xl h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between rounded-2xl pointer-events-auto transition-all duration-500 ease-expo-out",
          isFloating
            ? "border border-border/60 bg-background/75 backdrop-blur-xl shadow-lg shadow-foreground/10"
            : "border border-transparent bg-background/0 backdrop-blur-0"
        )}
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          boxShadow: isFloating
            ? `0 24px 60px rgba(15, 23, 42, ${shadowOpacity})`
            : "none",
        }}
      >
        {/* Logo/Name */}
        <Link href="/" className="font-bold text-lg tracking-tight hover:text-foreground/80 transition-colors">
          {DATA.name}
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
