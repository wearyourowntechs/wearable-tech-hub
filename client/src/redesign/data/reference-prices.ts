// Historical manufacturer reference prices. These are NOT live Amazon prices.
// Used only for an explicitly labeled reference-price filter.
export const referencePrices: Record<string, { usd: number; label: string; source: string }> = {
  "apple-watch-series-10": { usd: 399, label: "2024 launch starting price", source: "https://www.apple.com/newsroom/2024/09/introducing-apple-watch-series-10/" },
  "oura-ring-4": { usd: 349, label: "Silver manufacturer price checked Oct 20, 2026", source: "https://ouraring.com/store/rings/oura-ring-4/silver" },
  "garmin-venu-3": { usd: 449.99, label: "2023 launch suggested retail price", source: "https://www.garmin.com/en-US/newsroom/press-release/sports-fitness/reach-your-health-and-fitness-goals-with-new-venu-3-gps-smartwatches-from-garmin/" },
  "sony-linkbuds-fit": { usd: 229.99, label: "Manufacturer MSRP checked Oct 20, 2026", source: "https://electronics.sony.com/audio/headphones/all-headphones/p/wfls910n-b" },
};
