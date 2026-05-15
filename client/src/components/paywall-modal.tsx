import { Camera, Wrench, Zap, X, ShieldCheck, Coffee, Library } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { isIOS, isNative } from "@/lib/platform";
import { purchaseProMonthly, restorePurchases } from "@/lib/native-purchases";
import { restoreWebPro } from "@/lib/web-pro-restore";
import { getPaywallArm, type PaywallArm } from "@/lib/ab-test";
import { trackPaywallView, trackPremiumUpgradeClick } from "@/lib/analytics";

interface PaywallModalProps {
  onUpgrade: () => void;
  onDismiss: () => void;
  repairsUsed?: number;
  maxRepairs?: number;
}

/**
 * Paywall copy variants — paywall_copy_v1 experiment (target window 2026-05-25 -> 2026-06-01).
 *
 * 'control' renders the original copy. 'A' and 'B' are the two test arms.
 *
 * See: My Handyman/paywall-copy-ab-test-design.md for hypothesis + read framework.
 */
type CopyVariant = {
  headline: string;
  sub: (repairsUsed: number) => string;
  cta: string;
  bullets: { icon: React.ComponentType<{ className?: string }>; iconBg: string; iconColor: string; title: string; sub: string }[];
};

const VARIANTS: Record<PaywallArm, CopyVariant> = {
  control: {
    headline: "Unlimited repairs. $9.99/month.",
    sub: (n) => `You've used your ${n} free repairs. Go Pro to keep fixing.`,
    cta: "Start Pro",
    bullets: [
      { icon: Camera, iconBg: "bg-[#2FA3A0]/10", iconColor: "text-[#2FA3A0]", title: "Unlimited photo diagnoses", sub: "Snap as many photos as you need" },
      { icon: Wrench, iconBg: "bg-[#1F4E79]/10", iconColor: "text-[#1F4E79]", title: "Full repair guides with audio", sub: "Hands-free step-by-step guidance" },
      { icon: Zap, iconBg: "bg-[#2FA3A0]/10", iconColor: "text-[#2FA3A0]", title: "Priority AI analysis", sub: "Faster, more accurate diagnoses" },
    ],
  },
  // Arm A — Premium-feature framing.
  // Hypothesis: users convert on differentiation (features competitors don't have).
  A: {
    headline: "Unlock Pro features. $9.99/month.",
    sub: (n) => `You've used your ${n} free repairs. Pro unlocks the full toolkit.`,
    cta: "Unlock Pro",
    bullets: [
      { icon: Wrench, iconBg: "bg-[#1F4E79]/10", iconColor: "text-[#1F4E79]", title: "Audio mode — hands-free repairs", sub: "Listen to the steps while you work" },
      { icon: ShieldCheck, iconBg: "bg-[#2FA3A0]/10", iconColor: "text-[#2FA3A0]", title: "Florida-specific guides", sub: "Hurricane prep, humidity, pool, salt-air" },
      { icon: Camera, iconBg: "bg-[#2FA3A0]/10", iconColor: "text-[#2FA3A0]", title: "Materials lists with every guide", sub: "Exact parts, sizes, and where to buy" },
    ],
  },
  // Arm B — Volume-value framing.
  // Hypothesis: users convert on price anchor ("less than a coffee") + library scale.
  B: {
    headline: "35 expert repair guides. $9.99/month.",
    sub: () => "Less than a coffee a month. Cancel anytime.",
    cta: "Get Unlimited Access",
    bullets: [
      { icon: Library, iconBg: "bg-[#1F4E79]/10", iconColor: "text-[#1F4E79]", title: "35+ repair guides", sub: "Plumbing, electrical, HVAC, appliances, safety" },
      { icon: Camera, iconBg: "bg-[#2FA3A0]/10", iconColor: "text-[#2FA3A0]", title: "Unlimited AI diagnoses", sub: "Photo or text — as many as you need" },
      { icon: Coffee, iconBg: "bg-[#2FA3A0]/10", iconColor: "text-[#2FA3A0]", title: "Less than $0.34 per day", sub: "One repair pays for the whole year" },
    ],
  },
};

