// Existing site integrations, retained from its original index.html.
// No new provider or identifier is introduced; never send placeholder email fields.
const PINTEREST_TAG_ID = "2612617042627";
let started = false;
function accepted(): boolean {
  try { return localStorage.getItem("cookieConsent") === "accepted"; }
  catch { return false; }
}
function startConfiguredAnalytics() {
  if (started || !accepted()) return;
  started = true;
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID as string | undefined;
  if (endpoint && websiteId && !endpoint.includes("%")) {
    try {
      const url = new URL(`${endpoint.replace(/\/$/, "")}/umami`, window.location.origin);
      if (url.protocol === "https:") {
        const script = document.createElement("script");
        script.src = url.toString();
        script.defer = true;
        script.dataset.websiteId = websiteId;
        document.head.appendChild(script);
      }
    } catch { /* Missing or malformed deployment settings must not break shopping pages. */ }
  }
  type PinterestTracker = ((...args: unknown[]) => void) & { queue: unknown[][]; version: string };
  const target = window as typeof window & { pintrk?: PinterestTracker };
  if (!target.pintrk) {
    const queue: unknown[][] = [];
    target.pintrk = Object.assign((...args: unknown[]) => { queue.push(args); }, { queue, version: "3.0" });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://s.pinimg.com/ct/core.js";
    document.head.appendChild(script);
  }
  target.pintrk("load", PINTEREST_TAG_ID);
  target.pintrk("page");
}
export function initializeExistingAnalytics() {
  startConfiguredAnalytics();
  window.addEventListener("wyot:consent-change", startConfiguredAnalytics);
  window.addEventListener("storage", (event) => { if (event.key === "cookieConsent") startConfiguredAnalytics(); });
}
