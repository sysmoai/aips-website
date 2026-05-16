# AIPS DNS Cutover — 5-Minute Checklist

## Before You Start
- [ ] Coffee ready ☕
- [ ] Cloudflare login: `Sysmoai.com@gmail.com`
- [ ] Google Domains login (same email)

---

## Step 1: Add Site to Cloudflare (2 min)
1. Go to https://dash.cloudflare.com
2. Click **"Add a Site"**
3. Enter: `aipremiumshop.com`
4. Select **Free plan**
5. Cloudflare will scan DNS records → **VERIFY MX RECORDS**:
   - `mx.zoho.com` (priority 10)
   - `mx2.zoho.com` (priority 20)
   - `mx3.zoho.com` (priority 50)
   - If missing, add them manually before continuing

## Step 2: Change Nameservers (3 min)
1. Cloudflare gives you 2 nameservers (e.g., `lara.ns.cloudflare.com`)
2. Go to https://domains.google.com → `aipremiumshop.com`
3. DNS → **Custom name servers**
4. Replace Google nameservers with Cloudflare ones
5. Save

## Step 3: Add to Pages (2 min)
1. Cloudflare Dashboard → **Workers & Pages**
2. Click `aips-landing`
3. **Custom Domains** tab → "Set up a custom domain"
4. Add:
   - `aipremiumshop.com`
   - `www.aipremiumshop.com`
5. Cloudflare auto-creates DNS records

## Step 4: Verify (5 min)
```bash
# In terminal
dig aipremiumshop.com NS
# Should show: lara.ns.cloudflare.com greg.ns.cloudflare.com

curl -sI https://aipremiumshop.com
# Should show: HTTP/2 200
```

---

## Done! 🚀
Site is live at https://aipremiumshop.com

## If Something Goes Wrong
- **Email stops working?** Check MX records in Cloudflare DNS tab
- **Site not loading?** Wait 30 min, then check `dig` output
- **SSL error?** Cloudflare auto-issues cert within 24h (usually 5 min)
- **Still stuck?** The site works at https://aips-landing.pages.dev as fallback
