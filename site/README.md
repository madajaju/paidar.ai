# Paidar Systems (paidar.ai) — Static Site

This repository contains a GitHub Pages–ready static site for Paidar Systems.

## Deploy on GitHub Pages
1. Create a repository named `paidar.ai` (or any repo) under your GitHub account/org.
2. Upload the files in this folder to the repo root.
3. In **Settings → Pages**, choose **Deploy from branch**, branch `main`, folder `/root`.
4. (Optional) Add a `CNAME` file in the repo root with the single line: `paidar.ai`.
5. In your DNS provider, add a CNAME from `www.paidar.ai` to `<username>.github.io` and A/AAAA records for apex if desired (per GitHub Pages docs).

## Customize
- Update IDs (UEI, CAGE, NAICS) in the footer and Government Contracting page.
- Replace placeholder headshots in `/assets/img/` and the contact form action with your provider (e.g., Zoho Forms).
- Update address and phone in Contact.
- Add posts to `news.html` or migrate to a static site generator later.

## Notes
- Mobile-responsive, accessible nav, simple dark theme.
- No build step required.
