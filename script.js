(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const config = {
    whatsappNumber: "256700000000", // Replace with official Lumu WhatsApp number, without +
    company: "Lumu Group of Companies"
  };

  const body = document.body;
  const menuToggle = $(".menu-toggle");
  const mobilePanel = $(".mobile-panel");

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      mobilePanel.classList.toggle("open", !open);
      body.classList.toggle("lock", !open);
    });
    $$(".mobile-panel a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobilePanel.classList.remove("open");
        body.classList.remove("lock");
      });
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  $$("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) link.classList.add("active");
  });

  $$(".tabs").forEach((tabs) => {
    const buttons = $$(".tab-btn", tabs);
    const targetSelector = tabs.dataset.target;
    const panels = targetSelector ? $$(targetSelector) : [];
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        buttons.forEach((b) => b.classList.toggle("active", b === button));
        panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target));
      });
    });
  });

  $$(".filters").forEach((filters) => {
    const group = filters.dataset.filterGroup;
    const cards = $$(`[data-filter-group="${group}"]`);
    $$(".filter-btn", filters).forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        $$(".filter-btn", filters).forEach((b) => b.classList.toggle("active", b === button));
        cards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ");
          const show = filter === "all" || categories.includes(filter);
          card.classList.toggle("hidden", !show);
        });
      });
    });
  });

  $$(".faq-q").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      const plus = button.querySelector("span:last-child");
      if (plus) plus.textContent = isOpen ? "−" : "+";
    });
  });

  const modal = $("#messageModal");
  const modalText = $("#modalMessage");
  const openModal = (message) => {
    if (!modal || !modalText) return;
    modalText.value = message;
    modal.classList.add("open");
    body.classList.add("lock");
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    body.classList.remove("lock");
  };
  $$("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  const encodeWhatsApp = (message) => `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const serializeForm = (form) => {
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      const clean = String(value).trim();
      if (!clean) continue;
      const label = key.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
      lines.push(`${label}: ${clean}`);
    }
    return lines;
  };

  $$("form[data-inquiry]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = form.dataset.inquiry;
      const lines = serializeForm(form);
      const title = type === "auto" ? "Vehicle Inquiry" : type === "estate" ? "Real Estate Inquiry" : "General Inquiry";
      const message = `Hello ${config.company},\n\nI would like help with: ${title}.\n\n${lines.join("\n")}\n\nPlease contact me with the next steps.`;
      openModal(message);
    });
  });

  const copyBtn = $("#copyMessage");
  if (copyBtn && modalText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(modalText.value);
        copyBtn.textContent = "Copied";
        setTimeout(() => (copyBtn.textContent = "Copy message"), 1400);
      } catch {
        modalText.select();
        document.execCommand("copy");
      }
    });
  }

  const whatsappBtn = $("#sendWhatsapp");
  if (whatsappBtn && modalText) {
    whatsappBtn.addEventListener("click", () => {
      window.open(encodeWhatsApp(modalText.value), "_blank", "noopener,noreferrer");
    });
  }

  $$('[data-whatsapp]').forEach((link) => {
    const message = link.dataset.whatsapp || `Hello ${config.company}, I would like assistance.`;
    link.setAttribute("href", encodeWhatsApp(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("in"));
  }
})();
