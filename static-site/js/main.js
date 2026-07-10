/* Lumu Autodealers — behaviours. Vanilla JS, no build.
   Ignition preloader → hero reveal → gauge sweep · scroll reveals ·
   odometer counters · marquee · tilt · FAQ · WhatsApp job-card forms. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var WA = "https://wa.me/256782017381?text=";

  /* ================= ignition preloader ================= */
  var pre = document.querySelector(".preloader");
  var hero = document.querySelector(".hero");
  var seen = false;
  try { seen = sessionStorage.getItem("lumu-ignited") === "1"; } catch (e) {}

  function igniteSite() {
    if (hero) hero.classList.add("on");
    startGauge();
  }
  function killPre(instant) {
    if (!pre || pre.dataset.gone) { return; }
    pre.dataset.gone = "1";
    if (instant) { pre.remove(); igniteSite(); return; }
    pre.classList.add("done");
    igniteSite();
    setTimeout(function () { pre.remove(); }, 600);
  }

  if (!pre || reduce || seen) {
    if (pre) pre.remove();
    // wait a tick so layout is ready, then run entrance
    requestAnimationFrame(function () { requestAnimationFrame(igniteSite); });
  } else {
    try { sessionStorage.setItem("lumu-ignited", "1"); } catch (e) {}
    pre.classList.add("run");
    var lamps = pre.querySelectorAll(".pre-lamp");
    lamps.forEach(function (l, i) {
      setTimeout(function () { l.classList.add("lit"); }, 180 + i * 190);
    });
    setTimeout(killPre, 1350);
    window.addEventListener("load", function () { setTimeout(killPre, 1400); });
    setTimeout(killPre, 3200); // safety net
  }

  /* ================= the gauge (hero tachometer) ================= */
  var gaugeStarted = false;
  function startGauge() {
    var host = document.getElementById("gauge");
    if (!host || gaugeStarted) return;
    gaugeStarted = true;

    var NS = "http://www.w3.org/2000/svg";
    var C = 100, START = -135, END = 135, MAX = 8, RED = 6.5;
    function ang(v) { return START + (v / MAX) * (END - START); }
    function pt(r, a) {
      var rad = a * Math.PI / 180;
      return [C + r * Math.sin(rad), C - r * Math.cos(rad)];
    }
    function el(name, attrs) {
      var e = document.createElementNS(NS, name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }
    function arc(r, a1, a2) {
      var p1 = pt(r, a1), p2 = pt(r, a2);
      var large = (a2 - a1) > 180 ? 1 : 0;
      return "M" + p1[0].toFixed(2) + " " + p1[1].toFixed(2) +
             " A" + r + " " + r + " 0 " + large + " 1 " +
             p2[0].toFixed(2) + " " + p2[1].toFixed(2);
    }

    var svg = el("svg", { viewBox: "0 0 200 200", class: "gauge-svg", "aria-hidden": "true" });

    // dial track + redline arc
    svg.appendChild(el("path", { d: arc(82, START, END), fill: "none", stroke: "#2c241b", "stroke-width": "2" }));
    svg.appendChild(el("path", { d: arc(82, ang(RED), END), fill: "none", stroke: "#ff6a00", "stroke-width": "5", "stroke-linecap": "round", opacity: ".9" }));

    // ticks
    for (var v = 0; v <= MAX * 4; v++) {
      var val = v / 4, a = ang(val), major = v % 4 === 0;
      var o = pt(84, a), i2 = pt(major ? 72 : 78, a);
      svg.appendChild(el("line", {
        x1: o[0].toFixed(2), y1: o[1].toFixed(2), x2: i2[0].toFixed(2), y2: i2[1].toFixed(2),
        stroke: val >= RED ? "#ff7a1a" : (major ? "#c9bda9" : "#4d4234"),
        "stroke-width": major ? "2.4" : "1", "stroke-linecap": "round"
      }));
      if (major) {
        var tp = pt(60, a);
        var t = el("text", {
          x: tp[0].toFixed(2), y: (tp[1] + 4).toFixed(2), "text-anchor": "middle",
          fill: val >= RED ? "#ff9a4d" : "#a89b85",
          "font-family": "'Big Shoulders Display', sans-serif", "font-size": "12.5", "font-weight": "700"
        });
        t.textContent = String(val);
        svg.appendChild(t);
      }
    }

    // labels
    var l1 = el("text", { x: C, y: 132, "text-anchor": "middle", fill: "#93917c", "font-family": "'IBM Plex Mono', monospace", "font-size": "6.4", "letter-spacing": "2.4" });
    l1.textContent = "RPM × 1000";
    svg.appendChild(l1);
    var l2 = el("text", { x: C, y: 158, "text-anchor": "middle", fill: "#6b6152", "font-family": "'IBM Plex Mono', monospace", "font-size": "5.6", "letter-spacing": "2.8" });
    l2.textContent = "LUMU · EST 2018";
    svg.appendChild(l2);

    // needle
    var needle = el("g", { style: "transform-origin:100px 100px" });
    needle.appendChild(el("polygon", { points: "100,26 102.6,104 97.4,104", fill: "#ff7a1a" }));
    needle.appendChild(el("polygon", { points: "100,26 101.2,104 98.8,104", fill: "#ffd9a8", opacity: ".55" }));
    svg.appendChild(needle);
    svg.appendChild(el("circle", { cx: C, cy: C, r: "9", fill: "#211a13", stroke: "#4d4234", "stroke-width": "1.5" }));
    svg.appendChild(el("circle", { cx: C, cy: C, r: "3.2", fill: "#ff7a1a" }));

    host.appendChild(svg);

    var IDLE = ang(1.1);
    if (reduce) { needle.style.transform = "rotate(" + IDLE + "deg)"; return; }

    // ignition sweep: 0 → redline → settle at idle, then breathe
    needle.style.transform = "rotate(" + START + "deg)";
    setTimeout(function () {
      needle.style.transition = "transform .85s cubic-bezier(.3,.9,.4,1)";
      needle.style.transform = "rotate(" + ang(7.6) + "deg)";
    }, 350);
    setTimeout(function () {
      needle.style.transition = "transform 1.1s cubic-bezier(.22,1.3,.36,1)";
      needle.style.transform = "rotate(" + IDLE + "deg)";
    }, 1300);
    setTimeout(function () {
      needle.style.transition = "transform .9s ease-in-out";
      setInterval(function () {
        var jitter = IDLE + (Math.random() * 4 - 1.6);
        needle.style.transform = "rotate(" + jitter + "deg)";
      }, 950);
    }, 2500);
  }
  // pages without a preloader still need the gauge + hero entrance
  if (!document.querySelector(".preloader") && !pre) {
    requestAnimationFrame(function () { igniteSite(); });
  }

  /* ================= header / progress / to-top ================= */
  var header = document.querySelector(".header");
  var prog = document.getElementById("scroll-progress");
  var toTop = document.getElementById("to-top");
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
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ================= mobile menu ================= */
  var burger = document.querySelector(".menu-toggle");
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
      if (e.key === "Tab") {                       // trap focus inside the open menu
        var items = mobileMenu.querySelectorAll("a, button");
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ================= stagger + reveals + counters + rail ================= */
  document.querySelectorAll("[data-stagger]").forEach(function (parent) {
    var kids = parent.children;
    for (var i = 0; i < kids.length; i++) kids[i].style.setProperty("--d", (i * 0.08).toFixed(2) + "s");
  });

  var reveals = document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-scale");
  // resolve "years since" counters so the number never drifts out of date
  document.querySelectorAll("[data-count-since]").forEach(function (elm) {
    var yrs = new Date().getFullYear() - parseInt(elm.dataset.countSince, 10);
    elm.dataset.count = String(yrs > 0 ? yrs : 0);
  });
  var counters = document.querySelectorAll("[data-count]");
  var rails = document.querySelectorAll(".rail");

  function runCount(elm) {
    var target = parseFloat(elm.dataset.count || "0"), suffix = elm.dataset.suffix || "", start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / 1500, 1), e = 1 - Math.pow(1 - t, 3);
      elm.textContent = Math.round(target * e) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (elm) { elm.classList.add("in"); });
    rails.forEach(function (elm) { elm.classList.add("in"); });
    counters.forEach(function (elm) { elm.textContent = (elm.dataset.count || "") + (elm.dataset.suffix || ""); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    reveals.forEach(function (elm) { io.observe(elm); });
    rails.forEach(function (elm) { io.observe(elm); });
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (elm) { co.observe(elm); });
  }

  /* ================= brand marquee (duplicate track once) ================= */
  document.querySelectorAll(".brand-track").forEach(function (track) {
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (n) {
      var c = n.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
  });

  /* ================= tilt cards (fine pointers only) ================= */
  if (!reduce && finePointer) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (ev) {
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (px * 6).toFixed(2) + "deg");
        card.style.setProperty("--rx", (py * -6).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });

    /* magnetic CTAs */
    document.querySelectorAll("[data-magnetic]").forEach(function (elm) {
      elm.addEventListener("pointermove", function (ev) {
        var r = elm.getBoundingClientRect();
        var x = (ev.clientX - (r.left + r.width / 2)) * 0.3;
        var y = (ev.clientY - (r.top + r.height / 2)) * 0.3;
        elm.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      elm.addEventListener("pointerleave", function () { elm.style.transform = ""; });
    });
  }

  /* ================= FAQ accordion ================= */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".faq button") : null;
    if (!btn) return;
    var item = btn.closest(".faq");
    var open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  /* ================= WhatsApp forms + live job card ================= */
  // live-fill: <input data-jc="vehicle"> mirrors into <b data-jc-out="vehicle">
  document.querySelectorAll("[data-jc]").forEach(function (input) {
    var out = document.querySelector('[data-jc-out="' + input.dataset.jc + '"]');
    if (!out) return;
    var sync = function () { out.textContent = input.value.trim(); };
    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
  });

  function collectFormText(form) {
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (f) {
      if (!f.name || !String(f.value).trim()) return;
      lines.push(f.name + ": " + String(f.value).trim());
    });
    var title = form.getAttribute("data-wa-form") || "Lumu — Request";
    return { title: title, body: "— " + title + " —\n" + lines.join("\n") };
  }
  function flashHint(host, msg) {
    var t = document.createElement("span");
    t.className = "form-hint"; t.textContent = msg;
    host.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 20);
    setTimeout(function () { t.classList.remove("show"); }, 2200);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2700);
  }
  document.querySelectorAll("[data-wa-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = collectFormText(form);
      window.open(WA + encodeURIComponent(m.body), "_blank", "noopener");
    });
    // secondary channel buttons: form declares data-fallback-into="#some-id"
    var target = form.querySelector("[data-fallback-into]") || form.querySelector('.cta-row');
    if (target) {
      var row = document.createElement("div");
      row.className = "fallback-row";
      row.innerHTML =
        '<span class="fallback-label">Or send by</span>' +
        '<button type="button" class="fallback-btn" data-ch="email"><svg class="ic" aria-hidden="true"><use href="#ic-file"/></svg>Email</button>' +
        '<button type="button" class="fallback-btn" data-ch="copy"><svg class="ic" aria-hidden="true"><use href="#ic-check"/></svg>Copy</button>';
      target.appendChild(row);
      row.addEventListener("click", function (ev) {
        var btn = ev.target.closest("button.fallback-btn");
        if (!btn) return;
        var m = collectFormText(form);
        if (btn.dataset.ch === "email") {
          var subj = encodeURIComponent("Lumu — " + m.title);
          var body = encodeURIComponent(m.body);
          window.location.href = "mailto:info@lumuautodealers.com?subject=" + subj + "&body=" + body;
        } else if (btn.dataset.ch === "copy") {
          var text = m.body;
          var done = function () { flashHint(row, "Copied — paste anywhere"); };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else {
            var ta = document.createElement("textarea");
            ta.value = text; ta.style.position = "fixed"; ta.style.left = "-9999px";
            document.body.appendChild(ta); ta.select();
            try { document.execCommand("copy"); } catch (e) {}
            document.body.removeChild(ta); done();
          }
        }
      });
    }
  });

  /* ================= print / save-as-PDF the job card ================= */
  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.body.classList.add("printing-jobcard");
      var restore = function () {
        document.body.classList.remove("printing-jobcard");
        window.removeEventListener("afterprint", restore);
      };
      window.addEventListener("afterprint", restore);
      window.print();
      setTimeout(restore, 4000); // safety
    });
  });

  /* ================= click-to-load map (no cookies until user acts) ============= */
  document.querySelectorAll("[data-map]").forEach(function (host) {
    var btn = host.querySelector("[data-map-load]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var q = host.dataset.map || "Busega Masaka Road Kampala";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";
      iframe.loading = "lazy";
      iframe.title = "Lumu Autodealers on Google Maps";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      host.replaceChildren(iframe);
    });
  });
})();
