/* ЮК «Альтернатива» — меню на телефоне, счётчики статистики,
   таймлайн этапов и лёгкие появления секций. */

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Меню на телефоне ---------- */

const initMenu = () => {
  const btn = document.querySelector(".header__menu");
  const sheet = document.getElementById("menu-sheet");
  if (!btn || !sheet) return;
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    sheet.hidden = open;
  });
  sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    btn.setAttribute("aria-expanded", "false");
    sheet.hidden = true;
  }));
};

/* ---------- 2. Счётчики в блоке преимуществ ---------- */

const animateCount = (el) => {
  const target = parseInt(el.dataset.count ?? el.textContent, 10);
  if (!Number.isFinite(target) || target === 0) return;
  if (prefersReducedMotion()) {
    el.textContent = String(target);
    return;
  }
  const dur = 900; /* мс */
  let start = 0;
  el.textContent = "0";
  const tick = (now) => {
    if (!start) start = now;
    const k = Math.min((now - start) / dur, 1);
    const eased = 1 - (1 - k) ** 3; /* ease-out cubic, как grow-up на референсе */
    el.textContent = String(Math.round(eased * target));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const initCounters = () => {
  const nums = [...document.querySelectorAll(".adv__num[data-count]")];
  if (!nums.length) return;
  const done = new Set();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting || done.has(e.target)) continue;
      done.add(e.target);
      animateCount(e.target);
      io.unobserve(e.target);
    }
  }, { threshold: 0.35 });
  nums.forEach((n) => io.observe(n));
  /* страховка: числа никогда не остаются нулями */
  setTimeout(() => {
    for (const n of nums) {
      if (done.has(n)) continue;
      done.add(n);
      n.textContent = String(parseInt(n.dataset.count, 10) || n.textContent);
    }
  }, 4000);
};

/* ---------- 3. Таймлайн «Как мы работаем» ---------- */

const initTimeline = () => {
  const chips = [...document.querySelectorAll(".chip[data-stage]")];
  const stages = [...document.querySelectorAll(".stage[id]")];
  if (!chips.length || !stages.length) return;
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", String(active));
      });
      stages.forEach((s) => { s.hidden = s.id !== chip.dataset.stage; });
    });
  });
};

/* ---------- 4. Появления секций (лёгкие, с фолбэком) ---------- */

const REVEAL_SELECTORS = [
  ".hero__inner",
  ".advantages__grid",
  ".brandcards",
  ".services-extra",
  ".principles",
  ".path-panel",
  ".faq-sheet",
  ".find-panel",
  ".cta-panel",
];

const initReveal = () => {
  if (prefersReducedMotion()) return;
  REVEAL_SELECTORS.forEach((sel, i) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(i % 3) * 70}ms`);
    });
  });
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  /* страховка: содержимое никогда не остаётся скрытым */
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => el.classList.add("is-in"));
  }, 4000);
};

/* ---------- 5. Форма заявки: собирает письмо в почтовый клиент ---------- */

const initApply = () => {
  const form = document.getElementById("apply-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    const name = form.elements["name"].value.trim();
    const phone = form.elements["phone"].value.trim();
    const question = form.elements["question"].value.trim();
    const body = [
      name && `Имя: ${name}`,
      phone && `Телефон: ${phone}`,
      question && `Вопрос: ${question}`,
    ].filter(Boolean).join("\n");
    e.preventDefault();
    window.location.href =
      "mailto:info@altpriziv.ru?subject=" +
      encodeURIComponent("Заявка на консультацию с сайта") +
      "&body=" + encodeURIComponent(body);
  });
};

/* ---------- init ---------- */
initMenu();
initCounters();
initTimeline();
initReveal();
initApply();
