import { Link, useLocation } from "wouter";
import { Wrench, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();
  const projectsActive = location === "/projects" || location.startsWith("/project/");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center space-x-3 no-text-decoration group min-w-0">
            <div className="relative">
              <img src="/logo.png" alt="MyHandyman AI" className="h-12 w-12 rounded-lg object-contain" />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <h1 className="text-lg sm:text-xl font-extrabold leading-tight tracking-tight">
                <span className="text-foreground">MyHandyman</span>
                <span className="text-muted-foreground">.ai</span>
              </h1>
              <p className="hidden sm:block text-xs text-muted-foreground leading-tight">
                Your AI-powered home repair assistant
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                "min-h-11 px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60",
                projectsActive && "text-foreground"
              )}
            >
              <Link href="/projects" aria-current={projectsActive ? "page" : undefined}>
                <BookOpen className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">My Repairs</span>
              </Link>
            </Button>

            <Button
              size="sm"
              className="min-h-11 bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90"
              onClick={async () => {
                try {
                  const userId = localStorage.getItem("myhandyman_user_id");
                  const res = await fetch("/api/stripe/create-checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                  });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                } catch { /* silent */ }
              }}
            >
              <Zap className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Go Pro — $4.99/mo</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
