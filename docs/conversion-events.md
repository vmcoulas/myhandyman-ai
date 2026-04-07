# MyHandyman Conversion Event Schema

## Overview

All funnel events fire on **GA4**, **Meta Pixel**, and **TikTok Pixel** simultaneously via the centralized analytics module at `client/src/lib/analytics.ts`.

## Funnel Events

### 1. Photo Upload / Diagnosis Request
- **Trigger:** User submits a photo or text description for diagnosis
- **File:** `client/src/pages/home.tsx` — `handlePhotoSubmit()`, `handleTextSubmit()`, `handleQuickRepair()`
- **GA4:** `photo_upload` (event_category: engagement, method: photo|text)
- **Meta:** `Lead` (content_name: photo_upload)
- **TikTok:** `SubmitForm` (content_type: diagnosis_request)

### 2. Repair Plan Generated
- **Trigger:** AI successfully returns a repair plan
- **File:** `client/src/pages/home.tsx` — `analyzeMutation.onSuccess`, `textMutation.onSuccess`
- **GA4:** `repair_plan_generated` (event_category: engagement, content_type: repair title)
- **Meta:** `ViewContent` (content_name: repair_plan)
- **TikTok:** `ViewContent` (content_type: repair_plan)

### 3. Premium Upgrade Click
- **Trigger:** User clicks any "Upgrade" button to start Stripe checkout
- **File:** `client/src/pages/home.tsx` — `handleUpgrade()`
- **GA4:** `premium_upgrade_click` (event_category: ecommerce)
- **Meta:** `InitiateCheckout` (currency: USD, value: 9.99)
- **TikTok:** `InitiateCheckout` (currency: USD, value: 9.99)

### 4. Purchase Complete
- **Trigger:** Stripe checkout success — user lands on thank-you page
- **File:** `client/src/pages/thank-you.tsx` — `useEffect` on mount
- **GA4:** `purchase` (currency: USD, value: 9.99, transaction_id)
- **Meta:** `Purchase` (currency: USD, value: 9.99)
- **TikTok:** `CompletePayment` (currency: USD, value: 9.99)

### 5. Email Capture (bonus)
- **Trigger:** User submits email in the newsletter signup
- **File:** `client/src/pages/home.tsx` — `handleLeadCapture()`
- **GA4:** `email_capture` (event_category: engagement)
- **Meta:** `CompleteRegistration`
- **TikTok:** `Subscribe`

## Pixel IDs
- **GA4:** G-RKH0S818TY
- **Meta Pixel:** Configured in index.html (ID redacted)
- **TikTok Pixel:** Configured in index.html (ID redacted)

## Verification
- **GA4:** Use [GA4 DebugView](https://analytics.google.com/) — enable debug mode with Chrome extension
- **Meta:** Use [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
- **TikTok:** Use [TikTok Pixel Helper](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/) Chrome extension

## Files Modified
- `client/src/lib/analytics.ts` — NEW: centralized event tracking module
- `client/src/pages/home.tsx` — Added event imports and tracking calls
- `client/src/pages/thank-you.tsx` — Replaced inline tracking with centralized module
- `docs/conversion-events.md` — THIS FILE: event schema documentation
