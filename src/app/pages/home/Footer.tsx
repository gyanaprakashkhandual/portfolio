"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { BackgroundStrokes } from "./Strokes";
import { FaGithub, FaNpm } from "react-icons/fa";

const socials = [
  {
    name: "YouTube",
    url: "https://youtube.com/@GyanaprakashKhandual",
    color: "hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/8",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gyanaprakashkhandual",
    color: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/8",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/gyanaprakashkhandual",
    color: "hover:text-black-600 hover:border-black-600/30 hover:bg-black-600/8",
    icon: <FaGithub />,
  },
  {
    name: "NPM Profile",
    url: "https://www.npmjs.com/~gyanaprakashkhandual",
    color: "hover:text-red-600 hover:border-red-600/30 hover:bg-red-600/8",
    icon: <FaNpm className="text-red-800" />,
  },
];

const projectSections = [
  {
    label: "Web Applications",
    items: [
      { name: "Caffetest", slug: "caffetest" },
      { name: "Fetch", slug: "fetch" },
      { name: "Feel", slug: "feel" },
    ],
  },
  {
    label: "Testing Infrastructure",
    items: [
      { name: "Pioneers Wine", slug: "pisl-infra" },
      { name: "Portfolio", slug: "resolution-pro-testing" },
      { name: "Orange HRM", slug: "mega-jewelers-testing" },
    ],
  },
  {
    label: "VS Code Extensions",
    items: [
      { name: "Caffetest Tracker", slug: "caffetest-tracker" },
      { name: "Selenium-Cucumber Pro", slug: "selenium-cucumber-pro" },
    ],
  },
  {
    label: "Chrome Extension",
    items: [
      { name: "Taar", slug: "taar" },
    ],
  },
  {
    label: "NPM Package",
    items: [
      { name: "ShowMarkdown", slug: "show-markdown" },
      { name: "Encrypt ENV", slug: "encrypt-env" },
    ],
  },
  {
    label: "Mobile & Desktop",
    items: [
      { name: "Todo Mobile", slug: "todo-mobile" },
      { name: "Todo Desktop", slug: "todo-desktop" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative px-6 lg:px-12 pt-20 pb-10 bg-white dark:bg-[#0d0d0f] border-t border-black/6 dark:border-white/6">
      <BackgroundStrokes />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">
                Gyana Prakash Khandual
              </h3>
              <p className="text-sm text-black/45 dark:text-white/45 font-medium">
                Software Engineer
              </p>
            </div>

            <p className="text-sm text-black/45 dark:text-white/45 leading-relaxed max-w-sm">
              Building secure, scalable, and intelligent applications.
              Committed to quality at every layer of the stack.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.92 }}
                  className={`group relative flex items-center justify-center w-11 h-11 rounded-2xl bg-black/4 dark:bg-white/4 border border-black/8 dark:border-white/8 text-black/40 dark:text-white/40 ${s.color} transition-all duration-200 shadow-sm hover:shadow-md`}
                >
                  {s.icon}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-semibold tracking-wide bg-black dark:bg-white text-white dark:text-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-lg">
                    {s.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Project Category Columns */}
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {projectSections.map((section) => (
                <div key={section.label}>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/35 mb-5">
                    {section.label}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.slug}>
                        <a
                          href={`https://gyanprakash.vercel.app/projects/${item.slug}`}
                          target="_blank"
                          className="group inline-flex items-center gap-1.5 text-sm text-black/55 dark:text-white/55 hover:text-black dark:hover:text-white transition-colors duration-150 font-medium"
                        >
                          {item.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-black/6 dark:border-white/6">
          <p className="text-xs text-black/35 dark:text-white/35">
            © 2026 Gyana Prakash Khandual. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-black/35 dark:text-white/35">
            <span>Built with</span>
            <span>Lots of Love for Music</span>
            <Heart className="w-3 h-3 ml-1 text-black fill-black" />
          </div>
          <div className="flex gap-5 text-xs text-black/35 dark:text-white/35">
            <a
              href="/privacy-policy"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms-and-conditions"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}