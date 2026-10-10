/* Sets the theme before the page renders to avoid a flash of the wrong theme.
   Runs in <head>, so it blocks paint by design. External file — no inline JS. */

(function () {
  "use strict";
  try {
    var saved = localStorage.getItem("theme");
    var theme = saved;
    if (theme !== "dark" && theme !== "light") {
      theme = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#000000" : "#FAF8F3");
    }
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();