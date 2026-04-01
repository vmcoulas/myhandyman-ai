import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Check iOS (Safari doesn't support beforeinstallprompt)
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIos(ios);

    // Check if user previously dismissed (respect for 7 days)
    const dismissedAt = localStorage.getItem("pwa-install-dismissed");
    if (dismissedAt) {
      const daysSince =
        (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        setDismissed(true);
        return;
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  // Don't show if already installed, dismissed, or no prompt available
  if (isStandalone || dismissed) return null;

  // iOS: show manual instructions
  if (isIos) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-in slide-in-from-bottom-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary bg-opacity-10 rounded-full p-2 flex-shrink-0">
            <Download className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900">
              Install MyHandyman
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Tap the share button, then "Add to Home Screen" for the full app
              experience.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Android/Chrome: show install button
  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary bg-opacity-10 rounded-full p-2 flex-shrink-0">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900">
            Install MyHandyman
          </p>
          <p className="text-xs text-gray-600">
            Add to your home screen for instant access
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDismiss}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
          >
            Later
          </button>
          <Button
            onClick={handleInstall}
            size="sm"
            className="bg-primary text-white hover:bg-orange-600"
          >
            Install
          </Button>
        </div>
      </div>
    </div>
  );
}
