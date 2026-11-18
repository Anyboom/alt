/* Каталог услуг: фильтры по категориям слева, список справа.
   Отфильтрованный набор листается пагинатором (js/pager.js). */

const initCatalog = () => {
  const buttons = [...document.querySelectorAll(".filter-btn[data-filter]")];
  const rows = [...document.querySelectorAll(".service-row[data-cat]")];
  const empty = document.querySelector(".catalog-empty");
  if (!buttons.length || !rows.length) return;

  const pager = createPager(document.querySelector("[data-pager]"), 10, rows);

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
    const visible = rows.filter((r) => f === "all" || r.dataset.cat.split(" ").includes(f));
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
    if (empty) empty.hidden = visible.length !== 0;
    pager.setRows(visible);
  };

  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter)));

  /* первый рендер: весь каталог → страницы по 10 услуг */
  apply("all");
};

initCatalog();
