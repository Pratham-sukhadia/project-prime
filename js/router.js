/* ============================================================
   PROJECT PRIME — SPA Router
   Hash-based routing with page transitions
   ============================================================ */

window.Router = (() => {
  const routes = {};
  let currentRoute = null;
  let currentPage = null;
  const contentEl = () => document.getElementById('page-content');

  // Register a route
  function register(path, pageModule) {
    routes[path] = pageModule;
  }

  // Navigate to a route
  function navigate(path) {
    if (path === currentRoute) return;
    window.location.hash = path;
  }

  // Handle hash changes
  async function handleRoute() {
    const hash = window.location.hash.slice(1) || '/dashboard';
    const pageModule = routes[hash];

    if (!pageModule) {
      navigate('/dashboard');
      return;
    }

    const container = contentEl();
    if (!container) return;

    // Animate out current page
    if (currentPage) {
      container.classList.add('page-exit');
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Clear and render new page
    container.innerHTML = '';
    container.className = 'page-container';

    try {
      const pageEl = await pageModule.render();
      if (typeof pageEl === 'string') {
        container.innerHTML = pageEl;
      } else if (pageEl instanceof HTMLElement) {
        container.appendChild(pageEl);
      }

      // Initialize page logic
      if (pageModule.init) {
        await pageModule.init();
      }

      // Animate in
      container.classList.add('page-enter');
      setTimeout(() => container.classList.remove('page-enter'), 400);

      // Re-init Lucide icons for new content
      if (window.lucide) {
        lucide.createIcons();
      }

      // Animate cards with GSAP if available
      if (window.gsap) {
        gsap.from(container.querySelectorAll('.glass-card, .stat-card, .exercise-card, .meal-card, .habit-item, .achievement-card, .schedule-block, .lib-exercise-card'), {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }

    } catch (err) {
      console.error(`[Router] Failed to render ${hash}:`, err);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i data-lucide="alert-triangle"></i></div>
          <h3 class="empty-state-title">Something went wrong</h3>
          <p class="empty-state-text">Failed to load this page. Please try again.</p>
        </div>
      `;
    }

    currentRoute = hash;
    currentPage = pageModule;

    // Update nav
    updateNav(hash);
  }

  // Update bottom navigation active state
  function updateNav(hash) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const route = item.dataset.route;
      if (route === hash) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Get current route
  function current() {
    return currentRoute;
  }

  // Initialize router
  function init() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  return { register, navigate, init, current, handleRoute };
})();
