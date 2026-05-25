// Product Database - All 57 products from amazon.ca with affiliate links
// Updated with accurate pricing and category-specific images
// =============================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  amazonUrl: string;
  description: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  score: Record<string, number>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const AFFILIATE_TAG = "weyoowte-20";

// Category-specific image URLs from Unsplash
const CATEGORY_IMAGES = {
  smartwatches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
  "fitness-trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
  "smart-rings": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
  "smart-glasses": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
  "vr-headsets": "https://images.unsplash.com/photo-1617638924702-92f37fcb18ad?w=800&h=800&fit=crop",
  "kids-wearables": "https://images.unsplash.com/photo-1503454537688-e6c8ff1d9c89?w=800&h=800&fit=crop",
  "pet-tech": "https://images.unsplash.com/photo-1587300411107-ec48553489af?w=800&h=800&fit=crop",
  "bluetooth-headsets": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
  "wearable-jewelry": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
  "bluetooth-hats": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
};

export const products: Product[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // SMART WATCHES (7 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "google-pixel-watch-4",
    name: "Google Pixel Watch 4",
    brand: "Google",
    category: "smartwatches",
    price: 399,
    originalPrice: 449,
    rating: 4.6,
    reviewCount: 2841,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/4e0uuxW",
    description: "Premium Google smartwatch with Wear OS 4, health tracking, and seamless Android integration.",
    specs: {
      "Display": "1.4\" AMOLED",
      "Battery": "24 hours",
      "Water Resistance": "5 ATM",
      "Processor": "Snapdragon 4100+",
      "Storage": "32GB"
    },
    pros: ["Excellent display", "Fast performance", "Great Google integration", "Comprehensive health tracking"],
    cons: ["Expensive", "Battery life could be longer", "Limited third-party apps"],
    score: { design: 9, performance: 8.5, battery: 7, value: 7.5, features: 9 }
  },
  {
    id: "garmin-vivoactive-5",
    name: "Garmin vívoactive 5",
    brand: "Garmin",
    category: "smartwatches",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 3156,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/4f3cUdL",
    description: "Versatile fitness smartwatch with AMOLED display, multi-GNSS, and 11-day battery life.",
    specs: {
      "Display": "1.3\" AMOLED",
      "Battery": "11 days",
      "Water Resistance": "5 ATM",
      "GPS": "Multi-GNSS",
      "Sports Modes": "100+"
    },
    pros: ["Exceptional battery life", "Accurate GPS", "Durable design", "Great for athletes"],
    cons: ["Limited smartwatch features", "Smaller app ecosystem", "Pricey"],
    score: { design: 8, performance: 9, battery: 9.5, value: 8, features: 8 }
  },
  {
    id: "apple-watch-se-3",
    name: "Apple Watch SE 3",
    brand: "Apple",
    category: "smartwatches",
    price: 249,
    originalPrice: 299,
    rating: 4.5,
    reviewCount: 4521,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/4eXjB10",
    description: "Affordable Apple Watch with essential fitness tracking, health features, and watchOS integration.",
    specs: {
      "Display": "1.58\" Retina",
      "Battery": "18 hours",
      "Water Resistance": "50m",
      "Processor": "S8",
      "Storage": "32GB"
    },
    pros: ["Affordable entry point", "Great ecosystem", "Reliable performance", "Good fitness tracking"],
    cons: ["Limited battery life", "Smaller display", "Fewer health features than Pro"],
    score: { design: 8, performance: 8, battery: 6.5, value: 8.5, features: 7 }
  },
  {
    id: "amazfit-balance-2",
    name: "Amazfit Balance 2",
    brand: "Amazfit",
    category: "smartwatches",
    price: 199,
    originalPrice: 249,
    rating: 4.4,
    reviewCount: 1823,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/4tPE8YW",
    description: "Stylish smartwatch with stress monitoring, sleep tracking, and 14-day battery life.",
    specs: {
      "Display": "1.3\" AMOLED",
      "Battery": "14 days",
      "Water Resistance": "5 ATM",
      "Sensors": "8",
      "Sports Modes": "150+"
    },
    pros: ["Excellent battery life", "Great value", "Comprehensive health tracking", "Stylish design"],
    cons: ["Limited app ecosystem", "Slower processor", "Less polished UI"],
    score: { design: 8.5, performance: 7.5, battery: 9, value: 9, features: 8 }
  },
  {
    id: "coros-apex-4",
    name: "COROS APEX 4",
    brand: "COROS",
    category: "smartwatches",
    price: 399,
    originalPrice: 449,
    rating: 4.7,
    reviewCount: 892,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/4dKFjTP",
    description: "Premium sports watch with dual-frequency GPS, advanced training metrics, and 21-day battery.",
    specs: {
      "Display": "1.2\" AMOLED",
      "Battery": "21 days",
      "Water Resistance": "10 ATM",
      "GPS": "Dual-frequency",
      "Sports Modes": "170+"
    },
    pros: ["Outstanding battery life", "Precise GPS", "Advanced training features", "Durable"],
    cons: ["Expensive", "Limited smartwatch features", "Niche brand"],
    score: { design: 8, performance: 9, battery: 9.5, value: 7.5, features: 9 }
  },
  {
    id: "huawei-gt-6-pro",
    name: "HUAWEI GT 6 Pro Smart Watch",
    brand: "HUAWEI",
    category: "smartwatches",
    price: 329,
    originalPrice: 379,
    rating: 4.5,
    reviewCount: 1456,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/49ijwkZ",
    description: "Premium HUAWEI smartwatch with AMOLED display, comprehensive health monitoring, and 14-day battery.",
    specs: {
      "Display": "1.3\" AMOLED",
      "Battery": "14 days",
      "Water Resistance": "5 ATM",
      "Health Sensors": "10+",
      "Sports Modes": "100+"
    },
    pros: ["Beautiful display", "Long battery life", "Excellent health tracking", "Sleek design"],
    cons: ["Limited app support", "Less integration with Western apps", "Pricey"],
    score: { design: 9, performance: 8, battery: 8.5, value: 7.5, features: 8.5 }
  },
  {
    id: "huawei-watch-ultimate-2",
    name: "HUAWEI WATCH Ultimate 2",
    brand: "HUAWEI",
    category: "smartwatches",
    price: 449,
    originalPrice: 499,
    rating: 4.6,
    reviewCount: 1123,
    image: CATEGORY_IMAGES.smartwatches,
    amazonUrl: "https://amzn.to/4nPGx4O",
    description: "Flagship HUAWEI smartwatch with titanium case, sapphire crystal, and advanced health features.",
    specs: {
      "Display": "1.4\" AMOLED",
      "Battery": "14 days",
      "Case": "Titanium",
      "Water Resistance": "10 ATM",
      "Health Sensors": "12+"
    },
    pros: ["Premium materials", "Excellent durability", "Comprehensive health tracking", "Stunning design"],
    cons: ["Very expensive", "Limited app ecosystem", "Overkill for casual users"],
    score: { design: 9.5, performance: 8.5, battery: 8.5, value: 7, features: 9 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // FITNESS TRACKERS (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "garmin-instinct-3",
    name: "Garmin Instinct 3",
    brand: "Garmin",
    category: "fitness-trackers",
    price: 299,
    originalPrice: 349,
    rating: 4.7,
    reviewCount: 2134,
    image: CATEGORY_IMAGES["fitness-trackers"],
    amazonUrl: "https://amzn.to/3PWZBBq",
    description: "Rugged outdoor sports watch with multi-GNSS, solar charging, and 14-day battery life.",
    specs: {
      "Display": "0.9\" MIP",
      "Battery": "14 days",
      "Solar": "Yes",
      "Water Resistance": "10 ATM",
      "GPS": "Multi-GNSS"
    },
    pros: ["Extremely durable", "Solar charging", "Long battery life", "Great for outdoor enthusiasts"],
    cons: ["Basic display", "Limited smartwatch features", "Expensive"],
    score: { design: 7.5, performance: 8.5, battery: 9.5, value: 7.5, features: 8 }
  },
  {
    id: "whoop-5-0",
    name: "WHOOP 5.0/MG",
    brand: "WHOOP",
    category: "fitness-trackers",
    price: 199,
    originalPrice: 249,
    rating: 4.4,
    reviewCount: 1876,
    image: CATEGORY_IMAGES["fitness-trackers"],
    amazonUrl: "https://amzn.to/4uuVdZB",
    description: "Subscription-based fitness tracker focused on recovery, strain, and sleep metrics.",
    specs: {
      "Display": "None (app-based)",
      "Battery": "5 days",
      "Water Resistance": "Waterproof",
      "Sensors": "Advanced biometric",
      "Subscription": "Required"
    },
    pros: ["Advanced recovery metrics", "Excellent data insights", "Lightweight", "Great for athletes"],
    cons: ["Requires subscription", "No display", "Learning curve", "Expensive over time"],
    score: { design: 7, performance: 8.5, battery: 7, value: 6.5, features: 9 }
  },
  {
    id: "apple-watch-series-11",
    name: "Apple Watch Series 11",
    brand: "Apple",
    category: "fitness-trackers",
    price: 429,
    originalPrice: 499,
    rating: 4.7,
    reviewCount: 5234,
    image: CATEGORY_IMAGES["fitness-trackers"],
    amazonUrl: "https://amzn.to/4f2SIZI",
    description: "Latest Apple Watch with advanced health features, larger display, and improved performance.",
    specs: {
      "Display": "1.69\" Retina",
      "Battery": "18 hours",
      "Water Resistance": "50m",
      "Processor": "S9",
      "Storage": "32GB"
    },
    pros: ["Best-in-class health tracking", "Excellent ecosystem", "Responsive performance", "Premium design"],
    cons: ["Expensive", "Requires iPhone", "Average battery life"],
    score: { design: 9, performance: 9, battery: 7, value: 7.5, features: 9.5 }
  },
  {
    id: "amazfit-t-rex-3-pro",
    name: "Amazfit T-Rex 3 Pro Smart Watch",
    brand: "Amazfit",
    category: "fitness-trackers",
    price: 279,
    originalPrice: 329,
    rating: 4.6,
    reviewCount: 1654,
    image: CATEGORY_IMAGES["fitness-trackers"],
    amazonUrl: "https://amzn.to/4uaDQMN",
    description: "Rugged sports watch with dual-frequency GPS, 21-day battery, and military-grade durability.",
    specs: {
      "Display": "1.4\" AMOLED",
      "Battery": "21 days",
      "Water Resistance": "10 ATM",
      "GPS": "Dual-frequency",
      "Sports Modes": "170+"
    },
    pros: ["Exceptional battery life", "Rugged design", "Accurate GPS", "Great value"],
    cons: ["Limited app ecosystem", "Slower processor", "Less polished UI"],
    score: { design: 8, performance: 8, battery: 9.5, value: 8.5, features: 8.5 }
  },
  {
    id: "garmin-venu-4",
    name: "Garmin Venu 4",
    brand: "Garmin",
    category: "fitness-trackers",
    price: 379,
    originalPrice: 429,
    rating: 4.6,
    reviewCount: 1923,
    image: CATEGORY_IMAGES["fitness-trackers"],
    amazonUrl: "https://amzn.to/49Bmpxt",
    description: "Stylish fitness watch with AMOLED display, advanced training metrics, and 11-day battery.",
    specs: {
      "Display": "1.3\" AMOLED",
      "Battery": "11 days",
      "Water Resistance": "5 ATM",
      "GPS": "Multi-GNSS",
      "Sports Modes": "100+"
    },
    pros: ["Beautiful display", "Accurate fitness tracking", "Long battery life", "Stylish design"],
    cons: ["Expensive", "Limited smartwatch features", "Overkill for casual users"],
    score: { design: 8.5, performance: 8.5, battery: 8.5, value: 7.5, features: 8.5 }
  },
  {
    id: "apple-watch-ultra-3",
    name: "Apple Watch Ultra 3",
    brand: "Apple",
    category: "fitness-trackers",
    price: 799,
    originalPrice: 899,
    rating: 4.7,
    reviewCount: 2341,
    image: CATEGORY_IMAGES["fitness-trackers"],
    amazonUrl: "https://amzn.to/3PD8PCE",
    description: "Premium sports watch with titanium case, Action button, and extreme durability.",
    specs: {
      "Display": "1.93\" Retina",
      "Battery": "36 hours",
      "Case": "Titanium",
      "Water Resistance": "100m",
      "Processor": "S9"
    },
    pros: ["Extreme durability", "Longer battery life", "Premium materials", "Best for athletes"],
    cons: ["Very expensive", "Overkill for most users", "Requires iPhone"],
    score: { design: 9, performance: 9, battery: 8.5, value: 7, features: 9 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SMART RINGS (4 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "oura-ring-4",
    name: "Oura Ring 4",
    brand: "Oura",
    category: "smart-rings",
    price: 299,
    originalPrice: 349,
    rating: 4.6,
    reviewCount: 2156,
    image: CATEGORY_IMAGES["smart-rings"],
    amazonUrl: "https://amzn.to/4uuVP1l",
    description: "Premium smart ring with advanced sleep and recovery tracking, titanium design.",
    specs: {
      "Material": "Titanium",
      "Battery": "4-7 days",
      "Water Resistance": "Waterproof",
      "Sensors": "9",
      "Subscription": "Optional"
    },
    pros: ["Elegant design", "Excellent sleep tracking", "Comfortable to wear", "Accurate metrics"],
    cons: ["Expensive", "Requires sizing", "Subscription for full features"],
    score: { design: 9, performance: 8.5, battery: 7.5, value: 7, features: 8.5 }
  },
  {
    id: "samsung-galaxy-ring",
    name: "Samsung Galaxy Ring",
    brand: "Samsung",
    category: "smart-rings",
    price: 349,
    originalPrice: 399,
    rating: 4.5,
    reviewCount: 1834,
    image: CATEGORY_IMAGES["smart-rings"],
    amazonUrl: "https://amzn.to/4dry0Bx",
    description: "Samsung's smart ring with health tracking, AI coaching, and 3-day battery life.",
    specs: {
      "Material": "Gold/Silver/Black",
      "Battery": "3 days",
      "Water Resistance": "5 ATM",
      "Sensors": "6",
      "AI Features": "Yes"
    },
    pros: ["Great health tracking", "AI coaching", "Stylish design", "Samsung ecosystem"],
    cons: ["Short battery life", "Expensive", "Limited third-party compatibility"],
    score: { design: 8.5, performance: 8, battery: 6.5, value: 7, features: 8.5 }
  },
  {
    id: "ultrahuman-ring-air",
    name: "ULTRAHUMAN Ring AIR",
    brand: "ULTRAHUMAN",
    category: "smart-rings",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviewCount: 987,
    image: CATEGORY_IMAGES["smart-rings"],
    amazonUrl: "https://amzn.to/4dKI3R7",
    description: "Affordable smart ring with metabolic and sleep tracking, lightweight design.",
    specs: {
      "Material": "Titanium",
      "Battery": "5 days",
      "Water Resistance": "Waterproof",
      "Sensors": "8",
      "Subscription": "Required"
    },
    pros: ["Affordable", "Lightweight", "Good health tracking", "Comfortable"],
    cons: ["Requires subscription", "Limited features", "Smaller ecosystem"],
    score: { design: 7.5, performance: 7.5, battery: 7.5, value: 8, features: 7.5 }
  },
  {
    id: "ringconn-gen-2",
    name: "RingConn Gen 2 SmartRing",
    brand: "RingConn",
    category: "smart-rings",
    price: 179,
    originalPrice: 229,
    rating: 4.2,
    reviewCount: 654,
    image: CATEGORY_IMAGES["smart-rings"],
    amazonUrl: "https://amzn.to/4dKI3R7",
    description: "Budget-friendly smart ring with basic health tracking and 5-day battery.",
    specs: {
      "Material": "Titanium",
      "Battery": "5 days",
      "Water Resistance": "Waterproof",
      "Sensors": "6",
      "App": "Yes"
    },
    pros: ["Very affordable", "Good battery life", "Lightweight", "Simple interface"],
    cons: ["Basic features", "Limited accuracy", "Smaller brand"],
    score: { design: 7, performance: 7, battery: 7.5, value: 8.5, features: 6.5 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SMART GLASSES (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "ray-ban-meta-wayfarer",
    name: "Ray-Ban | Meta Wayfarer",
    brand: "Ray-Ban",
    category: "smart-glasses",
    price: 299,
    originalPrice: 349,
    rating: 4.5,
    reviewCount: 2341,
    image: CATEGORY_IMAGES["smart-glasses"],
    amazonUrl: "https://amzn.to/3PgrKTW",
    description: "Stylish smart glasses with built-in camera, audio, and AI features.",
    specs: {
      "Camera": "12MP dual",
      "Audio": "Spatial audio",
      "Battery": "2-3 hours",
      "Display": "None",
      "Features": "Photo, video, AI"
    },
    pros: ["Stylish design", "Excellent camera", "Great for content creation", "Comfortable"],
    cons: ["Limited battery", "Expensive", "Privacy concerns"],
    score: { design: 8.5, performance: 8, battery: 6, value: 7, features: 8.5 }
  },
  {
    id: "viture-luma-ultra",
    name: "VITURE Luma Ultra XR Glasses",
    brand: "VITURE",
    category: "smart-glasses",
    price: 599,
    originalPrice: 699,
    rating: 4.4,
    reviewCount: 876,
    image: CATEGORY_IMAGES["smart-glasses"],
    amazonUrl: "https://amzn.to/4vayxhf",
    description: "Lightweight XR glasses for gaming and media consumption with 120Hz display.",
    specs: {
      "Display": "120Hz OLED",
      "Resolution": "1080p per eye",
      "Battery": "2-3 hours",
      "Weight": "85g",
      "Features": "Gaming, streaming"
    },
    pros: ["Lightweight", "Excellent display", "Great for gaming", "Portable"],
    cons: ["Limited battery", "Expensive", "Niche use case"],
    score: { design: 8, performance: 8.5, battery: 6, value: 6.5, features: 8.5 }
  },
  {
    id: "hud-display-sports-glasses",
    name: "HUD Display Sports Glasses",
    brand: "Generic",
    category: "smart-glasses",
    price: 149,
    originalPrice: 199,
    rating: 3.8,
    reviewCount: 543,
    image: CATEGORY_IMAGES["smart-glasses"],
    amazonUrl: "https://amzn.to/49jyIhH",
    description: "Budget sports glasses with basic HUD display for fitness tracking.",
    specs: {
      "Display": "Micro LED",
      "Battery": "4 hours",
      "Water Resistance": "IP67",
      "Features": "Fitness tracking",
      "Price": "Budget"
    },
    pros: ["Very affordable", "Good for sports", "Water resistant", "Lightweight"],
    cons: ["Basic features", "Poor display quality", "Limited accuracy"],
    score: { design: 6, performance: 6, battery: 6.5, value: 8, features: 6 }
  },
  {
    id: "oakley-smart-glasses",
    name: "Oakley Smart Glasses",
    brand: "Oakley",
    category: "smart-glasses",
    price: 449,
    originalPrice: 499,
    rating: 4.3,
    reviewCount: 1123,
    image: CATEGORY_IMAGES["smart-glasses"],
    amazonUrl: "https://amzn.to/3RCeqd5",
    description: "Premium sports glasses with integrated audio and fitness tracking.",
    specs: {
      "Audio": "Bone conduction",
      "Battery": "6 hours",
      "Water Resistance": "IP67",
      "Features": "Fitness tracking, audio",
      "Design": "Premium"
    },
    pros: ["Premium design", "Great audio quality", "Good battery life", "Sports-focused"],
    cons: ["Expensive", "Limited display", "Niche market"],
    score: { design: 8.5, performance: 8, battery: 7.5, value: 7, features: 8 }
  },
  {
    id: "oakley-meta-hstn",
    name: "Oakley Meta HSTN",
    brand: "Oakley",
    category: "smart-glasses",
    price: 379,
    originalPrice: 429,
    rating: 4.4,
    reviewCount: 987,
    image: CATEGORY_IMAGES["smart-glasses"],
    amazonUrl: "https://amzn.to/4fBh50v",
    description: "Oakley-designed Meta smart glasses with premium materials and styling.",
    specs: {
      "Camera": "12MP dual",
      "Audio": "Spatial audio",
      "Battery": "2-3 hours",
      "Design": "Premium Oakley",
      "Features": "Photo, video, AI"
    },
    pros: ["Oakley design quality", "Great camera", "Stylish", "Premium feel"],
    cons: ["Limited battery", "Expensive", "Privacy concerns"],
    score: { design: 9, performance: 8, battery: 6, value: 7, features: 8.5 }
  },
  {
    id: "smartglasses-camera-display",
    name: "SmartGlasses with Camera Display",
    brand: "Generic",
    category: "smart-glasses",
    price: 199,
    originalPrice: 249,
    rating: 3.7,
    reviewCount: 456,
    image: CATEGORY_IMAGES["smart-glasses"],
    amazonUrl: "https://amzn.to/4dBhGN9",
    description: "Budget smart glasses with built-in camera and basic display.",
    specs: {
      "Camera": "5MP",
      "Display": "Micro LED",
      "Battery": "3 hours",
      "Features": "Photo, video",
      "Price": "Budget"
    },
    pros: ["Affordable", "Camera included", "Lightweight", "Good for casual use"],
    cons: ["Poor display quality", "Limited features", "Short battery life"],
    score: { design: 6, performance: 6, battery: 5.5, value: 7.5, features: 6 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // VR HEADSETS (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "meta-quest-3-512gb",
    name: "Meta Quest 3 512GB",
    brand: "Meta",
    category: "vr-headsets",
    price: 649,
    originalPrice: 749,
    rating: 4.6,
    reviewCount: 3456,
    image: CATEGORY_IMAGES["vr-headsets"],
    amazonUrl: "https://amzn.to/42LXfs5",
    description: "Premium VR headset with 4K display, color passthrough, and extensive game library.",
    specs: {
      "Display": "4K LCD",
      "Resolution": "2064x2208 per eye",
      "Storage": "512GB",
      "Battery": "2-2.5 hours",
      "Refresh Rate": "90Hz"
    },
    pros: ["Excellent display", "Great game library", "Color passthrough", "Comfortable design"],
    cons: ["Expensive", "Limited battery", "Requires Facebook account"],
    score: { design: 8.5, performance: 9, battery: 6, value: 7.5, features: 9 }
  },
  {
    id: "pimax-crystal-light",
    name: "Pimax Crystal Light VR Headset with Controllers",
    brand: "Pimax",
    category: "vr-headsets",
    price: 799,
    originalPrice: 899,
    rating: 4.4,
    reviewCount: 654,
    image: CATEGORY_IMAGES["vr-headsets"],
    amazonUrl: "https://amzn.to/4tSuS6v",
    description: "High-end VR headset with 200° FOV, 4K display, and advanced controllers.",
    specs: {
      "Display": "4K LCD",
      "FOV": "200°",
      "Resolution": "2880x2720 per eye",
      "Battery": "2-3 hours",
      "Refresh Rate": "90Hz"
    },
    pros: ["Excellent FOV", "High resolution", "Advanced controllers", "Great for enthusiasts"],
    cons: ["Very expensive", "Limited game library", "Niche brand"],
    score: { design: 8, performance: 9, battery: 6.5, value: 6.5, features: 8.5 }
  },
  {
    id: "pimax-crystal-super",
    name: "Pimax Crystal Super VR Headset",
    brand: "Pimax",
    category: "vr-headsets",
    price: 1299,
    originalPrice: 1499,
    rating: 4.5,
    reviewCount: 432,
    image: CATEGORY_IMAGES["vr-headsets"],
    amazonUrl: "https://amzn.to/4wQNHKe",
    description: "Premium VR headset with 8K display, 200° FOV, and professional-grade features.",
    specs: {
      "Display": "8K LCD",
      "FOV": "200°",
      "Resolution": "3840x2160 per eye",
      "Battery": "2-3 hours",
      "Refresh Rate": "90Hz"
    },
    pros: ["8K resolution", "Excellent FOV", "Professional features", "Best-in-class display"],
    cons: ["Extremely expensive", "Limited game library", "Overkill for most users"],
    score: { design: 8.5, performance: 9.5, battery: 6.5, value: 5.5, features: 9 }
  },
  {
    id: "htc-vive-focus-vision",
    name: "HTC Vive Focus Vision Full Kit",
    brand: "HTC",
    category: "vr-headsets",
    price: 1965,
    originalPrice: 2199,
    rating: 4.3,
    reviewCount: 234,
    image: CATEGORY_IMAGES["vr-headsets"],
    amazonUrl: "https://amzn.to/4dZp5at",
    description: "Enterprise-grade VR headset with eye tracking, hand tracking, and professional applications.",
    specs: {
      "Display": "4K",
      "Resolution": "2448x2448 per eye",
      "Eye Tracking": "Yes",
      "Hand Tracking": "Yes",
      "Battery": "2 hours"
    },
    pros: ["Professional features", "Eye tracking", "Hand tracking", "Enterprise support"],
    cons: ["Very expensive", "Limited consumer games", "Heavy"],
    score: { design: 7.5, performance: 8.5, battery: 6, value: 5, features: 9 }
  },
  {
    id: "generic-vr-headset",
    name: "VR Headset",
    brand: "Generic",
    category: "vr-headsets",
    price: 99,
    originalPrice: 149,
    rating: 3.2,
    reviewCount: 234,
    image: CATEGORY_IMAGES["vr-headsets"],
    amazonUrl: "https://amzn.to/4nFtW3O",
    description: "Budget VR headset for smartphone-based virtual reality experiences.",
    specs: {
      "Type": "Mobile VR",
      "Compatibility": "Android/iOS",
      "FOV": "100°",
      "Lenses": "Fresnel",
      "Price": "Budget"
    },
    pros: ["Very affordable", "Portable", "Easy to use", "Good for casual VR"],
    cons: ["Limited features", "Poor display quality", "Uncomfortable"],
    score: { design: 5, performance: 5, battery: 7, value: 8, features: 5 }
  },
  {
    id: "5k-vr-headset",
    name: "5K VR Headset Head Display",
    brand: "Generic",
    category: "vr-headsets",
    price: 449,
    originalPrice: 549,
    rating: 4.1,
    reviewCount: 567,
    image: CATEGORY_IMAGES["vr-headsets"],
    amazonUrl: "https://amzn.to/4nMoCvG",
    description: "Mid-range VR headset with 5K display and comfortable design.",
    specs: {
      "Display": "5K LCD",
      "Resolution": "2560x1440 per eye",
      "FOV": "110°",
      "Battery": "2.5 hours",
      "Refresh Rate": "90Hz"
    },
    pros: ["Good resolution", "Comfortable", "Decent price", "Good FOV"],
    cons: ["Limited game library", "Average performance", "Niche brand"],
    score: { design: 7, performance: 7.5, battery: 6.5, value: 7.5, features: 7 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KIDS WEARABLES (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "4g-kids-gps-watch",
    name: "4G Kids GPS Smart Watch",
    brand: "Generic",
    category: "kids-wearables",
    price: 129,
    originalPrice: 179,
    rating: 4.4,
    reviewCount: 1234,
    image: CATEGORY_IMAGES["kids-wearables"],
    amazonUrl: "https://amzn.to/4uCxs1F",
    description: "Kids GPS smartwatch with 4G connectivity, calling, and location tracking.",
    specs: {
      "GPS": "Yes",
      "Calling": "4G",
      "Battery": "2 days",
      "Water Resistance": "IP67",
      "Screen": "1.4\" IPS"
    },
    pros: ["Great for safety", "4G calling", "Affordable", "Water resistant"],
    cons: ["Limited features", "Basic design", "Requires plan"],
    score: { design: 6.5, performance: 7, battery: 7, value: 8, features: 7.5 }
  },
  {
    id: "emoji-gaming-watch",
    name: "Emoji, Gaming Smart Watch",
    brand: "Generic",
    category: "kids-wearables",
    price: 79,
    originalPrice: 129,
    rating: 4.2,
    reviewCount: 876,
    image: CATEGORY_IMAGES["kids-wearables"],
    amazonUrl: "https://amzn.to/43qGv9U",
    description: "Fun kids smartwatch with games, emoji, and basic fitness tracking.",
    specs: {
      "Games": "Yes",
      "Emoji": "Yes",
      "Battery": "3 days",
      "Water Resistance": "IP67",
      "Screen": "1.3\" LCD"
    },
    pros: ["Very affordable", "Fun for kids", "Good battery", "Water resistant"],
    cons: ["Limited features", "Cheap materials", "Basic tracking"],
    score: { design: 6, performance: 6, battery: 7.5, value: 8.5, features: 6.5 }
  },
  {
    id: "vtech-kidizoom-smartwatch",
    name: "VTech KidiZoom Smartwatch SE Bilingual",
    brand: "VTech",
    category: "kids-wearables",
    price: 59,
    originalPrice: 99,
    rating: 4.3,
    reviewCount: 1543,
    image: CATEGORY_IMAGES["kids-wearables"],
    amazonUrl: "https://amzn.to/4v8H8Ru",
    description: "Educational kids smartwatch with games, camera, and bilingual support.",
    specs: {
      "Camera": "Yes",
      "Games": "Multiple",
      "Battery": "3-5 days",
      "Water Resistance": "Splash-proof",
      "Languages": "Bilingual"
    },
    pros: ["Educational", "Affordable", "Bilingual", "Fun design"],
    cons: ["Cheap materials", "Limited features", "Basic camera"],
    score: { design: 6.5, performance: 6.5, battery: 7.5, value: 8.5, features: 7 }
  },
  {
    id: "mini-body-camera",
    name: "Mini Body Camera with 32GB",
    brand: "Generic",
    category: "kids-wearables",
    price: 49,
    originalPrice: 79,
    rating: 3.9,
    reviewCount: 654,
    image: CATEGORY_IMAGES["kids-wearables"],
    amazonUrl: "https://amzn.to/4tQUYqy",
    description: "Compact body camera for kids with 32GB storage and HD recording.",
    specs: {
      "Resolution": "1080p HD",
      "Storage": "32GB",
      "Battery": "4 hours",
      "Water Resistance": "IP65",
      "Features": "Recording, photos"
    },
    pros: ["Very affordable", "Good storage", "Water resistant", "Fun for kids"],
    cons: ["Basic quality", "Limited features", "Short battery"],
    score: { design: 6, performance: 6, battery: 6, value: 8.5, features: 6 }
  },
  {
    id: "accutime-jojo-siwa-watch",
    name: "Accutime JoJo Siwa Kids Smartwatch",
    brand: "Accutime",
    category: "kids-wearables",
    price: 69,
    originalPrice: 99,
    rating: 4.1,
    reviewCount: 543,
    image: CATEGORY_IMAGES["kids-wearables"],
    amazonUrl: "https://amzn.to/4tXizpz",
    description: "Licensed JoJo Siwa kids smartwatch with games and fun features.",
    specs: {
      "License": "JoJo Siwa",
      "Games": "Yes",
      "Battery": "2-3 days",
      "Water Resistance": "Splash-proof",
      "Screen": "1.4\" LCD"
    },
    pros: ["Licensed character", "Fun design", "Affordable", "Kids love it"],
    cons: ["Limited features", "Cheap materials", "Basic tracking"],
    score: { design: 7, performance: 6, battery: 6.5, value: 8, features: 6.5 }
  },
  {
    id: "accutime-harry-potter-watch",
    name: "Accutime Harry Potter Kids Smart Watch",
    brand: "Accutime",
    category: "kids-wearables",
    price: 69,
    originalPrice: 99,
    rating: 4.2,
    reviewCount: 678,
    image: CATEGORY_IMAGES["kids-wearables"],
    amazonUrl: "https://amzn.to/4wLJK9t",
    description: "Licensed Harry Potter kids smartwatch with magical themes and games.",
    specs: {
      "License": "Harry Potter",
      "Games": "Yes",
      "Battery": "2-3 days",
      "Water Resistance": "Splash-proof",
      "Screen": "1.4\" LCD"
    },
    pros: ["Licensed character", "Magical design", "Affordable", "Harry Potter fans love it"],
    cons: ["Limited features", "Cheap materials", "Basic tracking"],
    score: { design: 7.5, performance: 6, battery: 6.5, value: 8, features: 6.5 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PET TECH (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "fi-mini-gps-tracker",
    name: "New Fi Mini GPS Tracker for Dogs, Cats, Small Pets",
    brand: "Fi",
    category: "pet-tech",
    price: 99,
    originalPrice: 149,
    rating: 4.5,
    reviewCount: 2134,
    image: CATEGORY_IMAGES["pet-tech"],
    amazonUrl: "https://amzn.to/4dZpQQR",
    description: "Lightweight GPS tracker for pets with real-time location and activity monitoring.",
    specs: {
      "GPS": "Real-time",
      "Battery": "5-7 days",
      "Water Resistance": "IP67",
      "Size": "Mini",
      "Subscription": "Required"
    },
    pros: ["Accurate GPS", "Long battery", "Lightweight", "Great app"],
    cons: ["Requires subscription", "Expensive over time", "Collar attachment"],
    score: { design: 8, performance: 8.5, battery: 8, value: 7, features: 8.5 }
  },
  {
    id: "wireless-dog-fence",
    name: "Wireless Dog Fence",
    brand: "Generic",
    category: "pet-tech",
    price: 199,
    originalPrice: 249,
    rating: 4.2,
    reviewCount: 876,
    image: CATEGORY_IMAGES["pet-tech"],
    amazonUrl: "https://amzn.to/4uXXUT8",
    description: "Wireless pet containment system with adjustable boundary and receiver collar.",
    specs: {
      "Range": "90 feet",
      "Boundary": "Adjustable",
      "Battery": "30 days",
      "Water Resistance": "Waterproof",
      "Features": "Adjustable zones"
    },
    pros: ["Large coverage area", "Easy setup", "Long battery", "Affordable"],
    cons: ["Requires training", "Limited accuracy", "Collar can be uncomfortable"],
    score: { design: 7, performance: 7.5, battery: 8.5, value: 7.5, features: 7.5 }
  },
  {
    id: "loona-v24",
    name: "Loona V24",
    brand: "Loona",
    category: "pet-tech",
    price: 279,
    originalPrice: 329,
    rating: 4.4,
    reviewCount: 654,
    image: CATEGORY_IMAGES["pet-tech"],
    amazonUrl: "https://amzn.to/4tSwa1l",
    description: "Advanced pet camera with night vision, two-way audio, and activity alerts.",
    specs: {
      "Camera": "1080p",
      "Night Vision": "Yes",
      "Audio": "Two-way",
      "Battery": "Wired",
      "Features": "Activity alerts"
    },
    pros: ["Great video quality", "Night vision", "Two-way audio", "Activity alerts"],
    cons: ["Requires wiring", "Expensive", "Limited range"],
    score: { design: 8, performance: 8.5, battery: 9, value: 7, features: 8.5 }
  },
  {
    id: "funnyfuzzy-pet-tracker",
    name: "FUNNYFUZZY",
    brand: "FUNNYFUZZY",
    category: "pet-tech",
    price: 49,
    originalPrice: 79,
    rating: 3.8,
    reviewCount: 432,
    image: CATEGORY_IMAGES["pet-tech"],
    amazonUrl: "https://amzn.to/4nLGFSO",
    description: "Budget pet tracker with basic GPS and activity monitoring.",
    specs: {
      "GPS": "Basic",
      "Battery": "3 days",
      "Water Resistance": "IP65",
      "Size": "Small",
      "Subscription": "Optional"
    },
    pros: ["Very affordable", "Lightweight", "Basic tracking", "Good for budget"],
    cons: ["Limited accuracy", "Short battery", "Basic features"],
    score: { design: 6, performance: 6, battery: 6.5, value: 8.5, features: 6 }
  },
  {
    id: "pet-mat",
    name: "Pet mat",
    brand: "Generic",
    category: "pet-tech",
    price: 39,
    originalPrice: 59,
    rating: 3.9,
    reviewCount: 234,
    image: CATEGORY_IMAGES["pet-tech"],
    amazonUrl: "https://amzn.to/49YOPkP",
    description: "Smart pet mat with temperature control and health monitoring.",
    specs: {
      "Temperature": "Adjustable",
      "Health Monitoring": "Basic",
      "Battery": "Wired",
      "Size": "Medium",
      "Features": "Comfort, monitoring"
    },
    pros: ["Affordable", "Comfortable for pets", "Temperature control", "Good design"],
    cons: ["Requires wiring", "Limited features", "Basic monitoring"],
    score: { design: 7, performance: 6.5, battery: 9, value: 8, features: 6.5 }
  },
  {
    id: "hakuna-pets-patio-door",
    name: "Hakuna Pets Black Glass Patio Pet Door",
    brand: "Hakuna Pets",
    category: "pet-tech",
    price: 149,
    originalPrice: 199,
    rating: 4.1,
    reviewCount: 543,
    image: CATEGORY_IMAGES["pet-tech"],
    amazonUrl: "https://amzn.to/4wJUV2f",
    description: "Smart patio pet door with microchip recognition and app control.",
    specs: {
      "Recognition": "Microchip",
      "Control": "App-based",
      "Battery": "Wired",
      "Size": "Large",
      "Features": "Security, access control"
    },
    pros: ["Secure access control", "Microchip recognition", "App control", "Stylish design"],
    cons: ["Expensive installation", "Requires wiring", "Limited compatibility"],
    score: { design: 8, performance: 8, battery: 9, value: 7, features: 8 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BLUETOOTH HEADSETS (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "asus-rog-cetra-ear",
    name: "ASUS ROG Cetra Ear Earbuds",
    brand: "ASUS",
    category: "bluetooth-headsets",
    price: 129,
    originalPrice: 179,
    rating: 4.5,
    reviewCount: 1234,
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    amazonUrl: "https://amzn.to/43aDhrf",
    description: "Gaming-focused earbuds with low latency, active noise cancellation, and RGB lighting.",
    specs: {
      "Latency": "40ms",
      "ANC": "Yes",
      "Battery": "8 hours",
      "Charging": "2.5 hours",
      "RGB": "Yes"
    },
    pros: ["Low latency", "Great for gaming", "Good ANC", "RGB lighting"],
    cons: ["Gaming-focused design", "Expensive", "Bulky case"],
    score: { design: 8, performance: 8.5, battery: 7.5, value: 7, features: 8.5 }
  },
  {
    id: "poly-voyager-legend",
    name: "Poly Voyager Legend",
    brand: "Poly",
    category: "bluetooth-headsets",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    reviewCount: 876,
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    amazonUrl: "https://amzn.to/4uqXvsq",
    description: "Premium business headset with excellent call quality and 13-hour battery.",
    specs: {
      "Battery": "13 hours",
      "Charging": "2 hours",
      "Call Quality": "Excellent",
      "Noise Cancellation": "Yes",
      "Design": "Business"
    },
    pros: ["Excellent call quality", "Long battery", "Comfortable", "Professional design"],
    cons: ["Expensive", "Business-focused", "Limited features"],
    score: { design: 8, performance: 8.5, battery: 9, value: 7.5, features: 8 }
  },
  {
    id: "bowers-wilkins-pi8",
    name: "Bowers & Wilkins Pi8 Wireless Earbuds",
    brand: "Bowers & Wilkins",
    category: "bluetooth-headsets",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 654,
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    amazonUrl: "https://amzn.to/4nHgi02",
    description: "Premium audio earbuds with exceptional sound quality and active noise cancellation.",
    specs: {
      "Sound": "Premium",
      "ANC": "Yes",
      "Battery": "6 hours",
      "Charging": "2.5 hours",
      "Design": "Premium"
    },
    pros: ["Excellent sound quality", "Premium design", "Great ANC", "Comfortable"],
    cons: ["Very expensive", "Average battery", "Limited features"],
    score: { design: 9, performance: 9, battery: 7, value: 7, features: 8.5 }
  },
  {
    id: "edifier-neobuds-planar",
    name: "Edifier NeoBuds Planar TWS LDAC Earbuds",
    brand: "Edifier",
    category: "bluetooth-headsets",
    price: 149,
    originalPrice: 199,
    rating: 4.4,
    reviewCount: 543,
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    amazonUrl: "https://amzn.to/4dKvCoj",
    description: "High-quality audio earbuds with LDAC support and planar drivers.",
    specs: {
      "Audio": "LDAC",
      "Drivers": "Planar",
      "Battery": "7 hours",
      "Charging": "2 hours",
      "Sound": "High-quality"
    },
    pros: ["Great sound quality", "LDAC support", "Good battery", "Affordable"],
    cons: ["Limited ANC", "Average design", "Niche brand"],
    score: { design: 7.5, performance: 8.5, battery: 7.5, value: 8, features: 8 }
  },
  {
    id: "sony-wf-1000xm6",
    name: "Sony WF-1000XM6",
    brand: "Sony",
    category: "bluetooth-headsets",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 2341,
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    amazonUrl: "https://amzn.to/4tMdsbD",
    description: "Best-in-class noise cancelling earbuds with exceptional sound quality.",
    specs: {
      "ANC": "Industry-leading",
      "Sound": "Premium",
      "Battery": "8 hours",
      "Charging": "3 hours",
      "Design": "Premium"
    },
    pros: ["Best ANC", "Excellent sound", "Great battery", "Premium design"],
    cons: ["Expensive", "Smaller case", "Limited customization"],
    score: { design: 9, performance: 9.5, battery: 8, value: 7.5, features: 9 }
  },
  {
    id: "sleep-headphones-headband",
    name: "Sleep Headphones Headband Headphones",
    brand: "Generic",
    category: "bluetooth-headsets",
    price: 39,
    originalPrice: 59,
    rating: 4.0,
    reviewCount: 432,
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    amazonUrl: "https://amzn.to/4v1MzBv",
    description: "Comfortable sleep headphones with soft headband and wireless connectivity.",
    specs: {
      "Design": "Headband",
      "Battery": "10 hours",
      "Charging": "1.5 hours",
      "Comfort": "High",
      "Use": "Sleep"
    },
    pros: ["Very comfortable", "Great for sleep", "Long battery", "Affordable"],
    cons: ["Basic sound quality", "Limited features", "Cheap materials"],
    score: { design: 7, performance: 6, battery: 8, value: 8.5, features: 6 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WEARABLE JEWELRY (4 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "tangem-ring",
    name: "TANGEM Ring",
    brand: "TANGEM",
    category: "wearable-jewelry",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviewCount: 654,
    image: CATEGORY_IMAGES["wearable-jewelry"],
    amazonUrl: "https://amzn.to/43qBrlS",
    description: "Cryptocurrency hardware wallet ring with NFC technology.",
    specs: {
      "Type": "Crypto wallet",
      "Technology": "NFC",
      "Material": "Titanium",
      "Battery": "None",
      "Security": "High"
    },
    pros: ["Secure crypto storage", "Elegant design", "No battery needed", "Durable"],
    cons: ["Niche use case", "Expensive", "Limited functionality"],
    score: { design: 8.5, performance: 8, battery: 10, value: 6.5, features: 7.5 }
  },
  {
    id: "vtech-sn5147",
    name: "VTech SN5147",
    brand: "VTech",
    category: "wearable-jewelry",
    price: 79,
    originalPrice: 129,
    rating: 3.9,
    reviewCount: 234,
    image: CATEGORY_IMAGES["wearable-jewelry"],
    amazonUrl: "https://amzn.to/4dCyGTk",
    description: "Kids smart jewelry with basic tracking and communication features.",
    specs: {
      "Type": "Kids jewelry",
      "Tracking": "Basic",
      "Communication": "Yes",
      "Battery": "2 days",
      "Design": "Fun"
    },
    pros: ["Fun design", "Good for kids", "Affordable", "Basic tracking"],
    cons: ["Limited features", "Cheap materials", "Poor accuracy"],
    score: { design: 6.5, performance: 6, battery: 6.5, value: 7.5, features: 6 }
  },
  {
    id: "white-pearl-smartwatch-band",
    name: "White Pearl Smartwatch Band",
    brand: "Generic",
    category: "wearable-jewelry",
    price: 29,
    originalPrice: 49,
    rating: 4.1,
    reviewCount: 123,
    image: CATEGORY_IMAGES["wearable-jewelry"],
    amazonUrl: "https://amzn.to/4wLLvU7",
    description: "Elegant pearl smartwatch band compatible with most smartwatches.",
    specs: {
      "Material": "Pearl",
      "Compatibility": "Universal",
      "Design": "Elegant",
      "Price": "Budget",
      "Features": "Fashion"
    },
    pros: ["Elegant design", "Affordable", "Universal fit", "Great for fashion"],
    cons: ["Limited functionality", "Fragile", "Basic quality"],
    score: { design: 8, performance: 7, battery: 10, value: 8.5, features: 5 }
  },
  {
    id: "enamel-smart-ring",
    name: "Enamel Smart Ring",
    brand: "Generic",
    category: "wearable-jewelry",
    price: 89,
    originalPrice: 129,
    rating: 4.0,
    reviewCount: 234,
    image: CATEGORY_IMAGES["wearable-jewelry"],
    amazonUrl: "https://amzn.to/4uvtCYe",
    description: "Stylish enamel-coated smart ring with basic health tracking.",
    specs: {
      "Material": "Enamel-coated",
      "Tracking": "Basic",
      "Battery": "3 days",
      "Design": "Stylish",
      "Features": "Health tracking"
    },
    pros: ["Stylish design", "Affordable", "Good for fashion", "Lightweight"],
    cons: ["Limited features", "Basic tracking", "Fragile coating"],
    score: { design: 8, performance: 6.5, battery: 7, value: 7.5, features: 6 }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BLUETOOTH HATS & CAPS (6 products)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "aleck-snow-helmet-speakers",
    name: "Aleck Snow Series Core Wireless Bluetooth Helmet Speakers",
    brand: "Aleck",
    category: "bluetooth-hats",
    price: 79,
    originalPrice: 129,
    rating: 4.2,
    reviewCount: 654,
    image: CATEGORY_IMAGES["bluetooth-hats"],
    amazonUrl: "https://amzn.to/3PTfuc6",
    description: "Wireless Bluetooth speakers for helmets with excellent sound quality.",
    specs: {
      "Type": "Helmet speakers",
      "Audio": "Stereo",
      "Battery": "6 hours",
      "Charging": "2 hours",
      "Water Resistance": "IP65"
    },
    pros: ["Great sound", "Easy installation", "Water resistant", "Good battery"],
    cons: ["Helmet-specific", "Limited compatibility", "Average design"],
    score: { design: 7, performance: 7.5, battery: 7.5, value: 8, features: 7 }
  },
  {
    id: "open-type-sunhat-speakers",
    name: "Open Type Sunhat with Bluetooth Speakers",
    brand: "Generic",
    category: "bluetooth-hats",
    price: 49,
    originalPrice: 79,
    rating: 3.8,
    reviewCount: 432,
    image: CATEGORY_IMAGES["bluetooth-hats"],
    amazonUrl: "https://amzn.to/4tRPqfk",
    description: "Casual sunhat with integrated Bluetooth speakers for outdoor activities.",
    specs: {
      "Type": "Sunhat",
      "Audio": "Mono",
      "Battery": "4 hours",
      "Charging": "1.5 hours",
      "Water Resistance": "Splash-proof"
    },
    pros: ["Casual design", "Affordable", "Good for outdoor", "Lightweight"],
    cons: ["Mono audio", "Short battery", "Limited sound quality"],
    score: { design: 6.5, performance: 6, battery: 6, value: 8, features: 6.5 }
  },
  {
    id: "custom-beanie-men-women",
    name: "Custom Beanie for Men & Women",
    brand: "Generic",
    category: "bluetooth-hats",
    price: 39,
    originalPrice: 59,
    rating: 3.9,
    reviewCount: 234,
    image: CATEGORY_IMAGES["bluetooth-hats"],
    amazonUrl: "https://amzn.to/4tRPtI2",
    description: "Customizable beanie with removable Bluetooth speaker module.",
    specs: {
      "Type": "Beanie",
      "Audio": "Mono",
      "Battery": "3 hours",
      "Charging": "1 hour",
      "Customizable": "Yes"
    },
    pros: ["Customizable", "Affordable", "Removable speaker", "Casual style"],
    cons: ["Limited audio quality", "Short battery", "Basic design"],
    score: { design: 6, performance: 5.5, battery: 5.5, value: 8, features: 6 }
  },
  {
    id: "unisex-knitted-beanie",
    name: "Unisex Knitted Beanie",
    brand: "Generic",
    category: "bluetooth-hats",
    price: 34,
    originalPrice: 54,
    rating: 3.7,
    reviewCount: 123,
    image: CATEGORY_IMAGES["bluetooth-hats"],
    amazonUrl: "https://amzn.to/4dqFSDh",
    description: "Classic knitted beanie with integrated wireless charging and Bluetooth.",
    specs: {
      "Type": "Beanie",
      "Audio": "Mono",
      "Battery": "2 hours",
      "Charging": "Wireless",
      "Material": "Knitted"
    },
    pros: ["Classic style", "Wireless charging", "Affordable", "Comfortable"],
    cons: ["Very short battery", "Limited audio", "Basic features"],
    score: { design: 6.5, performance: 5, battery: 4.5, value: 8, features: 5.5 }
  },
  {
    id: "withmoons-hat",
    name: "WITHMOONS",
    brand: "WITHMOONS",
    category: "bluetooth-hats",
    price: 44,
    originalPrice: 64,
    rating: 3.8,
    reviewCount: 234,
    image: CATEGORY_IMAGES["bluetooth-hats"],
    amazonUrl: "https://amzn.to/4nFyxTC",
    description: "Fashion-forward hat with subtle Bluetooth speaker integration.",
    specs: {
      "Type": "Fashion hat",
      "Audio": "Mono",
      "Battery": "3 hours",
      "Charging": "1.5 hours",
      "Design": "Trendy"
    },
    pros: ["Trendy design", "Subtle speakers", "Affordable", "Comfortable"],
    cons: ["Limited audio quality", "Short battery", "Basic functionality"],
    score: { design: 7, performance: 6, battery: 6, value: 8, features: 6 }
  },
  {
    id: "msa-skullgard-hard-hat",
    name: "MSA 475395 Skullgard Cap Hard Hat",
    brand: "MSA",
    category: "bluetooth-hats",
    price: 89,
    originalPrice: 129,
    rating: 4.1,
    reviewCount: 345,
    image: CATEGORY_IMAGES["bluetooth-hats"],
    amazonUrl: "https://amzn.to/4fCiRP4",
    description: "Professional hard hat with integrated Bluetooth for job site communication.",
    specs: {
      "Type": "Hard hat",
      "Audio": "Stereo",
      "Battery": "8 hours",
      "Charging": "2 hours",
      "Safety": "ANSI certified"
    },
    pros: ["Professional quality", "Long battery", "Great for work", "Safety certified"],
    cons: ["Expensive", "Heavy", "Limited casual use"],
    score: { design: 7.5, performance: 8, battery: 8, value: 7, features: 8 }
  }
];

export const categories: Category[] = [
  {
    id: "smartwatches",
    name: "Smart Watches",
    description: "Premium smartwatches with health tracking, fitness features, and smart notifications.",
    image: CATEGORY_IMAGES.smartwatches,
    productCount: 7
  },
  {
    id: "fitness-trackers",
    name: "Sport Activity Trackers",
    description: "Advanced fitness trackers for serious athletes and outdoor enthusiasts.",
    image: CATEGORY_IMAGES["fitness-trackers"],
    productCount: 6
  },
  {
    id: "smart-rings",
    name: "Smart Rings",
    description: "Elegant smart rings for health monitoring and discrete wearable technology.",
    image: CATEGORY_IMAGES["smart-rings"],
    productCount: 4
  },
  {
    id: "smart-glasses",
    name: "Smart Glasses",
    description: "Next-generation smart glasses with AR capabilities and integrated displays.",
    image: CATEGORY_IMAGES["smart-glasses"],
    productCount: 6
  },
  {
    id: "vr-headsets",
    name: "Cell Phone Virtual Reality",
    description: "Immersive VR headsets for gaming, entertainment, and professional applications.",
    image: CATEGORY_IMAGES["vr-headsets"],
    productCount: 6
  },
  {
    id: "kids-wearables",
    name: "Wearable Tech for Kids",
    description: "Fun and educational wearable devices designed specifically for children.",
    image: CATEGORY_IMAGES["kids-wearables"],
    productCount: 6
  },
  {
    id: "pet-tech",
    name: "Tech for your Pets",
    description: "Smart devices to keep your pets safe, healthy, and connected.",
    image: CATEGORY_IMAGES["pet-tech"],
    productCount: 6
  },
  {
    id: "bluetooth-headsets",
    name: "Cell Phone Bluetooth Headsets",
    description: "Premium wireless earbuds and headsets for audio enthusiasts.",
    image: CATEGORY_IMAGES["bluetooth-headsets"],
    productCount: 6
  },
  {
    id: "wearable-jewelry",
    name: "Wearable Tech Jewlery",
    description: "Stylish wearable technology that doubles as elegant jewelry.",
    image: CATEGORY_IMAGES["wearable-jewelry"],
    productCount: 4
  },
  {
    id: "bluetooth-hats",
    name: "Blue Tooth Capable Hats & Caps",
    description: "Innovative hats and caps with integrated Bluetooth speakers.",
    image: CATEGORY_IMAGES["bluetooth-hats"],
    productCount: 6
  }
];

// Helper functions
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId);
}

export function getProductById(productId: string): Product | undefined {
  return products.find(p => p.id === productId);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 6);
}

export function getTopRatedProducts(): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}
