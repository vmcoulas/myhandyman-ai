/**
 * MyHandyman A/B Test Bucket Assignment
 *
 * Stable, cookie-based 50/50 bucket assignment for paywall copy tests.
 *
 * Why cookie-based (not localStorage):
 *   - Persists across SPA route changes AND across full reloads
 *   - Survives Stripe checkout round-trip (off-domain, then back)
 *   - Readable from server in future if we ever want SSR'd variant copy
 *
 * Why 50/50 random (not deterministic-from-userId):
 *   - Paywall is shown to anon users — no userId yet at first impression
 *   - We need bucket BEFORE upgrade_click fires (the conversion signal)
 *
 * Test framework:
 *   - First call to `getPaywallArm()` assigns + persists ('A' or 'B') and
 *     fires the GA4 `paywall_arm_assigned` event ONCE per device.
 *   - Subsequent calls read the same arm — stable across sessions.
 *   - `VITE_PAYWALL_AB_ENABLED` feature flag gates the whole thing.
 *     When false, returns 'control' and renders existing copy unchanged.
 *
 * Read framework (target window 2026-05-25 -> 2026-06-01):
 *   - paywall_view (arm: A|B)  ->  premium_upgrade_click (arm: A|B)  ->  purchase (arm: A|B)
 *   - Compare arm-A click-rate vs arm-B click-rate at the same $9.99 price.
 *   - If arm-B materially outperforms (>20% lift, p<0.10), the value-prop
 *     messaging is the lever, not the price -> Day 60 pricing decision tilts
 *     toward holding $9.99 with copy investment, not dropping price.
 *
 * Kill criteria:
 *   - Either arm < 50 paywall_view events after 7 days -> extend window 7 days.
 *   - Conversion drops >40% vs pre-test baseline -> flip flag off, investigate.
 */

export type PaywallArm = 'A' | 'B' | 'control';

const COOKIE_NAME = 'mh_paywall_arm';
const COOKIE_DAYS = 60; // Long enough to cover full 7-day test + read window

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Returns the user's paywall arm. Stable across sessions once assigned.
 * Returns 'control' if the feature flag is off — caller should render
 * existing copy unchanged.
 */
export function getPaywallArm(): PaywallArm {
  // Feature flag — default OFF. Vincent flips on by setting
  // VITE_PAYWALL_AB_ENABLED=true on Railway env (target: 2026-05-25).
  const enabled = import.meta.env.VITE_PAYWALL_AB_ENABLED === 'true';
  if (!enabled) return 'control';

  // Dev override first (devtools-driven QA)
  const override = getOverrideArm();
  if (override) return override;

  const existing = readCookie(COOKIE_NAME);
  if (existing === 'A' || existing === 'B') {
    return existing;
  }

  // First impression on this device — assign and persist.
  const arm: PaywallArm = Math.random() < 0.5 ? 'A' : 'B';
  writeCookie(COOKIE_NAME, arm, COOKIE_DAYS);

  // Fire one-time assignment event so we can audit bucket balance in GA4.
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'paywall_arm_assigned', {
      event_category: 'experiment',
      event_label: arm,
      arm,
      experiment_id: 'paywall_copy_v1',
    });
  }

  return arm;
}

/**
 * Test helper — force a specific arm for QA. Only respected in dev builds.
 * Usage from devtools console:
 *   localStorage.setItem('mh_paywall_arm_override', 'B'); location.reload();
 */
export function getOverrideArm(): PaywallArm | null {
  if (typeof window === 'undefined') return null;
  if (!import.meta.env.DEV) return null;
  const override = window.localStorage?.getItem('mh_paywall_arm_override');
  return override === 'A' || override === 'B' ? override : null;
}
