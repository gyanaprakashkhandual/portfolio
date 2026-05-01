import { notFound } from "next/navigation";
import { blogs, getBlogBySlug } from "../script/Blogs";
import BlogContent from "../components/Blog.content";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogContent mdPath={blog.mdPath} />;
}
