# QA Cleanup Summary - 2026-04-18

## Issues Fixed
- **Broken Image References**: Fixed broken hero image paths in `software.html`, `training/index.html`, `training/cloud-computing.html`, and `training/microservices.html` that were using incorrect relative paths or missing the `assets/` segment.
- **Encoding & Mangled Characters**: Resolved multiple instances of mangled special characters (e.g., `ï¿½` appearing instead of `—`) in several training and software pages.
- **Debug Content Removal**: Removed `isdebug=true` from Zoho CRM form endpoints in `assessments.html`, `survey.html`, and `assessment/index.html` to ensure production-ready lead capture.
- **Relative Path Leaks**: Standardized internal asset references in `style` attributes to use absolute-style root paths (`/assets/...`) where appropriate to prevent breakage on sub-pages.

## Automated QA Tool
Added `qa_audit.js` to the root directory. This Node.js script can be run manually or as part of a CI pipeline to verify:
- Broken internal links (`href`)
- Missing images (`src` and CSS `url()`)
- Suspicious strings (debug flags, local paths, placeholders)

Run it with: `node qa_audit.js`

## Manual Verification Recommended
- **Zoho Bookings**: Verify that the booking buttons in the `cta-block` component (defined in `assets/js/main.js`) correctly open the desired Darren Pulsipher booking pages.
- **CRM Lead Flow**: Confirm that a test submission on `survey.html` or `assessments.html` correctly routes to the CRM now that the debug flag is removed.
- **Search Result Snippets**: Verify that meta descriptions and titles appear correctly in search engine previews after the recent metadata pass.
