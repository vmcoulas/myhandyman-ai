import { VerticalLanding, type VerticalConfig } from "@/components/verticals/vertical-landing";

const CONFIG: VerticalConfig = {
  vertical: "older-home",
  pageTitle: "Older Home Repair Guide (Pre-2000) — MyHandyman.ai",
  metaDescription:
    "Repair guides for homes built before 2000. Galvanized pipes, original wiring, settled foundations, dried-out caulk, old-school fixtures — diagnosed from a photo with the AI, then fixed step-by-step.",
  pretitle: "Pre-2000 homes",
  h1: "Repair guides for older homes",
  subhead:
    "Pre-2000 homes break in patterns the new-construction guides miss — galvanized pipes corroding from the inside, original wiring without GFCI, settled foundations binding doors, and 30-year-old caulk that crumbles when you touch it. These guides actually account for what's behind your walls.",
  valueProps: [
    {
      title: "Knows what's behind the wall",
      body: "Galvanized vs PEX, knob-and-tube vs Romex, lath-and-plaster vs drywall — the AI diagnoses based on era, not assumption.",
    },
    {
      title: "Repair, don't replace",
      body: "Most older fixtures (cast iron tubs, original tile, solid wood doors) are worth saving. We'll tell you when to repair and when replacement is genuinely the only path.",
    },
    {
      title: "Know when to call a pro",
      body: "Older homes have failure modes (asbestos, lead, structural settle) where DIY isn't safe. We name those explicitly.",
    },
  ],
  featuredSlugs: [
    "fix-water-heater-no-hot-water",
    "reset-gfci-outlet",
    "fix-leaky-pipe-under-sink",
    "fix-wobbly-ceiling-fan",
    "patch-large-hole-drywall",
    "replace-light-switch",
    "recaulk-bathtub",
    "fix-toilet-leaking-at-base",
    "fix-dripping-kitchen-faucet",
    "fix-sticking-door",
    "install-smart-thermostat",
  ],
  closing: {
    heading: "What's actually different in a pre-2000 home",
    body:
      "Galvanized pipes (homes ~1900–1980) corrode from the inside out. Restricted water pressure isn't a fixture problem — it's a pipe problem, and the only real fix is repipe.\n\nKnob-and-tube wiring (homes ~1880–1940) and ungrounded 2-prong outlets (homes pre-1970) need a licensed electrician for any meaningful upgrade. Insurance carriers may decline coverage if you have either.\n\nOriginal cast-iron drain stacks last 75–100 years. If your home is approaching that, slow drains are a system-level signal, not a P-trap problem.\n\nFoundation settling causes door binding, sticking windows, and drywall cracks. Cosmetic fixes work — but document the cracks with dated photos so you can tell if they're growing.\n\nLead paint in homes pre-1978 is real. Don't sand or scrape it without lead-safe certification.",
  },
  accentFrom: "from-[#1F4E79]",
  accentTo: "to-[#1F4E79]",
};

export default function OlderHomeRepair() {
  return <VerticalLanding config={CONFIG} />;
}
