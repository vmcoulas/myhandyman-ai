import React, { createContext, useContext, useMemo, useState } from "react";

export type FeedbackContextState = {
  projectId?: number;
  stepNumber?: number;
};

type FeedbackContextValue = {
  ctx: FeedbackContextState;
  setContext: (next: FeedbackContextState) => void;
  patchContext: (patch: Partial<FeedbackContextState>) => void;
  clearContext: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [ctx, setCtx] = useState<FeedbackContextState>({});

  const value = useMemo<FeedbackContextValue>(
    () => ({
      ctx,
      setContext: (next) => setCtx(next),
      patchContext: (patch) => setCtx((prev) => ({ ...prev, ...patch })),
      clearContext: () => setCtx({}),
    }),
    [ctx]
  );

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export function useFeedbackContext() {
  const value = useContext(FeedbackContext);
  if (!value) throw new Error("useFeedbackContext must be used within FeedbackProvider");
  return value;
}
