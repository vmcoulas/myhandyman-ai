import { useState } from "react";
import { Camera, Wrench, ShieldCheck, ChevronRight } from "lucide-react";
import { setItemWithCache } from "@/lib/native-storage";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Camera,
      iconBg: "bg-[#2FA3A0]",
      headline: "Snap it. Know what's wrong.",
      subtext: "Take a photo of any home repair issue and get an instant AI diagnosis.",
    },
    {
      icon: Wrench,
      iconBg: "bg-[#1F4E79]",
      headline: "Step-by-step repair guidance.",
      subtext: "Tools, materials, time estimates, and clear instructions. DIY or call a pro — we'll tell you.",
    },
    {
      icon: ShieldCheck,
      iconBg: "bg-[#2FA3A0]",
      headline: "Fix with confidence.",
      subtext: "Join homeowners who save hundreds by knowing what to do first.",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    // Write to both localStorage (sync) and native Preferences (persistent)
    setItemWithCache("myhandyman_onboarded", "true");
    onComplete();
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col">
      {/* Skip button */}
      {!isLastSlide && (
        <div className="flex justify-end p-4">
          <button
            onClick={handleComplete}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1"
          >
            Skip
          </button>
        </div>
      )}
      {isLastSlide && <div className="h-12" />}

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-12">
        {/* Icon */}
        <div
          className={`${slide.iconBg} w-28 h-28 rounded-full flex items-center justify-center mb-10 shadow-lg`}
        >
          <Icon className="w-14 h-14 text-white" strokeWidth={1.5} />
        </div>

        {/* Headline */}
        <h2 className="font-display text-3xl font-bold text-[#1B2430] text-center mb-4 leading-tight max-w-xs">
          {slide.headline}
        </h2>

        {/* Subtext */}
        <p className="text-[#6E7A86] text-base text-center max-w-sm leading-relaxed">
          {slide.subtext}
        </p>
      </div>

      {/* Bottom section */}
      <div className="px-8 pb-12">
        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2.5 bg-[#2FA3A0]"
                  : "w-2.5 h-2.5 bg-[#D8E0E8]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        {isLastSlide ? (
          <button
            onClick={handleComplete}
            className="w-full h-14 rounded-xl bg-[#2FA3A0] text-white font-semibold text-base hover:bg-[#238785] transition-colors shadow-sm"
          >
            Get Started
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full h-14 rounded-xl bg-[#2FA3A0] text-white font-semibold text-base hover:bg-[#238785] transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
