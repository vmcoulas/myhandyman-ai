import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { FeedbackForm } from "@/components/feedback-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFeedbackContext } from "@/lib/feedback-context";

export function FeedbackSheetTrigger({
  className,
  label = "Feedback",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { ctx } = useFeedbackContext();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={
            className ||
            "inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/60 transition-colors"
          }
        >
          <MessageCircle className="w-3.5 h-3.5" />
          {label}
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="p-0 bg-[hsl(222,20%,7%)] border-white/10 rounded-t-2xl max-h-[85vh] overflow-auto"
      >
        <div className="p-6">
          <SheetHeader className="text-left">
            <SheetTitle className="text-white">Send feedback</SheetTitle>
            <SheetDescription className="text-white/50">
              Help us improve MyHandyman AI. This captures the page you’re on and the current step (if applicable).
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5">
            <FeedbackForm
              projectId={ctx.projectId ?? null}
              stepNumber={ctx.stepNumber}
              pagePath={location}
              context={{ page: location, projectId: ctx.projectId ?? null, stepNumber: ctx.stepNumber ?? null }}
              onFeedbackSubmitted={() => setOpen(false)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
