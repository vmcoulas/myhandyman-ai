import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Wrench, Star, Crown, TrendingUp, Clock, DollarSign, Camera, FileText, ShoppingCart } from "lucide-react";
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
      const response = await apiRequest('POST', '/api/analyze-furniture', formData);
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
  const handleUpgrade = () => toast({ title: "Upgrade Coming Soon!", description: "Premium features will be available soon. Thank you for your interest!" });

  return (
    <>
      {/* Hero Section */}
      <section className="hero-workshop relative">
        <HeroBackdrop imageSrc="/assets/hero/workshop-hero.jpg" alt="" showPegboard />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[hsl(24,95%,53%)]/20 px-4 py-1.5 mb-6 text-xs text-muted-foreground font-medium shadow-sm">
            <span className="inline-block size-1.5 rounded-full bg-[hsl(24,95%,53%)]" />
            Your AI-powered home repair assistant
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight leading-[1.08]">
            <span className="text-white">Snap a photo.</span><br />
            <span className="text-[#2FA3A0]">Fix it with confidence.</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Upload a photo of anything that needs fixing. MyHandyman.ai turns it into a clear, step-by-step repair plan with parts, tools, and cost guidance.
          </p>

          <Stepper
            className="max-w-4xl mx-auto mb-12"
            steps={[
              {
                title: "Snap a photo",
                description: "Leaky faucet, broken fence, cracked drywall — the clearer the better.",
                icon: <Camera className="size-5" />,
              },
              {
                title: "Get a repair plan",
                description: "Steps, tools, parts, and a realistic time estimate.",
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-8">

        {usageInfo && <UsageLimitBanner usage={usageInfo} onUpgrade={handleUpgrade} />}

        {/* Analysis Progress */}
        {(analyzeMutation.isPending || textMutation.isPending) && (
          <div className="card-premium rounded-2xl p-10 mb-8 text-center">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-70" />
              <div className="relative rounded-full bg-white/80 border border-[hsl(24,95%,53%)]/20 p-6 shadow-sm">
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

        {/* Upload or Results */}
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
            {[
              {
                icon: "🗂️",
                title: "My Repairs",
                desc: "All your repair history in one place. Never lose track of a fix again.",
              },
              {
                icon: "🔗",
                title: "Parts Links",
                desc: "Every parts list includes direct links to buy exactly what you need.",
              },
              {
                icon: "⚡",
                title: "Instant Diagnosis",
                desc: "AI analysis in seconds — full repair guide, tools list, and cost breakdown.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="card-premium rounded-xl p-6 shimmer">
                <div className="text-3xl mb-4">{icon}</div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
