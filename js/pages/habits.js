/* ============================================================
   PROJECT PRIME — Habits Page
   ============================================================ */
window.HabitsPage = (() => {
  const HABITS = {
    fitness: [
      { id: 'workout', name: 'Workout', icon: '💪', detail: 'Complete today\'s session' },
      { id: 'steps', name: '10k Steps', icon: '🚶', detail: 'Walk 10,000 steps' },
      { id: 'stretching', name: 'Stretching', icon: '🧘', detail: '10 min stretching' },
      { id: 'walking', name: 'Night Walk', icon: '🌙', detail: '60-90 min evening walk' }
    ],
    nutrition: [
      { id: 'water', name: 'Water 4.5L', icon: '💧', detail: '18 glasses minimum' },
      { id: 'calories', name: 'Hit Calories', icon: '🔥', detail: '2200-2400 kcal' },
      { id: 'protein', name: 'Hit Protein', icon: '🥩', detail: '140-160g protein' },
      { id: 'no-sugar', name: 'No Sugar', icon: '🚫', detail: 'Zero added sugar' }
    ],
    wellness: [
      { id: 'sleep', name: '8hr Sleep', icon: '😴', detail: 'Sleep before 11 PM' },
      { id: 'meditation', name: 'Meditation', icon: '🧠', detail: '10 min mindfulness' },
      { id: 'reading', name: 'Reading', icon: '📖', detail: '15 min reading' },
      { id: 'skincare', name: 'Skincare', icon: '✨', detail: 'Face wash + SPF + moisturizer' }
    ],
    productivity: [
      { id: 'ielts', name: 'IELTS Study', icon: '📚', detail: 'Study session complete' },
      { id: 'office', name: 'Office Work', icon: '💼', detail: 'Productive work day' },
      { id: 'mood', name: 'Good Mood', icon: '😊', detail: 'Rate: Tap for mood' },
      { id: 'weight-log', name: 'Log Weight', icon: '⚖️', detail: 'Daily weigh-in' }
    ]
  };

  async function render() {
    const todayHabits = await PrimeStore.getTodayHabits();
    const habits = todayHabits?.habits || {};
    const totalHabits = Object.values(HABITS).flat().length;
    const completed = Object.values(habits).filter(Boolean).length;
    const pct = Math.round((completed / totalHabits) * 100);

    return `
      <div class="page" id="habits-page">
        <div class="page-header"><h1 class="page-title">Daily Habits</h1><p class="page-subtitle">${DateUtils.dayName()} • ${DateUtils.formatDate(new Date(), 'short')}</p></div>

        <!-- Completion Ring -->
        <div class="habits-progress-header card-enter stagger-1">
          ${ProgressRing.render(pct, 100, 7, 'var(--accent)', '', completed + '/' + totalHabits)}
          <div class="habits-completion-text">${pct}% completed today</div>
        </div>

        ${Object.entries(HABITS).map(([category, items], catIdx) => `
          <div class="habits-category-title card-enter stagger-${catIdx + 2}">${getCategoryIcon(category)} ${category}</div>
          <div class="habit-grid card-enter stagger-${catIdx + 2}">
            ${items.map(h => HabitCheckComponent.render(h, habits[h.id] || false)).join('')}
          </div>
        `).join('')}

        <!-- Skin Improvement Checklist -->
        <div class="section mt-6 card-enter stagger-6">
          <h3 class="section-title mb-3">✨ Skin Improvement Checklist</h3>
          <div class="glass-card skin-checklist">
            <div class="skin-checklist-items">
              ${['Water (4.5L)', 'Vitamin C Fruits', 'Carrots / Beetroot', '8hr Sleep', 'Morning Sunlight', 'Face Wash', 'Moisturizer', 'SPF Sunscreen', 'No Sugar', 'Green Tea', 'Stress Reduction'].map((item, i) => `
                <div class="skin-item" onclick="this.classList.toggle('completed')">
                  <div class="habit-checkbox" style="width:20px;height:20px;border-radius:4px;"></div>
                  <span class="text-sm">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getCategoryIcon(cat) {
    const icons = { fitness: '💪', nutrition: '🍽️', wellness: '🧠', productivity: '📈' };
    return icons[cat] || '📋';
  }

  async function refreshCompletion() {
    const todayHabits = await PrimeStore.getTodayHabits();
    const habits = todayHabits?.habits || {};
    const total = Object.values(HABITS).flat().length;
    const completed = Object.values(habits).filter(Boolean).length;
    // Update would need page re-render or direct DOM manipulation
  }

  function init() {}
  return { render, init, refreshCompletion, HABITS };
})();
