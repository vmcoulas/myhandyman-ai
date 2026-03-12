import { Crown, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { UsageInfo } from "@/lib/types";

interface UsageLimitBannerProps {
  usage: UsageInfo;
  onUpgrade?: () => void;
}

export function UsageLimitBanner({ usage, onUpgrade }: UsageLimitBannerProps) {
  const progressPercentage = (usage.repairsUsed / usage.maxRepairs) * 100;

  // Don't show banner if user is premium and hasn't hit any limits
  if (usage.isPremium && !usage.isLimitReached) {
    return null;
  }

  // Show upgrade prompt when limit is reached
  if (usage.isLimitReached) {
    return (
      <Card className="bg-warning bg-opacity-10 border-warning border-opacity-20 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-warning bg-opacity-20 rounded-full p-3">
              <AlertCircle className="text-warning w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-warning mb-2">
                You've reached your build limit
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {!usage.isPremium 
                  ? `You've used all ${usage.maxEasyRepairs} free free repairs this month. Go Pro for unlimited repairs of all difficulties!`
                  : `You've used all ${usage.maxRepairs} Premium repairs this month.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={onUpgrade}
                  className="bg-primary text-white hover:bg-orange-600"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Go Pro — $4.99/month
                </Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show usage progress for free users approaching limit
  if (!usage.isPremium && usage.easyRepairsUsed > 0) {
    const easyProgressPercentage = (usage.easyRepairsUsed / usage.maxEasyRepairs) * 100;
    const remainingEasy = usage.maxEasyRepairs - usage.easyRepairsUsed;
    const isNearLimit = remainingEasy <= 1;
    
    return (
      <Card className={`mb-6 ${
        isNearLimit 
          ? "bg-warning bg-opacity-10 border-warning border-opacity-20" 
          : "bg-blue-50 border-blue-200"
      }`}>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className={`rounded-full p-3 ${
              isNearLimit 
                ? "bg-warning bg-opacity-20" 
                : "bg-secondary bg-opacity-20"
            }`}>
              <Zap className={`w-5 h-5 ${
                isNearLimit ? "text-warning" : "text-secondary"
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-dark">
                  Free Easy Repairs: {usage.easyRepairsUsed} of {usage.maxEasyRepairs} used
                </h4>
                <span className="text-sm text-gray-600">
                  {remainingEasy} remaining
                </span>
              </div>
              <Progress value={easyProgressPercentage} className="mb-3 h-2" />
              <div className="text-xs text-gray-500 mb-2">
                Medium & Hard repairs require Premium subscription
              </div>
              
              {isNearLimit ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <p className="text-sm text-gray-700 flex-1">
                    Almost at your limit! Upgrade for unlimited repairs and pro features.
                  </p>
                  <Button
                    onClick={onUpgrade}
                    size="sm"
                    className="bg-primary text-white hover:bg-orange-600"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Go Pro
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Enjoying the app? 
                  <button
                    onClick={onUpgrade}
                    className="text-primary hover:underline ml-1"
                  >
                    Go Pro
                  </button> 
                  for unlimited repairs and export features.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}