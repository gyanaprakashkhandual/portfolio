/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  GitFork,
  Globe,
  GitCommit,
  ExternalLink,
  Github,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Loader2,
  MoreHorizontal,
  Copy,
  Eye,
  GitBranch,
  Scale,
  Package,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { ActionMenu } from "@/ui/components/Action.menu.ui";
import { Tooltip } from "@/ui/components/Tooltip.ui";
import type { ActionItem } from "@/ui/context/Action.menu.context";
import OpenSourceNavbar from "../components/OpenSource.navbar";
import type {
  OpenSourceSortOption,
  OpenSourceFilterType,
  OpenSourceLanguageFilter,
} from "../components/OpenSource.navbar";

const GITHUB_USERNAME = "gyanaprakashkhandual";

const OPEN_SOURCE_REPOS = [
  "devlens",
  "seleniumcucumber",
  "markdown",
  "taar",
  "veloria"
] as const;

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  subscribers_count: number;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  topics: string[];
  default_branch: string;
  size: number;
  visibility: string;
  clone_url: string;
  ssh_url: string;
  license: { name: string; spdx_id: string } | null;
  network_count?: number;
  open_issues?: number;
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function formatFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatSize(kb: number): string {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-800 shrink-0" />
          <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-4/5 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
      <div className="flex gap-1.5 flex-wrap">
        <div className="h-5 w-14 rounded-full bg-gray-100 dark:bg-gray-800" />
        <div className="h-5 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
        <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
      </div>
      <div className="flex items-center gap-3 pt-3 border-t border-gray-50 dark:border-gray-800">
        <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800 ml-auto" />
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const [copied, setCopied] = useState(false);
  const langColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e")
    : null;

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const repoActions: ActionItem[] = [
    {
      id: "open",
      label: "Open on GitHub",
      leadingIcon: <Github size={14} />,
      onClick: () => window.open(repo.html_url, "_blank"),
    },
    ...(repo.homepage
      ? [
          {
            id: "website",
            label: "Visit Website",
            leadingIcon: <Globe size={14} />,
            onClick: () => window.open(repo.homepage!, "_blank"),
          },
        ]
      : []),
    {
      id: "copy-clone-https",
      label: "Copy HTTPS Clone URL",
      leadingIcon: copied ? <CheckCircle2 size={14} /> : <Copy size={14} />,
      dividerBefore: true,
      onClick: () => handleCopy(repo.clone_url),
    },
    {
      id: "copy-ssh",
      label: "Copy SSH URL",
      leadingIcon: <Copy size={14} />,
      onClick: () => handleCopy(repo.ssh_url),
    },
    {
      id: "readme",
      label: "View README",
      leadingIcon: <BookOpen size={14} />,
      dividerBefore: true,
      onClick: () => window.open(`${repo.html_url}#readme`, "_blank"),
    },
    {
      id: "commits",
      label: "View Commits",
      leadingIcon: <GitCommit size={14} />,
      onClick: () => window.open(`${repo.html_url}/commits`, "_blank"),
    },
    {
      id: "branches",
      label: "View Branches",
      leadingIcon: <GitBranch size={14} />,
      onClick: () => window.open(`${repo.html_url}/branches`, "_blank"),
    },
    {
      id: "issues",
      label: "View Issues",
      leadingIcon: <AlertCircle size={14} />,
      onClick: () => window.open(`${repo.html_url}/issues`, "_blank"),
    },
    {
      id: "forks",
      label: "View Forks",
      leadingIcon: <GitFork size={14} />,
      onClick: () => window.open(`${repo.html_url}/forks`, "_blank"),
    },
    {
      id: "releases",
      label: "View Releases",
      leadingIcon: <Package size={14} />,
      dividerBefore: true,
      onClick: () => window.open(`${repo.html_url}/releases`, "_blank"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.25,
        ease: "easeOut",
      }}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 flex flex-col gap-3 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm dark:hover:shadow-black/20 transition-all duration-150"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Tooltip content="Public open source repository" position="top" showArrow>
            <span className="shrink-0 text-gray-400 dark:text-gray-500">
              <Globe size={14} />
            </span>
          </Tooltip>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-900 dark:text-white truncate hover:underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600"
          >
            {repo.name}
          </a>

          {repo.fork && (
            <Tooltip content="Forked repository" position="top" showArrow>
              <span className="shrink-0">
                <GitFork size={11} className="text-gray-300 dark:text-gray-600" />
              </span>
            </Tooltip>
          )}

          {repo.archived && (
            <Tooltip content="This repository is archived" position="top" showArrow>
              <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
                archived
              </span>
            </Tooltip>
          )}

          {repo.disabled && (
            <Tooltip content="This repository is disabled" position="top" showArrow>
              <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-red-200 dark:border-red-800 text-red-400 dark:text-red-500">
                disabled
              </span>
            </Tooltip>
          )}
        </div>

        <ActionMenu
          items={repoActions}
          size="md"
          align="bottom-right"
          trigger={
            <button className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-100 opacity-0 group-hover:opacity-100">
              <MoreHorizontal size={14} />
            </button>
          }
        />
      </div>

      {/* Description */}
      {repo.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {repo.description}
        </p>
      )}

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {repo.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 5 && (
            <Tooltip content={repo.topics.slice(5).join(", ")} position="top" showArrow>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 cursor-default">
                +{repo.topics.length - 5}
              </span>
            </Tooltip>
          )}
        </div>
      )}

      {/* License */}
      {repo.license && (
        <div className="flex items-center gap-1.5">
          <Scale size={11} className="text-gray-300 dark:text-gray-600 shrink-0" />
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            {repo.license.spdx_id !== "NOASSERTION"
              ? repo.license.spdx_id
              : repo.license.name}
          </span>
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-50 dark:border-gray-800 flex-wrap">
        {/* Language */}
        {repo.language && langColor && (
          <Tooltip content={`Primary language: ${repo.language}`} position="top" showArrow>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: langColor }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[72px]">
                {repo.language}
              </span>
            </div>
          </Tooltip>
        )}

        {/* Stars */}
        {repo.stargazers_count > 0 && (
          <Tooltip content={`${repo.stargazers_count.toLocaleString()} stars`} position="top" showArrow>
            <a
              href={`${repo.html_url}/stargazers`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Star size={12} />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </a>
          </Tooltip>
        )}

        {/* Forks */}
        {repo.forks_count > 0 && (
          <Tooltip content={`${repo.forks_count} forks`} position="top" showArrow>
            <a
              href={`${repo.html_url}/forks`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <GitFork size={12} />
              <span>{repo.forks_count}</span>
            </a>
          </Tooltip>
        )}

        {/* Watchers */}
        {repo.watchers_count > 0 && (
          <Tooltip content={`${repo.watchers_count} watching`} position="top" showArrow>
            <a
              href={`${repo.html_url}/watchers`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Eye size={12} />
              <span>{repo.watchers_count}</span>
            </a>
          </Tooltip>
        )}

        {/* Open Issues */}
        {repo.open_issues_count > 0 && (
          <Tooltip content={`${repo.open_issues_count} open issues`} position="top" showArrow>
            <a
              href={`${repo.html_url}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <AlertCircle size={12} />
              <span>{repo.open_issues_count}</span>
            </a>
          </Tooltip>
        )}

        {/* Right side: size + date + external link */}
        <div className="ml-auto flex items-center gap-2">
          {repo.size > 0 && (
            <Tooltip content={`Repository size: ${formatSize(repo.size)}`} position="top" showArrow>
              <span className="text-[10px] text-gray-300 dark:text-gray-600">
                {formatSize(repo.size)}
              </span>
            </Tooltip>
          )}

          <Tooltip
            content={`Created ${formatFullDate(repo.created_at)} · Updated ${formatFullDate(repo.updated_at)}`}
            position="top"
            showArrow
          >
            <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
              {formatDate(repo.updated_at)}
            </span>
          </Tooltip>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Default branch + clone url row */}
      <div className="flex items-center gap-3 flex-wrap">
        <Tooltip content="Default branch" position="top" showArrow>
          <div className="flex items-center gap-1 text-[10px] text-gray-300 dark:text-gray-600">
            <GitBranch size={10} />
            <span>{repo.default_branch}</span>
          </div>
        </Tooltip>

        <Tooltip content="Click to copy clone URL" position="top" showArrow>
          <button
            onClick={() => handleCopy(repo.clone_url)}
            className="flex items-center gap-1 text-[10px] text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors max-w-[200px] truncate"
          >
            {copied ? (
              <CheckCircle2 size={10} className="text-green-500 shrink-0" />
            ) : (
              <Copy size={10} className="shrink-0" />
            )}
            <span className="truncate">{repo.clone_url}</span>
          </button>
        </Tooltip>
      </div>
    </motion.div>
  );
}

function EmptyState({
  search,
  filter,
  language,
}: {
  search: string;
  filter: OpenSourceFilterType;
  language: OpenSourceLanguageFilter;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Code2 size={20} className="text-gray-300 dark:text-gray-600" />
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        No repositories found
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
        {search
          ? `No results for "${search}"`
          : `No ${filter !== "all" ? filter : ""}  repositories${language ? ` in ${language}` : ""}`}
      </p>
    </motion.div>
  );
}

export default function OpenSourceRepositories() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll pagination state
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<OpenSourceSortOption>("updated");
  const [filter, setFilter] = useState<OpenSourceFilterType>("all");
  const [language, setLanguage] = useState<OpenSourceLanguageFilter>(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        OPEN_SOURCE_REPOS.map((name) =>
          fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${name}`
          ).then((r) => {
            if (!r.ok) throw new Error(`Failed to fetch ${name}: ${r.status}`);
            return r.json() as Promise<GithubRepo>;
          })
        )
      );
      setRepos(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  // Derived: available languages
  const availableLanguages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean) as string[])
  ).sort();

  // Filtered + sorted
  const filteredRepos = repos.filter((repo) => {
    if (search) {
      const q = search.toLowerCase();
      const matches =
        repo.name.toLowerCase().includes(q) ||
        (repo.description?.toLowerCase().includes(q) ?? false) ||
        repo.topics.some((t) => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (filter === "forks" && !repo.fork) return false;
    if (filter === "sources" && repo.fork) return false;
    if (filter === "archived" && !repo.archived) return false;
    if (language && repo.language !== language) return false;
    return true;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sort === "stargazers_count") return b.stargazers_count - a.stargazers_count;
    if (sort === "forks_count") return b.forks_count - a.forks_count;
    if (sort === "full_name") return a.name.localeCompare(b.name);
    if (sort === "created")
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sort === "pushed")
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    // default: updated
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const visibleRepos = sortedRepos.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRepos.length;

  // Intersection observer for scroll-based pagination
  useEffect(() => {
    observerRef.current?.disconnect();
    if (!sentinelRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 6);
            setLoadingMore(false);
          }, 400);
        }
      },
      { rootMargin: "200px" }
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, loadingMore, visibleRepos.length]);

  // Reset visible count on filter/sort change
  useEffect(() => {
    setVisibleCount(6);
  }, [search, sort, filter, language]);

  if (error && repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
          <AlertCircle size={20} className="text-red-400" />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Failed to load
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{error}</p>
        <button
          onClick={fetchRepos}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0 flex-1 h-[calc(100vh-56px)]">
      <OpenSourceNavbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        filter={filter}
        onFilterChange={setFilter}
        language={language}
        onLanguageChange={setLanguage}
        availableLanguages={availableLanguages}
        totalCount={repos.length}
        filteredCount={sortedRepos.length}
      />

      <div className="flex-1 px-6 py-5">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPEN_SOURCE_REPOS.map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedRepos.length === 0 ? (
          <EmptyState search={search} filter={filter} language={language} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {visibleRepos.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {/* Scroll sentinel */}
            <div
              ref={sentinelRef}
              className="h-10 flex items-center justify-center mt-4"
            >
              {loadingMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500"
                >
                  <Loader2 size={13} className="animate-spin" />
                  Loading more…
                </motion.div>
              )}
              {!hasMore && sortedRepos.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-300 dark:text-gray-600"
                >
                  All {sortedRepos.length} repositor{sortedRepos.length === 1 ? "y" : "ies"} loaded
                </motion.p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}