import { useEffect } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import { REPAIRS } from "@/content/repairs";
import { trackVerticalView } from "@/lib/analytics";

export type VerticalConfig = {
  /** GA4 segmentation key — also used as the trackVerticalView arg. */
  vertical: "florida" | "renter" | "older-home";
  /** <title> + og:title for SEO. */
  pageTitle: string;
  /** Document meta description string. */
  metaDescription: string;
  /** H1 hero headline. */
  h1: string;
  /** Hero subhead. Plain text, 1–2 sentences max. */
  subhead: string;
  /** Hero badge / pretitle (e.g., "South Florida edition"). */
  pretitle: string;
  /** 3 short value props rendered as a row under the hero. */
  valueProps: { title: string; body: string }[];
  /** Slugs from client/src/content/repairs.ts to feature, in display order. */
  featuredSlugs: string[];
  /** Closing block — quick cohort-specific FAQ-ish content. */
  closing: { heading: string; body: string };
  /** Brand accent gradient stop colors (Tailwind). */
  accentFrom: string; // e.g. "from-[#1F4E79]"
  accentTo: string;   // e.g. "to-[#2FA3A0]"
};

export function VerticalLanding({ config }: { config: VerticalConfig }) {
  useEffect(() => {
    document.title = config.pageTitle;
    // Sync meta description.
    const existing = document.querySelector('meta[name="description"]');
    if (existing) {
      existing.setAttribute("content", config.metaDescription);
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = config.metaDescription;
      document.head.appendChild(m);
    }
    // Fire GA4 vertical_view event in addition to the auto page_view fired by
    // App.tsx — gives us a dedicated event for segmentation.
    trackVerticalView(config.vertical);
  }, [config.vertical, config.pageTitle, config.metaDescription]);

  // Resolve featured repairs from the central REPAIRS array. Skip slugs that
  // don't exist (defensive — content can be reorganized over time).
  const featured = config.featuredSlugs
    .map((slug) => REPAIRS.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      {/* Hero */}
      <div className={`rounded-2xl bg-gradient-to-br ${config.accentFrom} ${config.accentTo} text-white p-8 sm:p-10 mb-10`}>
        <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide uppercase mb-4">
          {config.pretitle}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">{config.h1}</h1>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl">{config.subhead}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/build">
            <Button size="lg" className="bg-white text-[#1F4E79] hover:bg-white/90">
              Diagnose with AI <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
          <Link href="/repairs">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Browse all 35 guides
            </Button>
          </Link>
        </div>
      </div>

      {/* Value props */}
      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {config.valueProps.map((vp) => (
          <div key={vp.title} className="rounded-xl border bg-white p-5">
            <h3 className="text-sm font-bold text-[#1F4E79] mb-1">{vp.title}</h3>
            <p className="text-sm text-muted-foreground">{vp.body}</p>
          </div>
        ))}
      </div>

      {/* Featured repairs */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1F4E79] mb-2">
          Most-asked repairs in this category
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Hand-picked from our library based on what this audience actually needs.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((repair) => (
            <Link key={repair.slug} href={`/repairs/${repair.slug}`}>
              <div className="rounded-xl border bg-white p-5 hover:shadow-lg hover:border-[#2FA3A0]/40 transition-all cursor-pointer h-full flex flex-col">
                <div className="text-3xl mb-3">{repair.heroEmoji}</div>
                <h3 className="text-base font-bold text-[#1F4E79] mb-1">{repair.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex-grow line-clamp-2">{repair.metaDescription}</p>
                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <Badge variant="secondary" className={
                    repair.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                    repair.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }>
                    {repair.difficulty}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" /> {repair.activeTime} min
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DollarSign className="size-3" /> {repair.estimatedCost}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Closing block */}
      <div className="rounded-xl border bg-slate-50 p-6 mb-10">
        <h2 className="text-lg font-bold text-[#1F4E79] mb-2">{config.closing.heading}</h2>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{config.closing.body}</p>
      </div>

      {/* CTA footer */}
      <div className="rounded-xl border-2 border-[#2FA3A0]/30 bg-white p-6 text-center">
        <h2 className="text-xl font-bold text-[#1F4E79] mb-2">
          Not sure what's wrong? Send a photo.
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          The AI diagnoses the problem from a photo and walks you through the fix.
        </p>
        <Link href="/build">
          <Button size="lg" className="bg-[#1F4E79] text-white hover:bg-[#1F4E79]/90">
            Diagnose with AI <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
