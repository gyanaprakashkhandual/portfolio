"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FolderOpen,
  ExternalLink,
  Github,
  ArrowRight,
  Tag,
} from "lucide-react";

interface ProjectMeta {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  technologies: string[];
  liveDemo: string;
  repositoryFrontend: string;
  description: string;
  overview: string;
}

interface Props {
  project: ProjectMeta;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => router.push(`/projects/${project.slug}`)}
      className="group cursor-pointer rounded-2xl flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200 overflow-hidden"
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <FolderOpen
                className="w-4 h-4 text-gray-400 dark:text-gray-600 shrink-0"
                strokeWidth={1.8}
              />
              <span className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
                {project.type}
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors truncate">
              {project.title}
            </h2>
          </div>
          <ArrowRight
            className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1"
            strokeWidth={1.8}
          />
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed line-clamp-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
          {project.overview.slice(0, 200)}…
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
            >
              <Tag className="w-2.5 h-2.5" strokeWidth={2} />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-900 dark:border-white"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md text-gray-400 dark:text-gray-600">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
            Live Demo
          </a>
          <a
            href={project.repositoryFrontend}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Github className="w-3.5 h-3.5" strokeWidth={1.8} />
            Repository
          </a>
        </div>
      </div>
    </motion.div>
  );
}
