/* ============================================================
   PROJECT PRIME — Meal Plan Data
   Vegetarian meal plans with full macro breakdown
   ============================================================ */

window.MealData = (() => {
  const CALORIE_TARGET = { min: 2200, max: 2400, mid: 2300 };
  const PROTEIN_TARGET = { min: 140, max: 160, mid: 150 };
  const CARB_TARGET = { min: 220, max: 250, mid: 235 };
  const FAT_TARGET = { min: 50, max: 60, mid: 55 };
  const FIBER_TARGET = 30;
  const WATER_TARGET_ML = 4500; // 4.5 liters
  const WATER_GLASS_ML = 250;

  // Standard daily meal plan
  const DAILY_MEALS = [
    {
      id: 'pre-workout',
      name: 'Pre-Workout',
      emoji: '⚡',
      time: '6:45 AM',
      items: [
        { name: 'Banana', amount: '1 medium', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
        { name: 'Peanuts', amount: '15g (10-12 pcs)', calories: 85, protein: 3.8, carbs: 2.4, fat: 7.3, fiber: 1.3 },
        { name: 'Black Coffee', amount: '1 cup', calories: 5, protein: 0.3, carbs: 0, fat: 0, fiber: 0 }
      ],
      totals: { calories: 195, protein: 5.4, carbs: 29.4, fat: 7.7, fiber: 4.4 },
      notes: 'Eat 30-40 min before gym. Quick energy from banana + sustained from peanuts.'
    },
    {
      id: 'breakfast',
      name: 'Breakfast / Post-Workout',
      emoji: '🍳',
      time: '9:00 AM',
      items: [
        { name: 'Oats', amount: '80g (dry)', calories: 304, protein: 10.6, carbs: 54, fat: 5.3, fiber: 8.2 },
        { name: 'Milk', amount: '250ml', calories: 150, protein: 8, carbs: 12, fat: 8, fiber: 0 },
        { name: 'Pumpkin Seeds', amount: '15g', calories: 85, protein: 4.5, carbs: 1.5, fat: 7, fiber: 0.6 },
        { name: 'Apple / Seasonal Fruit', amount: '1 medium', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 }
      ],
      totals: { calories: 634, protein: 23.6, carbs: 92.5, fat: 20.6, fiber: 13.2 },
      alternatives: [
        {
          name: 'Sprouts Bowl',
          items: [
            { name: 'Mixed Sprouts', amount: '150g', calories: 120, protein: 12, carbs: 15, fat: 1, fiber: 5 },
            { name: 'Lemon Juice', amount: '1 tbsp', calories: 4, protein: 0, carbs: 1, fat: 0, fiber: 0 },
            { name: 'Peanuts', amount: '20g', calories: 113, protein: 5, carbs: 3.2, fat: 9.7, fiber: 1.7 },
            { name: 'Banana', amount: '1 medium', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 }
          ]
        }
      ],
      notes: 'Most important meal for muscle recovery. Eat within 1 hour of workout.'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      emoji: '🍛',
      time: '1:30 PM',
      items: [
        { name: 'Roti (Chapati)', amount: '3 pieces', calories: 240, protein: 9, carbs: 48, fat: 3, fiber: 6 },
        { name: 'Dal (Cooked)', amount: '1 bowl (200ml)', calories: 140, protein: 9, carbs: 20, fat: 2.5, fiber: 4 },
        { name: 'Soya Chunks', amount: '50g (dry)', calories: 172, protein: 26, carbs: 16.5, fat: 0.5, fiber: 7 },
        { name: 'Curd', amount: '200g', calories: 120, protein: 7, carbs: 8, fat: 7, fiber: 0 },
        { name: 'Green Salad', amount: '1 bowl', calories: 30, protein: 1.5, carbs: 6, fat: 0.3, fiber: 2.5 }
      ],
      totals: { calories: 702, protein: 52.5, carbs: 98.5, fat: 13.3, fiber: 19.5 },
      alternatives: [
        {
          name: 'Paneer Lunch',
          items: [
            { name: 'Roti', amount: '3 pieces', calories: 240, protein: 9, carbs: 48, fat: 3, fiber: 6 },
            { name: 'Paneer Bhurji', amount: '150g paneer', calories: 315, protein: 28.5, carbs: 6, fat: 22.5, fiber: 1 },
            { name: 'Salad', amount: '1 bowl', calories: 30, protein: 1.5, carbs: 6, fat: 0.3, fiber: 2.5 },
            { name: 'Buttermilk', amount: '1 glass', calories: 40, protein: 3, carbs: 4, fat: 1.5, fiber: 0 }
          ]
        }
      ],
      notes: 'Highest protein meal of the day. Soya chunks are protein powerhouse.'
    },
    {
      id: 'evening-snack',
      name: 'Evening Snack',
      emoji: '🍵',
      time: '5:00 PM',
      items: [
        { name: 'Makhana (Fox Nuts)', amount: '30g', calories: 100, protein: 3, carbs: 20, fat: 0.6, fiber: 1.5 },
        { name: 'Green Tea', amount: '1 cup', calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        { name: 'Sprouts', amount: '100g', calories: 80, protein: 8, carbs: 10, fat: 0.5, fiber: 3.5 }
      ],
      totals: { calories: 182, protein: 11, carbs: 30, fat: 1.1, fiber: 5 },
      alternatives: [
        {
          name: 'Fruit & Nuts',
          items: [
            { name: 'Apple', amount: '1 medium', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
            { name: 'Peanuts', amount: '20g', calories: 113, protein: 5, carbs: 3.2, fat: 9.7, fiber: 1.7 },
            { name: 'Green Tea', amount: '1 cup', calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0 }
          ]
        }
      ],
      notes: 'Light but nutritious. Makhana is great for sustained energy at office.'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      emoji: '🥗',
      time: '8:30 PM',
      items: [
        { name: 'Roti (Chapati)', amount: '2 pieces', calories: 160, protein: 6, carbs: 32, fat: 2, fiber: 4 },
        { name: 'Paneer', amount: '150g', calories: 315, protein: 28.5, carbs: 6, fat: 22.5, fiber: 0 },
        { name: 'Green Vegetables', amount: '1 bowl', calories: 50, protein: 3, carbs: 8, fat: 1, fiber: 4 },
        { name: 'Salad', amount: '1 bowl', calories: 30, protein: 1.5, carbs: 6, fat: 0.3, fiber: 2.5 }
      ],
      totals: { calories: 555, protein: 39, carbs: 52, fat: 25.8, fiber: 10.5 },
      alternatives: [
        {
          name: 'Dal + Rice Dinner',
          items: [
            { name: 'Rice', amount: '100g (cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
            { name: 'Dal', amount: '1.5 bowls', calories: 210, protein: 13.5, carbs: 30, fat: 3.8, fiber: 6 },
            { name: 'Soya Chunks', amount: '30g', calories: 103, protein: 15.6, carbs: 10, fat: 0.3, fiber: 4.2 },
            { name: 'Salad', amount: '1 bowl', calories: 30, protein: 1.5, carbs: 6, fat: 0.3, fiber: 2.5 }
          ]
        }
      ],
      notes: 'Keep dinner moderate. Paneer is your premium protein source.'
    },
    {
      id: 'night-recovery',
      name: 'Night Recovery',
      emoji: '🌙',
      time: '10:00 PM',
      items: [
        { name: 'Warm Milk', amount: '250ml', calories: 150, protein: 8, carbs: 12, fat: 8, fiber: 0 },
        { name: 'Turmeric (Haldi)', amount: '1/2 tsp', calories: 4, protein: 0.1, carbs: 0.7, fat: 0.1, fiber: 0.2 }
      ],
      totals: { calories: 154, protein: 8.1, carbs: 12.7, fat: 8.1, fiber: 0.2 },
      notes: 'Casein protein in milk provides slow-release amino acids during sleep. Turmeric is anti-inflammatory.'
    }
  ];

  // Total daily macros
  const DAILY_TOTALS = {
    calories: DAILY_MEALS.reduce((sum, m) => sum + m.totals.calories, 0),
    protein: DAILY_MEALS.reduce((sum, m) => sum + m.totals.protein, 0),
    carbs: DAILY_MEALS.reduce((sum, m) => sum + m.totals.carbs, 0),
    fat: DAILY_MEALS.reduce((sum, m) => sum + m.totals.fat, 0),
    fiber: DAILY_MEALS.reduce((sum, m) => sum + m.totals.fiber, 0)
  };

  // Saturday fasting plan
  const SATURDAY_FASTING = {
    note: '🔥 Fasting Day — One Proper Meal + Fluids Only',
    fluidSchedule: [
      { time: '7:00 AM', item: 'Lemon Water', calories: 10 },
      { time: '9:00 AM', item: 'Black Coffee', calories: 5 },
      { time: '11:00 AM', item: 'Green Tea', calories: 2 },
      { time: '1:00 PM', item: 'Coconut Water', calories: 45 },
      { time: '3:00 PM', item: 'Lemon Water', calories: 10 },
      { time: '5:00 PM', item: 'Green Tea', calories: 2 }
    ],
    mainMeal: {
      name: 'Main Meal (Evening)',
      time: '7:00 PM',
      items: [
        { name: 'Roti', amount: '4 pieces', calories: 320, protein: 12, carbs: 64, fat: 4, fiber: 8 },
        { name: 'Paneer', amount: '200g', calories: 420, protein: 38, carbs: 8, fat: 30, fiber: 0 },
        { name: 'Dal', amount: '1 bowl', calories: 140, protein: 9, carbs: 20, fat: 2.5, fiber: 4 },
        { name: 'Green Vegetables', amount: '1 bowl', calories: 50, protein: 3, carbs: 8, fat: 1, fiber: 4 },
        { name: 'Curd', amount: '200g', calories: 120, protein: 7, carbs: 8, fat: 7, fiber: 0 },
        { name: 'Salad', amount: '1 large bowl', calories: 50, protein: 2, carbs: 10, fat: 0.5, fiber: 4 }
      ],
      totals: { calories: 1100, protein: 71, carbs: 118, fat: 45, fiber: 20 }
    },
    nightDrink: {
      item: 'Warm Milk + Turmeric',
      calories: 154,
      protein: 8
    },
    totalDay: { calories: 1328, protein: 79 }
  };

  // Sunday cheat meal suggestions
  const SUNDAY_CHEAT = {
    note: '🎉 One Cheat Meal Allowed — Enjoy Responsibly!',
    suggestions: [
      'Homemade Pizza (Roti-based)',
      'Pulav with Raita',
      'Chole Bhature (moderate portion)',
      'Paneer Paratha with Curd',
      'Pav Bhaji',
      'Dosa with Sambar & Chutney',
      'Khichdi with Papad & Curd',
      'Homemade Noodles / Pasta'
    ],
    rules: [
      'Keep it to ONE meal only',
      'Still home-made preferred',
      'No sugary drinks with it',
      'Drink water before eating',
      'Eat slowly and enjoy',
      'Don\'t go beyond 600-700 extra calories'
    ]
  };

  // Fat loss rules
  const FAT_LOSS_RULES = [
    { rule: 'No Sugar', icon: '🚫', desc: 'Zero added sugar in any form' },
    { rule: 'No Fried Food', icon: '🍟', desc: 'Avoid deep fried items completely' },
    { rule: 'No Bakery', icon: '🧁', desc: 'No cookies, cakes, pastries, biscuits' },
    { rule: 'No Late Night Snacking', icon: '🌙', desc: 'Nothing after dinner except milk' },
    { rule: 'Drink Water Before Meals', icon: '💧', desc: '1-2 glasses 15 min before eating' },
    { rule: 'Walk After Dinner', icon: '🚶', desc: '10-15 minute walk after dinner' },
    { rule: 'Sleep Before 11 PM', icon: '😴', desc: 'Target 10:45 PM bedtime' },
    { rule: 'No Cold Drinks', icon: '🥤', desc: 'Zero sodas, packaged juice, energy drinks' },
    { rule: 'No Packaged Food', icon: '📦', desc: 'Only fresh, home-cooked meals' }
  ];

  function getMeals(dayIndex) {
    if (dayIndex === 6) return { fasting: true, ...SATURDAY_FASTING };
    return { fasting: false, meals: DAILY_MEALS };
  }

  function getTodayMeals() {
    return getMeals(new Date().getDay());
  }

  return {
    CALORIE_TARGET, PROTEIN_TARGET, CARB_TARGET, FAT_TARGET, FIBER_TARGET,
    WATER_TARGET_ML, WATER_GLASS_ML,
    DAILY_MEALS, DAILY_TOTALS,
    SATURDAY_FASTING, SUNDAY_CHEAT, FAT_LOSS_RULES,
    getMeals, getTodayMeals
  };
})();
