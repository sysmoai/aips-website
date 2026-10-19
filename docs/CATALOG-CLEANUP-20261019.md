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
