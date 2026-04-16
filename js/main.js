/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
);

window.__revealObserver = revealObserver;

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   CASE STUDY SIDEBAR: ACTIVE LINK ON SCROLL
   ============================================================ */
const csNavLinks = document.querySelectorAll('.cs-nav a');

if (csNavLinks.length) {
  const sections = Array.from(csNavLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) current = section;
    });

    csNavLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current.id}`
      );
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ============================================================
   SMOOTH ANCHOR SCROLL (fallback for older browsers)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
