"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  Github,
  Package,
  Puzzle,
  Chrome,
  Container,
  Bot,
  Users,
  FileText,
  Trophy,
  Share2,
} from "lucide-react";
import { Sidebar } from "@/ui/components/Sidebar.ui";
import type { SidebarItem } from "@/ui/context/Sidebar.context";

const sidebarItems: SidebarItem[] = [
  {
    id: "code-version-control",
    label: "Code & Version Control",
    icon: <Github size={15} />,
    children: [
      { id: "github", label: "GitHub", onClick: () => {} },
      { id: "gitlab", label: "GitLab", onClick: () => {} },
      { id: "bitbucket", label: "Bitbucket", onClick: () => {} },
    ],
  },
  {
    id: "package-registries",
    label: "Package Registries",
    icon: <Package size={15} />,
    dividerBefore: true,
    children: [
      { id: "npm", label: "npm", onClick: () => {} },
      { id: "pypi", label: "PyPI", onClick: () => {} },
      { id: "maven-central", label: "Maven Central", onClick: () => {} },
      { id: "pip", label: "pip (via PyPI)", onClick: () => {} },
      { id: "crates-io", label: "crates.io", onClick: () => {} },
      { id: "nuget", label: "NuGet", onClick: () => {} },
      { id: "packagist", label: "Packagist", onClick: () => {} },
      { id: "rubygems", label: "RubyGems", onClick: () => {} },
      { id: "hex-pm", label: "Hex.pm", onClick: () => {} },
      { id: "pub-dev", label: "Pub.dev", onClick: () => {} },
      { id: "artifact-hub", label: "Artifact Hub", onClick: () => {} },
      { id: "conda", label: "Conda / Anaconda Cloud", onClick: () => {} },
    ],
  },
  {
    id: "ide-marketplaces",
    label: "IDE & Editor Marketplaces",
    icon: <Puzzle size={15} />,
    dividerBefore: true,
    children: [
      { id: "vscode-marketplace", label: "VS Code Marketplace", onClick: () => {} },
      { id: "visual-studio-marketplace", label: "Visual Studio Marketplace", onClick: () => {} },
      { id: "jetbrains-marketplace", label: "JetBrains Marketplace", onClick: () => {} },
      { id: "eclipse-marketplace", label: "Eclipse Marketplace", onClick: () => {} },
      { id: "vim-awesome", label: "Vim Awesome / Neovim", onClick: () => {} },
      { id: "obsidian-plugins", label: "Obsidian Plugin Directory", onClick: () => {} },
    ],
  },
  {
    id: "browser-extensions",
    label: "Browser Extension Stores",
    icon: <Chrome size={15} />,
    dividerBefore: true,
    children: [
      { id: "chrome-web-store", label: "Chrome Web Store", onClick: () => {} },
      { id: "firefox-addons", label: "Firefox Add-ons", onClick: () => {} },
      { id: "edge-addons", label: "Microsoft Edge Add-ons", onClick: () => {} },
      { id: "safari-extensions", label: "Safari Extensions", onClick: () => {} },
      { id: "opera-addons", label: "Opera Add-ons", onClick: () => {} },
    ],
  },
  {
    id: "devops-containers",
    label: "DevOps & Containers",
    icon: <Container size={15} />,
    dividerBefore: true,
    children: [
      { id: "docker-hub", label: "Docker Hub", onClick: () => {} },
      { id: "ghcr", label: "GitHub Container Registry", onClick: () => {} },
      { id: "quay-io", label: "Red Hat Quay.io", onClick: () => {} },
      { id: "aws-ecr", label: "AWS ECR Public Gallery", onClick: () => {} },
      { id: "terraform-registry", label: "Terraform Registry", onClick: () => {} },
      { id: "ansible-galaxy", label: "Ansible Galaxy", onClick: () => {} },
      { id: "helm-hub", label: "Helm Hub / Artifact Hub", onClick: () => {} },
    ],
  },
  {
    id: "ai-model-platforms",
    label: "AI & Model Platforms",
    icon: <Bot size={15} />,
    dividerBefore: true,
    children: [
      { id: "hugging-face", label: "Hugging Face", onClick: () => {} },
      { id: "ollama", label: "Ollama Library", onClick: () => {} },
      { id: "langchain-hub", label: "LangChain Hub", onClick: () => {} },
      { id: "openai-gpt-store", label: "OpenAI GPT Store", onClick: () => {} },
    ],
  },
  {
    id: "dev-community",
    label: "Dev Community & Social",
    icon: <Users size={15} />,
    dividerBefore: true,
    children: [
      { id: "stackoverflow", label: "Stack Overflow", onClick: () => {} },
      { id: "discord", label: "Discord", onClick: () => {} },
      { id: "slack", label: "Slack", onClick: () => {} },
      { id: "dev-to", label: "Dev.to", onClick: () => {} },
      { id: "hashnode", label: "Hashnode", onClick: () => {} },
      { id: "medium", label: "Medium", onClick: () => {} },
      { id: "reddit", label: "Reddit", onClick: () => {} },
      { id: "hacker-news", label: "Hacker News", onClick: () => {} },
      { id: "lobsters", label: "Lobsters", onClick: () => {} },
    ],
  },
  {
    id: "blogging-docs",
    label: "Blogging & Docs",
    icon: <FileText size={15} />,
    dividerBefore: true,
    children: [
      { id: "github-pages", label: "GitHub Pages", onClick: () => {} },
      { id: "gitbook", label: "GitBook", onClick: () => {} },
      { id: "notion", label: "Notion (Public Pages)", onClick: () => {} },
      { id: "docusaurus", label: "Docusaurus", onClick: () => {} },
    ],
  },
  {
    id: "recognition-portfolio",
    label: "Recognition & Portfolio",
    icon: <Trophy size={15} />,
    dividerBefore: true,
    children: [
      { id: "linkedin", label: "LinkedIn", onClick: () => {} },
      { id: "twitter-x", label: "Twitter / X", onClick: () => {} },
      { id: "mastodon", label: "Mastodon / Fosstodon", onClick: () => {} },
      { id: "bluesky", label: "Bluesky", onClick: () => {} },
      { id: "producthunt", label: "ProductHunt", onClick: () => {} },
      { id: "alternativeto", label: "AlternativeTo", onClick: () => {} },
      { id: "open-hub", label: "Open Hub (Ohloh)", onClick: () => {} },
      { id: "exercism", label: "Exercism", onClick: () => {} },
      { id: "codepen", label: "CodePen", onClick: () => {} },
      { id: "replit", label: "Replit", onClick: () => {} },
    ],
  },
];

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
        <Share2 size={14} className="text-white" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-gray-900 truncate leading-tight">
          Social & Presence
        </span>
        <span className="text-[10px] text-gray-400 truncate leading-tight">
          62 platforms
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

function buildItemsWithRouter(
  items: SidebarItem[],
  router: ReturnType<typeof useRouter>
): SidebarItem[] {
  return items.map((item) => {
    if (item.children?.length) {
      return {
        ...item,
        children: item.children.map((child) => ({
          ...child,
          onClick: () => router.push(`/about/social/${child.id}`),
        })),
      };
    }
    return {
      ...item,
      onClick: () => router.push(`/about/social/${item.id}`),
    };
  });
}

export default function SocialSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeSegment = pathname.split("/").pop() ?? "";

  const items = buildItemsWithRouter(sidebarItems, router);

  return (
    <div className="sticky top-14 h-[calc(100vh-56px)] flex flex-col bg-white border-r border-gray-100">
      <Sidebar
        items={items}
        size="md"
        variant="default"
        showSearch={true}
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
          router.push(`/about/social/${id}`);
        }}
      />
    </div>
  );
}