// Данные иконок Phosphor ("ph"), используемых на сайте — лицензия MIT, https://iconify.design
// Источник: коллекция @iconify/json, json/ph.json (https://github.com/iconify/icon-sets).
//
// Регистрация локальная: за иконками НЕ выполняется запрос к api.iconify.design
// в рантайме — сайт больше не зависит от внешних серверов Iconify.
//
// ВАЖНО: в HTML этот файл подключается ДО js/vendor/iconify-icon.min.js —
// компонент читает window.IconifyPreload при своей инициализации.
//
// Новая иконка: найдите её в ph.json и добавьте строку в "icons" ниже.
(function () {
  "use strict";

  var phosphor = {
    "prefix": "ph",
    "width": 256,
    "height": 256,
    "icons": {
      "list-bold": {"body": "<path fill=\"currentColor\" d=\"M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24\"/>"},
      "envelope-simple": {"body": "<path fill=\"currentColor\" d=\"M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8m-20.57 16L128 133.15L52.57 64ZM216 192H40V74.19l82.59 75.71a8 8 0 0 0 10.82 0L216 74.19z\"/>"},
      "phone": {"body": "<path fill=\"currentColor\" d=\"m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.6.6 0 0 0 0 .12l21 47l-20.67 24.74a6 6 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8 8 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208\"/>"}
    }
  };

  // Основной путь: данные подхватываются при инициализации iconify-icon.
  window.IconifyPreload = window.IconifyPreload || [];
  window.IconifyPreload.push(phosphor);

  // Страховка: если компонент уже инициализирован (порядок скриптов изменили),
  // регистрируем коллекцию напрямую через статический метод класса.
  try {
    var Component = window.customElements && window.customElements.get("iconify-icon");
    if (Component && typeof Component.addCollection === "function") {
      Component.addCollection(phosphor);
    }
  } catch (e) {}
})();
