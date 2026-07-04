# Punchlist — paidar.ai

Source: live pages fetched 2026-07-04 (`/`, `/about.html`, `/assessments.html`, `/assessment/`, `/services.html`, `/frameworks/`, `/sectors/government.html`). No code export reviewed yet for this property — if you send a zip, exact file paths/line numbers can replace the page-level references below.

Legend: `[ ]` open · `[x]` resolved/confirmed correct · `P0` blocker · `P1` should do soon · `P2` fast follow

---

## P0

- [ ] **Fix the mislabeled "Embracing Digital" link — sitewide, in the footer of every page.**
  On the homepage, `/about.html`, `/services.html`, `/frameworks/`, `/sectors/government.html` (and likely every other page, since it's a shared footer), the third footer social icon is labeled "Embracing Digital" but its `href` points to `https://paidar.ai/frameworks/aaos/` — an internal page, not `https://embracingdigital.org`. Confirmed as a real bug by comparing against drdarrenspeaks.com, where the equivalent link correctly points to `embracingdigital.org`. Fix the `href` in the shared footer partial/template.
  The About page also has body text reading "Explore embracingdigital.org" that links to the same wrong internal URL — fix that instance too.

- [ ] **Remove GDXA; replace with ODXA for government contexts.** (Decision: GDXA is retired, ODXA now covers government scope too.)
    - `/sectors/government.html`: `meta-keywords` currently includes `GDXA` — change to `ODXA`. Body copy under "Consulting" reads "**GDXA**-aligned roadmaps, Zero Trust strategies..." — change to "**ODXA**-aligned roadmaps, Zero Trust strategies...".
    - `/frameworks/` hub page:
        - `meta-description` / `meta-og:description` / `meta-twitter:description` currently read "...including AAOS, AI operating models, **GDXA**, GEAR, and ODXA." — remove `GDXA,` from all three.
        - The framework card grid currently has a dedicated **GDXA** card ("Government Digital Transformation Architecture for public sector modernization," linking to `/frameworks/gdxa/`) — remove this card entirely.
        - Broaden the **ODXA** card's description to explicitly cover government/public-sector scope, e.g. from "Open Digital Transformation Architecture for broader ecosystems" to "Open Digital Transformation Architecture for government and broader ecosystems."
        - The "How they work together" paragraph currently reads "GDXA, GEAR, and ODXA adapt the same logic to public-sector and ecosystem contexts." — remove "GDXA," so it reads "GEAR and ODXA adapt the same logic to public-sector and ecosystem contexts."
    - **Retire `/frameworks/gdxa/`** — set up a 301 redirect to `/frameworks/odxa/` so any existing inbound links/SEO equity carry over rather than 404ing.
    - Check other pages under `/training/`, `/solutions.html`, and `/sectors/` for any additional GDXA mentions not caught by the above (not fully audited — worth a full-text search across the codebase for "GDXA" once you send a zip).

---

## P1

- [ ] **Fix inconsistent primary navigation** — the dedicated `/assessment/` page (which "Team Maturity" on `/assessments.html` links to) is missing the "Frameworks" nav item that appears on the homepage, `/about.html`, `/services.html`, and `/frameworks/`. Suggests `/assessment/` was built on a different template/pass — bring it in line with the shared nav.

- [ ] **Confirm `/survey.html` (the "Individual Readiness" destination) matches the visual polish and lead-capture rigor of `/assessment/`** — not yet directly reviewed; worth checking before launch since it's one of three parallel assessment entry points (Individual → `/survey.html`, Team → `/assessment/`, Organizational → inline form on `/assessments.html`).

---

## Confirmed correct — no action needed

- [x] Canonical tags self-reference correctly on every page checked.
- [x] `meta-robots: index, follow` present.
- [x] Meta descriptions unique and well-written per page checked.
- [x] Footer entity attribution — `© Paidar Systems LLC` — is **correct as-is**. Confirmed mapping: Paidar Systems LLC handles software, consulting, and this site; Paidar Productions LLC handles podcast, speaking, and Paidar Press. Do not change this to Paidar Productions.
- [x] Assessment/lead-capture funnel structure (tiered by audience, full contact-info capture for Team/Org tiers, direct Zoho booking link repeated across pages) is sound — no changes needed to the underlying approach.
