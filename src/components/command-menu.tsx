"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Home, 
  FolderOpen, 
  Mail, 
  FileText, 
  Music,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Moon
} from "lucide-react";
import { DATA } from "@/data/resume";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Keyboard Shortcut Button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-3 py-1.5 rounded-md text-xs font-medium gap-2"
      >
        <span className="hidden sm:inline-block text-muted-foreground">Quick Access</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Quick Access Menu</DialogTitle>
        <DialogDescription className="sr-only">
          Navigate through the portfolio, access social profiles, and perform actions using keyboard shortcuts
        </DialogDescription>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/"))}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Go to Home</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                H
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/projects"))}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              <span>Go to Projects</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                P
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>Go to Contact</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                C
              </kbd>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => runCommand(() => {
                const resumeLink = document.querySelector('a[href*="Resume"]') as HTMLAnchorElement;
                if (resumeLink) resumeLink.click();
              })}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Download Resume</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                R
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => {
                const spotifySection = document.querySelector('#spotify');
                if (spotifySection) {
                  spotifySection.scrollIntoView({ behavior: 'smooth' });
                }
              })}
            >
              <Music className="mr-2 h-4 w-4" />
              <span>View Spotify Activity</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                S
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => {
                const themeButton = document.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement;
                if (themeButton) themeButton.click();
              })}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Toggle Theme</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                T
              </kbd>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Social">
            <CommandItem
              onSelect={() => runCommand(() => {
                window.open(DATA.contact.social.GitHub.url, "_blank");
              })}
            >
              <Github className="mr-2 h-4 w-4" />
              <span>Open GitHub Profile</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                G
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => {
                window.open(DATA.contact.social.LinkedIn.url, "_blank");
              })}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Open LinkedIn Profile</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                L
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => {
                window.open(DATA.contact.social.X.url, "_blank");
              })}
            >
              <Twitter className="mr-2 h-4 w-4" />
              <span>Open X Profile</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                X
              </kbd>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => {
                window.open(DATA.contact.social.Reddit.url, "_blank");
              })}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>Open Reddit Profile</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                D
              </kbd>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// Hook for individual keyboard shortcuts
export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if Cmd/Ctrl is not pressed (to avoid conflicts with ⌘K)
      if (e.metaKey || e.ctrlKey) return;

      switch (e.key.toLowerCase()) {
        case "h":
          if (!isTyping()) {
            e.preventDefault();
            router.push("/");
          }
          break;
        case "p":
          if (!isTyping()) {
            e.preventDefault();
            router.push("/projects");
          }
          break;
        case "c":
          if (!isTyping()) {
            e.preventDefault();
            router.push("/contact");
          }
          break;
        case "r":
          if (!isTyping()) {
            e.preventDefault();
            const resumeLink = document.querySelector('a[href*="Resume"]') as HTMLAnchorElement;
            if (resumeLink) resumeLink.click();
          }
          break;
        case "s":
          if (!isTyping()) {
            e.preventDefault();
            const spotifySection = document.querySelector('#spotify');
            if (spotifySection) {
              spotifySection.scrollIntoView({ behavior: 'smooth' });
            }
          }
          break;
        case "t":
          if (!isTyping()) {
            e.preventDefault();
            const themeButton = document.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement;
            if (themeButton) themeButton.click();
          }
          break;
        case "g":
          if (!isTyping()) {
            e.preventDefault();
            window.open(DATA.contact.social.GitHub.url, "_blank");
          }
          break;
        case "l":
          if (!isTyping()) {
            e.preventDefault();
            window.open(DATA.contact.social.LinkedIn.url, "_blank");
          }
          break;
        case "x":
          if (!isTyping()) {
            e.preventDefault();
            window.open(DATA.contact.social.X.url, "_blank");
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);
}

// Helper function to check if user is typing in an input field
function isTyping(): boolean {
  const activeElement = document.activeElement;
  return (
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement instanceof HTMLSelectElement ||
    (activeElement as HTMLElement)?.isContentEditable
  );
}
