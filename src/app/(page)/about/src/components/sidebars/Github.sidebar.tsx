"use client";

import { useRouter } from "next/navigation";
import {
  Github,
  Star,
  Globe,
  Gift,
  GitCommit,
  Kanban,
  BarChart2,
  User,
} from "lucide-react";
import { Sidebar } from "@/ui/components/Sidebar.ui";
import type { SidebarItem } from "@/ui/components/Sidebar.ui";
import Image from "next/image";

const githubItems: SidebarItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <User size={15} />,
    href: "/github/profile",
  },
  {
    id: "repositories",
    label: "Repositories",
    icon: <Github size={15} />,
    href: "/github/repositories",
    dividerBefore: true,
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: <Star size={15} />,
    href: "/github/favorites",
  },
  {
    id: "open-source",
    label: "Open Source",
    icon: <Globe size={15} />,
    href: "/github/open-source",
  },
  {
    id: "free-to-use",
    label: "Free to Use",
    icon: <Gift size={15} />,
    href: "/github/free-to-use",
  },
  {
    id: "commits",
    label: "Commits",
    icon: <GitCommit size={15} />,
    href: "/github/commits",
    dividerBefore: true,
  },
  {
    id: "github-projects",
    label: "Github Projects",
    icon: <Kanban size={15} />,
    href: "/github/github-projects",
  },
  {
    id: "stats",
    label: "Stats",
    icon: <BarChart2 size={15} />,
    href: "/github/stats",
  },
];

function GithubHeader() {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="relative w-5 h-5 shrink-0">
        <Github size={18} className="text-gray-900 dark:text-white" />
      </div>
      <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
        GitHub
      </span>
    </div>
  );
}

function GithubFooter() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 shrink-0">
        <Image
          src="https://res.cloudinary.com/dvytvjplt/image/upload/v1765866608/profile_pricture_oemv94.jpg"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold text-gray-900 dark:text-white truncate leading-tight">
          @username
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors truncate leading-tight"
        >
          github.com/username
        </a>
      </div>
    </div>
  );
}

export default function GithubSidebar() {
  const router = useRouter();

  const itemsWithNav = githubItems.map((item) => ({
    ...item,
    onClick: () => {
      if (item.href) router.push(item.href);
    },
  }));

  return (
    <Sidebar
      items={itemsWithNav}
      size="md"
      variant="default"
      position="left"
      sticky
      showSearch
      showToggle
      showHamburger
      header={<GithubHeader />}
      footer={<GithubFooter />}
      defaultMode="expanded"
      persistToStorage
      enableKeyboardShortcut
      className="h-[calc(100vh-56px)] sticky top-14"
    />
  );
}
