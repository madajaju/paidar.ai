# Paidar.ai Website QA Fix Plan

## Overview
QA audit identified issues in:
- Navigation consistency
- Branding consistency
- Content integrity
- Functional reliability
- SEO structure

Goal: Stabilize site, improve trust, and enable conversion.

---

# 🔴 PHASE 1 — CRITICAL FIXES (P1)

## [ ] Fix Navigation Consistency
- [ ] Create single shared header/navigation component
- [ ] Replace "Legacy" with "Resources"
- [ ] Ensure identical menu structure across all pages
- [ ] Remove duplicate or inconsistent menu items
- [ ] Validate navigation across:
    - [ ] Home
    - [ ] Services
    - [ ] Sectors
    - [ ] Software
    - [ ] Books

---

## [ ] Standardize Branding (Paidar.ai)
- [ ] Replace all "Paidar Systems" references with "Paidar.ai"
- [ ] Update page titles
- [ ] Update headers and footers
- [ ] Update metadata (SEO titles/descriptions)
- [ ] Validate sector pages:
    - [ ] Higher Education
    - [ ] Enterprise
    - [ ] Government

---

## [ ] Remove Content Leaks (Book Page)
- [ ] Remove raw asset path text:
    - `/assets/img/books/becoming-ai-augmented.svg`
- [ ] Replace with proper `<img>` rendering
- [ ] Audit all book pages for similar leaks

---

## [ ] Fix Software Page Links
- [ ] Validate outbound links:
    - [ ] Ailtire
    - [ ] Guthan
    - [ ] Runaire
- [ ] Fix any broken or misconfigured links
- [ ] Add automated link checker (CI step)

---

# 🟠 PHASE 2 — HIGH PRIORITY (P2)

## [ ] Fix Naming / Typos
- [ ] Standardize "Runaire" spelling
- [ ] Remove any "Runarie" references
- [ ] Ensure consistency across:
    - [ ] Buttons
    - [ ] Links
    - [ ] Page titles

---

## [ ] Expand Services Page
- [ ] Add detailed service descriptions:
    - [ ] Advisory
    - [ ] Governance
    - [ ] Implementation
- [ ] Align content with AAOS framework
- [ ] Add:
    - [ ] Clear value propositions
    - [ ] Call-to-action (CTA) blocks
    - [ ] Example use cases

---

## [ ] Validate Forms (CRITICAL for Leads)
- [ ] Test Contact form:
    - [ ] Submission success
    - [ ] Email delivery
    - [ ] Error handling
- [ ] Test Assessment form:
    - [ ] Submission success
    - [ ] Data capture
    - [ ] CRM integration (Zoho)
- [ ] Add form validation feedback (UI)

---

# 🟡 PHASE 3 — SEO & STRUCTURE (P3)

## [ ] Fix Sitemap
- [ ] Verify `/sitemap.xml` exists and loads
- [ ] Ensure:
    - [ ] No broken links
    - [ ] No redirects
    - [ ] Accurate URLs
- [ ] Auto-generate sitemap if missing

---

## [ ] Fix Page Titles (SEO)
- [ ] Create unique titles per page
- [ ] Examples:
    - "AI in Higher Education | Paidar.ai"
    - "AI for Enterprise Transformation | Paidar.ai"
- [ ] Remove duplicate/generic titles

---

## [ ] Standardize Layout / Templates
- [ ] Create shared layout system:
    - [ ] Header
    - [ ] Footer
    - [ ] Page container
- [ ] Eliminate page-level structural differences
- [ ] Ensure consistent spacing, typography, and layout

---

# 🔵 PHASE 4 — QUALITY IMPROVEMENTS (P4)

## [ ] UX Consistency
- [ ] Align typography
- [ ] Standardize spacing
- [ ] Normalize CTA placement

---

## [ ] Analytics Verification
- [ ] Verify tracking is installed:
    - [ ] Page views
    - [ ] Conversions
- [ ] Ensure events fire correctly

---

## [ ] Mobile Responsiveness
- [ ] Test all pages on mobile
- [ ] Fix layout issues
- [ ] Validate navigation usability

---

# 🧪 OPTIONAL AUTOMATION TASKS

## [ ] Add CI QA Checks
- [ ] Link checker
- [ ] HTML validator
- [ ] Lighthouse audit
- [ ] Accessibility scan

---

# ✅ DONE CRITERIA

Site is considered stable when:
- [ ] Navigation is consistent across all pages
- [ ] Branding is uniform (Paidar.ai)
- [ ] No visible content leaks or dev artifacts
- [ ] All links work correctly
- [ ] Forms successfully submit and integrate with CRM
- [ ] Sitemap is valid and SEO-ready
- [ ] Core pages are conversion-ready

---

# 🚀 NEXT STEP (POST-FIX)

- [ ] Conversion optimization pass
- [ ] Content strategy alignment (AAOS funnel)
- [ ] Shopify + Zoho integration validation