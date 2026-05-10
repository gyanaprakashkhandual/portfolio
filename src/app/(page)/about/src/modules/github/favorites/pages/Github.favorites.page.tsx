"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  GitFork,
  ExternalLink,
  Pin,
  AlertCircle,
  RefreshCw,
  Github,
  Copy,
  BookOpen,
  GitCommit,
  MoreHorizontal,
} from "lucide-react";
import { ActionMenu } from "@/ui/components/Action.menu.ui";
import { Tooltip } from "@/ui/components/Tooltip.ui";
import type { ActionItem } from "@/ui/context/Action.menu.context";

const GITHUB_USERNAME = "gyanaprakashkhandual";

interface PinnedRepo {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  link: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Rust: "#dea584",
  Go: "#00ADD8",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="h-4 w-2/3 rounded-lg bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-1/3 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
        <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
      <div className="flex items-center gap-4 pt-3 border-t border-gray-50 dark:border-gray-800 mt-auto">
        <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-10 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}

function PinnedCard({ repo, index }: { repo: PinnedRepo; index: number }) {
  const langColor =
    repo.languageColor ||
    (repo.language ? LANGUAGE_COLORS[repo.language] ?? "#8b949e" : null);

  const cloneUrl = `https://github.com/${repo.owner}/${repo.repo}.git`;

  const actions: ActionItem[] = [
    {
      id: "open",
      label: "Open on GitHub",
      leadingIcon: <Github size={14} />,
      onClick: () => window.open(repo.link, "_blank"),
    },
    {
      id: "copy",
      label: "Copy Clone URL",
      leadingIcon: <Copy size={14} />,
      dividerBefore: true,
      onClick: () => navigator.clipboard.writeText(cloneUrl),
    },
    {
      id: "readme",
      label: "View README",
      leadingIcon: <BookOpen size={14} />,
      onClick: () => window.open(`${repo.link}#readme`, "_blank"),
    },
    {
      id: "commits",
      label: "View Commits",
      leadingIcon: <GitCommit size={14} />,
      onClick: () => window.open(`${repo.link}/commits`, "_blank"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200"
    >
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <ActionMenu
          items={actions}
          size="md"
          align="bottom-right"
          trigger={
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-100">
              <MoreHorizontal size={14} />
            </button>
          }
        />
      </div>

      <div className="flex items-start gap-3 pr-8">
        <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
          <Github size={16} className="text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <a
            href={repo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-900 dark:text-white truncate hover:underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600 leading-tight"
          >
            {repo.repo}
          </a>
          <span className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
            {repo.owner}/{repo.repo}
          </span>
        </div>
      </div>

      {repo.description ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {repo.description}
        </p>
      ) : (
        <p className="text-sm text-gray-300 dark:text-gray-600 italic flex-1">
          No description provided.
        </p>
      )}

      <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-gray-800 mt-auto flex-wrap">
        {repo.language && langColor && (
          <Tooltip content={repo.language} position="top" showArrow>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: langColor }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {repo.language}
              </span>
            </div>
          </Tooltip>
        )}

        {repo.stars > 0 && (
          <Tooltip content={`${repo.stars} stars`} position="top" showArrow>
            <a
              href={`${repo.link}/stargazers`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Star size={12} />
              <span>{repo.stars.toLocaleString()}</span>
            </a>
          </Tooltip>
        )}

        {repo.forks > 0 && (
          <Tooltip content={`${repo.forks} forks`} position="top" showArrow>
            <a
              href={`${repo.link}/forks`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <GitFork size={12} />
              <span>{repo.forks}</span>
            </a>
          </Tooltip>
        )}

        <a
          href={repo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 text-xs text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <ExternalLink size={11} />
        </a>
      </div>
    </motion.div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
        <AlertCircle size={20} className="text-red-400" />
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Failed to load pinned repos
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 max-w-xs">
        Could not reach the GitHub profile API. Check your connection and try
        again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
      >
        <RefreshCw size={13} />
        Retry
      </button>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Pin size={20} className="text-gray-300 dark:text-gray-600" />
      </div>
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
        No pinned repositories
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
        Pin up to 6 repositories on your GitHub profile to showcase your best
        work.
      </p>
    </motion.div>
  );
}

export default function GithubFavorites() {
  const [repos, setRepos] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPinned = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`
      );
      if (!res.ok) throw new Error("Failed");
      const data: PinnedRepo[] = await res.json();
      setRepos(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPinned();
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <Pin size={15} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
              Pinned Repositories
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {GITHUB_USERNAME}&apos;s featured work on GitHub
            </p>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="flex-1 px-6 pb-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState onRetry={fetchPinned} />
        ) : repos.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <PinnedCard key={`${repo.owner}-${repo.repo}`} repo={repo} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: repos.length * 0.07 + 0.1 }}
              className="mt-8 flex items-center justify-center"
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-150"
              >
                <Github size={14} />
                View all repositories
                <ExternalLink size={11} className="text-gray-300 dark:text-gray-600" />
              </a>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}