import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle, Crown, Camera, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYou() {
  useEffect(() => {
    document.title = "Welcome to Premium — MyHandyman.ai";

    // Fire Meta Pixel purchase event if available
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", { currency: "USD", value: 9.99 });
    }

    // Fire Google Analytics conversion event if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "purchase", {
        event_category: "ecommerce",
        event_label: "premium_subscription",
      });
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1F4E79] flex items-center justify-center">
              <Crown className="w-4 h-4 text-yellow-300" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-[#1F4E79] mb-3">
          You're Premium!
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Thank you for upgrading. You now have unlimited diagnoses, priority
          processing, and access to all repair features.
        </p>

        {/* What's unlocked */}
        <div className="rounded-xl border bg-[#1F4E79]/5 p-5 mb-8 text-left">
          <h2 className="text-sm font-semibold text-[#1F4E79] mb-3">What's unlocked for you:</h2>
          <ul className="space-y-2">
            {[
              "Unlimited photo diagnoses",
              "Faster AI processing",
              "Detailed repair plans with cost estimates",
              "Amazon parts links for every repair",
              "Save & revisit past projects",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link href="/build">
            <Button className="w-full bg-[#1F4E79] hover:bg-[#1F4E79]/90 text-white font-semibold">
              <Camera className="w-4 h-4 mr-2" />
              Diagnose Your First Repair
            </Button>
          </Link>
          <Link href="/repairs">
            <Button variant="outline" className="w-full">
              <Wrench className="w-4 h-4 mr-2" />
              Browse Repair Guides
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          A receipt has been sent to your email. Questions?{" "}
          <Link href="/support" className="underline hover:text-foreground">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
