type HeroBackdropProps = {
  imageSrc: string;
  alt?: string;
  showPegboard?: boolean;
};

/**
 * Option C hero backdrop: real image hook + blur + overlays.
 * Keep this component aria-hidden so it never competes with content.
 */
export function HeroBackdrop({
  imageSrc,
  alt = "",
  showPegboard = true,
}: HeroBackdropProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Image layer (hook) */}
      <img
        src={imageSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-[position:52%_28%] sm:object-[position:52%_24%] lg:object-[position:50%_18%] opacity-85 blur-[6px] scale-[1.05] saturate-[1.05] contrast-[1.06] brightness-[0.96]"
        loading="eager"
      />

      {/* Warm workshop tint + subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_30%_15%,rgba(31,78,121,0.15),transparent_60%),radial-gradient(1000px_700px_at_70%_30%,rgba(47,163,160,0.08),transparent_62%)]" />

      {/* Content readability scrim (keep photo visible, especially on mobile) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,247,250,0.55),rgba(244,247,250,0.90))]" />

      {/* Extra spotlight behind the headline for AA contrast without flattening the whole photo */}
      <div className="absolute inset-0 bg-[radial-gradient(640px_420px_at_50%_10%,rgba(244,247,250,0.60),transparent_70%)]" />

      {/* Craft layer: subtle pegboard dots (optional) */}
      {showPegboard && (
        <div
          className="absolute inset-0 opacity-30 [mask-image:linear-gradient(180deg,black,transparent_70%)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(31,78,121,0.05) 1px, transparent 1.6px)",
            backgroundSize: "18px 18px",
          }}
        />
      )}
    </div>
  );
}
