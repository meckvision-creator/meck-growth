(function () {
  var doc = document.documentElement;
  doc.classList.add("js");
  var S = window.SITE || {};
  var isSet = function (v) { return v && v.charAt(0) !== "["; };

  // ---- Wire links from config.js ----
  document.querySelectorAll('[data-link="booking"]').forEach(function (a) {
    if (isSet(S.booking)) { a.href = S.booking; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = a.getAttribute("data-fallback") || "contact.html"; }
  });
  document.querySelectorAll('[data-link="email"]').forEach(function (a) {
    if (isSet(S.email)) {
      a.href = "mailto:" + S.email;
      if (a.hasAttribute("data-show")) a.textContent = S.email;
    } else {
      a.href = a.getAttribute("data-fallback") || "contact.html";
      if (a.hasAttribute("data-show")) a.textContent = "Email coming soon";
    }
  });
  document.querySelectorAll('[data-link="linkedin"]').forEach(function (a) {
    if (isSet(S.linkedin)) {
      a.href = S.linkedin; a.target = "_blank"; a.rel = "noopener";
      if (a.hasAttribute("data-show")) a.textContent = S.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    } else {
      a.href = a.getAttribute("data-fallback") || "contact.html";
      if (a.hasAttribute("data-show")) a.textContent = "LinkedIn coming soon";
    }
  });

  // ---- Nav ----
  var nav = document.querySelector(".nav");
  var btn = document.querySelector(".menu-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    });
  }
  var onScroll = function () { nav && nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Count-up ----
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (reduce || isNaN(target)) return;
    var dur = 1100, start = null;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
    }
    el.textContent = "0";
    requestAnimationFrame(tick);
  }

  // ---- Reveal on scroll ----
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        e.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) {
      var d = el.getAttribute("data-delay");
      if (d) el.style.transitionDelay = d + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Contact form → mailto ----
  var form = document.getElementById("brief");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var f = new FormData(form);
      var leaks = f.getAll("leak").join(", ") || "Not sure yet";
      var body =
        "Name: " + (f.get("name") || "") + "\n" +
        "Business: " + (f.get("business") || "") + "\n" +
        "Website: " + (f.get("site") || "") + "\n" +
        "Where it leaks: " + leaks + "\n\n" +
        (f.get("message") || "");
      var subject = "Growth ops inquiry: " + (f.get("business") || f.get("name") || "new project");
      var note = document.getElementById("form-note");
      if (!isSet(S.email)) {
        if (note) note.textContent = "Email isn't connected yet. Please use the booking link or LinkedIn for now.";
        return;
      }
      window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      if (note) note.textContent = "Opening your email app with the brief filled in…";
    });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
