/* ============================================================
   PROJECT PRIME — Progress Page
   ============================================================ */
window.ProgressPage = (() => {
  async function render() {
    const weightHistory = await PrimeStore.getWeightHistory();
    const latestWeight = await PrimeStore.getLatestWeight();
    const workoutStreak = await PrimeStore.getStreak('workout');
    const xp = await PrimeStore.getSetting('xp', 0);
    const totalWorkouts = (await PrimeStore.getAll(PrimeStore.STORES.workoutLogs)).filter(w => w.completed).length;

    return `
      <div class="page" id="progress-page">
        <div class="page-header"><h1 class="page-title">Progress</h1><p class="page-subtitle">Track your transformation</p></div>

        <!-- Key Stats -->
        <div class="progress-stats-row card-enter stagger-1">
          ${CardComponent.stat('scale', latestWeight + ' kg', 'Current Weight', null, 'rgba(139,92,246,0.15)', '#8b5cf6')}
          ${CardComponent.stat('flame', workoutStreak.current, 'Day Streak', null, 'rgba(239,68,68,0.15)', '#ef4444')}
          ${CardComponent.stat('dumbbell', totalWorkouts, 'Workouts', null, 'var(--accent-bg)', 'var(--accent)')}
        </div>

        <!-- Weight Chart -->
        <div class="glass-card progress-weight-chart card-enter stagger-2">
          <h3 class="section-title mb-3">Weight Trend</h3>
          <div style="height:200px;position:relative;">
            <canvas id="weight-chart"></canvas>
          </div>
          <div class="flex justify-between mt-3">
            <span class="text-xs text-muted">Start: 87.5 kg</span>
            <span class="text-xs text-accent font-semibold">Goal: 80 kg</span>
          </div>
        </div>

        <!-- Log Weight -->
        <div class="section card-enter stagger-3">
          <button class="btn btn-secondary btn-full" onclick="DashboardPage.logWeight()">
            <i data-lucide="plus" style="width:18px;height:18px;"></i> Log Today's Weight
          </button>
        </div>

        <!-- Body Measurements -->
        <div class="section card-enter stagger-4">
          <div class="section-header">
            <h3 class="section-title">Body Measurements</h3>
            <button class="section-action" onclick="ProgressPage.logMeasurements()">Update</button>
          </div>
          <div class="measurements-grid">
            ${['Chest', 'Waist', 'Arms', 'Shoulders', 'Thigh', 'Calves'].map(part => `
              <div class="measurement-card">
                <div class="measurement-value">—</div>
                <div class="measurement-label">${part}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Consistency -->
        <div class="glass-card card-enter stagger-5 text-center p-6">
          <div class="text-3xl font-bold text-gradient mb-2">${totalWorkouts > 0 ? Math.round((totalWorkouts / Math.max(1, DateUtils.getJourneyDay())) * 100) : 0}%</div>
          <div class="text-sm text-secondary">Workout Consistency</div>
          <div class="progress-bar mt-3"><div class="progress-bar-fill" style="width:${totalWorkouts > 0 ? Math.round((totalWorkouts / Math.max(1, DateUtils.getJourneyDay())) * 100) : 0}%;"></div></div>
        </div>

        <!-- Journey Progress -->
        <div class="glass-card card-enter stagger-6 mt-4">
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm font-semibold">12-Week Journey</span>
            <span class="text-xs text-secondary">Week ${DateUtils.getJourneyWeek()} / 12</span>
          </div>
          <div class="progress-bar"><div class="progress-bar-fill" style="width:${Math.min(100, Math.round((DateUtils.getJourneyWeek() / 12) * 100))}%;"></div></div>
          <div class="text-xs text-muted mt-2">${Math.max(0, 84 - DateUtils.getJourneyDay())} days remaining</div>
        </div>
      </div>
    `;
  }

  function init() {
    // Initialize weight chart
    PrimeStore.getWeightHistory().then(history => {
      if (history.length > 0) {
        const labels = history.map(h => DateUtils.formatDate(h.date, 'day-month'));
        const data = history.map(h => h.weight);
        ChartComponent.line('weight-chart', labels, data, 'Weight (kg)', '#8b5cf6');
      } else {
        const ctx = document.getElementById('weight-chart');
        if (ctx) {
          const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          ChartComponent.line('weight-chart', labels, [87.5, 87.5, 87.5, 87.5], 'Weight (kg)', '#8b5cf6');
        }
      }
    });
  }

  function logMeasurements() {
    ModalComponent.open('Body Measurements', `
      <div class="flex flex-col gap-3">
        ${['Chest', 'Waist', 'Arms', 'Shoulders', 'Thigh', 'Calves'].map(part => `
          <div><label class="label">${part} (cm)</label><input type="number" class="input" id="meas-${part.toLowerCase()}" step="0.5" inputmode="decimal" placeholder="cm"></div>
        `).join('')}
        <button class="btn btn-primary btn-full mt-2" onclick="ProgressPage.saveMeasurements()">Save Measurements</button>
      </div>
    `);
  }

  async function saveMeasurements() {
    const data = { date: DateUtils.todayKey() };
    ['chest', 'waist', 'arms', 'shoulders', 'thigh', 'calves'].forEach(part => {
      const val = document.getElementById(`meas-${part}`)?.value;
      if (val) data[part] = parseFloat(val);
    });
    await PrimeStore.put(PrimeStore.STORES.measurementLogs, data);
    ModalComponent.close();
    ToastComponent.success('📏 Measurements Saved');
    Router.handleRoute();
  }

  return { render, init, logMeasurements, saveMeasurements };
})();
