import * as React from "react";

import { cn } from "@/lib/utils";

export type StepperStep = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export function Stepper({
  steps,
  className,
}: {
  steps: StepperStep[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-3",
        className,
      )}
    >
      {steps.map((step, idx) => (
        <li
          key={idx}
          className="card-premium rounded-xl px-4 py-3"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
              {step.icon ?? (
                <span className="text-sm font-semibold">{idx + 1}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              {step.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
