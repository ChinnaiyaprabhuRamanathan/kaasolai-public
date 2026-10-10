/* Theme toggle + mobile drawer navigation. */

(function () {
  "use strict";

  function setTheme(theme) {
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) { /* storage unavailable — theme still applies for this session */ }
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      var dark = theme === "dark";
      toggles[i].setAttribute("aria-pressed", dark ? "true" : "false");
      toggles[i].setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#000000" : "#FAF8F3");
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  var toggles = document.querySelectorAll("[data-theme-toggle]");
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  setTheme(currentTheme());

  var menuToggle = document.getElementById("menu-toggle");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");

  function openMenu() {
    if (sidebar) sidebar.classList.add("open");
    if (scrim) scrim.hidden = false;
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close the menu");
    }
  }

  function closeMenu() {
    if (sidebar) sidebar.classList.remove("open");
    if (scrim) scrim.hidden = true;
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open the menu");
      menuToggle.focus();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") === "true";
      if (open) closeMenu();
      else openMenu();
    });
  }

  if (scrim) {
    scrim.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  var links = sidebar ? sidebar.querySelectorAll("a") : [];
  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener("click", function () {
      if (window.matchMedia && window.matchMedia("(max-width: 899px)").matches) {
        closeMenu();
      }
    });
  }
})();