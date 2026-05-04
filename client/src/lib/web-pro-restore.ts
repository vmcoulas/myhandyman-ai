/**
 * Web<->iOS subscription recovery (band-aid for iOS v1.0.0).
 *
 * If a user paid $9.99/mo on web and then installs the iOS app, their
 * device-local anonymousUserId won't match the Stripe-upgraded user record,
 * and they'll see the paywall. This helper lets them claim their existing
 * web Pro by entering the Stripe-checkout email.
 *
 * Flow:
 *   1. UI prompts user for the email used at Stripe checkout
 *   2. POST /api/users/restore-web-pro { email }
 *   3. On success, swap local anonymousUserId for the returned id
 *   4. Caller refetches /api/users/:id/usage; isPremium now true
 *
 * The server endpoint (a) refuses anon-* emails, (b) requires isPremium=true.
 * Full server-side RevenueCat customer-ID mapping is v1.0.1.
 */
import { setItemWithCache } from "@/lib/native-storage";

export type RestoreWebProResult =
  | { ok: true; userId: string; premiumExpiresAt: string | null }
  | { ok: false; reason: "invalid_email" | "not_found" | "network" };

/**
 * Validate an email shape before hitting the server. Cheap pre-flight.
 */
export function isPlausibleEmail(email: string): boolean {
  const e = email.trim();
  if (e.length < 5 || e.length > 254) return false;
  if (!e.includes("@")) return false;
  // Anon-generated emails are server-side rejected; reject locally for
  // a clearer error before the round trip.
  const lower = e.toLowerCase();
  if (lower.startsWith("anon-") && lower.endsWith("@myhandyman.ai")) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/**
 * Attempt to restore a web Pro subscription by email.
 * On success, replaces the locally-cached anonymousUserId so all subsequent
 * /api/users/:id/* calls return the upgraded user.
 */
export async function restoreWebPro(email: string): Promise<RestoreWebProResult> {
  const trimmed = email.trim();
  if (!isPlausibleEmail(trimmed)) {
    return { ok: false, reason: "invalid_email" };
  }

  let res: Response;
  try {
    res = await fetch("/api/users/restore-web-pro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed.toLowerCase() }),
    });
  } catch (err) {
    console.error("[restore-web-pro] network error:", err);
    return { ok: false, reason: "network" };
  }

  if (res.status === 404) return { ok: false, reason: "not_found" };
  if (!res.ok) return { ok: false, reason: "network" };

  let data: { userId?: string | number; premiumExpiresAt?: string | null };
  try {
    data = await res.json();
  } catch {
    return { ok: false, reason: "network" };
  }

  if (!data?.userId) return { ok: false, reason: "not_found" };

  const userId = String(data.userId);
  // Swap the local anonymousUserId so the rest of the app loads the upgraded
  // user record. The home page already uses `getItemSync('anonymousUserId')`
  // as the source of truth for which user to fetch.
  await setItemWithCache("anonymousUserId", userId);

  return {
    ok: true,
    userId,
    premiumExpiresAt: data.premiumExpiresAt ?? null,
  };
}
