"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Code2,
  Server,
  Database,
  Cloud,
  FlaskConical,
  Bot,
  Shield,
  Layers,
  User,
  Mail,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
} from "lucide-react";
import { Sidebar } from "@/ui/components/Sidebar.ui";
import type { SidebarItem } from "@/ui/context/Sidebar.context";

const CATEGORIES = [
  { id: "all", label: "All", slug: "all", icon: <Layers size={15} /> },
  {
    id: "frontend",
    label: "Frontend",
    slug: "frontend",
    icon: <Code2 size={15} />,
  },
  {
    id: "backend",
    label: "Backend",
    slug: "backend",
    icon: <Server size={15} />,
  },
  {
    id: "database",
    label: "Database",
    slug: "database",
    icon: <Database size={15} />,
  },
  {
    id: "devops-cloud",
    label: "DevOps & Cloud",
    slug: "devops-cloud",
    icon: <Cloud size={15} />,
  },
  {
    id: "manual-testing",
    label: "Manual Testing",
    slug: "manual-testing",
    icon: <FlaskConical size={15} />,
  },
  {
    id: "automation-testing",
    label: "Automation Testing",
    slug: "automation-testing",
    icon: <Bot size={15} />,
  },
  {
    id: "ethical-hacking",
    label: "Ethical Hacking",
    slug: "ethical-hacking",
    icon: <Shield size={15} />,
  },
];

function toSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(/\s+/g, "-");
}

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
        <BookOpen size={14} className="text-white" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-gray-900 truncate leading-tight">
          Skills
        </span>
        <span className="text-[10px] text-gray-400 truncate leading-tight">
          {CATEGORIES.length - 1} categories
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
      <div className="flex items-center gap-1.5">
        <a
          href="mailto:gyanaprakashkhandual@gmail.com"
          className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="Email"
        >
          <Mail size={13} />
        </a>
        <a
          href="https://github.com/gyanaprakashkhandual"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="GitHub"
        >
          <Github size={13} />
        </a>
        <a
          href="https://linkedin.com/in/gyanaprakashkhandual"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="LinkedIn"
        >
          <Linkedin size={13} />
        </a>
        <a
          href="https://twitter.com/gyanaprakash"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="Twitter"
        >
          <Twitter size={13} />
        </a>
      </div>
      <p className="text-[10px] text-gray-300 leading-tight">
        © {new Date().getFullYear()} Gyana Prakash Khandual
      </p>
    </div>
  );
}

export default function SkillSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const activeSegment = pathname.split("/").pop() ?? "all";

  const sidebarItems: SidebarItem[] = CATEGORIES.map((cat) => ({
    id: cat.slug,
    label: cat.label,
    icon: cat.icon,
    onClick: () => router.push(`/about/skills/${cat.slug}`),
  }));

  return (
    <div className="sticky top-14 h-[calc(100vh-56px)] flex flex-col bg-white border-r border-gray-100">
      <Sidebar
        items={sidebarItems}
        size="md"
        variant="default"
        showSearch={false}
        showToggle={true}
        showHamburger={true}
        defaultMode="expanded"
        defaultActiveItem={activeSegment}
        persistToStorage={true}
        enableKeyboardShortcut={true}
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
        className="!sticky !top-14 !h-[calc(100vh-56px)] border-r-0"
        onActiveChange={(id) => {
          router.push(`/about/skills/${id}`);
        }}
      />
    </div>
  );
}
