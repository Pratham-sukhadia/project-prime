/* ============================================================
   PROJECT PRIME — Achievements Page
   ============================================================ */
window.AchievementsPage = (() => {
  async function render() {
    const xp = await PrimeStore.getSetting('xp', 0);
    const level = AchievementData.getLevel(xp);
    const nextLevel = AchievementData.getNextLevel(xp);
    const progress = AchievementData.getLevelProgress(xp);
    const unlocked = await PrimeStore.getAll(PrimeStore.STORES.achievements);
    const unlockedIds = new Set(unlocked.map(a => a.id));

    return `
      <div class="page" id="achievements-page">
        <div class="page-header"><h1 class="page-title">Achievements</h1><p class="page-subtitle">Level up your journey</p></div>

        <!-- Level Card -->
        <div class="glass-card level-card card-enter stagger-1">
          <div class="level-badge">${level.emoji}</div>
          <div class="level-name" style="color:${level.color};">${level.name}</div>
          <div class="level-xp">${xp} XP</div>
          ${nextLevel ? `
            <div class="level-progress mt-4">
              <div class="progress-bar"><div class="progress-bar-fill" style="width:${progress}%;"></div></div>
              <div class="flex justify-between mt-2">
                <span class="text-xs text-muted">${level.name}</span>
                <span class="text-xs text-secondary">${nextLevel.minXP - xp} XP to ${nextLevel.name} ${nextLevel.emoji}</span>
              </div>
            </div>
          ` : '<div class="text-sm text-accent mt-2">🎉 Maximum level reached!</div>'}
        </div>

        <!-- XP Rewards Info -->
        <div class="glass-card compact card-enter stagger-2">
          <div class="text-xs font-semibold text-tertiary uppercase mb-3" style="letter-spacing:0.05em;">How to earn XP</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            ${Object.entries(AchievementData.XP_REWARDS).slice(0, 8).map(([key, val]) => `
              <div class="flex justify-between text-xs py-1">
                <span class="text-secondary">${formatRewardName(key)}</span>
                <span class="text-accent font-semibold">+${val}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Achievements Grid -->
        <div class="section mt-6 card-enter stagger-3">
          <h3 class="section-title mb-4">🏅 Badges (${unlockedIds.size}/${AchievementData.ACHIEVEMENTS.length})</h3>
          <div class="achievements-grid">
            ${AchievementData.ACHIEVEMENTS.map(a => `
              <div class="achievement-card ${unlockedIds.has(a.id) ? 'unlocked' : 'locked'}">
                <div class="achievement-emoji">${a.emoji}</div>
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
                <div class="achievement-xp">${unlockedIds.has(a.id) ? '✅ Unlocked' : `🔒 ${a.xp} XP`}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function formatRewardName(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  }

  function init() {}
  return { render, init };
})();
