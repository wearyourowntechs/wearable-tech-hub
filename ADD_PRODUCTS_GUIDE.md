# How to Add Products to Wear Your Own Techs

## Overview
All products are stored in `client/src/lib/products.ts`. This guide shows you how to add new products and manage your product data.

---

## Step 1: Update Amazon URL to amazon.ca

First, change all Amazon links to use amazon.ca instead of amazon.com.

### Edit the products file:
```bash
# Open the products file
client/src/lib/products.ts
```

### Find and Replace:
Look for this line at the top:
```typescript
amazonUrl: `https://www.amazon.com/dp/B0CHX2F5NB?tag=${AFFILIATE_TAG}`,
```

Change `amazon.com` to `amazon.ca`:
```typescript
amazonUrl: `https://www.amazon.ca/dp/B0CHX2F5NB?tag=${AFFILIATE_TAG}`,
```

**Do this for ALL existing products** or use Find & Replace:
- Find: `https://www.amazon.com/`
- Replace with: `https://www.amazon.ca/`

---

## Step 2: Add a New Product

### Product Structure
Each product needs these fields:

```typescript
{
  id: "unique-product-id",                    // Unique identifier (lowercase, hyphens)
  name: "Product Name",                       // Full product name
  brand: "Brand Name",                        // Manufacturer
  category: "smartwatches",                   // Category ID (see below)
  price: 399,                                 // Current price in CAD
  originalPrice: 429,                         // Optional: original price before discount
  rating: 4.8,                                // Rating out of 5.0
  reviewCount: 12847,                         // Number of reviews
  badge: "editors-choice",                    // Optional: "editors-choice" | "best-value" | "new" | "top-rated"
  image: "https://...",                       // Product image URL
  amazonUrl: `https://www.amazon.ca/dp/ASIN?tag=${AFFILIATE_TAG}`,
  shortDescription: "Brief description...",   // 1-2 sentence summary
  pros: [                                     // Array of 4-5 pros
    "Pro 1",
    "Pro 2",
    "Pro 3",
    "Pro 4",
    "Pro 5",
  ],
  cons: [                                     // Array of 3-4 cons
    "Con 1",
    "Con 2",
    "Con 3",
  ],
  specs: {                                    // Key specs
    "Display": "1.3\" AMOLED",
    "Battery Life": "Up to 40 hours",
    "GPS": "GPS, GLONASS",
    "Water Resistance": "5ATM",
    "Connectivity": "Wi-Fi, Bluetooth 5.3",
    "OS": "Wear OS 5",
  },
  score: {                                    // Expert scores (0-5)
    design: 4.5,
    performance: 4.6,
    battery: 4.8,
    value: 4.7,
    features: 4.8,
  },
  featured: true,                             // Optional: shows on home page
}
```

### Category IDs
Use one of these for the `category` field:
- `"smartwatches"` — Full-featured smartwatches
- `"fitness-trackers"` — Fitness bands and trackers
- `"smart-rings"` — Smart rings
- `"smart-glasses"` — AR glasses and smart eyewear

### Badge Options
Optional badges that appear on product cards:
- `"editors-choice"` — Your top pick
- `"best-value"` — Best price-to-performance
- `"new"` — Newly released
- `"top-rated"` — Highest rated by users

---

## Step 3: Find Product ASIN and Images

### How to Get Amazon ASIN:
1. Go to the product on amazon.ca
2. Look at the URL: `https://www.amazon.ca/dp/B0D1YP5ZQH`
3. The ASIN is the part after `/dp/` → `B0D1YP5ZQH`

### How to Get Product Images:
1. Right-click the product image on Amazon
2. Select "Copy image link"
3. Paste into the `image` field

**Example:**
```typescript
image: "https://m.media-amazon.com/images/I/81example.jpg"
```

---

## Step 4: Add to products.ts

### Example: Adding a New Smartwatch

Open `client/src/lib/products.ts` and add your product to the `products` array:

