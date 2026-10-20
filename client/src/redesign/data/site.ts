import { categories as originalCategories } from "./legacy-products";
export const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/smartwatch-category-WKqFe94BYAPt8V4kiLX3gD.webp";
export const GUIDE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/fitness-tracker-category-UCmKXj65PpLEG8nAygtcUJ.webp";
export const productImages: Record<string, string> = {
  "apple-watch-series-10": "/images/apple-watch.webp",
  "oura-ring-4": "/images/oura-ring.webp",
  "garmin-venu-3": "/images/garmin-venu.webp",
  "sony-linkbuds-fit": "/images/sony-linkbuds.webp",
};
export const primaryCategories = [
  { id: "smartwatches", name: "Smartwatches", subtitle: "An everyday connection", icon: "watch" },
  { id: "fitness-trackers", name: "Fitness trackers", subtitle: "Movement comes first", icon: "activity" },
  { id: "smart-rings", name: "Smart rings", subtitle: "A screen-free approach", icon: "ring" },
  { id: "smart-glasses", name: "Smart glasses", subtitle: "A different perspective", icon: "glasses" },
  { id: "hearables", name: "Wearable audio", subtitle: "Stay in your own rhythm", icon: "audio" },
];
const icons: Record<string, string> = { "vr-headsets": "glasses", "kids-wearables": "watch", "pet-tech": "activity", "bluetooth-headsets": "audio", "wearable-jewelry": "ring", "bluetooth-hats": "accessory" };
export const categories = [
  ...primaryCategories,
  ...originalCategories.filter((category) => !primaryCategories.some((item) => item.id === category.id)).map((category) => ({ id: category.id, name: category.name, subtitle: category.description, icon: icons[category.id] || "accessory" })),
  { id: "accessories", name: "Accessories", subtitle: "Fit and charging essentials", icon: "accessory" },
];
