"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { Activity } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false }
);

type ContributionDay = {
  date: string;
  count: number;
};

interface GitHubContributionsProps {
  username: string;
  className?: string;
  onTotalLoad?: (total: number) => void;
}

const githubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const extractActiveMonths = (days: ContributionDay[]) => {
  const totals = days.reduce<Record<string, number>>((acc, day) => {
    const monthKey = day.date.slice(0, 7); // YYYY-MM
    acc[monthKey] = (acc[monthKey] ?? 0) + day.count;
    return acc;
  }, {});

  return new Set(
    Object.entries(totals)
      .filter(([, total]) => total > 0)
      .map(([month]) => month)
  );
};

const filterCommittedMonths = (days: ContributionDay[]) => {
  if (days.length === 0) return [];

  const today = new Date();
  
  // Show last 8 months of data to ensure current days are fully visible
  const monthsToShow = 8;
  const cutoffDate = new Date(today);
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsToShow);
  
  // Include all days from cutoff date through end of current month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  return days.filter((day) => {
    const dayDate = new Date(day.date);
    return dayDate >= cutoffDate && dayDate <= endOfMonth;
  });
};

const mapToCalendarData = (days: ContributionDay[]): Activity[] => {
  if (days.length === 0) return [];

  const maxCount = Math.max(...days.map((day) => day.count), 0);
  if (maxCount === 0) {
    return days.map((day) => ({ date: day.date, count: day.count, level: 0 }));
  }

  const levelSize = Math.max(1, maxCount / 4);

  return days.map((day) => ({
    date: day.date,
    count: day.count,
    level: day.count === 0 ? 0 : Math.min(4, Math.ceil(day.count / levelSize)),
  }));
};

export function GitHubContributions({ username, className, onTotalLoad }: GitHubContributionsProps) {
  const { resolvedTheme } = useTheme();
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Responsive block size so the calendar fills width without horizontal scroll
  const { blockSize, blockMargin, showLegend } = useMemo(() => {
    if (windowWidth < 400) return { blockSize: 5, blockMargin: 2, showLegend: false };
    if (windowWidth < 540) return { blockSize: 7, blockMargin: 3, showLegend: false };
    if (windowWidth < 768) return { blockSize: 9, blockMargin: 3, showLegend: true };
    return { blockSize: 12, blockMargin: 4, showLegend: true };
  }, [windowWidth]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/github-contributions?username=${username}`);
        if (!res.ok) {
          throw new Error("Failed to load contributions");
        }
        const data = await res.json();
        setDays(data.values ?? []);
        const totalCount = data.total ?? 0;
        setTotal(totalCount);
        if (onTotalLoad) {
          onTotalLoad(totalCount);
        }
      } catch (err) {
        setError("Unable to load contributions right now.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, onTotalLoad]);

  const calendarData = useMemo(() => {
    const filteredDays = filterCommittedMonths(days);
    return mapToCalendarData(filteredDays);
  }, [days]);
  const shouldShowCalendar = !isLoading && !error && calendarData.length > 0 && mounted;

  return (
    <section className={className}>
      <div className="space-y-4">

        <div className="relative w-full rounded-lg border bg-card overflow-hidden">
          <style>{`
            .react-activity-calendar__scroll-container {
              overflow: visible !important;
            }
            
            /* Style the built-in tooltips to match social media icons */
            .react-activity-calendar__tooltip {
              background: white !important;
              color: black !important;
              border: 1px solid rgb(229, 231, 235) !important;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
              border-radius: 0.5rem !important;
              padding: 0.5rem 0.75rem !important;
              font-size: 0.875rem !important;
              line-height: 1.25rem !important;
            }
            
            .dark .react-activity-calendar__tooltip {
              background: white !important;
              color: black !important;
              border-color: rgb(229, 231, 235) !important;
            }
            
            /* Make calendar fit in container */
            .react-activity-calendar {
              max-width: 100%;
            }
            
            .react-activity-calendar svg {
              overflow: visible !important;
            }
            
            /* Full-width calendar — no horizontal scroll on any screen */
            .github-calendar-wrapper {
              width: 100%;
            }
            .react-activity-calendar {
              width: 100% !important;
              font-size: 11px !important;
            }
            .react-activity-calendar svg {
              width: 100% !important;
              overflow: visible !important;
            }
            .react-activity-calendar text {
              font-size: 10px !important;
            }
          `}</style>

          {isLoading && (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground p-4">
              Loading contribution data…
            </div>
          )}

          {error && (
            <div className="flex h-48 items-center justify-center text-sm text-destructive p-4">
              {error}
            </div>
          )}

          {shouldShowCalendar && (
            <motion.div
              className="w-full py-6 px-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="github-calendar-wrapper">
                <ActivityCalendar
                  data={calendarData}
                  blockSize={blockSize}
                  blockMargin={blockMargin}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  theme={{
                    light: githubTheme.light,
                    dark: githubTheme.dark,
                  }}
                  showTotalCount={false}
                  showColorLegend={showLegend}
                  showMonthLabels
                  labels={{
                    totalCount: "Total contributions in the last year",
                    legend: { less: "Less", more: "More" },
                  }}
                  tooltips={{
                    activity: {
                      text: (activity) => {
                        const date = new Date(activity.date);
                        const formattedDate = date.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        });
                        return `${activity.count} ${activity.count === 1 ? 'contribution' : 'contributions'} on ${formattedDate}`;
                      },
                    },
                  }}
                />
              </div>
            </motion.div>
          )}
          {!isLoading && !error && calendarData.length === 0 && (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground p-4">
              No commits recorded recently.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

