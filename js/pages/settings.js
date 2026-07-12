/* ============================================================
   PROJECT PRIME — Settings Page
   ============================================================ */
window.SettingsPage = (() => {
  async function render() {
    const theme = await PrimeStore.getSetting('theme', 'dark');
    const accent = await PrimeStore.getSetting('accent', 'emerald');
    const ieltsToggle = await PrimeStore.getSetting('ieltsSaturday', false);

    return `
      <div class="page" id="settings-page">
        <!-- Profile -->
        <div class="glass-card settings-profile card-enter stagger-1">
          <div class="settings-avatar">P</div>
          <div class="settings-name">Pratham Sukhadia</div>
          <div class="settings-goal">Mission: 87 kg → 80 kg • 12-Week Journey</div>
        </div>

        <!-- Appearance -->
        <div class="settings-section card-enter stagger-2">
          <div class="settings-section-title">Appearance</div>
          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:rgba(139,92,246,0.15);color:#8b5cf6;"><i data-lucide="moon" style="width:18px;height:18px;"></i></div>
                <span class="settings-item-label">Dark Mode</span>
              </div>
              <button class="toggle ${theme === 'dark' ? 'active' : ''}" onclick="SettingsPage.toggleTheme()"></button>
            </div>
            <div class="settings-item" style="flex-direction:column;align-items:stretch;">
              <div class="flex justify-between items-center mb-3">
                <div class="settings-item-left">
                  <div class="settings-item-icon" style="background:var(--accent-bg);color:var(--accent);"><i data-lucide="palette" style="width:18px;height:18px;"></i></div>
                  <span class="settings-item-label">Accent Color</span>
                </div>
              </div>
              <div class="accent-picker">
                <div class="accent-option accent-emerald ${accent === 'emerald' ? 'selected' : ''}" onclick="SettingsPage.setAccent('emerald')"></div>
                <div class="accent-option accent-blue ${accent === 'blue' ? 'selected' : ''}" onclick="SettingsPage.setAccent('blue')"></div>
                <div class="accent-option accent-orange ${accent === 'orange' ? 'selected' : ''}" onclick="SettingsPage.setAccent('orange')"></div>
                <div class="accent-option accent-purple ${accent === 'purple' ? 'selected' : ''}" onclick="SettingsPage.setAccent('purple')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Schedule -->
        <div class="settings-section card-enter stagger-3">
          <div class="settings-section-title">Schedule</div>
          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:rgba(59,130,246,0.15);color:#3b82f6;"><i data-lucide="calendar" style="width:18px;height:18px;"></i></div>
                <span class="settings-item-label">IELTS This Saturday</span>
              </div>
              <button class="toggle ${ieltsToggle ? 'active' : ''}" onclick="SettingsPage.toggleIelts()"></button>
            </div>
          </div>
        </div>

        <!-- Data -->
        <div class="settings-section card-enter stagger-4">
          <div class="settings-section-title">Data Management</div>
          <div class="settings-card">
            <div class="settings-item" onclick="SettingsPage.exportData()">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:rgba(16,185,129,0.15);color:#10b981;"><i data-lucide="download" style="width:18px;height:18px;"></i></div>
                <span class="settings-item-label">Export Data (JSON)</span>
              </div>
              <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-muted);"></i>
            </div>
            <div class="settings-item" onclick="document.getElementById('import-file').click()">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:rgba(59,130,246,0.15);color:#3b82f6;"><i data-lucide="upload" style="width:18px;height:18px;"></i></div>
                <span class="settings-item-label">Import Data</span>
              </div>
              <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-muted);"></i>
            </div>
            <input type="file" id="import-file" accept=".json" style="display:none" onchange="SettingsPage.importData(this)">
            <div class="settings-item" onclick="SettingsPage.clearData()">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:rgba(239,68,68,0.15);color:#ef4444;"><i data-lucide="trash-2" style="width:18px;height:18px;"></i></div>
                <span class="settings-item-label" style="color:var(--danger);">Clear All Data</span>
              </div>
              <i data-lucide="chevron-right" style="width:16px;height:16px;color:var(--text-muted);"></i>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="settings-section card-enter stagger-5">
          <div class="settings-section-title">Notifications</div>
          <div class="settings-card">
            <div class="settings-item" onclick="Notifications.requestPermission().then(g => ToastComponent.show(g ? 'Notifications Enabled' : 'Permission Denied', '', g ? 'success' : 'warning'))">
              <div class="settings-item-left">
                <div class="settings-item-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;"><i data-lucide="bell" style="width:18px;height:18px;"></i></div>
                <span class="settings-item-label">Enable Notifications</span>
              </div>
              <span class="settings-item-value">${Notifications.isGranted() ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>

        <!-- About -->
        <div class="glass-card text-center p-5 card-enter stagger-6 mt-4">
          <div class="text-lg font-bold text-gradient mb-1">Project Prime</div>
          <div class="text-xs text-muted">v1.0.0 • Built with discipline</div>
          <div class="text-xs text-muted mt-1">For Pratham Sukhadia's 12-week journey</div>
        </div>
      </div>
    `;
  }

  async function toggleTheme() {
    const current = await PrimeStore.getSetting('theme', 'dark');
    const next = current === 'dark' ? 'light' : 'dark';
    await PrimeStore.setSetting('theme', next);
    document.documentElement.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#0a0a0f' : '#f8fafc';
    Router.handleRoute();
  }

  async function setAccent(color) {
    await PrimeStore.setSetting('accent', color);
    document.documentElement.setAttribute('data-accent', color === 'emerald' ? '' : color);
    if (color === 'emerald') document.documentElement.removeAttribute('data-accent');
    Router.handleRoute();
  }

  async function toggleIelts() {
    const current = await PrimeStore.getSetting('ieltsSaturday', false);
    await PrimeStore.setSetting('ieltsSaturday', !current);
    Router.handleRoute();
  }

  async function exportData() {
    const data = await PrimeStore.exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `project-prime-backup-${DateUtils.todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
    ToastComponent.success('📦 Data Exported');
  }

  async function importData(input) {
    const file = input.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      await PrimeStore.importAllData(data);
      ToastComponent.success('📥 Data Imported', 'All data restored successfully');
      Router.handleRoute();
    } catch (e) {
      ToastComponent.error('Import Failed', 'Invalid JSON file');
    }
  }

  function clearData() {
    if (confirm('⚠️ This will delete ALL your progress data. Are you sure?')) {
      PrimeStore.clearAllData().then(() => {
        ToastComponent.info('🗑️ Data Cleared');
        Router.handleRoute();
      });
    }
  }

  function init() {}
  return { render, init, toggleTheme, setAccent, toggleIelts, exportData, importData, clearData };
})();
