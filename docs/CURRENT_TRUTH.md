# PROJECT PHOENIX — CURRENT TRUTH v4.1
# Reconciled: 14 July 2026 | Agent: Command Code
# Verification: [MEDIUM-HIGH] via git + file reads + build attempt

## Repository
- Repo: sysmoai/aips-website (private)
- Branch: main
- HEAD: 95808b9 (fix: final audit gaps — delivery times, button types, official partner wording)
- Framework: Next.js 16.2.4 (App Router, Static Export)
- Package: pnpm 9.15.9
- Node target: >=20 <21 (local: v26 — incompatible but works)

## Product Catalog (from src/data/products.json)
- Total products (SKUs): 86
- Unique product groups (slugs): 41  
- Brands: 35
- Categories: 8 (ai-assistant, ai-code, ai-image, ai-video, ai-voice-music, ai-workspace, ai-writing, bundles)
- Missing categories vs Replit: "ai-design" (Canva Pro, Gamma — these are in ai-image/writing on Phoenix)

## Page Inventory
### Static (SSG):
- /, /products, /about, /contact, /faq, /privacy, /terms
- /products/[slug] — 41 groups via generateStaticParams
- /category/[slug] — 8 categories
- /blog, /blog/[slug] — 3 posts

### Comparison pages (7):
- /chatgpt-vs-claude, /chatgpt-vs-gemini, /copilot-vs-cursor
- /midjourney-vs-ideogram, /midjourney-vs-leonardo, /canva-vs-adobe, /suno-vs-udio

### Missing vs Replit live site:
- /best-ai-for-* guides (students, freelancers, etc.) — 10 segment pages
- /ai-under-500, /best-ai-budget-bangladesh — budget filters
- /pricing unified page
- /how-to-order, /support 
- No city pages, no bundle detail pages

## Build Status
- pnpm install: ✅ passes (Node version warning, skip devDeps)
- pnpm build: ❓ not yet run (needs devDeps for TypeScript)
- pnpm typecheck: ❌ tsc not installed (devDeps skipped in production env)
- pnpm lint: ❓ not yet run

## SEO/AIO/GEO Layer
- ✅ Dynamic sitemap.ts (42 product + 8 category + 7 comparison + 3 blog = 60 dynamic entries)
- ✅ AI-friendly robots.ts (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, etc. ALL allowed)
- ✅ JSON-LD components (Organization, Website, Product, Offer, FAQPage, HowTo, BreadcrumbList)
- ❌ No llms.txt (layouts.tsx references /llms.txt but file doesn't exist)
- ❌ No llms-full.txt
- ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.) in next.config.ts
- Status: AEO layer in place, llms.txt files need creation

## Compliance
- ✅ No credential-sharing language found in product descriptions
- ✅ "Official partner" language removed per latest commit
- ✅ Delivery times labeled with timeframe ranges
- ⚠️ DMARC still missing for aipremiumshop.com
- ⚠️ Trademark disclaimer present on some pages but not all money pages

## Deployment
- Target: Cloudflare Pages (project aips-landing)
- Status: BLOCKED (per STATE.json — invalid API token)
- Alternative: GitHub Pages preview live at https://sysmoai.github.io/aips-website/
- CEO cutover gate: NOT yet approved for apex domain

## Gaps (ranked by Priority Score)
1. P0: Build breaks — tsc/devDeps not installed (NODE_ENV=production)
2. P0: 86 SKUs but #References on homepage say "86+" — should match product count
3. P0: 41 product groups vs Replit live site's 44 (missing: some bundle variants)
4. P1: llms.txt + llms-full.txt not created (layout references them)
5. P1: Cloudflare Pages deployment token broken
6. P1: Product pages missing Bangla content blocks
7. P1: Segment pages (best-ai-for-*) not implemented
8. P2: Model names need update (GPT-5.4 → GPT-5.5)
9. P2: DMARC for aipremiumshop.com
10. P2: Trademark disclaimer not on all money pages
