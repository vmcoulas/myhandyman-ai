import { VerticalLanding, type VerticalConfig } from "@/components/verticals/vertical-landing";

const CONFIG: VerticalConfig = {
  vertical: "renter",
  pageTitle: "Renter Home Repair Guide — MyHandyman.ai",
  metaDescription:
    "Lease-safe DIY repairs for renters. Reversible fixes that don't risk your security deposit, no power tools required, under $30 in materials. AI diagnoses the problem from a photo so you don't have to call your landlord.",
  pretitle: "For renters",
  h1: "Lease-safe repairs that protect your security deposit",
  subhead:
    "These fixes are reversible, deposit-safe, and don't require permission. Most take under 20 minutes and cost less than $20. Skip the landlord call — and skip the deduction at move-out.",
  valueProps: [
    {
      title: "Reversible only",
      body: "Every fix here can be undone if your landlord asks. No drilling into floors, no permanent modifications.",
    },
    {
      title: "No power tools",
      body: "Hand tools only. Nothing you'd need to buy or borrow that won't fit in a kitchen drawer.",
    },
    {
      title: "Under $30",
      body: "Most renters' fixes are $5–25 in materials. Not worth a maintenance ticket — just worth doing.",
    },
  ],
  featuredSlugs: [
    "fix-squeaky-door",
    "fix-sticking-door",
    "replace-shower-head",
    "patch-drywall-hole",
    "stop-toilet-running-after-flush",
    "replace-toilet-flapper",
    "unclog-drain",
    "fix-leaky-faucet",
    "reset-gfci-outlet",
    "stop-smoke-detector-chirping",
    "fix-doorbell",
    "fix-garbage-disposal",
  ],
  closing: {
    heading: "Three things every renter should know",
    body:
      "1. Document the broken state. Take a dated photo before you fix anything — if your landlord later claims you damaged it, the photo is your proof it was already broken.\n\n2. Save the receipts. Materials under $50 are usually deductible from your next month's rent in most states (check your lease). The receipts are your paper trail.\n\n3. Drywall holes from picture nails are NOT damage in most states. Holes larger than a #8 screw or holes from anchors usually are. Patch them before move-out — it's a 30-minute fix that saves $75–150 in deposit deductions.",
  },
  accentFrom: "from-[#2FA3A0]",
  accentTo: "to-[#1F4E79]",
};

export default function RenterRepairGuide() {
  return <VerticalLanding config={CONFIG} />;
}
