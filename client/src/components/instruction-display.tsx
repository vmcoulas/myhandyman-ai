import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  List,
  Pause,
  Play,
  Rabbit,
  Share2,
  Shield,
  Star,
  Turtle,
  Volume2,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FeedbackForm } from "./feedback-form";
import { ProjectRating } from "./project-rating";
import { useToast } from "@/hooks/use-toast";
import type { ProjectWithInstructions } from "@/lib/types";
import { useFeedbackContext } from "@/lib/feedback-context";
import { useInstructionStyle } from "@/hooks/use-instruction-style";
import { ShieldAlert, ShieldCheck, AlertTriangle, Phone } from "lucide-react";
import { useSpeechNarrator } from "@/hooks/use-speech-narrator";
import { buildAmazonAffiliateUrl } from "@shared/amazonAffiliate";
import { trackOutboundClick } from "@/lib/outboundTracking";

interface InstructionDisplayProps {
  data: ProjectWithInstructions;
  userId?: number;
}


function CompletionCard({
  title,
  onShare,
  onDownload,
}: {
  title: string;
  onShare: () => void;
  onDownload: () => void;
}) {
  const today = new Date();
  const dateString = today.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-border bg-background/80 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Certificate of completion</p>
              <h3 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                You built it.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-prose">
                {dateString} · <span className="font-medium text-foreground">{title}</span>
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                MyHandyman Certified
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button onClick={onShare} className="font-semibold">
              <Share2 className="w-4 h-4 mr-2" />
              Share your build
            </Button>
            <Button variant="outline" onClick={onDownload} className="font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download plan
            </Button>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">Before / after (optional)</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Want to celebrate it? Snap a before + after and share with your crew.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button variant="secondary" className="justify-start">
                Add “before” photo
              </Button>
              <Button variant="secondary" className="justify-start">
                Add “after” photo
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">(Coming next: saving these to your project.)</p>
          </div>
        </div>

        <div className="h-2 w-full bg-gradient-to-r from-primary/70 via-primary to-accent/70" />
      </div>
    </div>
  );
}


