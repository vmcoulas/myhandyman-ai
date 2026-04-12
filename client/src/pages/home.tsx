import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Wrench, Clock, DollarSign, Camera, ShoppingCart, Zap, Droplets, Tv, Fan, PaintBucket, Lightbulb, Thermometer, CheckCircle, X, AlertCircle, Sparkles } from "lucide-react";
import { InstructionDisplay } from "@/components/instruction-display";
import { UsageLimitBanner } from "@/components/usage-limit-banner";
import { PaywallModal } from "@/components/paywall-modal";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackPhotoUpload, trackRepairPlanGenerated } from "@/lib/analytics";
import { takePhoto, hapticTap } from "@/lib/native-camera";
import { isNative } from "@/lib/platform";
import { getItemSync, setItemWithCache, removeItem as removeStorageItem } from "@/lib/native-storage";
import type { ProjectWithInstructions, UsageInfo, User } from "@/lib/types";


const COMMON_REPAIRS = [
  {
    id: "ceiling-fan",
    slug: "install-ceiling-fan",
    title: "Install Ceiling Fan",
    icon: Fan,
    description: "I need to install or replace a ceiling fan. Walk me through mounting, wiring, and balancing the fan blades.",
    difficulty: "Medium",
    time: "2-3 hrs",
  },
  {
    id: "mount-tv",
    slug: "mount-tv-on-wall",
    title: "Mount a TV",
    icon: Tv,
    description: "I want to mount a TV on the wall. Help me find studs, choose the right wall mount, route cables cleanly, and secure it safely.",
    difficulty: "Easy",
    time: "1-2 hrs",
  },
  {
    id: "running-toilet",
    slug: "fix-running-toilet",
    title: "Fix Running Toilet",
    icon: Droplets,
    description: "My toilet keeps running after flushing and won't stop. Help me diagnose whether it's the flapper, fill valve, or float and fix it.",
    difficulty: "Easy",
    time: "30-60 min",
  },
  {
    id: "patch-drywall",
    slug: "patch-drywall-hole",
    title: "Patch Drywall",
    icon: PaintBucket,
    description: "I have a hole or crack in my drywall that needs patching and repainting so it blends in with the surrounding wall.",
    difficulty: "Easy",
    time: "1-2 hrs",
  },
  {
    id: "light-switch",
    slug: "replace-light-switch",
    title: "Replace Light Switch",
    icon: Lightbulb,
    description: "I need to replace a light switch or electrical outlet. Guide me through safely turning off power, removing the old switch, and wiring the new one.",
    difficulty: "Easy",
    time: "30-45 min",
  },
  {
    id: "leaky-faucet",
    slug: "fix-leaky-faucet",
    title: "Fix Leaky Faucet",
    icon: Thermometer,
    description: "My faucet is dripping constantly. Help me identify the faucet type, replace the worn washer or cartridge, and stop the leak.",
    difficulty: "Easy",
    time: "30-60 min",
  },
  {
    id: "water-heater",
    slug: "fix-water-heater-no-hot-water",
    title: "No Hot Water",
    icon: Zap,
    description: "My water heater isn't producing hot water. Help me check the pilot light, thermostat, and heating element to diagnose and fix the problem.",
    difficulty: "Medium",
    time: "45-90 min",
  },
];

