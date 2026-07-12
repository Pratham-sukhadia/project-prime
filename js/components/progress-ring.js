/* ============================================================
   PROJECT PRIME — Progress Ring Component
   ============================================================ */
window.ProgressRing = (() => {
  function render(percentage, size = 80, strokeWidth = 6, color = 'var(--accent)', label = '', value = '') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    return `
      <div class="progress-ring-container" style="width:${size}px;height:${size}px;">
        <svg width="${size}" height="${size}">
          <circle class="progress-ring-bg" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"/>
          <circle class="progress-ring-fill" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}" stroke="${color}"
            style="stroke-dasharray:${circumference};stroke-dashoffset:${offset};--ring-circumference:${circumference};--ring-offset:${offset};"/>
        </svg>
        <div class="progress-ring-content">
          <div class="progress-ring-value" style="font-size:${size > 70 ? '16px' : '12px'};">${value || Math.round(percentage) + '%'}</div>
          ${label ? `<div class="progress-ring-label">${label}</div>` : ''}
        </div>
      </div>`;
  }
  return { render };
})();
