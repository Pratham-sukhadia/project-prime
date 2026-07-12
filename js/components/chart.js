/* ============================================================
   PROJECT PRIME — Chart.js Wrapper
   ============================================================ */
window.ChartComponent = (() => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(17,17,24,0.9)', titleColor: '#f1f5f9', bodyColor: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, cornerRadius: 8, padding: 12, titleFont: { family: 'Inter', weight: '600' }, bodyFont: { family: 'Inter' } } },
    scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } } } }
  };

  function line(canvasId, labels, data, label = '', color = '#10b981') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ label, data, borderColor: color, backgroundColor: color + '20', fill: true, tension: 0.4, pointBackgroundColor: color, pointBorderColor: color, pointRadius: 4, pointHoverRadius: 6, borderWidth: 2 }] },
      options: { ...defaultOptions, scales: { ...defaultOptions.scales, y: { ...defaultOptions.scales.y, beginAtZero: false } } }
    });
  }

  function doughnut(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, cutout: '75%' }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: defaultOptions.plugins.tooltip } }
    });
  }

  function bar(canvasId, labels, data, color = '#10b981') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ data, backgroundColor: color + '80', borderColor: color, borderWidth: 1, borderRadius: 6, barThickness: 20 }] },
      options: { ...defaultOptions, scales: { ...defaultOptions.scales, y: { ...defaultOptions.scales.y, beginAtZero: true } } }
    });
  }

  return { line, doughnut, bar, defaultOptions };
})();
