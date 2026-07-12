/* ============================================================
   PROJECT PRIME — Coach Page (Morning + Night Review)
   ============================================================ */
window.CoachPage = (() => {
  async function render() {
    const isMorning = DateUtils.isMorning();
    const isNight = DateUtils.isNight();
    const journeyDay = DateUtils.getJourneyDay();
    const greeting = DateUtils.getGreeting();
    const quote = QuoteData.getTodayQuote();
    const program = WorkoutData.getTodayProgram();
    const nightReview = await PrimeStore.get(PrimeStore.STORES.nightReviews, DateUtils.todayKey());

    return `
      <div class="page" id="coach-page">
        <!-- Greeting Card -->
        <div class="glass-card coach-greeting-card card-enter stagger-1">
          <div class="coach-day-count">Day ${journeyDay}</div>
          <div class="coach-greeting-text">${greeting}, Pratham</div>
          <div class="coach-greeting-sub">Week ${DateUtils.getJourneyWeek()} of your 12-week journey</div>
        </div>

        <!-- Quote -->
        <div class="dashboard-quote mt-4 card-enter stagger-2">
          <p>"${quote.text}"</p>
          <div class="text-xs text-muted mt-2">— ${quote.author}</div>
        </div>

        ${!isNight ? `
          <!-- Morning Coach -->
          <div class="section mt-6 card-enter stagger-3">
            <h3 class="section-title mb-3">☀️ Today's Game Plan</h3>
            <div class="glass-card coach-preview-card">
              <div class="coach-preview-title">Workout</div>
              <div class="flex items-center gap-3 mb-4">
                <span style="font-size:28px;">${program.emoji}</span>
                <div>
                  <div class="font-semibold">${program.name}</div>
                  <div class="text-sm text-secondary">${program.focus}</div>
                </div>
              </div>

              <div class="coach-preview-title mt-4">Targets</div>
              <div class="coach-targets">
                <div class="coach-target-item"><span class="coach-target-label">🔥 Calories</span><span class="coach-target-value">${MealData.CALORIE_TARGET.mid} kcal</span></div>
                <div class="coach-target-item"><span class="coach-target-label">🥩 Protein</span><span class="coach-target-value">${MealData.PROTEIN_TARGET.mid}g</span></div>
                <div class="coach-target-item"><span class="coach-target-label">💧 Water</span><span class="coach-target-value">4.5 Liters</span></div>
                <div class="coach-target-item"><span class="coach-target-label">😴 Sleep</span><span class="coach-target-value">8 Hours</span></div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-full btn-lg mt-4 card-enter stagger-4" onclick="Router.navigate('/workout')">
            💪 Let's Crush It
          </button>
        ` : ''}

        ${isNight ? `
          <!-- Night Review -->
          <div class="section mt-6 card-enter stagger-3">
            <h3 class="section-title mb-3">🌙 Night Review</h3>
            <div class="glass-card night-review-form">
              ${nightReview ? `
                <div class="text-center p-5">
                  <div style="font-size:48px;margin-bottom:12px;">✅</div>
                  <div class="font-semibold">Review Submitted</div>
                  <div class="text-sm text-secondary mt-2">Great job reflecting on your day, Pratham.</div>
                </div>
              ` : `
                <div class="review-item">
                  <span class="review-label">💪 Workout Completed?</span>
                  <button class="toggle" id="review-workout" onclick="this.classList.toggle('active')"></button>
                </div>
                <div class="review-item">
                  <span class="review-label">🔥 Calories Achieved?</span>
                  <button class="toggle" id="review-calories" onclick="this.classList.toggle('active')"></button>
                </div>
                <div class="review-item">
                  <span class="review-label">🥩 Protein Completed?</span>
                  <button class="toggle" id="review-protein" onclick="this.classList.toggle('active')"></button>
                </div>
                <div class="review-item">
                  <span class="review-label">💧 Water Completed?</span>
                  <button class="toggle" id="review-water" onclick="this.classList.toggle('active')"></button>
                </div>
                <div class="review-item">
                  <span class="review-label">😊 Mood</span>
                  <div class="emoji-picker" style="gap:8px;">
                    ${['😞', '😐', '🙂', '😊', '🤩'].map((e, i) => `<span class="emoji-option" data-mood="${i+1}" onclick="CoachPage.selectMood(this, ${i+1})" style="width:36px;height:36px;font-size:20px;">${e}</span>`).join('')}
                  </div>
                </div>
                <div class="review-item">
                  <span class="review-label">⚡ Energy</span>
                  <div class="star-rating">
                    ${[1,2,3,4,5].map(i => `<span class="star" data-energy="${i}" onclick="CoachPage.selectEnergy(${i})" style="cursor:pointer;font-size:20px;">★</span>`).join('')}
                  </div>
                </div>
                <div class="mt-4">
                  <label class="label">🎯 Tomorrow's Goal</label>
                  <input type="text" class="input" id="review-goal" placeholder="What's your #1 goal for tomorrow?">
                </div>
                <button class="btn btn-primary btn-full mt-4" onclick="CoachPage.submitReview()">Submit Review</button>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  let selectedMood = 0;
  let selectedEnergy = 0;

  function selectMood(el, mood) {
    document.querySelectorAll('.emoji-option').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    selectedMood = mood;
    Animations.haptic('light');
  }

  function selectEnergy(energy) {
    selectedEnergy = energy;
    document.querySelectorAll('.star').forEach((s, i) => {
      s.style.color = i < energy ? 'var(--warning)' : 'var(--text-muted)';
    });
    Animations.haptic('light');
  }

  async function submitReview() {
    const review = {
      date: DateUtils.todayKey(),
      workout: document.getElementById('review-workout')?.classList.contains('active'),
      calories: document.getElementById('review-calories')?.classList.contains('active'),
      protein: document.getElementById('review-protein')?.classList.contains('active'),
      water: document.getElementById('review-water')?.classList.contains('active'),
      mood: selectedMood,
      energy: selectedEnergy,
      goal: document.getElementById('review-goal')?.value || '',
      timestamp: Date.now()
    };

    await PrimeStore.put(PrimeStore.STORES.nightReviews, review);

    // Award XP
    const xp = await PrimeStore.getSetting('xp', 0);
    await PrimeStore.setSetting('xp', xp + AchievementData.XP_REWARDS.completeNightReview);

    Animations.haptic('success');
    ToastComponent.success('🌙 Review Submitted', 'Great job reflecting, Pratham! +20 XP');
    Router.handleRoute();
  }

  function init() {}
  return { render, init, selectMood, selectEnergy, submitReview };
})();
