# Paidar.ai Analytics Events Documentation

This document lists the event names used for tracking user interactions across Paidar.ai. Events are captured via `assets/js/funnel-tracking.js` using the `data-track` attribute on links and buttons, or explicit `window.paidarTrack.push()` calls in forms.

## Event Naming Convention

All events follow a `prefix_action_object` or `category_action` snake_case pattern.

## Tracked Events

| Event Name | Description | Trigger Location |
|------------|-------------|------------------|
| `cta_start_assessment` | User clicked a "Start Assessment" or "View Assessments" button. | Hero sections, Assessment cards, Guided Journey. |
| `cta_book_strategy_session` | User clicked to book a strategy session or talk to Darren. | Hero sections, Strategy session CTAs, Services page. |
| `cta_explore_workshops` | User clicked to view or book workshops. | Hero sections, Workshop cards, Guided Journey. |
| `cta_view_books` | User clicked to explore the book series or a specific book. | Hero sections, Book cards, Resources menu. |
| `cta_book_detail_next_step` | User clicked a recommended next step on a specific book page. | `cta-block` on individual book pages. |
| `cta_contact` | User clicked the primary Contact navigation link. | Site header/navigation. |
| `cta_speaking_inquiry` | User clicked a link specifically mentioning speaking or briefings. | Workshops and Contact pages. |
| `form_submit_assessment` | User successfully submitted the organizational assessment request form. | `assessments.html` form. |
| `form_submit_contact` | User successfully submitted the general contact inquiry form. | `contact.html` form. |

## Event Properties

Where applicable, events may include additional metadata:

- **`assessment_type`**: (For `form_submit_assessment`) The type of assessment requested (Individual, Team, Organizational).
- **`lead_source`**: (For `form_submit_contact`) The source identifier for CRM routing.

## Implementation Details

- **Auto-tracking**: The `funnel-tracking.js` script automatically listens for clicks on any element with a `data-track` attribute.
- **Dynamic Components**: Custom elements `<cta-block>` and `<recommended-step>` (defined in `main.js`) automatically generate the correct `data-track` values based on their configuration.
- **UTM Persistence**: The tracking system preserves UTM parameters (`utm_source`, `utm_medium`, etc.) across the session and injects them into form submissions for attribution.
