"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { blogs } from "../data/Blogs";

const tagStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-8">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={13} className="text-zinc-400" />
          <p className="font-code text-[11px] uppercase tracking-widest text-zinc-400">
            All guides
          </p>
        </div>

        <div className="space-y-2">
          {blogs.map((blog, i) => {
            const isActive = pathname === `/blogs/${blog.slug}`;
            return (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <div
                    className={`group rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "border-black dark:border-white bg-black dark:bg-white"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`font-code text-[10px] px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                            : tagStyles[blog.tagColor]
                        }`}
                      >
                        {blog.tag}
                      </span>
                    </div>

                    <p
                      className={`text-sm font-medium leading-snug mb-1.5 font-display ${
                        isActive
                          ? "text-white dark:text-black"
                          : "text-black dark:text-white"
                      }`}
                    >
                      {blog.title}
                    </p>

                    <p
                      className={`text-[11px] leading-relaxed line-clamp-2 mb-3 ${
                        isActive
                          ? "text-white/70 dark:text-black/70"
                          : "text-zinc-500 dark:text-zinc-500"
                      }`}
                    >
                      {blog.description}
                    </p>

                    <div
                      className={`flex items-center gap-1 font-code text-[10px] ${
                        isActive
                          ? "text-white/60 dark:text-black/60"
                          : "text-zinc-400"
                      }`}
                    >
                      <Clock size={10} />
                      {blog.readTime}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
          <Link
            href="/blogs"
            className="font-code text-[11px] text-zinc-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest"
          >
            ← All guides
          </Link>
        </div>
      </div>
    </aside>
  );
}
