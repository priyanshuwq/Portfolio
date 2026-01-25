"use client";

import { useState, useEffect } from "react";

const titles = ["FullStack Developer", "Open Source Contributor",];

export function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  // Handle typing animation
  useEffect(() => {
    if (!isAnimating && isTyping) {
      const currentTitle = titles[currentIndex];
      
      if (displayedText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 100); // Typing speed (100ms per character)
        
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    }
  }, [displayedText, currentIndex, isAnimating, isTyping]);

  // Handle title transitions
  useEffect(() => {
    if (!isTyping && !isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % titles.length);
          setDisplayedText("");
          setIsTyping(true);
          setIsAnimating(false);
        }, 300); // Half of the animation duration
      }, 2000); // Wait 2 seconds after typing completes

      return () => clearTimeout(timeout);
    }
  }, [isTyping, isAnimating]);

  return (
    <p className="text-sm sm:text-base text-muted-foreground relative min-h-[1.75rem] sm:min-h-[2rem]">
      <span
        className={`block transition-all duration-500 ${
          isAnimating
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        {displayedText}
        {isTyping && <span className="animate-pulse">|</span>}
      </span>
    </p>
  );
}
