// =============================================================
// DEALS & DISCOUNTS — Amazon.ca Limited-Time Offers
// Update these regularly to drive affiliate conversions
// =============================================================

export interface Deal {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discount: number; // percentage
  amazonUrl: string;
  image: string;
  expiresAt: string; // ISO date
  badge?: "flash-sale" | "limited-time" | "today-only";
  description: string;
}

export const deals: Deal[] = [
  {
    id: "deal-fitbit-versa-4",
    productId: "fitbit-versa-4",
    productName: "Google Fitbit Versa 4",
    brand: "Google Fitbit",
    category: "smartwatches",
    originalPrice: 349,
    salePrice: 249,
    discount: 28,
    amazonUrl: "https://www.amazon.ca/Fitbit-Smartwatch-Readiness-Exercise-Tracking/dp/B0B75TVZZZ?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    expiresAt: "2026-05-25T23:59:59Z",
    badge: "limited-time",
    description: "Premium fitness smartwatch with GPS and 40+ exercise modes. Save $100 this week!",
  },
  {
    id: "deal-fitbit-charge-6",
    productId: "fitbit-charge-6",
    productName: "Google Fitbit Charge 6",
    brand: "Google Fitbit",
    category: "fitness-trackers",
    originalPrice: 249,
    salePrice: 179,
    discount: 28,
    amazonUrl: "https://www.amazon.ca/Fitbit-Advanced-Fitness-Management-Tracking/dp/B0CC62ZG1M?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    expiresAt: "2026-05-20T23:59:59Z",
    badge: "flash-sale",
    description: "Advanced fitness tracker with ECG and stress management. Limited time offer!",
  },
  {
    id: "deal-samsung-galaxy-ring",
    productId: "samsung-galaxy-ring",
    productName: "Samsung Galaxy Ring",
    brand: "Samsung",
    category: "smart-rings",
    originalPrice: 399,
    salePrice: 329,
    discount: 18,
    amazonUrl: "https://www.amazon.ca/Samsung-Fitness-Monitor-Tracker-Battery/dp/B0DDV4LTW7?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    expiresAt: "2026-05-22T23:59:59Z",
    badge: "limited-time",
    description: "Premium smart ring with 18 sensors and AI insights. Save $70 today!",
  },
  {
    id: "deal-xreal-air-4",
    productId: "xreal-air-4-pro",
    productName: "XReal Air 4 Pro AR Glasses",
    brand: "XReal",
    category: "smart-glasses",
    originalPrice: 649,
    salePrice: 549,
    discount: 15,
    amazonUrl: "https://www.amazon.ca/x-real-air-ar-glasses/s?k=x+real+air+ar+glasses?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1617638924702-92f37fcb0f6d?w=600&q=80",
    expiresAt: "2026-05-18T23:59:59Z",
    badge: "today-only",
    description: "Premium AR glasses with 201\" display and 120Hz 3D. Today only - save $100!",
  },
  {
    id: "deal-ringconn-gen-2",
    productId: "ringconn-gen-2",
    productName: "RingConn Gen 2 Smart Ring",
    brand: "RingConn",
    category: "smart-rings",
    originalPrice: 299,
    salePrice: 229,
    discount: 23,
    amazonUrl: "https://www.amazon.ca/smart-ring-health-tracker/s?k=smart+ring+health+tracker?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    expiresAt: "2026-05-21T23:59:59Z",
    badge: "limited-time",
    description: "No-subscription smart ring with 12-day battery. Save $70 this week!",
  },
  {
    id: "deal-tractive-dog-gps",
    productId: "tractive-dog-gps",
    productName: "Tractive XL Smart Dog GPS Tracker",
    brand: "Tractive",
    category: "pet-wearables",
    originalPrice: 129,
    salePrice: 99,
    discount: 23,
    amazonUrl: "https://www.amazon.ca/dog-tracking-collar/s?k=dog+tracking+collar?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1633722715463-d30628519d00?w=600&q=80",
    expiresAt: "2026-05-19T23:59:59Z",
    badge: "flash-sale",
    description: "Real-time GPS tracker for dogs with vital signs monitoring. Save $30!",
  },
  {
    id: "deal-garmin-bounce",
    productId: "garmin-bounce-2",
    productName: "Garmin Bounce 2 Kids Smartwatch",
    brand: "Garmin",
    category: "kids-wearables",
    originalPrice: 199,
    salePrice: 149,
    discount: 25,
    amazonUrl: "https://www.amazon.ca/stores/Garmin/page/A8DB24FD-BC99-49D1-B0FC-36F35ABC6B95?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1633722715463-d30628519d00?w=600&q=80",
    expiresAt: "2026-05-23T23:59:59Z",
    badge: "limited-time",
    description: "Premium kids smartwatch with GPS tracking. Save $50 this week!",
  },
  {
    id: "deal-jbl-tune-520",
    productId: "jbl-tune-520bt",
    productName: "JBL Tune 520BT Wireless Headphones",
    brand: "JBL",
    category: "bluetooth-headsets",
    originalPrice: 89,
    salePrice: 59,
    discount: 34,
    amazonUrl: "https://www.amazon.ca/bluetooth-headphones/s?k=bluetooth+headphones?tag=weyoowte-20",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    expiresAt: "2026-05-20T23:59:59Z",
    badge: "flash-sale",
    description: "Lightweight wireless headphones with 57-hour battery. Save $30 today!",
  },
];

export function getActiveDeals(): Deal[] {
  const now = new Date();
  return deals.filter((deal) => new Date(deal.expiresAt) > now);
}

export function getDealsByCategory(categoryId: string): Deal[] {
  return getActiveDeals().filter((deal) => deal.category === categoryId);
}

export function getTopDeals(limit: number = 6): Deal[] {
  return getActiveDeals()
    .sort((a, b) => b.discount - a.discount)
    .slice(0, limit);
}
