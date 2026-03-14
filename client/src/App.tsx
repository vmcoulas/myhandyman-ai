import { Switch, Route } from "wouter";
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
import Terms from "@/pages/terms";
import { FeedbackProvider } from "@/lib/feedback-context";
import { AppShell } from "@/components/navigation/app-shell";

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
      <Route path="/terms" component={Terms} />
      <Route path="/repairs" component={RepairsListing} />
      <Route path="/repairs/:slug" component={RepairDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FeedbackProvider>
          <Toaster />
          <AppShell>
            <Router />
          </AppShell>
        </FeedbackProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
