/* Список статей: разбивается страницами, когда записей становится больше шести. */

const initBlogPager = () => {
  const rows = document.querySelectorAll(".post-row");
  const nav = document.querySelector("[data-pager]");
  if (!rows.length || !nav) return;
  createPager(nav, 6, rows).setRows(rows);
};

initBlogPager();
