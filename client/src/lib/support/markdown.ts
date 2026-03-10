import { marked } from "marked";
import DOMPurify from "dompurify";

// Configure marked for a clean, predictable output.
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function markdownToSafeHtml(markdown: string): string {
  const html = marked.parse(markdown) as string;
  // DOMPurify runs in the browser; Vite will only execute this client-side.
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}

type Frontmatter = Record<string, string>;

export function parseFrontmatter(raw: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n")) {
    return { frontmatter: {}, body: raw };
  }

  const end = trimmed.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontmatter: {}, body: raw };
  }

  const fmText = trimmed.slice(4, end);
  const body = trimmed.slice(end + "\n---\n".length);

  const frontmatter: Frontmatter = {};
  for (const line of fmText.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)\s*$/);
    if (!m) continue;
    const [, key, value] = m;
    frontmatter[key] = value.replace(/^"|"$/g, "");
  }

  return { frontmatter, body };
}
