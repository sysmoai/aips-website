# BUILD_STATE — AIPS Cinematic Storefront

Updated: 2026-07-27 (session: Claude Fable 5, Mac)

## Phase
1 of N — Pricing integrity + stack audit COMPLETE. Next: product page system.

## Stack truth (verified)
- Next.js 16.2.4 + React 19 + Tailwind 4 + TypeScript. 40 static routes, SSG.
- Deploy: Cloudflare Pages project "aips-landing" via `deploy.sh` (wrangler OAuth)
  or manual dashboard upload (see DEPLOY-CEO.md). NOT auto-deployed from git.
  NOTE: aipremiumshop.com currently points at dead Replit infra (404) — DNS
  change is a pending Human Gate.
- `src/data/products.json`: 103 entries → 52 product slugs, 45 brands. Had
  UTF-8 BOM (fixed). CORRECTION to earlier note: the catalog IS consumed —
  /products, /products/[slug], /category/[slug] read it via
  src/lib/data/products.ts. Persona/city/blog pages still hardcode copy.

## Completed this session
- CEO pricing applied everywhere (ChatGPT Plus Starter 350→499, Premium
  950→999, Personal 2990 unchanged; Google AI Pro 500→499) across
  products.json (numeric + FAQ/SEO/WhatsApp strings, EN+BN) and 27 tsx files.
- Fixed pre-existing copy bug: all Claude entries' SEO claimed "from ৳350/mo"
  (Claude actually starts ৳1,495). Fixed to ৳1,495.
- competitorCompare AIPS floor rows corrected to "From ৳270/mo" (true catalog
  floor from products.json).
- "Under ৳500" budget-category thresholds preserved (not prices).
- typecheck ✓, next build ✓ (all 40 routes SSG clean).

## Open gaps (ranked)
1. DONE 2026-07-27: Vercel project "aips-website" created, git-linked to
   sysmoai/aips-website — pushes now auto-deploy. (CF Pages manual pipeline
   remains as legacy.)
2. DONE 2026-07-27: /public/media structure + MediaImage/MediaVideo
   components (lazy, poster-backed, reduced-motion aware). Media files
   themselves pending Higgsfield renders — briefs to emit next.
3. Design-token system (Higgsfield-grade dark cinematic spec): tokens for
   color/type/motion, glass cards, video hero slot on homepage.
4. Persona/city/blog pages still hardcode prices/copy — migrate to catalog.
5. Bangla route coverage partial; no EN/BN toggle component.
6. JSON-LD present only on some pages; audit Product/Offer/FAQ schema.
7. Port best content from aips-landing (testimonials, offers data) — merge
   decision 2026-07-27: aips-website is THE canonical AIPS site.

## Pending Human Gates
- DNS at registrar (3 domains ready on Vercel side; aipremiumshop.com brand
  decision: AIPS landing vs SAVEONSUB store vs THIS repo's CF deployment).
- Notion pricing DB public link (user chose option 1) for the 72-product sync
  (saveonsub) and any further CEO price changes here.
- Approval of any new price this build surfaces (none pending).

## Continuity log
- 2026-07-27: Session start. Stack verified, pricing law enforced repo-wide,
  build green, this file created. Next pass: product page system + tokens.
