/* ============================================================
   PROJECT PRIME — Main Application
   Initialization, theme management, route registration
   ============================================================ */

window.App = (() => {
  let deferredInstallPrompt = null;

  async function init() {
    console.log('🟢 Project Prime — Initializing...');

    // 1. Initialize IndexedDB
    try {
      await PrimeStore.init();
      console.log('✅ Database initialized');
    } catch (err) {
      console.error('❌ Database failed:', err);
    }

    // 2. Apply saved theme
    await applyTheme();

    // 3. Register routes
    registerRoutes();

    // 4. Render bottom navigation
    const navEl = NavComponent.render();
    document.body.appendChild(navEl);

    // 5. Initialize Lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }

    // 6. Register service worker
    registerServiceWorker();

    // 7. Handle PWA install prompt
    handleInstallPrompt();

    // 8. Start router
    Router.init();

    console.log('✅ Project Prime — Ready!');
  }

  function registerRoutes() {
    Router.register('/dashboard', DashboardPage);
    Router.register('/workout', WorkoutPage);
    Router.register('/nutrition', NutritionPage);
    Router.register('/progress', ProgressPage);
    Router.register('/habits', HabitsPage);
    Router.register('/schedule', SchedulePage);
    Router.register('/exercises', ExerciseLibPage);
    Router.register('/coach', CoachPage);
    Router.register('/settings', SettingsPage);
    Router.register('/achievements', AchievementsPage);
  }

  async function applyTheme() {
    const theme = await PrimeStore.getSetting('theme', 'dark');
    const accent = await PrimeStore.getSetting('accent', 'emerald');

    document.documentElement.setAttribute('data-theme', theme);
    if (accent && accent !== 'emerald') {
      document.documentElement.setAttribute('data-accent', accent);
    }

    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#0a0a0f' : '#f8fafc';
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('✅ Service Worker registered:', reg.scope);

            // Check for updates
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  ToastComponent.info('🔄 Update Available', 'Refresh to get the latest version');
                }
              });
            });
          })
          .catch((err) => {
            console.warn('⚠️ Service Worker registration failed:', err);
          });
      });
    }
  }

  function handleInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;

      // Show install banner after 3 seconds
      setTimeout(() => {
        if (deferredInstallPrompt) {
          showInstallBanner();
        }
      }, 3000);
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      ToastComponent.success('✅ App Installed!', 'Project Prime is now on your home screen');
    });
  }

  function showInstallBanner() {
    const banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.style.cssText = `
      position: fixed; bottom: 88px; left: 50%; transform: translateX(-50%);
      width: calc(100% - 40px); max-width: 440px;
      background: var(--bg-elevated); border: 1px solid var(--accent-border);
      border-radius: var(--radius-xl); padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
      box-shadow: var(--shadow-xl); z-index: 500;
      animation: card-enter 0.5s var(--ease-out) forwards;
    `;
    banner.innerHTML = `
      <span style="font-size:28px;">📱</span>
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:600;color:var(--text-primary);">Install Project Prime</div>
        <div style="font-size:12px;color:var(--text-secondary);">Add to home screen for the best experience</div>
      </div>
      <button class="btn btn-sm btn-primary" onclick="App.installPWA()">Install</button>
      <button class="btn btn-sm btn-ghost" onclick="this.parentElement.remove()" style="min-height:28px;padding:4px;">✕</button>
    `;
    document.body.appendChild(banner);
  }

  async function installPWA() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const result = await deferredInstallPrompt.userChoice;
    console.log('Install prompt result:', result.outcome);
    deferredInstallPrompt = null;
    document.getElementById('install-banner')?.remove();
  }

  async function toggleTheme() {
    const current = await PrimeStore.getSetting('theme', 'dark');
    const next = current === 'dark' ? 'light' : 'dark';
    await PrimeStore.setSetting('theme', next);
    document.documentElement.setAttribute('data-theme', next);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = next === 'dark' ? '#0a0a0f' : '#f8fafc';
    
    // Update Lucide icons if any changed
    if (window.lucide) {
      setTimeout(() => lucide.createIcons(), 50);
    }
  }

  return { init, installPWA, applyTheme, toggleTheme };
})();

// Boot the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
