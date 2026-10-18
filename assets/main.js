/* CAM Capital: light motion. Everything works without this file. */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Hero headline: stagger lines in once fonts are ready
  var lines = document.querySelectorAll(".reveal-line");
  lines.forEach(function (el, i) { el.style.setProperty("--d", (0.1 + i * 0.12) + "s"); });
  function loaded() { document.body.classList.add("is-loaded"); }
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 600); })]).then(loaded);
  } else {
    loaded();
  }

  // Scroll reveals, staggered within each group
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var groups = new Map();
    reveals.forEach(function (el) {
      var parent = el.parentElement;
      var idx = groups.get(parent) || 0;
      el.style.setProperty("--d", Math.min(idx * 0.08, 0.4) + "s");
      groups.set(parent, idx + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Header: solid background after scrolling, hide on scroll down, show on scroll up
  var header = document.querySelector("[data-header]");
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 24);
    if (!reduceMotion) header.classList.toggle("is-hidden", y > lastY && y > 400);
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });
  onScroll();
})();
