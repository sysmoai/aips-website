# AIPS Token Management — Single Source of Truth

## Cloudflare Pages Deployment

### Option 1: GitHub Actions (RECOMMENDED — Zero Hassle)
- Token stored in: GitHub Repo Secrets → `CLOUDFLARE_API_TOKEN`
- Auto-deploys on every push to `main`
- Account ID: `4ca6269edabb6ad2906d70ec6845de22`
- Project: `aips-landing`

### Option 2: Local Wrangler OAuth (ACTIVE)
- Token stored in: `~/.config/wrangler/config/default.toml`
- Survives across Kimi Code sessions ✅
- Run: `npx wrangler login`

### Option 3: Manual API Token (Fallback)
- Create at: https://dash.cloudflare.com/profile/api-tokens
- Permissions: `Account` → `Cloudflare Pages` → `Edit`
- Scope: Account `4ca6269edabb6ad2906d70ec6845de22`

## WhatsApp Number
- Primary: `8801865385348`
- Set in: `NEXT_PUBLIC_WA_PRIMARY` env var

## Current Status
- ✅ OAuth: ACTIVE (token persisted in ~/.config/wrangler/)
- ✅ Latest deploy: https://3df9d0a1.aips-landing.pages.dev
- ✅ GitHub Actions workflow: CREATED (`.github/workflows/deploy.yml`)
- ⏳ GitHub Secret: OPTIONAL (for push-to-deploy without local auth)
