import { Wrench } from "lucide-react";
import { FeedbackSheetTrigger } from "@/components/feedback-sheet";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
              <div className="relative rounded-xl bg-primary p-2 text-primary-foreground shadow-sm">
                <Wrench className="h-4 w-4" />
              </div>
            </div>
            <span className="font-extrabold text-foreground">
              MyHandyman<span className="text-muted-foreground">.ai</span>
            </span>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            Snap a photo. Fix it with confidence.
          </p>
          <div className="divider-glow mx-auto mb-5 max-w-xs" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <FeedbackSheetTrigger />
            <a href="#" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Privacy Policy
            </a>
            <a href="#" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Terms of Service
            </a>
            <a href="/support" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              Support
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/70">
            © 2026 MyHandyman.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
