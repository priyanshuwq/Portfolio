"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import {
  Home,
  FolderOpen,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Moon,
  BookOpen,
  Globe,
  ArrowUpRight,
  Sparkles,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { DATA } from "@/data/resume";

interface CommandMenuProps {
  variant?: "navbar" | "footer";
}

interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "Summarize his profile",
  "What projects has he built?",
  "What's his tech stack?",
  "What song is playing?",
  "How to contact him?",
];

export function CommandMenu({ variant = "navbar" }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const aiBottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useKeyboardShortcuts();

  // Open on ? or /
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "?" || e.key === "/") && !isTyping()) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Ctrl+j / Ctrl+k navigation in search mode only
  useEffect(() => {
    if (!open || aiMode) return;
    const handleJK = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;
      if (e.key === "j" || e.key === "k") {
        e.preventDefault();
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: e.key === "j" ? "ArrowDown" : "ArrowUp",
            bubbles: true,
          })
        );
      }
    };
    document.addEventListener("keydown", handleJK);
    return () => document.removeEventListener("keydown", handleJK);
  }, [open, aiMode]);

  const closeAndReset = useCallback(() => {
    setOpen(false);
    setQuery("");
    setAiMode(false);
    setAiMessages([]);
  }, []);

  const runCommand = useCallback(
    (cmd: () => unknown) => {
      closeAndReset();
      cmd();
    },
    [closeAndReset]
  );

  const sendToAI = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed || aiLoading) return;

      const userMsg: AiMessage = { role: "user", content: trimmed };
      const historyForAPI = [...aiMessages, userMsg];

      setAiMessages([...historyForAPI, { role: "assistant", content: "" }]);
      setAiMode(true);
      setQuery("");
      setAiLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: historyForAPI.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulated += decoder.decode(value, { stream: true });
            const snap = accumulated;
            setAiMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: snap };
              return updated;
            });
          }
        }
      } catch {
        setAiMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          };
          return updated;
        });
      } finally {
        setAiLoading(false);
      }
    },
    [aiMessages, aiLoading]
  );

  // Auto-scroll to bottom when AI streams new content
  useEffect(() => {
    aiBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  // Intercept Enter key in AI mode to send the follow-up
  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (aiMode && e.key === "Enter" && !e.shiftKey && query.trim() && !aiLoading) {
      e.preventDefault();
      e.stopPropagation();
      sendToAI(query);
    }
  };

  const backToSearch = () => {
    setAiMode(false);
    setQuery("");
    setAiMessages([]);
  };

  return (
    <>
      {/* ── Trigger Button ─────────────────────────────────────────────── */}
      {variant === "footer" ? (
        <button
          onClick={() => setOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>press</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ?
          </kbd>
          <span>or</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            /
          </kbd>
          <span>to search</span>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-3 py-1.5 rounded-md text-xs font-medium gap-2"
        >
          <span className="hidden sm:inline-block text-muted-foreground">Search</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            /
          </kbd>
        </button>
      )}

      {/* ── Dialog ─────────────────────────────────────────────────────── */}
      <CommandDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setQuery("");
            setAiMode(false);
            setAiMessages([]);
          }
        }}
      >
        <DialogTitle className="sr-only">Search &amp; AI Assistant</DialogTitle>
        <DialogDescription className="sr-only">
          Search portfolio or ask the AI assistant anything about Priyanshu
        </DialogDescription>

        {/* ── Input area (always visible) ───────────────────────────── */}
        <div onKeyDown={handleDialogKeyDown}>
          {aiMode && (
            <div className="flex items-center gap-2 px-3 pt-2.5 pb-0">
              <button
                onClick={backToSearch}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-3" />
                <span>Search</span>
              </button>
              <span className="text-muted-foreground/30 text-xs">·</span>
              <span className="text-xs text-muted-foreground/70 flex items-center gap-1">
                <Sparkles className="size-3 text-primary/70" />
                Portfolio AI
              </span>
            </div>
          )}
          <CommandInput
            placeholder={
              aiMode
                ? "Ask a follow-up…"
                : "Search or ask anything about Priyanshu…"
            }
            value={query}
            onValueChange={setQuery}
          />
        </div>

        {/* ── AI Conversation Mode ───────────────────────────────────── */}
        {aiMode ? (
          <div className="flex flex-col overflow-hidden" style={{ maxHeight: "400px" }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {aiMessages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3 py-2 text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[92%] text-sm text-foreground/90 leading-relaxed">
                      {msg.content ? (
                        <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-muted [&_pre]:rounded [&_pre]:p-2 [&_pre]:text-xs">
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Loader2 className="size-3 animate-spin" />
                          <span className="text-xs">thinking…</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
              <div ref={aiBottomRef} />
            </div>

            {/* Quick prompts — shown at the start of a conversation */}
            {aiMessages.length <= 2 && !aiLoading && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5 border-t border-border/30 pt-2.5">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendToAI(p)}
                    className="text-[10px] border border-border rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Search / Command Mode ──────────────────────────────────── */
          <CommandList className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-h-[400px]">
            <CommandEmpty>
              {query.length > 2 ? (
                <button
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => sendToAI(query)}
                >
                  <Sparkles className="size-4 text-primary shrink-0" />
                  Ask AI: &ldquo;{query}&rdquo;
                </button>
              ) : (
                <p className="text-xs text-muted-foreground px-4 py-3">
                  No results — try asking a question.
                </p>
              )}
            </CommandEmpty>

            {/* AI shortcut — appears for longer queries */}
            {query.length > 3 && (
              <>
                <CommandGroup heading="Ask AI">
                  <CommandItem
                    value={`ask ai question ${query}`}
                    onSelect={() => sendToAI(query)}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium truncate">
                      &ldquo;{query}&rdquo;
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground shrink-0">
                      Ask AI
                    </span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Navigation */}
            <CommandGroup heading="Navigate">
              <CommandItem
                value="home page"
                onSelect={() => runCommand(() => router.push("/"))}
              >
                <Home className="mr-2 h-4 w-4 shrink-0" />
                <span>Home</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  H
                </kbd>
              </CommandItem>
              <CommandItem
                value="projects page portfolio"
                onSelect={() => runCommand(() => router.push("/projects"))}
              >
                <FolderOpen className="mr-2 h-4 w-4 shrink-0" />
                <span>Projects</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  P
                </kbd>
              </CommandItem>
              <CommandItem
                value="blogs page writing articles"
                onSelect={() => runCommand(() => router.push("/blogs"))}
              >
                <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                <span>Blogs</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  B
                </kbd>
              </CommandItem>
              <CommandItem
                value="contact email reach out hire"
                onSelect={() =>
                  runCommand(() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  })
                }
              >
                <Mail className="mr-2 h-4 w-4 shrink-0" />
                <span>Contact</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  C
                </kbd>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            {/* Projects */}
            <CommandGroup heading="Projects">
              {DATA.projects.flatMap((project) =>
                (project.links ?? []).flatMap((link) => {
                  if (link.href === "#") return [];
                  const isSource = link.type === "Source";
                  return [
                    <CommandItem
                      key={`${project.slug}-${link.type}`}
                      value={`${project.title} ${link.type} ${project.description} ${(project.technologies ?? []).join(" ")}`}
                      onSelect={() =>
                        runCommand(() => window.open(link.href, "_blank"))
                      }
                    >
                      {isSource ? (
                        <Github className="mr-2 h-4 w-4 shrink-0" />
                      ) : (
                        <Globe className="mr-2 h-4 w-4 shrink-0" />
                      )}
                      <span className="font-medium">{project.title}</span>
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        — {link.type}
                      </span>
                      <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 text-muted-foreground" />
                    </CommandItem>,
                  ];
                })
              )}
              {DATA.projects.slice(0, 6).map((project) => (
                <CommandItem
                  key={`${project.slug}-detail`}
                  value={`${project.title} details case study page info`}
                  onSelect={() =>
                    runCommand(() => router.push(`/projects/${project.slug}`))
                  }
                >
                  <FolderOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span className="font-medium">{project.title}</span>
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    — Details
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* Blogs */}
            <CommandGroup heading="Blogs">
              {DATA.blogs.map((blog) => (
                <CommandItem
                  key={blog.title}
                  value={`${blog.title} ${blog.description} ${(blog.tags ?? []).join(" ")} blog article`}
                  onSelect={() => {
                    if (blog.href)
                      runCommand(() => window.open(blog.href!, "_blank"));
                    else runCommand(() => router.push("/blogs"));
                  }}
                >
                  <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                  <span className="font-medium">{blog.title}</span>
                  {blog.status === "upcoming" && (
                    <span className="ml-1.5 text-[9px] font-medium border border-border rounded px-1.5 py-0.5 text-muted-foreground uppercase tracking-wide">
                      soon
                    </span>
                  )}
                  {blog.href && (
                    <ArrowUpRight className="ml-auto h-3 w-3 shrink-0 text-muted-foreground" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            {/* Social */}
            <CommandGroup heading="Social & Links">
              <CommandItem
                value="github code repositories open source developer"
                onSelect={() =>
                  runCommand(() =>
                    window.open(DATA.contact.social.GitHub.url, "_blank")
                  )
                }
              >
                <Github className="mr-2 h-4 w-4 shrink-0" />
                <span>GitHub</span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  @priyanshuwq
                </span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  G
                </kbd>
              </CommandItem>
              <CommandItem
                value="linkedin professional network career jobs recruiter"
                onSelect={() =>
                  runCommand(() =>
                    window.open(DATA.contact.social.LinkedIn.url, "_blank")
                  )
                }
              >
                <Linkedin className="mr-2 h-4 w-4 shrink-0" />
                <span>LinkedIn</span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  @priyanshuwq
                </span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  L
                </kbd>
              </CommandItem>
              <CommandItem
                value="x twitter social posts updates"
                onSelect={() =>
                  runCommand(() =>
                    window.open(DATA.contact.social.X.url, "_blank")
                  )
                }
              >
                <Twitter className="mr-2 h-4 w-4 shrink-0" />
                <span>X / Twitter</span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  @priyanshuwq
                </span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  X
                </kbd>
              </CommandItem>
              <CommandItem
                value="reddit community discussion forum"
                onSelect={() =>
                  runCommand(() =>
                    window.open(DATA.contact.social.Reddit.url, "_blank")
                  )
                }
              >
                <MessageCircle className="mr-2 h-4 w-4 shrink-0" />
                <span>Reddit</span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  @priyanshuwq
                </span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  D
                </kbd>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            {/* Actions */}
            <CommandGroup heading="Actions">
              <CommandItem
                value="resume cv download pdf curriculum vitae"
                onSelect={() =>
                  runCommand(() => {
                    (
                      document.querySelector(
                        'a[href*="Resume"]'
                      ) as HTMLAnchorElement
                    )?.click();
                  })
                }
              >
                <FileText className="mr-2 h-4 w-4 shrink-0" />
                <span>Download Resume</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  R
                </kbd>
              </CommandItem>
              <CommandItem
                value="toggle theme dark light mode appearance"
                onSelect={() =>
                  runCommand(() => {
                    (
                      document.querySelector(
                        '[aria-label="Toggle theme"]'
                      ) as HTMLButtonElement
                    )?.click();
                  })
                }
              >
                <Moon className="mr-2 h-4 w-4 shrink-0" />
                <span>Toggle Theme</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  T
                </kbd>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        )}

        {/* ── Footer hint bar ────────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-t border-border/50 px-3 py-2 text-[10px] text-muted-foreground">
          {aiMode ? (
            <>
              <span className="flex items-center gap-1">
                <kbd className="border rounded px-1 font-mono">↵</kbd> send
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border rounded px-1 font-mono">esc</kbd> close
              </span>
              <button
                onClick={backToSearch}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-2.5" /> back to search
              </button>
              <span className="ml-auto text-primary/60 flex items-center gap-1">
                <Sparkles className="size-3" /> Groq · llama-3.1
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <kbd className="border rounded px-1 font-mono">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border rounded px-1 font-mono">↵</kbd> select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border rounded px-1 font-mono">esc</kbd> close
              </span>
              <span className="ml-auto flex items-center gap-1 text-primary/70">
                <Sparkles className="size-3" /> type a question → AI answers inline
              </span>
            </>
          )}
        </div>
      </CommandDialog>
    </>
  );
}

// ── Global keyboard shortcuts ────────────────────────────────────────────────
export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      if (isTyping()) return;

      switch (e.key.toLowerCase()) {
        case "h":
          e.preventDefault();
          router.push("/");
          break;
        case "p":
          e.preventDefault();
          router.push("/projects");
          break;
        case "b":
          e.preventDefault();
          router.push("/blogs");
          break;
        case "c":
          e.preventDefault();
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "r":
          e.preventDefault();
          (
            document.querySelector(
              'a[href*="Resume"]'
            ) as HTMLAnchorElement
          )?.click();
          break;
        case "t":
          e.preventDefault();
          (
            document.querySelector(
              '[aria-label="Toggle theme"]'
            ) as HTMLButtonElement
          )?.click();
          break;
        case "g":
          e.preventDefault();
          window.open(DATA.contact.social.GitHub.url, "_blank");
          break;
        case "l":
          e.preventDefault();
          window.open(DATA.contact.social.LinkedIn.url, "_blank");
          break;
        case "x":
          e.preventDefault();
          window.open(DATA.contact.social.X.url, "_blank");
          break;
        case "d":
          e.preventDefault();
          window.open(DATA.contact.social.Reddit.url, "_blank");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);
}

// ── Helper ────────────────────────────────────────────────────────────────────
function isTyping(): boolean {
  const el = document.activeElement;
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    (el as HTMLElement)?.isContentEditable === true
  );
}
