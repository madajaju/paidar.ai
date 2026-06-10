document.getElementById('y')?.setAttribute('textContent', new Date().getFullYear());
if (document.getElementById('y')) document.getElementById('y').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('open');
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const navSubmenus = document.querySelectorAll('.primary-nav .has-sub');

function closeSubmenu(item) {
  const trigger = item.querySelector('a[aria-haspopup="true"]');
  if (!trigger) return;
  trigger.setAttribute('aria-expanded', 'false');
}

function closeAllSubmenus() {
  navSubmenus.forEach(closeSubmenu);
}

navSubmenus.forEach((item, index) => {
  const trigger = item.querySelector('a[aria-haspopup="true"]');
  const menu = item.querySelector('.sub');
  if (!trigger || !menu) return;

  if (!menu.id) {
    menu.id = `nav-submenu-${index + 1}`;
  }

  trigger.setAttribute('aria-controls', menu.id);

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    closeAllSubmenus();
    trigger.setAttribute('aria-expanded', String(!isExpanded));
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.primary-nav .has-sub')) {
    closeAllSubmenus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllSubmenus();
  }
});

// highlight current nav item
const current = location.pathname.replace(/\/index\.html$/, '/');
document.querySelectorAll('.primary-nav a').forEach(a => {
  const href = new URL(a.href, window.location.origin);
  if (href.pathname === current) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  }
});

/**
 * Reusable CTA Block Component
 * Usage: <cta-block data-type="assessment"></cta-block>
 */
