import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectRatingProps {
  averageRating: string | null;
  totalRatings: number | null;
  ratingPercentage: number | null;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
}

export function ProjectRating({ 
  averageRating, 
  totalRatings, 
  ratingPercentage, 
  size = "md",
  showPercentage = true 
}: ProjectRatingProps) {
  const rating = parseFloat(averageRating || "0");
  const count = totalRatings || 0;
  const percentage = ratingPercentage || 0;

  if (count === 0) {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${
                size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"
              } text-gray-300`}
              fill="none"
            />
          ))}
        </div>
        <span className={`text-gray-500 ${
          size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
        }`}>
          No ratings yet
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Star Rating */}
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${
                size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4"
              } ${
                star <= Math.round(rating) 
                  ? "text-warning fill-warning" 
                  : "text-gray-300"
              }`}
              fill={star <= Math.round(rating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <span className={`font-medium ${
          size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
        }`}>
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Rating Count */}
      <span className={`text-gray-600 ${
        size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
      }`}>
        ({count} rating{count !== 1 ? "s" : ""})
      </span>

      {/* Percentage Badge */}
      {showPercentage && percentage > 0 && (
        <Badge 
          variant="secondary" 
          className={`bg-accent bg-opacity-10 text-accent ${
            size === "sm" ? "text-xs px-1.5 py-0.5" : ""
          }`}
        >
          {percentage}%
        </Badge>
      )}
    </div>
  );
}

// Component for displaying project rating in a compact card format
export function ProjectRatingCard({ 
  averageRating, 
  totalRatings, 
  ratingPercentage 
}: {
  averageRating: string | null;
  totalRatings: number | null;
  ratingPercentage: number | null;
}) {
  const rating = parseFloat(averageRating || "0");
  const count = totalRatings || 0;
  const percentage = ratingPercentage || 0;

  if (count === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-3 text-center">
        <div className="flex justify-center mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 text-gray-300" fill="none" />
          ))}
        </div>
        <p className="text-xs text-gray-500">Not rated yet</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-warning/10 to-accent/10 rounded-lg p-3 text-center border border-warning/20">
      <div className="flex justify-center mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating) 
                ? "text-warning fill-warning" 
                : "text-gray-300"
            }`}
            fill={star <= Math.round(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-sm text-dark">
          {rating.toFixed(1)} / 5.0
        </p>
        <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
          {percentage}% Success Rate
        </Badge>
        <p className="text-xs text-gray-600">
          {count} builder{count !== 1 ? "s" : ""} rated this
        </p>
      </div>
    </div>
  );
}