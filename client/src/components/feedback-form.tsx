import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Star, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Feedback } from "@/lib/types";

interface FeedbackFormProps {
  projectId?: number | null;
  userId?: number;
  pagePath?: string;
  stepNumber?: number;
  context?: Record<string, any>;
  onFeedbackSubmitted?: (feedback: Feedback) => void;
}

export function FeedbackForm({ projectId, userId, pagePath, stepNumber, context, onFeedbackSubmitted }: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const feedbackMutation = useMutation({
    mutationFn: async (feedbackData: {
      projectId?: number | null;
      userId?: number;
      rating: number;
      isHelpful: boolean | null;
      comments: string;
      pagePath?: string;
      stepNumber?: number;
      context?: Record<string, any>;
    }) => {
      const response = await apiRequest("POST", "/api/feedback", feedbackData);
      return response.json();
    },
    onSuccess: (feedback: Feedback) => {
      setIsSubmitted(true);
      onFeedbackSubmitted?.(feedback);
      toast({
        title: "Thank you!",
        description: "Your feedback helps us create better building instructions.",
      });
    },
    onError: () => {
      toast({
        title: "Feedback Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please give us a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    feedbackMutation.mutate({
      projectId: projectId ?? null,
      userId,
      rating,
      isHelpful,
      comments: comments.trim() || "",
      pagePath: pagePath || window.location.pathname,
      stepNumber: typeof stepNumber === "number" ? stepNumber : undefined,
      context,
    });
  };

  if (isSubmitted) {
    return (
      <Card className="bg-accent bg-opacity-10 border-accent border-opacity-20">
        <CardContent className="pt-6">
          <div className="text-center">
            <ThumbsUp className="text-accent mx-auto mb-2 w-8 h-8" />
            <h4 className="font-semibold text-accent mb-1">Thank You!</h4>
            <p className="text-sm text-gray-600">Your feedback has been submitted.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <MessageCircle className="text-primary mr-2 w-5 h-5" />
          How was this project?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Rate this project:
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 transition-colors ${
                  star <= rating ? "text-warning" : "text-gray-300 hover:text-warning"
                }`}
              >
                <Star
                  className="w-6 h-6"
                  fill={star <= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Helpful/Not Helpful */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Were these instructions helpful?
          </label>
          <div className="flex space-x-2">
            <Button
              variant={isHelpful === true ? "default" : "outline"}
              size="sm"
              onClick={() => setIsHelpful(true)}
              className={isHelpful === true ? "bg-accent hover:bg-accent/90" : ""}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Yes, helpful
            </Button>
            <Button
              variant={isHelpful === false ? "default" : "outline"}
              size="sm"
              onClick={() => setIsHelpful(false)}
              className={isHelpful === false ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              <ThumbsDown className="w-4 h-4 mr-2" />
              Not helpful
            </Button>
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Any additional comments? (optional)
          </label>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Share your thoughts on the project difficulty, missing materials, or suggestions for improvement..."
            className="min-h-[80px]"
            maxLength={500}
          />
          {comments.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {comments.length}/500 characters
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={feedbackMutation.isPending || rating === 0}
          className="w-full bg-primary text-white hover:bg-orange-600"
        >
          {feedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
        </Button>
      </CardContent>
    </Card>
  );
}