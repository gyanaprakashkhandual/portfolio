import { Metadata } from "next";
import { getProjectBySlug, projects } from "../script/Projects";
import ProjectDetailPage from "../pages/Project.detail.page";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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

function page() {
  return (
    <div>
      <ProjectDetailPage />
    </div>
  );
}

export default page;
