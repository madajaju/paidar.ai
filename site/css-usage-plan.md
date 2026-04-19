# CSS Usage Plan for New paidar.ai Pages

## Primary Stylesheet Recommendation
- Use `assets/css/paidar.css` as the primary stylesheet for new page development.
- Reason: it is the only file that already combines design tokens, layout utilities, header/nav system, hero patterns, section styles, card/button components, footer styles, and responsive behavior in one cohesive system.
- Keep `main.css`, `shared.css`, and `styles.css` out of new page templates unless a specific legacy page dependency requires a targeted class.

## Overlap and Duplicate Patterns
- `:root` tokens are duplicated across files with conflicting palettes (`paidar.css`, `main.css`, `styles.css`).
- Core selectors are redefined in multiple files with different behavior:
  - `body`, `.container`, `.site-header`, `.hero`, `.card`, `.btn-primary`, `.site-footer`, `.skip-link`.
- `shared.css` has internal duplication (multiple repeated `.site-header`, `.site-footer`, `.header-title`, `.btn-primary` blocks), increasing cascade risk.
- `styles.css` is a separate dark-theme system and conflicts with Paidar brand defaults if loaded with `paidar.css`.

## Most Reusable Classes (Use These First)

### Header
- `.site-header`
- `.brand`
- `.container.flex.between.center`
- `.skip-link`

### Navigation
- `.primary-nav`
- `.nav-list`
- `.nav-reset`
- `.has-sub`
- `.sub`
- `.nav-toggle`
- `.mobile-drawer`

### Hero
- `.hero` (with inline `--hero-image`)
- `.lead`
- `.feature-list`

### Section Layout
- `.section`
- `.section.tint` + theme classes (`.theme-modern`, `.theme-edge`, etc.)
- `.container`
- `.container-right`
- `.stack`
- `.center`

### Cards
- `.card`
- `.card-dark`
- `.card.accent-*` (`.accent-modern`, `.accent-cyber`, etc.)

### Buttons
- `.btn`
- `.btn-primary`
- `.btn-gold`
- `.btn-outline`

### Footer
- `.site-footer`
- `.footer-grid`
- `.footer-brand`
- `.footer-socials`
- `.footer-nav`

### Responsive Grids
- `.grid-2`
- `.grid-3`
- `.kpi-band`
- Built-in responsive behavior in `@media (max-width: 980px)` for `.grid-2`, `.grid-3`, and nav switch classes.

## Practical Guidance for New Pages
- Base new pages on `paidar.css` component patterns to minimize CSS changes.
- Reuse existing semantic structures already present in current HTML templates.
- Treat `shared.css` and `styles.css` as legacy/special-case sources, not foundations for the new front-door conversion layer.
