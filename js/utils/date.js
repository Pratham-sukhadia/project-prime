/* ============================================================
   PROJECT PRIME — Date Utilities
   ============================================================ */

window.DateUtils = (() => {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Journey start date (user's start)
  const JOURNEY_START = new Date('2026-07-13'); // Week 1 Day 1

  function today() { return new Date(); }

  function todayKey() { return formatKey(new Date()); }

  function formatKey(date) {
    return date.toISOString().split('T')[0];
  }

  function dayName(date = new Date()) {
    return DAYS[date.getDay()];
  }

  function dayShort(date = new Date()) {
    return DAYS_SHORT[date.getDay()];
  }

  function dayIndex(date = new Date()) {
    return date.getDay();
  }

  function formatDate(date, format = 'long') {
    const d = new Date(date);
    if (format === 'long') {
      return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
    if (format === 'short') {
      return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
    }
    if (format === 'day-month') {
      return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
    }
    return formatKey(d);
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  }

  function isMorning() {
    return new Date().getHours() < 12;
  }

  function isNight() {
    return new Date().getHours() >= 20;
  }

  function getJourneyDay() {
    const now = new Date();
    const start = new Date(JOURNEY_START);
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  }

  function getJourneyWeek() {
    return Math.ceil(getJourneyDay() / 7);
  }

  function getProgressiveOverloadWeek() {
    // 4-week cycle: Week 1-3 progressive, Week 4 deload
    return ((getJourneyWeek() - 1) % 4) + 1;
  }

  function getWeekDates(offset = 0) {
    const now = new Date();
    now.setDate(now.getDate() + offset * 7);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      dates.push(d);
    }
    return dates;
  }

  function isToday(dateStr) {
    return dateStr === todayKey();
  }

  function isYesterday(dateStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateStr === formatKey(yesterday);
  }

  function daysAgo(dateStr) {
    const target = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - target) / (1000 * 60 * 60 * 24));
  }

  function isAlternateSaturday() {
    // Alternate Saturdays starting from journey start
    const week = getJourneyWeek();
    return week % 2 === 0; // Even weeks = IELTS Saturday
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function formatDuration(minutes) {
    if (minutes < 60) return `${minutes}min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  return {
    DAYS, DAYS_SHORT, MONTHS, MONTHS_SHORT,
    today, todayKey, formatKey, dayName, dayShort, dayIndex,
    formatDate, getGreeting, isMorning, isNight,
    getJourneyDay, getJourneyWeek, getProgressiveOverloadWeek,
    getWeekDates, isToday, isYesterday, daysAgo,
    isAlternateSaturday, formatTime, formatDuration
  };
})();
