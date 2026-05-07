"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { blogs } from "../script/Blogs";

const tagStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  emerald:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
};

const tagDotStyles: Record<string, string> = {
  blue: "bg-blue-400 dark:bg-blue-500",
  emerald: "bg-emerald-400 dark:bg-emerald-500",
};

export default function BlogsPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-5 pt-20 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h1 className="text-5xl font-semibold text-black dark:text-white leading-[1.1] mb-4 tracking-tight">
            Package{" "}
            <span className="italic font-light text-zinc-400 dark:text-zinc-500">
              Guides
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light max-w-lg leading-relaxed">
            In-depth guides for open-source packages. Drop-in documentation with
            working examples.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08 + 0.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                <div className="relative border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 bg-white dark:bg-zinc-950 h-full flex flex-col">
                  <motion.div
                    className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
                    aria-hidden
                  />

                  <div className="relative flex flex-col gap-4 p-5 flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] border px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium flex items-center gap-1.5 ${tagStyles[blog.tagColor]}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${tagDotStyles[blog.tagColor]}`}
                        />
                        {blog.tag}
                      </span>

                      <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-black dark:group-hover:border-white group-hover:bg-black dark:group-hover:bg-white transition-all duration-200">
                        <ArrowRight
                          size={12}
                          className="text-zinc-400 group-hover:text-white dark:group-hover:text-black transition-all duration-200 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-base font-semibold text-black dark:text-white mb-2 leading-snug tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                        {blog.title}
                      </h2>

                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {blog.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <User size={10} className="text-zinc-400" />
                        </div>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate max-w-30">
                          {blog.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
                          <Calendar size={10} />
                          {blog.date}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
                          <Clock size={10} />
                          {blog.readTime}
                        </span>
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
