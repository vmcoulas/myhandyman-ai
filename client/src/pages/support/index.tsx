import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { getAllSupportArticles, getSupportCategories } from "@/lib/support/content";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function SupportLanding() {
  useEffect(() => {
    document.title = "Support | SnapBuilder.ai";
  }, []);

  const articles = useMemo(() => getAllSupportArticles(), []);
  const categories = useMemo(() => getSupportCategories(), []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q)
      );
    });
  }, [articles, category, query]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Support</h1>
        <p className="mt-2 text-muted-foreground">
          Quick, practical guides for common DIY build steps.
        </p>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Search</label>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “leveling”, “drill bit”, “measure”…"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((a) => (
          <Link key={a.slug} href={`/support/${a.slug}`} className="group">
            <Card className="h-full p-5 transition-colors hover:bg-muted/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-foreground group-hover:underline">
                    {a.title}
                  </h2>
                  {a.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                  )}
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {a.category}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">
          No matches. Try a different search term.
        </p>
      )}

      <div className="mt-10 text-xs text-muted-foreground">
        <p>
          Want a new article? Use the feedback button in the footer and tell us what you got stuck on.
        </p>
      </div>
    </div>
  );
}
