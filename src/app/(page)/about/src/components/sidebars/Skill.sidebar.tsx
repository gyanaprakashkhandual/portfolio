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
import Image from "next/image";

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
    <div className="flex flex-col gap-2.5 select-none">
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 transition-all duration-150">
          <Image
            src="https://res.cloudinary.com/dvytvjplt/image/upload/v1765866608/profile_pricture_oemv94.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-bold text-gray-900 dark:text-white leading-none">
            Gyana Prakash Khandual
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-500 mt-1 font-semibold">
            Software Engineer
          </span>
        </div>
      </div>

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
