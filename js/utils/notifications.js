/* ============================================================
   PROJECT PRIME — Notification Utilities
   Browser Notification API wrapper
   ============================================================ */

window.Notifications = (() => {
  let permission = 'default';

  async function requestPermission() {
    if ('Notification' in window) {
      permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  function isGranted() {
    return 'Notification' in window && Notification.permission === 'granted';
  }

  function send(title, options = {}) {
    if (!isGranted()) return;

    const defaults = {
      icon: './assets/icons/icon-192.png',
      badge: './assets/icons/icon-96.png',
      vibrate: [100, 50, 100],
      silent: false,
      tag: 'prime-notification'
    };

    try {
      new Notification(title, { ...defaults, ...options });
    } catch (e) {
      // Fallback for mobile (notifications via SW)
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          title,
          options: { ...defaults, ...options }
        });
      }
    }
  }

  // Scheduled reminder helper (uses setTimeout, not persistent)
  function scheduleReminder(title, body, delayMs) {
    return setTimeout(() => {
      send(title, { body });
    }, delayMs);
  }

  // Pre-built notifications
  function waterReminder() {
    send('💧 Hydration Check', {
      body: 'Time to drink some water! Stay hydrated, Pratham.',
      tag: 'water-reminder'
    });
  }

  function workoutReminder() {
    send('💪 Gym Time!', {
      body: 'Time to hit the gym. Your workout is ready.',
      tag: 'workout-reminder'
    });
  }

  function mealReminder(mealName) {
    send(`🍽️ ${mealName} Time`, {
      body: `Don't forget your ${mealName.toLowerCase()}. Stay on track!`,
      tag: 'meal-reminder'
    });
  }

  function sleepReminder() {
    send('🌙 Time for Bed', {
      body: 'Start your night routine. Target: 10:45 PM sleep for 8 hours.',
      tag: 'sleep-reminder'
    });
  }

  function walkReminder() {
    send('🚶 Night Walk', {
      body: 'Time for your evening walk. 60-90 minutes for fat loss & relaxation.',
      tag: 'walk-reminder'
    });
  }

  return {
    requestPermission,
    isGranted,
    send,
    scheduleReminder,
    waterReminder,
    workoutReminder,
    mealReminder,
    sleepReminder,
    walkReminder
  };
})();
