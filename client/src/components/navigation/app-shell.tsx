import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileTabBar } from "@/components/navigation/mobile-tab-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />

      {/*
        Bottom tabs occupy space on mobile. We pad the app content so
        important CTAs never hide behind the bar.
      */}
      <div className="pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-0">
        {children}
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>

      <MobileTabBar />
    </div>
  );
}
