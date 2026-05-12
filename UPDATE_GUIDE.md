# Complete Guide: Updating Products, Deals & Blog

This guide explains how to manage your Wear Your Own Techs website content.

---

## Table of Contents
1. [Adding & Updating Products](#adding--updating-products)
2. [Managing Deals & Discounts](#managing-deals--discounts)
3. [Creating Blog Posts](#creating-blog-posts)
4. [Deploying Changes](#deploying-changes)

---

## Adding & Updating Products

### File Location
`client/src/lib/products.ts`

### Product Structure

Each product follows this structure:

```typescript
{
  id: "garmin-fenix-8",                    // Unique identifier (lowercase, hyphenated)
  name: "Garmin Fēnix 8 Solar",            // Full product name
  brand: "Garmin",                         // Brand name
  category: "smartwatches",                // Category ID (see categories list below)
  price: 599,                              // Current price in CAD
  originalPrice: 699,                      // Original price (optional, for sales)
  rating: 4.8,                             // Rating out of 5
  reviewCount: 1250,                       // Number of reviews
  badge: "editors-choice",                 // Optional: "editors-choice", "best-value", "new", "top-rated"
  image: "https://...",                    // Product image URL
  amazonUrl: "https://amzn.to/...",        // Amazon.ca affiliate link with your tag
  shortDescription: "Premium...",          // One-line description
  pros: [                                  // List of pros
    "Excellent battery life",
    "Durable sapphire glass",
    // ... more pros
  ],
  cons: [                                  // List of cons
    "Expensive",
    "Steep learning curve",
    // ... more cons
  ],
  specs: {                                 // Product specifications
    "Display": "1.4\" AMOLED",
    "Battery": "14 days",
    "Water Resistance": "10 ATM",
    "Weight": "52g",
    // ... more specs
  },
  score: {                                 // Expert scoring (0-5)
    design: 4.5,
    performance: 4.8,
    battery: 4.7,
    value: 4.2,
    features: 4.9,
  },
  featured: true,                          // Optional: show on homepage
}
```

### Available Categories

```
- smartwatches
- fitness-trackers
- smart-rings
- smart-glasses
- kids-wearables
- pet-wearables
- bluetooth-headsets
- wearable-pendants
- arm-wristbands
- tech-hats
- assistive-tech
- language-translators
```

### How to Add a Product

1. **Open** `client/src/lib/products.ts`
2. **Find** the products array and locate your category section
3. **Copy** an existing product in that category
4. **Paste** and update all fields:
   - `id`: Create a unique ID (lowercase, hyphenated)
   - `name`: Full product name
   - `brand`: Brand name
   - `price`: Current price
   - `rating`: Your expert rating (0-5)
   - `reviewCount`: Estimated reviews
   - `image`: Product image URL
   - `amazonUrl`: Your shortened Amazon.ca link with affiliate tag
   - `shortDescription`: One-line description
   - `pros`: List 3-5 main advantages
   - `cons`: List 2-3 main disadvantages
   - `specs`: Key specifications
   - `score`: Rate on design, performance, battery, value, features

5. **Update** the category's `productCount` at the top of the file
6. **Save** the file
7. **Deploy** to Cloudflare Pages (see Deploying Changes)

### Example: Adding a New Smartwatch

```typescript
{
  id: "apple-watch-series-10",
  name: "Apple Watch Series 10",
  brand: "Apple",
  category: "smartwatches",
  price: 549,
  originalPrice: 549,
  rating: 4.7,
  reviewCount: 2100,
  badge: "new",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  amazonUrl: "https://amzn.to/YOUR_LINK?tag=weyoowte-20",
  shortDescription: "Advanced health tracking with new S10 chip and larger display",
  pros: [
    "Bright 3.0\" display",
    "Advanced health sensors",
    "Seamless iPhone integration",
    "Fast performance",
  ],
  cons: [
    "Expensive",
    "Requires iPhone",
    "Limited customization",
  ],
  specs: {
    "Display": "3.0\" Retina LTPO OLED",
    "Battery": "18 hours",
    "Water Resistance": "50m",
    "Weight": "38g",
    "Processor": "Apple S10",
  },
  score: {
    design: 4.8,
    performance: 4.9,
    battery: 4.2,
    value: 4.0,
    features: 4.8,
  },
  featured: true,
}
```

---

## Managing Deals & Discounts

### File Location
`client/src/lib/deals.ts`

### Deal Structure

```typescript
{
  id: "deal-fitbit-versa-4",              // Unique deal ID
  productId: "fitbit-versa-4",            // Must match a product ID
  productName: "Google Fitbit Versa 4",   // Product name
  brand: "Google Fitbit",                 // Brand
  category: "smartwatches",               // Category
  originalPrice: 349,                     // Original price
  salePrice: 249,                         // Sale price
  discount: 28,                           // Discount percentage
  amazonUrl: "https://amzn.to/...",       // Amazon.ca link
  image: "https://...",                   // Product image
  expiresAt: "2026-05-25T23:59:59Z",      // Expiration date (ISO format)
  badge: "limited-time",                  // "flash-sale", "limited-time", "today-only"
  description: "Premium fitness...",      // Deal description
}
```

### How to Add a Deal

1. **Open** `client/src/lib/deals.ts`
2. **Find** the deals array
3. **Add** a new deal object:

```typescript
{
  id: "deal-samsung-galaxy-watch-8",
  productId: "samsung-galaxy-watch-8",
  productName: "Samsung Galaxy Watch 8",
  brand: "Samsung",
  category: "smartwatches",
  originalPrice: 449,
  salePrice: 349,
  discount: 22,
  amazonUrl: "https://amzn.to/YOUR_LINK?tag=weyoowte-20",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  expiresAt: "2026-05-30T23:59:59Z",
  badge: "limited-time",
  description: "Premium smartwatch with rotating bezel. Save $100!",
}
```

### Important Notes

- **expiresAt**: Use ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
- **discount**: Calculate as `((originalPrice - salePrice) / originalPrice) * 100`
- **badge**: Choose from "flash-sale", "limited-time", or "today-only"
- Only deals with future expiration dates show on the site
- Expired deals automatically disappear

---

## Creating Blog Posts

### File Location
`client/src/lib/blog.ts`

### Blog Post Structure

```typescript
{
  id: "blog-1",                           // Unique ID
  title: "The Ultimate Guide to...",      // Post title
  slug: "ultimate-guide-to-smartwatches", // URL slug (lowercase, hyphenated)
  excerpt: "Confused about...",           // Short summary (50-100 words)
  content: "# Full Markdown Content...",  // Full post in Markdown
  author: "Wear Your Own Techs",          // Author name
  category: "guide",                      // "news", "guide", "review", "tips"
  tags: ["smartwatch", "buying-guide"],   // Relevant tags
  image: "https://...",                   // Featured image
  publishedAt: "2026-05-10T10:00:00Z",    // Publication date (ISO format)
  updatedAt: "2026-05-12T14:30:00Z",      // Optional: update date
  readTime: 8,                            // Estimated read time in minutes
  featured: true,                         // Show on homepage
}
```

### How to Create a Blog Post

1. **Open** `client/src/lib/blog.ts`
2. **Find** the blogPosts array
3. **Add** a new post:

```typescript
{
  id: "blog-10",
  title: "Best Wearable Tech for Fitness in 2025",
  slug: "best-wearable-tech-fitness-2025",
  excerpt: "Discover the top wearable devices that will transform your fitness routine. From smartwatches to fitness trackers, we review the best options for tracking workouts and health metrics.",
  content: `# Best Wearable Tech for Fitness in 2025

## Introduction
Wearable technology has revolutionized how we track fitness...

## Top Fitness Wearables

### 1. Smartwatches
Smartwatches are the most versatile fitness devices...

### 2. Fitness Trackers
Dedicated fitness trackers focus on activity tracking...

## Conclusion
Choose a device that matches your fitness goals...`,
  author: "Wear Your Own Techs",
  category: "guide",
  tags: ["fitness", "wearables", "health", "tracking"],
  image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
  publishedAt: "2026-05-15T09:00:00Z",
  readTime: 10,
  featured: true,
}
```

### Content Format

Blog content uses **Markdown**. Here's a quick reference:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet point
- Another point

1. Numbered item
2. Another item

[Link text](https://example.com)

> Blockquote

\`\`\`
Code block
\`\`\`

\`inline code\`
```

### Blog Categories

- **news**: Product announcements, industry updates
- **guide**: How-to articles, buying guides, comparisons
- **review**: In-depth product reviews
- **tips**: Tips and tricks, optimization guides

### Best Practices

1. **Titles**: Make them descriptive and SEO-friendly (50-60 characters)
2. **Excerpts**: Write compelling summaries (50-100 words)
3. **Content**: Use headers, lists, and formatting for readability
4. **Tags**: Use 3-5 relevant tags for categorization
5. **Read Time**: Estimate based on ~200 words per minute
6. **Featured**: Mark important posts as featured for homepage

---

## Deploying Changes

### After Making Changes

1. **Save** your changes to the file
2. **Test locally** (if you have the dev environment running):
   ```bash
   npm run dev
   ```
3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add new products/deals/blog posts"
   git push origin main
   ```

### Cloudflare Pages Deployment

Cloudflare Pages automatically deploys when you push to GitHub:

1. Changes are detected automatically
2. Build process runs (takes ~2-3 minutes)
3. Site updates live at wearyourowntechs.com

### Troubleshooting

If changes don't appear:

1. **Clear browser cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. **Wait 5 minutes** for Cloudflare cache to clear
3. **Check GitHub** to confirm push was successful
4. **Check Cloudflare Pages dashboard** for build errors

---

## Quick Checklist

### Adding a Product
- [ ] Unique product ID
- [ ] All required fields filled
- [ ] Amazon.ca link with affiliate tag
- [ ] Image URL works
- [ ] Category exists and productCount updated
- [ ] Ratings between 0-5

### Adding a Deal
- [ ] Product ID matches existing product
- [ ] Discount percentage calculated correctly
- [ ] Expiration date in future
- [ ] Amazon.ca link with affiliate tag
- [ ] Image URL works

### Creating a Blog Post
- [ ] Unique post ID and slug
- [ ] SEO-friendly title
- [ ] Compelling excerpt
- [ ] Well-formatted Markdown content
- [ ] Relevant tags (3-5)
- [ ] Read time estimated
- [ ] Publication date set
- [ ] Featured status set

---

## Support & Questions

For issues or questions:
1. Check the file structure in `client/src/lib/`
2. Review existing entries as examples
3. Ensure all required fields are filled
4. Verify URLs are correct and accessible

Happy updating! 🚀
