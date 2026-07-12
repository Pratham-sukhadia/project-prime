/* ============================================================
   PROJECT PRIME — Habit Check Component
   ============================================================ */
window.HabitCheckComponent = (() => {
  function render(habit, completed = false) {
    return `
      <div class="habit-item ${completed ? 'completed' : ''}" data-habit="${habit.id}" onclick="HabitCheckComponent.toggle('${habit.id}')">
        <div class="habit-checkbox">${completed ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12" class="check-animate"/></svg>' : ''}</div>
        <div class="habit-info">
          <div class="habit-name">${habit.icon} ${habit.name}</div>
          ${habit.detail ? `<div class="habit-detail">${habit.detail}</div>` : ''}
        </div>
      </div>`;
  }

  async function toggle(habitId) {
    Animations.haptic('light');
    const today = await PrimeStore.getTodayHabits();
    const habits = today?.habits || {};
    habits[habitId] = !habits[habitId];
    await PrimeStore.saveTodayHabits(habits);

    const el = document.querySelector(`[data-habit="${habitId}"]`);
    if (el) {
      el.classList.toggle('completed');
      const checkbox = el.querySelector('.habit-checkbox');
      if (habits[habitId]) {
        checkbox.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12" class="check-animate"/></svg>';
        Animations.pulse(el);
      } else {
        checkbox.innerHTML = '';
      }
    }

    // Update completion ring if on habits page
    updateCompletionRing();
  }

  function updateCompletionRing() {
    // Will be handled by habits page refresh
    if (window.HabitsPage && HabitsPage.refreshCompletion) {
      HabitsPage.refreshCompletion();
    }
  }

  return { render, toggle };
})();
