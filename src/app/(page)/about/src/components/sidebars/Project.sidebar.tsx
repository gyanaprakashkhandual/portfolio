"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  Github,
  ExternalLink,
  Layers,
  Smartphone,
  Monitor,
  Puzzle,
  Chrome,
  Package,
  FlaskConical,
  Zap,
  Database,
  Wrench,
  BarChart2,
  TestTube,
  FolderOpen,
  User,
  Mail,
  Twitter,
  Linkedin,
  FileCode2,
  BookOpen,
} from "lucide-react";
import { Sidebar } from "@/ui/components/Sidebar.ui";
import { ActionMenu } from "@/ui/components/Action.menu.ui";
import type { SidebarItem } from "@/ui/context/Sidebar.context";
import type { ActionItem } from "@/ui/context/Action.menu.context";
import { projects } from "../../modules/projects/script";

function buildActionItems(
  slug: string,
  liveDemo: string,
  repoFrontend: string,
  repoBackend: string
): ActionItem[] {
  const items: ActionItem[] = [
    {
      id: "view-project",
      label: "View Project",
      leadingIcon: <BookOpen size={14} />,
      onClick: () => {},
    },
  ];

  if (liveDemo) {
    items.push({
      id: "live-demo",
      label: "Live Demo",
      leadingIcon: <Globe size={14} />,
      onClick: () => window.open(liveDemo, "_blank"),
    });
  }

  if (repoFrontend) {
    items.push({
      id: "repo-frontend",
      label: "Frontend Repo",
      leadingIcon: <Github size={14} />,
      onClick: () => window.open(repoFrontend, "_blank"),
    });
  }

  if (repoBackend) {
    items.push({
      id: "repo-backend",
      label: "Backend Repo",
      leadingIcon: <Github size={14} />,
      onClick: () => window.open(repoBackend, "_blank"),
    });
  }

  items.push({
    id: "copy-link",
    label: "Copy Link",
    leadingIcon: <ExternalLink size={14} />,
    dividerBefore: true,
    onClick: () => {
      navigator.clipboard.writeText(
        `${window.location.origin}/projects/${slug}`
      );
    },
  });

  return items;
}

interface ProjectLeafProps {
  slug: string;
  title: string;
  liveDemo: string;
  repoFrontend: string;
  repoBackend: string;
}

function ProjectLeaf({
  slug,
  title,
  liveDemo,
  repoFrontend,
  repoBackend,
}: ProjectLeafProps) {
  const router = useRouter();
  const actionItems = buildActionItems(slug, liveDemo, repoFrontend, repoBackend);

  actionItems[0].onClick = () => router.push(`/projects/${slug}`);

  return (
    <div className="flex items-center justify-between group px-2 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-100">
      <span
        className="text-sm text-gray-700 truncate flex-1 min-w-0"
        onClick={() => router.push(`/projects/${slug}`)}
      >
        {title}
      </span>
      <ActionMenu
        items={actionItems}
        size="sm"
        align="bottom-right"
        trigger={
          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-5 h-5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="6" cy="2" r="1.2" />
              <circle cx="6" cy="6" r="1.2" />
              <circle cx="6" cy="10" r="1.2" />
            </svg>
          </button>
        }
      />
    </div>
  );
}

function buildSidebarItems(): SidebarItem[] {
  const byType = (types: string[]) =>
    projects.filter((p) => p.type && types.some((t) => p.type.toLowerCase().includes(t)));

  const toChildren = (list: ReturnType<typeof byType>): SidebarItem[] =>
    list.map((p) => ({
      id: p.slug,
      label: p.title,
      onClick: () => {},
    }));

  return [
    {
      id: "web-apps",
      label: "Web Applications",
      icon: <Layers size={15} />,
      children: toChildren(byType(["full stack web"])),
    },
    {
      id: "mobile-apps",
      label: "Mobile Applications",
      icon: <Smartphone size={15} />,
      children: toChildren(byType(["mobile"])),
    },
    {
      id: "desktop-apps",
      label: "Desktop Applications",
      icon: <Monitor size={15} />,
      children: toChildren(byType(["desktop"])),
    },
    {
      id: "vscode-extensions",
      label: "VS Code Extensions",
      icon: <Puzzle size={15} />,
      children: toChildren(byType(["vs code"])),
    },
    {
      id: "chrome-extensions",
      label: "Chrome Extensions",
      icon: <Chrome size={15} />,
      children: toChildren(byType(["chrome"])),
    },
    {
      id: "npm-packages",
      label: "NPM Packages",
      icon: <Package size={15} />,
      children: toChildren(byType(["npm"])),
    },
    {
      id: "ui-testing",
      label: "UI Testing",
      icon: <FlaskConical size={15} />,
      dividerBefore: true,
      children: toChildren(
        projects.filter(
          (p) =>
            p.type &&
            p.type.toLowerCase().includes("testing") &&
            p.technologies?.some((t) =>
              ["selenium", "cypress", "playwright"].includes(t.toLowerCase())
            )
        )
      ),
    },
    {
      id: "api-testing",
      label: "API Testing",
      icon: <Zap size={15} />,
      children: toChildren(
        projects.filter((p) =>
          p.tags?.some((tag) => tag.toLowerCase().includes("api testing"))
        )
      ),
    },
    {
      id: "performance-testing",
      label: "Performance Testing",
      icon: <BarChart2 size={15} />,
      children: toChildren(
        projects.filter((p) =>
          p.tags?.some((tag) => tag.toLowerCase().includes("performance"))
        )
      ),
    },
    {
      id: "database-testing",
      label: "Database Testing",
      icon: <Database size={15} />,
      children: toChildren(
        projects.filter((p) =>
          p.technologies?.some((t) =>
            ["mongodb", "sqlite", "sql"].includes(t.toLowerCase())
          )
        )
      ),
    },
    {
      id: "developer-tools",
      label: "Developer Tools",
      icon: <Wrench size={15} />,
      children: toChildren(
        projects.filter(
          (p) =>
            p.type &&
            (p.type.toLowerCase().includes("extension") ||
              p.type.toLowerCase().includes("npm") ||
              p.type.toLowerCase().includes("code generation"))
        )
      ),
    },
    {
      id: "maven-pypi",
      label: "Maven / PyPI",
      icon: <TestTube size={15} />,
      children: [],
    },
  ];
}

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
        <FolderOpen size={14} className="text-white" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-gray-900 truncate leading-tight">
          Projects
        </span>
        <span className="text-[10px] text-gray-400 truncate leading-tight">
          {projects.length} projects
        </span>
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <User size={13} className="text-gray-500" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-semibold text-gray-800 truncate leading-tight">
            Gyana Prakash
          </span>
          <span className="text-[10px] text-gray-400 truncate leading-tight">
            Full Stack Developer
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectSidebar() {
  const router = useRouter();
  const sidebarItems = buildSidebarItems();

  return (
    <div className="sticky top-14 h-[calc(100vh-56px)] flex flex-col bg-white border-r border-gray-100">
      <Sidebar
        items={sidebarItems}
        size="md"
        variant="default"
        showSearch={true}
        showToggle={true}
        showHamburger={true}
        defaultMode="expanded"
        persistToStorage={true}
        enableKeyboardShortcut={true}
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
        className="!sticky !top-14 !h-[calc(100vh-56px)] border-r-0"
        onActiveChange={(id) => {
          const project = projects.find((p) => p.slug === id);
          if (project) {
            router.push(`/projects/${id}`);
          }
        }}
      />
    </div>
  );
}