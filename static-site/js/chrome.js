/* Shared site chrome (sprite, topbar, header, footer, guide, etc.) injected on
   every page so there is ONE place to edit it. Runs before main.js. */
(function () {
  "use strict";
  var page = (document.body.getAttribute("data-page") || "home");

  var NAV = [
    ["index.html", "Home", "home"],
    ["services.html", "Services", "services"],
    ["fleet.html", "Fleet", "fleet"],
    ["real-estate.html", "Real Estate", "real-estate"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"]
  ];
  var navHtml = NAV.map(function (n) {
    return '<a href="' + n[0] + '"' + (n[2] === page ? ' class="active"' : "") + ">" + n[1] + "</a>";
  }).join("");

  var logo = function (id, sub) {
    return '<svg class="logo-mark" viewBox="0 0 44 44"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a1f"/><stop offset="1" stop-color="#c24e00"/></linearGradient></defs><rect width="44" height="44" rx="12" fill="url(#' + id + ')"/><path d="M28 14.5a4.7 4.7 0 0 0-6.2 6.1l-7.4 7.4a1.75 1.75 0 0 0 2.5 2.5l7.4-7.4a4.7 4.7 0 0 0 6.1-6.2l-2.8 2.8-2.4-2.4 2.8-2.8z" fill="#fff"/></svg>' +
      '<span class="brandtext">Lumu <b>Autodealers</b><small>' + sub + "</small></span>";
  };

  var sprite =
    '<svg width="0" height="0" class="sprite" aria-hidden="true" focusable="false">' +
    '<symbol id="ic-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6l-2.6 2.6-2.4-2.4 2.6-2.6z"/></symbol>' +
    '<symbol id="ic-diagnostics" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 11l2-2 2 3 2-4 2 3h1"/></symbol>' +
    '<symbol id="ic-gear" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/></symbol>' +
    '<symbol id="ic-gauge" viewBox="0 0 24 24"><path d="M4 16a8 8 0 1 1 16 0"/><circle cx="12" cy="14" r="1.6"/><path d="M12 13l3.4-3.4"/></symbol>' +
    '<symbol id="ic-spray" viewBox="0 0 24 24"><rect x="8.5" y="9" width="7" height="12" rx="2"/><path d="M10.5 9V6a1.5 1.5 0 0 1 1.5-1.5A1.5 1.5 0 0 1 13.5 6v3"/><path d="M17 5h2M17 8h2M18.5 3v.5M18.5 9.5v.5"/></symbol>' +
    '<symbol id="ic-parts" viewBox="0 0 24 24"><path d="M12 2.5l8 4.6v9.8L12 21.5 4 16.9V7.1z"/><circle cx="12" cy="12" r="3.2"/></symbol>' +
    '<symbol id="ic-power" viewBox="0 0 24 24"><path d="M13 2 5 13h6l-1 9 8-12h-6l1-8z"/></symbol>' +
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
    "</svg>";

  var top =
    sprite +
    '<div class="preloader" aria-hidden="true"><div class="preloader-inner">' +
    '<svg class="preloader-mark" viewBox="0 0 44 44"><defs><linearGradient id="pre" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a1f"/><stop offset="1" stop-color="#c23a05"/></linearGradient></defs><rect width="44" height="44" rx="11" fill="url(#pre)"/><path d="M28 14.5a4.7 4.7 0 0 0-6.2 6.1l-7.4 7.4a1.75 1.75 0 0 0 2.5 2.5l7.4-7.4a4.7 4.7 0 0 0 6.1-6.2l-2.8 2.8-2.4-2.4 2.8-2.8z" fill="#fff"/></svg>' +
    '<span class="preloader-word">Lumu <b>Autodealers</b></span><span class="preloader-bar"><i></i></span></div></div>' +
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<div class="topbar"><div class="container topbar-row">' +
    '<div class="topbar-contact"><a href="tel:+256782017381">+256 782 017 381</a><span class="topbar-sep"></span><a href="mailto:info@lumuautodealers.com">info@lumuautodealers.com</a></div>' +
    '<div class="topbar-meta"><span>Busega – Masaka Road, Kampala</span><span class="topbar-sep"></span><span>Mon – Sat, 8:00am – 6:00pm</span></div></div></div>' +
    '<header class="header"><div class="container nav">' +
    '<a class="brand" href="index.html" aria-label="Lumu Autodealers home">' + logo("lm", "Built on Trust") + "</a>" +
    '<nav class="nav-links" aria-label="Primary navigation">' + navHtml + "</nav>" +
    '<div class="nav-actions"><a class="btn btn-soft" href="contact.html#book">Book a service</a>' +
    '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div>' +
    "</div></header>";

  var bottom =
    '<footer class="footer"><div class="container"><div class="footer-grid">' +
    '<div><a class="brand" href="index.html" aria-label="Lumu Autodealers home">' + logo("lf", "&amp; Logistics Ltd") + "</a>" +
    '<p class="mt-24">Quality service. Honest work. Lasting relationships.</p>' +
    '<div class="cta-row mt-24"><a class="btn btn-primary" href="contact.html#book">Book a service</a><a class="btn btn-ghost" href="tel:+256782017381">Call us</a></div></div>' +
    '<div><h3>Services</h3><a href="services.html">Repairs &amp; Servicing</a><a href="services.html">Diagnostics</a><a href="services.html">Spare Parts</a><a href="fleet.html">Fleet &amp; Logistics</a></div>' +
    '<div><h3>Company</h3><a href="about.html">About Lumu</a><a href="real-estate.html">Real Estate</a><a href="services.html">All services</a><a href="contact.html">Contact</a></div>' +
    '<div><h3>Visit / Contact</h3><p class="subtle" style="margin:10px 0">P.O. Box 72434, Kampala — Busega, Masaka Road</p><a href="tel:+256782017381">+256 782 017 381</a><a href="tel:+256782493499">+256 782 493 499</a><a href="mailto:info@lumuautodealers.com">info@lumuautodealers.com</a></div>' +
    '</div><div class="bottom"><span>© <span id="year"></span> Lumu Autodealers &amp; Logistics Ltd. All rights reserved.</span><span>Built on Trust.</span></div></div></footer>' +
    '<div class="mobile-actions"><a href="tel:+256782017381">Call</a><a href="https://wa.me/256782017381" target="_blank" rel="noopener">WhatsApp</a></div>' +
    '<a class="wa-fab" href="https://wa.me/256782017381?text=Hello%20Lumu%20Autodealers%2C%20I%20have%20a%20question." target="_blank" rel="noopener" aria-label="Chat with Lumu Autodealers on WhatsApp"><span class="wa-fab-ring" aria-hidden="true"></span><svg class="ic"><use href="#ic-chat"/></svg><span class="wa-fab-label">Chat with us</span></a>' +
    '<div class="scroll-progress" id="scroll-progress"></div><button class="to-top" id="to-top" aria-label="Back to top">↑</button>' +
    '<div class="guide" aria-hidden="true"><svg viewBox="0 0 220 250" class="guide__svg"><g class="guide__fig">' +
    '<ellipse cx="110" cy="56" rx="44" ry="36" fill="#1d1712"/><circle cx="70" cy="74" r="16" fill="#1d1712"/><circle cx="150" cy="74" r="16" fill="#1d1712"/>' +
    '<circle cx="110" cy="76" r="33" fill="#7c5234"/><path d="M79 60 Q110 40 141 60 Q126 54 110 55 Q94 54 79 60Z" fill="#1d1712"/>' +
    '<g class="guide__eyes"><circle cx="98" cy="78" r="3.6" fill="#16110b"/><circle cx="122" cy="78" r="3.6" fill="#16110b"/></g>' +
    '<path d="M91 70 Q98 66 104 70" stroke="#16110b" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M116 70 Q122 66 129 70" stroke="#16110b" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M99 92 Q110 101 121 92" stroke="#3a241a" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="100" y="103" width="20" height="18" rx="8" fill="#7c5234"/>' +
    '<path d="M52 250 L52 154 Q52 124 88 118 L132 118 Q168 124 168 154 L168 250 Z" fill="#2b3038"/><path d="M88 118 L110 146 L132 118 L122 116 L110 132 L98 116 Z" fill="#3a414a"/>' +
    '<line x1="110" y1="146" x2="110" y2="250" stroke="#3a414a" stroke-width="3"/><rect x="92" y="158" width="34" height="14" rx="3" fill="#ff5a1f"/>' +
    '<text x="109" y="168" text-anchor="middle" font-family="monospace" font-size="8" font-weight="700" fill="#fff">LUMU</text>' +
    '<path d="M70 132 Q50 168 52 206" stroke="#2b3038" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="52" cy="208" r="12" fill="#7c5234"/>' +
    '<rect x="40" y="196" width="9" height="30" rx="4" transform="rotate(34 44 211)" fill="#9aa0a6"/><circle cx="40" cy="198" r="6" fill="none" stroke="#9aa0a6" stroke-width="4"/>' +
    '<g class="guide__arm" id="guide-arm"><path d="M150 130 Q172 112 188 92" stroke="#2b3038" stroke-width="20" fill="none" stroke-linecap="round"/><circle cx="190" cy="90" r="11" fill="#7c5234"/><rect x="186" y="64" width="9" height="28" rx="4.5" transform="rotate(34 190 78)" fill="#7c5234"/><circle class="guide__ping" cx="206" cy="62" r="4" fill="#ff5a1f"/></g>' +
    "</g></svg></div>";

  document.body.insertAdjacentHTML("afterbegin", top);
  document.body.insertAdjacentHTML("beforeend", bottom);
})();
