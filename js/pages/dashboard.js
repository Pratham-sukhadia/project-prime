/* ============================================================
   PROJECT PRIME — Dashboard Page
   ============================================================ */

window.DashboardPage = (() => {
  async function render() {
    const greeting = DateUtils.getGreeting();
    const dayName = DateUtils.dayName();
    const quote = QuoteData.getTodayQuote();
    const todayProgram = WorkoutData.getTodayProgram();
    const journeyDay = DateUtils.getJourneyDay();
    const week = DateUtils.getJourneyWeek();

    // Load data
    const weight = await PrimeStore.getLatestWeight();
    const waterData = await PrimeStore.getTodayWater();
    const nutritionData = await PrimeStore.getTodayNutrition();
    const habitData = await PrimeStore.getTodayHabits();
    const workoutStreak = await PrimeStore.getStreak('workout');
    const todayWorkout = await PrimeStore.getTodayWorkout();

    const waterGlasses = waterData?.glasses || 0;
    const waterMl = waterGlasses * 250;
    const waterPct = Math.min(100, Math.round((waterMl / MealData.WATER_TARGET_ML) * 100));

    const calsEaten = nutritionData?.totalCals || 0;
    const calTarget = MealData.CALORIE_TARGET.mid;
    const calPct = Math.min(100, Math.round((calsEaten / calTarget) * 100));

    const proteinEaten = nutritionData?.totalProtein || 0;
    const proteinTarget = MealData.PROTEIN_TARGET.mid;
    const proteinPct = Math.min(100, Math.round((proteinEaten / proteinTarget) * 100));

    const weekDates = DateUtils.getWeekDates();
    const today = DateUtils.todayKey();

    return `
      <div class="page" id="dashboard-page">
        <!-- Greeting -->
        <div class="dashboard-greeting mb-6 flex justify-between items-start">
          <div>
            <div class="greeting-text">${greeting}, <span class="text-gradient">Pratham</span></div>
            <div class="greeting-sub">${dayName} • Day ${journeyDay} • Week ${week} of 12</div>
          </div>
          <button class="btn btn-ghost" onclick="App.toggleTheme()" style="padding:8px; border-radius:50%; background:var(--glass-bg); border:1px solid var(--glass-border);">
            <i data-lucide="sun-moon" style="width:20px;height:20px;"></i>
          </button>
        </div>

        <!-- Quote -->
        <div class="dashboard-quote mb-6 card-enter stagger-1">
          <p>"${quote.text}"</p>
          <div class="text-xs text-muted mt-2">— ${quote.author}</div>
        </div>

        <!-- Progress Rings -->
        <div class="rings-row card-enter stagger-2">
          <div class="ring-card">
            ${ProgressRing.render(calPct, 72, 5, '#f59e0b', 'Cals', calsEaten)}
            <span class="ring-label">/ ${calTarget}</span>
          </div>
          <div class="ring-card">
            ${ProgressRing.render(proteinPct, 72, 5, '#8b5cf6', 'Protein', proteinEaten + 'g')}
            <span class="ring-label">/ ${proteinTarget}g</span>
          </div>
          <div class="ring-card">
            ${ProgressRing.render(waterPct, 72, 5, '#06b6d4', 'Water', (waterMl / 1000).toFixed(1) + 'L')}
            <span class="ring-label">/ 4.5L</span>
          </div>
        </div>

        <!-- Today's Workout -->
        <div class="section card-enter stagger-3">
          <div class="section-header">
            <h3 class="section-title">Today's Workout</h3>
            <button class="section-action" onclick="Router.navigate('/workout')">Start →</button>
          </div>
          <div class="glass-card" onclick="Router.navigate('/workout')" style="cursor:pointer;">
            <div class="flex items-center gap-3 mb-2">
              <span style="font-size:28px;">${todayProgram.emoji}</span>
              <div>
                <div class="font-semibold">${todayProgram.name}</div>
                <div class="text-sm text-secondary">${todayProgram.focus}</div>
              </div>
            </div>
            <div class="flex gap-2 flex-wrap mt-3">
              ${todayProgram.muscles.map(m => `<span class="chip ${m}">${m.charAt(0).toUpperCase() + m.slice(1)}</span>`).join('')}
            </div>
            ${todayWorkout?.completed ? '<div class="badge success mt-3">✓ Completed</div>' : `<div class="text-xs text-muted mt-3">${todayProgram.estimatedTime || ''}</div>`}
          </div>
        </div>

        <!-- Weight Progress -->
        <div class="section card-enter stagger-4">
          <div class="section-header">
            <h3 class="section-title">Weight Progress</h3>
            <button class="section-action" onclick="DashboardPage.logWeight()">Log +</button>
          </div>
          <div class="glass-card dashboard-weight-card">
            <div class="weight-progress">
              <div class="weight-current">
                <div class="weight-value">${weight} kg</div>
                <div class="weight-label">Current</div>
              </div>
              <div style="flex:1;padding:0 16px;">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width:${Math.min(100, Math.round(((88 - weight) / (88 - 80)) * 100))}%;"></div>
                </div>
              </div>
              <div class="weight-goal">
                <div class="weight-value text-gradient">80 kg</div>
                <div class="weight-label">Goal</div>
              </div>
            </div>
            <div class="text-xs text-secondary text-center">${(weight - 80).toFixed(1)} kg to go</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="section card-enter stagger-5">
          <h3 class="section-title mb-4">Quick Actions</h3>
          <div class="quick-actions">
            <button class="quick-action-btn" onclick="DashboardPage.logWater()">
              <div class="qa-icon" style="background:rgba(6,182,212,0.15);color:#06b6d4;"><i data-lucide="droplets" style="width:22px;height:22px;"></i></div>
              <span class="qa-label">Log Water</span>
            </button>
            <button class="quick-action-btn" onclick="DashboardPage.logWeight()">
              <div class="qa-icon" style="background:rgba(139,92,246,0.15);color:#8b5cf6;"><i data-lucide="scale" style="width:22px;height:22px;"></i></div>
              <span class="qa-label">Log Weight</span>
            </button>
            <button class="quick-action-btn" onclick="Router.navigate('/habits')">
              <div class="qa-icon" style="background:rgba(16,185,129,0.15);color:#10b981;"><i data-lucide="check-square" style="width:22px;height:22px;"></i></div>
              <span class="qa-label">Habits</span>
            </button>
          </div>
        </div>

        <!-- Streak -->
        <div class="glass-card streak-card card-enter stagger-6">
          <span class="streak-fire ${workoutStreak.current >= 3 ? 'fire-animate' : ''}">🔥</span>
          <div class="streak-info">
            <div class="streak-count">${workoutStreak.current} Day Streak</div>
            <div class="streak-label">Best: ${workoutStreak.best} days • Keep it going!</div>
          </div>
        </div>

        <!-- Calendar Strip -->
        <div class="section card-enter stagger-7 mt-6">
          <h3 class="section-title mb-3">This Week</h3>
          <div class="calendar-strip">
            ${weekDates.map(d => {
              const key = DateUtils.formatKey(d);
              const isToday = key === today;
              return `
                <div class="calendar-day ${isToday ? 'today' : ''} ${false /* will check completion */ ? 'completed' : ''}">
                  <span class="day-name">${DateUtils.dayShort(d)}</span>
                  <span class="day-number">${d.getDate()}</span>
                  <span class="day-dot"></span>
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Today's Meals Preview -->
        <div class="section card-enter stagger-8">
          <div class="section-header">
            <h3 class="section-title">Nutrition</h3>
            <button class="section-action" onclick="Router.navigate('/nutrition')">View All →</button>
          </div>
          <div class="glass-card compact">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-medium">Calories</span>
              <span class="text-sm"><strong>${calsEaten}</strong> / ${calTarget} kcal</span>
            </div>
            <div class="progress-bar calories mb-3">
              <div class="progress-bar-fill" style="width:${calPct}%"></div>
            </div>
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-medium">Protein</span>
              <span class="text-sm"><strong>${proteinEaten}g</strong> / ${proteinTarget}g</span>
            </div>
            <div class="progress-bar protein">
              <div class="progress-bar-fill" style="width:${proteinPct}%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async function init() {
    // Page is rendered, any additional setup here
  }

  async function logWater() {
    Animations.haptic('light');
    const data = await PrimeStore.getTodayWater();
    const glasses = (data?.glasses || 0) + 1;
    await PrimeStore.saveTodayWater(glasses, glasses * 250);
    ToastComponent.success('💧 Water Logged', `${glasses} glasses (${(glasses * 0.25).toFixed(1)}L)`);
    Router.handleRoute(); // Refresh dashboard
  }

  function logWeight() {
    ModalComponent.open('Log Weight', `
      <div class="flex flex-col gap-4">
        <div>
          <label class="label">Weight (kg)</label>
          <input type="number" class="input" id="weight-input" step="0.1" min="50" max="150" placeholder="e.g. 86.5" inputmode="decimal">
        </div>
        <button class="btn btn-primary btn-full" onclick="DashboardPage.saveWeight()">Save Weight</button>
      </div>
    `);
    setTimeout(() => document.getElementById('weight-input')?.focus(), 300);
  }

  async function saveWeight() {
    const input = document.getElementById('weight-input');
    const weight = parseFloat(input?.value);
    if (!weight || weight < 50 || weight > 150) {
      Animations.shake(input);
      return;
    }
    await PrimeStore.logWeight(weight);
    ModalComponent.close();
    ToastComponent.success('⚖️ Weight Logged', `${weight} kg recorded`);
    Animations.haptic('success');
    Router.handleRoute();
  }

  return { render, init, logWater, logWeight, saveWeight };
})();
