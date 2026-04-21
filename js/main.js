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
   LIGHTBOX
   ============================================================ */
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <div class="lightbox-inner">
      <img class="lightbox-img" src="" alt="">
    </div>`;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lightbox-img');
  let scale = 1, startX = 0, startY = 0, tx = 0, ty = 0, dragging = false;

  function open(src, alt) {
    scale = 1; tx = 0; ty = 0;
    lbImg.style.transform = '';
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cs-image-block img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Pinch-to-zoom
  overlay.addEventListener('wheel', e => {
    e.preventDefault();
    scale = Math.min(Math.max(scale - e.deltaY * 0.001, 1), 5);
    lbImg.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;
  }, { passive: false });

  // Drag to pan when zoomed
  lbImg.addEventListener('mousedown', e => {
    if (scale <= 1) return;
    dragging = true; startX = e.clientX - tx; startY = e.clientY - ty;
    lbImg.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    tx = e.clientX - startX; ty = e.clientY - startY;
    lbImg.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    lbImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
  });
})();

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
