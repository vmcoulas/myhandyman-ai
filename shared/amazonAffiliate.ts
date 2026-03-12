export const AMAZON_ASSOCIATES_TAG = "myhandyman-20";

export function buildAmazonAffiliateUrl(options: {
  /** What to search for on Amazon (e.g., material or tool name) */
  query: string;
  /** If already provided (deep link), prefer this over generated search URL */
  affiliateLink?: string | null;
  /** Override for tests/other environments */
  tag?: string;
}): string {
  const { query, affiliateLink, tag = AMAZON_ASSOCIATES_TAG } = options;

  if (affiliateLink && affiliateLink.trim().length > 0) return affiliateLink;

  const trimmedQuery = query.trim();
  const params = new URLSearchParams();
  params.set("k", trimmedQuery.length > 0 ? trimmedQuery : "tools");
  params.set("tag", tag);

  return `https://www.amazon.com/s?${params.toString()}`;
}
