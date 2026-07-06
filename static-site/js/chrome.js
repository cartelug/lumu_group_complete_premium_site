/* Shared site chrome — sprite, topbar, header, mobile menu, footer, fixed
   helpers — injected on every page so there is ONE place to edit it.
   Runs before main.js. Phone / address / nav all live here. */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "home";
  var PHONE = "+256 782 017 381";
  var PHONE2 = "+256 782 493 499";
  var TEL = "tel:+256782017381";
  var WA = "https://wa.me/256782017381?text=";
  var EMAIL = "info@lumuautodealers.com";
  var ADDRESS = "Busega, Masaka Road, Kampala";

  var NAV = [
    ["index.html", "Home", "home", "01"],
    ["services.html", "Services", "services", "02"],
    ["fleet.html", "Fleet", "fleet", "03"],
    ["real-estate.html", "Real Estate", "real-estate", "04"],
    ["about.html", "About", "about", "05"],
    ["contact.html", "Contact", "contact", "06"]
  ];

  var navHtml = NAV.map(function (n) {
    return '<a href="' + n[0] + '"' + (n[2] === page ? ' class="active" aria-current="page"' : "") + ">" + n[1] + "</a>";
  }).join("");

  var mmHtml = NAV.map(function (n, idx) {
    return '<a class="mm-link' + (n[2] === page ? " active" : "") + '"' + (n[2] === page ? ' aria-current="page"' : "") + ' style="--d:' + (0.06 + idx * 0.05).toFixed(2) + 's" href="' + n[0] + '"><i>' + n[3] + "</i>" + n[1] + "</a>";
  }).join("");

  var logo = function (id, sub) {
    return '<svg class="logo-mark" viewBox="0 0 44 44" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffa02e"/><stop offset="1" stop-color="#c9480a"/></linearGradient></defs><rect width="44" height="44" rx="11" fill="url(#' + id + ')"/><path d="M28 14.5a4.7 4.7 0 0 0-6.2 6.1l-7.4 7.4a1.75 1.75 0 0 0 2.5 2.5l7.4-7.4a4.7 4.7 0 0 0 6.1-6.2l-2.8 2.8-2.4-2.4 2.8-2.8z" fill="#170b02"/></svg>' +
      '<span class="brandtext">Lumu <b>Autodealers</b><small>' + sub + "</small></span>";
  };

  var sprite =
    '<svg width="0" height="0" class="sprite" aria-hidden="true" focusable="false">' +
    '<symbol id="ic-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6l-2.6 2.6-2.4-2.4 2.6-2.6z"/></symbol>' +
    '<symbol id="ic-diagnostics" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 11l2-2 2 3 2-4 2 3h1"/></symbol>' +
    '<symbol id="ic-gear" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/></symbol>' +
    '<symbol id="ic-gauge" viewBox="0 0 24 24"><path d="M4 16a8 8 0 1 1 16 0"/><circle cx="12" cy="14" r="1.6"/><path d="M12 13l3.4-3.4"/></symbol>' +
    '<symbol id="ic-parts" viewBox="0 0 24 24"><path d="M12 2.5l8 4.6v9.8L12 21.5 4 16.9V7.1z"/><circle cx="12" cy="12" r="3.2"/></symbol>' +
    '<symbol id="ic-battery" viewBox="0 0 24 24"><rect x="2.5" y="8" width="17" height="10" rx="2"/><path d="M19.5 11h2v4h-2M6.5 13h4M8.5 11v4M13.5 13h3"/></symbol>' +
    '<symbol id="ic-truck" viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="11" height="9" rx="1"/><path d="M13.5 9.5H17l3.5 3.5v2.5h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></symbol>' +
    '<symbol id="ic-star" viewBox="0 0 24 24"><path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.5 6.9 19.2l1-5.8L3.6 9.3l5.8-.8z"/></symbol>' +
    '<symbol id="ic-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z"/><path d="M9 12l2 2 4-4"/></symbol>' +
    '<symbol id="ic-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 1.8"/></symbol>' +
    '<symbol id="ic-file" viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 13.5l1.6 1.6 3.2-3.6"/></symbol>' +
    '<symbol id="ic-check" viewBox="0 0 24 24"><path d="M5 12.5l4.2 4L19 6.5"/></symbol>' +
    '<symbol id="ic-phone" viewBox="0 0 24 24"><path d="M5 4h3.5l1.8 4.4-2.2 1.6a11 11 0 0 0 5 5l1.6-2.2L19.5 19v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 2.5 5.6 1.5 1.5 0 0 1 4 4z"/></symbol>' +
    '<symbol id="ic-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/></symbol>' +
    '<symbol id="ic-handshake" viewBox="0 0 24 24"><path d="M3 12l4-4 4 3 2-2 4 2 4-3v8h-4l-3 3-3-3-4 1-4-2z"/></symbol>' +
    '<symbol id="ic-home" viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></symbol>' +
    '<symbol id="ic-building" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/></symbol>' +
    '<symbol id="ic-key" viewBox="0 0 24 24"><circle cx="8" cy="14" r="3.5"/><path d="M10.5 11.5 19 3M16 4l3 3M14.5 5.5l2.5 2.5"/></symbol>' +
    '<symbol id="ic-trending" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 7-7M15 8h6v6"/></symbol>' +
    '<symbol id="ic-land" viewBox="0 0 24 24"><path d="M3 19h18"/><path d="M5 19l4-7 3 4 2.5-3.5L20 19"/></symbol>' +
    '<symbol id="ic-chat" viewBox="0 0 24 24"><path d="M4 11.5a7.5 7.5 0 1 1 3.4 6.3L4 19l1.2-3.4A7.4 7.4 0 0 1 4 11.5z"/></symbol>' +
    '<symbol id="ic-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>' +
    "</svg>";

  var top =
    sprite +
    '<div class="preloader" aria-hidden="true"><div class="preloader-inner">' +
    '<div class="pre-lamps"><span class="pre-lamp">Oil</span><span class="pre-lamp">Batt</span><span class="pre-lamp">Brakes</span><span class="pre-lamp">Trust</span></div>' +
    '<span class="preloader-word">Lumu <b>Autodealers</b></span>' +
    '<span class="preloader-bar"><i></i></span></div></div>' +
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<div class="topbar"><div class="container topbar-row">' +
    '<div class="topbar-contact"><a href="' + TEL + '">' + PHONE + '</a><span class="topbar-sep"></span><a href="mailto:' + EMAIL + '">' + EMAIL + "</a></div>" +
    '<div class="topbar-meta"><span>' + ADDRESS + '</span><span class="topbar-sep"></span><span>Mon – Sat · 8:00 – 18:00</span></div></div></div>' +
    '<header class="header"><div class="container nav">' +
    '<a class="brand" href="index.html" aria-label="Lumu Autodealers home">' + logo("lm", "& Logistics Ltd") + "</a>" +
    '<nav class="nav-links" aria-label="Primary">' + navHtml + "</nav>" +
    '<div class="nav-actions"><a class="btn btn-primary" href="contact.html#book">Book a service</a>' +
    '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button></div>' +
    "</div></header>" +
    '<div class="mobile-menu" id="mobile-menu"><nav aria-label="Mobile">' + mmHtml + "</nav>" +
    '<div class="mm-foot"><a href="' + TEL + '">' + PHONE + '</a><a href="mailto:' + EMAIL + '">' + EMAIL + "</a><span>" + ADDRESS + "</span></div></div>";

  var year = new Date().getFullYear();
  var bottom =
    '<footer class="footer"><div class="container"><div class="footer-grid">' +
    '<div><a class="brand" href="index.html" aria-label="Lumu Autodealers home">' + logo("lf", "Built on Trust") + "</a>" +
    '<p class="mt-24">Quality service. Honest work. Lasting relationships. Motor vehicle repairs, servicing, diagnostics, genuine parts and logistics in Kampala since 2018.</p>' +
    '<div class="cta-row mt-24"><a class="btn btn-primary" href="contact.html#book">Book a service</a></div></div>' +
    '<div class="f-col"><h3>Workshop</h3><a href="services.html">All services</a><a href="services.html#bay-1">Repairs &amp; servicing</a><a href="services.html#bay-2">Diagnostics</a><a href="services.html#bay-5">Spare parts</a><a href="fleet.html">Fleet &amp; logistics</a></div>' +
    '<div class="f-col"><h3>Company</h3><a href="about.html">About Lumu</a><a href="real-estate.html">Lumu Real Estate</a><a href="contact.html">Contact</a><a href="contact.html#book">Open a job card</a></div>' +
    '<div class="f-col f-contact"><h3>Find us</h3><p class="mono" style="font-size:.8rem;line-height:2">P.O. Box 72434, Kampala<br>' + ADDRESS + "</p>" +
    '<a href="' + TEL + '">' + PHONE + '</a><a href="tel:+256782493499">' + PHONE2 + '</a><a href="mailto:' + EMAIL + '">' + EMAIL + "</a></div>" +
    '</div><div class="bottom"><span>© ' + year + " Lumu Autodealers &amp; Logistics Ltd</span><span>Built on Trust</span></div>" +
    '<div class="f-word" aria-hidden="true">Lumu <b>Autodealers</b></div></div></footer>' +
    '<div class="mobile-actions"><a href="' + TEL + '"><svg class="ic" aria-hidden="true"><use href="#ic-phone"/></svg>Call</a>' +
    '<a href="' + WA + encodeURIComponent("Hello Lumu Autodealers, I have a question.") + '" target="_blank" rel="noopener"><svg class="ic" aria-hidden="true"><use href="#ic-chat"/></svg>WhatsApp</a>' +
    '<a class="primary" href="contact.html#book"><svg class="ic" aria-hidden="true"><use href="#ic-file"/></svg>Book</a></div>' +
    '<a class="wa-fab" href="' + WA + encodeURIComponent("Hello Lumu Autodealers, I have a question.") + '" target="_blank" rel="noopener" aria-label="Chat with Lumu Autodealers on WhatsApp"><span class="wa-fab-ring" aria-hidden="true"></span><svg class="ic" aria-hidden="true"><use href="#ic-chat"/></svg></a>' +
    '<div class="scroll-progress" id="scroll-progress"></div>' +
    '<button class="to-top" id="to-top" aria-label="Back to top">↑</button>';

  document.body.insertAdjacentHTML("afterbegin", top);
  document.body.insertAdjacentHTML("beforeend", bottom);
})();
