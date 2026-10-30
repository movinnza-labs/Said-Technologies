/* SAID Technologies — interactions for the "Fresh" home page.
   Runs after theme.js (menu, drawer, reveal, counters, word split, explorer, rails).
   Everything here is progressive: without it the page is complete and readable. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };

  /* ---------- Headings: start the word rise when the heading enters the screen ---------- */
  if ("IntersectionObserver" in window) {
    var headIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); headIo.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    each("[data-split]", function (h) { headIo.observe(h); });
  } else {
    each("[data-split]", function (h) { h.classList.add("is-in"); });
  }

  if (reduce) return;

  /* ---------- Magnetic buttons ---------- */
  if (finePointer) {
    each("[data-magnetic]", function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22, y = (e.clientY - r.top - r.height / 2) * 0.3;
        btn.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---------- Hero: mouse parallax on layered elements ---------- */
  var hero = document.querySelector(".fx-hero");
  var stage = document.querySelector("[data-parallax]");
  if (hero && stage && finePointer) {
    var layers = stage.querySelectorAll("[data-depth]");
    var raf = 0, mx = 0, my = 0;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        Array.prototype.forEach.call(layers, function (l) {
          var d = parseFloat(l.getAttribute("data-depth")) || 10;
          l.style.setProperty("--px", (-mx * d).toFixed(1) + "px");
          l.style.setProperty("--py", (-my * d).toFixed(1) + "px");
        });
      });
    });
    hero.addEventListener("pointerleave", function () {
      Array.prototype.forEach.call(layers, function (l) { l.style.setProperty("--px", "0px"); l.style.setProperty("--py", "0px"); });
    });
  }

  /* ---------- Hero: subtle particle network (pauses when off screen or tab hidden) ---------- */
  var canvas = document.querySelector(".fx-particles");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d"), pts = [], w = 0, h = 0, running = false, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var size = function () {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, w * h / 14000));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 });
    };
    var draw = function () {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 14000) {
            ctx.strokeStyle = "rgba(37,99,235," + (0.16 * (1 - d / 14000)).toFixed(3) + ")";
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = i % 4 === 0 ? "rgba(6,182,212,.55)" : "rgba(37,99,235,.4)";
        ctx.beginPath(); ctx.arc(p.x, p.y, i % 4 === 0 ? 2.2 : 1.6, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    size();
    window.addEventListener("resize", function () { size(); });
    var start = function () { if (!running) { running = true; requestAnimationFrame(draw); } };
    var stop = function () { running = false; };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting && !document.hidden ? start() : stop(); }).observe(canvas);
    } else { start(); }
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  }

  /* ---------- Scroll-linked: approach journey + careers parallax ---------- */
  var journey = document.querySelector("[data-journey] .fx-journey");
  var steps = journey ? journey.querySelectorAll(".fx-step") : [];
  var careerImg = document.querySelector(".fx-careers-img");
  var ticking = false;
  var onScroll = function () {
    ticking = false;
    var vh = window.innerHeight;
    if (journey) {
      var r = journey.getBoundingClientRect();
      var p = (vh * 0.75 - r.top) / (r.height + vh * 0.25);
      p = Math.max(0, Math.min(1, p));
      journey.style.setProperty("--p", p.toFixed(3));
      Array.prototype.forEach.call(steps, function (s, i) {
        s.classList.toggle("is-active", p >= (i / steps.length) + 0.02 || p === 1);
      });
    }
    if (careerImg) {
      var c = careerImg.parentNode.getBoundingClientRect();
      if (c.bottom > 0 && c.top < vh) {
        var t = (c.top + c.height / 2 - vh / 2) / vh;
        careerImg.style.setProperty("--py", (t * -40).toFixed(1) + "px");
      }
    }
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Education rail: drag to scroll with a mouse ---------- */
  if (finePointer) {
    each("[data-drag]", function (rail) {
      var down = false, moved = false, sx = 0, sl = 0;
      rail.addEventListener("pointerdown", function (e) {
        if (e.pointerType !== "mouse") return;
        down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft;
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - sx;
        if (Math.abs(dx) > 5) { moved = true; rail.classList.add("is-dragging"); }
        rail.scrollLeft = sl - dx;
      });
      window.addEventListener("pointerup", function () {
        if (!down) return;
        down = false;
        setTimeout(function () { rail.classList.remove("is-dragging"); }, 0);
      });
      rail.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    });
  }
})();
