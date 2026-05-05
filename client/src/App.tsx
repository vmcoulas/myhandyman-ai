import { useState, useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Build from "@/pages/build";
import Project from "@/pages/project";
import ProjectDetail from "@/pages/project-detail";
import Tools from "@/pages/tools";
import SupportLanding from "@/pages/support";
import SupportArticlePage from "@/pages/support/article";
import NotFound from "@/pages/not-found";
import RepairsListing from "@/pages/repairs";
import RepairDetail from "@/pages/repairs/repair-detail";
import Privacy from "@/pages/privacy";
import PrivacyChoices from "@/pages/privacy-choices";
import Terms from "@/pages/terms";
import ThankYou from "@/pages/thank-you";
import LinksPage from "@/pages/links";
import { FeedbackProvider } from "@/lib/feedback-context";
import { AppShell } from "@/components/navigation/app-shell";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { Onboarding } from "@/components/onboarding";
import { isNative } from "@/lib/platform";
import { initNativeApp } from "@/lib/native-init";
import { initPurchases } from "@/lib/native-purchases";
import { trackPageView } from "@/lib/analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/build" component={Build} />
      <Route path="/projects" component={Project} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/tools" component={Tools} />
      <Route path="/support" component={SupportLanding} />
      <Route path="/support/:slug" component={SupportArticlePage} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/privacy-choices" component={PrivacyChoices} />
      <Route path="/terms" component={Terms} />
      <Route path="/repairs" component={RepairsListing} />
      <Route path="/repairs/:slug" component={RepairDetail} />
      <Route path="/thank-you" component={ThankYou} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem("myhandyman_onboarded")
  );
  const [location] = useLocation();

  // Initialize native plugins (status bar, splash screen, back button, etc.)
  // and RevenueCat for iOS in-app purchases.
  useEffect(() => {
    initNativeApp();
    initPurchases();
  }, []);

  // SPA pageview tracking — wouter changes location without a page reload,
  // so GA4's default snippet only ever sees the initial URL. Fire a manual
  // page_view on every route change. Skip on the very first mount because
  // the gtag("config", ...) snippet in index.html already sent that one.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackPageView(location);
  }, [location]);

  // /links is a standalone link-in-bio page — no app shell (header/footer/tabs)
  if (location === "/links") {
    return (
      <QueryClientProvider client={queryClient}>
        <LinksPage />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FeedbackProvider>
          <Toaster />
          {showOnboarding && (
            <Onboarding onComplete={() => setShowOnboarding(false)} />
          )}
          <AppShell>
            <Router />
            {/* Only show PWA install prompt on web, not inside native apps */}
            {!isNative && <PwaInstallPrompt />}
          </AppShell>
        </FeedbackProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
