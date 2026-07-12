/* ============================================================
   PROJECT PRIME — Modal / Bottom Sheet Component
   ============================================================ */
window.ModalComponent = (() => {
  function open(title, bodyHtml) {
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" onclick="ModalComponent.close()"><i data-lucide="x" style="width:18px;height:18px;"></i></button>
      </div>
      <div class="modal-body">${bodyHtml}</div>`;
    overlay.classList.add('active');
    sheet.classList.add('active');
    if (window.lucide) lucide.createIcons();
    overlay.onclick = () => ModalComponent.close();
  }
  function close() {
    document.getElementById('modal-overlay')?.classList.remove('active');
    document.getElementById('modal-sheet')?.classList.remove('active');
  }
  return { open, close };
})();
