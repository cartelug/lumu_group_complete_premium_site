/* ============================================================
   LUMU · v2 STUDIO — motion + behaviours
   ------------------------------------------------------------
   Loads AFTER studio-chrome.js. Owns:
     · hero split-word reveal (M-1)
     · stat odometer (M-2)
     · sticky section titles (M-3, desktop only)
     · card lift-and-track + tilt fix (M-4)
     · divider draw-on-enter (M-5) — inserts SVGs into any
       <div class="divider d-*"> host on the page
     · cursor mark (M-6, fine-pointer, opt-out via prefers-reduced-motion)
     · scroll progress + to-top + FAQ accordion + WhatsApp forms
       (kept from v1 with restyled markup)
   ============================================================ */
(function () {
  "use strict";
  var reduce      = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var WA          = "https://wa.me/256782017381?text=";

  /* ================================================================ */
  /* DIVIDER SVGs — six named marks, injected into their host divs    */
  /* ================================================================ */
  var DIVIDER_SVG = {
    torque:
      '<svg class="div-svg" viewBox="0 0 720 140" fill="none" aria-hidden="true">' +
        '<path class="draw" style="--len:640" d="M40 110 Q 360 110 680 30" stroke="#1a1613" stroke-width="1.4" stroke-linecap="round"/>' +
        '<path class="draw d2" style="--len:130" d="M680 30 L 675 20 M680 30 L 690 25" stroke="#e07a1c" stroke-width="1.6" stroke-linecap="round"/>' +
        '<line class="draw d3" style="--len:200" x1="360" y1="130" x2="360" y2="40" stroke="#e07a1c" stroke-width="1.6" stroke-linecap="round"/>' +
        '<circle class="fade" cx="360" cy="40" r="4" fill="#e07a1c"/>' +
        '<circle class="fade" cx="360" cy="130" r="3" fill="none" stroke="#1a1613" stroke-width="1.4"/>' +
        '<text class="fade" x="360" y="125" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1.6" fill="#5c554a">TORQUE 68 Nm</text>' +
      '</svg>' +
      '<span class="div-label"><em style="font-style:normal">01</em> · Torque arc · to workmanship</span>',
    rule:
      '<svg class="div-svg" viewBox="0 0 900 68" fill="none" aria-hidden="true">' +
        '<line class="draw" style="--len:840" x1="30" y1="30" x2="870" y2="30" stroke="#1a1613" stroke-width="1.2" stroke-linecap="round"/>' +
        (function () {
          var ticks = "";
          for (var i = 0; i <= 20; i++) {
            var x = 30 + (i * 42);
            var major = i % 5 === 0;
            var h = major ? 14 : (i % 1 === 0 ? 7 : 4);
            var stroke = major ? "#1a1613" : "#a49a8a";
            ticks += '<line class="fade" x1="' + x + '" y1="30" x2="' + x + '" y2="' + (30 + h) + '" stroke="' + stroke + '" stroke-width="1.1"/>';
            if (major) {
              ticks += '<text class="fade" x="' + x + '" y="60" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="#5c554a">' + i + '</text>';
            }
          }
          return ticks;
        })() +
        '<text class="fade" x="870" y="20" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1.4" fill="#5c554a">CM · TO SCALE</text>' +
      '</svg>' +
      '<span class="div-label"><em style="font-style:normal">02</em> · Measurement rule · to standard</span>',
    spark:
      '<svg class="div-svg" viewBox="0 0 1080 44" fill="none" aria-hidden="true">' +
        '<line class="draw" style="--len:1000" x1="40" y1="22" x2="1040" y2="22" stroke="#1a1613" stroke-width="1" stroke-linecap="round" opacity="0.35"/>' +
        '<line class="draw d2" style="--len:1000" x1="40" y1="22" x2="1040" y2="22" stroke="#e07a1c" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="1,4"/>' +
        '<circle class="fade" cx="40" cy="22" r="2" fill="#1a1613"/>' +
        '<circle class="fade" cx="1040" cy="22" r="4" fill="none" stroke="#e07a1c" stroke-width="1.5"/>' +
        '<circle class="fade" cx="1040" cy="22" r="1.5" fill="#e07a1c"/>' +
      '</svg>' +
      '<span class="div-label"><em style="font-style:normal">03</em> · Spark · contact point</span>',
    fold:
      '<svg class="div-svg" viewBox="0 0 780 92" fill="none" aria-hidden="true">' +
        '<line class="draw" style="--len:340" x1="30" y1="52" x2="360" y2="52" stroke="#1a1613" stroke-width="1.2" stroke-linecap="round"/>' +
        '<line class="draw" style="--len:340" x1="420" y1="52" x2="750" y2="52" stroke="#1a1613" stroke-width="1.2" stroke-linecap="round"/>' +
        '<path class="draw d2" style="--len:120" d="M360 52 L 390 22 L 420 52" stroke="#e07a1c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path class="draw d3" style="--len:60" d="M375 40 L 405 40" stroke="#a49a8a" stroke-width="0.8" stroke-dasharray="2,3"/>' +
        '<text class="fade" x="390" y="82" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1.4" fill="#5c554a">FOLD · TURN THE PAGE</text>' +
      '</svg>' +
      '<span class="div-label"><em style="font-style:normal">04</em> · Paper fold · turn the page</span>',
    survey:
      '<svg class="div-svg" viewBox="0 0 460 220" fill="none" aria-hidden="true">' +
        '<line class="draw" style="--len:340" x1="70" y1="60" x2="390" y2="60" stroke="#1a1613" stroke-width="1" stroke-linecap="round" stroke-dasharray="4,5"/>' +
        '<line class="draw d2" style="--len:340" x1="70" y1="180" x2="390" y2="180" stroke="#1a1613" stroke-width="1" stroke-linecap="round" stroke-dasharray="4,5"/>' +
        '<line class="draw" style="--len:120" x1="70" y1="60" x2="70" y2="180" stroke="#1a1613" stroke-width="1" stroke-linecap="round" stroke-dasharray="4,5"/>' +
        '<line class="draw d2" style="--len:120" x1="390" y1="60" x2="390" y2="180" stroke="#1a1613" stroke-width="1" stroke-linecap="round" stroke-dasharray="4,5"/>' +
        '<g class="drop"><circle cx="70" cy="60" r="6" fill="#1a1613"/><circle cx="70" cy="60" r="2" fill="#fbfaf5"/></g>' +
        '<g class="drop dr2"><circle cx="390" cy="60" r="6" fill="#1a1613"/><circle cx="390" cy="60" r="2" fill="#fbfaf5"/></g>' +
        '<g class="drop dr3"><circle cx="70" cy="180" r="6" fill="#1a1613"/><circle cx="70" cy="180" r="2" fill="#fbfaf5"/></g>' +
        '<g class="drop dr4"><circle cx="390" cy="180" r="6" fill="#1a1613"/><circle cx="390" cy="180" r="2" fill="#fbfaf5"/></g>' +
        '<g class="drop dr5">' +
          '<path d="M230 100 C 220 100, 214 108, 214 120 C 214 134, 230 148, 230 148 C 230 148, 246 134, 246 120 C 246 108, 240 100, 230 100 Z" fill="#e07a1c"/>' +
          '<circle cx="230" cy="120" r="5" fill="#fbfaf5"/>' +
        '</g>' +
        '<text class="fade" x="230" y="205" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1.8" fill="#5c554a">PLOT · TITLED · VERIFIED</text>' +
      '</svg>' +
      '<span class="div-label"><em style="font-style:normal">05</em> · Boundary survey · verified ground</span>',
    ignition:
      '<svg class="div-svg" viewBox="0 0 1080 44" fill="none" aria-hidden="true">' +
        '<line class="draw" style="--len:960" x1="40" y1="22" x2="1000" y2="22" stroke="#1a1613" stroke-width="1.2" stroke-linecap="round"/>' +
        '<line class="draw d2" style="--len:200" x1="40" y1="22" x2="240" y2="22" stroke="#e07a1c" stroke-width="1.6" stroke-linecap="round"/>' +
        '<g class="drop dr2"><line x1="1010" y1="10" x2="1010" y2="34" stroke="#e07a1c" stroke-width="1.8" stroke-linecap="round"/></g>' +
        '<g class="drop dr3"><line x1="1025" y1="6" x2="1025" y2="38" stroke="#e07a1c" stroke-width="1.8" stroke-linecap="round"/></g>' +
        '<g class="drop dr4"><line x1="1040" y1="10" x2="1040" y2="34" stroke="#e07a1c" stroke-width="1.8" stroke-linecap="round"/></g>' +
      '</svg>' +
      '<span class="div-label"><em style="font-style:normal">06</em> · Ignition · now you go</span>'
  };

  // inject each divider host with its symbol content
  document.querySelectorAll(".divider").forEach(function (host) {
    var key = ["torque","rule","spark","fold","survey","ignition"].find(function (k) {
      return host.classList.contains("d-" + k);
    });
    if (key && DIVIDER_SVG[key]) {
      host.innerHTML = DIVIDER_SVG[key];
    }
  });

  /* ================================================================ */
  /* M-1 · HERO SPLIT-WORD REVEAL                                     */
  /* Called by wrapping each word in <span class="h-word">.           */
  /* If author didn't do that, we auto-wrap the H1 words on the hero. */
  /* ================================================================ */
  document.querySelectorAll(".hero h1").forEach(function (h1) {
    // if already wrapped, skip
    if (h1.querySelector(".h-word")) return;
    // wrap each line inside <span class="h-line">
    var lines = h1.querySelectorAll(".h-line");
    if (!lines.length) {
      // wrap the whole text as one line
      var text = h1.innerHTML;
      h1.innerHTML = '<span class="h-line">' + text + "</span>";
      lines = h1.querySelectorAll(".h-line");
    }
    lines.forEach(function (line) {
      // don't wrap-words when it already contains an <span>
      if (line.querySelector("span")) return;
      var words = line.textContent.split(/(\s+)/);
      line.innerHTML = words.map(function (w) {
        if (!w.trim()) return w;
        return '<span class="h-word">' + w + "</span>";
      }).join("");
    });
    // stagger the words
    h1.querySelectorAll(".h-word").forEach(function (w, i) {
      w.style.setProperty("--d", (i * 0.06).toFixed(2) + "s");
    });
  });

  /* ================================================================ */
  /* M-2 · STAT ODOMETER (each stat's number ticks up)                */
  /* [data-count] + [data-count-since] supported (same as v1)         */
  /* ================================================================ */
  document.querySelectorAll("[data-count-since]").forEach(function (el) {
    var yrs = new Date().getFullYear() - parseInt(el.dataset.countSince, 10);
    el.dataset.count = String(yrs > 0 ? yrs : 0);
  });
  function runCount(el) {
    var target = parseFloat(el.dataset.count || "0");
    var suffix = el.dataset.suffix || "";
    var start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / 1500, 1);
      var e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * e);
      if (suffix) {
        el.innerHTML = Math.round(target * e) + '<span class="stat-suffix">' + suffix + '</span>';
      }
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ================================================================ */
  /* M-3 · STICKY SECTION TITLES                                      */
  /* (h2 with class="sticky-heading" sticks until next hits viewport) */
  /* Only desktop >= 940px. Pure CSS via position:sticky.             */
  /* Provided by studio.css. Nothing to wire here.                    */
  /* ================================================================ */

  /* ================================================================ */
  /* M-4 · CARD LIFT-AND-TRACK + TILT (fixed from v1)                 */
  /* .tilt cards get 3D on hover (fine pointer only)                  */
  /* ================================================================ */
  if (!reduce && finePointer) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (ev) {
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (px * 5).toFixed(2) + "deg");
        card.style.setProperty("--rx", (py * -5).toFixed(2) + "deg");
        card.style.transform =
          "translateY(-6px) rotateX(var(--rx,0)) rotateY(var(--ry,0))";
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.transform = "";
      });
    });
  }

  /* ================================================================ */
  /* M-5 · DIVIDER DRAW ON ENTER + REVEALS + RAILS + COUNTERS         */
  /* All IntersectionObserver-driven                                  */
  /* ================================================================ */
  var reveals  = document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-scale");
  var counters = document.querySelectorAll("[data-count]");
  var rails    = document.querySelectorAll(".rail");
  var dividers = document.querySelectorAll(".divider");
  var hero     = document.querySelector(".hero");

  // stagger children automatically for [data-stagger] parents
  document.querySelectorAll("[data-stagger]").forEach(function (parent) {
    Array.prototype.forEach.call(parent.children, function (kid, i) {
      kid.style.setProperty("--d", (i * 0.08).toFixed(2) + "s");
    });
  });

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    rails.forEach(function (el) { el.classList.add("in"); });
    dividers.forEach(function (el) { el.classList.add("in"); });
    counters.forEach(function (el) {
      el.textContent = (el.dataset.count || "") + (el.dataset.suffix || "");
    });
    if (hero) hero.classList.add("on");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    rails.forEach(function (el) { io.observe(el); });
    dividers.forEach(function (el) { io.observe(el); });

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          runCount(e.target);
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.55 });
    counters.forEach(function (el) { co.observe(el); });

    // hero fires immediately (no lamp preloader in v2)
    if (hero) requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add("on"); });
    });
  }

  /* ================================================================ */
  /* M-6 · CURSOR RING (fine pointer + motion allowed)                */
  /* ================================================================ */
  if (finePointer && !reduce) {
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(ring);
    var x = 0, y = 0, rx = 0, ry = 0;
    document.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY;
    });
    document.addEventListener("pointerover", function (e) {
      var t = e.target.closest("a, button, .card, .btn, .filter-bar .chip, .faq button");
      ring.classList.toggle("hovering", !!t);
    });
    (function loop() {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
  }

  /* ================================================================ */
  /* SCROLL PROGRESS + HEADER + TO-TOP (same idea as v1, restyled)    */
  /* ================================================================ */
  var header = document.querySelector(".header");
  var prog   = document.getElementById("scroll-progress");
  var toTop  = document.getElementById("to-top");
  function onScroll() {
    var sc = window.scrollY || 0;
    if (header) header.classList.toggle("scrolled", sc > 8);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (h > 0 ? sc / h : 0) + ")";
    }
    if (toTop) toTop.classList.toggle("show", sc > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ================================================================ */
  /* MOBILE MENU (focus trap, aria wiring, unchanged from v1)         */
  /* ================================================================ */
  var burger     = document.querySelector(".menu-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    function setMenu(open) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    burger.addEventListener("click", function () {
      var willOpen = !document.body.classList.contains("menu-open");
      setMenu(willOpen);
      if (willOpen) { var f = mobileMenu.querySelector("a"); if (f) f.focus(); }
    });
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!document.body.classList.contains("menu-open")) return;
      if (e.key === "Escape") { setMenu(false); burger.focus(); return; }
      if (e.key === "Tab") {
        var items = mobileMenu.querySelectorAll("a, button");
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ================================================================ */
  /* FAQ ACCORDION                                                    */
  /* ================================================================ */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".faq button") : null;
    if (!btn) return;
    var item = btn.closest(".faq");
    var open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  /* ================================================================ */
  /* WHATSAPP FORMS (kept from v1)                                    */
  /* ================================================================ */
  function collectFormText(form) {
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (f) {
      if (!f.name || !String(f.value).trim()) return;
      lines.push(f.name + ": " + String(f.value).trim());
    });
    return {
      title: form.getAttribute("data-wa-form") || "Lumu — Request",
      body: "— " + (form.getAttribute("data-wa-form") || "Request") + " —\n" + lines.join("\n")
    };
  }
  document.querySelectorAll("[data-wa-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = collectFormText(form);
      window.open(WA + encodeURIComponent(m.body), "_blank", "noopener");
    });
  });

  /* ================================================================ */
  /* JOB-CARD MIRROR (data-jc → data-jc-out)                          */
  /* ================================================================ */
  document.querySelectorAll("[data-jc]").forEach(function (input) {
    var out = document.querySelector('[data-jc-out="' + input.dataset.jc + '"]');
    if (!out) return;
    var sync = function () { out.textContent = input.value.trim(); };
    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
  });
})();
