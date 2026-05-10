"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Share2,
  Github,
  FolderKanban,
  Cpu,
  GraduationCap,
  BadgeCheck,
  Trophy,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { icon: User, label: "About Me", href: "/about" },
  { icon: Share2, label: "Socials", href: "/socials" },
  { icon: Github, label: "GitHub", href: "/github" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: Cpu, label: "Skills", href: "/skills" },
  { icon: GraduationCap, label: "Education", href: "/education" },
  { icon: BadgeCheck, label: "Certifications", href: "/certifications" },
  { icon: Trophy, label: "Achievements", href: "/achievements" },
];

export default function ActivityBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="h-[calc(100vh-56px)] sticky top-14 w-16 flex flex-col items-center py-4 gap-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40 select-none shrink-0">
      <div className="flex flex-col items-center w-full px-2 mb-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-zinc-200 dark:ring-zinc-700 shrink-0">
          <Image
            src="https://res.cloudinary.com/dvytvjplt/image/upload/v1765866608/profile_pricture_oemv94.jpg"
            alt="Profile"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add(
                  "bg-zinc-100",
                  "dark:bg-zinc-800",
                  "flex",
                  "items-center",
                  "justify-center",
                );
                parent.innerHTML = `<span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">ME</span>`;
              }
            }}
          />
        </div>
      </div>

      <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-700 mb-3" />

      <nav className="flex flex-col items-center gap-1 w-full px-1.5 flex-1 overflow-y-auto scrollbar-none">
        {navItems.map(({ icon: Icon, label, href }, index) => {
          const isActive = pathname === href;

          return (
            <motion.button
              key={href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.25,
                ease: "easeOut",
              }}
              onClick={() => router.push(href)}
              title={label}
              aria-label={label}
              className={`
                group relative w-full flex items-center justify-center rounded-lg p-2.5 transition-all duration-150 cursor-pointer
                ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
                }
              `}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.8}
                className="shrink-0"
              />

              <span
                className="
                  pointer-events-none absolute left-full ml-2.5 whitespace-nowrap
                  rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900
                  text-xs font-medium px-2.5 py-1.5 shadow-md
                  opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-150 z-50
                "
              >
                {label}
              </span>

              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-black dark:bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
