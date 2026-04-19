"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { blogs } from "./data/Blogs";

const tagStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  emerald:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'Outfit', sans-serif; }
        .font-code { font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="font-body max-w-4xl mx-auto px-5 pt-20 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="font-code text-[11px] uppercase tracking-widest text-zinc-400 mb-4">
            Developer guides
          </p>
          <h1 className="font-display text-5xl text-black dark:text-white leading-[1.1] mb-4">
            Package <em>Guides</em>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light max-w-lg leading-relaxed">
            In-depth guides for open-source packages. Drop-in documentation with
            working examples.
          </p>
        </motion.div>

        <div className="space-y-4">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1 + 0.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 hover:shadow-sm bg-white dark:bg-zinc-950">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`font-code text-[11px] border px-2.5 py-1 rounded-full uppercase tracking-wider ${tagStyles[blog.tagColor]}`}
                        >
                          {blog.tag}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
                          <Calendar size={11} />
                          {blog.date}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
                          <Clock size={11} />
                          {blog.readTime}
                        </span>
                      </div>

                      <h2 className="font-display text-3xl text-black dark:text-white mb-3 leading-tight">
                        {blog.title}
                      </h2>

                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 max-w-xl">
                        {blog.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <User size={11} className="text-zinc-500" />
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {blog.author}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-black dark:group-hover:border-white group-hover:bg-black dark:group-hover:bg-white transition-all duration-200">
                        <ArrowRight
                          size={14}
                          className="text-zinc-400 group-hover:text-white dark:group-hover:text-black duration-200 group-hover:translate-x-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
