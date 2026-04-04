import { Link, useLocation } from "wouter";
import { BookOpen, Zap, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth, signInWithGoogle, signInWithApple, signOut } from "@/lib/auth";

export function Header() {
  const [location] = useLocation();
  const projectsActive = location === "/projects" || location.startsWith("/project/");
  const { user, isLoading } = useAuth();

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

            {!user && !isLoading && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-h-11 px-3"
                  >
                    <LogIn className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Sign in</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={signInWithGoogle} className="cursor-pointer">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signInWithApple} className="cursor-pointer">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Continue with Apple
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="min-h-11 px-3">
                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.firstName ?? "Profile"}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline ml-2">
                      {user.firstName ?? user.email ?? "Account"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/projects">
                      <BookOpen className="w-4 h-4 mr-2" />
                      My Repairs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!user?.isPremium && (
              <Button
                size="sm"
                className="min-h-11 bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90"
                onClick={async () => {
                  try {
                    const userId = user?.id ?? localStorage.getItem("anonymousUserId");
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
                <Zap className="w-4 h-4 mr-1.5" />
                <span className="sm:hidden">Go Pro</span>
                <span className="hidden sm:inline">Go Pro — $9.99/mo</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
