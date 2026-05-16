# AIPS Website Launch — Morning Brief
**Date:** 2026-05-17 03:20 Asia/Dhaka  
**Prepared by:** Kimi Desktop (autonomous overnight run)  
**Status:** SITE COMPLETE — DNS cutover only remaining step

---

## Executive Summary

**aipremiumshop.com is ready to go live.** The site is fully built, deployed, and operational at `https://aips-landing.pages.dev`. All pages, products, WhatsApp integration, SEO, and mobile responsiveness are complete.

**The ONLY blocker:** `aipremiumshop.com` DNS currently points to Google Cloud (Replit origin, returning 404). It needs to be moved to Cloudflare DNS and connected to the Pages project.

**Time to complete:** ~10 minutes of your time + DNS propagation (typically 15 min–2 hours).

---

## What Was Verified Overnight

### Site Completeness ✅
| Feature | Status | Evidence |
|---------|--------|----------|
| Homepage | ✅ Live | `/` → 200, full hero, CTA, stats |
| Products page | ✅ Live | `/products` → 200, 56 products |
| Pricing page | ✅ Live | `/pricing` → 200, full comparison table |
| About page | ✅ Live | `/about` → 200 |
| Contact page | ✅ Live | `/contact` → 200 |
| FAQ page | ✅ Live | `/faq` → 200 |
| Blog page | ✅ Live | `/blog` → 200 |
| How to Order | ✅ Live | `/how-to-order` → 200 |
| Terms | ✅ Live | `/terms` → 200 |
| Privacy | ✅ Live | `/privacy` → 200 |
| Floating WhatsApp | ✅ Present | Pulse animation, hover tooltip, `wa.me/8801865385348` |
| Mobile Order Bar | ✅ Present | Fixed bottom bar on scroll |
| SEO (sitemap) | ✅ Complete | 77 URLs, canonical `aipremiumshop.com` |
| OG/Twitter cards | ✅ Complete | All pages |
| Favicon set | ✅ Complete | SVG + PNG + Apple touch |
| bKash/Nagad mentions | ✅ Present | Multiple sections |
| 56 products catalog | ✅ Complete | `data/products.json` verified |
| Admin orders page | ✅ Exists | `/admin/orders` with auth guard |

### Product Catalog
- **56 AI tools** across 7 categories (AI Assistant, Image, Video, Voice/Music, Code, Workspace, Bundles)
- **Pricing range:** BDT 350 – 29,900/mo
- **Brands:** ChatGPT, Claude, Google AI, Grok, Perplexity, Midjourney, Ideogram, Leonardo, Runway, HeyGen, ElevenLabs, Suno, Udio, GitHub Copilot, Cursor, v0.dev, Replit, Notion, Manus, Otter, Gamma, Writesonic
- **Bundles:** Student Essentials, University Pro, Freelancer, Business, B2B Implementation

### Build Verification
- **Local build:** ✅ Successful (after adding darwin-arm64 platform packages)
- **Bundle size:** 1.09 MB JS (gzipped 293 KB), 167 KB CSS (gzipped 26 KB)
- **Build time:** ~1.3s
- **GitHub Actions:** ⚠️ Last 5 runs failed (Apr 19–20), likely lockfile-related

---

## DNS Blocker — Exact Steps to Fix

### Current State
```
aipremiumshop.com A record → 34.111.179.208 (Google Cloud / old Replit)
NS → ns-cloud-d1.googledomains.com (Google Domains)
www → No CNAME set
```

### What You Need to Do

#### Option A: Cloudflare Dashboard (Recommended — 5 min)

1. **Log into Cloudflare** → `https://dash.cloudflare.com`
   - Account: `Sysmoai.com@gmail.com`

2. **Add Site**
   - Click "Add a Site"
   - Enter: `aipremiumshop.com`
   - Select **Free plan**

3. **Change Nameservers at Google Domains**
   - Cloudflare will give you 2 nameservers (e.g., `lara.ns.cloudflare.com`, `greg.ns.cloudflare.com`)
   - Go to `https://domains.google.com` → manage `aipremiumshop.com`
   - Change DNS → Custom name servers
   - Enter the 2 Cloudflare nameservers
   - Save

