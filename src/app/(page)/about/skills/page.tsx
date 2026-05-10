"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  BookOpen,
  Briefcase,
  Clock,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Github,
  Code2,
  Server,
  Database,
  Cloud,
  FlaskConical,
  Bot,
  Shield,
  Layers,
} from "lucide-react";

interface Skill {
  skillId: string;
  skillCategory: string;
  skillName: string;
  experience: string;
  projects: string;
  docLink: string;
  githubLink: string;
  proficiency: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-3.5 h-3.5" strokeWidth={1.8} />,
  Backend: <Server className="w-3.5 h-3.5" strokeWidth={1.8} />,
  Database: <Database className="w-3.5 h-3.5" strokeWidth={1.8} />,
  "DevOps & Cloud": <Cloud className="w-3.5 h-3.5" strokeWidth={1.8} />,
  "Manual Testing": <FlaskConical className="w-3.5 h-3.5" strokeWidth={1.8} />,
  "Automation Testing": <Bot className="w-3.5 h-3.5" strokeWidth={1.8} />,
  "Ethical Hacking": <Shield className="w-3.5 h-3.5" strokeWidth={1.8} />,
  All: <Layers className="w-3.5 h-3.5" strokeWidth={1.8} />,
};

const SLUG_TO_CATEGORY: Record<string, string> = {
  all: "All",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  "devops-cloud": "DevOps & Cloud",
  "manual-testing": "Manual Testing",
  "automation-testing": "Automation Testing",
  "ethical-hacking": "Ethical Hacking",
};

type SortKey = "skillName" | "projects" | "experience" | "proficiency";
type SortDir = "asc" | "desc";

function ExperienceBadge({ exp }: { exp: string }) {
  const years = parseInt(exp);
  const color =
    years >= 5
      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
      : years >= 4
        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
        : years >= 3
          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
          : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${color}`}>
      <Clock className="w-2.5 h-2.5" strokeWidth={2} />
      {exp}
    </span>
  );
}

function ProjectsBadge({ count }: { count: string }) {
  const num = parseInt(count);
  const color =
    num >= 300
      ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
      : num >= 200
        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
        : num >= 100
          ? "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800"
          : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${color}`}>
      <Briefcase className="w-2.5 h-2.5" strokeWidth={2} />
      {count}
    </span>
  );
}

