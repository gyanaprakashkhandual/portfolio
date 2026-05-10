/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Flame } from "lucide-react";
import { useTheme } from "../context/Theme.context";
import { BrandIcon } from "./utils/Icon";
import { ActionMenu } from "@/ui/components/Action.menu.ui";
import type { ActionItem } from "@/ui/components/Action.menu.ui";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Playbook", href: "/playbook" },
  { label: "Blogs", href: "/blogs" },
  { label: "Docs", href: "https://readme.vercel.app" },
  { label: "Music", href: "/music" },
  { label: "Contact", href: "/contact" },
];

const HOT_ITEMS: ActionItem[] = [
  {
    id: "assignmate",
    label: "Assignmate",
    description: "Let AI write your handwriting",
    variant: "default",
    onClick: () => {},
  },
];

const THEME_ITEMS: ActionItem[] = [
  { id: "light", label: "Light theme", variant: "default", onClick: () => {} },
  { id: "dark", label: "Dark theme", variant: "default", onClick: () => {} },
  {
    id: "system",
    label: "System theme",
    variant: "default",
    onClick: () => {},
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme, mounted } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navigate = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  const hotItems: ActionItem[] = HOT_ITEMS.map((item) => ({
    ...item,
    onClick: () => navigate(`/products/${item.id}`),
  }));

  const themeItems: ActionItem[] = THEME_ITEMS.map((item) => ({
    ...item,
    onClick: () => setTheme(item.id as "light" | "dark" | "system"),
  }));

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`select-none fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-shadow duration-300 ${scrolled ? "shadow-sm shadow-black/5 dark:shadow-black/30" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <motion.button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 shrink-0 group"
            >
              <span className="flex items-center justify-center w-8 h-8 text-black dark:text-blue-950 transition-colors">
                <BrandIcon className="w-7 h-7" />
              </span>
              <span className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                Gyan
              </span>
            </motion.button>

            <div className="hidden lg:flex items-center gap-0.5">
              <ActionMenu
                items={hotItems}
                align="bottom-left"
                size="md"
                trigger={
                  <motion.button
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 flex items-center gap-1.5 ${
                      pathname.startsWith("/products")
                        ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" strokeWidth={2} />
                    Hot
                  </motion.button>
                }
              />

              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => navigate(link.href)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (i + 1) + 0.2, duration: 0.3 }}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center gap-1">
              {mounted && (
                <ActionMenu
                  items={themeItems}
                  align="bottom-left"
                  size="md"
                  trigger={
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Toggle theme"
                      className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {resolvedTheme === "dark" ? (
                          <motion.span
                            key="sun"
                            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex"
                          >
                            <Sun className="w-4 h-4" strokeWidth={1.8} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="moon"
                            initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex"
                          >
                            <Moon className="w-4 h-4" strokeWidth={1.8} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  }
                />
              )}

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden ml-1 p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {mobileOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
            >
              <div className="px-4 py-3 space-y-0.5">
                {[{ label: "Hot", href: "/hot" }, ...NAV_LINKS].map(
                  (link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.button
                        key={link.href}
                        initial={{ x: -12, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.22 }}
                        onClick={() => navigate(link.href)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        {link.label}
                      </motion.button>
                    );
                  },
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-14" />
    </>
  );
}
