/* ============================================================
   PROJECT PRIME — Reusable Card Component
   ============================================================ */
window.CardComponent = (() => {
  function glass(content, className = '') {
    return `<div class="glass-card ${className}">${content}</div>`;
  }
  function stat(icon, value, label, change = null, iconBg = 'var(--accent-bg)', iconColor = 'var(--accent)') {
    return `
      <div class="stat-card">
        <div class="stat-icon" style="background:${iconBg};color:${iconColor};">
          <i data-lucide="${icon}" style="width:20px;height:20px;"></i>
        </div>
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
        ${change !== null ? `<div class="stat-change ${change >= 0 ? 'positive' : 'negative'}">${change >= 0 ? '↑' : '↓'} ${Math.abs(change)}</div>` : ''}
      </div>`;
  }
  return { glass, stat };
})();
