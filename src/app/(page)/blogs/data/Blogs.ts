export interface Blog {
    mdPath: string;
    slug: string;
    title: string;
    description: string;
    tag: string;
    tagColor: string;
    date: string;
    readTime: string;
    author: string;
}

export const blogs: Blog[] = [
    {
        slug: "how-to-use-showmarkdown-package",
        title: "Show Markdown",
        description:
            "A React library that renders raw Markdown content into a clean, beautiful UI. Drop it into any React or Next.js project without writing a single line of parsing logic.",
        tag: "Library",
        tagColor: "blue",
        date: "Apr 19, 2026",
        readTime: "4 min read",
        author: "Gyana Prakash Khandual",
    },
    {
        slug: "how-to-use-sendenv",
        title: "sendenv",
        description:
            "Encrypt your .env file and share it safely through git. Teammates decrypt it locally with a shared passphrase. No third-party service. No secrets in Slack.",
        tag: "Security",
        tagColor: "emerald",
        date: "Apr 19, 2026",
        readTime: "6 min read",
        author: "Gyana Prakash Khandual",
    },
];

export function getBlogBySlug(slug: string): Blog | undefined {
    return blogs.find((b) => b.slug === slug);
}