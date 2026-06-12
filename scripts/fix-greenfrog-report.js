const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const siteRoot = path.resolve(__dirname, '..', 'site');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.includes(`${path.sep}.git`) || full.includes(`${path.sep}.idea`) || full.includes(`${path.sep}node_modules`)) {
        continue;
      }
      out.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function convertLength(value) {
  if (!value) return null;
  const match = String(value).trim().toLowerCase().match(/^([0-9]+(?:\.[0-9]+)?)(px|in|pt|cm|mm|pc)?$/);
  if (!match) return null;
  const n = Number(match[1]);
  const unit = match[2] || 'px';
  switch (unit) {
    case 'in':
      return Math.round(n * 96);
    case 'pt':
      return Math.round(n * (96 / 72));
    case 'cm':
      return Math.round(n * (96 / 2.54));
    case 'mm':
      return Math.round(n * (96 / 25.4));
    case 'pc':
      return Math.round(n * 16);
    default:
      return Math.round(n);
  }
}

const sizeCache = new Map();

function getRasterSize(file) {
  const command = [
    'Add-Type -AssemblyName System.Drawing;',
    `$img = [System.Drawing.Image]::FromFile('${file.replace(/'/g, "''")}');`,
    'try { Write-Output "$($img.Width)x$($img.Height)" } finally { $img.Dispose() }',
  ].join(' ');
  const out = cp.execFileSync('powershell', ['-NoProfile', '-Command', command], { encoding: 'utf8' }).trim();
  const [width, height] = out.split('x').map(Number);
  return Number.isFinite(width) && Number.isFinite(height) ? { width, height } : null;
}

