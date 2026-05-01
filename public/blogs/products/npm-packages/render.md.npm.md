---
slug: how-to-use-showmarkdown-package
title: How to Use ShowMarkdown
description: A React library that renders raw Markdown into beautiful UI instantly. Drop it into any React or Next.js project with zero configuration.
tag: React Library
tagColor: emerald
author: Gyana Prakash Khandual
date: 2024-01-15
readTime: 8 min read
image: /images/showmarkdown-cover.png
npm: https://www.npmjs.com/package/showmarkdown
github: https://github.com/gyanaprakashkhandual/markdown
---

# How to Use ShowMarkdown

A **React library** that turns raw Markdown into beautiful UI instantly. Drop it into any React or Next.js project — no parsing logic needed.

## Installation

Install the package via npm:

```bash
npm install showmarkdown
```

Or run it once without installing:

```bash
npx showmarkdown
```

## Usage

Pass any raw Markdown string to the `content` prop. The component handles the rest.

```tsx
import Markdown from "showmarkdown";
import content from "./README.md?raw";

export default function App() {
  return <Markdown content={content} />;
}
```

## Props

The component accepts a single required prop:

| Prop    | Type   | Required | Description                   |
| ------- | ------ | -------- | ----------------------------- |
| content | string | Yes      | Raw Markdown string to render |

## Features

ShowMarkdown supports all standard Markdown elements out of the box.

### Headings

H1 through H6 with clean visual hierarchy — no additional styling required.

### Lists

Both ordered and unordered lists are fully supported with proper nesting.

### Code Blocks

Syntax highlighted code blocks for all major languages.

```tsx
function Hello() {
  return <h1>Hello World</h1>;
}
```

### Blockquotes

> Styled callouts that stand out from body text. Drop it in. It just works.

### Tables

Full GitHub Flavored Markdown table support.

| Element     | Supported |
| ----------- | --------- |
| Headings    | Yes       |
| Tables      | Yes       |
| Code        | Yes       |
| Blockquotes | Yes       |
| Lists       | Yes       |

### TypeScript

Full type definitions are included. No `@types` package needed.

## Compatibility

ShowMarkdown works with the following environments:

- React 19
- Next.js 14 and above
- TypeScript projects

## Development

Clone the repository and run locally:

```bash
git clone https://github.com/gyanaprakashkhandual/markdown.git
cd markdown
npm install
npm run dev
```

To build the library:

```bash
npm run build
```

## Contributing

Contributions are welcome. Read `CONTRIBUTING.md` before opening a pull request. Fork the repository, create a feature branch, and submit a pull request with a clear description of the change.

## License

MIT License. Built by Gyana Prakash Khandual.
