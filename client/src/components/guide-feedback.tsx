import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface GuideFeedbackProps {
  projectId?: number | null;
  userId?: string;
}

/**
 * Lightweight inline thumbs up/down feedback for AI-generated repair guides.
 * One tap = submitted. No friction. Logs to the feedback table with isHelpful + mapped rating.
 * Works on both dark (project-detail) and light (repair-detail) themed pages.
 */
export function GuideFeedback({ projectId, userId }: GuideFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState<boolean | null>(null);
  const { toast } = useToast();

  const feedbackMutation = useMutation({
    mutationFn: async (isHelpful: boolean) => {
      const response = await apiRequest("POST", "/api/feedback", {
        projectId: projectId || null,
        userId: userId || null,
        rating: isHelpful ? 5 : 1, // Map thumbs up/down to star rating for analytics
        isHelpful,
        comments: "",
        pagePath: window.location.pathname,
        context: { source: "guide-feedback-inline", type: "thumbs" },
      });
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Thanks for the feedback!",
        description: "This helps us improve our repair guides.",
      });
    },
    onError: () => {
      toast({
        title: "Couldn't save feedback",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFeedback = (isHelpful: boolean) => {
    if (feedbackMutation.isPending || submitted) return;
    setSelectedValue(isHelpful);
    feedbackMutation.mutate(isHelpful);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-muted/50 border border-border">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          selectedValue ? 'bg-green-500/15' : 'bg-red-500/15'
        }`}>
          {selectedValue ? (
            <ThumbsUp className="w-4 h-4 text-green-500" />
          ) : (
            <ThumbsDown className="w-4 h-4 text-red-500" />
          )}
        </div>
        <p className="text-muted-foreground text-sm">Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-5 px-5 rounded-xl bg-muted/50 border border-border">
      <p className="text-muted-foreground text-sm font-medium">Was this repair guide helpful?</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleFeedback(true)}
          disabled={feedbackMutation.isPending}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background border border-border text-foreground/70 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-sm font-medium disabled:opacity-50"
        >
          <ThumbsUp className="w-4 h-4" />
          Yes
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={feedbackMutation.isPending}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background border border-border text-foreground/70 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 text-sm font-medium disabled:opacity-50"
        >
          <ThumbsDown className="w-4 h-4" />
          No
        </button>
      </div>
    </div>
  );
}
