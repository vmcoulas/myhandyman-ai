import { Camera, Wrench, Zap, X } from "lucide-react";

interface PaywallModalProps {
  onUpgrade: () => void;
  onDismiss: () => void;
  repairsUsed?: number;
  maxRepairs?: number;
}

export function PaywallModal({ onUpgrade, onDismiss, repairsUsed = 3, maxRepairs = 3 }: PaywallModalProps) {
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

          {/* Headline */}
          <h2 className="font-display text-2xl font-bold text-[#1B2430] text-center mb-2">
            Unlimited repairs. $9.99/month.
          </h2>
          <p className="text-[#6E7A86] text-sm text-center mb-8">
            You've used your {repairsUsed} free repairs. Go Pro to keep fixing.
          </p>

          {/* Benefits */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2FA3A0]/10 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-[#2FA3A0]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1B2430]">Unlimited photo diagnoses</p>
                <p className="text-xs text-[#6E7A86]">Snap as many photos as you need</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F4E79]/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-[#1F4E79]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1B2430]">Full repair guides with audio</p>
                <p className="text-xs text-[#6E7A86]">Hands-free step-by-step guidance</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2FA3A0]/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#2FA3A0]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1B2430]">Priority AI analysis</p>
                <p className="text-xs text-[#6E7A86]">Faster, more accurate diagnoses</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onUpgrade}
            className="w-full h-14 rounded-xl bg-[#2FA3A0] text-white font-semibold text-base hover:bg-[#238785] transition-colors shadow-sm mb-3"
          >
            Start Pro
          </button>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="w-full text-center text-sm text-[#6E7A86] hover:text-[#1B2430] transition-colors py-2"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
