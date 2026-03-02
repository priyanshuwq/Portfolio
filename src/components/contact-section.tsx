"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactSection() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="w-full py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Get in touch</h2>
          <p className="text-sm text-muted-foreground">
            Send me a message — I&apos;ll get back to you.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* To (readonly) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              To
            </label>
            <div className="flex h-9 w-full items-center rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground select-none">
              {DATA.contact.email}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say hi, pitch an idea, or just talk about Projects..."
              rows={5}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors resize-none"
            />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-1">
            {sent ? (
              <p className="text-xs text-muted-foreground">
                ✓ Got it — will wire this up soon!
              </p>
            ) : (
              <span />
            )}
            <Button onClick={handleSend} className="gap-2 h-9 text-sm ml-auto">
              <Send className="size-3.5" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
