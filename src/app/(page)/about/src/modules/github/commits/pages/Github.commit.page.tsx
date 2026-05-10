"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@/ui/components/Tooltip.ui";
import { GitCommit, RefreshCw, AlertCircle, Loader2 } from "lucide-react";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-gray-100 dark:bg-gray-800",
  1: "bg-gray-300 dark:bg-gray-600",
  2: "bg-gray-500 dark:bg-gray-500",
  3: "bg-gray-700 dark:bg-gray-300",
  4: "bg-gray-900 dark:bg-gray-100",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMonthPositions(weeks: ContributionWeek[]): { label: string; col: number }[] {
  const positions: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      positions.push({ label: MONTH_LABELS[month], col });
      lastMonth = month;
    }
  });
  return positions;
}

function ContributionCell({ day }: { day: ContributionDay }) {
  const level = getLevel(day.contributionCount);
  const label =
    day.contributionCount === 0
      ? `No contributions on ${formatDate(day.date)}`
      : `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatDate(day.date)}`;

  return (
    <Tooltip content={label} position="top" showArrow={false}>
      <motion.div
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.1 }}
        className={`w-full aspect-square rounded-sm cursor-default transition-colors duration-100 ${LEVEL_CLASSES[level]}`}
      />
    </Tooltip>
  );
}

function SkeletonGraph() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-48 rounded bg-gray-100 dark:bg-gray-800" />
      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: 640 }}>
          {Array.from({ length: 53 }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1 flex-1">
              {Array.from({ length: 7 }).map((_, d) => (
                <div
                  key={d}
                  className="w-full aspect-square rounded-sm bg-gray-100 dark:bg-gray-800"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-24 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="flex gap-1 ml-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GithubCommitGraph() {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchCalendar = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github/contributions");
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? `Error ${res.status}`);
      }
      const data: ContributionCalendar = await res.json();
      setCalendar(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load contributions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  const monthPositions = calendar ? getMonthPositions(calendar.weeks) : [];

  const totalThisYear = calendar?.totalContributions ?? 0;

  const longestStreak = (() => {
    if (!calendar) return 0;
    const days = calendar.weeks.flatMap((w) => w.contributionDays);
    let max = 0, cur = 0;
    for (const d of days) {
      if (d.contributionCount > 0) { cur++; max = Math.max(max, cur); }
      else cur = 0;
    }
    return max;
  })();

  const activeDays = calendar
    ? calendar.weeks.flatMap((w) => w.contributionDays).filter((d) => d.contributionCount > 0).length
    : 0;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <GitCommit size={15} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
              Contribution Graph
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              gyanaprakashkhandual's activity this year
            </p>
          </div>
        </div>
        <div className="mt-5 h-px w-full bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="flex-1 px-6 pb-10 flex flex-col gap-6">
        {loading ? (
          <SkeletonGraph />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
              <AlertCircle size={20} className="text-red-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Failed to load graph
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 max-w-xs">
              {error}
            </p>
            <button
              onClick={fetchCalendar}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={13} />
              Retry
            </button>
          </motion.div>
        ) : calendar ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Total Contributions", value: totalThisYear.toLocaleString() },
                { label: "Longest Streak", value: `${longestStreak} days` },
                { label: "Active Days", value: `${activeDays} days` },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-5 py-4"
                >
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                    {value}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
            >
              <div ref={containerRef} className="overflow-x-auto">
                <div style={{ minWidth: 600 }}>
                  <div className="relative mb-2 flex">
                    <div className="w-7 shrink-0" />
                    <div className="flex-1 relative h-4">
                      {monthPositions.map(({ label, col }) => (
                        <span
                          key={`${label}-${col}`}
                          className="absolute text-[10px] text-gray-400 dark:text-gray-500 select-none"
                          style={{
                            left: `${(col / calendar.weeks.length) * 100}%`,
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <div className="flex flex-col justify-around w-6 shrink-0 pb-0.5">
                      {DAY_LABELS.map((label, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-gray-400 dark:text-gray-500 leading-none select-none text-right pr-1"
                          style={{ height: "calc(100% / 7)" }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-[3px] flex-1">
                      {calendar.weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px] flex-1">
                          {Array.from({ length: 7 }).map((_, di) => {
                            const day = week.contributionDays[di];
                            if (!day) {
                              return (
                                <div
                                  key={di}
                                  className="w-full aspect-square rounded-sm bg-transparent"
                                />
                              );
                            }
                            return <ContributionCell key={day.date} day={day} />;
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 mt-3">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mr-0.5">
                      Less
                    </span>
                    {([0, 1, 2, 3, 4] as const).map((level) => (
                      <Tooltip
                        key={level}
                        content={
                          level === 0
                            ? "No contributions"
                            : level === 1
                            ? "1–2 contributions"
                            : level === 2
                            ? "3–5 contributions"
                            : level === 3
                            ? "6–9 contributions"
                            : "10+ contributions"
                        }
                        position="top"
                        showArrow={false}
                      >
                        <div
                          className={`w-3 h-3 rounded-sm cursor-default ${LEVEL_CLASSES[level]}`}
                        />
                      </Tooltip>
                    ))}
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-0.5">
                      More
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </div>
    </div>
  );
}