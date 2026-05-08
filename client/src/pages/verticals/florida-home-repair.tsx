import { VerticalLanding, type VerticalConfig } from "@/components/verticals/vertical-landing";

const CONFIG: VerticalConfig = {
  vertical: "florida",
  pageTitle: "Florida Home Repair Guides — MyHandyman.ai",
  metaDescription:
    "DIY home repair guides built for South Florida — humidity, salt air, hurricane prep, and pool decks. AI diagnosis from a photo plus step-by-step fixes for every climate-driven failure.",
  pretitle: "South Florida edition",
  h1: "Home repair guides for South Florida homes",
  subhead:
    "Humidity, salt air, hard water, and storm season break things in ways the rest of the country never sees. These are the fixes our climate actually demands — diagnosed by AI in 30 seconds, then walked through step by step.",
  valueProps: [
    {
      title: "Built for the climate",
      body: "Mildew vs mold, hard water, salt corrosion, and pre-storm fixes — all called out where it matters.",
    },
    {
      title: "AI diagnosis from a photo",
      body: "Snap the problem, get the most likely cause + the exact materials to grab.",
    },
    {
      title: "Save the trip charge",
      body: "Most repairs here are 30 min and under $25 in materials. The trip charge alone is $75–150.",
    },
  ],
  featuredSlugs: [
    "recaulk-bathtub",
    "fix-low-water-pressure-shower",
    "fix-refrigerator-not-cooling",
    "fix-ice-maker-not-making-ice",
    "install-smart-thermostat",
    "fix-water-heater-no-hot-water",
    "fix-toilet-leaking-at-base",
    "fix-dryer-not-heating",
    "mount-tv-on-wall",
  ],
  closing: {
    heading: "Why South Florida homes break differently",
    body:
      "Year-round humidity above 70% kills caulk seals in 12–18 months instead of 5–7 years. Hard water from municipal supply mineralizes shower heads and ice makers faster. Salt air corrodes outdoor electrical and HVAC contacts even 5 miles inland. And storm prep means knowing which fixes to do BEFORE June 1, not when the cone is already over Miami-Dade.\n\nWe built MyHandyman in South Florida because the existing repair guides on the internet are written for Iowa.",
  },
  accentFrom: "from-[#1F4E79]",
  accentTo: "to-[#2FA3A0]",
};

export default function FloridaHomeRepair() {
  return <VerticalLanding config={CONFIG} />;
}
