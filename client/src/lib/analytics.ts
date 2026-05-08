/**
 * MyHandyman Conversion Event Tracking
 *
 * Fires custom events on GA4, Meta Pixel, and TikTok Pixel
 * for all funnel steps:
 *   1. page_view              — every SPA route change (wouter doesn't trigger reload)
 *   2. photo_upload           — user submits a photo or text description
 *   3. repair_plan_generated  — AI returns a repair plan
 *   4. premium_upgrade_click  — user clicks upgrade/checkout
 *   5. affiliate_click        — user clicks an Amazon affiliate link
 *   6. purchase_complete      — Stripe checkout success (thank-you page)
 *   7. email_capture          — user submits email for newsletter
 *
 * Event mapping:
 *   GA4               | Meta Pixel         | TikTok Pixel
 *   ------------------+--------------------+------------------
 *   page_view         | PageView           | (auto via ttq.page)
 *   photo_upload      | Lead               | SubmitForm
 *   repair_plan_gen   | ViewContent        | ViewContent
 *   upgrade_click     | InitiateCheckout   | InitiateCheckout
 *   affiliate_click   | (custom)           | ClickButton
 *   purchase_complete | Purchase           | CompletePayment
 *   email_capture     | CompleteRegistration | Subscribe
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, any>) => void;
    };
  }
}

function ga4(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
}

function meta(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
}

function tiktok(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track(event, params);
  }
}

// --- Funnel Events ---

/**
 * SPA route-change pageview. Call this on every wouter `location` change.
 * GA4's default config only tracks the initial URL — on a SPA, subsequent
 * route changes produce ZERO pageviews without this. This is the single
 * biggest missing signal for "which pages get traffic."
 *
 * `sendToMeta` defaults to true (we want per-route PageView events in Meta).
 */
export function trackPageView(path: string, title?: string) {
  ga4('page_view', {
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.origin + path : path,
    page_title: title || (typeof document !== 'undefined' ? document.title : undefined),
  });
  // Meta Pixel custom PageView so route changes show up in Events Manager.
  meta('PageView');
  // TikTok fires `page()` automatically on its pixel init; no per-route call
  // needed to avoid double-counting.
}

/**
 * User clicked an Amazon affiliate link. This is the entire affiliate
 * revenue funnel — without this event, we have NO visibility into which
 * guides/materials actually drive click-through.
 *
 * `source` = page slug or page name (e.g. "repair:fix-running-toilet",
 * "tools:plumbing"). `material` = the product name as shown. `search` =
 * the Amazon search term used in the URL.
 */
export function trackAffiliateClick(source: string, material: string, search: string) {
  ga4('affiliate_click', {
    event_category: 'affiliate',
    event_label: material,
    source,
    material,
    search_term: search,
    // Assign a nominal value so affiliate clicks rank in GA4's value-based reports.
    // Not revenue — just a prioritization signal.
    value: 1,
  });
  meta('AffiliateClick', {
    content_name: material,
    source,
    content_category: 'amazon_affiliate',
  });
  tiktok('ClickButton', {
    content_type: 'affiliate_link',
    description: `${source} → ${material}`,
  });
}


/**
 * User submits a photo for diagnosis or a text description.
 * This is the top-of-funnel activation event.
 */
export function trackPhotoUpload(method: 'photo' | 'text' = 'photo') {
  ga4('photo_upload', {
    event_category: 'engagement',
    event_label: method,
    method,
  });
  meta('Lead', {
    content_name: 'photo_upload',
    content_category: 'diagnosis',
  });
  tiktok('SubmitForm', {
    content_type: 'diagnosis_request',
    description: `User submitted a ${method} diagnosis`,
  });
}

/**
 * AI successfully returns a repair plan.
 * Key activation moment — user got value.
 */
export function trackRepairPlanGenerated(repairType?: string) {
  ga4('repair_plan_generated', {
    event_category: 'engagement',
    event_label: repairType || 'unknown',
    content_type: repairType || 'repair_plan',
  });
  meta('ViewContent', {
    content_name: 'repair_plan',
    content_category: repairType || 'diagnosis',
  });
  tiktok('ViewContent', {
    content_type: 'repair_plan',
    description: repairType || 'AI repair plan generated',
  });
}

/**
 * User clicks to upgrade to premium.
 * Intent signal before Stripe checkout.
 */
export function trackPremiumUpgradeClick() {
  ga4('premium_upgrade_click', {
    event_category: 'ecommerce',
    event_label: 'upgrade_button',
  });
  meta('InitiateCheckout', {
    content_name: 'premium_subscription',
    currency: 'USD',
    value: 9.99,
  });
  tiktok('InitiateCheckout', {
    content_type: 'premium_subscription',
    value: 9.99,
    currency: 'USD',
  });
}

/**
 * Stripe checkout completed — user is now premium.
 * Fires on the thank-you page.
 */
export function trackPurchaseComplete(value: number = 9.99) {
  ga4('purchase', {
    event_category: 'ecommerce',
    event_label: 'premium_subscription',
    currency: 'USD',
    value,
    transaction_id: `mh_${Date.now()}`,
  });
  meta('Purchase', {
    content_name: 'premium_subscription',
    currency: 'USD',
    value,
  });
  tiktok('CompletePayment', {
    content_type: 'premium_subscription',
    value,
    currency: 'USD',
  });
}

/**
 * User captures email (lead magnet).
 * Secondary conversion event.
 */
export function trackEmailCapture() {
  ga4('email_capture', {
    event_category: 'engagement',
    event_label: 'newsletter_signup',
  });
  meta('CompleteRegistration', {
    content_name: 'email_capture',
  });
  tiktok('Subscribe', {
    content_type: 'newsletter',
  });
}

/**
 * Vertical landing page viewed — used for the Day 60 (2026-06-21) vertical
 * decision (South FL / renters / pre-2000 homes). Fires alongside the
 * auto page_view so GA4 can segment session data by vertical via a
 * dedicated event in addition to page_path.
 */
export function trackVerticalView(vertical: 'florida' | 'renter' | 'older-home') {
  ga4('vertical_view', {
    event_category: 'vertical',
    event_label: vertical,
    vertical,
  });
}
