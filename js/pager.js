/* Пагинатор списков: нумерованные страницы ‹ 1 2 3 ›.
   Общий для services.html (листает отфильтрованный набор услуг) и blog.html.
   Управляет hidden всех строк: вне текущего фильтра — всегда скрыты,
   внутри — видны только строки активной страницы.
   Если всё влезает на одну страницу, навигация не показывается. */

const createPager = (nav, perPage, allRows) => {
  if (!nav) return { setRows() {} };

  const rows = [...allRows];
  let visible = [];
  let page = 1;
  let pages = 1;
  let focusAfterRender = false; /* фокус возвращаем только после клика по страницам */

  const setPage = (p) => {
    page = Math.min(Math.max(1, p), pages);
    render();
  };

  const addBtn = (label, target, opts = {}) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pager__btn";
    if (opts.active) { b.classList.add("is-active"); b.setAttribute("aria-current", "page"); }
    if (opts.label) b.setAttribute("aria-label", opts.label);
    b.disabled = opts.disabled === true;
    b.textContent = label;
    b.addEventListener("click", () => { focusAfterRender = true; setPage(target); });
    nav.append(b);
  };

  const renderNav = () => {
    nav.hidden = pages <= 1;
    nav.replaceChildren();
    if (pages <= 1) return;

    addBtn("‹", page - 1, { label: "Предыдущая страница", disabled: page === 1 });
    for (let p = 1; p <= pages; p++) addBtn(String(p), p, { active: p === page });
    addBtn("›", page + 1, { label: "Следующая страница", disabled: page === pages });

    if (focusAfterRender) {
      focusAfterRender = false;
      nav.querySelector('[aria-current="page"]')?.focus();
    }
  };

  const render = () => {
    pages = Math.max(1, Math.ceil(visible.length / perPage));
    if (page > pages) page = pages;
    const from = (page - 1) * perPage;
    const to = page * perPage;
    const last = visible.slice(from, to).at(-1);
    rows.forEach((row) => {
      const i = visible.indexOf(row);
      row.hidden = i === -1 || i < from || i >= to;
      /* последняя видимая строка без разделителя — CSS не может выбрать её сам */
      row.classList.toggle("is-last", row === last);
    });
    renderNav();
  };

  /* новый видимый набор (например, после смены фильтра) — страница сбрасывается на первую */
  return { setRows(next) { visible = [...next]; page = 1; render(); } };
};
