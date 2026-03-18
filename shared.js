// shared.js — Sixth Schedule Archive

// Theme
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') root.setAttribute('data-theme','dark');

  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const label = document.getElementById('toggleLabel');
    if (!toggle) return;
    if (saved === 'dark' && label) label.textContent = 'Dark';
    toggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
      if (label) label.textContent = isDark ? 'Light' : 'Dark';
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  });
})();

// Page transitions
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-navigate]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const overlay = document.getElementById('overlay');
      if (overlay) { overlay.classList.add('leaving'); }
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-head').forEach(head => {
    head.addEventListener('click', () => {
      const body = head.nextElementSibling;
      const icon = head.querySelector('.accordion-icon');
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      if (icon) icon.classList.toggle('open', !isOpen);
    });
  });

  // Case card toggles
  document.querySelectorAll('.case-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.case-card');
      const body = card.querySelector('.case-card-body');
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      btn.classList.toggle('open', !isOpen);
      btn.textContent = isOpen ? '▼' : '▲';
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const items = document.querySelectorAll('[data-tags]');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.tags.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  if (searchInput && searchBtn) {
    const doSearch = () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('[data-searchable]').forEach(el => {
        el.style.display = (q === '' || el.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    };
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keyup', e => { if(e.key==='Enter') doSearch(); });
  }
});