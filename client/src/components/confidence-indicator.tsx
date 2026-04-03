import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

interface ConfidenceIndicatorProps {
  confidence: string | null;
  confidenceReason?: string | null;
  size?: "sm" | "md";
  showReason?: boolean;
}

const CONFIDENCE_CONFIG = {
  high: {
    label: "High Confidence",
    shortLabel: "High",
    icon: ShieldCheck,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    dot: "bg-green-500",
  },
  medium: {
    label: "Medium Confidence",
    shortLabel: "Medium",
    icon: ShieldAlert,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    dot: "bg-yellow-500",
  },
  low: {
    label: "Low Confidence",
    shortLabel: "Low",
    icon: ShieldQuestion,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-400",
  },
} as const;

export function ConfidenceIndicator({ confidence, confidenceReason, size = "md", showReason = false }: ConfidenceIndicatorProps) {
  const level = (confidence?.toLowerCase() as keyof typeof CONFIDENCE_CONFIG) || "medium";
  const config = CONFIDENCE_CONFIG[level] || CONFIDENCE_CONFIG.medium;
  const Icon = config.icon;

  if (size === "sm") {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.color} ${config.border} border`}>
        <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {config.shortLabel}
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 rounded-xl p-4 ${config.bg} ${config.border} border`}>
      <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
      <div>
        <p className={`text-sm font-semibold ${config.color}`}>
          {config.label} Diagnosis
        </p>
        {showReason && confidenceReason && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {confidenceReason}
          </p>
        )}
        {level === "low" && (
          <p className="text-xs text-muted-foreground mt-1">
            We recommend verifying this diagnosis. Try uploading a clearer, closer photo for better results.
          </p>
        )}
      </div>
    </div>
  );
}
