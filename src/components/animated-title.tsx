"use client";

import { useState, useEffect } from "react";

const titles = ["FullStack Developer", "Open Source Contributor",];

export function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm sm:text-base text-muted-foreground relative min-h-[1.75rem] sm:min-h-[2rem]">
      <span
        className={`block transition-all duration-500 ${
          isAnimating
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        {titles[currentIndex]}
      </span>
    </p>
  );
}