export function PaywallModal({ onUpgrade, onDismiss, repairsUsed = 3, maxRepairs = 3 }: PaywallModalProps) {
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [webRestoring, setWebRestoring] = useState(false);
  const [webRestoreMsg, setWebRestoreMsg] = useState<string | null>(null);
  const useNativeIap = isNative && isIOS;

  // Resolve the A/B arm ONCE per modal mount. getPaywallArm() handles
  // feature-flag gating + cookie persistence — returns 'control' when off.
  const arm = useMemo<PaywallArm>(() => getPaywallArm(), []);
  const variant = VARIANTS[arm];

  // Fire paywall_view exactly once per mount with the resolved arm.
  useEffect(() => {
    trackPaywallView(arm);
  }, [arm]);

  async function handleWebRestore() {
    // Tiny prompt-based UX for v1.0.0 — keeps the band-aid surface small.
    // Replace with a proper modal if/when we move to the v1.0.1 server-side
    // RevenueCat customer-ID mapping.
    const email = typeof window !== "undefined"
      ? window.prompt("Enter the email you used at checkout on myhandyman.ai:")
      : null;
    if (!email) return;

    setWebRestoring(true);
    setWebRestoreMsg(null);
    try {
      const result = await restoreWebPro(email);
      if (result.ok) {
        setWebRestoreMsg("Web Pro restored. Reloading…");
        // Reload so every query (usage, user) re-runs against the new userId.
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 600);
        onUpgrade();
      } else if (result.reason === "invalid_email") {
        setWebRestoreMsg("That doesn't look like a valid email. Try again.");
      } else if (result.reason === "not_found") {
        setWebRestoreMsg("No Pro subscription found for that email.");
      } else {
        setWebRestoreMsg("Restore failed. Check your connection and try again.");
      }
    } finally {
      setWebRestoring(false);
    }
  }

  async function handleUpgrade() {
    // Tag the upgrade_click with the resolved arm so GA4 can compute
    // arm-level paywall_view -> upgrade_click conversion.
    trackPremiumUpgradeClick(arm);

    if (useNativeIap) {
      setLoading(true);
      try {
        const purchased = await purchaseProMonthly();
        if (purchased) {
          onUpgrade();
        }
      } finally {
        setLoading(false);
      }
      return;
    }
    // Web path — continue to Stripe via the existing onUpgrade handler.
    onUpgrade();
  }

  async function handleRestore() {
    setRestoring(true);
    try {
      const restored = await restorePurchases();
      if (restored) {
        onUpgrade();
      }
    } finally {
      setRestoring(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onDismiss}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Close button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4F7FA] flex items-center justify-center text-[#6E7A86] hover:text-[#1B2430] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1F4E79] via-[#2FA3A0] to-[#3BBFBC]" />

        <div className="px-8 pt-8 pb-10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#2FA3A0]/10 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-[#2FA3A0]" />
          </div>

          {/* Headline (variant-driven) */}
          <h2 className="font-display text-2xl font-bold text-[#1B2430] text-center mb-2">
            {variant.headline}
          </h2>
          <p className="text-[#6E7A86] text-sm text-center mb-8">
            {variant.sub(repairsUsed)}
          </p>

          {/* Benefits (variant-driven) */}
          <div className="space-y-4 mb-8">
            {variant.bullets.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${b.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${b.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1B2430]">{b.title}</p>
                    <p className="text-xs text-[#6E7A86]">{b.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA (variant-driven label) */}
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full h-14 rounded-xl bg-[#2FA3A0] text-white font-semibold text-base hover:bg-[#238785] disabled:opacity-60 transition-colors shadow-sm mb-3"
          >
            {loading ? "Processing…" : variant.cta}
          </button>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="w-full text-center text-sm text-[#6E7A86] hover:text-[#1B2430] transition-colors py-2"
          >
            Maybe later
          </button>

          {/* Apple requires Restore Purchases to be visible in-app */}
          {useNativeIap && (
            <button
              onClick={handleRestore}
              disabled={restoring}
              className="w-full text-center text-xs text-[#6E7A86] hover:text-[#1B2430] transition-colors mt-2 underline-offset-2 hover:underline"
            >
              {restoring ? "Restoring…" : "Restore purchases"}
            </button>
          )}

          {/* Web<->iOS recovery for users who paid via Stripe on the web.
              Hidden on web (where Stripe handles billing natively). */}
          {useNativeIap && (
            <button
              onClick={handleWebRestore}
              disabled={webRestoring}
              className="w-full text-center text-xs text-[#6E7A86] hover:text-[#1B2430] transition-colors mt-1 underline-offset-2 hover:underline"
            >
              {webRestoring ? "Checking…" : "Already subscribed on the web?"}
            </button>
          )}
          {useNativeIap && webRestoreMsg && (
            <p className="text-[11px] text-[#6E7A86] text-center mt-2">{webRestoreMsg}</p>
          )}

          {/* Apple requires auto-renew disclosure near the purchase button */}
          {useNativeIap && (
            <p className="text-[10px] text-[#6E7A86] text-center mt-4 leading-relaxed">
              Subscription auto-renews monthly until cancelled. Cancel anytime in your Apple ID settings. Payment will be charged to your Apple ID account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
