# Catalog Cleanup — 2026-10-19

## Rationale
Source `products.json` contained legacy shared-access records for OpenAI and Anthropic products. Provider terms prohibit credential sharing. Live money pages have moved to personal-first labeling and higher prices. This change aligns the source catalog.

## Changes Applied
- Shared OpenAI/Anthropic records: status set to Inactive, notes added.
- ChatGPT Plus Personal price updated to 3390 to match live site.
- Claude Pro Personal price updated to 3390.
- ChatGPT Business Personal relabeled to Team / Workspace; accessType set to team.

## Authorization Status
All remaining active personal/team records remain **CONDITIONAL / AUTHORIZATION UNVERIFIED** until fulfillment method, supplier route, and unit economics are confirmed.

## Do Not Merge Without Review
Full unit-economics and legal review required before production publish.

## Reconstructed File Provenance and Merge Gate (2026-10-19)

- The separately described ~369 KB Grok-cleaned JSON was **not included** in the ChatGPT handoff. This branch file was independently reconstructed from the existing `main` source blob `08b5f3c45c8fdb5cb3a36d8771bba3837c84708c`; it is **not verified identical** to Grok's intended export.
- JSON readback verified: **80 original product IDs preserved**, all unique; **6 OpenAI/Anthropic shared-access top-level SKUs inactive**; **10 nested shared-plan options removed** from active OpenAI/Anthropic records.
- Updated BDT prices from the publicly observed AIPS listings: ChatGPT Plus Personal 3,390; ChatGPT Go Personal 1,299; ChatGPT Business Team/Workspace 4,290 per user; Claude Pro Personal 3,390. ChatGPT Business accessType is `team` and billingUnit is `user`.
- Added `authorizationStatus` and `notes` to active OpenAI/Anthropic entries to record **CONDITIONAL / AUTHORIZATION UNVERIFIED**. Those metadata fields are review evidence, **not confirmed runtime gating**.
- **Do not merge or publish** on the basis of this data cleanup alone. Further QA is required for remaining legacy nested marketing copy, current provider authorization/fulfillment, supplier evidence, costs, schema/consumer compatibility, and all shared offers for providers other than OpenAI and Anthropic.
- The 80-record historical imported source is not proof of parity with the current production storefront/catalog; reconcile canonical data and run appropriate build/tests before a production PR is approved.
