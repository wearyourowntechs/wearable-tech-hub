# Quick Guide: Updating Product Prices & Images

This is a simple, step-by-step guide for updating product prices and images on your website.

---

## 📍 Where to Make Changes

**File:** `client/src/lib/products.ts`

This single file contains all your products. You don't need to touch any other files.

---

## 💰 Updating Product Prices

### Step 1: Find the Product

Open `client/src/lib/products.ts` and search for the product name (Ctrl+F or Cmd+F).

Example: Search for "Fitbit Versa 4"

### Step 2: Update the Price

Find these two lines:

```typescript
price: 299,              // Current sale price
originalPrice: 349,     // Original price (optional)
```

**Change to your new prices:**

```typescript
price: 279,             // New sale price
originalPrice: 349,     // Keep original or update if needed
```

### Step 3: Save & Deploy

1. Save the file (Ctrl+S or Cmd+S)
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update product prices"
   git push origin main
   ```
3. Wait 2-3 minutes for Cloudflare to deploy
4. Check your site at wearyourowntechs.com

---

## 🖼️ Updating Product Images

### Option 1: Use Unsplash URLs (Free & Easy)

Unsplash has thousands of free product images. Here's how:

1. Go to https://unsplash.com
2. Search for your product (e.g., "smartwatch", "fitness tracker")
3. Click on an image you like
4. Copy the image URL (it looks like: `https://images.unsplash.com/photo-...`)
5. Find the product in `products.ts`
6. Update the `image` field:

```typescript
image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
```

**Example:**
```typescript
{
  id: "fitbit-versa-4",
  name: "Google Fitbit Versa 4",
  // ... other fields ...
  image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",  // ← Update this
  // ... rest of product ...
}
```

### Option 2: Use Real Amazon Product Images

You can grab the image URL directly from Amazon.ca:

1. Go to the product page on Amazon.ca
2. Right-click on the product image
3. Select "Copy image link"
4. Paste into the `image` field in `products.ts`

**Example:**
```typescript
image: "https://m.media-amazon.com/images/I/71...",
```

### Option 3: Upload Your Own Images (Advanced)

If you have product images on your computer:

1. Upload using the command:
   ```bash
   manus-upload-file /path/to/image.jpg
   ```
2. Copy the returned URL
3. Paste into the `image` field

---

## 🔄 Complete Example: Update a Product

Here's a real example of updating both price and image:

**BEFORE:**
```typescript
{
  id: "fitbit-versa-4",
  name: "Google Fitbit Versa 4",
  brand: "Google Fitbit",
  category: "smartwatches",
  price: 299,                    // ← Old price
  originalPrice: 349,
  rating: 4.5,
  reviewCount: 2847,
  badge: "editors-choice",
  image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",  // ← Old image
  amazonUrl: "https://www.amazon.ca/Fitbit-Smartwatch-Readiness-Exercise-Tracking/dp/B0B75TVZZZ?tag=weyoowte-20",
  // ... rest of fields ...
}
```

**AFTER (Updated):**
```typescript
{
  id: "fitbit-versa-4",
  name: "Google Fitbit Versa 4",
  brand: "Google Fitbit",
  category: "smartwatches",
  price: 249,                    // ← New price
  originalPrice: 299,            // ← Updated original price
  rating: 4.5,
  reviewCount: 2847,
  badge: "editors-choice",
  image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",  // ← New image
  amazonUrl: "https://www.amazon.ca/Fitbit-Smartwatch-Readiness-Exercise-Tracking/dp/B0B75TVZZZ?tag=weyoowte-20",
  // ... rest of fields unchanged ...
}
```

---

## 📋 Quick Checklist

When updating prices:
- [ ] Found the correct product in `products.ts`
- [ ] Updated `price` field
- [ ] Updated `originalPrice` if needed
- [ ] Saved the file
- [ ] Pushed to GitHub
- [ ] Waited 2-3 minutes for deployment
- [ ] Cleared browser cache and verified on live site

When updating images:
- [ ] Found the correct product in `products.ts`
- [ ] Found a good image (Unsplash, Amazon, or uploaded)
- [ ] Copied the image URL
- [ ] Updated the `image` field
- [ ] Saved the file
- [ ] Pushed to GitHub
- [ ] Verified on live site

---

## 🚀 Batch Updates (Multiple Products)

If you need to update many products at once:

1. Open `products.ts` in a text editor
2. Use Find & Replace (Ctrl+H or Cmd+H):
   - **Find:** `price: 299,`
   - **Replace:** `price: 249,`
3. Review changes carefully
4. Save and push to GitHub

---

## ❓ Troubleshooting

### Image not showing?
- Check the URL is correct (paste in browser address bar)
- Make sure URL starts with `https://`
- Try a different image from Unsplash

### Price not updating?
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5 minutes for Cloudflare cache to clear
- Check GitHub to confirm push was successful

### Can't find the product?
- Use Ctrl+F to search for product name
- Make sure you're searching in the right file: `client/src/lib/products.ts`

---

## 💡 Pro Tips

1. **Batch updates:** Update multiple products at once before pushing
2. **Keep backups:** Screenshot your prices before making bulk changes
3. **Test locally:** If you have the dev environment, run `npm run dev` to test changes before pushing
4. **Use consistent images:** Try to use similar quality/style images across products
5. **Update regularly:** Change prices weekly to show active management and drive repeat visits

---

## Need Help?

If you get stuck:
1. Check the UPDATE_GUIDE.md for more detailed information
2. Review the example products in `products.ts` for reference
3. Make sure you're editing the right file: `client/src/lib/products.ts`

Happy updating! 🎉
