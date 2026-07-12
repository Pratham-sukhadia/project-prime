/* ============================================================
   PROJECT PRIME — Bottom Navigation Component
   ============================================================ */

window.NavComponent = (() => {
  const TABS = [
    { route: '/dashboard', icon: 'layout-dashboard', label: 'Home' },
    { route: '/workout', icon: 'dumbbell', label: 'Workout' },
    { route: '/nutrition', icon: 'utensils', label: 'Nutrition' },
    { route: '/progress', icon: 'trending-up', label: 'Progress' },
    { route: '/more', icon: 'grid-2x2', label: 'More' }
  ];

  const MORE_ITEMS = [
    { route: '/habits', icon: 'check-square', label: 'Habits' },
    { route: '/schedule', icon: 'calendar', label: 'Schedule' },
    { route: '/exercises', icon: 'library', label: 'Exercises' },
    { route: '/coach', icon: 'bot', label: 'Coach' },
    { route: '/achievements', icon: 'trophy', label: 'Achievements' },
    { route: '/settings', icon: 'settings', label: 'Settings' }
  ];

  function render() {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.id = 'bottom-nav';
    nav.innerHTML = TABS.map(tab => `
      <button class="nav-item" data-route="${tab.route}" id="nav-${tab.label.toLowerCase()}" aria-label="${tab.label}">
        <span class="nav-icon"><i data-lucide="${tab.icon}"></i></span>
        <span class="nav-label">${tab.label}</span>
      </button>
    `).join('');

    nav.addEventListener('click', (e) => {
      const item = e.target.closest('.nav-item');
      if (!item) return;

      const route = item.dataset.route;
      Animations.haptic('light');

      if (route === '/more') {
        showMoreMenu();
        return;
      }

      Router.navigate(route);
    });

    return nav;
  }

  function showMoreMenu() {
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (!overlay || !sheet) return;

    sheet.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <h3 class="modal-title">More</h3>
        <button class="modal-close" id="modal-close-btn"><i data-lucide="x" style="width:18px;height:18px;"></i></button>
      </div>
      <div class="modal-body">
        <div style="display:flex;flex-direction:column;gap:4px;">
          ${MORE_ITEMS.map(item => `
            <button class="settings-item" data-route="${item.route}" style="border:none;background:var(--glass-bg);border-radius:var(--radius-md);cursor:pointer;width:100%;">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:var(--accent-bg);color:var(--accent);">
                  <i data-lucide="${item.icon}" style="width:20px;height:20px;"></i>
                </div>
                <span class="settings-item-label">${item.label}</span>
              </div>
              <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-muted);"></i>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    overlay.classList.add('active');
    sheet.classList.add('active');

    if (window.lucide) lucide.createIcons();

    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn?.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    sheet.querySelectorAll('[data-route]').forEach(btn => {
      btn.addEventListener('click', () => {
        const route = btn.dataset.route;
        closeModal();
        Router.navigate(route);
      });
    });
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    overlay?.classList.remove('active');
    sheet?.classList.remove('active');
  }

  return { render, showMoreMenu, closeModal };
})();
