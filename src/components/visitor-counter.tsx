"use client";

import { useEffect, useState } from "react";

const VISITOR_KEY = 'portfolio_visitor_timestamp';
const VISIT_EXPIRY_HOURS = 24; // Count again after 24 hours

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const shouldCountVisitor = (): boolean => {
      try {
        const lastVisit = localStorage.getItem(VISITOR_KEY);
        
        if (!lastVisit) {
          // New visitor
          return true;
        }

        const lastVisitTime = new Date(lastVisit).getTime();
        const now = new Date().getTime();
        const hoursSinceLastVisit = (now - lastVisitTime) / (1000 * 60 * 60);

        // Count again if more than VISIT_EXPIRY_HOURS have passed
        return hoursSinceLastVisit >= VISIT_EXPIRY_HOURS;
      } catch (error) {
        // If localStorage is not available or error occurs, don't count
        console.error('[Visitors] localStorage error:', error);
        return false;
      }
    };

    const fetchAndIncrement = async () => {
      try {
        const isNewVisitor = shouldCountVisitor();

        if (isNewVisitor) {
          // New visitor or expired - increment the count
          const response = await fetch('/api/visitors', { method: 'POST' });
          const data = await response.json();
          
          if (isMounted) {
            setCount(data.count);
            // Mark this visit in localStorage
            try {
              localStorage.setItem(VISITOR_KEY, new Date().toISOString());
            } catch (error) {
              console.error('[Visitors] Failed to set localStorage:', error);
            }
          }
        } else {
          // Returning visitor within 24 hours - just get current count
          const response = await fetch('/api/visitors');
          const data = await response.json();
          
          if (isMounted) {
            setCount(data.count);
          }
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
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>
        <span className="font-semibold text-foreground">{count.toLocaleString()}</span> visitors
      </span>
    </div>
  );
}
