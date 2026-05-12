# Cloudflare Pages Deployment Guide

## Overview
This guide walks you through deploying **Wear Your Own Tech** to Cloudflare Pages with your custom domain `wearyourowntechs.com`.

---

## Prerequisites
- A Cloudflare account (free tier works fine)
- Your domain `wearyourowntechs.com` registered and added to Cloudflare
- Git repository (GitHub, GitLab, or Gitea)
- Node.js 18+ installed locally

---

## Step 1: Prepare Your Repository

### Option A: Using GitHub (Recommended)
1. Create a new GitHub repository: `wearyourowntechs`
2. Push your project code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Wear Your Own Tech affiliate site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wearyourowntechs.git
   git push -u origin main
   ```

### Option B: Using GitLab or Gitea
Follow similar steps but use your GitLab/Gitea repository URL.

---

## Step 2: Connect to Cloudflare Pages

1. Log in to your **Cloudflare Dashboard**
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project** → **Connect to Git**
4. Select your Git provider (GitHub, GitLab, Gitea)
5. Authorize Cloudflare to access your repositories
6. Select the `wearyourowntechs` repository
7. Click **Begin setup**

---

## Step 3: Configure Build Settings

In the Cloudflare Pages setup form:

| Setting | Value |
|---------|-------|
| **Project name** | `wearyourowntechs` |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist/public` |
| **Root directory (advanced)** | `/` (leave blank) |
| **Environment variables** | See section below |

### Environment Variables
Add these environment variables in the Cloudflare Pages dashboard:

```
VITE_APP_TITLE=Wear Your Own Tech
VITE_APP_LOGO=https://wearyourowntechs.com/logo.png
```

(These are optional; the app will work without them)

---

## Step 4: Deploy

1. Click **Save and Deploy**
2. Cloudflare will automatically build and deploy your site
3. Your site will be available at: `https://wearyourowntechs.pages.dev`
4. Wait for the deployment to complete (usually 2–5 minutes)

---

## Step 5: Connect Your Custom Domain

1. In Cloudflare Pages dashboard, go to your project
2. Click **Settings** → **Domains**
3. Click **Add domain**
4. Enter: `wearyourowntechs.com`
5. Cloudflare will verify the domain (should be automatic if your domain is already on Cloudflare)
6. Your site is now live at: `https://wearyourowntechs.com`

---

## Step 6: Configure DNS (if needed)

If your domain isn't already on Cloudflare:

1. Go to your domain registrar
2. Update nameservers to Cloudflare's:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
3. Wait 24–48 hours for DNS propagation
4. Then follow Step 5 above

---

## Step 7: Enable HTTPS & Security

In Cloudflare dashboard:

1. **SSL/TLS** → Set to **Full (strict)**
2. **Security** → Enable **Bot Management** (optional, free tier available)
3. **Caching** → Set **Browser Cache TTL** to `30 minutes`
4. **Page Rules** → Optional: Cache everything for better performance

---

## Step 8: Verify Deployment

Test your site:
- Visit `https://wearyourowntechs.com`
- Check all pages load correctly
- Test affiliate links (they should include your tag: `weyoowte-20`)
- Test the comparison tool and category filters

---

## Continuous Deployment

After initial setup, every time you push to `main` branch:
```bash
git add .
git commit -m "Update: [your changes]"
git push origin main
```

Cloudflare Pages will automatically rebuild and redeploy your site.

---

## Troubleshooting

### Build fails with "npm run build" error
- Ensure `package.json` exists in the root directory
- Check that all dependencies are listed in `package.json`
- Verify Node.js version compatibility (18+)

### Site shows 404 errors on subpages
- Ensure `_redirects` file exists in `client/public/`
- Cloudflare Pages should automatically handle SPA routing

### Custom domain not working
- Verify domain is added to your Cloudflare account
- Check DNS records are pointing to Cloudflare
- Wait 24–48 hours for DNS propagation

### Affiliate links not working
- Verify `weyoowte-20` tag is active in your Amazon Associates account
- Test a link directly: `https://www.amazon.com/dp/[ASIN]?tag=weyoowte-20`

---

## Performance Optimization

For better performance:

1. **Enable Brotli compression** in Cloudflare → Speed → Optimization
2. **Enable HTTP/2 Push** (Cloudflare → Speed → Optimization)
3. **Set up Page Rules** for aggressive caching:
   - Pattern: `wearyourowntechs.com/*`
   - Cache Level: `Cache Everything`
   - Browser Cache TTL: `1 month`

---

## Monitoring & Analytics

1. In Cloudflare dashboard, go to **Analytics**
2. Monitor:
   - Page views
   - Unique visitors
   - Traffic by country
   - Top pages

For affiliate conversion tracking, integrate with Amazon Associates dashboard separately.

---

## Need Help?

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Vite Docs**: https://vitejs.dev/
- **Amazon Associates**: https://associates.amazon.com/

---

**Last Updated**: May 2026
**Site**: Wear Your Own Tech (wearyourowntechs.com)
**Affiliate Tag**: weyoowte-20
