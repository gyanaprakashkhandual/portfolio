/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Tag,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Code2,
} from "lucide-react";
import { MessageParser } from "@/app/message-parser/core/Parser.core";

interface ProjectMeta {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  technologies: string[];
  liveDemo: string;
  repositoryFrontend: string;
  repositoryBackend: string;
  images: string[];
  description: string;
}

function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, unknown> = {};
  const yamlBlock = match[1];
  const body = match[2].trim();

  let currentKey = "";
  let inArray = false;
  const arrayBuffer: string[] = [];

  for (const line of yamlBlock.split("\n")) {
    const arrayItem = line.match(/^\s{2}-\s+(.+)/);
    const keyValue = line.match(/^([a-zA-Z0-9_]+):\s*(.*)/);

    if (arrayItem && inArray) {
      arrayBuffer.push(arrayItem[1].trim());
    } else if (keyValue) {
      if (inArray && currentKey) {
        meta[currentKey] = [...arrayBuffer];
        arrayBuffer.length = 0;
        inArray = false;
      }
      currentKey = keyValue[1];
      const val = keyValue[2].trim();
      if (val === "") {
        inArray = true;
      } else {
        meta[currentKey] = val;
        inArray = false;
      }
    }
  }

  if (inArray && currentKey) meta[currentKey] = [...arrayBuffer];

  return { meta, body };
}

function extractDescription(body: string): string {
  const lines = body.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) return trimmed;
  }
  return "";
}

function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 aspect-video mb-5">
      <img
        src={images[current]}
        alt={`Project screenshot ${current + 1}`}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
          <div className="absolute top-3 right-3 text-[11px] font-medium text-white bg-black/50 px-2 py-0.5 rounded-lg">
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse ${className}`}
    />
  );
}

function PageSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-5">
      <SkeletonBlock className="h-5 w-28" />
      <SkeletonBlock className="h-56 w-full rounded-2xl" />
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-8 w-2/3" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
        <div className="flex gap-2 pt-2">
          <SkeletonBlock className="h-6 w-16 rounded-lg" />
          <SkeletonBlock className="h-6 w-20 rounded-lg" />
          <SkeletonBlock className="h-6 w-14 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3"
          >
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-5/6" />
            <SkeletonBlock className="h-3 w-4/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [meta, setMeta] = useState<ProjectMeta | null>(null);
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);
    setMeta(null);
    setBody("");

    fetch(`/projects/${slug}.md`)
      .then((r) => {
        if (!r.ok) throw new Error(`Project "${slug}" not found.`);
        return r.text();
      })
      .then((raw) => {
        const { meta: parsed, body: content } = parseFrontmatter(raw);

        setMeta({
          slug: (parsed.slug as string) ?? (slug as string),
          title: (parsed.title as string) ?? "",
          type: (parsed.type as string) ?? "",
          tags: (parsed.tags as string[]) ?? [],
          technologies: (parsed.technologies as string[]) ?? [],
          liveDemo: (parsed.liveDemo as string) ?? "",
          repositoryFrontend: (parsed.repositoryFrontend as string) ?? "",
          repositoryBackend: (parsed.repositoryBackend as string) ?? "",
          images: (parsed.images as string[]) ?? [],
          description: extractDescription(content),
        });

        setBody(content);
      })
      .catch((e) => setError(e.message ?? "Failed to load project."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageSkeleton />;

  if (error || !meta)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 flex items-center justify-center">
          <AlertTriangle
            className="w-5 h-5 text-red-500 dark:text-red-400"
            strokeWidth={1.8}
          />
        </div>
        <div className="text-center max-w-sm">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
            {error ?? "Project not found."}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">
            Could not load{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-[11px]">
              {slug}
            </code>
          </p>
        </div>
        <button
          onClick={() => router.push("/projects")}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
          Back to projects
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6 lg:p-8 pb-0">
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.push("/projects")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            strokeWidth={1.8}
          />
          All Projects
        </motion.button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-3 leading-tight tracking-tight">
            {meta.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            {meta.description}
          </p>
          <div className="flex flex-wrap items-start gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Type</p>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {meta.type}
              </span>
            </div>
            {meta.tags && meta.tags.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {meta.technologies && meta.technologies.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {meta.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center text-xs px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {meta.technologies.length > 5 && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      +{meta.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 pt-0">
        {meta.images?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ImageCarousel images={meta.images} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium mb-1.5">
              {meta.type}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              {meta.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {meta.description}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            {meta.liveDemo && (
              <a
                href={meta.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                Live Demo
              </a>
            )}
            {meta.repositoryFrontend && (
              <a
                href={meta.repositoryFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" strokeWidth={1.8} />
                Frontend
              </a>
            )}
            {meta.repositoryBackend && (
              <a
                href={meta.repositoryBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <Code2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                Backend
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
            >
              <Tag className="w-2.5 h-2.5" strokeWidth={2} />
              {tag}
            </span>
          ))}
          {meta.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-900 dark:border-white font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
      >
        <div
          className="prose prose-sm dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-2xl prose-h1:text-gray-900 dark:prose-h1:text-white prose-h1:mb-4
          prose-h2:text-base prose-h2:text-gray-900 dark:prose-h2:text-white prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-gray-800
          prose-h3:text-sm prose-h3:text-gray-700 dark:prose-h3:text-gray-300 prose-h3:mt-5 prose-h3:mb-2
          prose-p:text-sm prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
          prose-ul:space-y-1.5 prose-li:text-sm prose-li:text-gray-600 dark:prose-li:text-gray-400
          prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
          prose-code:text-xs prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-gray-700 dark:prose-code:text-gray-300
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-hr:border-gray-100 dark:prose-hr:border-gray-800"
        >
          <MessageParser content={body} />
        </div>
      </motion.div>
      </div>
    </div>
  );
}
