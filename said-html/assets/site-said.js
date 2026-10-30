/* SAID Technologies — scroll reveal for the inner pages.
   Touches only static content: React islands (header, forms) are skipped. */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("said-js");

  var sections = document.querySelectorAll("main > section:not(:first-child)");
  var targets = [];
  sections.forEach(function (section) {
    section.querySelectorAll(".eyebrow, .h-section, .lead, .card, figure, ol > li, ul.grid > li, .container-site > div > div[class*='rounded']")
      .forEach(function (el) {
        if (el.closest("[data-island]") || el.closest(".sr")) return;
        var i = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.setProperty("--sr-d", Math.min(i, 5) * 80 + "ms");
        el.classList.add("sr");
        targets.push(el);
      });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("sr-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });
})();
