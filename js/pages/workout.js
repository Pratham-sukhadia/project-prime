/* ============================================================
   PROJECT PRIME — Workout Page
   ============================================================ */

window.WorkoutPage = (() => {
  let workoutStarted = false;
  let saturdayMode = 'evening'; // 'morning' or 'evening'

  async function render() {
    const program = WorkoutData.getTodayProgram();
    const todayData = await PrimeStore.getTodayWorkout();
    const overloadWeek = DateUtils.getProgressiveOverloadWeek();
    const weekMod = WorkoutData.WEEK_MODIFIERS[overloadWeek];
    const isSaturday = program.isSaturday;
    const dayIndex = new Date().getDay();

    let exercises, coreExercises, finisher;

    if (isSaturday) {
      const mode = saturdayMode === 'morning' ? program.morningQuick : program.eveningFull;
      exercises = mode.exercises;
      coreExercises = mode.core || [];
      finisher = saturdayMode === 'evening' ? mode.cardioFinish : null;
    } else {
      exercises = program.exercises || [];
      coreExercises = program.core || [];
      finisher = program.finisher;
    }

    const completedSets = todayData?.exercises || {};

    return `
      <div class="page" id="workout-page">
        <!-- Header -->
        <div class="glass-card workout-header-card card-enter">
          <div class="workout-day-name">${program.emoji} ${program.name}</div>
          <div class="workout-day-focus">${program.focus}</div>
          <div class="workout-muscles">
            ${program.muscles.map(m => `<span class="chip ${m}">${m.charAt(0).toUpperCase() + m.slice(1)}</span>`).join('')}
          </div>
          <div class="text-xs text-muted mt-2">Week ${DateUtils.getJourneyWeek()} • ${weekMod.label}</div>
        </div>

        ${isSaturday ? `
          <div class="saturday-mode-toggle">
            <button class="${saturdayMode === 'morning' ? 'active' : ''}" onclick="WorkoutPage.setMode('morning')">☀️ Quick (45 min)</button>
            <button class="${saturdayMode === 'evening' ? 'active' : ''}" onclick="WorkoutPage.setMode('evening')">🌙 Full (90 min)</button>
          </div>
          ${program.fastingDay ? '<div class="fasting-banner"><span class="fasting-icon">🔥</span><span class="fasting-text">Fasting Day — Stay hydrated, train smart</span></div>' : ''}
        ` : ''}

        ${program.isRecovery ? `
          <div class="glass-card mb-4" style="border-color:rgba(16,185,129,0.3);">
            <div class="flex items-center gap-3">
              <span style="font-size:24px;">🧘</span>
              <div>
                <div class="font-semibold text-accent">Recovery Day</div>
                <div class="text-sm text-secondary">Focus on stretching, mobility, and rest. One cheat meal allowed today!</div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Timer Bar -->
        <div class="workout-timer-bar">
          <div>
            <span class="text-xs text-secondary">Elapsed: </span>
            <span class="workout-elapsed" id="workout-timer">00:00</span>
          </div>
          <div class="workout-progress-text" id="workout-progress-text">
            ${exercises.length + coreExercises.length} exercises
          </div>
          ${!workoutStarted ? `<button class="btn btn-sm btn-primary" onclick="WorkoutPage.startTimer()">Start</button>` : `<button class="btn btn-sm btn-ghost" onclick="WorkoutPage.stopTimer()">Pause</button>`}
        </div>

        <!-- Warm-up -->
        ${program.warmup && program.warmup.length > 0 ? `
          <div class="workout-section-title">🔥 Warm-up</div>
          <div class="glass-card compact mb-4">
            ${program.warmup.map(w => `
              <div class="flex justify-between items-center py-2" style="border-bottom:1px solid var(--glass-border);">
                <span class="text-sm">${w.name}</span>
                <span class="text-xs text-secondary">${w.sets ? `${w.sets}×${w.reps}` : w.duration}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Exercises -->
        <div class="workout-section-title">💪 Main Exercises</div>
        ${exercises.map((ex, i) => renderExerciseCard(ex, i + 1, completedSets[ex.id], overloadWeek)).join('')}

        <!-- Core -->
        ${coreExercises.length > 0 ? `
          <div class="workout-section-title">🎯 Core</div>
          ${coreExercises.map((ex, i) => renderExerciseCard(ex, exercises.length + i + 1, completedSets[ex.id], overloadWeek)).join('')}
        ` : ''}

        <!-- Finisher -->
        ${finisher ? `
          <div class="workout-section-title">🏁 Finisher</div>
          <div class="glass-card">
            <div class="font-semibold mb-2">${finisher.name}</div>
            ${finisher.type === 'hiit' ? `
              <div class="text-sm text-secondary mb-3">${finisher.rounds} rounds • ${finisher.totalTime}</div>
              ${finisher.exercises.map(f => `
                <div class="flex justify-between items-center py-1">
                  <span class="text-sm">${f.name}</span>
                  <span class="text-xs text-secondary">${f.duration}</span>
                </div>
              `).join('')}
            ` : `
              <div class="text-sm text-secondary">${finisher.duration} ${finisher.details ? '• ' + finisher.details : ''}</div>
            `}
          </div>
        ` : ''}

        <!-- Complete Button -->
        <button class="btn btn-primary btn-full workout-complete-btn" id="complete-workout-btn" onclick="WorkoutPage.completeWorkout()">
          ${todayData?.completed ? '✅ Workout Completed!' : '🎉 Complete Workout'}
        </button>
      </div>
    `;
  }

  function renderExerciseCard(ex, num, savedData, weekNum) {
    const weekMod = WorkoutData.WEEK_MODIFIERS[weekNum];
    const sets = ex.sets || 3;
    const setRows = [];

    for (let s = 1; s <= sets; s++) {
      const savedWeight = savedData?.sets?.[s]?.weight || ex.weight || '';
      const savedReps = savedData?.sets?.[s]?.reps || '';
      const done = savedData?.sets?.[s]?.done || false;
      setRows.push(`
        <div class="set-row">
          <span class="set-label">S${s}</span>
          <input type="number" class="set-input" placeholder="${ex.reps}" data-exercise="${ex.id}" data-set="${s}" data-field="reps" value="${savedReps}" inputmode="numeric">
          <input type="number" class="set-input" placeholder="${savedWeight || '—'}kg" data-exercise="${ex.id}" data-set="${s}" data-field="weight" value="${savedWeight}" inputmode="decimal" step="0.5">
          <button class="set-check ${done ? 'completed' : ''}" data-exercise="${ex.id}" data-set="${s}" onclick="WorkoutPage.toggleSet('${ex.id}', ${s}, this)">
            ${done ? '✓' : ''}
          </button>
        </div>
      `);
    }

    return `
      <div class="exercise-card" id="exercise-${ex.id}">
        <div class="exercise-card-header" onclick="WorkoutPage.toggleDetails('${ex.id}')">
          <div class="exercise-card-number">${num}</div>
          <div class="exercise-card-info">
            <div class="exercise-card-name">${ex.name}</div>
            <div class="exercise-card-meta">
              <span class="chip ${ex.muscleGroup}" style="font-size:10px;padding:1px 6px;">${ex.muscle}</span>
              <span>${sets} × ${ex.reps}</span>
            </div>
          </div>
        </div>

        <div class="exercise-card-sets">
          <div class="set-row">
            <span class="set-label" style="color:var(--text-muted);">Set</span>
            <span class="text-xs text-muted text-center">Reps</span>
            <span class="text-xs text-muted text-center">Weight</span>
            <span class="text-xs text-muted text-center">✓</span>
          </div>
          ${setRows.join('')}
        </div>

        <div class="exercise-card-rest">
          <i data-lucide="timer" style="width:14px;height:14px;"></i>
          <span>Rest: ${ex.rest || 60}s</span>
          <button class="btn btn-sm btn-ghost" onclick="TimerComponent.startRest(${ex.rest || 60})" style="margin-left:auto;min-height:28px;padding:4px 10px;">Start Timer</button>
        </div>

        <div class="exercise-card-details" id="details-${ex.id}">
          ${ex.tips ? `<div class="mb-3"><div class="text-xs font-semibold text-accent mb-1">💡 Tips</div><div class="text-xs text-secondary">${ex.tips}</div></div>` : ''}
          ${ex.mistakes ? `<div class="mb-3"><div class="text-xs font-semibold" style="color:var(--danger);">⚠️ Common Mistakes</div><div class="text-xs text-secondary">${ex.mistakes}</div></div>` : ''}
          ${ex.activation ? `<div class="mb-3"><div class="text-xs font-semibold text-muted">🎯 Activation</div><div class="text-xs text-secondary">${ex.activation}</div></div>` : ''}
          ${ex.alternatives ? `<div><div class="text-xs font-semibold text-muted">🔄 Alternatives</div><div class="text-xs text-secondary">${ex.alternatives.join(', ')}</div></div>` : ''}
          ${weekNum === 4 ? '<div class="badge warning mt-3">⚡ Deload Week — Reduce weight 20-30%</div>' : ''}
        </div>
      </div>
    `;
  }

  function toggleDetails(exerciseId) {
    const card = document.getElementById(`exercise-${exerciseId}`);
    card?.classList.toggle('expanded');
  }

  async function toggleSet(exerciseId, setNum, btn) {
    Animations.haptic('light');
    const isDone = btn.classList.toggle('completed');
    btn.textContent = isDone ? '✓' : '';

    // Save to store
    const todayData = await PrimeStore.getTodayWorkout() || { exercises: {} };
    if (!todayData.exercises[exerciseId]) todayData.exercises[exerciseId] = { sets: {} };
    if (!todayData.exercises[exerciseId].sets[setNum]) todayData.exercises[exerciseId].sets[setNum] = {};

    todayData.exercises[exerciseId].sets[setNum].done = isDone;

    // Also save the input values
    const repsInput = document.querySelector(`input[data-exercise="${exerciseId}"][data-set="${setNum}"][data-field="reps"]`);
    const weightInput = document.querySelector(`input[data-exercise="${exerciseId}"][data-set="${setNum}"][data-field="weight"]`);
    if (repsInput?.value) todayData.exercises[exerciseId].sets[setNum].reps = parseInt(repsInput.value);
    if (weightInput?.value) todayData.exercises[exerciseId].sets[setNum].weight = parseFloat(weightInput.value);

    await PrimeStore.saveTodayWorkout(todayData);

    if (isDone) {
      Animations.pulse(btn);
      // Auto-start rest timer
      const card = document.getElementById(`exercise-${exerciseId}`);
      const restTime = parseInt(card?.querySelector('.exercise-card-rest span')?.textContent?.match(/\d+/)?.[0]) || 60;
      TimerComponent.startRest(restTime);
    }
  }

  function startTimer() {
    workoutStarted = true;
    TimerComponent.startWorkout();
    const btn = document.querySelector('.workout-timer-bar .btn');
    if (btn) {
      btn.textContent = 'Pause';
      btn.className = 'btn btn-sm btn-ghost';
      btn.onclick = () => stopTimer();
    }
  }

  function stopTimer() {
    workoutStarted = false;
    TimerComponent.stopWorkout();
  }

  async function completeWorkout() {
    const todayData = await PrimeStore.getTodayWorkout() || {};
    if (todayData.completed) {
      ToastComponent.info('Already completed', 'You\'ve already logged today\'s workout!');
      return;
    }

    const elapsed = TimerComponent.stopWorkout();
    todayData.completed = true;
    todayData.duration = elapsed;
    todayData.day = DateUtils.dayName();
    todayData.program = WorkoutData.getTodayProgram().name;
    await PrimeStore.saveTodayWorkout(todayData);

    // Update streak
    await PrimeStore.updateStreak('workout');

    // Award XP
    const settings = await PrimeStore.getSetting('xp', 0);
    await PrimeStore.setSetting('xp', settings + AchievementData.XP_REWARDS.completeWorkout);

    Animations.haptic('success');
    Animations.confetti(window.innerWidth / 2, window.innerHeight / 3, 40);
    ToastComponent.success('🎉 Workout Complete!', `Great work, Pratham! ${DateUtils.formatDuration(Math.round(elapsed / 60))} logged.`);

    const btn = document.getElementById('complete-workout-btn');
    if (btn) {
      btn.textContent = '✅ Workout Completed!';
      btn.classList.add('completed');
    }
  }

  function setMode(mode) {
    saturdayMode = mode;
    Router.handleRoute();
  }

  function init() {
    // Add input change handlers for auto-saving
    document.querySelectorAll('.set-input').forEach(input => {
      input.addEventListener('change', async () => {
        const exerciseId = input.dataset.exercise;
        const setNum = parseInt(input.dataset.set);
        const field = input.dataset.field;
        const value = parseFloat(input.value);

        const todayData = await PrimeStore.getTodayWorkout() || { exercises: {} };
        if (!todayData.exercises[exerciseId]) todayData.exercises[exerciseId] = { sets: {} };
        if (!todayData.exercises[exerciseId].sets[setNum]) todayData.exercises[exerciseId].sets[setNum] = {};
        todayData.exercises[exerciseId].sets[setNum][field] = value;
        await PrimeStore.saveTodayWorkout(todayData);
      });
    });
  }

  return { render, init, toggleDetails, toggleSet, startTimer, stopTimer, completeWorkout, setMode };
})();