export function InstructionDisplay({ data, userId }: InstructionDisplayProps) {
  const { project, instructions } = data;
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { patchContext } = useFeedbackContext();
  const { style, setStyle } = useInstructionStyle();
  const narrator = useSpeechNarrator();
  const [speechRate, setSpeechRate] = useState<1 | 1.25 | 1.5>(1);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [handsFreeMode, setHandsFreeMode] = useState(false);

  const nextStep = () => {
    if (currentStep < instructions.length - 1) setCurrentStep((s) => s + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  useEffect(() => {
    patchContext({ projectId: project.id, stepNumber: instructions[currentStep]?.stepNumber });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, currentStep]);

  const difficultyColor =
    project.difficulty?.toLowerCase() === "easy" ||
    project.difficulty?.toLowerCase() === "beginner"
      ? "bg-green-500/15 text-green-600 border-0"
      : project.difficulty?.toLowerCase() === "medium" ||
          project.difficulty?.toLowerCase() === "intermediate"
        ? "bg-yellow-500/20 text-yellow-700 border-0"
        : "bg-red-500/15 text-red-600 border-0";

  const handleExport = async () => {
    try {
      const exportText = [
        project.title,
        "=".repeat(project.title.length),
        "",
        project.description || "",
        "",
        `Difficulty: ${project.difficulty}`,
        `Estimated Time: ${project.estimatedTime} minutes`,
        project.estimatedCost ? `Estimated Cost: $${project.estimatedCost}` : "",
        "",
        "Materials:",
        project.materials
          .map(
            (m) =>
              `  • ${m.name} (${m.quantity}) — $${typeof m.estimatedCost === "number" ? m.estimatedCost.toFixed(2) : m.estimatedCost}`,
          )
          .join("\n"),
        "",
        "Tools:",
        project.tools.map((t) => `  • ${t}`).join("\n"),
        "",
        project.safetyNotes ? `Safety Notes:\n  ⚠️ ${project.safetyNotes}` : "",
        "",
        "Step-by-Step Instructions:",
        "=".repeat(28),
        ...instructions.map((inst) =>
          [
            "",
            `Step ${inst.stepNumber}: ${inst.title}`,
            "-".repeat(inst.title.length + 10),
            inst.description,
            inst.safetyWarning ? `⚠️ Safety Warning: ${inst.safetyWarning}` : "",
            inst.adultSupervision ? "👷 Adult supervision recommended for this step." : "",
          ]
            .filter(Boolean)
            .join("\n"),
        ),
        "",
        "— Generated by MyHandyman AI —",
      ]
        .filter((l) => l !== undefined)
        .join("\n");

      const blob = new Blob([exportText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.title.replace(/[^a-zA-Z0-9]/g, "_")}_build_plan.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Repair Plan Downloaded!", description: "Your instructions are saved." });
    } catch {
      toast({ title: "Export Failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/project/${project.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: `Check out this DIY repair guide: ${project.title}`,
          url: shareUrl,
        });
      } catch {
        await navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link Copied!", description: "Share this build with your crew." });
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link Copied!", description: "Share this build with your crew." });
    }
  };

  const currentInstruction = instructions[currentStep];
  const isLastStep = currentStep === instructions.length - 1;

  const narrationText = useMemo(() => {
    if (!currentInstruction) return "";
    const base = [
      `Step ${currentInstruction.stepNumber}: ${currentInstruction.title}.`,
      currentInstruction.description,
      currentInstruction.safetyWarning ? `Safety warning: ${currentInstruction.safetyWarning}` : "",
      currentInstruction.adultSupervision ? "Adult supervision recommended." : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (style === "pro") {
      return `Project: ${project.title}. ${base}`;
    }

    // coach
    return [
      "Alright builder — you’ve got this.",
      `Project: ${project.title}.`,
      base,
      "When you’re ready, we’ll move to the next step.",
    ].join(" ");
  }, [currentInstruction, project.title, style]);

  const speakCurrentStep = useCallback(() => {
    if (!narrator.isSupported) {
      toast({
        title: "Read Aloud not available",
        description: "Your browser doesn’t support speech synthesis.",
        variant: "destructive",
      });
      return;
    }

    narrator.speak(narrationText, { rate: speechRate }, () => {
      if (!autoAdvance) return;
      if (currentStep >= instructions.length - 1) {
        setHandsFreeMode(false);
        return;
      }
      setCurrentStep((s) => s + 1);
    });
  }, [autoAdvance, currentStep, narrationText, narrator, speechRate, toast, instructions.length]);

  useEffect(() => {
    if (!handsFreeMode) return;
    speakCurrentStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  return (
    <div className="card-premium rounded-2xl overflow-hidden">
      {/* Project Header */}
      <div className="p-6 border-b border-border bg-background/60">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="w-full sm:flex-1 sm:min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h3 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                {project.title}
              </h3>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {project.category}
              </Badge>
            </div>
            {project.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
            )}
            {(project.totalRatings || 0) > 0 && (
              <div className="mt-2">
                <ProjectRating
                  averageRating={project.averageRating}
                  totalRatings={project.totalRatings}
                  ratingPercentage={project.ratingPercentage}
                  size="sm"
                />
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            <div className="flex gap-2 flex-wrap justify-end">
              {project.estimatedCost && (
                <div className="flex items-center gap-1 text-primary font-semibold">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-sm">{project.estimatedCost}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{project.estimatedTime} min</span>
              </div>
              <Badge className={difficultyColor}>
                <Star className="w-3 h-3 mr-1" />
                {project.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleShare} className="font-semibold">
            <Share2 className="w-4 h-4 mr-1.5" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="font-semibold">
            <Download className="w-4 h-4 mr-1.5" />
            Download
          </Button>
        </div>

        {/* Instruction Style + Hands-Free */}
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-muted-foreground text-xs mb-2">Instruction style</p>
            <div className="inline-flex rounded-lg border border-border bg-background/70 p-1">
              <Button
                type="button"
                size="sm"
                variant={style === "coach" ? "default" : "ghost"}
                onClick={() => setStyle("coach")}
                className={
                  style === "coach"
                    ? "h-9 px-3"
                    : "h-9 px-3 text-muted-foreground hover:text-foreground"
                }
              >
                Coach
              </Button>
              <Button
                type="button"
                size="sm"
                variant={style === "pro" ? "default" : "ghost"}
                onClick={() => setStyle("pro")}
                className={
                  style === "pro" ? "h-9 px-3" : "h-9 px-3 text-muted-foreground hover:text-foreground"
                }
              >
                Pro
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-muted-foreground text-xs">Hands-free</p>
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                <Volume2 className="w-3.5 h-3.5" />
                Read aloud
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (!handsFreeMode) {
                    setHandsFreeMode(true);
                    speakCurrentStep();
                    return;
                  }

                  if (narrator.isSpeaking && !narrator.isPaused) {
                    narrator.pause();
                    return;
                  }
                  if (narrator.isPaused) {
                    narrator.resume();
                    return;
                  }

                  narrator.stop();
                  setHandsFreeMode(false);
                }}
                className="font-semibold"
              >
                {!handsFreeMode ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                ) : narrator.isPaused ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>

              {handsFreeMode && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    narrator.stop();
                    setHandsFreeMode(false);
                  }}
                >
                  Stop
                </Button>
              )}

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setAutoAdvance((v) => !v)}
                className="whitespace-nowrap"
              >
                Auto-advance: {autoAdvance ? "On" : "Off"}
              </Button>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setSpeechRate((r) => (r === 1 ? 1.25 : r === 1.25 ? 1.5 : 1))}
                title="Reading speed"
              >
                {speechRate === 1 ? <Turtle className="w-4 h-4 mr-2" /> : <Rabbit className="w-4 h-4 mr-2" />}
                {speechRate}×
              </Button>
            </div>

            {!narrator.isSupported && (
              <p className="mt-2 text-[11px] text-muted-foreground">Read Aloud isn’t supported in this browser.</p>
            )}


          {isLastStep && (
            <CompletionCard
              title={project.title}
              onShare={() => void handleShare()}
              onDownload={() => void handleExport()}
            />
          )}          </div>
        </div>
      </div>

      {/* Safety Notice */}
      {project.safetyNotes && (
        <div className="mx-6 mt-6 bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-700 font-semibold text-sm mb-0.5">Safety notes</p>
            <p className="text-amber-700/80 text-sm">{project.safetyNotes}</p>
          </div>
        </div>
      )}

      {/* Materials / Tools (mobile: sheets) */}
      <div className="px-6 pt-6 md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="justify-start">
                <List className="w-4 h-4 mr-2 text-primary" />
                Materials
                <span className="ml-auto text-xs text-muted-foreground">{project.materials.length}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="p-0 bg-background border-border rounded-t-2xl max-h-[85vh] overflow-auto">
              <div className="p-6">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-display">Materials needed</SheetTitle>
                  <SheetDescription>Tap a link to buy on Amazon (optional).</SheetDescription>
                </SheetHeader>

                <div className="mt-5 space-y-3">
                  {project.materials.map((material, index) => (
                    <div key={index} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{material.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Qty: {material.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          ${typeof material.estimatedCost === "number" ? material.estimatedCost.toFixed(2) : material.estimatedCost}
                        </span>
                        <a
                          href={buildAmazonAffiliateUrl({ query: material.name, affiliateLink: material.affiliateLink })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => {
                            void trackOutboundClick({
                              destination: buildAmazonAffiliateUrl({ query: material.name, affiliateLink: material.affiliateLink }),
                              itemType: "material",
                              itemName: material.name,
                              source: "materials_sheet",
                            });
                          }}
                          aria-label={`Buy ${material.name} on Amazon`}
                          title="Buy on Amazon"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">Buy</span>
                        </a>
                      </div>
                    </div>
                  ))}

                  {project.estimatedCost && (
                    <div className="rounded-xl border border-border bg-background p-4 flex justify-between items-center">
                      <span className="text-muted-foreground text-xs">Total estimate</span>
                      <span className="text-primary font-bold text-sm">${project.estimatedCost}</span>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="justify-start">
                <Wrench className="w-4 h-4 mr-2 text-primary" />
                Tools
                <span className="ml-auto text-xs text-muted-foreground">{project.tools.length}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="p-0 bg-background border-border rounded-t-2xl max-h-[85vh] overflow-auto">
              <div className="p-6">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-display">Tools required</SheetTitle>
                  <SheetDescription>Grab what you need before you start.</SheetDescription>
                </SheetHeader>

                <div className="mt-5 space-y-2">
                  {project.tools.map((tool, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground truncate">{tool}</span>
                      </div>

                      <a
                        href={buildAmazonAffiliateUrl({ query: tool })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                        onClick={() => {
                          void trackOutboundClick({
                            destination: buildAmazonAffiliateUrl({ query: tool }),
                            itemType: "tool",
                            itemName: tool,
                            source: "tools_sheet",
                          });
                        }}
                        aria-label={`Buy ${tool} on Amazon`}
                        title="Buy on Amazon"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Buy</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Materials & Tools (desktop) */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 p-6">
        {/* Materials */}
        <div className="border border-border rounded-xl p-5 bg-muted/20">
          <h4 className="font-display text-foreground font-bold text-sm mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-primary" />
            Materials needed
          </h4>
          <div className="space-y-2.5">
            {project.materials.map((material, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-foreground text-sm truncate block font-medium">{material.name}</span>
                    <span className="text-muted-foreground text-xs">Qty: {material.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <span className="text-primary text-sm font-semibold">
                    ${typeof material.estimatedCost === "number" ? material.estimatedCost.toFixed(2) : material.estimatedCost}
                  </span>
                  <a
                    href={buildAmazonAffiliateUrl({ query: material.name, affiliateLink: material.affiliateLink })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-primary hover:bg-primary/10 transition-colors"
                    onClick={() => {
                      void trackOutboundClick({
                        destination: buildAmazonAffiliateUrl({ query: material.name, affiliateLink: material.affiliateLink }),
                        itemType: "material",
                        itemName: material.name,
                        source: "materials_list",
                      });
                    }}
                    aria-label={`Buy ${material.name} on Amazon`}
                    title="Buy on Amazon"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Buy</span>
                  </a>
                </div>
              </div>
            ))}
            {project.estimatedCost && (
              <div className="border-t border-border pt-2.5 mt-1 flex justify-between items-center">
                <span className="text-muted-foreground text-xs">Total estimate</span>
                <span className="text-primary font-bold text-sm">${project.estimatedCost}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tools */}
        <div className="border border-border rounded-xl p-5 bg-muted/20">
          <h4 className="font-display text-foreground font-bold text-sm mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Tools required
          </h4>
          <div className="space-y-2">
            {project.tools.map((tool, index) => (
              <div key={index} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-background/60 border border-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-foreground text-sm truncate font-medium">{tool}</span>
                </div>

                <a
                  href={buildAmazonAffiliateUrl({ query: tool })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                  onClick={() => {
                    void trackOutboundClick({
                      destination: buildAmazonAffiliateUrl({ query: tool }),
                      itemType: "tool",
                      itemName: tool,
                      source: "tools_list",
                    });
                  }}
                  aria-label={`Buy ${tool} on Amazon`}
                  title="Buy on Amazon"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Buy</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Safety Assessment Banner */}
      {(project as any).safetyLevel && (
        <div className={`mx-6 mt-4 rounded-xl border-2 p-4 ${
          (project as any).safetyLevel === 'Professional required' 
            ? 'bg-red-50 border-red-200' 
            : (project as any).safetyLevel === 'Advanced repair'
            ? 'bg-amber-50 border-amber-200'
            : 'bg-emerald-50 border-emerald-200'
        }`}>
          <div className="flex items-start gap-3">
            {(project as any).safetyLevel === 'Professional required' ? (
              <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            ) : (project as any).safetyLevel === 'Advanced repair' ? (
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-bold ${
                  (project as any).safetyLevel === 'Professional required' 
                    ? 'text-red-700' 
                    : (project as any).safetyLevel === 'Advanced repair'
                    ? 'text-amber-700'
                    : 'text-emerald-700'
                }`}>
                  {(project as any).safetyLevel === 'Professional required' && '⛔ '}
                  {(project as any).safetyLevel === 'Advanced repair' && '⚠️ '}
                  {(project as any).safetyLevel === 'DIY-friendly' && '✅ '}
                  {(project as any).safetyLevel}
                </span>
              </div>
              {(project as any).safetyWarningProject && (
                <p className={`text-sm ${
                  (project as any).safetyLevel === 'Professional required' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {(project as any).safetyWarningProject}
                </p>
              )}
              {(project as any).safetyLevel === 'Professional required' && (
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-red-700">
                  <Phone className="w-4 h-4" />
                  We recommend calling a licensed professional for this repair.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      <div className="px-6 pb-6">
        <h4 className="font-display text-foreground font-extrabold text-base mb-4 flex items-center gap-2 tracking-tight">
          <List className="w-4 h-4 text-primary" />
          Step-by-step repair guidance
        </h4>

        <div className="space-y-3">
          {instructions.map((instruction, index) => {
            const isActive = index === currentStep;
            return (
              <div
                key={instruction.id}
                className={`flex gap-4 p-5 rounded-xl border cursor-pointer transition-colors relative ${
                  isActive
                    ? "bg-primary/6 border-primary/25"
                    : "bg-background/60 border-border hover:bg-muted/30"
                }`}
                onClick={() => setCurrentStep(index)}
                aria-current={isActive ? "step" : undefined}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {instruction.stepNumber}
                  </div>
                </div>

                <div className="w-full sm:flex-1 sm:min-w-0">
                  <h5
                    className={`font-semibold mb-1 text-sm leading-snug ${
                      isActive ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {instruction.title}
                  </h5>
                  <p
                    className={`text-sm leading-relaxed ${
                      isActive ? "text-muted-foreground" : "text-muted-foreground line-clamp-2"
                    }`}
                  >
                    {instruction.description}
                  </p>

                  {instruction.safetyWarning && (
                    <div className="mt-3 flex items-start gap-2 bg-red-500/8 border border-red-500/20 rounded-lg p-3">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700/90 text-xs">{instruction.safetyWarning}</p>
                    </div>
                  )}

                  {instruction.adultSupervision && (
                    <div className="mt-3 flex items-center gap-2 bg-primary/6 border border-primary/15 rounded-lg p-3">
                      <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-primary/90 text-xs">Adult supervision recommended for this step.</p>
                    </div>
                  )}
                </div>

                {index < instructions.length - 1 && (
                  <div className="absolute left-[2.45rem] top-[3.8rem] w-px h-4 bg-border" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Navigation */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-xs">Progress</span>
            <span className="text-foreground text-xs font-medium">
              {currentStep + 1} / {instructions.length} steps
            </span>
          </div>
          <div className="bg-muted rounded-full h-1.5 w-full mb-4 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / instructions.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {style === "pro" ? "Previous" : "Back"}
            </Button>
            <Button
              onClick={nextStep}
              disabled={isLastStep}
              className="font-semibold flex-1"
            >
              {style === "pro" ? "Next" : "Next step"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mx-6 mb-6 mt-0 pt-6 border-t border-border">
        <FeedbackForm
          projectId={project.id}
          userId={userId}
          stepNumber={currentInstruction?.stepNumber}
          context={{
            page: window.location.pathname,
            projectId: project.id,
            stepNumber: currentInstruction?.stepNumber ?? null,
          }}
        />
      </div>
    </div>
  );
}
