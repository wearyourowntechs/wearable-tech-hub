// =============================================================
// WEARABLETECH HUB — Product Data
// All Amazon affiliate links use placeholder tag: wearabletech-20
// Replace with your actual Amazon Associates tag before publishing
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
  badge?: "editors-choice" | "best-value" | "new" | "top-rated";
  image: string;
  amazonUrl: string;
  shortDescription: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  score: {
    design: number;
    performance: number;
    battery: number;
    value: number;
    features: number;
  };
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const AFFILIATE_TAG = "weyoowte-20";

export const categories: Category[] = [
  {
    id: "smartwatches",
    name: "Smartwatches",
    description: "Full-featured wrist computers with health monitoring, GPS, and smart notifications",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/smartwatch-category-WKqFe94BYAPt8V4kiLX3gD.webp",
    productCount: 6,
  },
  {
    id: "fitness-trackers",
    name: "Fitness Trackers",
    description: "Lightweight bands focused on activity, sleep, and heart rate tracking",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/fitness-tracker-category-UCmKXj65PpLEG8nAygtcUJ.webp",
    productCount: 4,
  },
  {
    id: "smart-rings",
    name: "Smart Rings",
    description: "Discreet ring-form health trackers with advanced biometric sensors",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/smart-ring-category-XsL2zS3BjHhGtUciiyt9UJ.webp",
    productCount: 3,
  },
  {
    id: "smart-glasses",
    name: "Smart Glasses",
    description: "AI-powered eyewear with cameras, audio, and augmented reality features",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/ar-glasses-category-gNZrUvSeoACDzBCrWXLhBw.webp",
    productCount: 2,
  },
];

