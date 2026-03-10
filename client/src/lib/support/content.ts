import { parseFrontmatter } from "./markdown";

export type SupportArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
};

export type SupportArticle = SupportArticleMeta & {
  markdown: string;
};

// Load all markdown files in this folder at build-time.
const modules = import.meta.glob<string>("../../content/support/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function filePathToSlug(path: string): string {
  const file = path.split("/").pop() || path;
  return file.replace(/\.md$/i, "");
}

export function getAllSupportArticles(): SupportArticleMeta[] {
  const items: SupportArticleMeta[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const slug = filePathToSlug(path);
    const { frontmatter } = parseFrontmatter(raw);

    items.push({
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || "",
      category: frontmatter.category || "General",
      order: Number(frontmatter.order || 999),
    });
  }

  return items.sort(
    (a, b) => a.order - b.order || a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
  );
}

export function getSupportArticleBySlug(slug: string): SupportArticle | null {
  // Find the module key by slug.
  for (const [path, raw] of Object.entries(modules)) {
    if (filePathToSlug(path) !== slug) continue;
    const { frontmatter, body } = parseFrontmatter(raw);
    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || "",
      category: frontmatter.category || "General",
      order: Number(frontmatter.order || 999),
      markdown: body.trim(),
    };
  }

  return null;
}

export function getSupportCategories(): string[] {
  const cats = new Set(getAllSupportArticles().map((a) => a.category));
  return Array.from(cats).sort((a, b) => a.localeCompare(b));
}
