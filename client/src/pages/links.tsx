import { useEffect } from "react";
import { Wrench, Camera, Droplets, ChevronRight, ClipboardList, DollarSign, Sun, Flame } from "lucide-react";

/**
 * Link-in-bio landing page for Instagram (@my_handyman.ai).
 * Standalone — renders outside AppShell so there's no header/footer/tab bar.
 * Matches brand: navy (#0B1A2B) bg, teal (#14B8A6) accents.
 */

/**
 * Appends canonical Instagram bio UTM params so GA4 attributes every outbound
 * click from /links to its specific button. utm_source=instagram persists
 * first-touch attribution; utm_campaign distinguishes which tile was clicked.
 */
function bioLink(url: string, campaign: string): string {
  const params = new URLSearchParams({
    utm_source: "instagram",
    utm_medium: "linkinbio",
    utm_campaign: campaign,
  });
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${params.toString()}`;
}

export default function LinksPage() {
  useEffect(() => {
    document.title = "MyHandyman — AI Home Repair Assistant";
  }, []);
  return (
    <div className="min-h-dvh flex flex-col items-center px-5 py-10 pb-16" style={{ background: "#0B1A2B" }}>
      <div className="w-full max-w-[420px] flex flex-col items-center">

        {/* Profile */}
        <div className="text-center mb-8">
          <div
            className="w-[88px] h-[88px] rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg, #14B8A6, #0D9488)",
              boxShadow: "0 4px 24px rgba(20, 184, 166, 0.3)",
            }}
          >
            <Wrench className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">MyHandyman</h1>
          <p className="text-[15px] text-white/70 leading-relaxed max-w-[300px] mx-auto mt-1.5">
            Snap a photo of what's broken. Get step-by-step repair guidance instantly.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="w-full flex flex-col gap-3 mb-9">
          <LinkButton
            href={bioLink("https://myhandyman.ai", "try-free")}
            primary
            icon={<Camera className="w-5 h-5" />}
            label="Try MyHandyman Free"
            sublabel="Upload a photo and get your repair guide"
          />
        </div>

        {/* Popular Guides */}
        <SectionLabel>Popular Repair Guides</SectionLabel>
        <div className="w-full flex flex-col gap-3 mb-9">
          <LinkButton
            href={bioLink("https://myhandyman.ai/repairs/fix-running-toilet", "popular-running-toilet")}
            icon={<Droplets className="w-5 h-5" />}
            iconColor="teal"
            label="Fix a Running Toilet"
            sublabel="Usually a $4 flapper — takes 10 minutes"
          />
          <LinkButton
            href={bioLink("https://myhandyman.ai/repairs/fix-leaky-faucet", "popular-leaky-faucet")}
            icon={<Droplets className="w-5 h-5" />}
            iconColor="blue"
            label="Fix a Leaky Faucet"
            sublabel="Stop the drip before it costs you"
          />
          <LinkButton
            href={bioLink("https://myhandyman.ai/repairs/fix-refrigerator-not-cooling", "popular-fridge-cooling")}
            icon={<Flame className="w-5 h-5" />}
            iconColor="amber"
            label="Fix a Fridge Not Cooling"
            sublabel="Clean the coils first — fixes 50-70% of cases"
          />
          <LinkButton
            href={bioLink("https://myhandyman.ai/repairs/fix-wobbly-ceiling-fan", "popular-wobbly-fan")}
            icon={<Sun className="w-5 h-5" />}
            iconColor="purple"
            label="Fix a Wobbly Ceiling Fan"
            sublabel="Balance it yourself in under 15 minutes"
          />
        </div>

        {/* More */}
        <SectionLabel>More</SectionLabel>
        <div className="w-full flex flex-col gap-3 mb-9">
          <LinkButton
            href={bioLink("https://myhandyman.ai/repairs", "browse-all")}
            icon={<ClipboardList className="w-5 h-5" />}
            iconColor="teal"
            label="Browse All Repair Guides"
            sublabel="30+ step-by-step guides and counting"
          />
          <LinkButton
            href={bioLink("https://myhandyman.ai/pricing", "pro-upgrade")}
            icon={<DollarSign className="w-5 h-5" />}
            iconColor="amber"
            label="Go Pro — $9.99/mo"
            sublabel="Unlimited AI diagnoses + priority support"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-auto pt-5">
          <p className="text-[13px] text-white/35">Home repair, made simpler.</p>
          <p className="text-[13px] mt-1">
            <a href={bioLink("https://myhandyman.ai", "footer")} className="text-teal-400 hover:underline font-medium">
              myhandyman.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

const iconColorMap: Record<string, string> = {
  teal: "rgba(20, 184, 166, 0.15)",
  blue: "rgba(59, 130, 246, 0.15)",
  amber: "rgba(245, 158, 11, 0.15)",
  purple: "rgba(139, 92, 246, 0.15)",
};

const iconTextColorMap: Record<string, string> = {
  teal: "#14B8A6",
  blue: "#3B82F6",
  amber: "#F59E0B",
  purple: "#8B5CF6",
};

function LinkButton({
  href,
  icon,
  iconColor,
  label,
  sublabel,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  iconColor?: string;
  label: string;
  sublabel: string;
  primary?: boolean;
}) {
  const baseClasses =
    "flex items-center gap-3.5 w-full px-5 py-4 rounded-[14px] text-white no-underline text-[15px] font-medium transition-all duration-200 cursor-pointer";

  if (primary) {
    return (
      <a
        href={href}
        className={baseClasses}
        style={{
          background: "linear-gradient(135deg, #14B8A6, #0D9488)",
          boxShadow: "0 4px 20px rgba(20, 184, 166, 0.3)",
        }}
      >
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <span className="block font-semibold">{label}</span>
          <span className="block text-[13px] text-white/75 font-normal">{sublabel}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={baseClasses}
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
        style={{
          background: iconColorMap[iconColor || "teal"],
          color: iconTextColorMap[iconColor || "teal"],
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <span className="block font-semibold">{label}</span>
        <span className="block text-[13px] text-white/50 font-normal">{sublabel}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white/35 mb-1 mt-2 self-start">
      {children}
    </span>
  );
}
