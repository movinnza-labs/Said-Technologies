/* Design 4 "Editorial" — small interactions on top of theme.js (menus, reveal, word split, wipes). */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* What We Do: the hovered / focused row drives the photo panel */
  each(document.querySelectorAll("[data-e-svc]"), function (box) {
    var rows = box.querySelectorAll(".e-svc-row");
    var photos = box.querySelectorAll(".e-svc-photos img");
    var captions = box.querySelectorAll(".e-svc-caption span");
    var show = function (n) {
      each(rows, function (r, k) { r.classList.toggle("is-on", k === n); });
      each(photos, function (p, k) { p.classList.toggle("is-on", k === n); });
      each(captions, function (c, k) { c.classList.toggle("is-on", k === n); });
    };
    each(rows, function (row, i) {
      row.addEventListener("mouseenter", function () { show(i); });
      row.addEventListener("focusin", function () { show(i); });
    });
  });

  /* Education: expanding panels */
  each(document.querySelectorAll("[data-e-acc]"), function (acc) {
    var items = acc.querySelectorAll(".e-acc-item");
    var show = function (n) { each(items, function (it, k) { it.classList.toggle("is-on", k === n); }); };
    each(items, function (it, i) {
      it.addEventListener("mouseenter", function () { show(i); });
      it.addEventListener("focusin", function () { show(i); });
    });
  });

  /* Hero index card: highlight one solution at a time */
  if (!reduceMotion) {
    each(document.querySelectorAll("[data-e-index]"), function (card) {
      var items = card.querySelectorAll("li");
      if (!items.length) return;
      var n = -1;
      setTimeout(function tick() {
        if (!document.hidden) {
          if (n >= 0) items[n].classList.remove("is-on");
          n = (n + 1) % items.length;
          items[n].classList.add("is-on");
        }
        setTimeout(tick, 1600);
      }, 1800);
    });
  }
})();
