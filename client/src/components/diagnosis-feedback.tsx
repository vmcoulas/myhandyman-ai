import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, XCircle, AlertTriangle, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface DiagnosisFeedbackProps {
  projectId?: number | null;
  userId?: string;
}

/**
 * Prominent post-diagnosis feedback component.
 * Shows "Did this fix your problem?" with Yes / No / Partially options,
 * then an optional text box for improvement suggestions.
 * Placed prominently after a repair guide renders.
 */
export function DiagnosisFeedback({ projectId, userId }: DiagnosisFeedbackProps) {
  const [step, setStep] = useState<'ask' | 'comment' | 'done'>('ask');
  const [outcome, setOutcome] = useState<'yes' | 'no' | 'partially' | null>(null);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const feedbackMutation = useMutation({
    mutationFn: async (data: { outcome: string; comment: string }) => {
      const response = await apiRequest("POST", "/api/feedback", {
        projectId: projectId || null,
        userId: userId || null,
        rating: data.outcome === 'yes' ? 5 : data.outcome === 'partially' ? 3 : 1,
        isHelpful: data.outcome === 'yes',
        comments: data.comment,
        pagePath: window.location.pathname,
        context: {
          source: "diagnosis-feedback",
          type: "outcome",
          outcome: data.outcome,
        },
      });
      return response.json();
    },
    onSuccess: () => {
      setStep('done');
      toast({
        title: "Thanks for the feedback!",
        description: "This helps us improve diagnosis accuracy.",
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

  const handleOutcome = (value: 'yes' | 'no' | 'partially') => {
    setOutcome(value);
    setStep('comment');
  };

  const handleSubmit = () => {
    if (!outcome) return;
    feedbackMutation.mutate({ outcome, comment: comment.trim() });
  };

  const handleSkip = () => {
    if (!outcome) return;
    feedbackMutation.mutate({ outcome, comment: '' });
  };

  if (step === 'done') {
    return (
      <div className="rounded-2xl bg-[#2FA3A0]/10 border border-[#2FA3A0]/20 p-6 text-center">
        <CheckCircle className="w-8 h-8 text-[#2FA3A0] mx-auto mb-2" />
        <p className="font-semibold text-foreground mb-1">Thanks for your feedback!</p>
        <p className="text-sm text-muted-foreground">Your input helps us improve MyHandyman for everyone.</p>
      </div>
    );
  }

  if (step === 'comment') {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h4 className="font-display text-lg font-bold text-foreground">
            {outcome === 'yes' ? 'Great! Anything we could improve?' : outcome === 'partially' ? 'What was missing or unclear?' : 'Sorry about that. What went wrong?'}
          </h4>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            outcome === 'yes'
              ? "Optional: Any suggestions for making this even better?"
              : outcome === 'partially'
              ? "What part didn't work or was unclear? This helps us improve..."
              : "What was wrong with the diagnosis or instructions? The more detail, the better we can fix it..."
          }
          className="w-full h-24 rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none mb-4"
          maxLength={500}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            disabled={feedbackMutation.isPending}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
          <Button
            onClick={handleSubmit}
            disabled={feedbackMutation.isPending}
            className="font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            {feedbackMutation.isPending ? 'Sending...' : 'Submit Feedback'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-6">
      <div className="text-center mb-5">
        <h4 className="font-display text-lg font-bold text-foreground mb-1">Did this fix your problem?</h4>
        <p className="text-sm text-muted-foreground">Your feedback helps the AI learn and improve.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleOutcome('yes')}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-green-500/40 hover:bg-green-500/5 transition-all group"
        >
          <CheckCircle className="w-7 h-7 text-muted-foreground group-hover:text-green-500 transition-colors" />
          <span className="text-sm font-medium text-foreground">Yes</span>
        </button>
        <button
          onClick={() => handleOutcome('partially')}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-yellow-500/40 hover:bg-yellow-500/5 transition-all group"
        >
          <AlertTriangle className="w-7 h-7 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
          <span className="text-sm font-medium text-foreground">Partially</span>
        </button>
        <button
          onClick={() => handleOutcome('no')}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-red-500/40 hover:bg-red-500/5 transition-all group"
        >
          <XCircle className="w-7 h-7 text-muted-foreground group-hover:text-red-500 transition-colors" />
          <span className="text-sm font-medium text-foreground">No</span>
        </button>
      </div>
    </div>
  );
}
