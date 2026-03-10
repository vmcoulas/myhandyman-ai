import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Tools() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl border bg-background shadow-sm">
          <Wrench className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Tools</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quick helpers for builders. More coming soon.
          </p>
        </div>
      </div>

      <div className="card-premium rounded-2xl p-6">
        <p className="text-sm text-muted-foreground">
          We’re building a small set of workshop utilities (cut list helpers, unit
          conversion, and materials calculators).
        </p>
        <div className="mt-4">
          <Button variant="outline" className="min-h-11">
            Suggest a tool
          </Button>
        </div>
      </div>
    </div>
  );
}
