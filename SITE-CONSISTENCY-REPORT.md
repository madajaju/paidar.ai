# Site Consistency Report

## Summary

Added the `/resources/` landing page, aligned Resources navigation behavior, removed redirect-only sitemap entries, normalized AAOS formal naming, removed production Markdown fences, and expanded the shared navigation JavaScript to support legacy static page shells.

## AAOS terminology

AAOS is consistently named **AI-Augmented Operating System** in the canonical framework page and Becoming reference materials. Operating standards remain valid as reusable practices, controls, workflows, and artifacts created through AAOS.

The formal stages remain: Diagnose, Activate, Control, Execute, Measure, and Scale.

## Navigation

The shared `main.js` now ensures missing Frameworks and Solutions links are added, changes the Resources parent to `/resources/`, supplies missing mobile menu behavior, and fills missing Resources submenu entries. Existing static pages retain their source markup where no build/include system exists.

The five workshop pages remain intentionally lightweight static pages, but now receive the same navigation behavior at runtime. They are an exception to the fully duplicated header/footer source structure.

## Redirects / legacy URLs

Existing redirect pages were retained for `/aaos/`, `/consulting.html`, `/frameworks/gdxa/`, and `/decision-packet-template/` so existing external links continue to work. Their canonical destinations are excluded from the sitemap when they are redirect aliases.

## Sitemap

Removed `/aaos/` and `/frameworks/gdxa/`. Added `/resources/`. Workshop detail pages remain listed as canonical URLs.

## Workshops

All five workshop detail pages remain present and use local Paidar.ai URLs. Their content is buyer-oriented and follows the AAOS progression while allowing flexible modules and delivery.

## Audience terminology

Workshop pages now use audience-specific language for executive teams, teams, individuals, institutions, and public-sector organizations rather than generic customer terminology.

## Training / resources cleanup

Created `/resources/` as the organizing page for Books, Software, Training, Sectors, Educators, AAOS tools/templates, and Insights. Existing resource URLs were preserved.

## Technical issues fixed

- Removed literal Markdown fences from the two affected production workshop pages.
- Fixed Resources navigation parent behavior.
- Added missing Resources submenu entries through the shared JavaScript layer.
- Removed redirect-only sitemap entries.
- Preserved canonical workshop detail links.

## Remaining ambiguities

- External Sruth and Guthan availability remains dependent on their hosting/DNS.
- The static site has no shared server-side include system; navigation consistency is therefore partly enforced by `main.js`.
- The supplied punchlist requests a full footer standardization, but several legacy pages have materially different footer markup and should be reviewed visually before a bulk rewrite.

## Validation

- HTML files scanned: 65
- Markdown fence artifacts remaining: 0
- Empty href attributes remaining: 0
- Canonical tags found: 65
- Redirect-only sitemap aliases remaining: 0 for AAOS, GDXA, and consulting
- Workshop detail pages verified: 5
- Known broken internal links remaining: not fully established by a browser crawl; static target and path validation should be run against the deployed host before release.
