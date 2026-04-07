/**
 * Centralized conversion event tracking for MyHandyman.
 *
 * Fires events to all three platforms:
 *   - Google Analytics 4 (GA4)  via gtag()
 *   - Meta Pixel               via fbq()
 *   - TikTok Pixel             via ttq.track()
 *
 * Funnel events:
 *   1. photo_upload          — user submits a photo or text description
 *   2. repair_plan_generated — AI returns a diagnosis / repair plan
 *   3. premium_upgrade_click — user clicks the upgrade / checkout button
 *   4. premium_purchase_complete — Stripe redirects back with ?premium=success
 *
 * All calls are best-effort (never throw).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ttq?: { track: (...args: any[]) => void };
  }
}

// ── helpers ──────────────────────────────────────────────────────────

function ga4(eventName: string, params?: Record<string, any>) {
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // tracking should never block the app
  }
}

function meta(eventName: string, params?: Record<string, any>) {
  try {
    window.fbq?.("track", eventName, params);
  } catch {
    // noop
  }
}

function tiktok(eventName: string, params?: Record<string, any>) {
  try {
    window.ttq?.track(eventName, params);
  } catch {
    // noop
  }
}

// ── public API ───────────────────────────────────────────────────────

/**
 * User submitted a photo or text description for analysis.
 */
export function trackPhotoUpload(params?: { method?: "photo" | "text" | "quick_repair" }) {
  const p = { upload_method: params?.method ?? "photo" };
  ga4("photo_upload", p);
  meta("Lead", { content_name: "photo_upload", ...p });
  tiktok("SubmitForm", { content_name: "photo_upload", ...p });
}

/**
 * AI successfully returned a repair plan / diagnosis.
 */
export function trackRepairPlanGenerated(params?: {
  projectTitle?: string | null;
  confidence?: string | number | null;
}) {
  const p = {
    project_title: params?.projectTitle ?? "",
    confidence: params?.confidence ?? "",
  };
  ga4("repair_plan_generated", p);
  meta("ViewContent", { content_name: "repair_plan", ...p });
  tiktok("ViewContent", { content_name: "repair_plan", ...p });
}

/**
 * User clicked the premium upgrade / checkout button.
 */
export function trackPremiumUpgradeClick() {
  ga4("premium_upgrade_click");
  meta("InitiateCheckout", { content_name: "premium_upgrade" });
  tiktok("InitiateCheckout", { content_name: "premium_upgrade" });
}

/**
 * Stripe checkout completed — user returned with ?premium=success.
 */
export function trackPremiumPurchaseComplete() {
  ga4("premium_purchase_complete", { value: 4.99, currency: "USD" });
  meta("Purchase", { value: 4.99, currency: "USD", content_name: "premium_subscription" });
  tiktok("CompletePayment", { value: 4.99, currency: "USD", content_name: "premium_subscription" });
}

/**
 * User submitted their email for lead capture / newsletter.
 */
export function trackLeadCapture() {
  ga4("lead_capture", { method: "email" });
  meta("CompleteRegistration", { content_name: "email_signup" });
  tiktok("Subscribe", { content_name: "email_signup" });
}
