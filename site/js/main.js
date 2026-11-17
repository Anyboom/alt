/* ЮК «Альтернатива» — проверка категории годности, меню, появления. */

/* ---------- 1. Проверка категории годности (живая вещь) ---------- */

const CATEGORIES = {
  A: 'Годен: призывают без ограничений.',
  B: 'Годен с незначительными ограничениями: призывают, но не во все войска.',
  V: 'Ограниченно годен: от призыва освобождают, зачисляют в запас и выдают военный билет.',
  G: 'Временно не годен: отсрочка на 6–12 месяцев.',
  D: 'Не годен: со снятием с воинского учёта.',
};

const DIAGNOSES = [
  { name: 'Бронхиальная астма', article: 'Ст. 52 Расписания болезней', cat: 'V' },
  { name: 'Близорукость свыше 6,0 дптр', article: 'Ст. 35 Расписания болезней', cat: 'V' },
  { name: 'Близорукость до 3,0 дптр', article: 'Ст. 35 Расписания болезней', cat: 'B' },
  { name: 'Плоскостопие III степени', article: 'Ст. 68 Расписания болезней', cat: 'V' },
  { name: 'Сахарный диабет', article: 'Ст. 13 Расписания болезней', cat: 'D' },
];

const CAT_LETTER = { A: 'А', B: 'Б', V: 'В', G: 'Г', D: 'Д' };

const renderCategory = (i) => {
  const d = DIAGNOSES[i];
  const letter = document.getElementById('checker-letter');
  const article = document.getElementById('checker-article');
  const meaning = document.getElementById('checker-meaning');
  const stamp = document.getElementById('checker-stamp');
  if (!letter || !article || !meaning) return;
  letter.textContent = CAT_LETTER[d.cat];
  article.textContent = `${d.article} · ${d.name}`;
  meaning.textContent = CATEGORIES[d.cat];
  if (stamp && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stamp.animate(
      [{ transform: 'rotate(-6deg) scale(0.94)', opacity: 0.55 }, { transform: 'rotate(-6deg) scale(1)', opacity: 1 }],
      { duration: 240, easing: 'ease-out' },
    );
  }
};

const initChecker = () => {
  const select = document.getElementById('checker-select');
  if (!select) return;
  const apply = () => renderCategory(Number(select.value));
  select.addEventListener('change', apply);
  apply();
};

/* ---------- 2. Меню на телефоне ---------- */

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
  '.hero__text', '.hero__media',
  '.services .section-title', '.service',
  '.path .section-title', '.section-lead', '.step',
  '.checker__text', '.checker__panel',
  '.about__text', '.about__media',
  '.faq .section-title', '.faq__item',
  '.contact__text', '.contact__info',
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
initChecker();
initMenu();
initReveal();