export const products: Product[] = [
  // ─── SMARTWATCHES ───────────────────────────────────────────
  {
    id: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    brand: "Apple",
    category: "smartwatches",
    price: 399,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 12847,
    badge: "editors-choice",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CHX2F5NB?tag=${AFFILIATE_TAG}`,
    shortDescription: "The thinnest Apple Watch ever with the largest display, advanced health sensors, and all-day battery life.",
    pros: [
      "Thinnest Apple Watch design to date",
      "Brilliant always-on OLED display",
      "Advanced sleep apnea detection",
      "Seamless iPhone integration",
      "Water resistant to 50 meters",
    ],
    cons: [
      "Requires iPhone for full functionality",
      "Battery life could be longer",
      "Premium price point",
    ],
    specs: {
      "Display": "49mm OLED Always-On",
      "Battery Life": "Up to 18 hours",
      "GPS": "Precision dual-frequency GPS",
      "Health Sensors": "ECG, Blood Oxygen, Temperature",
      "Water Resistance": "50m (WR50)",
      "Connectivity": "Wi-Fi, Bluetooth 5.3, LTE",
      "OS": "watchOS 11",
    },
    score: { design: 5.0, performance: 4.9, battery: 3.5, value: 4.2, features: 5.0 },
    featured: true,
  },
  {
    id: "samsung-galaxy-watch-7",
    name: "Samsung Galaxy Watch 7",
    brand: "Samsung",
    category: "smartwatches",
    price: 299,
    originalPrice: 329,
    rating: 4.6,
    reviewCount: 8234,
    badge: "best-value",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0D1YP5ZQH?tag=${AFFILIATE_TAG}`,
    shortDescription: "Samsung's most advanced health-tracking smartwatch with BioActive sensor and AI-powered insights.",
    pros: [
      "Comprehensive BioActive health sensor",
      "Excellent battery life (40 hours)",
      "Works with Android and iOS",
      "Bright AMOLED display",
      "Competitive pricing",
    ],
    cons: [
      "Best features require Samsung phone",
      "Wear OS can feel cluttered",
      "Bulkier than Apple Watch",
    ],
    specs: {
      "Display": "1.3\" Super AMOLED",
      "Battery Life": "Up to 40 hours",
      "GPS": "GPS, GLONASS, BeiDou",
      "Health Sensors": "BioActive (ECG, Body Composition, SpO2)",
      "Water Resistance": "5ATM + IP68",
      "Connectivity": "Wi-Fi, Bluetooth 5.3, LTE",
      "OS": "Wear OS 5",
    },
    score: { design: 4.5, performance: 4.6, battery: 4.8, value: 4.7, features: 4.8 },
    featured: true,
  },
  {
    id: "garmin-fenix-8",
    name: "Garmin Fēnix 8 Solar",
    brand: "Garmin",
    category: "smartwatches",
    price: 799,
    rating: 4.9,
    reviewCount: 4521,
    badge: "top-rated",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    amazonUrl: `https://amzn.to/4nsg5Of`,
    shortDescription: "The ultimate multisport GPS watch with solar charging, military-grade durability, and 28-day battery life.",
    pros: [
      "Exceptional GPS accuracy",
      "Solar charging extends battery massively",
      "Military-grade MIL-STD-810 durability",
      "Comprehensive training metrics",
      "Topographic maps built-in",
    ],
    cons: [
      "Very expensive",
      "Large and heavy for daily wear",
      "Steep learning curve",
    ],
    specs: {
      "Display": "1.4\" AMOLED with solar lens",
      "Battery Life": "Up to 28 days (solar)",
      "GPS": "Multi-band GPS/GLONASS/Galileo",
      "Health Sensors": "Pulse Ox, HRV, Body Battery",
      "Water Resistance": "10ATM",
      "Connectivity": "Wi-Fi, Bluetooth, ANT+",
      "Durability": "MIL-STD-810",
    },
    score: { design: 4.3, performance: 5.0, battery: 5.0, value: 3.8, features: 5.0 },
    featured: true,
  },
  {
    id: "google-pixel-watch-3",
    name: "Google Pixel Watch 3",
    brand: "Google",
    category: "smartwatches",
    price: 349,
    rating: 4.5,
    reviewCount: 3102,
    badge: "new",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CHMJK9QD?tag=${AFFILIATE_TAG}`,
    shortDescription: "Google's most refined smartwatch with Fitbit health integration, loss of pulse detection, and pure Android experience.",
    pros: [
      "Best-in-class Fitbit health integration",
      "Loss of pulse detection (safety feature)",
      "Beautiful circular AMOLED display",
      "Pure Google/Android experience",
      "Improved battery life over predecessor",
    ],
    cons: [
      "Limited compatibility with iOS",
      "Smaller battery than competitors",
      "Fewer third-party apps",
    ],
    specs: {
      "Display": "1.2\" AMOLED",
      "Battery Life": "Up to 24 hours",
      "GPS": "GPS, GLONASS, Galileo",
      "Health Sensors": "Fitbit ECG, SpO2, Skin Temp",
      "Water Resistance": "5ATM",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.0, LTE",
      "OS": "Wear OS 4",
    },
    score: { design: 4.8, performance: 4.5, battery: 3.8, value: 4.4, features: 4.6 },
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "smartwatches",
    price: 799,
    rating: 4.9,
    reviewCount: 6789,
    badge: "editors-choice",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CHX3QBCH?tag=${AFFILIATE_TAG}`,
    shortDescription: "Apple's most capable and rugged watch, built for extreme sports and adventures with titanium case and 60-hour battery.",
    pros: [
      "Titanium case — incredibly durable",
      "Brightest Apple Watch display (3000 nits)",
      "60-hour battery in low-power mode",
      "Precision dual-frequency GPS",
      "Depth gauge and water temperature sensor",
    ],
    cons: [
      "Very expensive at $799",
      "Large 49mm case not for everyone",
      "Overkill for casual users",
    ],
    specs: {
      "Display": "49mm LTPO OLED (3000 nits)",
      "Battery Life": "Up to 60 hours (low power)",
      "GPS": "Precision dual-frequency L1 + L5",
      "Health Sensors": "ECG, Blood Oxygen, Temperature, Depth",
      "Water Resistance": "100m + EN13319 dive",
      "Case Material": "Grade 23 Titanium",
      "OS": "watchOS 11",
    },
    score: { design: 4.8, performance: 5.0, battery: 4.8, value: 3.5, features: 5.0 },
  },
  {
    id: "amazfit-balance",
    name: "Amazfit Balance",
    brand: "Amazfit",
    category: "smartwatches",
    price: 199,
    originalPrice: 249,
    rating: 4.4,
    reviewCount: 2341,
    badge: "best-value",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CQMYXBPJ?tag=${AFFILIATE_TAG}`,
    shortDescription: "Premium-looking smartwatch with Zepp OS, 14-day battery, and comprehensive health tracking at a mid-range price.",
    pros: [
      "Exceptional 14-day battery life",
      "Premium aluminum build under $200",
      "Comprehensive health tracking",
      "Built-in Alexa",
      "Works with iOS and Android",
    ],
    cons: [
      "Zepp OS app ecosystem is limited",
      "GPS accuracy inconsistent",
      "No ECG feature",
    ],
    specs: {
      "Display": "1.5\" AMOLED",
      "Battery Life": "Up to 14 days",
      "GPS": "GPS, GLONASS, BeiDou, Galileo",
      "Health Sensors": "SpO2, Stress, Sleep, HRV",
      "Water Resistance": "5ATM",
      "Connectivity": "Bluetooth 5.0, Wi-Fi",
      "OS": "Zepp OS 3.0",
    },
    score: { design: 4.4, performance: 4.2, battery: 5.0, value: 4.9, features: 4.3 },
  },

  // ─── FITNESS TRACKERS ────────────────────────────────────────
  {
    id: "fitbit-charge-6",
    name: "Fitbit Charge 6",
    brand: "Fitbit",
    category: "fitness-trackers",
    price: 159,
    originalPrice: 179,
    rating: 4.5,
    reviewCount: 15432,
    badge: "editors-choice",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CCQ7DNQL?tag=${AFFILIATE_TAG}`,
    shortDescription: "Google's best fitness tracker with built-in GPS, ECG, and 7-day battery — the definitive Fitbit experience.",
    pros: [
      "Built-in GPS (no phone needed)",
      "ECG and AFib detection",
      "Google Maps and Wallet integration",
      "7-day battery life",
      "Excellent Fitbit app ecosystem",
    ],
    cons: [
      "Requires Fitbit Premium for full features",
      "No onboard music storage",
      "Small display",
    ],
    specs: {
      "Display": "AMOLED color touchscreen",
      "Battery Life": "Up to 7 days",
      "GPS": "Built-in GPS",
      "Health Sensors": "ECG, SpO2, EDA, Skin Temp",
      "Water Resistance": "50m",
      "Connectivity": "Bluetooth 5.0, NFC",
    },
    score: { design: 4.3, performance: 4.6, battery: 4.5, value: 4.5, features: 4.7 },
    featured: true,
  },
  {
    id: "whoop-5",
    name: "WHOOP 5.0",
    brand: "WHOOP",
    category: "fitness-trackers",
    price: 239,
    rating: 4.7,
    reviewCount: 8901,
    badge: "top-rated",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0D3XFQFQF?tag=${AFFILIATE_TAG}`,
    shortDescription: "The most advanced recovery and performance tracker, worn 24/7 with no screen for pure biometric focus.",
    pros: [
      "Most detailed recovery & strain analytics",
      "Screenless design for 24/7 comfort",
      "Exceptional sleep tracking accuracy",
      "5-day battery life",
      "Continuous health monitoring",
    ],
    cons: [
      "Requires monthly membership ($30/mo)",
      "No display — app-only",
      "Expensive total cost of ownership",
    ],
    specs: {
      "Display": "None (app-only)",
      "Battery Life": "Up to 5 days",
      "GPS": "No built-in GPS",
      "Health Sensors": "HRV, SpO2, Skin Temp, Respiratory Rate",
      "Water Resistance": "IP68",
      "Connectivity": "Bluetooth 5.0",
    },
    score: { design: 4.0, performance: 5.0, battery: 4.5, value: 3.5, features: 4.9 },
  },
  {
    id: "garmin-vivosmart-5",
    name: "Garmin Vívosmart 5",
    brand: "Garmin",
    category: "fitness-trackers",
    price: 149,
    originalPrice: 169,
    rating: 4.4,
    reviewCount: 5678,
    badge: "best-value",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B09Y4QNHQ8?tag=${AFFILIATE_TAG}`,
    shortDescription: "Slim, elegant fitness band with Garmin's proven health tracking, Pulse Ox, and up to 7 days battery.",
    pros: [
      "Slim and lightweight design",
      "Garmin's trusted health algorithms",
      "7-day battery life",
      "Pulse Ox and stress tracking",
      "No subscription required",
    ],
    cons: [
      "No built-in GPS",
      "Small display",
      "Limited smart features",
    ],
    specs: {
      "Display": "0.7\" OLED touchscreen",
      "Battery Life": "Up to 7 days",
      "GPS": "Connected GPS (via phone)",
      "Health Sensors": "Pulse Ox, HRV, Stress, Body Battery",
      "Water Resistance": "5ATM",
      "Connectivity": "Bluetooth",
    },
    score: { design: 4.2, performance: 4.4, battery: 4.6, value: 4.8, features: 4.1 },
  },
  {
    id: "withings-scanwatch-2",
    name: "Withings ScanWatch 2",
    brand: "Withings",
    category: "fitness-trackers",
    price: 299,
    rating: 4.6,
    reviewCount: 3201,
    badge: "new",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0BT6BQKXP?tag=${AFFILIATE_TAG}`,
    shortDescription: "Medical-grade hybrid smartwatch that looks like a classic timepiece but tracks ECG, SpO2, and sleep apnea.",
    pros: [
      "Classic analog watch aesthetic",
      "Medical-grade ECG and SpO2",
      "Sleep apnea detection (FDA-cleared)",
      "30-day battery life",
      "No subscription required",
    ],
    cons: [
      "Small digital display",
      "Limited smart notifications",
      "Premium price for a tracker",
    ],
    specs: {
      "Display": "Hybrid analog + small digital",
      "Battery Life": "Up to 30 days",
      "GPS": "Connected GPS",
      "Health Sensors": "ECG, SpO2, Sleep Apnea, Temp",
      "Water Resistance": "5ATM",
      "Connectivity": "Bluetooth",
    },
    score: { design: 4.9, performance: 4.5, battery: 5.0, value: 4.0, features: 4.5 },
  },

  // ─── SMART RINGS ─────────────────────────────────────────────
  {
    id: "oura-ring-4",
    name: "Oura Ring 4",
    brand: "Oura",
    category: "smart-rings",
    price: 349,
    rating: 4.7,
    reviewCount: 9876,
    badge: "editors-choice",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CJXR9LZX?tag=${AFFILIATE_TAG}`,
    shortDescription: "The world's most advanced smart ring with 18 sensors, 8-day battery, and the most comprehensive health insights available.",
    pros: [
      "Most accurate sleep tracking available",
      "8-day battery life",
      "Discreet, jewelry-like design",
      "18 health sensors",
      "Excellent Oura app",
    ],
    cons: [
      "Requires $5.99/month membership",
      "No display",
      "Sizing requires ordering a kit first",
    ],
    specs: {
      "Form Factor": "Ring (sizes 6-13)",
      "Battery Life": "Up to 8 days",
      "Sensors": "18 sensors (PPG, SpO2, Temp, Accel)",
      "Water Resistance": "100m",
      "Material": "Titanium",
      "Connectivity": "Bluetooth 5.3",
      "Weight": "4-6 grams",
    },
    score: { design: 5.0, performance: 4.8, battery: 4.8, value: 4.0, features: 4.9 },
    featured: true,
  },
  {
    id: "samsung-galaxy-ring",
    name: "Samsung Galaxy Ring",
    brand: "Samsung",
    category: "smart-rings",
    price: 399,
    rating: 4.5,
    reviewCount: 4532,
    badge: "new",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0D3J5BXHP?tag=${AFFILIATE_TAG}`,
    shortDescription: "Samsung's first smart ring with no subscription fees, deep Galaxy ecosystem integration, and 7-day battery.",
    pros: [
      "No subscription fee",
      "Deep Samsung Health integration",
      "Lightweight titanium design",
      "7-day battery life",
      "Comprehensive health tracking",
    ],
    cons: [
      "Best with Samsung Galaxy phones",
      "No ECG feature",
      "Higher upfront cost",
    ],
    specs: {
      "Form Factor": "Ring (sizes 5-13)",
      "Battery Life": "Up to 7 days",
      "Sensors": "PPG, SpO2, Skin Temp, Accel",
      "Water Resistance": "IP68",
      "Material": "Titanium",
      "Connectivity": "Bluetooth 5.4",
      "Weight": "2.3-3.0 grams",
    },
    score: { design: 4.8, performance: 4.5, battery: 4.5, value: 4.3, features: 4.4 },
  },
  {
    id: "ringconn-gen2",
    name: "RingConn Gen 2",
    brand: "RingConn",
    category: "smart-rings",
    price: 199,
    originalPrice: 249,
    rating: 4.4,
    reviewCount: 2109,
    badge: "best-value",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CXYZ1234?tag=${AFFILIATE_TAG}`,
    shortDescription: "The best budget smart ring with no subscription, 10-day battery, and solid health tracking for the price.",
    pros: [
      "No subscription fee ever",
      "10-day battery life",
      "Affordable entry point",
      "Solid sleep and activity tracking",
      "Lightweight design",
    ],
    cons: [
      "Less accurate than Oura",
      "Smaller app ecosystem",
      "No SpO2 sensor",
    ],
    specs: {
      "Form Factor": "Ring (sizes 6-21)",
      "Battery Life": "Up to 10 days",
      "Sensors": "PPG, Skin Temp, Accel",
      "Water Resistance": "IP68",
      "Material": "Titanium alloy",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "3-5 grams",
    },
    score: { design: 4.2, performance: 4.2, battery: 5.0, value: 5.0, features: 3.9 },
  },

  // ─── SMART GLASSES ───────────────────────────────────────────
  {
    id: "ray-ban-meta-wayfarer",
    name: "Ray-Ban Meta Wayfarer",
    brand: "Ray-Ban | Meta",
    category: "smart-glasses",
    price: 299,
    rating: 4.6,
    reviewCount: 7654,
    badge: "editors-choice",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B0CG7XVMXR?tag=${AFFILIATE_TAG}`,
    shortDescription: "The most popular smart glasses with Meta AI, 12MP camera, open-ear audio, and iconic Wayfarer design.",
    pros: [
      "Iconic Wayfarer design — looks normal",
      "Meta AI voice assistant built-in",
      "12MP camera for photos & video",
      "Open-ear directional audio",
      "4-hour battery (32hr with case)",
    ],
    cons: [
      "Privacy concerns with camera",
      "No AR display",
      "Meta account required",
    ],
    specs: {
      "Camera": "12MP with 1080p video",
      "Battery Life": "4 hours (32hr with case)",
      "Audio": "Open-ear directional speakers",
      "AI": "Meta AI voice assistant",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4",
      "Weight": "49g",
    },
    score: { design: 5.0, performance: 4.5, battery: 3.8, value: 4.5, features: 4.6 },
    featured: true,
  },
  {
    id: "google-glass-enterprise-2",
    name: "Amazon Echo Frames (3rd Gen)",
    brand: "Amazon",
    category: "smart-glasses",
    price: 269,
    originalPrice: 299,
    rating: 4.3,
    reviewCount: 3421,
    badge: "best-value",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    amazonUrl: `https://www.amazon.ca/dp/B09BXQNBPX?tag=${AFFILIATE_TAG}`,
    shortDescription: "Amazon's smart glasses with Alexa built-in, premium audio, and all-day battery for hands-free AI assistance.",
    pros: [
      "Alexa hands-free integration",
      "All-day 14-hour battery",
      "Premium audio quality",
      "Multiple frame styles",
      "No camera for better privacy",
    ],
    cons: [
      "Alexa-only (no Google/Siri)",
      "No camera",
      "Requires Amazon account",
    ],
    specs: {
      "Camera": "None",
      "Battery Life": "Up to 14 hours",
      "Audio": "Directional speakers + microphones",
      "AI": "Alexa voice assistant",
      "Connectivity": "Bluetooth 5.1",
      "Water Resistance": "IPX4",
      "Weight": "31g",
    },
    score: { design: 4.5, performance: 4.3, battery: 4.8, value: 4.5, features: 4.1 },
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.category === categoryId);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getTopRatedProducts = (limit = 4) =>
  [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
