/* ============================================================
   PROJECT PRIME — Workout Timer Component
   ============================================================ */
window.TimerComponent = (() => {
  let interval = null;
  let seconds = 0;
  let isRest = false;
  let restCallback = null;

  function startWorkout() {
    seconds = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      seconds++;
      const el = document.getElementById('workout-timer');
      if (el) el.textContent = DateUtils.formatTime(seconds);
    }, 1000);
  }

  function stopWorkout() { clearInterval(interval); return seconds; }
  function getElapsed() { return seconds; }

  function startRest(duration, onComplete) {
    isRest = true;
    let remaining = duration;
    restCallback = onComplete;
    updateRestDisplay(remaining);
    showRestTimer(remaining);
    const restInt = setInterval(() => {
      remaining--;
      updateRestDisplay(remaining);
      if (remaining <= 0) {
        clearInterval(restInt);
        isRest = false;
        Animations.haptic('success');
        if (restCallback) restCallback();
        hideRestTimer();
      }
    }, 1000);
  }

  function updateRestDisplay(remaining) {
    const el = document.getElementById('rest-timer-value');
    if (el) el.textContent = DateUtils.formatTime(remaining);
  }

  function showRestTimer(duration) {
    let existing = document.getElementById('rest-timer-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'rest-timer-overlay';
    overlay.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--bg-elevated);border:1px solid var(--accent-border);border-radius:var(--radius-xl);padding:16px 24px;z-index:500;display:flex;align-items:center;gap:12px;box-shadow:var(--shadow-xl);';
    overlay.innerHTML = `<i data-lucide="timer" style="width:20px;height:20px;color:var(--accent);"></i><span style="font-size:var(--text-sm);color:var(--text-secondary);">Rest</span><span id="rest-timer-value" style="font-size:var(--text-lg);font-weight:700;font-variant-numeric:tabular-nums;color:var(--accent);">${DateUtils.formatTime(duration)}</span>`;
    document.body.appendChild(overlay);
    if (window.lucide) lucide.createIcons();
  }

  function hideRestTimer() {
    document.getElementById('rest-timer-overlay')?.remove();
  }

  return { startWorkout, stopWorkout, getElapsed, startRest };
})();
