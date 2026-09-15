(function () {
  const catalog = [
    {
      id: 'becoming-ai-augmented',
      title: 'Becoming AI-Augmented',
      summary: 'A practical guide to building personal AI judgment and trustworthy AI-assisted work.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['learn', 'apply'],
      offeringType: 'book',
      audience: ['professionals', 'leaders'],
      href: '/books/becoming-ai-augmented/',
      cta: 'Get the Book',
      relatedAssets: ['/assets/downloads/becoming/full-workbook.md'],
      relatedOfferings: ['readiness-assessment']
    },
    {
      id: 'ai-augmented-teams',
      title: 'AI-Augmented Teams',
      summary: 'A field guide for building repeatable team workflows, handoffs, controls, and accountable execution.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['learn', 'apply'],
      offeringType: 'book',
      audience: ['team-leaders', 'operations-leaders'],
      href: '/books/ai-augmented-teams/',
      cta: 'Get the Book',
      relatedOfferings: ['team-enablement-workshop', 'readiness-assessment']
    },
    {
      id: 'readiness-assessment',
      title: 'AI Readiness Assessments',
      summary: 'Baseline readiness, capability, workflow friction, and governance needs so leaders can choose a useful next step.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['apply', 'augment'],
      offeringType: 'assessment',
      audience: ['leaders', 'teams', 'organizations'],
      href: '/assessments.html',
      cta: 'Take the Assessment',
      relatedOfferings: ['implementation-roadmap', 'team-enablement-workshop']
    },
    {
      id: 'integrity-toolkit',
      title: 'Integrity Packets and Toolkits',
      summary: 'Templates and decision aids for grounding, validation, disclosure, governance, and release readiness.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['apply'],
      offeringType: 'toolkit',
      audience: ['teams', 'educators', 'governance-leaders'],
      href: '/toolkit/',
      cta: 'Explore the Toolkit',
      relatedAssets: ['/integrity-packet-template/', '/workflow-kit/'],
      relatedOfferings: ['readiness-assessment']
    },
    {
      id: 'team-enablement-workshop',
      title: 'Team AI Enablement Workshop',
      summary: 'A working session that produces shared workflow practices, quality standards, handoffs, and an accountable next step.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['apply', 'augment'],
      offeringType: 'workshop',
      audience: ['team-leaders', 'functional-teams'],
      href: '/workshops/team-ai-enablement/',
      cta: 'Plan a Workshop',
      relatedOfferings: ['readiness-assessment', 'implementation-roadmap']
    },
    {
      id: 'executive-workshop',
      title: 'Executive AI Organization Workshop',
      summary: 'An executive working session for aligning AI priorities, governance, investment decisions, and an operating roadmap.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['apply', 'augment'],
      offeringType: 'workshop',
      audience: ['executives', 'organization-leaders'],
      href: '/workshops/executive-ai-organization/',
      cta: 'Plan a Workshop',
      relatedOfferings: ['readiness-assessment', 'advisory']
    },
    {
      id: 'training',
      title: 'AI and Architecture Training',
      summary: 'Courses and guided learning that build practical AI capability, cloud architecture, and enterprise design skills.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented', 'general-architecture'],
      engagement: ['learn', 'apply'],
      offeringType: 'training',
      audience: ['professionals', 'architects', 'educators'],
      href: '/training/',
      cta: 'Explore Training',
      relatedOfferings: ['team-enablement-workshop']
    },
    {
      id: 'advisory',
      title: 'AI Advisory and Governance',
      summary: 'Advisory support for priorities, governance, operating models, investment choices, and measurable execution.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented', 'general-architecture'],
      engagement: ['augment'],
      offeringType: 'advisory',
      audience: ['executives', 'organizations'],
      href: '/services.html',
      cta: 'Discuss Advisory',
      relatedOfferings: ['readiness-assessment', 'implementation-roadmap']
    },
    {
      id: 'implementation-roadmap',
      title: 'Implementation and Workflow Redesign',
      summary: 'Move priority workflows into operation through governance, architecture, pilots, integration, and measurement.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented', 'general-architecture'],
      engagement: ['augment'],
      offeringType: 'implementation',
      audience: ['organizations', 'operations-leaders'],
      href: '/aaos-implementation/',
      cta: 'Discuss Implementation',
      relatedOfferings: ['readiness-assessment', 'advisory']
    },
    {
      id: 'architecture-tools',
      title: 'Architecture and Transformation Tools',
      summary: 'Software and architecture engagements for modeling systems, transforming data, orchestrating workflows, and scaling execution.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['general-architecture'],
      engagement: ['apply', 'augment'],
      offeringType: 'software',
      audience: ['architects', 'technology-leaders'],
      href: '/software.html',
      cta: 'Explore Software',
      relatedOfferings: ['implementation-roadmap', 'advisory']
    },
    {
      id: 'keynote',
      title: 'Keynotes and Executive Sessions',
      summary: 'Focused conversations that help leaders frame AI opportunity, risk, governance, and practical action.',
      domain: ['business', 'education', 'legal', 'medical'],
      framework: ['ai-augmented'],
      engagement: ['augment'],
      offeringType: 'keynote',
      audience: ['executives', 'organizations'],
      href: 'https://drdarrenspeaks.com',
      cta: 'Visit DrDarrenSpeaks',
      relatedOfferings: ['executive-workshop', 'advisory']
    }
  ];

  const labels = {
    book: 'Books & Guides', assessment: 'Assessments', toolkit: 'Toolkits & Playbooks',
    workshop: 'Workshops', training: 'Training', keynote: 'Keynotes', advisory: 'Advisory',
    implementation: 'Implementation', software: 'Software'
  };

  function values(value) { return Array.isArray(value) ? value : [value]; }

  function matches(item, filters) {
    return (!filters.domain || values(item.domain).includes(filters.domain))
      && (!filters.framework || values(item.framework).includes(filters.framework))
      && (!filters.engagement || values(item.engagement).includes(filters.engagement))
      && (!filters.offeringType || item.offeringType === filters.offeringType)
      && (!filters.audience || values(item.audience).includes(filters.audience));
  }

  function card(item) {
    const related = item.relatedOfferings?.length
      ? `<p class="catalog-related"><strong>Related:</strong> ${item.relatedOfferings.map(id => catalog.find(other => other.id === id)?.title).filter(Boolean).join(' · ')}</p>`
      : '';
    const assets = item.relatedAssets?.length
      ? `<p class="catalog-related"><strong>Includes or connects to:</strong> ${item.relatedAssets.map(asset => `<a href="${asset}">Related asset</a>`).join(' · ')}</p>`
      : '';
    const external = item.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
    return `<article class="card offering-card" data-domain="${item.domain.join(',')}" data-framework="${item.framework.join(',')}" data-engagement="${item.engagement.join(',')}" data-offering-type="${item.offeringType}" data-audience="${item.audience.join(',')}"><span class="eyebrow">${labels[item.offeringType]}</span><h3>${item.title}</h3><p>${item.summary}</p>${assets}${related}<p><a class="btn btn-primary" href="${item.href}"${external}>${item.cta}</a></p></article>`;
  }

  function render(root, filters) {
    const items = catalog.filter(item => matches(item, filters));
    root.innerHTML = items.length ? items.map(card).join('') : '<p class="empty-state">No offerings match those filters yet. Try a broader audience or engagement.</p>';
    const count = document.querySelector('[data-catalog-count]');
    if (count) count.textContent = `${items.length} offering${items.length === 1 ? '' : 's'}`;
  }

  function init() {
    const root = document.querySelector('[data-offering-catalog]');
    if (!root) return;
    const domainPage = document.body.dataset.domainPage;
    const query = new URLSearchParams(window.location.search);
    const filters = {
      domain: domainPage || query.get('domain') || '',
      framework: query.get('framework') || '',
      engagement: query.get('engagement') || '',
      offeringType: query.get('offeringType') || '',
      audience: query.get('audience') || ''
    };
    const controls = document.querySelectorAll('[data-catalog-filter]');
    controls.forEach(control => { control.value = filters[control.dataset.catalogFilter] || ''; });
    const update = () => {
      controls.forEach(control => { filters[control.dataset.catalogFilter] = control.value; });
      render(root, filters);
    };
    controls.forEach(control => control.addEventListener('change', update));
    render(root, filters);
  }

  window.PaidarOfferingCatalog = { catalog, render };
  document.addEventListener('DOMContentLoaded', init);
}());
