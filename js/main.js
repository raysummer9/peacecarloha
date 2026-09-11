/* =========================================================
   Peace Solomon | Carloha Nigeria - interactions
   ========================================================= */
(function () {
  "use strict";

  var doc = document;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  var yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header + scroll progress + FAB ---------- */
  var header = doc.getElementById("siteHeader");
  var progress = doc.getElementById("scrollProgress");
  var fab = doc.querySelector(".fab");
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    var docH = doc.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("scrolled", y > 24);
    if (progress) progress.style.transform = "scaleX(" + (docH > 0 ? y / docH : 0) + ")";
    if (fab) fab.classList.toggle("show", y > 640);

    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = doc.getElementById("navToggle");
  var nav = doc.getElementById("mainNav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    doc.body.classList.remove("nav-open");
  }
  function openNav() {
    nav.classList.add("open");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    doc.body.classList.add("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? closeNav() : openNav();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = doc.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
        setTimeout(function () { el.classList.add("in"); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = doc.querySelectorAll(".stat-num");

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400;
    var start = null;

    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }

    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = doc.querySelectorAll("main section[id]");
  var navLinks = doc.querySelectorAll('.main-nav a[href^="#"]');

  if ("IntersectionObserver" in window && navLinks.length) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sio.observe(s); });
  }

  /* ---------- Hero slider ---------- */
  var slider = doc.getElementById("heroSlider");
  if (slider) {
    var slides = slider.querySelectorAll(".hero-slide");
    var dots = slider.querySelectorAll(".hero-dot");
    var current = 0;
    var AUTOPLAY_MS = 6000;
    var timer = null;

    function showSlide(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) {
        s.classList.toggle("is-active", idx === current);
      });
      dots.forEach(function (d, idx) {
        var active = idx === current;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function start() {
      if (prefersReduced || slides.length < 2) return;
      stop();
      timer = setInterval(function () { showSlide(current + 1); }, AUTOPLAY_MS);
    }

    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () {
        showSlide(idx);
        start();
      });
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    doc.addEventListener("visibilitychange", function () {
      if (doc.hidden) stop(); else start();
    });

    start();
  }

  /* ---------- Subtle parallax on hero background ---------- */
  var heroSlides = doc.querySelector(".hero-slides");
  if (heroSlides && !prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    var hero = doc.querySelector(".hero");
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      heroSlides.style.transform = "translate3d(" + x * -10 + "px," + y * -8 + "px,0) scale(1.03)";
    });
    hero.addEventListener("mouseleave", function () {
      heroSlides.style.transform = "";
    });
  }
})();
