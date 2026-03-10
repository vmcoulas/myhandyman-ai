import test from "node:test";
import assert from "node:assert/strict";
import { buildAmazonAffiliateUrl, AMAZON_ASSOCIATES_TAG } from "@shared/amazonAffiliate";

test("buildAmazonAffiliateUrl prefers provided affiliateLink", () => {
  const url = buildAmazonAffiliateUrl({
    query: "2x4 lumber",
    affiliateLink: "https://example.com/my-deep-link",
  });
  assert.equal(url, "https://example.com/my-deep-link");
});

test("buildAmazonAffiliateUrl builds Amazon search URL with tag", () => {
  const url = buildAmazonAffiliateUrl({ query: "wood glue" });
  const u = new URL(url);
  assert.equal(u.origin, "https://www.amazon.com");
  assert.equal(u.pathname, "/s");
  assert.equal(u.searchParams.get("k"), "wood glue");
  assert.equal(u.searchParams.get("tag"), AMAZON_ASSOCIATES_TAG);
});

test("buildAmazonAffiliateUrl uses fallback query when blank", () => {
  const url = buildAmazonAffiliateUrl({ query: "   " });
  const u = new URL(url);
  assert.equal(u.searchParams.get("k"), "tools");
  assert.equal(u.searchParams.get("tag"), AMAZON_ASSOCIATES_TAG);
});
