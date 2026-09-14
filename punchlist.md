You are working on the Paidar.ai static website repository.

Your task is to perform a **site-wide consistency, navigation, content architecture, and cleanup pass** based on the current production structure.

Do not redesign the site. Do not invent new offerings. Preserve the existing visual system, CSS classes, overall branding, and current workshop page designs unless a change is explicitly required below.

The goal is to make the entire site feel like one current version of Paidar.ai rather than a mixture of legacy pages and newer AAOS/workshop content.

## Primary objectives

1. Standardize AAOS terminology and stages.
2. Standardize site navigation/header/footer.
3. Remove obsolete or duplicate canonical pages.
4. Fix workshop page shell inconsistencies.
5. Standardize audience terminology and CTA language.
6. Clarify the relationship between Assessments, Workshops, Services, Solutions, and Frameworks.
7. Clean up legacy training/resource references.
8. Regenerate sitemap consistency.
9. Preserve all working content and links unless specifically superseded.
10. Produce a change report after completion.

---

# 1. Standardize AAOS terminology

The canonical name must be:

**AI-Augmented Operating System (AAOS)**

Search the entire repository for references to:

* AI-Augmented Operating Standard
* operating standard when used as the formal expansion of AAOS
* conflicting AAOS definitions

Change the formal AAOS name everywhere to:

**AI-Augmented Operating System**

Do NOT remove the concept of operating standards. Instead distinguish them:

AAOS is the operating system/framework.

Operating standards are reusable practices, controls, workflows, and artifacts created through AAOS.

Where appropriate, use wording such as:

> AAOS helps organizations create repeatable operating standards for AI-assisted work.

Pay particular attention to:

`/frameworks/aaos/`

The page must not call AAOS an “Operating Standard” in one place and an “Operating System” elsewhere.

---

# 2. Standardize AAOS stage names

The canonical six stages are:

1. Diagnose
2. Activate
3. Control
4. Execute
5. Measure
6. Scale

Search the entire repository for:

* Controls
* Apply Controls
* Activate Talent
* other alternate names used as stage labels

When they represent the formal AAOS stages, replace them with the canonical names above.

This does NOT mean the noun “controls” cannot be used.

Correct example:

> During Control, teams define the controls required for reliable execution.

Make sure workshop pages, framework pages, AAOS resources, training pages, and metadata all use the same six formal stage names.

---

# 3. Fix workshop page shells

Review these workshop pages:

* `/workshops/executive-ai-organization/`
* `/workshops/team-ai-enablement/`
* `/workshops/becoming-ai-augmented/`
* `/workshops/ai-augmented-education/`
* `/workshops/public-sector-ai-strategy/`

These pages currently use a simpler navigation/header than the rest of the modern Paidar.ai site.

Update all five so they use the same canonical site shell as the main workshop landing page and current primary pages.

Canonical primary navigation:

* Home
* Assessments
* Workshops
* Solutions
* Services
* About
* Insights
* Frameworks
* Resources
* Contact

Resources should use the canonical Resources submenu defined later in this prompt.

Add the standard:

* mobile menu button
* primary-nav structure
* footer
* social links
* funnel tracking script if used by the rest of the site
* main.js
* skip-link

Do not change the actual workshop content unless needed for consistency with terminology.

The five workshop pages should feel like first-class Paidar.ai pages, not microsites.

---

# 4. Remove stray Markdown fences

Search all production `.html` files for literal Markdown code fences such as:

```text
```

````

or lines consisting only of three backticks.

At minimum, inspect:

- `/workshops/ai-augmented-education/index.html`
- `/workshops/team-ai-enablement/index.html`

Remove any stray Markdown fences or artifact text from production HTML.

Perform a repository-wide scan to ensure no other production HTML files contain accidental Markdown fences.

---

# 5. Create one canonical navigation

There are currently multiple generations of site navigation.

Refactor the site so standard Paidar.ai pages use one canonical header/navigation structure.

Canonical order:

Home  
Assessments  
Workshops  
Solutions  
Services  
About  
Insights  
Frameworks  
Resources  
Contact

Resources should be a dropdown containing:

- Books
- Software
- Training
- Sectors
- Educators

Preferred order:

Books  
Software  
Training  
Sectors  
Educators

Use the current CSS and JavaScript system.

Do not create a new design.

Where possible, extract the header/footer into a reusable include/component/template if the current build architecture supports it.

