/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  GitFork,
  Lock,
  Globe,
  GitCommit,
  ExternalLink,
  Github,
  AlertCircle,
  RefreshCw,
  Code2,
  Loader2,
  MoreHorizontal,
  Copy,
  BookOpen,
} from "lucide-react";
import { ActionMenu } from "@/ui/components/Action.menu.ui";
import { Tooltip } from "@/ui/components/Tooltip.ui";
import type { ActionItem } from "@/ui/context/Action.menu.context";
import GithubNavbar from "../../components/navbars/Github.navbar";
import type {
  SortOption,
  FilterType,
  LanguageFilter,
} from "../../components/navbars/Github.navbar";

const GITHUB_USERNAME = "gyanaprakashkhandual";
const PER_PAGE = 12;

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
  private: boolean;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  topics: string[];
  default_branch: string;
  size: number;
  visibility: string;
  clone_url: string;
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
      </div>
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-gray-50 dark:border-gray-800">
        <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800 ml-auto" />
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const langColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e")
    : null;

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
      id: "copy-url",
      label: "Copy Clone URL",
      leadingIcon: <Copy size={14} />,
      onClick: () => navigator.clipboard.writeText(repo.clone_url),
      dividerBefore: true,
    },
    {
      id: "readme",
      label: "View README",
      leadingIcon: <BookOpen size={14} />,
      onClick: () => window.open(`${repo.html_url}#readme`, "_blank"),
    },
    {
      id: "commits",
      label: "View Commits",
      leadingIcon: <GitCommit size={14} />,
      onClick: () => window.open(`${repo.html_url}/commits`, "_blank"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: (index % PER_PAGE) * 0.04,
        duration: 0.25,
        ease: "easeOut",
      }}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 flex flex-col gap-3 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm dark:hover:shadow-black/20 transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Tooltip
            content={repo.private ? "Private repository" : "Public repository"}
            position="top"
            showArrow
          >
            <span className="shrink-0 text-gray-400 dark:text-gray-500">
              {repo.private ? <Lock size={14} /> : <Globe size={14} />}
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
                <GitFork
                  size={11}
                  className="text-gray-300 dark:text-gray-600"
                />
              </span>
            </Tooltip>
          )}
          {repo.archived && (
            <Tooltip content="Archived" position="top" showArrow>
              <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
                archived
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

      {repo.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {repo.description}
        </p>
      )}

      {repo.topics.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <Tooltip
              content={repo.topics.slice(4).join(", ")}
              position="top"
              showArrow
            >
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 cursor-default">
                +{repo.topics.length - 4}
              </span>
            </Tooltip>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-50 dark:border-gray-800 flex-wrap">
        {repo.language && langColor && (
          <Tooltip content={repo.language} position="top" showArrow>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: langColor }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-20">
                {repo.language}
              </span>
            </div>
          </Tooltip>
        )}

        {repo.stargazers_count > 0 && (
          <Tooltip
            content={`${repo.stargazers_count} stars`}
            position="top"
            showArrow
          >
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

        {repo.forks_count > 0 && (
          <Tooltip
            content={`${repo.forks_count} forks`}
            position="top"
            showArrow
          >
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

        {repo.open_issues_count > 0 && (
          <Tooltip
            content={`${repo.open_issues_count} open issues`}
            position="top"
            showArrow
          >
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <AlertCircle size={12} />
              <span>{repo.open_issues_count}</span>
            </span>
          </Tooltip>
        )}

        <div className="ml-auto flex items-center gap-2">
          {repo.size > 0 && (
            <Tooltip
              content={`Repository size: ${formatSize(repo.size)}`}
              position="top"
              showArrow
            >
              <span className="text-[10px] text-gray-300 dark:text-gray-600">
                {formatSize(repo.size)}
              </span>
            </Tooltip>
          )}
          <Tooltip
            content={`Updated ${formatDate(repo.updated_at)}`}
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
    </motion.div>
  );
}

function EmptyState({
  search,
  filter,
  language,
}: {
  search: string;
  filter: FilterType;
  language: LanguageFilter;
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
          : `No ${filter !== "all" ? filter : ""} repositories${language ? ` in ${language}` : ""}`}
      </p>
    </motion.div>
  );
}

export default function GithubRepositories() {
  const [allRepos, setAllRepos] = useState<GithubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("updated");
  const [filter, setFilter] = useState<FilterType>("all");
  const [language, setLanguage] = useState<LanguageFilter>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef(sort);
  sortRef.current = sort;

  const fetchRepos = useCallback(
    async (pageNum: number, currentSort: SortOption, reset = false) => {
      if (loading) return;
      setLoading(true);
      setError(null);
      try {
        const apiSort =
          currentSort === "stargazers_count" || currentSort === "forks_count"
            ? "updated"
            : currentSort;
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=${apiSort}&per_page=${PER_PAGE}&page=${pageNum}&type=public`,
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data: GithubRepo[] = await res.json();

        setAllRepos((prev) => (reset ? data : [...prev, ...data]));
        setHasMore(data.length === PER_PAGE);
        setPage(pageNum + 1);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to fetch repositories",
        );
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    setAllRepos([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    fetchRepos(1, sort, true);
  }, [sort]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchRepos(page, sortRef.current);
        }
      },
      { rootMargin: "200px" },
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, page, fetchRepos]);

  const availableLanguages = Array.from(
    new Set(allRepos.map((r) => r.language).filter(Boolean) as string[]),
  ).sort();

  const filteredRepos = allRepos.filter((repo) => {
    if (search) {
      const q = search.toLowerCase();
      const matches =
        repo.name.toLowerCase().includes(q) ||
        (repo.description?.toLowerCase().includes(q) ?? false) ||
        repo.topics.some((t) => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (filter === "public" && repo.private) return false;
    if (filter === "private" && !repo.private) return false;
    if (filter === "forks" && !repo.fork) return false;
    if (filter === "sources" && repo.fork) return false;
    if (filter === "archived" && !repo.archived) return false;
    if (language && repo.language !== language) return false;
    return true;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sort === "stargazers_count")
      return b.stargazers_count - a.stargazers_count;
    if (sort === "forks_count") return b.forks_count - a.forks_count;
    return 0;
  });

  if (error && allRepos.length === 0) {
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
          onClick={() => {
            setInitialLoading(true);
            fetchRepos(1, sort, true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <GithubNavbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={(s) => {
          setSort(s);
        }}
        filter={filter}
        onFilterChange={setFilter}
        language={language}
        onLanguageChange={setLanguage}
        availableLanguages={availableLanguages}
        totalCount={allRepos.length}
        filteredCount={sortedRepos.length}
      />

      <div className="flex-1 px-6 py-5">
        {initialLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedRepos.length === 0 ? (
          <EmptyState search={search} filter={filter} language={language} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {sortedRepos.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} index={i} />
                ))}
              </AnimatePresence>
            </div>

            <div
              ref={sentinelRef}
              className="h-10 flex items-center justify-center mt-4"
            >
              {loading && !initialLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500"
                >
                  <Loader2 size={13} className="animate-spin" />
                  Loading more…
                </motion.div>
              )}
              {!hasMore && allRepos.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-300 dark:text-gray-600"
                >
                  All {allRepos.length} repositories loaded
                </motion.p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
