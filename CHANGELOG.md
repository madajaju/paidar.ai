# Changelog

## [2.0.2] - 2026-04-19

### Changed
- **Site-Wide Standardization Pass**: Performed a final audit and standardization of all secondary landing pages, technical templates, and utility pages.
- **Enhanced Funnel Integration**: Replaced manual CTA banners with the dynamic `<cta-block>` component on 8+ additional pages including AAOS guides, executive briefs, and dashboard templates.
- **UI Consistency**: Standardized footer navigation styles by applying the `nav-reset` class globally, ensuring consistent spacing and list styling across all 36+ files.
- **Redundant Code Removal**: Eliminated legacy manual banners and redundant inline styles from deep-site pages to improve maintainability and performance.

## [2.0.1] - 2026-04-19

### Fixed
- **Sectors Index Completion**: Added the missing Healthcare sector card to the sectors index page to ensure all core industry pathways are represented.
- **Software Page Polish**: Corrected technical typos in project URLs (Treoir, Runaire) and expanded SEO keywords to include all active software projects.
- **Metadata Indentation**: Fixed minor HTML formatting issues in the Contact page header for better code consistency.

## [2.0.0] - 2026-04-18

### Completed
- **Strategic Overhaul Completion**: Successfully executed and verified all 11 strategic conversion and standardization prompts from the `todo.md` roadmap.
- **Conversion Journey Realignment**: Transformed Paidar.ai from a collection of technical pages into a unified, high-conversion funnel centered on Assessments, Books, Workshops, and Advisory services.
- **Dynamic Site Components**: Fully deployed and instrumented the `<cta-block>` and `<recommended-step>` custom elements site-wide, ensuring no "dead end" pages.
- **Funnel Analytics**: Instrumented site-wide event tracking via `funnel-tracking.js`, providing visibility into high-value conversion paths (documented in `analytics-events.md`).
- **QA & Asset Integrity**: Established a permanent `qa_audit.js` framework and verified 100% link and asset integrity across all 36+ production HTML files.
- **Brand & IA Normalization**: Unified all user-facing branding to "Paidar.ai," standardized the primary navigation architecture, and optimized technical SEO (canonical tags, unique metadata, and sitemap).

## [Unreleased] - 2026-04-18

### Added
- **Consulting Sales Engine**: Completely transformed the Services page into a high-conversion consulting sales page focusing on Advisory, Governance, and Implementation.
- **Service Pillars Architecture**: Organized consulting offers into three clear pillars with defined inputs, triggers, and business outcomes.
- **Problems-First Messaging**: Added a targeted section addressing common enterprise AI blockers: experimentation without execution, governance gaps, strategy disconnects, and uneven capability.
- **Custom CTA Variant**: Added the `services_closing` variant to the `<cta-block>` component in `main.js` to support focused, two-button closing conversion bands.

### Changed
- **Advisory Rebrand**: Continued the shift from "Consulting" to "Advisory Services" terminology across the site to align with high-level executive positioning.
- **Global Link Optimization**: Migrated all legacy `/consulting.html` links to the new `/services.html` sales page and standardized link text to "Advisory Services".
- **Header Standardization Sweep**: Updated navigation headers on remaining landing pages (`sectors/`, `training/`, `aaos-implementation/`) to use the unified responsive component and remove legacy mobile drawers.
- **Enhanced Services Metadata**: Updated SEO and Open Graph metadata for the Services page to improve search visibility and social conversion.

## [2026-04-18]

### Added
- **Productized Workshop Portfolio**: Rewrote the Workshops index to feature three core, outcome-oriented products: Executive Briefing, Team Enablement, and Applied Transformation.
- **Workshop Comparison Section**: Added a detailed comparison to help organizations quickly identify the right-fit engagement.
- **Path to Reliable Execution**: Introduced a flow-based section showing the progression from Assessment to Workshop to Advisory.
- **Reusable CTA Component**: Implemented a `<cta-block>` custom element in `main.js` to ensure standardized, high-conversion CTAs across the entire site.
- **Dynamic CTA Logic**: Added variant support for the CTA component (Assessment, Book, Workshop, Consulting, Sector) to provide the next logical action based on page context.

### Changed
- **Site-Wide CTA Standardization**: Updated all major landing pages including Assessments, Workshops, Services, Books, Software, Sectors, Insights, and About to use the standardized CTA block, eliminating "dead end" pages.
- **Enhanced Infrastructure**: Further standardized page headers, footers, and scripts, particularly on sector and training pages, to ensure global component support and consistent responsive behavior.
- **Homepage Funnel Optimization**: Restructured the homepage to act as a guided conversion funnel, prioritizing Assessments as the primary call-to-action (CTA), followed by Books, Workshops, and Advisory Services.
- **New Guided Journey Section**: Added a "Choose Your Best Next Step" section with clear paths for individuals, teams, and organizations, providing specific outcomes for each.
- **Authority Through Authorship**: Added a dedicated Books section to establish Paidar.ai's authority via the AAOS framework and its corresponding book series.
- **Reframed Workshops and Services**: Updated messaging for workshops (briefings, enablement, transformation) and advisory services (governance, roadmaps, execution support) to focus on business outcomes.
- **New Funnel Logic Section**: Introduced "The Path to Reliable Execution" to visually and textually guide users from baseline assessment to enterprise scaling.
- **Design System Enhancements**:
    - Added a functional `.arrow` class in `paidar.css` for consistent, animated link styling.
    - Added a `.wrap` utility class for flexible layout management across all devices.
- **Footer CTA Band**: Implemented a high-conversion band at the bottom of the homepage with standardized primary, secondary, and tertiary CTAs.
- **Unified Navigation Architecture**: Moved from separate desktop and mobile navigation (drawer) to a single, responsive `primary-nav` component. This reduces DOM duplication and ensures consistent menu items across all devices.
- **Standardized Site Information Architecture**: Updated global navigation to follow a conversion-focused IA: Home, Assessments, Workshops, Solutions, Services, About, Insights, Resources (dropdown with Training, Software, Books, Sectors), and Contact.
- **Brand Normalization**:
    - Standardized all user-facing branding to "Paidar.ai".
    - Updated footer to feature a primary "Paidar.ai" brand line with a secondary "© Paidar Systems LLC" legal line.
    - Updated logo alt text to "Paidar.ai logo" globally.
- **Content Terminology Update**:
    - Renamed "Legacy" navigation and content blocks to "Resources" or "Related Resources" to improve user perception while maintaining access to deep technical content.
- **Infrastructure Cleanup**:
    - Replaced redundant inline navigation scripts with a global `assets/js/main.js` reference.
    - Refactored `assets/css/paidar.css` to support the single-NAV responsive toggle.
    - Standardized headers and footers across all 30+ pages, including specialized pages like `survey.html`.
