import { notFound } from "next/navigation";
import { getBlogBySlug } from "../data/Blogs";
import ShowMarkdownPage from "../content/package/Render.md";
import SendenvDocs from "../content/package/Send.env";

const componentMap: Record<string, React.ComponentType> = {
  "how-to-use-showmarkdown-package": ShowMarkdownPage,
  "how-to-use-sendenv": SendenvDocs,
};

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return [
    { slug: "how-to-use-showmarkdown-package" },
    { slug: "how-to-use-sendenv" },
  ];
}

export default function SlugPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  const Component = componentMap[params.slug];

  if (!blog || !Component) {
    notFound();
  }

  return <Component />;
}
