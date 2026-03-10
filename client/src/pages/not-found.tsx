import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full flex items-center justify-center py-16">
      <Card className="w-full max-w-md mx-4 card-premium">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-3 items-start">
            <AlertCircle className="h-7 w-7 text-destructive" />
            <h1 className="text-2xl font-extrabold text-foreground">Page not found</h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            That route doesn’t exist yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
