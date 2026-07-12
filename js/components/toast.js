/* ============================================================
   PROJECT PRIME — Toast Notification Component
   ============================================================ */
window.ToastComponent = (() => {
  function show(title, message = '', type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: 'check-circle', warning: 'alert-triangle', danger: 'x-circle', info: 'info' };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon ${type}"><i data-lucide="${icons[type] || 'info'}" style="width:20px;height:20px;"></i></div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  function success(title, message) { show(title, message, 'success'); }
  function warning(title, message) { show(title, message, 'warning'); }
  function error(title, message) { show(title, message, 'danger'); }
  function info(title, message) { show(title, message, 'info'); }
  return { show, success, warning, error, info };
})();
