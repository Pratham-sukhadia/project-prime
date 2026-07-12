/* ============================================================
   PROJECT PRIME — IndexedDB Data Store
   Persistent local storage for all app data
   ============================================================ */

window.PrimeStore = (() => {
  const DB_NAME = 'ProjectPrimeDB';
  const DB_VERSION = 1;
  let db = null;

  const STORES = {
    workoutLogs: 'workoutLogs',       // { date, day, exercises: [...], duration, completed }
    nutritionLogs: 'nutritionLogs',   // { date, meals: [...], totalCals, totalProtein }
    waterLogs: 'waterLogs',           // { date, glasses, totalMl }
    habitLogs: 'habitLogs',           // { date, habits: { water: bool, workout: bool, ... } }
    weightLogs: 'weightLogs',         // { date, weight, bodyFat? }
    measurementLogs: 'measurementLogs', // { date, chest, waist, arms, shoulders, thigh, calves }
    sleepLogs: 'sleepLogs',           // { date, hours, quality, bedtime, wakeTime }
    walkLogs: 'walkLogs',             // { date, duration, distance?, type }
    settings: 'settings',             // { key, value }
    achievements: 'achievements',     // { id, unlocked, unlockedDate, xp }
    streaks: 'streaks',               // { type, current, best, lastDate }
    nightReviews: 'nightReviews'      // { date, workout, calories, protein, water, mood, energy, goal }
  };

  // Initialize the database
  function init() {
    return new Promise((resolve, reject) => {
      if (db) { resolve(db); return; }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const database = event.target.result;

        // Create object stores
        if (!database.objectStoreNames.contains(STORES.workoutLogs)) {
          database.createObjectStore(STORES.workoutLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.nutritionLogs)) {
          database.createObjectStore(STORES.nutritionLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.waterLogs)) {
          database.createObjectStore(STORES.waterLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.habitLogs)) {
          database.createObjectStore(STORES.habitLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.weightLogs)) {
          database.createObjectStore(STORES.weightLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.measurementLogs)) {
          database.createObjectStore(STORES.measurementLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.sleepLogs)) {
          database.createObjectStore(STORES.sleepLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.walkLogs)) {
          database.createObjectStore(STORES.walkLogs, { keyPath: 'date' });
        }
        if (!database.objectStoreNames.contains(STORES.settings)) {
          database.createObjectStore(STORES.settings, { keyPath: 'key' });
        }
        if (!database.objectStoreNames.contains(STORES.achievements)) {
          database.createObjectStore(STORES.achievements, { keyPath: 'id' });
        }
        if (!database.objectStoreNames.contains(STORES.streaks)) {
          database.createObjectStore(STORES.streaks, { keyPath: 'type' });
        }
        if (!database.objectStoreNames.contains(STORES.nightReviews)) {
          database.createObjectStore(STORES.nightReviews, { keyPath: 'date' });
        }
      };
    });
  }

  // Generic CRUD operations
  function put(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function get(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  function getAll(storeName) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  function remove(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  function clear(storeName) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ---- Settings helpers ----
  async function getSetting(key, defaultValue = null) {
    const result = await get(STORES.settings, key);
    return result ? result.value : defaultValue;
  }

  async function setSetting(key, value) {
    return put(STORES.settings, { key, value });
  }

  // ---- Today helpers ----
  function todayKey() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }

  async function getTodayWorkout() {
    return get(STORES.workoutLogs, todayKey());
  }

  async function saveTodayWorkout(data) {
    return put(STORES.workoutLogs, { date: todayKey(), ...data });
  }

  async function getTodayNutrition() {
    return get(STORES.nutritionLogs, todayKey());
  }

  async function saveTodayNutrition(data) {
    return put(STORES.nutritionLogs, { date: todayKey(), ...data });
  }

  async function getTodayWater() {
    return get(STORES.waterLogs, todayKey());
  }

  async function saveTodayWater(glasses, totalMl) {
    return put(STORES.waterLogs, { date: todayKey(), glasses, totalMl });
  }

  async function getTodayHabits() {
    return get(STORES.habitLogs, todayKey());
  }

  async function saveTodayHabits(habits) {
    return put(STORES.habitLogs, { date: todayKey(), habits, timestamp: Date.now() });
  }

  // ---- Streak helpers ----
  async function getStreak(type) {
    const streak = await get(STORES.streaks, type);
    return streak || { type, current: 0, best: 0, lastDate: null };
  }

  async function updateStreak(type) {
    const today = todayKey();
    const streak = await getStreak(type);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split('T')[0];

    if (streak.lastDate === today) {
      return streak; // Already updated today
    }

    if (streak.lastDate === yesterdayKey) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }

    streak.best = Math.max(streak.best, streak.current);
    streak.lastDate = today;

    await put(STORES.streaks, streak);
    return streak;
  }

  // ---- Weight helpers ----
  async function logWeight(weight, bodyFat) {
    const data = { date: todayKey(), weight, timestamp: Date.now() };
    if (bodyFat !== undefined) data.bodyFat = bodyFat;
    return put(STORES.weightLogs, data);
  }

  async function getWeightHistory(days = 90) {
    const all = await getAll(STORES.weightLogs);
    return all.sort((a, b) => a.date.localeCompare(b.date)).slice(-days);
  }

  async function getLatestWeight() {
    const all = await getAll(STORES.weightLogs);
    if (all.length === 0) return 87.5; // Default starting weight
    return all.sort((a, b) => b.date.localeCompare(a.date))[0].weight;
  }

  // ---- Data export/import ----
  async function exportAllData() {
    const data = {};
    for (const storeName of Object.values(STORES)) {
      data[storeName] = await getAll(storeName);
    }
    return data;
  }

  async function importAllData(data) {
    for (const [storeName, records] of Object.entries(data)) {
      if (STORES[storeName]) {
        for (const record of records) {
          await put(storeName, record);
        }
      }
    }
  }

  async function clearAllData() {
    for (const storeName of Object.values(STORES)) {
      await clear(storeName);
    }
  }

  return {
    init,
    STORES,
    put,
    get,
    getAll,
    remove,
    clear,
    getSetting,
    setSetting,
    todayKey,
    getTodayWorkout,
    saveTodayWorkout,
    getTodayNutrition,
    saveTodayNutrition,
    getTodayWater,
    saveTodayWater,
    getTodayHabits,
    saveTodayHabits,
    getStreak,
    updateStreak,
    logWeight,
    getWeightHistory,
    getLatestWeight,
    exportAllData,
    importAllData,
    clearAllData
  };
})();