If the site is pure static HTML without includes, update all applicable files consistently.

Do not force companion-book microsites or deliberately separate branded experiences to use this shell if their existing structure is intentionally distinct.

Document any exceptions.

---

# 6. Fix the Resources parent link

The Resources parent currently uses patterns such as:

```html
<a href="#">Resources</a>
````

Create a real resource landing page at:

`/resources/`

The Resources parent link should point to:

`/resources/`

while still supporting the dropdown behavior.

The new `/resources/` page should be simple and use existing design patterns.

It should provide clear entry points to:

* Books
* Software
* Training
* Sectors
* Educators
* AAOS tools/templates if appropriate
* Insights where useful

Do not create large amounts of new marketing copy.

The page should primarily organize existing resources.

---

# 7. Resolve legacy duplicate/canonical pages

Inspect the following duplicate or legacy paths.

## AAOS

Current duplicate:

`/aaos/`

Canonical destination:

`/frameworks/aaos/`

Make `/frameworks/aaos/` the one authoritative AAOS page.

If the hosting/build system supports redirects, implement:

`/aaos/` → `/frameworks/aaos/`

Use a permanent redirect where appropriate.

Do not maintain two independent AAOS pages.

---

## Consulting

Legacy:

`/consulting.html`

Canonical:

`/services.html`

Implement:

`/consulting.html` → `/services.html`

Do not maintain duplicate content.

---

## GDXA Change to ODXA

Inspect:

`/frameworks/gdxa/`

It currently appears to canonicalize to:

`/frameworks/odxa/`

GDXA has been intentionally superseded by ODXA based on the existing repository content.

If the repository clearly supports that relationship, implement:

`/frameworks/gdxa/` → `/frameworks/odxa/`

Remove GDXA from active navigation and sitemap.

Do not delete historical source content unless necessary.

---

## Decision Packet Change to Integrity Packet

Inspect:

`/decision-packet-template/`

and:

`/integrity-packet-template/`

The Decision Packet page currently appears to canonicalize to the Integrity Packet.

Redirect Decision Packet to Integrity Packet.

If clearly distinct:

Remove the incorrect canonical relationship.

Do not guess if the source is ambiguous. Report the ambiguity.

---

# 8. Regenerate sitemap logic

Review `sitemap.xml`.

The sitemap should contain only current canonical content URLs.

Remove entries that are redirects or legacy aliases, including where applicable:

* `/aaos/`
* `/frameworks/gdxa/`
* `/consulting.html`
* any other URL that canonicalizes elsewhere

Add valid canonical pages that are missing.

Review `newsletter.html` specifically if it is an active canonical page.

Rule:

**one canonical page = one sitemap entry**

Redirect-only URLs must not appear in the sitemap.

Also check that workshop detail pages and `/resources/` are present.

---

# 9. Standardize audience terminology

Across Solutions, Workshops, Assessments, homepage sections, sectors, and related content, use a consistent audience model.

Canonical audience terminology:

### Individual

Preferred public label:

**Professionals / Individuals**

Use whichever fits the sentence naturally, but avoid switching randomly between staff, all staff, individual contributors, and individuals as primary taxonomy labels.

### Team

**Teams**

### Organization

**Executive Leadership / Organizations**

Use “Executive Leadership” when referring to people.

Use “Organizations” when referring to the unit of change.

### Education

**Higher Education**

Use:

**AI-Augmented Education**

as the workshop/solution name.

Use:

**Educators**

for educator-specific resources.

### Government

Preferred umbrella label:

**Public Sector**

Use “Government & Public Service” where fuller wording is helpful.

Workshop name remains:

**Public Sector AI Strategy**

Review and align:

* homepage
* `/solutions.html`
* `/workshops/`
* workshop detail pages
* assessments
* sector pages
* resources
* training references

Do not over-edit prose where a more specific audience term is appropriate.

The goal is taxonomy consistency, not repetitive wording.

---

# 10. Clarify Solutions versus Workshops

Keep both sections, but make their roles distinct.

## Solutions

Solutions should answer:

**Who are you trying to help / what type of organizational problem are you solving?**

Expected solution paths:

* Professionals / Individuals
* Teams
* Organizations / Executive Leadership
* Higher Education
* Public Sector

Each solution should route users toward relevant:

* assessment
* workshop
* resources
* services

Do not make Solutions a duplicate workshop catalog.

## Workshops

Workshops should answer:

**What kind of facilitated working session do you need?**

Keep the five primary workshops:

* Becoming AI-Augmented
* AI-Augmented Teams
* AI-Augmented Organization Executive Working Session
* AI-Augmented Education
* Public Sector AI Strategy

Preserve the new buyer-oriented workshop positioning.

---

# 11. Preserve the workshop progression

The current workshop portfolio should retain this conceptual differentiation:

## Individual

Goal:

Help a professional work effectively with AI while retaining judgment, validation, ownership, and credibility.

## Team

Goal:

Turn individual AI use into reliable shared team execution.

## Executive / Organization

Goal:

Turn AI ambition into aligned strategy, governance, investment decisions, and executable organizational action.

## Higher Education

Goal:

Adopt AI without weakening learning, assessment, integrity, or institutional trust.

## Public Sector

Goal:

Create mission-aligned AI value while preserving accountability, security, governance, and public trust.

Do not collapse these into generic AI training.

---

# 12. Standardize workshop formats

Older pages currently include fixed language such as:

* two half-days
* two half-days per cohort
* four executive reinforcement sessions

The new canonical workshop model is:

* Half-Day
* Full-Day
* Workshop Series / Follow-Up Engagement

Use this model across the workshop landing page and workshop detail pages unless a specific offering genuinely requires a different format.

Do not make unsupported promises.

---

# 13. Standardize CTA hierarchy

Use these canonical CTA types.

## Assessment pages

Primary:

**Start an Assessment**

## Workshop pages

Primary:

**Request This Workshop**

For executive sessions, this may be:

**Request This Executive Session**

## Services / advisory pages

Primary:

**Book a Strategy Session**

## Generic site CTA

**Contact Us**

or where the context is exploratory:

**Talk About Your Needs**

Remove inconsistent interchangeable phrases such as:

* Request a Proposal
* Start the Right Conversation
* Talk to Darren
* Request Organizational Assessment

unless they serve a unique, clearly intentional purpose.

Do not change external booking URLs.

---

# 14. Update the training section

Review:

`/training/`

and all training pages.

Training should no longer imply that detailed workshop pages live on Dr. Darren Speaks if the canonical workshop pages now live on Paidar.ai.

Remove or update stale language such as:

> See workshop details on Dr. Darren Speaks.

Reposition training as:

**Training & Curriculum**

Separate conceptually:

### Professional / Technical Courses

Examples:

* Cloud Computing
* Microservices

### AI Capability Programs

These should route to the canonical Paidar workshop pages instead of duplicating workshop descriptions.

Do not delete valid course content.

---

# 15. Clarify framework relationships

The main current framework family should be:

* AAOS
* ODXA
* GEAR

Review whether “AI Operating Model” is intended to be a distinct named framework.

If it is primarily explanatory content for AAOS, do not position it as a fourth equal framework.

On the main framework page, make the relationship between the three primary frameworks clear.

Suggested conceptual relationship:

### GEAR

Provides architectural domains for understanding organizational systems.

### ODXA

Uses organizational architecture to identify transformation gaps, dependencies, and opportunities.

### AAOS

Provides the operating system for reliable AI-Augmented execution.

Use repository-supported language.

Do not invent technical claims.

If the existing source shows a different formal relationship, preserve that and document it.

---

# 16. Reduce homepage duplication

Review the homepage for repeated credibility, authority, frameworks, and proof sections.

There are currently multiple sections that communicate similar themes such as:

* credibility
* authority
* authorship
* framework intellectual property
* executive credibility

Consolidate overlapping sections.

Do not remove important proof points.

Target a clearer homepage flow:

1. Hero
2. Why AI adoption fails / core problem
3. Choose your starting point
4. Who we help
5. How we work / AAOS
6. Framework ecosystem
7. Proof / credibility
8. Resources / insights
9. Final CTA

Aim to reduce redundant homepage copy by approximately 20–30% where possible without reducing substance.

Do not make the homepage sparse.

---

# 17. Make the engagement journey consistent

Use the following conceptual journey wherever Paidar explains how customers engage:

### Assessment

Understand the current state.

### Workshop

Turn findings or known challenges into decisions, capability, workflows, governance, and action.

### Services

Support implementation, operating-model change, architecture, governance, or scale.

Do not imply that every customer must begin with an assessment.

Use language such as:

> If you already understand the problem and desired outcome, you can begin directly with a workshop.

This model should be consistent on:

* homepage
* assessments
* workshops
* services
* solutions

---

# 18. Organize AAOS tools and templates under Resources

Review current standalone resources such as:

* `/aaos-start/`
* `/aaos-implementation/`
* `/executive-brief/`
* `/next-step/`
* `/workflow-kit/`
* `/dashboard-template/`
* `/integrity-packet-template/`
* `/decision-packet-template/`

Do not automatically delete or move URLs if that would break external links.

Instead:

1. Keep working URLs where needed.
2. Group and expose them through `/resources/`.
3. Consider using a logical category such as:

**AAOS Tools & Templates**

Where safe and supported by the static-site architecture, future canonical paths may use:

`/resources/aaos/...`

But do not perform a large URL migration unless redirects can be implemented safely.

The immediate goal is information architecture and discoverability.

---

# 19. Standardize book status language

Review all book pages.

Use consistent status labels where needed:

* Available Now
* Coming Soon
* In Development

Remove stale launch/preorder language where it is no longer accurate.

Do not invent release dates or availability.

Preserve known purchase links.

---

# 20. Check all internal links after changes

Run a site-wide internal link check.

Validate:

* href targets
* relative paths
* asset paths
* canonical URLs
* sitemap URLs
* navigation links
* footer links
* workshop links
* Resources dropdown
* redirects/aliases where supported

Report:

* broken internal links
* unresolved references
* intentionally external links
* ambiguous legacy paths

Do not silently ignore broken links.

---

# 21. Check HTML hygiene

Run a repository-wide scan for:

* literal Markdown fences
* empty href attributes
* `href="#"` that are not intentional JS controls
* duplicate IDs
* malformed closing tags
* duplicate canonical declarations
* missing `<title>`
* missing meta description
* obvious placeholder/TBD language
* stale “coming soon” text where current content exists
* malformed relative paths

Do not modify deliberate JavaScript controls unless they cause an accessibility or navigation issue.

---

# 22. Preserve styling

Do not redesign the visual language.

Continue using:

* existing Paidar CSS
* current cards
* tint sections
* badges
* buttons
* grid systems
* existing color variables
* current typography
* current image assets

Only add CSS if required to support a consistency fix.

Prefer existing classes.

---

# 23. Do not invent content

Important:

Do not invent:

* clients
* case studies
* metrics
* testimonials
* certifications
* release dates
* workshop prices
* attendance limits
* project outcomes
* regulatory claims
* product capabilities

When existing site content conflicts and the repository does not make the intended answer clear, preserve the safest current state and report the ambiguity.

---

# 24. Final validation

Before completing:

1. Build or serve the site locally if the project supports it.
2. Run an internal link scan.
3. Check the five workshop pages manually.
4. Check:

    * homepage
    * workshops landing
    * assessments
    * solutions
    * services
    * frameworks
    * AAOS
    * ODXA
    * GEAR
    * training
    * books
    * Resources
    * contact
5. Verify canonical links.
6. Verify sitemap.
7. Verify no Markdown fences remain.
8. Verify AAOS formal name and six stage labels globally.
9. Verify canonical navigation is consistent.

---

# Deliverable

Make the code changes directly.

Then create:

`SITE-CONSISTENCY-REPORT.md`

Include:

## Summary

What was changed.

## AAOS terminology

Files changed and key normalization decisions.

## Navigation

Pages/templates updated and any intentional exceptions.

## Redirects / legacy URLs

What was redirected or retained.

## Sitemap

Entries added/removed.

## Workshops

Confirmation that all five use the canonical shell.

## Audience terminology

Any major taxonomy changes.

## Training / resources cleanup

What changed.

## Technical issues fixed

Broken links, Markdown artifacts, empty links, malformed HTML, etc.

## Remaining ambiguities

Anything that could not be safely resolved from repository evidence.

## Validation

Include counts for:

* HTML files scanned
* internal links checked
* broken internal links remaining
* duplicate canonical URLs remaining
* Markdown fence artifacts remaining
* distinct primary navigation variants remaining

Target final state:

* 0 known broken internal links
* 0 accidental Markdown fences
* 0 conflicting formal AAOS expansions
* 0 alternate formal AAOS stage names
* 1 canonical primary Paidar navigation for normal site pages
* 1 authoritative AAOS content page
* no redirect-only URLs in sitemap

Do not stop after analysis. Make the changes, validate them, and produce the report.