class CTABlock extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('data-type') || 'assessment';
    this.render(type);
  }

  getTrackingKey(text, type) {
    const t = text.toLowerCase();
    if (type === 'book_detail') return 'cta_book_detail_next_step';
    if (t.includes('assessment')) return 'cta_start_assessment';
    if (t.includes('strategy session') || t.includes('talk to darren')) return 'cta_book_strategy_session';
    if (t.includes('workshop')) return 'cta_explore_workshops';
    if (t.includes('book')) return 'cta_view_books';
    return 'cta_click';
  }

  render(type) {
    const configs = {
      assessment: {
        title: "Ready to Turn AI Into Reliable Execution?",
        subtitle: "Start with a focused assessment or book a strategy session to align your roadmap.",
        primary: { text: "Start an Assessment", href: "/assessments.html" },
        secondary: { text: "Explore Workshops", href: "/workshops/" },
        tertiary: { text: "Book a Strategy Session", href: "https://darrenpulsipher.zohobookings.com/#/AIConsult" }
      },
      book: {
        title: "Ready to Master AI-Augmented Operations?",
        subtitle: "Order the books to build your foundation, then assess your organization's readiness.",
        primary: { text: "Explore All Books", href: "/books/" },
        secondary: { text: "Take an Assessment", href: "/assessments.html" },
        tertiary: { text: "Book a Workshop", href: "/workshops/" }
      },
      book_detail: {
        title: "What to Do Next?",
        subtitle: "The books provide the framework. Now, apply it to your organization.",
        primary: { text: "Take the Assessment", href: "/assessments.html" },
        secondary: { text: "Book a Workshop", href: "/workshops/" },
        tertiary: { text: "Schedule a Strategy Session", href: "https://darrenpulsipher.zohobookings.com/#/AIConsult" }
      },
      workshop: {
        title: "Bridge the Gap Between Strategy and Execution",
        subtitle: "Move beyond theory with outcome-oriented workshops for your team or leadership.",
        primary: { text: "Book a Workshop", href: "/workshops/" },
        secondary: { text: "Start an Assessment", href: "/assessments.html" },
        tertiary: { text: "Contact Consulting", href: "/services.html" }
      },
      consulting: {
        title: "Move From Experimentation to Execution",
        subtitle: "Get dedicated advisory support to build governance, roadmaps, and reliable AI capacity.",
        primary: { text: "Book a Strategy Session", href: "https://darrenpulsipher.zohobookings.com/#/AIConsult" },
        secondary: { text: "Start an Assessment", href: "/assessments.html" },
        tertiary: { text: "Explore Workshops", href: "/workshops/" }
      },
      sector: {
        title: "Strategic AI for Your Specific Industry",
        subtitle: "Start with an assessment to identify high-value use cases and governance requirements.",
        primary: { text: "Start an Assessment", href: "/assessments.html" },
        secondary: { text: "Book a Strategy Session", href: "https://darrenpulsipher.zohobookings.com/#/AIConsult" },
        tertiary: { text: "Explore Workshops", href: "/workshops/" }
      },
      services_closing: {
        title: "Need help turning AI into reliable execution?",
        subtitle: "Book a strategy session to discuss your specific challenges or start with an organizational assessment.",
        primary: { text: "Book a Strategy Session", href: "https://darrenpulsipher.zohobookings.com/#/AIConsult" },
        secondary: { text: "Start an Assessment", href: "/assessments.html" }
      }
    };

    const config = configs[type] || configs.assessment;

    this.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="banner card-dark theme-modern">
            <h2>${config.title}</h2>
            <p>${config.subtitle}</p>
            <div class="flex wrap" style="gap: var(--space-4); margin-top: var(--space-5);">
              <a class="btn btn-primary" href="${config.primary.href}" data-propagate-utm="true" data-track="${this.getTrackingKey(config.primary.text, type)}">${config.primary.text}</a>
              ${config.secondary ? `<a class="btn btn-gold" href="${config.secondary.href}" data-propagate-utm="true" data-track="${this.getTrackingKey(config.secondary.text, type)}">${config.secondary.text}</a>` : ''}
              ${config.tertiary ? `<a class="btn btn-outline" href="${config.tertiary.href}" ${config.tertiary.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} data-propagate-utm="true" data-track="${this.getTrackingKey(config.tertiary.text, type)}">${config.tertiary.text}</a>` : ''}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

/**
 * Recommended Step Component
 * Usage: <recommended-step data-sector="higher-education"></recommended-step>
 */
class RecommendedStep extends HTMLElement {
  connectedCallback() {
    const sector = this.getAttribute('data-sector') || 'enterprise';
    this.render(sector);
  }

  getTrackingKey(text) {
    const t = text.toLowerCase();
    if (t.includes('assessment')) return 'cta_start_assessment';
    if (t.includes('strategy session')) return 'cta_book_strategy_session';
    return 'cta_click';
  }

  render(sector) {
    const configs = {
      'higher-education': {
        title: "Recommended Starting Point",
        action: "Individual & Team AI Readiness Assessment",
        description: "Benchmark AI literacy across faculty and staff to identify training gaps and implementation opportunities.",
        btnText: "Start Assessment",
        btnHref: "/assessments.html"
      },
      'government': {
        title: "Recommended Starting Point",
        action: "Organizational Alignment Assessment",
        description: "Evaluate mission readiness and governance requirements for secure AI adoption across your agency.",
        btnText: "Start Assessment",
        btnHref: "/assessments.html"
      },
      'enterprise': {
        title: "Recommended Starting Point",
        action: "Executive Strategy Session",
        description: "Align your AI roadmap with business outcomes and establish the governance required for reliable execution.",
        btnText: "Book a Strategy Session",
        btnHref: "https://darrenpulsipher.zohobookings.com/#/AIConsult"
      },
      'healthcare': {
        title: "Recommended Starting Point",
        action: "Clinical & Operational Readiness Assessment",
        description: "Identify high-value use cases while ensuring HIPAA compliance and clinical safety protocols.",
        btnText: "Start Assessment",
        btnHref: "/assessments.html"
      }
    };

    const config = configs[sector] || configs.enterprise;

    this.innerHTML = `
      <section class="section border-top">
        <div class="container">
          <div class="grid-2 align-center">
            <div>
              <span class="eyebrow">${config.title}</span>
              <h2>${config.action}</h2>
              <p class="lead">${config.description}</p>
            </div>
            <div class="text-center-mobile">
              <a class="btn btn-primary" href="${config.btnHref}" data-propagate-utm="true" data-track="${this.getTrackingKey(config.btnText)}">${config.btnText}</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

if (!customElements.get('cta-block')) {
  customElements.define('cta-block', CTABlock);
}

if (!customElements.get('recommended-step')) {
  customElements.define('recommended-step', RecommendedStep);
}
