/* Design 5 "Immersive" — hero network canvas, depth parallax, pointer glow, service rail,
   education explorer, scroll-filled timeline. Runs after theme.js (menus, reveal, word split). */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* ---------- Hero: connected network of moving points ---------- */
  each(document.querySelectorAll("[data-x-net]"), function (canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var hero = canvas.closest("section") || canvas.parentNode;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, pts = [], mouse = { x: -9999, y: -9999 }, visible = true, raf = 0;
    var LINK = 150;

    var resize = function () {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(110, Math.round((w * h) / 15000));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6, c: Math.random() < 0.7 ? "127,176,255" : "34,211,238"
        });
      }
    };

    var draw = function () {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
          // gentle pull towards the pointer
          var mdx = mouse.x - p.x, mdy = mouse.y - p.y, md = mdx * mdx + mdy * mdy;
          if (md < 40000) { p.x += mdx * 0.002; p.y += mdy * 0.002; }
        }
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < LINK * LINK) {
            ctx.strokeStyle = "rgba(127,176,255," + (0.22 * (1 - Math.sqrt(d) / LINK)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        var pd = Math.sqrt((mouse.x - p.x) * (mouse.x - p.x) + (mouse.y - p.y) * (mouse.y - p.y));
        if (pd < 200) {
          ctx.strokeStyle = "rgba(34,211,238," + (0.45 * (1 - pd / 200)).toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = "rgba(" + p.c + ",0.9)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    var loop = function () {
      raf = 0;
      if (!visible || document.hidden) return;
      draw();
      raf = requestAnimationFrame(loop);
    };
    var start = function () { if (!raf && !reduceMotion) raf = requestAnimationFrame(loop); };

    resize();
    draw();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { resize(); draw(); }, 150); });
    hero.addEventListener("pointermove", function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });
    start();
  });

  /* ---------- Depth parallax: children move by --px/--py times their --z ---------- */
  if (finePointer && !reduceMotion) {
    var groups = document.querySelectorAll("[data-x-parallax]");
    var tx = 0, ty = 0, cx = 0, cy = 0, ticking = false;
    var step = function () {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      each(groups, function (g) { g.style.setProperty("--px", cx.toFixed(2)); g.style.setProperty("--py", cy.toFixed(2)); });
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) requestAnimationFrame(step); else ticking = false;
    };
    window.addEventListener("pointermove", function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * -24;
      ty = (e.clientY / window.innerHeight - 0.5) * -24;
      if (!ticking) { ticking = true; requestAnimationFrame(step); }
    }, { passive: true });
  }

  /* ---------- Pointer glow on cards ---------- */
  if (finePointer) {
    each(document.querySelectorAll("[data-x-glow]"), function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- Services rail: arrows + progress ---------- */
  each(document.querySelectorAll("[data-x-rail]"), function (wrap) {
    var rail = wrap.querySelector(".x-rail");
    var section = wrap.closest("section");
    var prev = section.querySelector("[data-x-prev]"), next = section.querySelector("[data-x-next]");
    var bar = wrap.querySelector(".x-rail-bar");
    var stepSize = function () { var c = rail.firstElementChild; return c ? c.getBoundingClientRect().width + 20 : 320; };
    var sync = function () {
      var max = rail.scrollWidth - rail.clientWidth;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max - 2;
      if (bar) bar.style.setProperty("--p", Math.max(0.12, Math.min(1, (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth)).toFixed(3));
    };
    if (prev) prev.addEventListener("click", function () { rail.scrollBy({ left: -stepSize(), behavior: reduceMotion ? "auto" : "smooth" }); });
    if (next) next.addEventListener("click", function () { rail.scrollBy({ left: stepSize(), behavior: reduceMotion ? "auto" : "smooth" }); });
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  });

  /* ---------- Education explorer ---------- */
  each(document.querySelectorAll("[data-x-explorer]"), function (ex) {
    var items = ex.querySelectorAll(".x-ex-item"), imgs = ex.querySelectorAll(".x-stage img");
    var count = ex.querySelector(".x-stage-count b");
    var show = function (i) {
      each(items, function (it, k) { it.classList.toggle("is-on", k === i); });
      each(imgs, function (im, k) { im.classList.toggle("is-on", k === i); });
      if (count) count.textContent = ("0" + (i + 1)).slice(-2);
    };
    each(items, function (it, i) {
      it.addEventListener("mouseenter", function () { show(i); });
      it.addEventListener("focus", function () { show(i); });
    });
  });

  /* ---------- Scroll-linked: timeline fill + careers photo drift ---------- */
  var timelines = document.querySelectorAll("[data-x-timeline]");
  var drifts = document.querySelectorAll("[data-x-drift]");
  if (timelines.length || drifts.length) {
    var queued = false;
    var update = function () {
      queued = false;
      var vh = window.innerHeight;
      each(timelines, function (tl) {
        var r = tl.getBoundingClientRect();
        var p = (vh * 0.65 - r.top) / r.height;
        tl.style.setProperty("--tl", Math.max(0, Math.min(1, p)).toFixed(3));
      });
      if (!reduceMotion) each(drifts, function (d) {
        var r = d.parentNode.getBoundingClientRect();
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        d.style.setProperty("--drift", (p * -60).toFixed(1) + "px");
      });
    };
    window.addEventListener("scroll", function () { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
