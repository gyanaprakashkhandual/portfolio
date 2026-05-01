export interface Blog {
    slug: string;
    title: string;
    description: string;
    tag: string;
    tagColor: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    mdPath: string;
}

export const blogs: Blog[] = [
    {
        slug: "how-to-use-showmarkdown-package",
        title: "How to Use ShowMarkdown",
        description:
            "A React library that renders raw Markdown into beautiful UI instantly. Drop it into any React or Next.js project with zero configuration.",
        tag: "React Library",
        tagColor: "emerald",
        author: "Gyana Prakash Khandual",
        date: "Jan 15, 2024",
        readTime: "8 min read",
        image: "/images/showmarkdown-cover.png",
        mdPath: "/blogs/products/npm-packages/render.md.npm.md",
    },
    {
        slug: "how-to-use-sendenv",
        title: "How to Use Send ENV",
        description:
            "Encrypt your .env file and share it safely through git. Teammates decrypt with a shared passphrase. No third-party service required.",
        tag: "CLI Tool",
        tagColor: "blue",
        author: "Gyana Prakash Khandual",
        date: "Feb 10, 2024",
        readTime: "12 min read",
        image: "/images/sendenv-cover.png",
        mdPath: "/blogs/products/npm-packages/encrypt.env.npm.md",
    },
];

export function getBlogBySlug(slug: string): Blog | undefined {
    return blogs.find((b) => b.slug === slug);
}