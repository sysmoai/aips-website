# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### AIPS - AI Premium Shop (`artifacts/aips-landing`)
- **Type**: React + Vite (presentation-first landing page)
- **Preview Path**: `/`
- **Description**: Bangladesh's #1 premium AI subscription shop landing page
- **Tech**: React, Vite, Framer Motion, TailwindCSS, wouter, shadcn/ui
- **Key Features**:
  - Dark theme (#0a0a0a background) with teal (#0d9488) + purple (#8b5cf6) brand colors
  - Animated hero, AI tools showcase, How it Works, Trust badges, FAQ, Footer
  - Sticky floating WhatsApp CTA button (https://wa.me/8801865385348)
  - Payment badges: bKash, Nagad, Rocket, Bank Transfer
  - Google Fonts: Inter + Noto Sans Bengali
  - All animations via Framer Motion
- **Component Shells** (in `src/components/`):
  - `WhatsAppCTA.tsx` — sticky floating WhatsApp button
  - `ProductCard.tsx` — product grid card
  - `PricingTable.tsx` — tier comparison table
  - `TrustBadges.tsx` — trust badges row
  - `PaymentBadges.tsx` — bKash/Nagad/Rocket badges
  - `BanglaSection.tsx` — Bangla content block
  - `HeroSection.tsx` — product page hero
  - `FAQSection.tsx` — accordion FAQ with JSON-LD schema
  - `SEOHead.tsx` — meta tags + schema JSON-LD
- **Data Files**:
  - `data/brand.json` — AIPS brand config
  - `data/products.json` — product catalog shell
- **AIPS Brand Colors** (in tailwind via CSS vars):
  - `aips-dark`: #0a0a0a
  - `aips-dark-secondary`: #1a1a2e
  - `aips-teal`: #0d9488
  - `aips-green`: #22c55e
  - `aips-blue`: #2563eb
  - `aips-accent`: #8b5cf6
  - `chatgpt`: #10a37f, `claude`: #d97706, `bkash`: #e2136e, `nagad`: #f6921e