```typescript
export const products: Product[] = [
  // ... existing products ...
  
  {
    id: "garmin-epix-gen-2",
    name: "Garmin Epix Gen 2",
    brand: "Garmin",
    category: "smartwatches",
    price: 599,
    originalPrice: 699,
    rating: 4.7,
    reviewCount: 3421,
    badge: "editors-choice",
    image: "https://m.media-amazon.com/images/I/81example.jpg",
    amazonUrl: `https://www.amazon.ca/dp/B0BVQVQVQV?tag=${AFFILIATE_TAG}`,
    shortDescription: "Premium outdoor smartwatch with AMOLED display, multi-band GPS, and 16-day battery life.",
    pros: [
      "Stunning AMOLED display",
      "Exceptional 16-day battery life",
      "Multi-band GPS (GPS, GLONASS, Galileo, BeiDou)",
      "Rugged titanium design",
      "Comprehensive fitness tracking",
    ],
    cons: [
      "Very expensive",
      "Overkill for casual users",
      "Limited app ecosystem",
    ],
    specs: {
      "Display": "1.3\" AMOLED",
      "Battery Life": "Up to 16 days",
      "GPS": "Multi-band (GPS, GLONASS, Galileo, BeiDou)",
      "Health Sensors": "ECG, SpO2, Temperature",
      "Water Resistance": "10ATM",
      "Connectivity": "Wi-Fi, Bluetooth 5.3, LTE",
      "OS": "Garmin OS",
    },
    score: {
      design: 4.8,
      performance: 4.9,
      battery: 5.0,
      value: 4.0,
      features: 4.8,
    },
    featured: true,
  },
];
```

---

## Step 5: Update Category Product Count

After adding a product, update the `productCount` in the categories array:

```typescript
export const categories: Category[] = [
  {
    id: "smartwatches",
    name: "Smartwatches",
    description: "...",
    image: "...",
    productCount: 7,  // ← Update this number
  },
  // ...
];
```

Count all products with `category: "smartwatches"` and update the number.

---

## Step 6: Deploy Your Changes

### If using Cloudflare Pages:
```bash
git add client/src/lib/products.ts
git commit -m "Add: Garmin Epix Gen 2 smartwatch"
git push origin main
```

Cloudflare will automatically rebuild and deploy your changes.

### If testing locally:
```bash
npm run dev
```

Then visit http://localhost:3000 to see your new product.

---

## Complete Example: Adding a Fitness Tracker

```typescript
{
  id: "fitbit-inspire-3",
  name: "Fitbit Inspire 3",
  brand: "Fitbit",
  category: "fitness-trackers",
  price: 149,
  rating: 4.4,
  reviewCount: 5678,
  badge: "best-value",
  image: "https://m.media-amazon.com/images/I/81example.jpg",
  amazonUrl: `https://www.amazon.ca/dp/B0BVQVQVQV?tag=${AFFILIATE_TAG}`,
  shortDescription: "Affordable fitness tracker with OLED display, sleep tracking, and 10-day battery.",
  pros: [
    "Affordable price point",
    "Bright OLED display",
    "Excellent sleep tracking",
    "10-day battery life",
    "Works with iOS and Android",
  ],
  cons: [
    "Limited smart features",
    "No GPS",
    "Requires Fitbit Premium for full features",
  ],
  specs: {
    "Display": "0.64\" OLED",
    "Battery Life": "Up to 10 days",
    "GPS": "No (connected GPS only)",
    "Health Sensors": "Heart Rate, SpO2, Sleep",
    "Water Resistance": "5ATM",
    "Connectivity": "Bluetooth 5.0",
    "Subscription": "Fitbit Premium (optional)",
  },
  score: {
    design: 4.2,
    performance: 4.3,
    battery: 4.6,
    value: 4.8,
    features: 3.9,
  },
}
```

---

## Tips for Best Results

### Product Images
- Use high-quality images (at least 400x400px)
- Use Amazon product images for consistency
- Avoid placeholder images

### Pricing
- Use Canadian pricing (CAD)
- Update prices monthly or when they change
- Include `originalPrice` if there's a current discount

### Ratings & Reviews
- Be honest with ratings
- Base ratings on real product performance
- Update review counts periodically

### Pros & Cons
- Be specific and detailed
- Focus on what matters to your audience
- Be balanced (don't just praise or criticize)

### Specs
- Include the most important specs
- Use consistent units (e.g., always use "hours" for battery)
- Match the format of existing products

### Featured Products
- Set `featured: true` for 3-5 top products
- These appear on the home page
- Update seasonally with new releases

---

## Troubleshooting

### Product doesn't appear on site
- Check that `id` is unique (no duplicates)
- Verify `category` matches one of the four categories
- Make sure the product is inside the `products` array

### Amazon link doesn't work
- Verify the ASIN is correct
- Check that URL uses `amazon.ca`
- Ensure `${AFFILIATE_TAG}` is at the end

### Product card looks broken
- Verify `image` URL is valid (test in browser)
- Check that all required fields are filled
- Look for typos in field names

### Changes don't appear
- If local: restart dev server (`npm run dev`)
- If deployed: wait 2-5 minutes for Cloudflare to rebuild
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)

---

## Quick Reference: Field Checklist

When adding a new product, make sure you have:

- [ ] Unique `id` (lowercase, hyphens)
- [ ] Product `name`
- [ ] `brand` name
- [ ] Valid `category` (smartwatches, fitness-trackers, smart-rings, smart-glasses)
- [ ] Canadian `price` (CAD)
- [ ] `rating` (0-5)
- [ ] `reviewCount` (number)
- [ ] Product `image` URL
- [ ] Amazon.ca `amazonUrl` with ASIN
- [ ] `shortDescription` (1-2 sentences)
- [ ] 4-5 `pros`
- [ ] 3-4 `cons`
- [ ] At least 6 `specs`
- [ ] All 5 `score` fields (design, performance, battery, value, features)
- [ ] Optional: `badge` (editors-choice, best-value, new, top-rated)
- [ ] Optional: `featured` (true/false)

---

## Need Help?

- **Amazon ASIN**: Look in the product URL after `/dp/`
- **Product Images**: Right-click on Amazon product image and copy link
- **Pricing**: Check amazon.ca for current Canadian prices
- **Ratings**: Base on real product reviews and your expertise

---

**Last Updated**: May 2026  
**Site**: Wear Your Own Techs (wearyourowntechs.com)  
**Affiliate Tag**: weyoowte-20
