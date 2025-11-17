import { ThemeToggleButton } from "@/components/theme/ThemeSwitch";
import { DATA } from "@/data/resume";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <nav className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
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
