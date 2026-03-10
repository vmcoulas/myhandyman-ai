import { useState } from "react";
import { Crown, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";

interface BuildLimitCheckerProps {
  userId: number | null;
  difficulty?: string;
  onProceed: () => void;
  onUpgrade?: () => void;
}

interface BuildLimitResponse {
  canBuild: boolean;
  limitMessage: string;
  upgradeRequired: boolean;
  user: {
    buildsUsed: number;
    easyBuildsUsed: number;
    maxBuilds: number;
    isPremium: boolean;
  };
}

export function BuildLimitChecker({ userId, difficulty = "Easy", onProceed, onUpgrade }: BuildLimitCheckerProps) {
  const [checking, setChecking] = useState(false);
  const [limitInfo, setLimitInfo] = useState<BuildLimitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkLimit = async () => {
    if (!userId) {
      // For anonymous users, show upgrade prompt for non-easy builds
      if (difficulty.toLowerCase() !== 'easy') {
        setLimitInfo({
          canBuild: false,
          limitMessage: "Medium and Hard builds require a Premium account. Sign up to get started!",
          upgradeRequired: true,
          user: {
            buildsUsed: 0,
            easyBuildsUsed: 0,
            maxBuilds: 0,
            isPremium: false
          }
        });
      } else {
        onProceed();
      }
      return;
    }

    setChecking(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('userId', userId.toString());
      formData.append('difficulty', difficulty);
      
      const response = await fetch("/api/check-build-limit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, difficulty }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json() as BuildLimitResponse;

      if (data.canBuild) {
        onProceed();
      } else {
        setLimitInfo(data);
      }
    } catch (err) {
      setError("Failed to check build limit. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  // Show limit reached message
  if (limitInfo && !limitInfo.canBuild) {
    const { user } = limitInfo;
    
    return (
      <Card className="bg-warning bg-opacity-10 border-warning border-opacity-20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-warning bg-opacity-20 rounded-full p-3">
              {limitInfo.upgradeRequired ? <Lock className="text-warning w-6 h-6" /> : <AlertCircle className="text-warning w-6 h-6" />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-warning mb-2">
                {limitInfo.upgradeRequired ? "Premium Required" : "Build Limit Reached"}
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {limitInfo.limitMessage}
              </p>

              {/* Usage Stats for Free Users */}
              {!user.isPremium && userId && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Your Usage</span>
                    <Badge variant="outline" className="text-xs">
                      Free Plan
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Easy builds used:</span>
                      <span>{user.easyBuildsUsed} / 3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium/Hard builds:</span>
                      <span className="text-warning">Premium only</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {limitInfo.upgradeRequired && (
                  <Button
                    onClick={onUpgrade}
                    className="bg-primary text-white hover:bg-orange-600"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Premium - $4.99/month
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setLimitInfo(null)}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="bg-destructive bg-opacity-10 border-destructive border-opacity-20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-destructive w-5 h-5" />
            <div className="flex-1">
              <p className="text-sm text-gray-700">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={checkLimit}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Initial check button
  return (
    <Button
      onClick={checkLimit}
      disabled={checking}
      className="w-full"
      size="lg"
    >
      {checking ? "Checking limits..." : `Analyze Photo (${difficulty} Build)`}
    </Button>
  );
}