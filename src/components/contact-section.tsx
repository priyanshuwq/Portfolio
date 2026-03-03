"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = from.trim() && subject.trim() && message.trim() && status !== "loading";

  const handleSend = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: from.trim(), subject: subject.trim(), message: message.trim(), website: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");

      setStatus("success");
      setFrom("");
      setSubject("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (e: unknown) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors disabled:opacity-50";
  const textareaClass =
    "flex w-full rounded-md border border-input bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors resize-none disabled:opacity-50";

  return (
    <section id="contact" className="w-full py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Get in touch</h2>
          <p className="text-sm text-muted-foreground">
            Drop a message — I&apos;ll reply directly to your email.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* Honeypot — invisible to humans, bots fill it and get silently blocked */}
          <input
            type="text"
            name="website"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
            defaultValue=""
          />
          {/* To (readonly) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To</label>
            <div className="flex h-9 w-full items-center rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground select-none">
              {DATA.contact.email}
            </div>
          </div>

          {/* From */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Email</label>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="you@example.com"
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say hi, pitch an idea, or just talk about projects..."
              rows={5}
              disabled={status === "loading"}
              className={textareaClass}
            />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-1 gap-3">
            <div className="text-xs flex items-center gap-1.5">
              {status === "success" && (
                <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="size-3.5" />
                  Message sent — I&apos;ll get back to you!
                </span>
              )}
              {status === "error" && (
                <span className="flex items-center gap-1.5 text-destructive">
                  <AlertCircle className="size-3.5" />
                  {errorMsg}
                </span>
              )}
            </div>

            <Button
              onClick={handleSend}
              disabled={!canSubmit}
              className="gap-2 h-9 text-sm ml-auto shrink-0"
            >
              {status === "loading" ? (
                <><Loader2 className="size-3.5 animate-spin" />Sending…</>
              ) : (
                <><Send className="size-3.5" />Send</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
