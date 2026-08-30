// =========================================================
// THEME TOGGLE
// =========================================================
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀' : '◐';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme')
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// =========================================================
// TYPING EFFECT — hero query line
// =========================================================
const typeTarget = document.getElementById('typeTarget');
const queries = [
  "SELECT insight FROM raw_data;",
  "df.groupby('trend').mean()",
  "CREATE DASHBOARD sales_performance;"
];

let qIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = queries[qIndex];

  if (!deleting){
    charIndex++;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      qIndex = (qIndex + 1) % queries.length;
    }
  }
  setTimeout(typeLoop, deleting ? 30 : 55);
}
typeLoop();

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealTargets = document.querySelectorAll(
  '.section-heading, .about-content, .timeline-card, .skill-card, .project-card, .certificate-card, .contact-card, .stat-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// =========================================================
// BACK TO TOP
// =========================================================
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 500);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// =========================================================
// LIGHTBOX — full-size dashboard image viewer
// =========================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt){
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-lightbox]').forEach(btn => {
  btn.addEventListener('click', () => {
    openLightbox(btn.getAttribute('data-lightbox'), btn.getAttribute('data-lightbox-alt'));
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// =========================================================
// MOBILE MENU (simple toggle of nav visibility)
// =========================================================
const menuBtn = document.getElementById('menuBtn');
const navEl = document.querySelector('.navbar nav');
menuBtn.addEventListener('click', () => {
  const isOpen = navEl.style.display === 'flex';
  navEl.style.display = isOpen ? 'none' : 'flex';
  navEl.style.flexDirection = 'column';
  navEl.style.position = 'absolute';
  navEl.style.top = '68px';
  navEl.style.right = '3%';
  navEl.style.background = 'var(--paper-raised)';
  navEl.style.border = '1px solid var(--line)';
  navEl.style.borderRadius = '8px';
  navEl.style.padding = '18px';
  navEl.style.gap = '16px';
  navEl.style.boxShadow = 'var(--shadow)';
});