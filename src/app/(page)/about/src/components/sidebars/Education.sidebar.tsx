"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  GraduationCap,
  FlaskConical,
  Bot,
  Shield,
  Code2,
  BookOpen,
  Layers,
} from "lucide-react";
import { Sidebar } from "@/ui/components/Sidebar.ui";
import type { SidebarItem } from "@/ui/context/Sidebar.context";

const CATEGORIES = [
  { id: "all", label: "All", icon: <Layers size={15} /> },
  { id: "science-stream", label: "Science Stream", icon: <BookOpen size={15} /> },
  { id: "computer-applications", label: "Computer Applications", icon: <Code2 size={15} /> },
  { id: "mern-stack-development", label: "MERN Stack Development", icon: <GraduationCap size={15} /> },
  { id: "software-testing-automation", label: "Software Testing & Automation", icon: <FlaskConical size={15} /> },
  { id: "cybersecurity-ethical-hacking", label: "Cybersecurity & Ethical Hacking", icon: <Shield size={15} /> },
];

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
        <GraduationCap size={14} className="text-white" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-gray-900 truncate leading-tight">
          Education
        </span>
        <span className="text-[10px] text-gray-400 truncate leading-tight">
          {CATEGORIES.length - 1} streams
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

export default function EducationSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeSegment = pathname.split("/").pop() ?? "all";

  const sidebarItems: SidebarItem[] = CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    icon: cat.icon,
    onClick: () => router.push(`/about/education/${cat.id}`),
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
          router.push(`/about/education/${id}`);
        }}
      />
    </div>
  );
}