/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { MessageParser } from "@/app/message-parser/core/Parser.core";

interface Props {
  mdPath: string;
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse ${className}`} />
  );
}

function PageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-16 space-y-5 px-2">
      <SkeletonBlock className="h-8 w-2/3" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-5/6" />
      <SkeletonBlock className="h-4 w-4/6" />
      <SkeletonBlock className="h-32 w-full rounded-xl mt-6" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-3/4" />
    </div>
  );
}

export default function BlogContent({ mdPath }: Props) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(mdPath)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load content.`);
        return r.text();
      })
      .then((raw) => {
        const body = raw.replace(/^---[\s\S]*?---\n?/, "").trim();
        setContent(body);
      })
      .catch((e) => setError(e.message ?? "Failed to load content."))
      .finally(() => setLoading(false));
  }, [mdPath]);

  if (loading) return <PageSkeleton />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" strokeWidth={1.8} />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{error}</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="prose prose-zinc dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h1:text-black dark:prose-h1:text-white prose-h1:mb-6 prose-h1:mt-0
        prose-h2:text-xl prose-h2:text-black dark:prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800
        prose-h3:text-base prose-h3:text-zinc-800 dark:prose-h3:text-zinc-200 prose-h3:mt-6 prose-h3:mb-2
        prose-p:text-sm prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
        prose-ul:space-y-1.5 prose-li:text-sm prose-li:text-zinc-600 dark:prose-li:text-zinc-400
        prose-strong:text-black dark:prose-strong:text-white prose-strong:font-semibold
        prose-code:text-xs prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-zinc-800 dark:prose-code:text-zinc-200 prose-code:font-mono
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700/60 prose-pre:rounded-xl prose-pre:text-zinc-200
        prose-blockquote:border-l-2 prose-blockquote:border-emerald-400 prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400 prose-blockquote:not-italic
        prose-table:text-sm prose-th:text-zinc-500 prose-th:font-medium prose-td:text-zinc-600 dark:prose-td:text-zinc-400
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-hr:border-zinc-100 dark:prose-hr:border-zinc-800"
      >
        <MessageParser content={content} />
      </div>
    </div>
  );
}