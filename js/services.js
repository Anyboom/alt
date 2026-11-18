/* Каталог услуг: фильтры по категориям слева, список справа. */

const initCatalog = () => {
  const buttons = [...document.querySelectorAll(".filter-btn[data-filter]")];
  const rows = [...document.querySelectorAll(".service-row[data-cat]")];
  const empty = document.querySelector(".catalog-empty");
  if (!buttons.length || !rows.length) return;

  /* счётчики категорий считаем из разметки — числа всегда согласованы со списком */
  buttons.forEach((btn) => {
    const f = btn.dataset.filter;
    const n = f === "all"
      ? rows.length
      : rows.filter((r) => r.dataset.cat.split(" ").includes(f)).length;
    const c = btn.querySelector(".count");
    if (c) c.textContent = String(n);
  });

  const apply = (f) => {
    let shown = 0;
    rows.forEach((r) => {
      const ok = f === "all" || r.dataset.cat.split(" ").includes(f);
      r.hidden = !ok;
      if (ok) shown += 1;
    });
    buttons.forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.filter === f));
    });
    if (empty) empty.hidden = shown !== 0;
  };

  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter)));
};

initCatalog();
