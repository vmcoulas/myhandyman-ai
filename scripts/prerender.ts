/**
 * scripts/prerender.ts
 *
 * Post-build script: generates static HTML for every repair guide route so
 * that Google (and other crawlers) can index the content without JavaScript.
 *
 * Vercel serves static files before applying rewrites, so placing
 * dist/public/repairs/<slug>/index.html means crawlers get full HTML while
 * real users still get the SPA experience once JS loads.
 *
 * Run:  tsx scripts/prerender.ts
 * (called automatically from "build:frontend" in package.json)
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Import repair data directly — no browser APIs, pure TypeScript data.
import { REPAIRS } from "../client/src/content/repairs.js";

const __filename = fileURLToPath(import.meta.url);
const __dir = dirname(__filename);
const ROOT = join(__dir, "..");
const DIST = join(ROOT, "dist/public");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildJsonLd(repair: (typeof REPAIRS)[0]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: repair.title,
    description: repair.metaDescription,
    totalTime: `PT${repair.totalTime}M`,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: repair.estimatedCost,
    },
    tool: repair.toolsNeeded.map((name) => ({ "@type": "HowToTool", name })),
    supply: repair.materialsNeeded.map((m) => ({
      "@type": "HowToSupply",
      name: m.name,
    })),
    step: repair.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };
  return JSON.stringify(schema);
}

/** Minimal but semantically rich body content for crawlers.
 *  React will replace this on client load — it just needs to be indexable. */
function buildBodyContent(repair: (typeof REPAIRS)[0]): string {
  const stepItems = repair.steps
    .map(
      (step, i) =>
        `<li><strong>${escapeHtml(step.title)}</strong>: ${escapeHtml(step.description)}</li>`,
    )
    .join("\n");

  const toolItems = repair.toolsNeeded
    .map((t) => `<li>${escapeHtml(t)}</li>`)
    .join("\n");

  const materialItems = repair.materialsNeeded
    .map((m) => `<li>${escapeHtml(m.name)} — ${escapeHtml(m.estimatedCost)}</li>`)
    .join("\n");

  const relatedLinks = repair.relatedRepairs
    .map(
      (slug) =>
        `<li><a href="/repairs/${escapeHtml(slug)}">${escapeHtml(slug.replace(/-/g, " "))}</a></li>`,
    )
    .join("\n");

  return `<div id="root" data-prerendered="true">
  <nav aria-label="breadcrumb">
    <a href="/">Home</a> &rsaquo;
    <a href="/repairs">Repairs</a> &rsaquo;
    <span>${escapeHtml(repair.title)}</span>
  </nav>

  <article>
    <h1>${escapeHtml(repair.title)}</h1>
    <p><strong>Difficulty:</strong> ${escapeHtml(repair.difficulty)} &bull;
       <strong>Time:</strong> ${repair.activeTime} min active, ${repair.totalTime} min total &bull;
       <strong>Estimated cost:</strong> ${escapeHtml(repair.estimatedCost)} &bull;
       <strong>Safety:</strong> ${escapeHtml(repair.safetyLevel)}</p>

    <section>
      <h2>Overview</h2>
      ${repair.overview
        .split("\n\n")
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join("\n")}
    </section>

    <section>
      <h2>Tools Needed</h2>
      <ul>${toolItems}</ul>
    </section>

    <section>
      <h2>Materials Needed</h2>
      <ul>${materialItems}</ul>
    </section>

    <section>
      <h2>Step-by-Step Instructions</h2>
      <ol>${stepItems}</ol>
    </section>

    <section>
      <h2>When to Call a Professional</h2>
      <p>${escapeHtml(repair.whenToCallPro)}</p>
    </section>
${
  relatedLinks
    ? `    <section>
      <h2>Related Repairs</h2>
      <ul>${relatedLinks}</ul>
    </section>`
    : ""
}
  </article>

  <section>
    <h2>Have This Issue?</h2>
    <p>Upload a photo for a personalized repair guide tailored to your exact situation.</p>
    <a href="/build">Upload a Photo — Get Your Fix</a>
  </section>
</div>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const template = readFileSync(join(DIST, "index.html"), "utf-8");

const seen = new Set<string>();
let generated = 0;

for (const repair of REPAIRS) {
  if (seen.has(repair.slug)) continue;
  seen.add(repair.slug);

  const pageUrl = `https://myhandyman.ai/repairs/${repair.slug}`;
  const pageTitle = `${repair.title} — MyHandyman.ai`;
  const ogImage = "https://myhandyman.ai/hero.jpg";
  const jsonLd = buildJsonLd(repair);
  const bodyContent = buildBodyContent(repair);

  // Inject repair-specific tags into the template.
  // We replace specific tag patterns that we know exist in index.html.
  let html = template

    // Page title
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)

    // Meta description
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${escapeHtml(repair.metaDescription)}"`,
    )

    // OG title
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${escapeHtml(pageTitle)}"`,
    )

    // OG description
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${escapeHtml(repair.metaDescription)}"`,
    )

    // OG url
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${pageUrl}"`,
    )

    // OG type
    .replace(
      /<meta property="og:type" content="[^"]*"/,
      `<meta property="og:type" content="article"`,
    )

    // OG image (keep existing)
    // Twitter title
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${escapeHtml(pageTitle)}"`,
    )

    // Twitter description
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${escapeHtml(repair.metaDescription)}"`,
    )

    // Canonical
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${pageUrl}"`,
    )

    // Inject JSON-LD before </head>
    .replace(
      "</head>",
      `  <script type="application/ld+json">${jsonLd}</script>\n</head>`,
    )

    // Replace empty root div with prerendered content
    .replace('<div id="root"></div>', bodyContent);

  const dir = join(DIST, "repairs", repair.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
  generated++;
}

console.log(`✓ Prerendered ${generated} repair guide pages to dist/public/repairs/`);