function ProficiencyBar({ value }: { value: string }) {
  const pct = parseInt(value);
  const color =
    pct >= 90
      ? "bg-emerald-500"
      : pct >= 80
        ? "bg-blue-500"
        : pct >= 70
          ? "bg-amber-500"
          : "bg-gray-400";
  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 tabular-nums w-7 text-right">
        {value}
      </span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"
            style={{ width: `${40 + i * 8}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey)
    return <ChevronUp className="w-3 h-3 text-gray-300 dark:text-gray-700" strokeWidth={2} />;
  return sortDir === "asc" ? (
    <ChevronUp className="w-3 h-3 text-gray-900 dark:text-white" strokeWidth={2} />
  ) : (
    <ChevronDown className="w-3 h-3 text-gray-900 dark:text-white" strokeWidth={2} />
  );
}

export default function SkillSlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "all";
  const categoryLabel = SLUG_TO_CATEGORY[slug] ?? "All";

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableQuery, setTableQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("skillName");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    setLoading(true);
    fetch("/skills/skill.data.json")
      .then((r) => r.json())
      .then((data: Skill[]) => {
        setAllSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTableQuery("");
    setSortKey("skillName");
    setSortDir("asc");
  }, [slug]);

  const skills =
    categoryLabel === "All"
      ? allSkills
      : allSkills.filter((s) => s.skillCategory === categoryLabel);

  const filtered = skills.filter(
    (s) =>
      !tableQuery ||
      s.skillName.toLowerCase().includes(tableQuery.toLowerCase()) ||
      s.skillCategory.toLowerCase().includes(tableQuery.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    let va: string | number = "";
    let vb: string | number = "";
    if (sortKey === "skillName") {
      va = a.skillName.toLowerCase();
      vb = b.skillName.toLowerCase();
    } else if (sortKey === "projects") {
      va = parseInt(a.projects);
      vb = parseInt(b.projects);
    } else if (sortKey === "experience") {
      va = parseInt(a.experience);
      vb = parseInt(b.experience);
    } else if (sortKey === "proficiency") {
      va = parseInt(a.proficiency);
      vb = parseInt(b.proficiency);
    }
    const cmp = va < vb ? -1 : va > vb ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  function handleSort(col: SortKey) {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(col);
      setSortDir("asc");
    }
  }

  const thBase = "px-4 py-3 text-left cursor-pointer select-none transition-colors duration-150";
  const thActive = "text-gray-900 dark:text-white";
  const thInactive = "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200";

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-white dark:bg-gray-900 overflow-hidden">
      <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center shrink-0">
            <span className="text-white dark:text-gray-900">
              {CATEGORY_ICONS[categoryLabel] ?? <Layers className="w-3.5 h-3.5" strokeWidth={1.8} />}
            </span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              {categoryLabel === "All" ? "All Skills" : categoryLabel}
            </h1>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
              {loading ? "Loading..." : `${skills.length} skill${skills.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 h-8 px-3 rounded-lg bg-gray-100 dark:bg-gray-800">
          <Search className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            value={tableQuery}
            onChange={(e) => setTableQuery(e.target.value)}
            placeholder="Search skills..."
            className="bg-transparent border-0 outline-none ring-0 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 w-48"
          />
          {tableQuery && (
            <button
              onClick={() => setTableQuery("")}
              className="shrink-0 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {[...Array(8)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 p-8">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-gray-400" strokeWidth={1.8} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                No skills found
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600">
                This category may be empty or unavailable.
              </p>
            </div>
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Search className="w-8 h-8 text-gray-300 dark:text-gray-700" strokeWidth={1.5} />
            <p className="text-sm text-gray-400 dark:text-gray-600">
              No skills match &quot;{tableQuery}&quot;
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-sm border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-950 mx-6 my-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <th className={`${thBase} ${sortKey === "skillName" ? thActive : thInactive}`} onClick={() => handleSort("skillName")}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-widest">Skill</span>
                          <SortIcon col="skillName" sortKey={sortKey} sortDir={sortDir} />
                        </div>
                      </th>
                      <th className={`${thBase} ${sortKey === "projects" ? thActive : thInactive}`} onClick={() => handleSort("projects")}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-widest">Projects</span>
                          <SortIcon col="projects" sortKey={sortKey} sortDir={sortDir} />
                        </div>
                      </th>
                      <th className={`${thBase} ${sortKey === "experience" ? thActive : thInactive}`} onClick={() => handleSort("experience")}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-widest">Experience</span>
                          <SortIcon col="experience" sortKey={sortKey} sortDir={sortDir} />
                        </div>
                      </th>
                      <th className={`${thBase} ${sortKey === "proficiency" ? thActive : thInactive}`} onClick={() => handleSort("proficiency")}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-widest">Proficiency</span>
                          <SortIcon col="proficiency" sortKey={sortKey} sortDir={sortDir} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Links
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((skill, i) => (
                      <motion.tr
                        key={skill.skillId}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.025, duration: 0.2 }}
                        className="border-b border-gray-100 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-100"
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white border border-gray-900 dark:border-white flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-bold text-white dark:text-gray-900">
                                {skill.skillName.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                              {skill.skillName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <ProjectsBadge count={skill.projects} />
                        </td>
                        <td className="px-4 py-3.5">
                          <ExperienceBadge exp={skill.experience} />
                        </td>
                        <td className="px-4 py-3.5">
                          <ProficiencyBar value={skill.proficiency} />
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 whitespace-nowrap">
                            {CATEGORY_ICONS[skill.skillCategory]}
                            {skill.skillCategory}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <a
                              href={skill.githubLink ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-gray-900 dark:hover:border-white transition-all duration-150"
                            >
                              <Github className="w-3 h-3" strokeWidth={1.8} />
                              GitHub
                            </a>
                            <a
                              href={skill.docLink ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-gray-900 dark:hover:border-white transition-all duration-150"
                            >
                              <BookOpen className="w-3 h-3" strokeWidth={1.8} />
                              Docs
                            </a>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center">
                    Showing {sorted.length} of {skills.length} skill{skills.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}