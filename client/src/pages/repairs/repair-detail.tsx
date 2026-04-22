import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { getRepairBySlug, getAmazonLink, REPAIRS, type RepairGuide } from "@/content/repairs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, ShoppingCart, ExternalLink, AlertTriangle, Shield, ArrowLeft, Camera, ChevronRight, Wrench, Droplets, PaintBucket, Fan, Tv, Lightbulb, Cog, Thermometer, Bell, Paintbrush, RotateCcw, Flame, DoorOpen, Armchair, ShowerHead, Pipette, HelpCircle } from "lucide-react";
import { GuideFeedback } from "@/components/guide-feedback";
import { trackAffiliateClick } from "@/lib/analytics";

/** Upsert a <meta> tag by property or name attribute */
function setMetaTag(attr: "property" | "name", key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/** Reset a <meta> tag to its default value, or remove if no default */
function resetMetaTag(attr: "property" | "name", key: string, defaultValue?: string) {
  const el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (el) {
    if (defaultValue) {
      el.setAttribute("content", defaultValue);
    } else {
      el.remove();
    }
  }
}

/**
 * Auto-generate 5 universal FAQs per guide from existing repair fields.
 * Keeps content in sync with the source of truth (repairs.ts) and avoids
 * hand-authoring FAQs for every guide. The same Q&A is rendered visibly
 * on the page so the FAQPage schema is legitimate per Google guidelines.
 */
function buildFaqs(repair: RepairGuide): { question: string; answer: string }[] {
  const titleLower = repair.title.toLowerCase();
  const topTools = repair.toolsNeeded.slice(0, 4).join(", ");
  const remainingTools = repair.toolsNeeded.length > 4
    ? ` Additional tools: ${repair.toolsNeeded.slice(4).join(", ")}.`
    : "";
  const proCallout =
    repair.safetyLevel === "Professional required"
      ? `This repair is rated "Professional required" — we recommend hiring a licensed pro. ${repair.whenToCallPro}`
      : repair.difficulty === "Easy"
      ? `Yes — most homeowners can handle this themselves. It's rated ${repair.difficulty} difficulty and ${repair.safetyLevel}. ${repair.whenToCallPro}`
      : `It depends on your comfort level. This repair is rated ${repair.difficulty} difficulty and ${repair.safetyLevel}. ${repair.whenToCallPro}`;

  return [
    {
      question: `How long does it take to ${titleLower}?`,
      answer: `Plan on about ${repair.totalTime} minutes total, with roughly ${repair.activeTime} minutes of hands-on work. The rest is wait time (drying, settling, or testing).`,
    },
    {
      question: `How much does it cost to ${titleLower}?`,
      answer: `Most DIY fixes land around ${repair.estimatedCost} for parts and materials, assuming you already own the basic tools. Hiring a pro for the same job typically runs 4–10x that price depending on your area.`,
    },
    {
      question: `Should I DIY this or call a pro?`,
      answer: proCallout,
    },
    {
      question: `What tools do I need to ${titleLower}?`,
      answer: `You'll need: ${topTools}.${remainingTools} A complete tool list with Amazon links is in the "What You Need" section above.`,
    },
    {
      question: `Is it safe to ${titleLower} myself?`,
      answer: `This repair is rated "${repair.safetyLevel}". Follow each step's safety warnings — especially anything involving water shutoffs, electrical, or gas. ${repair.whenToCallPro}`,
    },
  ];
}

function buildFAQSchema(repair: RepairGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": buildFaqs(repair).map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };
}

function buildHowToSchema(repair: RepairGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": repair.title,
    "description": repair.metaDescription,
    "totalTime": `PT${repair.totalTime}M`,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": repair.estimatedCost,
    },
    "tool": repair.toolsNeeded.map((name) => ({ "@type": "HowToTool", "name": name })),
    "supply": repair.materialsNeeded.map((m) => ({ "@type": "HowToSupply", "name": m.name })),
    "step": repair.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title,
      "text": step.description,
    })),
  };
}

const REPAIR_ICONS: Record<string, React.ElementType> = {
  "fix-running-toilet": Droplets,
  "unclog-drain": Wrench,
  "fix-leaky-faucet": Droplets,
  "patch-drywall-hole": PaintBucket,
  "install-ceiling-fan": Fan,
  "mount-tv-on-wall": Tv,
  "replace-light-switch": Lightbulb,
  "fix-squeaky-door": Wrench,
  "replace-shower-head": Droplets,
  "recaulk-bathtub": Droplets,
  "fix-garbage-disposal": Cog,
  "install-smart-thermostat": Thermometer,
  "fix-doorbell": Bell,
  "paint-room": Paintbrush,
  "replace-toilet-flapper": RotateCcw,
  "fix-garbage-disposal-humming": Cog,
  "stop-toilet-running-after-flush": Droplets,
  "fix-dripping-kitchen-faucet": Droplets,
  "patch-large-hole-drywall": PaintBucket,
  "fix-water-heater-no-hot-water": Flame,
  "fix-clogged-toilet": Wrench,
  "fix-leaky-pipe-under-sink": Pipette,
  "fix-sticking-door": DoorOpen,
  "replace-toilet-seat": Armchair,
  "replace-bathroom-faucet": Droplets,
};