4. **Add Custom Domain to Pages**
   - Cloudflare Dashboard → Workers & Pages → `aips-landing`
   - Custom Domains tab → "Set up a custom domain"
   - Enter: `aipremiumshop.com`
   - Also add: `www.aipremiumshop.com`
   - Cloudflare will auto-create DNS records

5. **Wait for propagation**
   - Usually 15 min – 2 hours
   - Check: `dig aipremiumshop.com NS` should show Cloudflare nameservers

#### Option B: Wrangler CLI (If you prefer terminal)

```bash
# 1. Authenticate
wrangler login

# 2. Add domain to Cloudflare zone (creates zone + fetches NS)
# This requires API token — use dashboard for initial setup instead

# 3. After NS propagation, add to Pages project
curl -X POST "https://api.cloudflare.com/client/v4/accounts/4ca6269edabb6ad2906d70ec6845de22/pages/projects/aips-landing/domains" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"aipremiumshop.com"}'
```

> **Note:** Option B requires `CLOUDFLARE_API_TOKEN` with `Zone:Edit` and `Page Rules:Edit` permissions. If you don't have one saved, use Option A.

---

## What I Could Not Do Autonomously

| Task | Why Blocked | What You Need |
|------|-------------|---------------|
| DNS cutover | No Cloudflare API token; domain on Google Domains | Your Cloudflare login + Google Domains access |
| Trigger GitHub Actions deploy | Workflow failing since Apr 20 | Debug lockfile issue or deploy manually via wrangler |
| Add domain to Cloudflare zone | Requires Zone:Edit permission | Dashboard access or API token |

---

## Post-DNS Checklist

After DNS propagates, verify:

```bash
# 1. Domain resolves to Cloudflare
dig aipremiumshop.com NS
# Expected: lara.ns.cloudflare.com, greg.ns.cloudflare.com

# 2. HTTPS works
curl -sI https://aipremiumshop.com
# Expected: HTTP/2 200

# 3. WWW redirects
curl -sI https://www.aipremiumshop.com
# Expected: 301/308 redirect to https://aipremiumshop.com

# 4. All pages load
for p in / /pricing /products /about /contact /faq; do
  curl -s -o /dev/null -w "$p: %{http_code}\n" https://aipremiumshop.com$p
done
```

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| DNS propagation >2h | Medium | Delayed launch | Start DNS change immediately; site already works on Pages URL |
| MX records break | Low | Email down | Cloudflare auto-imports DNS records; verify MX in dashboard before confirming NS change |
| Zoho email disruption | Low | Support email fails | Ensure MX records (mx.zoho.com) are preserved in Cloudflare DNS |
| GitHub Actions still failing | Medium | Future deploys blocked | Fix pnpm-workspace.yaml overrides or switch to manual wrangler deploy |

---

## Recommendations

1. **Do DNS now** — This is the only blocker. Everything else is ready.
2. **Preserve Zoho MX records** — Your email runs through Zoho. Cloudflare's DNS scan should detect them, but double-check.
3. **Fix GitHub Actions** — The `pnpm-workspace.yaml` has platform package overrides that break builds on non-Replit environments. Consider removing them or documenting the workaround.
4. **Enable Cloudflare analytics** — Free tier includes basic analytics. Useful for launch day traffic.
5. **Set up `www` redirect** — Cloudflare Pages can handle this automatically when you add both domains.

---

## Assets & References

- **Live site:** https://aips-landing.pages.dev
- **Repo:** `~/Desktop/aips-website-recon` (cloned from `sysmoai/aips-website`)
- **GitHub Actions:** `.github/workflows/deploy.yml` → deploys to `aips-landing` Pages project
- **Product data:** `artifacts/aips-landing/data/products.json` (56 products)
- **Build output:** `artifacts/aips-landing/dist/public/`
- **WhatsApp number:** +880 1865-385348

---

## Time Budget

| Task | Time |
|------|------|
| Cloudflare dashboard login + add site | 2 min |
| Change NS at Google Domains | 3 min |
| Add custom domain to Pages | 2 min |
| Verify propagation | 5 min |
| **Total active time** | **~12 minutes** |
| DNS propagation (passive) | 15 min – 2 hrs |

---

**Bottom line:** You are one DNS change away from launch. The site is complete, tested, and ready. ☕
