/**
 * MyHandyman Conversion Event Tracking
 * 
 * Fires custom events on GA4, Meta Pixel, and TikTok Pixel
 * for all funnel steps:
 *   1. photo_upload     — user submits a photo or text description
 *   2. repair_plan_generated — AI returns a repair plan
 *   3. premium_upgrade_click — user clicks upgrade/checkout
 *   4. premium_purchase_complete — Stripe checkout success (thank-you page)
 *
 * Event mapping:
 *   GA4             | Meta Pixel         | TikTok Pixel
 *   ----------------+--------------------+------------------
 *   photo_upload     | Lead               | SubmitForm
 *   repair_plan_gen  | ViewContent        | ViewContent
 *   upgrade_click    | InitiateCheckout   | InitiateCheckout
 *   purchase_complete| Purchase           | CompletePayment
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
    value: 4.99,
  });
  tiktok('InitiateCheckout', {
    content_type: 'premium_subscription',
    value: 4.99,
    currency: 'USD',
  });
}

/**
 * Stripe checkout completed — user is now premium.
 * Fires on the thank-you page.
 */
export function trackPurchaseComplete(value: number = 4.99) {
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
