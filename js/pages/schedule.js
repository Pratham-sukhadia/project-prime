/* ============================================================
   PROJECT PRIME — Schedule Page
   ============================================================ */
window.SchedulePage = (() => {
  const SCHEDULE = {
    Monday: [
      { time: '7:00 AM', name: 'Wake Up', type: 'free', detail: 'Lemon water + Light stretch' },
      { time: '7:30 - 9:00 AM', name: 'Gym — Push Day', type: 'gym', detail: 'Chest, Triceps, Front Delts' },
      { time: '9:00 AM', name: 'Breakfast', type: 'meals', detail: 'Oats + Milk + Fruit' },
      { time: '9:40 AM', name: 'Leave for IELTS', type: 'free' },
      { time: '10:00 - 1:30 PM', name: 'IELTS Class', type: 'ielts', detail: 'Focus & practice' },
      { time: '1:30 PM', name: 'Lunch', type: 'meals', detail: 'Roti + Dal + Soya + Salad' },
      { time: '2:00 - 7:00 PM', name: 'Office (Accounting)', type: 'office', detail: 'Stay productive' },
      { time: '8:30 PM', name: 'Dinner', type: 'meals', detail: 'Roti + Paneer + Veggies' },
      { time: '9:15 - 10:30 PM', name: 'Night Walk', type: 'walk', detail: '60-90 min • IELTS audio • Podcast' },
      { time: '10:30 PM', name: 'Night Routine', type: 'sleep', detail: 'Stretch + Read + Milk' },
      { time: '10:45 - 11:00 PM', name: 'Sleep', type: 'sleep', detail: 'Target: 8 hours' }
    ],
    Tuesday: [
      { time: '7:00 AM', name: 'Wake Up', type: 'free' },
      { time: '7:30 - 9:00 AM', name: 'Gym — Leg Day', type: 'gym', detail: 'Quads, Hams, Glutes + Incline Walk' },
      { time: '9:00 AM', name: 'Breakfast', type: 'meals' },
      { time: '10:00 - 1:30 PM', name: 'IELTS Class', type: 'ielts' },
      { time: '1:30 PM', name: 'Lunch', type: 'meals' },
      { time: '2:00 - 7:00 PM', name: 'Office', type: 'office' },
      { time: '8:30 PM', name: 'Dinner', type: 'meals' },
      { time: '9:15 PM', name: 'Night Walk', type: 'walk' },
      { time: '10:45 PM', name: 'Sleep', type: 'sleep' }
    ],
    Wednesday: [
      { time: '7:00 AM', name: 'Wake Up', type: 'free' },
      { time: '7:30 - 9:00 AM', name: 'Gym — Pull Day', type: 'gym', detail: 'Back, Biceps, Forearms' },
      { time: '9:00 AM', name: 'Breakfast', type: 'meals' },
      { time: '10:00 - 1:30 PM', name: 'IELTS Class', type: 'ielts' },
      { time: '1:30 PM', name: 'Lunch', type: 'meals' },
      { time: '2:00 - 7:00 PM', name: 'Office', type: 'office' },
      { time: '8:30 PM', name: 'Dinner', type: 'meals' },
      { time: '9:15 PM', name: 'Night Walk', type: 'walk' },
      { time: '10:45 PM', name: 'Sleep', type: 'sleep' }
    ],
    Thursday: [
      { time: '7:00 AM', name: 'Wake Up', type: 'free' },
      { time: '7:30 - 9:00 AM', name: 'Gym — Cardio + Weak Points', type: 'gym', detail: 'Shoulders, Core, Mobility' },
      { time: '9:00 AM', name: 'Breakfast', type: 'meals' },
      { time: '10:00 - 1:30 PM', name: 'IELTS Class', type: 'ielts' },
      { time: '1:30 PM', name: 'Lunch', type: 'meals' },
      { time: '2:00 - 7:00 PM', name: 'Office', type: 'office' },
      { time: '8:30 PM', name: 'Dinner', type: 'meals' },
      { time: '9:15 PM', name: 'Night Walk', type: 'walk' },
      { time: '10:45 PM', name: 'Sleep', type: 'sleep' }
    ],
    Friday: [
      { time: '7:00 AM', name: 'Wake Up', type: 'free' },
      { time: '7:30 - 9:00 AM', name: 'Gym — Hybrid Strength', type: 'gym', detail: 'Heavy compounds + Functional' },
      { time: '9:00 AM', name: 'Breakfast', type: 'meals' },
      { time: '10:00 - 1:30 PM', name: 'IELTS Class', type: 'ielts' },
      { time: '1:30 PM', name: 'Lunch', type: 'meals' },
      { time: '2:00 - 7:00 PM', name: 'Office', type: 'office' },
      { time: '8:30 PM', name: 'Dinner', type: 'meals' },
      { time: '9:15 PM', name: 'Night Walk', type: 'walk' },
      { time: '10:45 PM', name: 'Sleep', type: 'sleep' }
    ],
    Saturday: [
      { time: '7:00 AM', name: 'Wake Up', type: 'free' },
      { time: '7:30 - 8:15 AM', name: 'Gym — Quick Arms (if IELTS)', type: 'gym', detail: '45 min superset arms' },
      { time: '8:30 AM', name: 'IELTS (Alternate Saturdays)', type: 'ielts', detail: 'Every other Saturday' },
      { time: '1:30 PM', name: 'Free / Study', type: 'free' },
      { time: '5:00 PM', name: 'Evening Full Workout (No IELTS)', type: 'gym', detail: '90 min full arm day' },
      { time: '7:00 PM', name: 'Main Meal (Fasting Day)', type: 'meals', detail: 'Single proper meal' },
      { time: '9:15 PM', name: 'Night Walk', type: 'walk' },
      { time: '10:45 PM', name: 'Sleep', type: 'sleep' }
    ],
    Sunday: [
      { time: '8:00 AM', name: 'Wake Up (Extra Sleep)', type: 'free' },
      { time: '9:00 AM', name: 'Yoga + Foam Rolling', type: 'gym', detail: '45 min recovery' },
      { time: '10:00 AM', name: 'Breakfast', type: 'meals' },
      { time: '11:00 AM', name: 'Family Time', type: 'free', detail: 'Relax and recharge' },
      { time: '1:30 PM', name: 'Lunch', type: 'meals' },
      { time: '3:00 PM', name: 'IELTS Revision', type: 'ielts', detail: 'Vocab + Practice tests' },
      { time: '5:00 PM', name: 'Evening Walk', type: 'walk', detail: '30 min outdoor walk' },
      { time: '7:00 PM', name: 'Cheat Meal 🎉', type: 'meals', detail: 'One cheat meal allowed' },
      { time: '9:00 PM', name: 'Light Walk + Relax', type: 'walk' },
      { time: '10:30 PM', name: 'Sleep', type: 'sleep' }
    ]
  };

  let selectedDay = DateUtils.dayName();

  function render() {
    const days = Object.keys(SCHEDULE);
    const todaySchedule = SCHEDULE[selectedDay] || [];

    return `
      <div class="page" id="schedule-page">
        <div class="page-header"><h1 class="page-title">Schedule</h1><p class="page-subtitle">Your weekly timetable</p></div>

        <div class="schedule-day-selector card-enter stagger-1">
          ${days.map(d => `
            <button class="schedule-day-btn ${d === selectedDay ? 'active' : ''}" onclick="SchedulePage.selectDay('${d}')">${d.slice(0, 3)}</button>
          `).join('')}
        </div>

        <h3 class="text-lg font-semibold mb-4 card-enter stagger-2">${selectedDay}</h3>

        <div class="schedule-timeline card-enter stagger-3">
          ${todaySchedule.map(block => `
            <div class="schedule-block ${block.type}">
              <div class="schedule-block-time">${block.time}</div>
              <div class="schedule-block-name">${block.name}</div>
              ${block.detail ? `<div class="schedule-block-detail">${block.detail}</div>` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Sleep Routine -->
        <div class="section mt-6 card-enter stagger-4">
          <h3 class="section-title mb-3">🌙 Night Routine</h3>
          <div class="glass-card compact">
            ${['Phone Off by 10 PM', 'Reading 15 min', 'Meditation 10 min', 'Light Stretching', 'Warm Shower', 'Dark Room', 'Cool Room Temperature', 'No Coffee After 4 PM', 'Deep Breathing Exercise'].map(item => `
              <div class="flex items-center gap-3 py-2" style="border-bottom:1px solid var(--glass-border);">
                <span class="text-xs">•</span>
                <span class="text-sm text-secondary">${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function selectDay(day) {
    selectedDay = day;
    Router.handleRoute();
  }

  function init() {}
  return { render, init, selectDay };
})();
