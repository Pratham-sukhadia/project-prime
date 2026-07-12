/* ============================================================
   PROJECT PRIME — Nutrition Page
   ============================================================ */
window.NutritionPage = (() => {
  async function render() {
    const dayIndex = new Date().getDay();
    const mealPlan = MealData.getTodayMeals();
    const nutritionData = await PrimeStore.getTodayNutrition();
    const waterData = await PrimeStore.getTodayWater();
    const eaten = nutritionData?.meals || {};
    const calsEaten = nutritionData?.totalCals || 0;
    const proteinEaten = nutritionData?.totalProtein || 0;
    const waterGlasses = waterData?.glasses || 0;

    const calTarget = MealData.CALORIE_TARGET.mid;
    const protTarget = MealData.PROTEIN_TARGET.mid;
    const carbTarget = MealData.CARB_TARGET.mid;
    const fatTarget = MealData.FAT_TARGET.mid;

    const carbsEaten = nutritionData?.totalCarbs || 0;
    const fatEaten = nutritionData?.totalFat || 0;

    if (mealPlan.fasting) {
      return renderFastingDay(mealPlan, eaten, waterGlasses);
    }

    return `
      <div class="page" id="nutrition-page">
        <div class="page-header"><h1 class="page-title">Nutrition</h1><p class="page-subtitle">${DateUtils.dayName()} • ${DateUtils.formatDate(new Date(), 'short')}</p></div>

        <!-- Macro Summary -->
        <div class="glass-card nutrition-summary card-enter stagger-1">
          <h3 class="text-sm font-semibold mb-4 uppercase" style="letter-spacing:0.05em;color:var(--text-tertiary);">Daily Macros</h3>
          <div class="macro-bars">
            ${renderMacroBar('Calories', calsEaten, calTarget, 'kcal', 'calories')}
            ${renderMacroBar('Protein', proteinEaten, protTarget, 'g', 'protein')}
            ${renderMacroBar('Carbs', carbsEaten, carbTarget, 'g', 'water')}
            ${renderMacroBar('Fat', fatEaten, fatTarget, 'g', 'fat')}
          </div>
        </div>

        <!-- Water Tracker -->
        <div class="glass-card water-tracker card-enter stagger-2">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-semibold">💧 Water Intake</h3>
            <span class="text-xs text-secondary">${(waterGlasses * 0.25).toFixed(1)}L / 4.5L</span>
          </div>
          <div class="water-glasses">
            ${Array.from({length: 18}, (_, i) => `
              <div class="water-glass ${i < waterGlasses ? 'filled' : ''}" onclick="NutritionPage.setWater(${i + 1})">
                ${i < waterGlasses ? '💧' : ''}
              </div>
            `).join('')}
          </div>
          <div class="water-status">
            <button class="btn btn-sm btn-secondary" onclick="NutritionPage.addWater()">+ Add Glass</button>
            <span class="water-target text-xs">${18 - waterGlasses} glasses remaining</span>
          </div>
        </div>

        <!-- Meals -->
        <div class="section card-enter stagger-3">
          <h3 class="section-title mb-4">Today's Meals</h3>
          ${mealPlan.meals.map((meal, i) => renderMealCard(meal, eaten[meal.id], i)).join('')}
        </div>

        ${dayIndex === 0 ? `
          <div class="glass-card mb-4" style="border-color:rgba(245,158,11,0.3);">
            <div class="font-semibold mb-2">🎉 ${MealData.SUNDAY_CHEAT.note}</div>
            <div class="text-sm text-secondary">${MealData.SUNDAY_CHEAT.suggestions.slice(0, 4).join(' • ')}</div>
            <div class="text-xs text-muted mt-2">${MealData.SUNDAY_CHEAT.rules[0]} • ${MealData.SUNDAY_CHEAT.rules[1]}</div>
          </div>
        ` : ''}

        <!-- Fat Loss Rules -->
        <div class="section card-enter stagger-4">
          <h3 class="section-title mb-3">Fat Loss Rules</h3>
          <div class="glass-card compact">
            ${MealData.FAT_LOSS_RULES.map(r => `
              <div class="flex items-center gap-3 py-2" style="border-bottom:1px solid var(--glass-border);">
                <span>${r.icon}</span>
                <span class="text-sm">${r.rule}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderFastingDay(plan, eaten, waterGlasses) {
    return `
      <div class="page" id="nutrition-page">
        <div class="page-header"><h1 class="page-title">Nutrition</h1><p class="page-subtitle">Saturday • Fasting Day</p></div>
        <div class="fasting-banner"><span class="fasting-icon">🔥</span><span class="fasting-text">${plan.note}</span></div>

        <div class="glass-card water-tracker mb-4">
          <h3 class="text-sm font-semibold mb-3">💧 Hydration (Extra Important Today)</h3>
          <div class="water-glasses">
            ${Array.from({length: 18}, (_, i) => `
              <div class="water-glass ${i < waterGlasses ? 'filled' : ''}" onclick="NutritionPage.setWater(${i + 1})">${i < waterGlasses ? '💧' : ''}</div>
            `).join('')}
          </div>
        </div>

        <h3 class="section-title mb-3">Fluid Schedule</h3>
        <div class="glass-card compact mb-4">
          ${plan.fluidSchedule.map(f => `
            <div class="flex justify-between items-center py-2" style="border-bottom:1px solid var(--glass-border);">
              <span class="text-sm">${f.time} — ${f.item}</span>
              <span class="text-xs text-muted">${f.calories} cal</span>
            </div>
          `).join('')}
        </div>

        <h3 class="section-title mb-3">Main Meal</h3>
        ${renderMealCard(plan.mainMeal, eaten?.['main-meal'], 0)}
      </div>
    `;
  }

  function renderMacroBar(name, current, target, unit, barClass) {
    const pct = Math.min(100, Math.round((current / target) * 100));
    return `
      <div class="macro-row">
        <div class="macro-row-header">
          <span class="macro-name">${name}</span>
          <span class="macro-values"><strong>${current}</strong> / ${target} ${unit}</span>
        </div>
        <div class="progress-bar ${barClass}"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      </div>`;
  }

  function renderMealCard(meal, isEaten, index) {
    return `
      <div class="meal-card card-enter stagger-${index + 1}">
        <div class="meal-card-header">
          <div class="meal-card-title">${meal.emoji} ${meal.name}</div>
          <div class="meal-card-time">${meal.time}</div>
        </div>
        <div class="meal-card-items">
          ${meal.items.map(item => `
            <div class="meal-item">
              <span class="meal-item-name">${item.name}</span>
              <span class="meal-item-amount">${item.amount}</span>
            </div>
          `).join('')}
        </div>
        <div class="meal-card-macros">
          <div class="macro-item"><div class="macro-value">${meal.totals.calories}</div><div class="macro-label">cal</div></div>
          <div class="macro-item"><div class="macro-value" style="color:var(--accent);">${meal.totals.protein}g</div><div class="macro-label">protein</div></div>
          <div class="macro-item"><div class="macro-value">${meal.totals.carbs}g</div><div class="macro-label">carbs</div></div>
          <div class="macro-item"><div class="macro-value">${meal.totals.fat}g</div><div class="macro-label">fat</div></div>
        </div>
        <button class="meal-check-btn ${isEaten ? 'eaten' : ''}" onclick="NutritionPage.toggleMeal('${meal.id}', this)">
          ${isEaten ? '✅ Eaten' : '🍽️ Mark as Eaten'}
        </button>
      </div>`;
  }

  async function toggleMeal(mealId, btn) {
    Animations.haptic('light');
    const data = await PrimeStore.getTodayNutrition() || { meals: {}, totalCals: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 };
    const wasEaten = data.meals[mealId];
    data.meals[mealId] = !wasEaten;

    // Recalculate totals
    const allMeals = MealData.DAILY_MEALS;
    let cals = 0, prot = 0, carbs = 0, fat = 0;
    for (const m of allMeals) {
      if (data.meals[m.id]) { cals += m.totals.calories; prot += m.totals.protein; carbs += m.totals.carbs; fat += m.totals.fat; }
    }
    data.totalCals = cals; data.totalProtein = prot; data.totalCarbs = carbs; data.totalFat = fat;
    await PrimeStore.saveTodayNutrition(data);

    btn.className = `meal-check-btn ${data.meals[mealId] ? 'eaten' : ''}`;
    btn.textContent = data.meals[mealId] ? '✅ Eaten' : '🍽️ Mark as Eaten';
    if (data.meals[mealId]) Animations.pulse(btn);
    ToastComponent.success(data.meals[mealId] ? '✅ Meal Logged' : '↩ Meal Unlogged', `${mealId} ${data.meals[mealId] ? 'marked as eaten' : 'unmarked'}`);
  }

  async function addWater() {
    Animations.haptic('light');
    const data = await PrimeStore.getTodayWater();
    const glasses = (data?.glasses || 0) + 1;
    await PrimeStore.saveTodayWater(glasses, glasses * 250);
    Router.handleRoute();
  }

  async function setWater(count) {
    Animations.haptic('light');
    await PrimeStore.saveTodayWater(count, count * 250);
    Router.handleRoute();
  }

  function init() {}
  return { render, init, toggleMeal, addWater, setWater };
})();
