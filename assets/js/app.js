const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const header = $('.header');
if (header) {
  const setScrolled = () => header.classList.toggle('scrolled', window.scrollY > 8);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });
}

const menuButton = $('.menu-toggle');
const navLinks = $('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('open', !open);
  });
  $$('.nav-links a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }));
}

const current = location.pathname.split('/').pop() || 'index.html';
$$('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) link.classList.add('active');
});

const revealItems = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach(item => io.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in'));
}

$$('[data-tabs]').forEach(group => {
  const tabs = $$('[data-tab]', group);
  const panels = $$('[data-panel]', group);
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === target));
  }));
});

$$('[data-filter-group]').forEach(group => {
  const filters = $$('[data-filter]', group);
  const targetName = group.dataset.filterGroup;
  const items = $$(`[data-filter-item="${targetName}"]`);
  filters.forEach(filter => filter.addEventListener('click', () => {
    const value = filter.dataset.filter;
    filters.forEach(f => f.classList.toggle('active', f === filter));
    items.forEach(item => {
      const cats = (item.dataset.category || '').split(' ');
      item.classList.toggle('hidden', value !== 'all' && !cats.includes(value));
    });
  }));
});

$$('.faq').forEach(faq => {
  const button = $('button', faq);
  button?.addEventListener('click', () => {
    const open = faq.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const modal = $('#messageModal');
const modalText = $('#modalMessage');
const toast = $('#toast');
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
function buildMessage(form) {
  const type = form.dataset.formTitle || 'Lumu Group Inquiry';
  const lines = [`${type}`, ''];
  new FormData(form).forEach((value, key) => {
    if (String(value).trim()) {
      const label = key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`${label}: ${value}`);
    }
  });
  lines.push('', 'Please contact me with the next steps.');
  return lines.join('\n');
}
$$('[data-smart-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = buildMessage(form);
    if (modal && modalText) {
      modalText.value = message;
      modal.classList.add('open');
      modalText.focus();
    }
    const whatsapp = form.dataset.whatsapp || '256700000000';
    const link = form.querySelector('[data-whatsapp-link]');
    if (link) link.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  });
});
$$('[data-modal-close]').forEach(btn => btn.addEventListener('click', () => modal?.classList.remove('open')));
modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
$('#copyMessage')?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(modalText.value); showToast('Message copied'); }
  catch { modalText.select(); document.execCommand('copy'); showToast('Message copied'); }
});
$('#openWhatsapp')?.addEventListener('click', () => {
  const phone = document.body.dataset.whatsapp || '256700000000';
  const text = modalText?.value || 'Hello Lumu Group, I would like assistance.';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

$$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
