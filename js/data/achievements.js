/* ============================================================
   PROJECT PRIME — Achievement & Gamification Data
   Badges, XP, levels, and unlock conditions
   ============================================================ */

window.AchievementData = (() => {
  const LEVELS = [
    { name: 'Beginner', minXP: 0, emoji: '🌱', color: '#94a3b8' },
    { name: 'Warrior', minXP: 500, emoji: '⚔️', color: '#3b82f6' },
    { name: 'Champion', minXP: 1500, emoji: '🏆', color: '#f59e0b' },
    { name: 'Legend', minXP: 3500, emoji: '👑', color: '#8b5cf6' },
    { name: 'Prime', minXP: 7000, emoji: '💎', color: '#10b981' }
  ];

  const XP_REWARDS = {
    completeWorkout: 50,
    hitCalorieTarget: 30,
    hitProteinTarget: 30,
    drinkEnoughWater: 15,
    completeNightReview: 20,
    completeAllHabits: 40,
    logWeight: 10,
    nightWalk: 20,
    morningCoachVisit: 10,
    perfectDay: 100 // all habits + workout + nutrition
  };

  const ACHIEVEMENTS = [
    {
      id: 'streak-7',
      name: 'Week Warrior',
      desc: '7-day workout streak',
      emoji: '🔥',
      xp: 200,
      condition: (data) => data.workoutStreak >= 7
    },
    {
      id: 'streak-30',
      name: 'Iron Will',
      desc: '30-day workout streak',
      emoji: '🏆',
      xp: 500,
      condition: (data) => data.workoutStreak >= 30
    },
    {
      id: 'streak-60',
      name: 'Unstoppable',
      desc: '60-day workout streak',
      emoji: '⚡',
      xp: 1000,
      condition: (data) => data.workoutStreak >= 60
    },
    {
      id: 'workouts-100',
      name: 'Century Club',
      desc: 'Complete 100 workouts',
      emoji: '💪',
      xp: 750,
      condition: (data) => data.totalWorkouts >= 100
    },
    {
      id: 'walk-100km',
      name: 'Road Runner',
      desc: 'Walk 100+ km total',
      emoji: '🚶',
      xp: 500,
      condition: (data) => data.totalWalkKm >= 100
    },
    {
      id: 'first-5kg',
      name: 'First Milestone',
      desc: 'Lose first 5 kg (reach 83 kg)',
      emoji: '⚡',
      xp: 500,
      condition: (data) => data.lowestWeight <= 83
    },
    {
      id: 'target-weight',
      name: 'Mission Complete',
      desc: 'Reach target weight (80-82 kg)',
      emoji: '🎯',
      xp: 1500,
      condition: (data) => data.lowestWeight <= 82
    },
    {
      id: 'perfect-week',
      name: 'Perfect Week',
      desc: 'Complete all habits for 7 consecutive days',
      emoji: '⭐',
      xp: 300,
      condition: (data) => data.perfectDayStreak >= 7
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      desc: '30 workouts completed before 9 AM',
      emoji: '🌅',
      xp: 300,
      condition: (data) => data.earlyWorkouts >= 30
    },
    {
      id: 'hydration-master',
      name: 'Hydration Master',
      desc: 'Hit water target for 30 consecutive days',
      emoji: '💧',
      xp: 300,
      condition: (data) => data.waterStreak >= 30
    },
    {
      id: 'protein-king',
      name: 'Protein King',
      desc: 'Hit protein target for 30 days',
      emoji: '🥩',
      xp: 300,
      condition: (data) => data.proteinDays >= 30
    },
    {
      id: 'night-owl',
      name: 'Night Walker',
      desc: 'Complete 30 night walks',
      emoji: '🌙',
      xp: 250,
      condition: (data) => data.nightWalks >= 30
    },
    {
      id: 'consistency-90',
      name: 'Iron Discipline',
      desc: '90% consistency for 4 weeks',
      emoji: '🏅',
      xp: 500,
      condition: (data) => data.consistencyPercent >= 90
    },
    {
      id: 'bench-pr',
      name: 'Bench Beast',
      desc: 'Set a new bench press PR',
      emoji: '🏋️',
      xp: 200,
      condition: (data) => data.benchPR > 0
    },
    {
      id: 'squat-pr',
      name: 'Squat King',
      desc: 'Set a new squat PR',
      emoji: '🦵',
      xp: 200,
      condition: (data) => data.squatPR > 0
    },
    {
      id: 'deadlift-pr',
      name: 'Dead Lift Legend',
      desc: 'Set a new deadlift PR',
      emoji: '💀',
      xp: 200,
      condition: (data) => data.deadliftPR > 0
    },
    {
      id: 'sleep-master',
      name: 'Sleep Master',
      desc: 'Average 8+ hours sleep for 2 weeks',
      emoji: '😴',
      xp: 250,
      condition: (data) => data.avgSleep >= 8
    },
    {
      id: 'comeback',
      name: 'Comeback Kid',
      desc: 'Complete Week 1 of the journey',
      emoji: '🔄',
      xp: 150,
      condition: (data) => data.journeyWeek >= 2
    },
    {
      id: 'halfway',
      name: 'Halfway There',
      desc: 'Complete 6 weeks of the 12-week journey',
      emoji: '🏁',
      xp: 500,
      condition: (data) => data.journeyWeek >= 7
    },
    {
      id: 'finish-line',
      name: 'The Transformation',
      desc: 'Complete the full 12-week program',
      emoji: '🎆',
      xp: 2000,
      condition: (data) => data.journeyWeek >= 13
    }
  ];

  function getLevel(xp) {
    let level = LEVELS[0];
    for (const l of LEVELS) {
      if (xp >= l.minXP) level = l;
    }
    return level;
  }

  function getNextLevel(xp) {
    for (const l of LEVELS) {
      if (xp < l.minXP) return l;
    }
    return null; // Max level reached
  }

  function getLevelProgress(xp) {
    const current = getLevel(xp);
    const next = getNextLevel(xp);
    if (!next) return 100;
    const range = next.minXP - current.minXP;
    const progress = xp - current.minXP;
    return Math.round((progress / range) * 100);
  }

  return {
    LEVELS, XP_REWARDS, ACHIEVEMENTS,
    getLevel, getNextLevel, getLevelProgress
  };
})();
