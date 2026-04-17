/**
 * Native In-App Purchases via RevenueCat.
 *
 * Apple requires ALL digital subscriptions sold inside an iOS app to use
 * StoreKit / IAP (not Stripe). RevenueCat abstracts StoreKit and gives us
 * entitlement state, restore, cancel, receipt validation, and analytics in one SDK.
 *
 * Web traffic continues to use Stripe ($9.99/mo). This module is a no-op on web.
 *
 * Flow:
 *   1. initPurchases() — call once on app boot (iOS only).
 *   2. getPackages()   — fetch current offerings (monthly, annual).
 *   3. purchasePro()   — trigger the Apple IAP sheet.
 *   4. hasProAccess()  — check entitlement (cached locally by RevenueCat).
 *   5. restorePurchases() — required by Apple; must be surfaced in UI.
 */
import { isIOS, isNative } from './platform';

// The entitlement identifier configured in RevenueCat dashboard.
// MUST match exactly. This is what we check to gate Pro features on iOS.
export const PRO_ENTITLEMENT_ID = 'pro';

// RevenueCat public SDK keys — safe to ship in the client bundle.
// Populate via VITE_REVENUECAT_IOS_KEY once the RC project is created.
const RC_IOS_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY as string | undefined;

let initialized = false;

/**
 * Boot RevenueCat. Safe to call multiple times.
 * Call once from App.tsx after initNativeApp().
 */
export async function initPurchases(appUserId?: string): Promise<void> {
  if (!isNative || !isIOS) return;
  if (initialized) return;

  if (!RC_IOS_KEY) {
    console.warn('[purchases] VITE_REVENUECAT_IOS_KEY not set — IAP disabled');
    return;
  }

  try {
    const { Purchases, LOG_LEVEL } = await import('@revenuecat/purchases-capacitor');
    await Purchases.setLogLevel({ level: LOG_LEVEL.INFO });
    await Purchases.configure({
      apiKey: RC_IOS_KEY,
      appUserID: appUserId,
    });
    initialized = true;
  } catch (err) {
    console.error('[purchases] init failed', err);
  }
}

/**
 * Returns true if the user currently has the Pro entitlement.
 * Checks cached entitlement state first; falls back to server check.
 */
export async function hasProAccess(): Promise<boolean> {
  if (!isNative || !isIOS) return false;
  if (!initialized) return false;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { customerInfo } = await Purchases.getCustomerInfo();
    return Boolean(customerInfo.entitlements.active[PRO_ENTITLEMENT_ID]);
  } catch (err) {
    console.error('[purchases] hasProAccess failed', err);
    return false;
  }
}

/**
 * Fetch current offerings from RevenueCat.
 * Offerings map to products configured in App Store Connect.
 */
export async function getOfferings() {
  if (!isNative || !isIOS || !initialized) return null;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (err) {
    console.error('[purchases] getOfferings failed', err);
    return null;
  }
}

/**
 * Trigger the Apple IAP sheet for the monthly Pro package.
 * Returns true on successful purchase, false on cancel/error.
 */
export async function purchaseProMonthly(): Promise<boolean> {
  if (!isNative || !isIOS || !initialized) return false;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const current = await getOfferings();
    const pkg = current?.monthly;
    if (!pkg) {
      console.error('[purchases] no monthly package configured');
      return false;
    }
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
    return Boolean(customerInfo.entitlements.active[PRO_ENTITLEMENT_ID]);
  } catch (err: any) {
    // User cancel is not an error in the business sense.
    if (err?.userCancelled) return false;
    console.error('[purchases] purchase failed', err);
    return false;
  }
}

/**
 * Restore purchases (Apple requirement — users can re-download the app or
 * switch devices and must be able to recover their subscription).
 */
export async function restorePurchases(): Promise<boolean> {
  if (!isNative || !isIOS || !initialized) return false;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { customerInfo } = await Purchases.restorePurchases();
    return Boolean(customerInfo.entitlements.active[PRO_ENTITLEMENT_ID]);
  } catch (err) {
    console.error('[purchases] restore failed', err);
    return false;
  }
}

/**
 * Convenience: unified "start Pro" entrypoint for paywall UI.
 * On iOS, triggers the Apple IAP sheet via RevenueCat.
 * On web, returns false so the caller can redirect to Stripe checkout.
 */
export async function startProFlow(): Promise<boolean> {
  if (isIOS && isNative) {
    return purchaseProMonthly();
  }
  return false;
}
