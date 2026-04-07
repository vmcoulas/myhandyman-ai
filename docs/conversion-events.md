# MyHandyman Conversion Event Schema

> Implemented: 2026-04-07 by Herm (COO) — AIG-17

## Overview

All funnel events fire on three platforms simultaneously via `client/src/lib/analytics.ts`.

## Funnel Events

| Step | GA4 Event                    | Meta Pixel Event      | TikTok Pixel Event   | Trigger Point                          |
|------|------------------------------|-----------------------|----------------------|----------------------------------------|
| 1    | `photo_upload`               | `Lead`                | `SubmitForm`         | User uploads photo, submits text, or picks a quick repair |
| 2    | `repair_plan_generated`      | `ViewContent`         | `ViewContent`        | AI returns diagnosis (both photo + text paths) |
| 3    | `premium_upgrade_click`      | `InitiateCheckout`    | `InitiateCheckout`   | User clicks upgrade/checkout button    |
| 4    | `premium_purchase_complete`  | `Purchase`            | `CompletePayment`    | Stripe redirects back with `?premium=success` |

### Bonus Events

| GA4 Event        | Meta Pixel Event         | TikTok Pixel Event | Trigger                 |
|------------------|--------------------------|--------------------|-----------------------|
| `lead_capture`   | `CompleteRegistration`   | `Subscribe`        | User submits email for newsletter |

## Event Parameters

### photo_upload
- `upload_method`: `"photo"` | `"text"` | `"quick_repair"`

### repair_plan_generated
- `project_title`: string — the detected issue title
- `confidence`: string — AI confidence level

### premium_purchase_complete
- `value`: 4.99
- `currency`: "USD"
- `content_name`: "premium_subscription"

## Pixel IDs

| Platform | ID                  | Status       |
|----------|---------------------|--------------|
| GA4      | `G-RKH0S818TY`     | ✅ Live       |
| Meta     | `XXXXXXXXXXXXXXXXX` | ⚠️ Placeholder — needs real Pixel ID |
| TikTok   | `XXXXXXXXXXXXXXXXX` | ⚠️ Placeholder — needs real Pixel ID |

## Files Modified

- `client/src/lib/analytics.ts` — new centralized tracking module
- `client/src/pages/home.tsx` — wired events at all funnel points
- `client/index.html` — already had pixel snippets (unchanged)

## Verification

To verify events fire correctly:
1. **GA4**: Use [GA4 DebugView](https://analytics.google.com/) → DebugView → look for custom events
2. **Meta**: Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
3. **TikTok**: Use [TikTok Pixel Helper](https://ads.tiktok.com/help/article/tiktok-pixel-helper) Chrome extension

⚠️ **Note**: Meta and TikTok pixels need real Pixel IDs before they'll fire. GA4 events will work immediately.