function getSvgSize(file) {
  const raw = fs.readFileSync(file, 'utf8');
  let width = null;
  let height = null;
  const widthMatch = raw.match(/\bwidth=["']([^"']+)["']/i);
  const heightMatch = raw.match(/\bheight=["']([^"']+)["']/i);
  if (widthMatch) width = convertLength(widthMatch[1]);
  if (heightMatch) height = convertLength(heightMatch[1]);
  if ((!width || !height) && raw.match(/\bviewBox=["']([0-9eE.+\-\s,]+)["']/i)) {
    const parts = RegExp.$1.split(/[\s,]+/).filter(Boolean);
    if (parts.length === 4) {
      if (!width) width = Math.round(Number(parts[2]));
      if (!height) height = Math.round(Number(parts[3]));
    }
  }
  return width && height ? { width, height } : null;
}

function getAssetSize(file) {
  if (sizeCache.has(file)) return sizeCache.get(file);
  const ext = path.extname(file).toLowerCase();
  let size = null;
  try {
    if (ext === '.svg') {
      size = getSvgSize(file);
    } else {
      size = getRasterSize(file);
    }
  } catch {
    size = null;
  }
  sizeCache.set(file, size);
  return size;
}

function resolveAsset(filePath, src) {
  if (src.startsWith('/')) {
    return path.join(siteRoot, src.replace(/^\/+/, ''));
  }
  return path.resolve(path.dirname(filePath), src);
}

const altOverrides = {
  'paidar.svg': 'Paidar.ai mark',
  'government-box.png': 'Government AI modernization illustration',
  'education-box.png': 'Higher education AI transformation illustration',
  'edt.svg': 'Embracing Digital transformation icon',
};

function replaceAllExact(content, oldValue, newValue) {
  return content.split(oldValue).join(newValue);
}

function updateImages(filePath, content) {
  return content.replace(/<img\b[\s\S]*?>/gi, (tag) => {
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) return tag;
    const src = srcMatch[1];
    if (/^(?:https?:)?\/\//i.test(src) || /^data:/i.test(src) || /^\$\{/.test(src)) return tag;

    const assetPath = resolveAsset(filePath, src);
    if (!fs.existsSync(assetPath)) return tag;

    const size = getAssetSize(assetPath);
    if (!size) return tag;

    const widthMatch = tag.match(/\bwidth\s*=\s*["']([^"']+)["']/i);
    const heightMatch = tag.match(/\bheight\s*=\s*["']([^"']+)["']/i);
    const existingWidth = widthMatch ? Number.parseFloat(widthMatch[1]) : null;
    const existingHeight = heightMatch ? Number.parseFloat(heightMatch[1]) : null;

    let width = existingWidth || size.width;
    let height = existingHeight || size.height;
    if (widthMatch && !heightMatch && existingWidth) {
      height = Math.round((existingWidth * size.height) / size.width);
    } else if (!widthMatch && heightMatch && existingHeight) {
      width = Math.round((existingHeight * size.width) / size.height);
    }

    let out = tag;
    const additions = [];
    if (!widthMatch) additions.push(`width="${width}"`);
    if (!heightMatch) additions.push(`height="${height}"`);
    if (additions.length > 0) {
      out = out.replace(/(\s*\/?>)$/, ` ${additions.join(' ')}$1`);
    }

    const basename = path.basename(assetPath).toLowerCase();
    const altOverride = altOverrides[basename];
    if (altOverride) {
      const altMatch = out.match(/\balt\s*=\s*["']([^"']*)["']/i);
      if (altMatch) {
        if (altMatch[1].trim() === '') {
          out = out.replace(/\balt\s*=\s*["'][^"']*["']/i, `alt="${altOverride}"`);
        }
      } else {
        out = out.replace(/(\s*\/?>)$/, ` alt="${altOverride}"$1`);
      }
    }

    if (filePath.endsWith(path.join('training', 'cloud-computing.html')) && basename === 'edt.svg') {
      out = out.replace(/\s+aria-hidden="true"/i, '');
    }

    return out;
  });
}

function updateByFile(relPath, content) {
  const replacements = [];
  const add = (from, to) => replacements.push([from, to]);
  const globalReplacements = [
    ['https://drdarrenspeaks.com/workshops/ai-augmented-education/', '/workshops/'],
    ['https://drdarrenspeaks.com/workshops/ai-executive-workshop/', '/workshops/'],
    ['https://drdarrenspeaks.com/workshops/becoming-ai-augmented/', '/workshops/'],
    ['https://drdarrenspeaks.com/workshops/public-sector-ai-strategy/', '/workshops/'],
    ['https://drdarrenspeaks.com/workshops/team-ai-enablement/', '/workshops/'],
    ['https://drdarrenspeaks.com/workshops/', '/workshops/'],
    ['https://www.drdarrenspeaks.com', '/about/dr-darren-pulsipher/'],
    ['https://drdarrenspeaks.com', '/about/dr-darren-pulsipher/'],
    ['https://embracingdigital.org/en/aaos/control_stage/integrity-package.html?utm_source=paidar&utm_medium=referral&utm_campaign=aaos_crosslink', '/integrity-packet-template/'],
    ['https://embracingdigital.org/en/aaos/measure.html?utm_source=paidar&utm_medium=referral&utm_campaign=aaos_crosslink', '/dashboard-template/'],
    ['https://embracingdigital.org/en/aaos/models/index.html?utm_source=paidar&utm_medium=referral&utm_campaign=aaos_crosslink', '/frameworks/aaos/'],
    ['https://embracingdigital.org/en/aaos/models/operating-dashboard/?utm_source=paidar&utm_medium=referral&utm_campaign=aaos_crosslink', '/dashboard-template/'],
    ['https://embracingdigital.org/en/aaos/?utm_source=paidar&utm_medium=referral&utm_campaign=aaos_crosslink', '/frameworks/aaos/'],
    ['https://embracingdigital.org/?utm_source=paidar&utm_medium=referral&utm_campaign=aaos_crosslink', '/frameworks/aaos/'],
    ['https://embracingdigital.org/', '/frameworks/aaos/'],
    ['https://www.runaire.ai', '/software.html#runaire'],
    ['https://www.treoir.ai', '/software.html#treoir'],
  ];

  if (relPath === 'aaos-implementation/index.html') {
    add('<title>AAOS Implementation Services and Engagement Paths | Paidar.ai</title>', '<title>AAOS Implementation Services | Paidar.ai</title>');
    add('<meta name="description" content="Explore AAOS implementation engagement options from Paidar.ai, including workshops, advisory, and enterprise delivery support after assessment and activation work." />', '<meta name="description" content="Explore AAOS implementation engagement paths, including workshops, advisory, and delivery support after assessment." />');
  }
  if (relPath === 'about/dr-darren-pulsipher/index.html') {
    add('<title>Dr. Darren Pulsipher | Enterprise AI Transformation | Paidar.ai</title>', '<title>Dr. Darren Pulsipher | AI Transformation | Paidar.ai</title>');
  }
  if (relPath === 'about.html') {
    add('<title>About Paidar.ai: Practical AI Leadership and Execution | Paidar.ai</title>', '<title>About Paidar.ai | AI Leadership and Execution</title>');
  }
  if (relPath === 'assessment/index.html') {
    add('<title>Team AI Readiness Assessment and Maturity Benchmark | Paidar.ai</title>', '<title>Team AI Readiness Assessment | Paidar.ai</title>');
  }
  if (relPath === 'assessments.html') {
    add('<title>AI Readiness Assessments for Individuals, Teams, and Leaders | Paidar.ai</title>', '<title>AI Readiness Assessments | Paidar.ai</title>');
    add('<meta name="description" content="Assess AI readiness at the individual, team, and organizational levels with Paidar.ai to identify capability gaps, governance risks, and the next best path forward." />', '<meta name="description" content="Assess AI readiness at the individual, team, and organizational levels to uncover gaps, reduce risk, and choose the next best path forward." />');
  }
  if (relPath === 'books/ai-augmented-education/index.html') {
    add('<title>AI-Augmented Education: A Framework for Institution-Wide AI Learning Systems | Paidar.ai</title>', '<title>AI-Augmented Education | Paidar.ai</title>');
    add('<meta name="description" content="Explore AI-Augmented Education, the Paidar.ai framework for institution-wide AI learning systems, governance, literacy, and scalable educational transformation." />', '<meta name="description" content="A framework for institution-wide AI learning systems, governance, literacy, and scalable educational transformation." />');
  }
  if (relPath === 'books/ai-augmented-organizations/index.html') {
    add('<title>AI-Augmented Organizations: A Guide to Enterprise AI Governance and Scale | Paidar.ai</title>', '<title>AI-Augmented Organizations | Paidar.ai</title>');
    add('<meta name="description" content="Explore AI-Augmented Organizations, the Paidar.ai guide to enterprise AI governance, operating standards, and responsible scale across teams and business units." />', '<meta name="description" content="A guide to enterprise AI governance, operating standards, and responsible scale across teams and business units." />');
  }
  if (relPath === 'books/ai-augmented-teams/index.html') {
    add('<title>AI-Augmented Teams: A Practical Guide to Reliable Team AI Execution | Paidar.ai</title>', '<title>AI-Augmented Teams | Paidar.ai</title>');
  }
  if (relPath === 'books/becoming-ai-augmented/index.html') {
    add('<title>Becoming AI-Augmented: A Practical Guide to Personal AI Judgment | Paidar.ai</title>', '<title>Becoming AI-Augmented | Paidar.ai</title>');
  }
  if (relPath === 'books/educating-the-ai-augmented/index.html') {
    add('<title>Educating the AI-Augmented: A Guide to Real Learning in the Age of AI | Paidar.ai</title>', '<title>Educating the AI-Augmented | Paidar.ai</title>');
  }
  if (relPath === 'books/index.html') {
    add('<meta name="description" content="Paidar.ai books provide the shared language, operating discipline, and practical frameworks leaders need to move AI from experimentation into reliable execution." />', '<meta name="description" content="Paidar.ai books give leaders and practitioners shared language, operating discipline, and practical frameworks for reliable AI-enabled work." />');
  }
  if (relPath === 'integrity-packet-template/index.html') {
    add('<meta name="description" content="Download the AAOS Integrity Packet template and filled example for documenting assumptions, evidence, validation, ownership, and risk in AI-assisted decisions." />', '<meta name="description" content="Download the AAOS Integrity Packet template and example for documenting assumptions, evidence, validation, ownership, and risk." />');
  }
  if (relPath === 'contact.html') {
    add('<title>Contact Paidar.ai for Assessments, Workshops, and Advisory | Paidar.ai</title>', '<title>Contact Paidar.ai | Assessments and Advisory</title>');
  }
  if (relPath === 'educators/index.html') {
    add('<title>AI Educator Toolkit and Higher Education Resources | Paidar.ai</title>', '<title>AI Educator Toolkit | Paidar.ai</title>');
    add('<meta name="description" content="Download the Paidar.ai AI Educator Toolkit and explore practical higher education resources, templates, and guides for responsible AI-enabled teaching and learning." />', '<meta name="description" content="Download the Paidar.ai AI Educator Toolkit for templates, guides, and resources that support responsible AI-enabled teaching and learning." />');
    add('>Learn More</a>', '>Read More</a>');
    add('>Learn More</a>', '>Read More</a>');
  }
  if (relPath === 'executive-brief/index.html') {
    add('<title>AAOS Executive Brief for AI Reliability and Governance | Paidar.ai</title>', '<title>AAOS Executive Brief | Paidar.ai</title>');
  }
  if (relPath === 'frameworks/ai-operating-model/index.html') {
    add('<title>AI Operating Model | Enterprise AI Governance and Execution | Paidar.ai</title>', '<title>AI Operating Model | Paidar.ai</title>');
  }
  if (relPath === 'frameworks/gdxa/index.html') {
    add('<title>GDXA: Government Digital Transformation Architecture | Paidar.ai</title>', '<title>GDXA | Government Transformation Architecture | Paidar.ai</title>');
  }
  if (relPath === 'frameworks/gear/index.html') {
    add('<title>GEAR | Government Enterprise Architecture Reference | Paidar.ai</title>', '<title>GEAR | Government Architecture Reference | Paidar.ai</title>');
  }
  if (relPath === 'frameworks/index.html') {
    add('<title>AI Transformation Frameworks for Reliable Execution | Paidar.ai</title>', '<title>AI Transformation Frameworks | Paidar.ai</title>');
  }
  if (relPath === 'frameworks/aaos/index.html') {
    add('<meta name="description" content="AAOS is Paidar.ai’s framework for helping organizations deliver reliable, defensible outcomes with AI through disciplined human accountability, validation, and operating model design." />', '<meta name="description" content="AAOS helps organizations deliver reliable AI outcomes through accountability, validation, and operating model design." />');
  }
  if (relPath === 'index.html') {
    add('<title>AI Readiness Assessments, Workshops, and Advisory | Paidar.ai</title>', '<title>AI Readiness Assessments and Advisory | Paidar.ai</title>');
    add('<meta name="description" content="Paidar.ai helps leaders, teams, and organizations turn AI experimentation into reliable execution through readiness assessments, hands-on workshops, and advisory services." />', '<meta name="description" content="Paidar.ai helps leaders, teams, and organizations move from AI experimentation to reliable execution through assessments, workshops, and advisory." />');
  }
  if (relPath === 'insights.html') {
    add('<title>AI Adoption Guides, Frameworks, and Readiness Insights | Paidar.ai</title>', '<title>AI Adoption Insights | Paidar.ai</title>');
    add('<meta name="description" content="Explore selected AI adoption guides, frameworks, and readiness insights from Paidar.ai to support executive decisions, team enablement, and practical execution." />', '<meta name="description" content="Explore AI adoption guides, frameworks, and readiness insights that support executive decisions, team enablement, and practical execution." />');
  }
  if (relPath === 'insights/reliable-ai-execution/index.html') {
    add('<meta name="description" content="Reliable AI execution helps organizations move beyond pilots by connecting AI strategy, governance, team capability, validation, and measurable business outcomes." />', '<meta name="description" content="Reliable AI execution connects AI strategy, governance, capability, validation, and measurable outcomes beyond the pilot stage." />');
  }
  if (relPath === 'dashboard-template/index.html') {
    add('<meta name="description" content="Download the AAOS reliability dashboard template with six key indicators for tracking validation quality, throughput, ownership, and AI-augmented operating confidence." />', '<meta name="description" content="Download the AAOS dashboard template with six indicators for tracking validation quality, throughput, ownership, and confidence." />');
  }
  if (relPath === 'sectors/government.html') {
    add('<title>Government AI Solutions and Mission-Aligned Modernization | Paidar.ai</title>', '<title>Government AI Solutions | Paidar.ai</title>');
  }
  if (relPath === 'sectors/healthcare.html') {
    add('<title>Healthcare AI Solutions and Clinical Safety | Paidar.ai</title>', '<title>Healthcare AI Solutions | Paidar.ai</title>');
    add('<meta name="description" content="Safe, compliant AI adoption for healthcare providers and payers with HIPAA-aligned governance, clinical safety, workflow integration, and measurable operational improvement." />', '<meta name="description" content="Safe, compliant AI adoption for healthcare providers and payers with governance, clinical safety, workflow integration, and measurable improvement." />');
  }
  if (relPath === 'sectors/higher-education.html') {
    add('<title>Higher Education AI Solutions and Academic Integrity | Paidar.ai</title>', '<title>Higher Education AI Solutions | Paidar.ai</title>');
  }
  if (relPath === 'sectors/index.html') {
    add('<title>AI Solutions by Sector for Education, Government, Enterprise, and Healthcare | Paidar.ai</title>', '<title>AI Solutions by Sector | Paidar.ai</title>');
    add('<meta name="description" content="Explore Paidar.ai sector-specific AI solutions for higher education, government, enterprise, and healthcare organizations that need governed, mission-aligned execution." />', '<meta name="description" content="Explore sector-specific AI solutions for higher education, government, enterprise, and healthcare organizations that need governed execution." />');
  }
  if (relPath === 'services.html') {
    add('<title>AI Advisory, Governance, and Implementation Services | Paidar.ai</title>', '<title>AI Advisory and Implementation Services | Paidar.ai</title>');
    add('<meta name="description" content="Paidar.ai provides AI advisory, governance, and implementation services that help organizations turn experimentation into accountable, measurable execution." />', '<meta name="description" content="Paidar.ai provides AI advisory, governance, and implementation services for accountable, measurable execution." />');
  }
  if (relPath === 'software.html') {
    add('<title>AI Software Tools for Architecture, Data, and Workflow Execution | Paidar.ai</title>', '<title>AI Software Tools | Paidar.ai</title>');
    add('<meta name="description" content="Explore Paidar.ai software tools for architecture, data transformation, workflow execution, and AI-augmented operations across secure enterprise, government, and education environments." />', '<meta name="description" content="Explore Paidar.ai software tools for architecture, data transformation, workflow execution, and AI-augmented operations across secure organizations." />');
  }
  if (relPath === 'solutions.html') {
    add('<title>AI Adoption Solutions for Leaders, Teams, and Educators | Paidar.ai</title>', '<title>AI Adoption Solutions | Paidar.ai</title>');
    add('<meta name="description" content="Find the right AI adoption pathway for leaders, teams, educators, and public-sector organizations with assessments, workshops, advisory, and sector-specific guidance." />', '<meta name="description" content="Find the right AI adoption path for leaders, teams, educators, and public-sector organizations with assessments, workshops, advisory, and sector guidance." />');
  }
  if (relPath === 'toolkit/index.html') {
    add('<title>AI Implementation Toolkit Downloads | Paidar.ai</title>', '<title>AI Implementation Toolkit | Paidar.ai</title>');
    add('<meta name="description" content="Download practical AI implementation toolkit resources, templates, and quick-reference assets from Paidar.ai for workflow control, validation, and operational rollout." />', '<meta name="description" content="Download practical AI implementation toolkit resources, templates, and quick references for workflow control and operational rollout." />');
    add('>Learn More</a>', '>Read More</a>');
    add('>Learn More</a>', '>Read More</a>');
  }
  if (relPath === 'training/cloud-computing.html') {
    add('<title>AI-Augmented Cloud Computing Training for Technologists | Paidar.ai</title>', '<title>AI Cloud Computing Training | Paidar.ai</title>');
  }
  if (relPath === 'training/microservices.html') {
    add('<title>Scalable Microservices Training and Architecture Workshop | Paidar.ai</title>', '<title>Microservices Training | Paidar.ai</title>');
    add('<meta name="description" content="Practical microservices training for engineers and architects designing resilient distributed systems with modern architecture, delivery, and operations patterns." />', '<meta name="description" content="Practical microservices training for engineers and architects designing resilient distributed systems with modern delivery patterns." />');
  }
  if (relPath === 'workshops/index.html') {
    add('>Learn more about Education focus</a>', '>Explore the education focus</a>');
    add('>Learn more about Public Sector</a>', '>Explore the public sector focus</a>');
  }
  if (relPath === '404.html') {
    add('<img src="/assets/img/paidar.svg"\n             alt=""\n             style="position:absolute;top:30%;left:0%;width:200px;"/>', '<img src="/assets/img/paidar.svg"\n             alt="Paidar.ai mark"\n             style="position:absolute;top:30%;left:0%;width:200px;"/>');
  }

  for (const [from, to] of replacements) {
    content = replaceAllExact(content, from, to);
  }

  for (const [from, to] of globalReplacements) {
    content = replaceAllExact(content, from, to);
  }

  if (relPath === 'books/index.html') {
    // No-op placeholder for future metadata tuning.
  }

  return content;
}

const files = walk(siteRoot);
const changed = [];

for (const filePath of files) {
  const relPath = path.relative(siteRoot, filePath).replace(/\\/g, '/');
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = updateImages(filePath, content);
  content = updateByFile(relPath, content);
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    changed.push(relPath);
  }
}

console.log(`Updated ${changed.length} HTML files.`);
changed.forEach((file) => console.log(file));