export default function Home() {
  const [result, setResult] = useState<ProjectWithInstructions | null>(null);
  const [pendingResult, setPendingResult] = useState<ProjectWithInstructions | null>(null);
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoDescription, setPhotoDescription] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [textDescription, setTextDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const LOADING_MESSAGES = [
    "Inspecting the issue...",
    "Identifying the problem...",
    "Checking repair options...",
    "Building your repair plan...",
    "Assembling tools and materials...",
  ];

  // Drag-and-drop handlers for unified upload zone
  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
        handleImageSelected(file);
      } else {
        toast({ title: "Invalid file", description: "Please drop an image file under 10MB.", variant: "destructive" });
      }
    }
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
        handleImageSelected(file);
      } else {
        toast({ title: "Invalid file", description: "Please select an image file under 10MB.", variant: "destructive" });
      }
    }
  };
  const handleCamera = async () => {
    try {
      const result = await takePhoto();
      if (result) {
        await hapticTap();
        handleImageSelected(result.file, result.previewUrl);
      }
    } catch {
      toast({ title: "Camera access denied", description: "Please allow camera access or upload a file instead.", variant: "destructive" });
    }
  };

  const getCurrentUser = async () => {
    try {
      let userId = getItemSync('anonymousUserId');
      if (userId) {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) { setCurrentUser(await response.json()); return; }
        await removeStorageItem('anonymousUserId');
      }
      const uniqueEmail = `anon-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@myhandyman.ai`;
      const createRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: uniqueEmail }),
      });
      if (createRes.ok) {
        const user = await createRes.json();
        await setItemWithCache('anonymousUserId', user.id.toString());
        setCurrentUser(user);
        return;
      }
      throw new Error('Failed to create user');
    } catch (err) {
      console.error('[user] Error:', err);
      let fallbackId = getItemSync('anonymousUserId');
      if (!fallbackId) {
        fallbackId = 'local-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        setItemWithCache('anonymousUserId', fallbackId);
      }
      setCurrentUser({
        id: fallbackId as any,
        email: null,
        buildsUsed: 0,
        easyBuildsUsed: 0,
        maxBuilds: 3,
        maxEasyBuilds: 3,
        isPremium: false,
        premiumExpiresAt: null,
        createdAt: new Date(),
      });
    }
  };

  const { data: usageInfo, refetch: refetchUsage } = useQuery<UsageInfo>({
    queryKey: ['/api/users/usage', currentUser?.id],
    enabled: !!currentUser,
  });

  useEffect(() => { getCurrentUser(); }, []);

  const analyzeMutation = useMutation({
    mutationFn: async ({ file, description }: { file: File; description?: string }) => {
      if (usageInfo && usageInfo.isLimitReached) throw new Error("Repair limit reached. Please upgrade to continue.");
      const formData = new FormData();
      formData.append('image', file);
      if (currentUser?.id) formData.append('userId', currentUser.id.toString());
      if (description && description.trim().length > 0) formData.append('description', description.trim());
      const response = await apiRequest('POST', '/api/analyze-repair', formData);
      return response.json();
    },
    onSuccess: (data: ProjectWithInstructions) => {
      setPendingResult(data);
      setSelectedFile(null);
      setPhotoDescription('');
      refetchUsage();
      trackRepairPlanGenerated(data.project?.title || 'photo_diagnosis');
    },
    onError: (error: Error) => {
      setPendingImagePreview(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
      toast({ title: "Analysis Failed", description: error.message || "Please try again with a clearer image.", variant: "destructive" });
    },
  });

  const textMutation = useMutation({
    mutationFn: async (description: string) => {
      if (usageInfo && usageInfo.isLimitReached) throw new Error("Repair limit reached. Please upgrade to continue.");
      const response = await apiRequest('POST', '/api/analyze-description', {
        description,
        userId: currentUser?.id?.toString(),
      });
      return response.json();
    },
    onSuccess: (data: ProjectWithInstructions) => {
      setResult(data);
      setTextDescription('');
      refetchUsage();
      trackRepairPlanGenerated(data.project?.title || 'text_diagnosis');
      toast({ title: "Repair Plan Ready!", description: "Your instructions are ready." });
    },
    onError: (error: Error) => {
      // The error message may look like "422: {"message":"...","fallback":true}"
      // Parse out just the human-readable message if possible.
      let displayMessage = error.message || "Please try again with more detail.";
      try {
        const jsonStart = displayMessage.indexOf('{');
        if (jsonStart !== -1) {
          const parsed = JSON.parse(displayMessage.slice(jsonStart));
          if (parsed?.message) displayMessage = parsed.message;
        }
      } catch {
        // keep displayMessage as-is
      }
      toast({ title: "Couldn't Generate Plan", description: displayMessage, variant: "destructive" });
    },
  });

  useEffect(() => {
    if (!analyzeMutation.isPending && !textMutation.isPending) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [analyzeMutation.isPending, textMutation.isPending]);

  const handleImageSelected = (file: File, existingPreviewUrl?: string) => {
    setResult(null);
    setPendingResult(null);
    setPhotoDescription('');
    if (pendingImagePreview && !pendingImagePreview.startsWith('data:')) {
      URL.revokeObjectURL(pendingImagePreview);
    }
    const previewUrl = existingPreviewUrl || URL.createObjectURL(file);
    setPendingImagePreview(previewUrl);
    setSelectedFile(file);
  };

  const handlePhotoSubmit = () => {
    if (!selectedFile) return;
    trackPhotoUpload('photo');
    analyzeMutation.mutate({ file: selectedFile, description: photoDescription });
  };

  const handleConfirmDiagnosis = () => {
    if (pendingResult) {
      setResult(pendingResult);
      setPendingResult(null);
      toast({ title: "Repair plan ready!", description: "Your step-by-step guide is below." });
    }
  };

  const handleRejectDiagnosis = () => {
    setPendingResult(null);
    setSelectedFile(null);
    setPhotoDescription('');
    if (pendingImagePreview) {
      URL.revokeObjectURL(pendingImagePreview);
      setPendingImagePreview(null);
    }
    toast({ title: "No problem", description: "Try uploading again or describe the issue in your own words." });
  };

  const handleTextSubmit = () => { if (textDescription.trim().length >= 5) { setResult(null); trackPhotoUpload('text'); textMutation.mutate(textDescription); } };

  /** Unified submit: sends photo+description, description-only, or photo-only */
  const handleUnifiedSubmit = () => {
    if (selectedFile) {
      // Photo path (with optional description)
      trackPhotoUpload('photo');
      analyzeMutation.mutate({ file: selectedFile, description: textDescription || photoDescription });
    } else if (textDescription.trim().length >= 5) {
      // Text-only path
      setResult(null);
      trackPhotoUpload('text');
      textMutation.mutate(textDescription);
    }
  };

  const handleUpgrade = async () => {
    if (isNative) {
      // On native, open Stripe checkout in the in-app browser.
      // TODO: Replace with RevenueCat IAP for iOS App Store compliance.
      // Apple REQUIRES In-App Purchase for digital subscriptions in iOS apps.
      // This Stripe fallback is temporary for development/Android only.
      try {
        const { Browser } = await import('@capacitor/browser');
        const res = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser?.id || getItemSync("anonymousUserId") }),
        });
        const data = await res.json();
        if (data.url) {
          await Browser.open({ url: data.url });
        } else {
          toast({ title: "Error", description: "Could not start checkout. Please try again." });
        }
      } catch {
        toast({ title: "Error", description: "Could not connect to payment server." });
      }
    } else {
      // Web: standard Stripe redirect
      try {
        const res = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser?.id || getItemSync("anonymousUserId") }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          toast({ title: "Error", description: "Could not start checkout. Please try again." });
        }
      } catch {
        toast({ title: "Error", description: "Could not connect to payment server." });
      }
    }
  };

  const handleQuickRepair = (description: string) => {
    if (usageInfo && usageInfo.isLimitReached) {
      setShowPaywall(true);
      return;
    }
    setResult(null);
    setPendingResult(null);
    trackPhotoUpload('text');
    textMutation.mutate(description);
  };

  return (
    <>
      {/* Paywall Modal */}
      {showPaywall && (
        <PaywallModal
          onUpgrade={handleUpgrade}
          onDismiss={() => setShowPaywall(false)}
          repairsUsed={(usageInfo as any)?.repairsUsed ?? usageInfo?.buildsUsed ?? 3}
          maxRepairs={(usageInfo as any)?.maxRepairs ?? usageInfo?.maxBuilds ?? 3}
        />
      )}

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-16">

        {usageInfo && <UsageLimitBanner usage={usageInfo} onUpgrade={() => setShowPaywall(true)} />}

        {/* Analysis Progress */}
        {(analyzeMutation.isPending || textMutation.isPending) && (
          <div className="card-premium rounded-2xl p-10 mb-8 text-center">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-70" />
              <div className="relative rounded-full bg-white/80 border border-[#2FA3A0]/30 p-6 shadow-sm">
                <Wrench className="text-primary w-12 h-12 animate-hammer origin-bottom-right" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Diagnosing the issue...
            </h3>
            <p className="text-muted-foreground mb-6 transition-opacity duration-300">{LOADING_MESSAGES[loadingStep]}</p>
            <div className="bg-muted rounded-full h-1.5 w-full max-w-sm mx-auto overflow-hidden">
              <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: analyzeMutation.isPending || textMutation.isPending ? "85%" : "0%", transition: "width 8s ease-out" }} />
            </div>
          </div>
        )}

        {/* Diagnosis Confirmation Step */}
        {pendingResult && !result && (
          <div className="card-premium rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2FA3A0]/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-[#2FA3A0]" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Does this look right?</h3>
                <p className="text-sm text-muted-foreground">Confirm what we found before we build your repair guide.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-6 p-5 rounded-xl bg-[#F4F7FA] border border-[#D8E0E8]">
              {pendingImagePreview && (
                <img
                  src={pendingImagePreview}
                  alt="Your uploaded photo"
                  className="rounded-xl w-full sm:w-44 h-36 object-cover flex-shrink-0"
                />
              )}
              <div className="flex flex-col justify-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-semibold">We identified</p>
                <p className="font-display text-2xl font-bold text-foreground mb-2 leading-tight">{pendingResult.project.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{pendingResult.project.description}</p>
              </div>
            </div>

            {/* Confidence Indicator */}
            <div className="mb-6">
              <ConfidenceIndicator
                confidence={pendingResult.project.confidence}
                confidenceReason={pendingResult.project.confidenceReason}
                showReason={true}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleConfirmDiagnosis} className="flex-1 font-semibold">
                <CheckCircle className="w-4 h-4 mr-2" />
                Yes, show me the fix
              </Button>
              <Button onClick={handleRejectDiagnosis} variant="outline" className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Not quite — try again
              </Button>
            </div>
          </div>
        )}

        {/* Common Repairs Quick-Select */}
        {!result && !pendingResult && !analyzeMutation.isPending && !textMutation.isPending && (
          <div className="mb-8" id="common-repairs">
            <div className="text-center mb-5">
              <h3 className="font-display text-xl font-bold text-foreground mb-1">Common Repairs</h3>
              <p className="text-muted-foreground text-sm">Tap a repair for an instant step-by-step guide — no photo needed.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COMMON_REPAIRS.map((repair) => {
                const Icon = repair.icon;
                return (
                  <a
                    key={repair.id}
                    href={`/repairs/${repair.slug}`}
                    className="card-premium rounded-xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group cursor-pointer block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm leading-tight mb-1">{repair.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${repair.difficulty === "Easy" ? "bg-green-500/15 text-green-600" : "bg-yellow-500/15 text-yellow-600"}`}>
                        {repair.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {repair.time}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium px-2">or use your own photo/description</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </div>
        )}

        {/* Unified Diagnosis Input */}
        <div id="upload-section" />
        {!result && !pendingResult && !analyzeMutation.isPending && !textMutation.isPending && (
          <div className="card-premium rounded-2xl p-5 sm:p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                What needs fixing?
              </h3>
              <p className="text-muted-foreground text-sm">Describe the problem, add a photo, or both — the more context, the better the fix.</p>
            </div>

            {/* Description textarea — always visible */}
            <textarea
              value={textDescription}
              onChange={(e) => setTextDescription(e.target.value)}
              placeholder="e.g., My bathroom faucet drips constantly after I close it. It's a two-handle model, about 10 years old, and the drip comes from the hot side..."
              className="w-full h-28 rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none mb-4"
            />

            {/* Photo section */}
            {selectedFile && pendingImagePreview ? (
              <div className="rounded-xl border border-border bg-muted/30 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Photo attached</span>
                  </div>
                  <button
                    onClick={() => { setSelectedFile(null); setPhotoDescription(''); URL.revokeObjectURL(pendingImagePreview); setPendingImagePreview(null); }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <img src={pendingImagePreview} alt="Selected photo" className="w-full max-h-48 object-cover rounded-lg" />
              </div>
            ) : (
              <div
                className={`upload-zone rounded-xl p-6 mb-4 cursor-pointer border-2 border-dashed border-border hover:border-primary/40 transition-colors ${dragActive ? 'border-primary bg-primary/5' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Add a photo <span className="text-muted-foreground font-normal">(optional)</span></p>
                  <p className="text-xs text-muted-foreground">Drop an image here, tap to browse, or use your camera</p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {!selectedFile && (
                <Button
                  onClick={handleCamera}
                  variant="outline"
                  className="sm:flex-none"
                  disabled={analyzeMutation.isPending || textMutation.isPending}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take photo
                </Button>
              )}
              <div className="flex-1" />
              <Button
                onClick={handleUnifiedSubmit}
                disabled={(analyzeMutation.isPending || textMutation.isPending) || (!selectedFile && textDescription.trim().length < 5)}
                className="font-semibold"
                size="lg"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Get My Fix
              </Button>
            </div>

            {/* Helper text */}
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary/70" /> AI photo + text analysis</div>
                <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary/70" /> Step-by-step instructions</div>
                <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary/70" /> Materials + cost guidance</div>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileInput} className="hidden" />
          </div>
        )}

        {result && <InstructionDisplay data={result} userId={currentUser?.id} />}
      </main>
    </>
  );
}
