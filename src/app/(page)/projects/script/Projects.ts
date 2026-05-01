export interface Project {
    slug: string;
    title: string;
    description: string;
    type: string;
    tags: string[];
    technologies: string[];
    status: string;
    liveDemo: string;
    repositoryFrontend: string;
    repositoryBackend: string;
    image: string;
    mdPath: string;
}

export const projects: Project[] = [
    {
        slug: "caffetest",
        title: "Caffetest",
        description:
            "A web application for automating all the manual effort in automation testing.",
        type: "Full Stack Web Application",
        tags: ["Web Development", "Automation Testing", "Full Stack"],
        technologies: [
            "React",
            "Next JS",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Tailwind CSS",
            "Cloudinary",
            "Vercel",
            "Render",
        ],
        status: "Live",
        liveDemo: "https://caffetest.vercel.app/",
        repositoryFrontend:
            "https://github.com/gyanaprakashkhandual/bugtracker-frontend",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/bugtracker-backend",
        image:
            "/images/projects/web/caffetest.png",
        mdPath: "/projects/web/private/caffetest.web.md",
    },
    {
        slug: "resolution-pro",
        title: "Resolution Pro",
        description:
            "A full stack document sharing and meeting tracking platform with AI-powered features, user management, and secure access control designed for seamless collaboration across organizations.",
        type: "Full Stack Web Application",
        tags: [
            "Web Development",
            "Document Management",
            "Collaboration Platform",
            "Full Stack",
        ],
        technologies: [
            "React",
            "Next JS",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Tailwind CSS",
            "Cloudinary",
            "Vercel",
            "Render",
        ],
        status: "Live",
        liveDemo: "https://resolutionpro.avidusinteractive.com/",
        repositoryFrontend:
            "https://github.com/gyanaprakashkhandual",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual",
        image:
            "/images/projects/web/resolution-pro.png",
        mdPath: "/projects/resolution-pro.md",
    },
    {
        slug: "mega-jewelers",
        title: "Mega Jewelers",
        description:
            "A complete e-commerce platform designed for jewelry businesses with product management, inventory tracking, secure user access, and integrated sales management.",
        type: "Full Stack Web Application",
        tags: ["E-commerce", "Web Development", "Inventory Management", "Full Stack"],
        technologies: [
            "React",
            "Next JS",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Tailwind CSS",
            "Cloudinary",
            "Vercel",
            "Render",
        ],
        status: "Live",
        liveDemo: "https://megajwleresavidusintearacive.com/",
        repositoryFrontend:
            "https://github.com/gyanaprakashkhandual",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual",
        image:
            "/images/projects/mega-jewelers.png",
        mdPath: "/projects/web/collboration/mega.jwelers.md",
    },
    {
        slug: "rr-crop",
        title: "Rr Crop",
        description:
            "A task and resource management platform designed for project allocation, workforce management, and operational tracking with integrated access control and collaboration tools.",
        type: "Full Stack Web Application",
        tags: ["Task Management", "Project Management", "Web Development", "Full Stack"],
        technologies: [
            "React",
            "Next JS",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Tailwind CSS",
            "Cloudinary",
            "Vercel",
            "Render",
        ],
        status: "Live",
        liveDemo: "https://rr-crop.vercel.app/",
        repositoryFrontend:
            "https://github.com/gyanaprakashkhandual/rr-crop-frontend",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/rr-crop-backend",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/rrcrop_dashboard.png",
        mdPath: "/projects/rr-crop.md",
    },
    {
        slug: "fetch",
        title: "Fetch",
        description:
            "A full stack web application for automated API testing with complete test integration via GitHub, synced with backend code and database.",
        type: "Full Stack Web Application",
        tags: ["Web Development", "API Testing", "GitHub Integration", "Full Stack", "Automation"],
        technologies: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "GitHub API",
            "Vercel",
        ],
        status: "Live",
        liveDemo: "https://fetch.vercel.app",
        repositoryFrontend: "",
        repositoryBackend: "",
        image: "",
        mdPath: "/projects/fetch.md",
    },
    {
        slug: "feel",
        title: "Feel",
        description:
            "A web application focused on emotional well-being and mood tracking, helping users reflect on and understand their daily feelings.",
        type: "Full Stack Web Application",
        tags: ["Web Development", "Well-being", "Mood Tracking", "Full Stack"],
        technologies: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Tailwind CSS",
            "Vercel",
        ],
        status: "Live",
        liveDemo: "http://feel.vercel.app",
        repositoryFrontend: "",
        repositoryBackend: "",
        image: "",
        mdPath: "/projects/feel.md",
    },
    {
        slug: "pisl-infra",
        title: "PISL Infra",
        description:
            "Comprehensive end-to-end testing infrastructure for the PISL web application including UI, API, performance, and security testing with advanced visualization and reporting.",
        type: "Automation & Testing Infrastructure",
        tags: [
            "Automation Testing",
            "Performance Testing",
            "API Testing",
            "Security Testing",
            "QA Engineering",
        ],
        technologies: [
            "K6",
            "Grafana",
            "Selenium",
            "Cypress",
            "Postman",
            "Burp Suite",
            "JSON",
            "HTML",
            "CSS",
            "SVG",
            "Premiere Motion",
        ],
        status: "Live",
        liveDemo: "https://pisl-performance-report.vercel.app/",
        repositoryFrontend: "",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/pisl-infra-testing",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/pisl_dashboard.png",
        mdPath: "/projects/pisl-infra.md",
    },
    {
        slug: "resolution-pro-testing",
        title: "Resolution Pro Testing",
        description:
            "Multi-layered end-to-end testing infrastructure for Resolution Pro including UI automation, API testing, performance testing, and enterprise-level QA strategy implementation.",
        type: "Automation & Testing Infrastructure",
        tags: [
            "Automation Testing",
            "QA Engineering",
            "API Testing",
            "End-to-End Testing",
            "BDD Testing",
        ],
        technologies: [
            "Playwright",
            "Cucumber",
            "BDD",
            "Rest Assured",
            "Page Object Model",
            "Google Sheets",
            "Zoho Sheets",
            "JSON",
            "Custom HTML Reports",
            "Cafetest",
            "Bug Tracker",
            "Ledge Meter",
        ],
        status: "Live",
        liveDemo: "https://resolution-pro-testing-report.vercel.app/",
        repositoryFrontend: "",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/resolution-pro-testing",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/resolution_testing_dashboard.png",
        mdPath: "/projects/resolution-pro-testing.md",
    },
    {
        slug: "mega-jewelers-testing",
        title: "Mega Jewelers Testing",
        description:
            "End-to-end testing infrastructure for MegaJewelers including UI automation, API testing, performance testing, and enterprise-grade QA strategy for a complete e-commerce platform.",
        type: "Automation & Testing Infrastructure",
        tags: [
            "Automation Testing",
            "E-commerce Testing",
            "API Testing",
            "Performance Testing",
            "QA Engineering",
        ],
        technologies: [
            "Selenium",
            "Cucumber",
            "BDD",
            "Page Object Model",
            "PyTest",
            "Artillery",
            "JSON",
            "HTML",
            "CSS",
            "JavaScript",
            "Google Sheets",
            "Zoho Sheets",
            "Zoho Workspace",
        ],
        status: "Live",
        liveDemo: "https://mega-jewelers-testing-report.vercel.app/",
        repositoryFrontend: "",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/mega-jewelers-testing",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/megajewelers_testing_dashboard.png",
        mdPath: "/projects/mega-jewelers-testing.md",
    },
    {
        slug: "rr-crop-testing",
        title: "RR Crop Testing",
        description:
            "End-to-end testing infrastructure for RrCrop including UI automation, API validation, performance testing, and workflow testing for a complex task and resource management system.",
        type: "Automation & Testing Infrastructure",
        tags: [
            "Automation Testing",
            "Task Management Testing",
            "API Testing",
            "Performance Testing",
            "QA Engineering",
        ],
        technologies: [
            "Cypress",
            "Page Object Model",
            "Cucumber",
            "BDD",
            "JMeter",
            "Postman",
            "JSON",
            "HTML",
            "CSS",
            "JavaScript",
            "Google Sheets",
            "Zoho Workspace",
        ],
        status: "Live",
        liveDemo: "https://rr-crop-testing-report.vercel.app/",
        repositoryFrontend: "",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/rr-crop-testing",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/rrcrop_testing_dashboard.png",
        mdPath: "/projects/rr-crop-testing.md",
    },
    {
        slug: "caffetest-tracker",
        title: "Caffetest Tracker",
        description:
            "A revolutionary VS Code extension that transforms test automation management by automatically capturing test execution results and syncing them with the Caffetest platform, powered by AI to generate test cases and bug reports.",
        type: "VS Code Extension / AI-Powered Test Management",
        tags: [
            "VS Code Extension",
            "Test Automation",
            "AI-Powered Testing",
            "QA Engineering",
            "Developer Tools",
        ],
        technologies: [
            "VS Code Extension API",
            "JavaScript",
            "TypeScript",
            "Selenium",
            "Cucumber",
            "JUnit",
            "TestNG",
            "Page Object Model",
            "REST API",
            "Google OAuth",
            "AI/ML Integration",
        ],
        status: "Live",
        liveDemo: "https://caffetest.com",
        repositoryFrontend: "",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/caffetest-tracker",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/caffetest_vscode.png",
        mdPath: "/projects/caffetest-tracker.md",
    },
    {
        slug: "selenium-cucumber-pro",
        title: "Selenium-Cucumber Pro",
        description:
            "A professional VS Code extension that intelligently generates Selenium Java step definitions for Cucumber BDD testing, with smart parameter detection, duplicate prevention, and complete professional code formatting.",
        type: "VS Code Extension / Code Generation Tool",
        tags: [
            "VS Code Extension",
            "Selenium",
            "Cucumber BDD",
            "Java Code Generation",
            "Test Automation",
        ],
        technologies: [
            "VS Code Extension API",
            "JavaScript",
            "TypeScript",
            "Java",
            "Selenium WebDriver",
            "Cucumber",
            "TestNG",
            "JUnit",
            "Page Object Model",
            "BDD",
        ],
        status: "Live",
        liveDemo:
            "https://marketplace.visualstudio.com/items?itemName=selenium-cucumber-pro",
        repositoryFrontend: "",
        repositoryBackend:
            "https://github.com/gyanaprakashkhandual/selenium-cucumber-pro",
        image:
            "https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/selenium_cucumber_dashboard.png",
        mdPath: "/projects/selenium-cucumber-pro.md",
    },
    {
        slug: "taar",
        title: "Taar",
        description:
            "A free Chrome extension that lives inside every text field in your browser — speak, translate, and polish your words in any language before you send.",
        type: "Chrome Extension / AI-Powered Communication Tool",
        tags: [
            "Chrome Extension",
            "Voice Input",
            "Translation",
            "AI Writing",
            "Productivity",
        ],
        technologies: [
            "Chrome Extension API",
            "JavaScript",
            "TypeScript",
            "Web Speech API",
            "AI/ML Integration",
            "Vercel",
        ],
        status: "Live",
        liveDemo: "https://taar.vercel.app",
        repositoryFrontend: "",
        repositoryBackend: "",
        image: "",
        mdPath: "/projects/taar.md",
    },
    {
        slug: "show-markdown",
        title: "ShowMarkdown",
        description:
            "An NPM package that enables React applications to render Markdown (.md) content beautifully and efficiently, providing a simple and flexible API for developers.",
        type: "NPM Package / React Library",
        tags: ["NPM Package", "React", "Markdown", "Developer Tools", "Open Source"],
        technologies: [
            "React",
            "JavaScript",
            "TypeScript",
            "Markdown",
            "NPM",
            "Rollup",
        ],
        status: "Published",
        liveDemo: "",
        repositoryFrontend: "",
        repositoryBackend: "",
        image: "",
        mdPath: "/projects/show-markdown.md",
    },
    {
        slug: "todo-mobile",
        title: "Todo Mobile",
        description:
            "A mobile application version of the Todo task management platform, providing a native and optimized experience for managing tasks on Android and iOS devices.",
        type: "Mobile Application",
        tags: [
            "Mobile Development",
            "Productivity",
            "Task Management",
            "React Native",
            "Cross-Platform",
        ],
        technologies: [
            "React Native",
            "Expo",
            "JavaScript",
            "TypeScript",
            "AsyncStorage",
            "Node.js",
        ],
        status: "In Development",
        liveDemo: "",
        repositoryFrontend: "",
        repositoryBackend: "",
        image: "",
        mdPath: "/projects/todo-mobile.md",
    },
    {
        slug: "todo-desktop",
        title: "Todo Desktop",
        description:
            "A desktop application version of the Todo task management platform, providing a powerful native experience for managing tasks on Windows, macOS, and Linux.",
        type: "Desktop Application",
        tags: [
            "Desktop Development",
            "Productivity",
            "Task Management",
            "Electron",
            "Cross-Platform",
        ],
        technologies: [
            "Electron",
            "React",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "SQLite",
        ],
        status: "In Development",
        liveDemo: "",
        repositoryFrontend: "",
        repositoryBackend: "",
        image: "",
        mdPath: "/projects/todo-desktop.md",
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}