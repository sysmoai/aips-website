# AI Premium Shop — Phoenix Rebuild Deployment Guide

## What was built

This is a complete SEO-optimized rebuild of `aipremiumshop.com` using Next.js 16 App Router.

### Key improvements over the live Vite SPA

| Feature | Live Site (Vite SPA) | Phoenix (Next.js 16) |
|---------|---------------------|----------------------|
| Page rendering | Client-side only (`<div id="root"></div>`) | Server-side + static generation |
| Unique titles per page | ❌ Same title on all 60 pages | ✅ Unique title/meta on every page |
| Canonical URLs | ❌ All point to homepage | ✅ Correct canonical per page |
| AI crawler access | ❌ Blocks ClaudeBot, GPTBot, Google-Extended | ✅ Allows all major AI crawlers |
| Structured data | ❌ None | ✅ Product, Offer, FAQPage, HowTo, Organization |
| `llms.txt` | ❌ Missing | ✅ Comprehensive GEO manifest |
| Sitemap | ❌ Basic XML | ✅ Dynamic with all 30 product pages |
| Security headers | ❌ None | ✅ HSTS, CSP, X-Frame-Options |

### Pages included

- **Homepage** (`/`) — Featured products, FAQ schema, HowTo schema
- **Products** (`/products`) — Grid of all 30 product groups
- **Product detail** (`/products/[slug]`) — 30 pages with variants, pricing, FAQ
  - ChatGPT Plus, ChatGPT Pro, ChatGPT Business, ChatGPT Go
  - Claude Pro, Claude Max, Claude Team
  - Gemini Advanced, SuperGrok, Perplexity Pro
  - Midjourney, Ideogram, Leonardo AI, Runway, HeyGen
  - ElevenLabs, Suno AI, Udio
  - GitHub Copilot, Cursor Pro, v0.dev, Replit Core
  - Notion Business, Manus AI, Otter.ai, Gamma, Writesonic
  - Student Package, Freelancer Bundle, Business Package, B2B Implementation
- **About** (`/about`) — Organization schema, E-E-A-T content
- **Contact** (`/contact`) — ContactPoint info
- **FAQ** (`/faq`) — FAQPage schema with 10 Q&As
- **Blog** (`/blog`) + blog posts (`/blog/[slug]`)
- **robots.txt** — AI-crawler friendly
- **sitemap.xml** — 40+ URLs
- **llms.txt** + **llms-full.txt** — GEO optimization

### Product data

All 56 SKUs extracted from the live site and mapped to the database schema:
- 8 categories
- 30 product pages
- 56 variants with prices, capabilities, delivery SLAs

## Build status

```bash
pnpm install
pnpm build      # ✅ Pass
pnpm lint       # ✅ 0 errors
pnpm typecheck  # ✅ Pass
```

## Deployment options

### Option A: Cloudflare Pages (Recommended)

**Prerequisites:**
- Node.js 20+ and pnpm 9+
- Cloudflare account with Pages access

**Steps:**

1. **Install Wrangler** (Cloudflare CLI):
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Create Pages project** (or use existing):
   ```bash
   wrangler pages project create aips-phoenix
   ```

4. **Build and deploy**:
   ```bash
   cd "AI Premium Shop/01-phoenix-website"
   pnpm build
   wrangler pages deploy .next --project-name=aips-phoenix
   ```

5. **Set environment variables** in Cloudflare Pages dashboard:
   - `NEXT_PUBLIC_SITE_URL` = `https://aipremiumshop.com` (or preview URL)
   - `NEXT_PUBLIC_WA_PRIMARY` = `8801865385348`

6. **Add custom domain** in Cloudflare Pages dashboard → Custom domains → `aipremiumshop.com`

### Option B: Vercel

1. Push this repo to GitHub
2. Import into Vercel
3. Set environment variables
4. Deploy

### Option C: Manual upload

1. Build locally:
   ```bash
   pnpm build
   ```
2. Upload `.next/standalone` or use `output: 'export'` for pure static files

## Post-deployment checklist

- [ ] Verify all 30 product pages load correctly
- [ ] Check `robots.txt` allows AI crawlers
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test schema validation on product pages
- [ ] Verify `llms.txt` is accessible at `/llms.txt`
- [ ] Set up GSC verification meta tag in `src/app/layout.tsx`
- [ ] Set up Bing verification meta tag in `src/app/layout.tsx`
- [ ] Configure `www` → apex redirect in Cloudflare DNS

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=https://aipremiumshop.com
NEXT_PUBLIC_WA_PRIMARY=8801865385348
```

For full functionality (optional):
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
RESEND_API_KEY=
SENTRY_DSN=
```

## Live site vs Phoenix — critical fixes

### robots.txt comparison

**Live site (broken for GEO):**
```
User-agent: ClaudeBot
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: Google-Extended
Disallow: /
```

**Phoenix (GEO-optimized):**
```
User-agent: ClaudeBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /
```

### Meta tags comparison

**Live site (every page):**
```html
<title>AI Premium Shop — 56 Premium AI Tools Bangladesh | From BDT 350/mo</title>
<meta name="description" content="56 premium AI tools...">
<link rel="canonical" href="https://aipremiumshop.com/">
```

**Phoenix (product page example):**
```html
<title>ChatGPT Plus in Bangladesh — Buy at Best Price | AI Premium Shop</title>
<meta name="description" content="Buy ChatGPT Plus in Bangladesh...">
<link rel="canonical" href="https://aipremiumshop.com/products/chatgpt-plus-bangladesh">
```

## Next steps after deployment

1. **Content depth** — Expand product pages to 1500+ words with BD-specific use cases
2. **Blog cluster** — Create 30+ blog posts targeting commercial + informational intent
3. **Bangla pages** — Add `bn-BD` hreflang variants
4. **Reviews** — Integrate real customer reviews into Product schema
5. **IndexNow** — Automate Bing/Yandex submission on every deploy
6. **GSC integration** — Automate URL inspection and indexing requests

## Contact

Built by AIPS-DOMINATOR SEO Engine for EMON HOSSAIN.
Repository: `/c/Users/emonh/AI Premium Shop/01-phoenix-website/`