export default function RepairDetail() {
  const { slug } = useParams<{ slug: string }>();
  const repair = getRepairBySlug(slug || "");

  useEffect(() => {
    if (repair) {
      const pageUrl = `https://myhandyman.ai/repairs/${repair.slug}`;
      const pageTitle = `${repair.title} — MyHandyman.ai`;
      const ogImage = "https://myhandyman.ai/hero.jpg";

      // Page title & meta description
      document.title = pageTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", repair.metaDescription);

      // Open Graph tags
      setMetaTag("property", "og:title", pageTitle);
      setMetaTag("property", "og:description", repair.metaDescription);
      setMetaTag("property", "og:url", pageUrl);
      setMetaTag("property", "og:image", ogImage);
      setMetaTag("property", "og:type", "article");

      // Twitter Card tags
      setMetaTag("name", "twitter:card", "summary_large_image");
      setMetaTag("name", "twitter:title", pageTitle);
      setMetaTag("name", "twitter:description", repair.metaDescription);

      // Canonical tag for this repair page
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = pageUrl;

      // HowTo JSON-LD structured data
      const existing = document.getElementById("howto-jsonld");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "howto-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(buildHowToSchema(repair));
      document.head.appendChild(script);

      // FAQ JSON-LD structured data
      const existingFaq = document.getElementById("faq-jsonld");
      if (existingFaq) existingFaq.remove();
      const faqScript = document.createElement("script");
      faqScript.id = "faq-jsonld";
      faqScript.type = "application/ld+json";
      faqScript.text = JSON.stringify(buildFAQSchema(repair));
      document.head.appendChild(faqScript);

      return () => {
        // Reset OG tags to homepage defaults
        const defaultTitle = "MyHandyman AI — Snap a Photo. Know What's Wrong.";
        const defaultDesc = "Get repair guidance, tools and parts, time and cost estimates, and a clear DIY-vs-pro recommendation from a single photo.";
        resetMetaTag("property", "og:title", defaultTitle);
        resetMetaTag("property", "og:description", defaultDesc);
        resetMetaTag("property", "og:url", "https://myhandyman.ai/");
        resetMetaTag("property", "og:image", ogImage);
        resetMetaTag("property", "og:type", "website");
        resetMetaTag("name", "twitter:title", defaultTitle);
        resetMetaTag("name", "twitter:description", "Upload a photo, get the fix, and know whether to DIY or call a pro.");

        document.getElementById("howto-jsonld")?.remove();
        document.getElementById("faq-jsonld")?.remove();
        const canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (canon) canon.href = "https://myhandyman.ai/";
      };
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
        {(() => {
          const Icon = REPAIR_ICONS[repair.slug] || Wrench;
          return (
            <div className="w-14 h-14 rounded-xl bg-[#1F4E79]/10 flex items-center justify-center mb-4">
              <Icon className="w-7 h-7 text-[#1F4E79]" />
            </div>
          );
        })()}
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
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5"><Wrench className="size-4 text-[#1F4E79]" /> Tools</h3>
            <ul className="space-y-1.5">
              {repair.toolsNeeded.map((tool, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-[#2FA3A0] mt-1">•</span> {tool}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5"><ShoppingCart className="size-4 text-[#2FA3A0]" /> Materials</h3>
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
                    onClick={() => trackAffiliateClick(`repair:${repair.slug}`, mat.name, mat.amazonSearch)}
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

      {/* Inline Guide Feedback */}
      <div className="mt-8 mb-8">
        <GuideFeedback />
      </div>

      {/* FAQ — visible Q&A that mirrors the FAQPage JSON-LD above */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[#1F4E79] mb-4 flex items-center gap-2">
          <HelpCircle className="size-5" /> Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {buildFaqs(repair).map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border p-4 open:bg-muted/30 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-[#1F4E79]">{faq.question}</h3>
                <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{faq.answer}</p>
            </details>
          ))}
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
                  {(() => {
                    const RIcon = REPAIR_ICONS[r.slug] || Wrench;
                    return (
                      <div className="w-10 h-10 rounded-lg bg-[#1F4E79]/10 flex items-center justify-center mb-2">
                        <RIcon className="w-5 h-5 text-[#1F4E79]" />
                      </div>
                    );
                  })()}
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
