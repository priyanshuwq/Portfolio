"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AskMeButton() {
  const openAIChat = () => {
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  return (
    // Mobile only — hidden on sm and above
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 sm:hidden pointer-events-none">
      <motion.button
        onClick={openAIChat}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-border/50 bg-background/80 backdrop-blur-md px-5 py-3 shadow-lg shadow-black/20 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors duration-200"
        aria-label="Ask AI about me"
      >
        {/* Pulsing sparkle */}
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="size-3.5 text-primary" />
        </motion.span>

        <span className="font-medium">Ask about me</span>

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-[1.5px] h-3.5 rounded-full bg-muted-foreground/50 inline-block"
        />
      </motion.button>
    </div>
  );
}
