import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { getRepairBySlug, getAmazonLink, REPAIRS } from "@/content/repairs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, ShoppingCart, ExternalLink, AlertTriangle, Shield, ArrowLeft, Camera, ChevronRight } from "lucide-react";

export default function RepairDetail() {
  const { slug } = useParams<{ slug: string }>();
  const repair = getRepairBySlug(slug || "");

  useEffect(() => {
    if (repair) {
      document.title = `${repair.title} — MyHandyman.ai`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", repair.metaDescription);
    }
  }, [repair]);

  if (!repair) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Repair Guide Not Found</h1>
        <Link href="/repairs">
          <Button variant="outline"><ArrowLeft className="size-4 mr-2" /> Back to All Repairs</Button>
        </Link>
      </div>
    );
  }

  const related = repair.relatedRepairs
    .map((s) => REPAIRS.find((r) => r.slug === s))
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/repairs" className="hover:text-foreground">Repairs</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{repair.title}</span>
      </nav>

      {/* Hero */}
      <div className="mb-8">
        <div className="text-5xl mb-4">{repair.heroEmoji}</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] tracking-tight mb-4">{repair.title}</h1>
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge className={
            repair.difficulty === "Easy" ? "bg-green-100 text-green-700 border-green-200" :
            repair.difficulty === "Medium" ? "bg-amber-100 text-amber-700 border-amber-200" :
            "bg-red-100 text-red-700 border-red-200"
          }>
            {repair.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="size-3" /> {repair.activeTime} min active · {repair.totalTime} min total
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <DollarSign className="size-3" /> {repair.estimatedCost}
          </Badge>
          <Badge className={
            repair.safetyLevel === "DIY-friendly" ? "bg-green-100 text-green-700 border-green-200" :
            repair.safetyLevel === "Advanced repair" ? "bg-amber-100 text-amber-700 border-amber-200" :
            "bg-red-100 text-red-700 border-red-200"
          }>
            <Shield className="size-3 mr-1" /> {repair.safetyLevel}
          </Badge>
        </div>
      </div>

      {/* Overview */}
      <section className="mb-8">
        {repair.overview.split("\n\n").map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{p}</p>
        ))}
      </section>

      {/* Tools & Materials */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[#1F4E79] mb-4">What You Need</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border p-4">
            <h3 className="text-sm font-semibold mb-3">🔧 Tools</h3>
            <ul className="space-y-1.5">
              {repair.toolsNeeded.map((tool, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-[#2FA3A0] mt-1">•</span> {tool}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="text-sm font-semibold mb-3">🛒 Materials</h3>
            <ul className="space-y-2">
              {repair.materialsNeeded.map((mat, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm">{mat.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{mat.estimatedCost}</span>
                  </div>
                  <a
                    href={getAmazonLink(mat.amazonSearch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-[#2FA3A0] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#2FA3A0]/90 transition-colors shrink-0"
                  >
                    <ShoppingCart className="size-3" /> Buy <ExternalLink className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[#1F4E79] mb-4">Step-by-Step Instructions</h2>
        <div className="space-y-4">
          {repair.steps.map((step, i) => (
            <div key={i} className="rounded-xl border p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1F4E79] text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-[#1F4E79] mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {step.safetyWarning && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
                      <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{step.safetyWarning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* When to Call a Pro */}
      <section className="mb-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="size-5" /> When to Call a Professional
          </h2>
          <p className="text-sm text-amber-900">{repair.whenToCallPro}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-8">
        <div className="rounded-xl bg-[#1F4E79] p-6 text-center text-white">
          <h2 className="text-lg font-bold mb-2">Have This Issue?</h2>
          <p className="text-sm text-white/70 mb-4">Upload a photo for a personalized repair guide tailored to your exact situation.</p>
          <Link href="/build">
            <Button className="bg-[#2FA3A0] hover:bg-[#2FA3A0]/90 text-white font-semibold">
              <Camera className="size-4 mr-2" /> Upload a Photo — Get Your Fix
            </Button>
          </Link>
        </div>
      </section>

      {/* Related Repairs */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[#1F4E79] mb-4">Related Repairs</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {related.map((r) => r && (
              <Link key={r.slug} href={`/repairs/${r.slug}`}>
                <div className="rounded-xl border p-4 hover:shadow-md hover:border-[#2FA3A0]/40 transition-all cursor-pointer">
                  <div className="text-2xl mb-2">{r.heroEmoji}</div>
                  <h3 className="text-sm font-semibold">{r.title}</h3>
                  <span className="text-xs text-muted-foreground">{r.activeTime} min · {r.estimatedCost}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Affiliate Disclosure */}
      <div className="mt-10 text-center">
        <p className="text-[10px] text-muted-foreground">
          MyHandyman.ai is a participant in the Amazon Services LLC Associates Program. We may earn a commission on qualifying purchases.
        </p>
      </div>
    </div>
  );
}
