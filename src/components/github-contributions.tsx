"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { Activity } from "react-activity-calendar";

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
  const activeMonths = extractActiveMonths(days);
  if (activeMonths.size === 0) {
    return [];
  }

  return days.filter((day) => activeMonths.has(day.date.slice(0, 7)));
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

  const calendarData = useMemo(() => mapToCalendarData(days), [days]);
  const shouldShowCalendar = !isLoading && !error && calendarData.length > 0;

  return (
    <section className={className}>
      <div className="space-y-4">

        <div className="relative w-full rounded-lg border bg-card">
          <style>{`
            .react-activity-calendar__scroll-container {
              overflow: visible !important;
            }
            .react-activity-calendar__count {
              display: none !important;
            }
            
            /* Make calendar responsive to fit in container */
            .react-activity-calendar {
              max-width: 100%;
            }
            
            /* Mobile: enable horizontal scroll, hide scrollbar */
            @media (max-width: 768px) {
              .github-calendar-mobile {
                overflow-x: auto;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
              }
              .github-calendar-mobile::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
              .react-activity-calendar text {
                font-size: 10px !important;
              }
              .react-activity-calendar {
                font-size: 12px !important;
              }
            }
            
            /* Desktop: no scroll, fit content */
            @media (min-width: 769px) {
              .react-activity-calendar__scroll-container {
                overflow: visible !important;
              }
              .react-activity-calendar text {
                font-size: 9px !important;
              }
              .react-activity-calendar {
                font-size: 11px !important;
              }
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
              className="w-full p-4 overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="github-calendar-mobile">
                <ActivityCalendar
                  data={calendarData}
                  blockSize={9}
                  blockMargin={2}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  theme={{
                    light: githubTheme.light,
                    dark: githubTheme.dark,
                  }}
                  showTotalCount={false}
                  showColorLegend
                  showMonthLabels
                  labels={{
                    totalCount: "Total contributions in the last year",
                    legend: { less: "Less", more: "More" },
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

