# Amazon Affiliate Links (MyHandyman)

Tracking tag: `myhandyman22-20`

## Behavior

- For each **material** and **tool** item, MyHandyman shows an unobtrusive **Buy** link.
- If the backend provides `affiliateLink` for a material, we use it.
- Otherwise we generate an Amazon **search URL** for the item and append the Associates `tag`.

## Manual test checklist

1. Run the app:
   - `npm run dev`
2. Create/analyze a build so you see **Materials Needed** + **Tools Required**.
3. Verify each item shows a small external-link icon + **Buy** (Buy text appears on `sm+`; icon-only on mobile).
4. Click a Material **Buy** link:
   - Opens Amazon search in a new tab
   - URL includes `tag=myhandyman22-20`
5. Click a Tool **Buy** link:
   - Same expectations
6. In server logs, confirm outbound tracking:
   - Look for `[outbound_click]` entries

## Automated test

- `npm test`
