import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Wrench, Star, Crown, TrendingUp, Clock, DollarSign, Camera, FileText, ShoppingCart, ClipboardList, Zap, Droplets, Tv, Fan, PaintBucket, Lightbulb, Thermometer } from "lucide-react";
import { HeroBackdrop } from "@/components/hero/hero-backdrop";
import { PhotoUpload } from "@/components/photo-upload";
import { InstructionDisplay } from "@/components/instruction-display";
import { UsageLimitBanner } from "@/components/usage-limit-banner";
import { ProjectImage } from "@/components/project-image";
import { ProjectRating } from "@/components/project-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ProjectWithInstructions, UsageInfo, User, Project } from "@/lib/types";


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
];

export default function Home() {
  const [result, setResult] = useState<ProjectWithInstructions | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [inputMode, setInputMode] = useState<'photo' | 'text'>('photo');
  const [textDescription, setTextDescription] = useState('');
  const { toast } = useToast();

  const getCurrentUser = async () => {
    try {
      let userId = localStorage.getItem('anonymousUserId');
      if (userId) {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) { setCurrentUser(await response.json()); return; }
        localStorage.removeItem('anonymousUserId');
      }
      const uniqueEmail = `anon-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@myhandyman.ai`;
      const createRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: uniqueEmail }),
      });
      if (createRes.ok) {
        const user = await createRes.json();
        localStorage.setItem('anonymousUserId', user.id.toString());
        setCurrentUser(user);
        return;
      }
      throw new Error('Failed to create user');
    } catch (err) {
      console.error('[user] Error:', err);
      let fallbackId = localStorage.getItem('anonymousUserId');
      if (!fallbackId) {
        fallbackId = 'local-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        localStorage.setItem('anonymousUserId', fallbackId);
      }
      setCurrentUser({
        id: fallbackId as any,
        email: null, buildsUsed: 0, easyBuildsUsed: 0, maxBuilds: 3, maxEasyBuilds: 3,
        isPremium: false, premiumExpiresAt: null, firstName: null, lastName: null,
        profileImageUrl: null, createdAt: new Date(), updatedAt: new Date()
      });
    }
  };

  const { data: usageInfo, refetch: refetchUsage } = useQuery<UsageInfo>({
    queryKey: ['/api/users/usage', currentUser?.id],
    enabled: !!currentUser,
  });

  const { data: topProjects } = useQuery<Project[]>({
    queryKey: ['/api/projects/top-rated'],
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => { getCurrentUser(); }, []);

  const analyzeMutation = useMutation({
    mutationFn: async (file: File) => {
      if (usageInfo && usageInfo.isLimitReached) throw new Error("Repair limit reached. Please upgrade to continue.");
      const formData = new FormData();
      formData.append('image', file);
      if (currentUser?.id) formData.append('userId', currentUser.id.toString());
      const response = await apiRequest('POST', '/api/analyze-repair', formData);
      return response.json();
    },
    onSuccess: (data: ProjectWithInstructions) => {
      setResult(data);
      refetchUsage();
      toast({ title: "Analysis Complete!", description: "Your repair plan is ready." });
    },
    onError: (error: Error) => {
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
      toast({ title: "Repair Plan Ready!", description: "Your instructions are ready." });
    },
    onError: (error: Error) => {
      toast({ title: "Generation Failed", description: error.message || "Please try again with more detail.", variant: "destructive" });
    },
  });

  const handleImageSelected = (file: File) => { setResult(null); analyzeMutation.mutate(file); };
  const handleTextSubmit = () => { if (textDescription.trim().length >= 5) { setResult(null); textMutation.mutate(textDescription); } };
  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id || localStorage.getItem("myhandyman_user_id") }),
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
  };

  const handleQuickRepair = (description: string) => {
    if (usageInfo && usageInfo.isLimitReached) {
      toast({ title: "Repair limit reached", description: "Please upgrade to continue.", variant: "destructive" });
      return;
    }
    setResult(null);
    setInputMode('text');
    textMutation.mutate(description);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-workshop relative">
        <div className="absolute inset-0 z-0">
          <img src="/hero.jpg" alt="Woman using MyHandyman AI app to diagnose a plumbing issue" className="w-full h-full object-cover" id="hero-img" />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#1B2430]/70 via-[#1B2430]/40 to-[#1B2430]/20 sm:from-[#1B2430]/85 sm:via-[#1B2430]/60 sm:to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-24 pb-16 text-left flex flex-col min-h-[75vh] sm:min-h-0">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight leading-[1.08]">
            <span className="text-white">Your AI-Powered</span><br />
            <span className="text-[#2FA3A0]">Home Repair Assistant</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mb-10 mt-auto sm:mt-0 pt-48 sm:pt-0">
            Upload a photo of a broken item, damaged area, or home issue and get clear repair steps, tool recommendations, time estimates, and guidance on whether to DIY or call a pro.
          </p>

        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Stepper
            className="max-w-4xl mx-auto mb-12"
            steps={[
              {
                title: "Upload a photo",
                description: "Leaky faucet, cracked drywall, loose cabinet — the clearer the better.",
                icon: <Camera className="size-5" />,
              },
              {
                title: "Get the fix",
                description: "AI issue detection, repair steps, tools, parts + time estimates.",
                icon: <FileText className="size-5" />,
              },
              {
                title: "Source the parts",
                description: "A focused list so you can shop once and fix once.",
                icon: <ShoppingCart className="size-5" />,
              },
            ]}
          />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#F4F7FA] py-8 px-4 border-y border-[#D8E0E8]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-extrabold text-[#1F4E79]">100%</div>
              <div className="text-xs text-muted-foreground mt-1">AI-Powered Analysis</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1F4E79]">30s</div>
              <div className="text-xs text-muted-foreground mt-1">Average Diagnosis Time</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#2FA3A0]">Safe</div>
              <div className="text-xs text-muted-foreground mt-1">DIY Safety Assessments</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1F4E79]">Free</div>
              <div className="text-xs text-muted-foreground mt-1">To Get Started</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-8">

        {usageInfo && <UsageLimitBanner usage={usageInfo} onUpgrade={handleUpgrade} />}

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
            <p className="text-muted-foreground mb-6">Inspecting, planning, and assembling your repair guide.</p>
            <div className="bg-muted rounded-full h-1.5 w-full max-w-sm mx-auto overflow-hidden">
              <div className="bg-primary h-full rounded-full progress-bar" style={{ width: "65%" }} />
            </div>
          </div>
        )}

        {/* Common Repairs Quick-Select */}
        {!result && !analyzeMutation.isPending && !textMutation.isPending && (
          <div className="mb-8">
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

        {/* Upload or Results */}
        <div id="upload-section" />
        {!result && !analyzeMutation.isPending && !textMutation.isPending && (
          <div>
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-xl bg-muted p-1 gap-1">
                <button
                  onClick={() => setInputMode('photo')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    inputMode === 'photo' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  Upload Photo
                </button>
                <button
                  onClick={() => setInputMode('text')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    inputMode === 'text' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Describe It
                </button>
              </div>
            </div>

            {inputMode === 'photo' ? (
              <PhotoUpload onImageSelected={handleImageSelected} isLoading={analyzeMutation.isPending} />
            ) : (
              <div className="card-premium rounded-2xl p-8 mb-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">What needs fixing?</h3>
                <p className="text-muted-foreground text-sm mb-4">Describe the issue and we'll create a complete repair guide.</p>
                <textarea
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  placeholder="e.g., My bathroom faucet is dripping constantly, it's a two-handle model about 10 years old..."
                  className="w-full h-32 rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">{textDescription.length > 0 ? `${textDescription.length} characters` : 'Min 5 characters'}</span>
                  <button
                    onClick={handleTextSubmit}
                    disabled={textDescription.trim().length < 5}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Wrench className="w-4 h-4" />
                    Generate Repair Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {result && <InstructionDisplay data={result} userId={currentUser?.id} />}

        {/* Community Favorites */}
        {!result && topProjects && topProjects.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="text-primary w-5 h-5" />
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Community favorites
                </h3>
              </div>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Top-rated repair guides from homeowners like you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topProjects.slice(0, 6).map((project) => (
                <Link key={project.id} href={`/project/${project.id}`}>
                  <div className="card-premium rounded-xl overflow-hidden cursor-pointer group">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <ProjectImage
                        imageUrl={project.imageUrl}
                        title={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className="badge-premium rounded-full px-2.5 py-0.5 text-xs">
                          {project.ratingPercentage}%
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-sm font-semibold">View repair guide →</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">{project.title}</h4>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {project.category}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <ProjectRating
                          averageRating={project.averageRating}
                          totalRatings={project.totalRatings}
                          ratingPercentage={project.ratingPercentage}
                          size="sm"
                          showPercentage={false}
                        />
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{project.estimatedTime}min</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={
                          project.difficulty === 'Easy' ? 'bg-green-500/15 text-green-400 border-0' :
                          project.difficulty === 'Medium' ? 'bg-yellow-500/15 text-yellow-400 border-0' :
                          'bg-red-500/15 text-red-400 border-0'
                        }>
                          <Star className="w-3 h-3 mr-1" />
                          {project.difficulty}
                        </Badge>
                        {project.estimatedCost && (
                          <div className="flex items-center text-primary text-sm font-semibold">
                            <DollarSign className="w-3 h-3" />
                            {project.estimatedCost}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button className="font-semibold">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade for unlimited repairs
              </Button>
            </div>
          </div>
        )}

        {/* Features */}
        {!result && (
          <div className="grid md:grid-cols-3 gap-5 mt-4">
            <div className="card-premium rounded-xl p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F4E79]/10 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-[#1F4E79]" />
                </div>
              </div>
              <h4 className="font-display text-base font-bold text-foreground mb-2">My Repairs</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">All your repair history in one place. Never lose track of a fix again.</p>
            </div>
            <div className="card-premium rounded-xl p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#2FA3A0]/10 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-[#2FA3A0]" />
                </div>
              </div>
              <h4 className="font-display text-base font-bold text-foreground mb-2">Parts & Tools</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Every parts list includes direct links to buy exactly what you need.</p>
            </div>
            <div className="card-premium rounded-xl p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#D99A2B]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#D99A2B]" />
                </div>
              </div>
              <h4 className="font-display text-base font-bold text-foreground mb-2">Instant Diagnosis</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">AI analysis in seconds — full repair guide, tools list, and cost breakdown.</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
