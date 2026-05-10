"use client";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  Star,
  GitFork,
  Globe,
  ChevronDown,
  X,
  BookOpen,
} from "lucide-react";
import { ActionMenu } from "@/ui/components/Action.menu.ui";
import { Tooltip } from "@/ui/components/Tooltip.ui";
import type { ActionItem } from "@/ui/context/Action.menu.context";

export type OpenSourceSortOption =
  | "updated"
  | "created"
  | "pushed"
  | "full_name"
  | "stargazers_count"
  | "forks_count";

export type OpenSourceFilterType =
  | "all"
  | "forks"
  | "sources"
  | "archived";

export type OpenSourceLanguageFilter = string | null;

interface OpenSourceNavbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  sort: OpenSourceSortOption;
  onSortChange: (val: OpenSourceSortOption) => void;
  filter: OpenSourceFilterType;
  onFilterChange: (val: OpenSourceFilterType) => void;
  language: OpenSourceLanguageFilter;
  onLanguageChange: (val: OpenSourceLanguageFilter) => void;
  availableLanguages: string[];
  totalCount: number;
  filteredCount: number;
}

const sortItems: ActionItem[] = [
  {
    id: "updated",
    label: "Last Updated",
    description: "Most recently updated first",
    leadingIcon: <ArrowUpDown size={14} />,
    onClick: () => {},
  },
  {
    id: "created",
    label: "Newest Created",
    description: "Recently created repositories",
    leadingIcon: <ArrowUpDown size={14} />,
    onClick: () => {},
  },
  {
    id: "pushed",
    label: "Last Pushed",
    description: "Most recently pushed to",
    leadingIcon: <ArrowUpDown size={14} />,
    onClick: () => {},
  },
  {
    id: "stargazers_count",
    label: "Most Stars",
    description: "Highest starred first",
    leadingIcon: <Star size={14} />,
    onClick: () => {},
  },
  {
    id: "forks_count",
    label: "Most Forks",
    description: "Most forked first",
    leadingIcon: <GitFork size={14} />,
    onClick: () => {},
  },
  {
    id: "full_name",
    label: "Name A–Z",
    description: "Alphabetical order",
    leadingIcon: <Tag size={14} />,
    onClick: () => {},
  },
];

const filterItems: ActionItem[] = [
  {
    id: "all",
    label: "All",
    leadingIcon: <Globe size={14} />,
    onClick: () => {},
  },
  {
    id: "forks",
    label: "Forks",
    leadingIcon: <GitFork size={14} />,
    dividerBefore: true,
    onClick: () => {},
  },
  {
    id: "sources",
    label: "Sources",
    leadingIcon: <Globe size={14} />,
    onClick: () => {},
  },
  {
    id: "archived",
    label: "Archived",
    leadingIcon: <Tag size={14} />,
    onClick: () => {},
  },
];

const sortLabels: Record<OpenSourceSortOption, string> = {
  updated: "Last Updated",
  created: "Newest",
  pushed: "Last Pushed",
  full_name: "Name A–Z",
  stargazers_count: "Most Stars",
  forks_count: "Most Forks",
};

const filterLabels: Record<OpenSourceFilterType, string> = {
  all: "All",
  forks: "Forks",
  sources: "Sources",
  archived: "Archived",
};

export default function OpenSourceNavbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  filter,
  onFilterChange,
  language,
  onLanguageChange,
  availableLanguages,
  totalCount,
  filteredCount,
}: OpenSourceNavbarProps) {
  const sortItemsWithHandlers = sortItems.map((item) => ({
    ...item,
    onClick: () => onSortChange(item.id as OpenSourceSortOption),
  }));

  const filterItemsWithHandlers = filterItems.map((item) => ({
    ...item,
    onClick: () => onFilterChange(item.id as OpenSourceFilterType),
  }));

  const languageItems: ActionItem[] = [
    {
      id: "all-langs",
      label: "All Languages",
      onClick: () => onLanguageChange(null),
    },
    ...availableLanguages.map((lang) => ({
      id: lang,
      label: lang,
      onClick: () => onLanguageChange(lang),
    })),
  ];

  return (
    <div className="sticky top-14 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="px-6 py-3 flex flex-col gap-3">
        {/* Top row: icon label + search */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 shrink-0">
            <BookOpen size={14} />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Open Source
            </span>
          </div>

          <div className="relative flex-1 min-w-[220px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search open source repos by name, description, or topic…"
              className="w-full h-9 pl-9 pr-9 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-150"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom row: filters + results count */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter */}
            <Tooltip content="Filter by type" position="bottom" showArrow>
              <ActionMenu
                items={filterItemsWithHandlers}
                size="md"
                align="bottom-right"
                trigger={
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-100">
                    <SlidersHorizontal
                      size={13}
                      className="text-gray-400 dark:text-gray-500"
                    />
                    <span>{filterLabels[filter]}</span>
                    <ChevronDown
                      size={11}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </button>
                }
              />
            </Tooltip>

            {/* Sort */}
            <Tooltip content="Sort repositories" position="bottom" showArrow>
              <ActionMenu
                items={sortItemsWithHandlers}
                size="md"
                align="bottom-right"
                trigger={
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-100">
                    <ArrowUpDown
                      size={13}
                      className="text-gray-400 dark:text-gray-500"
                    />
                    <span>{sortLabels[sort]}</span>
                    <ChevronDown
                      size={11}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </button>
                }
              />
            </Tooltip>

            {/* Language */}
            {availableLanguages.length > 0 && (
              <Tooltip content="Filter by language" position="bottom" showArrow>
                <ActionMenu
                  items={languageItems}
                  size="md"
                  align="bottom-right"
                  trigger={
                    <button
                      className={[
                        "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-100",
                        language
                          ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600",
                      ].join(" ")}
                    >
                      <Tag
                        size={13}
                        className={
                          language
                            ? "text-white dark:text-gray-900"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      />
                      <span>{language ?? "Language"}</span>
                      <ChevronDown
                        size={11}
                        className={
                          language
                            ? "text-white dark:text-gray-900"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      />
                    </button>
                  }
                />
              </Tooltip>
            )}
          </div>

          {/* Results count */}
          {totalCount > 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
              {filteredCount === totalCount
                ? `${totalCount} repositor${totalCount === 1 ? "y" : "ies"}`
                : `${filteredCount} of ${totalCount} repositor${totalCount === 1 ? "y" : "ies"}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}