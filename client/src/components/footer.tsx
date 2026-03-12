import { Wrench, Shield, Mail } from "lucide-react";
import { FeedbackSheetTrigger } from "@/components/feedback-sheet";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="mb-3 flex items-center justify-center md:justify-start space-x-3">
              <img src="/logo.png" alt="MyHandyman AI" className="h-8 w-8 rounded-lg object-contain" />
              <span className="font-extrabold text-foreground">
                MyHandyman<span className="text-muted-foreground">.ai</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your AI-powered home repair assistant. Upload a photo, get the fix.
            </p>
          </div>

          {/* Safety Notice */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-[#2FA3A0]" />
              <span className="text-sm font-semibold text-foreground">Safety First</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              MyHandyman AI provides guidance for informational purposes only. 
              Always consult a licensed professional for electrical, gas, structural, 
              or permit-required work. We are not liable for any damages or injuries.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs text-muted-foreground mb-4">
              <FeedbackSheetTrigger />
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="/support" className="hover:text-foreground transition-colors">DIY Guides</a>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <a href="mailto:support@myhandyman.ai" className="hover:text-foreground transition-colors">support@myhandyman.ai</a>
            </div>
          </div>

        </div>
        
        <div className="divider-glow mx-auto mt-8 mb-4 max-w-full" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © 2026 MyAiga LLC. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with AI in Palm Beach County, FL 🌴
          </p>
        </div>
      </div>
    </footer>
  );
}
