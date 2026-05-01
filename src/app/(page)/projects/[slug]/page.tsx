import { Metadata } from "next";
import ProjectDetailPage from "../pages/Project.detail.page";

const PROJECT_SLUGS = ["caffetest", "resolution-pro"];

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const meta: Record<string, unknown> = {};
  const yamlBlock = match[1];

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

  return meta;
}

function extractDescription(raw: string): string {
  const body = raw.replace(/^---[\s\S]*?---\n?/, "").trim();
  const lines = body.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) return trimmed;
  }
  return "";
}

async function getProjectMeta(slug: string) {
  try {
    const res = await fetch(
      `${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000"}/projects/${slug}.md`
    );
    if (!res.ok) return null;
    const raw = await res.text();
    const meta = parseFrontmatter(raw);

    return {
      slug: (meta.slug as string) ?? slug,
      title: (meta.title as string) ?? "Project",
      description: extractDescription(raw),
      type: (meta.type as string) ?? "",
      tags: (meta.tags as string[]) ?? [],
    };
  } catch (error) {
    console.error(`Failed to load project metadata for ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectMeta(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

function page() {
  return (
    <div>
      <ProjectDetailPage />
    </div>
  );
}

export default page;
