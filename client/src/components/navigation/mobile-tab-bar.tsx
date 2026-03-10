import type { ComponentType } from "react";
import { Link, useLocation } from "wouter";
import { Home, Hammer, BookOpen, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  /**
   * When a page has nested routes (e.g. /project/:id), match against these prefixes.
   */
  matchPrefixes?: string[];
};

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/build", label: "Build", icon: Hammer },
  {
    href: "/projects",
    label: "Projects",
    icon: BookOpen,
    matchPrefixes: ["/project/"],
  },
  { href: "/tools", label: "Tools", icon: Wrench },
];

export function MobileTabBar() {
  const [location] = useLocation();

  const isActive = (tab: Tab) => {
    if (location === tab.href) return true;
    if (tab.matchPrefixes?.some((p) => location.startsWith(p))) return true;
    if (tab.href !== "/" && location.startsWith(tab.href + "/")) return true;
    return false;
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-2">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "group flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-5 transition-transform group-active:scale-95",
                  active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span className={cn(active ? "text-primary" : "")}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
