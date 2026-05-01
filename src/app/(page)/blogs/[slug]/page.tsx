import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogs, getBlogBySlug } from "../script/Blogs";
import BlogContent from "../components/Blog.content";
import { Calendar, User, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto py-12 px-2">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-3 leading-tight tracking-tight">
            {blog.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            {blog.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>
      <BlogContent mdPath={blog.mdPath} />
    </div>
  );
}
