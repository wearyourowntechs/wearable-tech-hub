# Wear Your Own Tech — Amazon Affiliate Website

A professional, high-performance Amazon affiliate website specializing in wearable technology reviews, comparisons, and buying guides.

**Live Site**: https://wearyourowntechs.com  
**Affiliate Tag**: `weyoowte-20`

---

## 🎯 Features

### Core Pages
- **Home** — Hero section with featured products, trust metrics, and category showcase
- **Category Pages** — Smartwatches, Fitness Trackers, Smart Rings, Smart Glasses with filtering and sorting
- **Product Detail Pages** — Full reviews with specs, pros/cons, expert scores, and affiliate links
- **Reviews Page** — All 15+ products with category filtering
- **Buying Guides** — 4 in-depth guides covering each category
- **Comparison Tool** — Side-by-side product comparison (up to 3 products)

### Design
- **Dark Precision Aesthetic** — Industrial tech minimalism with electric cyan accents
- **Typography** — Space Grotesk (display) + DM Sans (body) + JetBrains Mono (specs)
- **Responsive** — Mobile-first, works on all devices
- **Performance** — Optimized for fast load times and SEO

### Affiliate Integration
- All 15 products link to Amazon with your affiliate tag: `weyoowte-20`
- Affiliate disclosure on product pages
- Automatic link generation via centralized constant

---

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
# http://localhost:3000
```

### Build for Production
```bash
npm run build
```

---

## 📦 Project Structure

```
wearable-tech-hub/
├── client/
│   ├── public/
│   │   ├── _redirects          # Cloudflare Pages routing
│   │   ├── robots.txt          # SEO robots file
│   │   ├── sitemap.xml         # SEO sitemap
│   │   └── favicon.ico
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   ├── ProductPage.tsx
│   │   │   ├── ReviewsPage.tsx
│   │   │   ├── BuyingGuidesPage.tsx
│   │   │   ├── ComparePage.tsx
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── lib/
│   │   │   └── products.ts      # Product data & affiliate links
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── CLOUDFLARE_DEPLOYMENT.md     # Deployment guide
├── wrangler.toml                # Cloudflare config
├── package.json
└── README.md
```

---

## 🔗 Affiliate Link Setup

All affiliate links are generated using a centralized constant in `client/src/lib/products.ts`:

```typescript
export const AFFILIATE_TAG = "weyoowte-20";

// Links are built like this:
amazonUrl: `https://www.amazon.com/dp/B0CHX2F5NB?tag=${AFFILIATE_TAG}`
```

To update your affiliate tag:
1. Edit `client/src/lib/products.ts`
2. Change `AFFILIATE_TAG` to your new tag
3. Redeploy

---

## 🌐 Deployment

### Option 1: Cloudflare Pages (Recommended)
See `CLOUDFLARE_DEPLOYMENT.md` for step-by-step instructions.

**Quick Summary:**
1. Push code to GitHub
2. Connect to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist/public`
5. Add custom domain: `wearyourowntechs.com`

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist/public
```

---

## 📊 Product Data

Products are stored in `client/src/lib/products.ts`:

```typescript
interface Product {
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
}
```

To add a new product:
1. Add entry to `products` array in `client/src/lib/products.ts`
2. Include all required fields
3. Redeploy

---

## 🎨 Customization

### Change Brand Name
1. Update `client/src/components/Navbar.tsx` — logo text
2. Update `client/index.html` — page title
3. Update `CLOUDFLARE_DEPLOYMENT.md` — references

### Change Colors
Edit `client/src/index.css` — CSS variables in `:root`:
```css
:root {
  --primary: oklch(0.85 0.18 195);  /* Electric cyan */
  --background: oklch(0.09 0.008 265);  /* Dark charcoal */
  /* ... */
}
```

### Change Fonts
Update Google Fonts link in `client/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;700&display=swap" rel="stylesheet" />
```

---

## 📈 SEO Optimization

### Included
- ✅ Semantic HTML
- ✅ Meta tags (title, description, OG tags)
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Mobile-responsive
- ✅ Fast load times

### To Improve Further
1. **Add long-form reviews** — 800–1,200 words per product
2. **Blog section** — Weekly wearable tech news/updates
3. **Structured data** — Add JSON-LD for rich snippets
4. **Internal linking** — Cross-link related products
5. **Keyword optimization** — Target "best smartwatch 2025" etc.

---

## 🔐 Security

- No sensitive data stored in code
- Affiliate links are public (by design)
- HTTPS enforced via Cloudflare
- No database or backend (static site)

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Routing**: Wouter (lightweight client-side router)
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui + Radix UI
- **Build**: Vite
- **Hosting**: Cloudflare Pages (or Vercel/Netlify)

---

## 📝 License

This project is for personal use. Ensure you comply with Amazon Associates Program policies.

---

## 🤝 Support

For issues or questions:
1. Check `CLOUDFLARE_DEPLOYMENT.md` for deployment help
2. Review `client/src/lib/products.ts` for product data structure
3. Consult Vite docs: https://vitejs.dev/
4. Cloudflare Pages docs: https://developers.cloudflare.com/pages/

---

## 📅 Maintenance

### Weekly
- Monitor affiliate dashboard for conversions
- Check Google Analytics for traffic patterns

### Monthly
- Update product prices/ratings
- Add new products if available
- Review and optimize underperforming pages

### Quarterly
- Refresh buying guides with new products
- Update SEO strategy based on search trends
- Analyze competitor sites for feature ideas

---

**Last Updated**: May 2026  
**Affiliate Program**: Amazon Associates  
**Affiliate Tag**: `weyoowte-20`
