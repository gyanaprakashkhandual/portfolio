/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Tag,
  CheckCircle2,
  Lightbulb,
  Clock,
  Star,
  AlertTriangle,
  BookOpen,
  Rocket,
  Users,
  Code2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Contributor {
  name: string;
  role: string;
  githubProfile: string;
  linkedinProfile: string;
  email: string;
}

interface Project {
  projectName: string;
  projectSlug: string;
  projectDescription: string;
  projectType: string;
  projectTags: string[];
  projectTechnologies: string[];
  projectBackendRepository: string;
  projectFrontendRepository: string;
  projectLiveDemo: string;
  projectImage: string[];
  projectOverview: string;
  projectKeyFeatures: string;
  projectFeatures: string[];
  projectTimeLine: string;
  projectStandOutFeatures: string;
  projectChallenges: string;
  projectLessonsLearned: string;
  projectFuturePlans: string;
  projectContributors: Contributor[];
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

function Section({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

function BulletList({ content }: { content: string }) {
  const lines = content.split("\n").filter(Boolean);
  return (
    <ul className="space-y-2">
      {lines.map((line, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          <CheckCircle2
            className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0"
            strokeWidth={2}
          />
          {line}
        </li>
      ))}
    </ul>
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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3 ${i === 0 || i === 5 ? "lg:col-span-2" : ""}`}
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

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);
    setProject(null);

    fetch("/Projects.data.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        return r.json();
      })
      .then((data: Project[]) => {
        const found = data.find((p) => p.projectSlug === slug);
        if (!found) throw new Error(`Project "${slug}" not found.`);
        setProject(found);
      })
      .catch((e) => {
        setError(e.message ?? "Failed to load project.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <PageSkeleton />;

  if (error || !project)
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
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
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

      {project.projectImage?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ImageCarousel images={project.projectImage} />
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
              {project.projectType}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              {project.projectName}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.projectDescription}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <a
              href={project.projectLiveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              Live Demo
            </a>
            <a
              href={project.projectFrontendRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
            >
              <Github className="w-3.5 h-3.5" strokeWidth={1.8} />
              Frontend
            </a>
            <a
              href={project.projectBackendRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
            >
              <Code2 className="w-3.5 h-3.5" strokeWidth={1.8} />
              Backend
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-1.5">
          {project.projectTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
            >
              <Tag className="w-2.5 h-2.5" strokeWidth={2} />
              {tag}
            </span>
          ))}
          {project.projectTechnologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-900 dark:border-white font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <BookOpen
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              strokeWidth={1.8}
            />
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
              Overview
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {project.projectOverview}
          </p>
        </motion.div>

        <Section
          icon={<CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />}
          title="Features"
          delay={0.15}
        >
          <ul className="space-y-2">
            {project.projectFeatures.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          icon={<Star className="w-4 h-4" strokeWidth={1.8} />}
          title="Key Features"
          delay={0.2}
        >
          <BulletList content={project.projectKeyFeatures} />
        </Section>

        <Section
          icon={<Lightbulb className="w-4 h-4" strokeWidth={1.8} />}
          title="What Makes It Stand Out"
          delay={0.25}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.projectStandOutFeatures}
          </p>
        </Section>

        <Section
          icon={<Clock className="w-4 h-4" strokeWidth={1.8} />}
          title="Timeline"
          delay={0.3}
        >
          <div className="space-y-3">
            {project.projectTimeLine
              .split("\n")
              .filter(Boolean)
              .map((phase, i, arr) => {
                const [title, ...rest] = phase.split(" - ");
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mt-1 shrink-0" />
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">
                        {title}
                      </p>
                      {rest.length > 0 && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {rest.join(" - ")}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </Section>

        <Section
          icon={<AlertTriangle className="w-4 h-4" strokeWidth={1.8} />}
          title="Challenges"
          delay={0.35}
        >
          <BulletList content={project.projectChallenges} />
        </Section>

        <Section
          icon={<BookOpen className="w-4 h-4" strokeWidth={1.8} />}
          title="Lessons Learned"
          delay={0.4}
        >
          <BulletList content={project.projectLessonsLearned} />
        </Section>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Rocket
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              strokeWidth={1.8}
            />
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
              Future Plans
            </h3>
          </div>
          <BulletList content={project.projectFuturePlans} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Users
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              strokeWidth={1.8}
            />
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
              Contributors
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.projectContributors.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white border border-gray-900 dark:border-white flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-white dark:text-gray-900">
                    {c.name[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {c.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                    {c.role}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={c.githubProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={c.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
