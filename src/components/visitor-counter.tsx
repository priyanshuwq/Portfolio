"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAndIncrement = async () => {
      try {
        // Increment the count
        const response = await fetch('/api/visitors', { method: 'POST' });
        const data = await response.json();
        
        if (isMounted) {
          setCount(data.count);
        }
      } catch (error) {
        console.error('[Visitors] Error:', error);
        // Fallback: just get current count without incrementing
        try {
          const response = await fetch('/api/visitors');
          const data = await response.json();
          if (isMounted) {
            setCount(data.count);
          }
        } catch {
          // Silent fail
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Debounce to prevent multiple increments
    const timer = setTimeout(fetchAndIncrement, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (isLoading || count === null) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Eye className="size-3.5" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Eye className="size-3.5" />
      <span>
        <span className="font-semibold text-foreground">{count.toLocaleString()}</span> visitors
      </span>
    </div>
  );
}
