/* ============================================================
   PROJECTS DATA
   To add a new project: add it to the TOP of this array.
   The homepage will automatically show the first 3 (first one featured).
   The work page shows all projects.
   ============================================================ */

const PROJECTS = [
  {
    href: 'homeowner-color-options.html',
    image: 'p6',
    imgSrc: '',
    imgAlt: 'Homeowner Color Options',
    tags: ['Product Design', 'B2B SaaS'],
    company: 'JobNimbus',
    title: 'Homeowner Color Options',
    desc: 'Letting homeowners select material colors directly within estimates — improving the sales experience for roofing contractors.',
    comingSoon: true
  },
  {
    href: 'ai-smart-check.html',
    image: 'p5',
    imgSrc: 'assets/images/JN Smart Check - WORK CARD - Small.png',
    imgSrcFeatured: 'assets/images/JN Smart Check - WORK CARD - Large.png',
    imgAlt: 'AI Smart Check',
    tags: ['Product Design', 'AI'],
    company: 'JobNimbus',
    title: 'AI Smart Check',
    desc: 'AI-powered validation on material orders — reducing errors and streamlining the ordering workflow for home services contractors.'
  },
  {
    href: 'mycase-smart-spend.html',
    image: 'p1',
    imgSrc: 'assets/images/SmartSpend WORK CARD (Small).png',
    imgAlt: 'MyCase Smart Spend',
    tags: ['Product Design', 'FinTech', 'LegalTech'],
    company: 'Affinipay',
    title: 'MyCase Smart Spend',
    desc: 'A brand-new product launch that lets law firms track expenses and directly bill them to the correct case — eliminating manual reconciliation workflows.'
  },
  {
    href: 'bulk-invoicing.html',
    image: 'p2',
    imgSrc: 'assets/images/NEW Filevine Bulk invoicing - WORK CARD - small.png',
    imgAlt: 'Bulk Invoicing',
    tags: ['Product Design', 'LegalTech'],
    company: 'Filevine',
    title: 'Bulk Invoicing',
    desc: 'Research revealed that batch invoicing wasn\'t the real need — so we redesigned the workflow to let users create multiple invoices in a single bulk action.'
  },
  {
    href: 'a2p-10dlc.html',
    image: 'p3',
    imgSrc: 'assets/images/A2P 10DLC WORK CARD (Small).png',
    imgAlt: 'A2P 10DLC Registration',
    tags: ['Product Design', 'Compliance'],
    company: 'Filevine',
    title: 'A2P 10DLC Registration',
    desc: 'Designed an in-app business registration flow in response to new wireless carrier regulations — delivered on a one-month timeline.'
  },
  {
    href: 'product-tour.html',
    image: 'p4',
    imgSrc: 'assets/images/UFC/Unite.ly WORK CARD (Small).png',
    imgAlt: 'Bridge Product Tour',
    tags: ['UX Design', 'Onboarding'],
    company: 'Unite.ly',
    title: 'Bridge Product Tour — Utah Foster Care',
    desc: 'Created an employee onboarding product tour for Bridge to Utah Foster Care ahead of a Foster Parent rollout — first professional project, tight scope and timeline.'
  }
];

/* ============================================================
   CARD BUILDER
   ============================================================ */
function buildCard(project, index, featured = false) {
  const delayClass = featured ? '' : `reveal-delay-${(index % 3) + 1}`;
  const featuredClass = featured ? 'project-card--featured' : '';
  const comingSoonClass = project.comingSoon ? 'project-card--coming-soon' : '';

  const tagsHTML = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
  const activeSrc = featured && project.imgSrcFeatured ? project.imgSrcFeatured : project.imgSrc;
  const imageContent = activeSrc
    ? `<img src="${activeSrc}" alt="${project.imgAlt}">`
    : '';

  const badge = project.comingSoon ? `<span class="project-coming-soon-badge">Coming Soon</span>` : '';

  const inner = `
        <div class="project-image ${project.image}">${imageContent}</div>
        <div class="project-info">
          <div class="project-meta">
            ${tagsHTML}
            <span class="project-company">${project.company}</span>
          </div>
          <h3 class="project-title">${project.title} ${badge}</h3>
          <p class="project-desc">${project.desc}</p>
        </div>`;

  return `
    <article class="project-card ${featuredClass} ${comingSoonClass} reveal ${delayClass}">
      ${project.comingSoon
        ? `<div>${inner}</div>`
        : `<a href="${project.href}">${inner}</a>`}
    </article>`;
}

/* ============================================================
   RENDER: HOMEPAGE (first 3, first one featured)
   ============================================================ */
const homeGrid = document.getElementById('projects-grid-home');
if (homeGrid) {
  const visible = PROJECTS.filter(p => !p.comingSoon);
  const featured = visible[0];
  const rest = visible.slice(1, 3);

  homeGrid.innerHTML =
    buildCard(featured, 0, true) +
    rest.map((p, i) => buildCard(p, i)).join('');

  homeGrid.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), i * 80);
  });
}

/* ============================================================
   RENDER: WORK PAGE (all projects, first one featured)
   ============================================================ */
const workGrid = document.getElementById('projects-grid-all');
if (workGrid) {
  const featurable = PROJECTS.filter(p => !p.comingSoon);
  const featured = featurable[0];
  const rest = featurable.slice(1);

  workGrid.innerHTML =
    buildCard(featured, 0, true) +
    rest.map((p, i) => buildCard(p, i)).join('');

  workGrid.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), i * 80);
  });
}
