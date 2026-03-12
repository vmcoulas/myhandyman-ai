import { useEffect, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { getAllSupportArticles, getSupportArticleBySlug } from "@/lib/support/content";
import { markdownToSafeHtml } from "@/lib/support/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SupportArticlePage() {
  const [, params] = useRoute("/support/:slug");
  const slug = params?.slug || "";

  const article = useMemo(() => getSupportArticleBySlug(slug), [slug]);

  useEffect(() => {
    document.title = article ? `${article.title} | Support | MyHandyman.ai` : "Support | MyHandyman.ai";
  }, [article]);

  const html = useMemo(() => {
    if (!article) return "";
    return markdownToSafeHtml(article.markdown);
  }, [article]);

  const related = useMemo(() => {
    if (!article) return [];
    return getAllSupportArticles()
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 4);
  }, [article]);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="mt-2 text-muted-foreground">
          Try the Support home page to browse all help articles.
        </p>
        <div className="mt-6">
          <Link href="/support">
            <Button variant="outline">Back to Support</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
          ← Support
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{article.title}</h1>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{article.category}</Badge>
          {article.description && (
            <span className="text-sm text-muted-foreground">{article.description}</span>
          )}
        </div>
      </div>

      <article
        className="prose prose-neutral dark:prose-invert max-w-none prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none"
        // Sanitized HTML output
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-sm font-semibold text-foreground">More in {article.category}</h2>
          <ul className="mt-3 grid gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/support/${r.slug}`} className="text-sm text-primary hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
