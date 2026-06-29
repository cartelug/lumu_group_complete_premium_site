/* Lumu Autodealers — vanilla behaviours (no framework, no build) */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var WA = "https://wa.me/256782017381?text=";

  // year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- inject services ---------- */
  var services = [
    ["wrench", "Repairs & Servicing", "Mechanical repairs and scheduled servicing for all makes."],
    ["diagnostics", "Computerized Diagnostics", "Accurate computer fault-finding with modern scan tools."],
    ["gear", "Engine Tuning & Fuel Injection", "Tuning and fuel-injection service for smoother power and economy."],
    ["gauge", "Brakes, Oil, Tyres, Battery & AC", "Everyday maintenance to keep you safe on the road."],
    ["parts", "Genuine Spare Parts", "Quality and genuine spare parts for major brands."],
    ["truck", "Fleet & Logistics Solutions", "Service plans and logistics for company and fleet vehicles."]
  ];
  var grid = document.getElementById("services-grid");
  if (grid) {
    grid.innerHTML = services.map(function (s) {
      var wa = WA + encodeURIComponent("Hello Lumu Autodealers, I'd like to ask about: " + s[1] + ".");
      return '<article class="card card-pad service-card reveal">' +
        '<span class="icon-pill"><svg class="ic"><use href="#ic-' + s[0] + '"/></svg></span>' +
        '<h3 class="mt-24">' + s[1] + "</h3>" +
        '<p class="subtle">' + s[2] + "</p>" +
        '<a class="lcard-cta" href="' + wa + '" target="_blank" rel="noopener">Enquire on WhatsApp →</a>' +
        "</article>";
    }).join("");
  }

  /* ---------- inject FAQ ---------- */
  var faqs = [
    ["Will you give me a fair price?", "Yes. We diagnose first and give you a clear quote before any work starts — you approve before we begin, so there are no surprises."],
    ["Do you use genuine parts?", "We use quality and genuine spare parts, matched to your vehicle's brand — Toyota, Nissan, Hino, Isuzu, Mitsubishi and more."],
    ["Can I talk to someone quickly?", "Yes — WhatsApp is the fastest way to reach us. Send your vehicle details and problem and we'll respond with next steps."],
    ["Do you service company and fleet vehicles?", "Absolutely. We handle company cars, school vans, NGO and delivery fleets with scheduled servicing and priority turnaround."]
  ];
  var faqList = document.getElementById("faq-list");
  if (faqList) {
    faqList.innerHTML = faqs.map(function (f) {
      return '<div class="faq"><button type="button">' + f[0] + '</button><div class="faq-content">' + f[1] + "</div></div>";
    }).join("");
  }

  /* ---------- preloader ---------- */
  function hidePre() {
    var p = document.querySelector(".preloader");
    if (!p || p.dataset.gone) return;
    p.dataset.gone = "1";
    p.style.transition = "opacity .5s ease";
    p.style.opacity = "0";
    setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 520);
  }
  window.addEventListener("load", function () { setTimeout(hidePre, reduce ? 0 : 700); });
  setTimeout(hidePre, 3000); // safety net

  /* ---------- header scrolled + scroll progress + back-to-top ---------- */
  var header = document.querySelector(".header");
  var prog = document.getElementById("scroll-progress");
  var toTop = document.getElementById("to-top");
  function onScroll() {
    var sc = window.scrollY || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle("scrolled", sc > 8);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (h > 0 ? sc / h : 0) + ")";
    }
    if (toTop) toTop.classList.toggle("show", sc > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector(".menu-toggle");
  var navlinks = document.querySelector(".nav-links");
  if (burger && navlinks) {
    burger.addEventListener("click", function () {
      var open = navlinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navlinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navlinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- reveal on scroll + count-up ---------- */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  var counters = [].slice.call(document.querySelectorAll("[data-count]"));
  function runCount(el) {
    var target = parseFloat(el.dataset.count || "0"), suffix = el.dataset.suffix || "", start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / 1400, 1), e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * e) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    counters.forEach(function (el) { el.textContent = (el.dataset.count || "") + (el.dataset.suffix || ""); });
  } else {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- FAQ accordion (delegated) ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".faq button") : null;
    if (btn) btn.parentElement.classList.toggle("open");
  });

  /* ---------- magnetic CTAs (desktop pointers) ---------- */
  if (!reduce && window.matchMedia("(hover:hover) and (pointer:fine) and (min-width:861px)").matches) {
    [].slice.call(document.querySelectorAll("[data-magnetic]")).forEach(function (el) {
      el.addEventListener("pointermove", function (ev) {
        var r = el.getBoundingClientRect();
        var x = (ev.clientX - (r.left + r.width / 2)) * 0.32;
        var y = (ev.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- WhatsApp request forms ---------- */
  [].slice.call(document.querySelectorAll("[data-wa-form]")).forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = [];
      new FormData(form).forEach(function (v, k) { if (String(v).trim()) lines.push(k + ": " + v); });
      var title = form.getAttribute("data-wa-form") || "Lumu — Request";
      window.open(WA + encodeURIComponent(title + "\n" + lines.join("\n")), "_blank", "noopener");
    });
  });

  /* ---------- Aisha — pointing guide ---------- */
  (function () {
    var arm = document.getElementById("guide-arm");
    if (!arm) return;
    if (reduce) { arm.style.transform = "rotate(0deg)"; return; }
    var cur = 0, active = null;
    function targets() { return [].slice.call(document.querySelectorAll("#main h1, #main h2")); }
    function pick() {
      var fy = window.innerHeight * 0.4, best = null, bd = Infinity;
      targets().forEach(function (t) {
        var r = t.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var d = Math.abs(r.top + r.height / 2 - fy);
        if (d < bd) { bd = d; best = t; }
      });
      return best;
    }
    (function loop() {
      var t = pick();
      if (t && t !== active) { if (active) active.classList.remove("guide-look"); active = t; t.classList.add("guide-look"); }
      var goal = 0;
      if (t) {
        var r = t.getBoundingClientRect();
        var ratio = Math.max(0, Math.min(1, (r.top + r.height / 2) / window.innerHeight));
        goal = -52 + ratio * 78;
      }
      cur += (goal - cur) * 0.1;
      arm.style.transform = "rotate(" + cur.toFixed(2) + "deg)";
      requestAnimationFrame(loop);
    })();
  })();
})();
