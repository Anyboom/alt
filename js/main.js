/* ЮК «Альтернатива» — меню на телефоне, появления секций. */

/* ---------- 1. Меню на телефоне ---------- */

const initMenu = () => {
  const btn = document.querySelector('.header__menu');
  const sheet = document.getElementById('menu-sheet');
  if (!btn || !sheet) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    sheet.hidden = open;
  });
  sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false');
    sheet.hidden = true;
  }));
};

/* ---------- 3. Появления секций (лёгкие, с фолбэком) ---------- */

const REVEAL_SELECTORS = [
  '.hero__text',
  '.section-title',
  '.services-mosaic',
  '.path-panel',
  '.about-manifest',
  '.faq-sheet',
  '.find-panel',
];

const initReveal = () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (const sel of REVEAL_SELECTORS) {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add('reveal');
      el.style.setProperty('--d', `${(REVEAL_SELECTORS.indexOf(sel) % 3) * 70}ms`);
    });
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  // страховка: содержимое никогда не остаётся скрытым
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => el.classList.add('is-in'));
  }, 4000);
};

/* ---------- init ---------- */
initMenu();
initReveal();
