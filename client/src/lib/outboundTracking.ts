import { apiRequest } from "@/lib/queryClient";

export type OutboundClickEvent = {
  destination: string;
  itemType: "material" | "tool";
  itemName: string;
  source: "materials_list" | "tools_list";
};

/**
 * Lightweight outbound click tracking.
 *
 * Best-effort: logs to server if available; falls back to console.
 */
export async function trackOutboundClick(event: OutboundClickEvent): Promise<void> {
  try {
    await apiRequest("POST", "/api/events/outbound", {
      ...event,
      ts: Date.now(),
    });
  } catch {
    // Tracking should never block navigation.
    // eslint-disable-next-line no-console
    console.log("[outbound_click]", event);
  }
}
