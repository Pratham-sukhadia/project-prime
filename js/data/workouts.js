/* ============================================================
   PROJECT PRIME — Workout Data
   Complete 7-day split with progressive overload
   ============================================================ */

window.WorkoutData = (() => {

  // Progressive overload modifiers per week
  const WEEK_MODIFIERS = {
    1: { repsAdd: 0, weightAdd: 0, label: 'Foundation' },
    2: { repsAdd: 1, weightAdd: 0, label: 'Volume Push' },
    3: { repsAdd: 0, weightAdd: 2.5, label: 'Strength Push' },
    4: { repsAdd: -2, weightAdd: -5, label: 'Deload' }
  };

  const PROGRAMS = {
    0: getSunday(),
    1: getMonday(),
    2: getTuesday(),
    3: getWednesday(),
    4: getThursday(),
    5: getFriday(),
    6: getSaturday()
  };

  function getMonday() {
    return {
      name: 'Push Day',
      focus: 'Chest • Triceps • Front Delts',
      muscles: ['chest', 'shoulders', 'arms'],
      emoji: '🔥',
      estimatedTime: '75-90 min',
      warmup: [
        { name: 'Arm Circles', duration: '30 sec each direction' },
        { name: 'Band Pull-Aparts', sets: 2, reps: 15 },
        { name: 'Light Dumbbell Press', sets: 2, reps: 12, note: 'Very light weight' },
        { name: 'Push-ups', sets: 1, reps: 10 }
      ],
      exercises: [
        {
          id: 'mon-1',
          name: 'Incline Barbell Bench Press',
          muscle: 'Upper Chest',
          muscleGroup: 'chest',
          sets: 4,
          reps: '8-10',
          rest: 120,
          weight: 50,
          equipment: 'Barbell',
          difficulty: 'Advanced',
          tips: 'Set bench to 30-degree angle. Retract shoulder blades. Arch upper back slightly. Controlled negative, explosive press.',
          mistakes: 'Flaring elbows too wide. Bouncing off chest. Losing shoulder blade retraction.',
          alternatives: ['Incline Dumbbell Press', 'Incline Smith Machine Press'],
          activation: 'Upper pectorals, anterior deltoids, triceps'
        },
        {
          id: 'mon-2',
          name: 'Flat Dumbbell Press',
          muscle: 'Mid Chest',
          muscleGroup: 'chest',
          sets: 4,
          reps: '10-12',
          rest: 90,
          weight: 22,
          equipment: 'Dumbbells',
          difficulty: 'Intermediate',
          tips: 'Full range of motion. Squeeze at the top. Keep wrists stacked over elbows.',
          mistakes: 'Going too heavy and losing ROM. Not bringing dumbbells low enough.',
          alternatives: ['Barbell Bench Press', 'Machine Chest Press'],
          activation: 'Pectoralis major, triceps, anterior deltoids'
        },
        {
          id: 'mon-3',
          name: 'Cable Flyes (Low to High)',
          muscle: 'Upper Chest',
          muscleGroup: 'chest',
          sets: 3,
          reps: '12-15',
          rest: 60,
          weight: 10,
          equipment: 'Cable',
          difficulty: 'Intermediate',
          tips: 'Slight forward lean. Bring hands together at chest height. Focus on the squeeze.',
          mistakes: 'Using too much weight. Bending arms excessively. Losing control on eccentric.',
          alternatives: ['Incline Dumbbell Flyes', 'Pec Deck Machine'],
          activation: 'Upper pectorals, serratus anterior'
        },
        {
          id: 'mon-4',
          name: 'Overhead Press (Standing)',
          muscle: 'Front Delts',
          muscleGroup: 'shoulders',
          sets: 4,
          reps: '8-10',
          rest: 120,
          weight: 35,
          equipment: 'Barbell',
          difficulty: 'Advanced',
          tips: 'Brace core tight. Press in a slight arc around your face. Lock out overhead. Avoid excessive lean.',
          mistakes: 'Leaning back too much. Not bracing core. Half reps.',
          alternatives: ['Seated Dumbbell Press', 'Machine Shoulder Press'],
          activation: 'Anterior deltoids, lateral deltoids, triceps, upper chest'
        },
        {
          id: 'mon-5',
          name: 'Lateral Raises',
          muscle: 'Side Delts',
          muscleGroup: 'shoulders',
          sets: 4,
          reps: '12-15',
          rest: 60,
          weight: 8,
          equipment: 'Dumbbells',
          difficulty: 'Intermediate',
          tips: 'Slight bend in elbows. Lead with pinky up. Raise to shoulder height. Controlled negative.',
          mistakes: 'Using momentum. Shrugging shoulders. Going too heavy.',
          alternatives: ['Cable Lateral Raises', 'Machine Lateral Raises'],
          activation: 'Lateral deltoids, supraspinatus'
        },
        {
          id: 'mon-6',
          name: 'Tricep Pushdowns (Rope)',
          muscle: 'Triceps',
          muscleGroup: 'arms',
          sets: 3,
          reps: '12-15',
          rest: 60,
          weight: 20,
          equipment: 'Cable',
          difficulty: 'Intermediate',
          tips: 'Keep elbows pinned. Spread rope at the bottom. Full extension. Slow negative.',
          mistakes: 'Moving elbows. Using shoulder momentum. Cutting range short.',
          alternatives: ['Straight Bar Pushdowns', 'V-Bar Pushdowns'],
          activation: 'Triceps (all three heads), emphasis on lateral head'
        },
        {
          id: 'mon-7',
          name: 'Overhead Tricep Extension (Cable)',
          muscle: 'Triceps Long Head',
          muscleGroup: 'arms',
          sets: 3,
          reps: '12-15',
          rest: 60,
          weight: 15,
          equipment: 'Cable',
          difficulty: 'Intermediate',
          tips: 'Face away from machine. Step forward for stretch. Keep elbows tight to head.',
          mistakes: 'Flaring elbows. Using too much weight. Not getting full stretch.',
          alternatives: ['Dumbbell Overhead Extension', 'Skull Crushers'],
          activation: 'Triceps long head'
        },
        {
          id: 'mon-8',
          name: 'Diamond Push-ups',
          muscle: 'Triceps / Inner Chest',
          muscleGroup: 'arms',
          sets: 3,
          reps: 'To Failure',
          rest: 60,
          weight: 0,
          equipment: 'Bodyweight',
          difficulty: 'Intermediate',
          tips: 'Hands close together forming diamond shape. Lower chest to hands. Full extension.',
          mistakes: 'Sagging hips. Not going deep enough. Rushing reps.',
          alternatives: ['Close Grip Push-ups', 'Bench Dips'],
          activation: 'Triceps, inner chest, anterior deltoids'
        }
      ],
      core: [
        {
          id: 'mon-c1',
          name: 'Hanging Leg Raises',
          muscle: 'Lower Abs',
          muscleGroup: 'core',
          sets: 3,
          reps: '12-15',
          rest: 45,
          equipment: 'Pull-up Bar'
        },
        {
          id: 'mon-c2',
          name: 'Bicycle Crunches',
          muscle: 'Obliques',
          muscleGroup: 'core',
          sets: 3,
          reps: '20 each side',
          rest: 45,
          equipment: 'Bodyweight'
        }
      ],
      finisher: {
        name: 'HIIT Finisher',
        type: 'hiit',
        exercises: [
          { name: 'Burpees', duration: '30 sec' },
          { name: 'Rest', duration: '30 sec' },
          { name: 'Mountain Climbers', duration: '30 sec' },
          { name: 'Rest', duration: '30 sec' }
        ],
        rounds: 3,
        totalTime: '12 min'
      }
    };
  }

  function getTuesday() {
    return {
      name: 'Leg Day',
      focus: 'Quads • Hamstrings • Glutes • Calves',
      muscles: ['legs', 'core'],
      emoji: '🦵',
      estimatedTime: '90-100 min',
      warmup: [
        { name: 'Leg Swings', duration: '30 sec each leg' },
        { name: 'Bodyweight Squats', sets: 2, reps: 15 },
        { name: 'Walking Lunges', sets: 1, reps: '10 each leg' },
        { name: 'Hip Circles', duration: '30 sec each direction' }
      ],
      exercises: [
        {
          id: 'tue-1', name: 'Barbell Back Squat', muscle: 'Quads / Glutes', muscleGroup: 'legs',
          sets: 4, reps: '6-8', rest: 150, weight: 70, equipment: 'Barbell', difficulty: 'Advanced',
          tips: 'Break at hips and knees simultaneously. Drive through full foot. Keep chest up. Hit parallel or below.',
          mistakes: 'Knees caving inward. Rising on toes. Not hitting depth. Excessive forward lean.',
          alternatives: ['Front Squat', 'Goblet Squat', 'Leg Press'],
          activation: 'Quadriceps, glutes, hamstrings, core'
        },
        {
          id: 'tue-2', name: 'Romanian Deadlift', muscle: 'Hamstrings / Glutes', muscleGroup: 'legs',
          sets: 4, reps: '8-10', rest: 120, weight: 60, equipment: 'Barbell', difficulty: 'Advanced',
          tips: 'Hinge at hips. Keep bar close to legs. Feel stretch in hamstrings. Squeeze glutes at top.',
          mistakes: 'Rounding lower back. Bending knees too much. Not feeling hamstring stretch.',
          alternatives: ['Dumbbell RDL', 'Single-Leg RDL'],
          activation: 'Hamstrings, glutes, erectors'
        },
        {
          id: 'tue-3', name: 'Leg Press', muscle: 'Quads', muscleGroup: 'legs',
          sets: 3, reps: '10-12', rest: 90, weight: 120, equipment: 'Machine', difficulty: 'Intermediate',
          tips: 'Feet shoulder-width, mid-platform. Full range of motion. Don\'t lock knees at top.',
          mistakes: 'Placing feet too high. Locking out knees. Lifting hips off pad.',
          alternatives: ['Hack Squat', 'Smith Machine Squat'],
          activation: 'Quadriceps, glutes'
        },
        {
          id: 'tue-4', name: 'Walking Lunges', muscle: 'Quads / Glutes', muscleGroup: 'legs',
          sets: 3, reps: '12 each leg', rest: 90, weight: 16, equipment: 'Dumbbells', difficulty: 'Intermediate',
          tips: 'Long stride. Back knee nearly touches floor. Push through front heel.',
          mistakes: 'Short steps. Leaning forward. Knee going past toes excessively.',
          alternatives: ['Reverse Lunges', 'Bulgarian Split Squats'],
          activation: 'Quadriceps, glutes, hamstrings'
        },
        {
          id: 'tue-5', name: 'Leg Curl (Lying)', muscle: 'Hamstrings', muscleGroup: 'legs',
          sets: 3, reps: '10-12', rest: 60, weight: 30, equipment: 'Machine', difficulty: 'Intermediate',
          tips: 'Full range of motion. Squeeze at the top. Control the negative.',
          mistakes: 'Using momentum. Lifting hips off pad. Partial reps.',
          alternatives: ['Seated Leg Curl', 'Nordic Curls'],
          activation: 'Hamstrings, calves'
        },
        {
          id: 'tue-6', name: 'Leg Extension', muscle: 'Quads', muscleGroup: 'legs',
          sets: 3, reps: '12-15', rest: 60, weight: 35, equipment: 'Machine', difficulty: 'Beginner',
          tips: 'Full extension at top. Hold squeeze for 1 second. Controlled eccentric.',
          mistakes: 'Using momentum to swing weight. Not reaching full extension.',
          alternatives: ['Sissy Squats', 'Wall Sits'],
          activation: 'Quadriceps (emphasis on rectus femoris)'
        },
        {
          id: 'tue-7', name: 'Standing Calf Raises', muscle: 'Calves', muscleGroup: 'legs',
          sets: 4, reps: '15-20', rest: 45, weight: 40, equipment: 'Machine', difficulty: 'Beginner',
          tips: 'Full stretch at bottom. Pause at top. Slow eccentric. Feel the burn.',
          mistakes: 'Bouncing reps. Not using full range. Going too fast.',
          alternatives: ['Seated Calf Raises', 'Donkey Calf Raises'],
          activation: 'Gastrocnemius, soleus'
        }
      ],
      core: [
        {
          id: 'tue-c1', name: 'Hanging Knee Raises', muscle: 'Lower Abs', muscleGroup: 'core',
          sets: 3, reps: '15', rest: 45, equipment: 'Pull-up Bar'
        },
        {
          id: 'tue-c2', name: 'Plank', muscle: 'Core', muscleGroup: 'core',
          sets: 3, reps: '45-60 sec', rest: 30, equipment: 'Bodyweight'
        }
      ],
      finisher: {
        name: 'Incline Walk',
        type: 'cardio',
        duration: '25 min',
        details: 'Treadmill incline 10-12%, speed 5.5-6.0 km/h',
        calories: '~200 kcal'
      }
    };
  }

  function getWednesday() {
    return {
      name: 'Pull Day',
      focus: 'Back Width • Thickness • Rear Delts • Biceps',
      muscles: ['back', 'arms', 'shoulders'],
      emoji: '💪',
      estimatedTime: '75-90 min',
      warmup: [
        { name: 'Band Pull-Aparts', sets: 2, reps: 15 },
        { name: 'Lat Pulldown (Light)', sets: 2, reps: 12 },
        { name: 'Face Pulls (Light)', sets: 2, reps: 15 },
        { name: 'Dead Hangs', duration: '30 sec' }
      ],
      exercises: [
        {
          id: 'wed-1', name: 'Barbell Deadlift', muscle: 'Full Back / Posterior Chain', muscleGroup: 'back',
          sets: 4, reps: '5-6', rest: 180, weight: 90, equipment: 'Barbell', difficulty: 'Advanced',
          tips: 'Hinge at hips. Bar stays close. Brace core. Drive through heels. Lockout with glutes.',
          mistakes: 'Rounding back. Bar drifting forward. Jerking the weight. Hyperextending at top.',
          alternatives: ['Trap Bar Deadlift', 'Rack Pulls'],
          activation: 'Erectors, lats, traps, glutes, hamstrings, forearms'
        },
        {
          id: 'wed-2', name: 'Barbell Bent-Over Row', muscle: 'Back Thickness', muscleGroup: 'back',
          sets: 4, reps: '8-10', rest: 120, weight: 55, equipment: 'Barbell', difficulty: 'Advanced',
          tips: 'Torso at 45 degrees. Pull to lower chest/upper abs. Squeeze shoulder blades.',
          mistakes: 'Using too much body English. Standing too upright. Not squeezing at top.',
          alternatives: ['Dumbbell Row', 'T-Bar Row'],
          activation: 'Lats, rhomboids, rear deltoids, biceps'
        },
        {
          id: 'wed-3', name: 'Wide-Grip Lat Pulldown', muscle: 'Back Width', muscleGroup: 'back',
          sets: 3, reps: '10-12', rest: 90, weight: 50, equipment: 'Cable', difficulty: 'Intermediate',
          tips: 'Lean back slightly. Pull to upper chest. Squeeze lats at bottom. Control return.',
          mistakes: 'Pulling behind neck. Using too much momentum. Not getting full stretch.',
          alternatives: ['Pull-ups', 'Close Grip Pulldown'],
          activation: 'Latissimus dorsi, teres major'
        },
        {
          id: 'wed-4', name: 'Seated Cable Row', muscle: 'Mid Back', muscleGroup: 'back',
          sets: 3, reps: '10-12', rest: 90, weight: 45, equipment: 'Cable', difficulty: 'Intermediate',
          tips: 'Sit tall. Pull handle to stomach. Squeeze shoulder blades. Controlled return with stretch.',
          mistakes: 'Leaning back too far. Rounding shoulders. Using momentum.',
          alternatives: ['Chest-Supported Row', 'Machine Row'],
          activation: 'Rhomboids, mid traps, lats, rear deltoids'
        },
        {
          id: 'wed-5', name: 'Face Pulls', muscle: 'Rear Delts / Rotator Cuff', muscleGroup: 'shoulders',
          sets: 3, reps: '15-20', rest: 60, weight: 15, equipment: 'Cable', difficulty: 'Beginner',
          tips: 'Pull to face level. External rotate at end. Squeeze rear delts. High rep quality work.',
          mistakes: 'Going too heavy. Not externally rotating. Shrugging shoulders.',
          alternatives: ['Reverse Pec Deck', 'Band Face Pulls'],
          activation: 'Rear deltoids, rotator cuff, mid traps'
        },
        {
          id: 'wed-6', name: 'Barbell Shrugs', muscle: 'Traps', muscleGroup: 'back',
          sets: 3, reps: '12-15', rest: 60, weight: 60, equipment: 'Barbell', difficulty: 'Beginner',
          tips: 'Straight up and down. Hold at top for 2 seconds. Heavy but controlled.',
          mistakes: 'Rolling shoulders. Using momentum. Not holding at top.',
          alternatives: ['Dumbbell Shrugs', 'Trap Bar Shrugs'],
          activation: 'Upper trapezius'
        },
        {
          id: 'wed-7', name: 'Barbell Curl', muscle: 'Biceps', muscleGroup: 'arms',
          sets: 3, reps: '10-12', rest: 60, weight: 25, equipment: 'Barbell', difficulty: 'Intermediate',
          tips: 'Keep elbows at sides. Full range of motion. Squeeze at top. Controlled negative.',
          mistakes: 'Swinging body. Moving elbows forward. Using momentum.',
          alternatives: ['EZ Bar Curl', 'Dumbbell Curl'],
          activation: 'Biceps brachii, brachialis'
        },
        {
          id: 'wed-8', name: 'Hammer Curls', muscle: 'Brachialis / Forearms', muscleGroup: 'arms',
          sets: 3, reps: '10-12', rest: 60, weight: 12, equipment: 'Dumbbells', difficulty: 'Beginner',
          tips: 'Neutral grip. Alternating or together. Squeeze forearms. Control both directions.',
          mistakes: 'Swinging weights. Not using full range. Going too fast.',
          alternatives: ['Cross-Body Hammer Curls', 'Rope Cable Curls'],
          activation: 'Brachialis, brachioradialis, biceps'
        },
        {
          id: 'wed-9', name: 'Wrist Curls', muscle: 'Forearms', muscleGroup: 'arms',
          sets: 3, reps: '15-20', rest: 45, weight: 10, equipment: 'Barbell', difficulty: 'Beginner',
          tips: 'Rest forearms on bench. Full range of motion. Squeeze at top.',
          mistakes: 'Moving forearms. Going too heavy. Rushing reps.',
          alternatives: ['Dumbbell Wrist Curls', 'Behind-Back Wrist Curls'],
          activation: 'Wrist flexors, forearms'
        }
      ],
      core: [
        {
          id: 'wed-c1', name: 'Plank Variations', muscle: 'Core', muscleGroup: 'core',
          sets: 3, reps: '30 sec each', rest: 30, equipment: 'Bodyweight',
          note: 'Standard → Side Plank Left → Side Plank Right'
        }
      ],
      finisher: null
    };
  }

  function getThursday() {
    return {
      name: 'Cardio + Weak Points',
      focus: 'Conditioning • Shoulders • Core • Mobility',
      muscles: ['cardio', 'shoulders', 'core'],
      emoji: '🏃',
      estimatedTime: '60-75 min',
      warmup: [
        { name: 'Dynamic Stretching', duration: '5 min' },
        { name: 'Light Jog / Cycling', duration: '5 min' }
      ],
      exercises: [
        {
          id: 'thu-1', name: 'Incline Walk / Cycling', muscle: 'Cardio', muscleGroup: 'cardio',
          sets: 1, reps: '30-45 min', rest: 0, weight: 0, equipment: 'Treadmill / Bike', difficulty: 'Beginner',
          tips: 'Incline 10-12% if treadmill. Moderate intensity, can hold conversation. Heart rate 120-140 bpm.',
          mistakes: 'Going too intense. Holding treadmill handles. Inconsistent pace.',
          alternatives: ['Outdoor Walk', 'Stair Master', 'Elliptical'],
          activation: 'Full body, cardiovascular system'
        },
        {
          id: 'thu-2', name: 'Lateral Raises (Light)', muscle: 'Side Delts', muscleGroup: 'shoulders',
          sets: 4, reps: '15-20', rest: 45, weight: 6, equipment: 'Dumbbells', difficulty: 'Beginner',
          tips: 'High reps, light weight. Focus on mind-muscle connection. Controlled tempo.',
          mistakes: 'Going too heavy on recovery day. Using momentum.',
          alternatives: ['Cable Lateral Raises'],
          activation: 'Lateral deltoids'
        },
        {
          id: 'thu-3', name: 'Rotator Cuff External Rotation', muscle: 'Rotator Cuff', muscleGroup: 'shoulders',
          sets: 3, reps: '15 each arm', rest: 45, weight: 3, equipment: 'Dumbbell / Cable', difficulty: 'Beginner',
          tips: 'Elbow at 90 degrees at side. Rotate outward slowly. Light weight only.',
          mistakes: 'Going too heavy. Moving elbow away from body.',
          alternatives: ['Band External Rotation'],
          activation: 'Infraspinatus, teres minor'
        },
        {
          id: 'thu-4', name: 'Neck Curls', muscle: 'Neck', muscleGroup: 'core',
          sets: 3, reps: '15-20', rest: 45, weight: 5, equipment: 'Plate', difficulty: 'Beginner',
          tips: 'Lie face up on bench with head off edge. Place plate on forehead. Curl chin to chest.',
          mistakes: 'Using too much weight. Jerky movements.',
          alternatives: ['Neck Harness', 'Manual Resistance'],
          activation: 'Sternocleidomastoid, neck flexors'
        },
        {
          id: 'thu-5', name: 'Reverse Wrist Curls', muscle: 'Forearm Extensors', muscleGroup: 'arms',
          sets: 3, reps: '15-20', rest: 45, weight: 8, equipment: 'Barbell', difficulty: 'Beginner',
          tips: 'Overhand grip. Rest forearms on bench. Full range of motion.',
          mistakes: 'Going too heavy. Moving forearms.',
          alternatives: ['Dumbbell Reverse Curls'],
          activation: 'Wrist extensors, brachioradialis'
        }
      ],
      core: [
        {
          id: 'thu-c1', name: 'Ab Wheel Rollout', muscle: 'Core', muscleGroup: 'core',
          sets: 3, reps: '10-12', rest: 60, equipment: 'Ab Wheel'
        },
        {
          id: 'thu-c2', name: 'Dead Bug', muscle: 'Core Stability', muscleGroup: 'core',
          sets: 3, reps: '10 each side', rest: 45, equipment: 'Bodyweight'
        },
        {
          id: 'thu-c3', name: 'Bird Dog', muscle: 'Core / Lower Back', muscleGroup: 'core',
          sets: 3, reps: '10 each side', rest: 45, equipment: 'Bodyweight'
        }
      ],
      finisher: {
        name: 'Stretching & Mobility',
        type: 'stretching',
        duration: '15 min',
        exercises: [
          'Hip Flexor Stretch — 60 sec each',
          'Pigeon Pose — 60 sec each',
          'Hamstring Stretch — 60 sec each',
          'Chest Doorway Stretch — 60 sec',
          'Cat-Cow — 10 reps',
          'Child\'s Pose — 60 sec',
          'Thoracic Rotation — 10 each side'
        ]
      }
    };
  }

  function getFriday() {
    return {
      name: 'Hybrid Strength',
      focus: 'Powerlifting • Functional • Explosive',
      muscles: ['chest', 'back', 'legs', 'core'],
      emoji: '⚡',
      estimatedTime: '75-90 min',
      warmup: [
        { name: 'Dynamic Full Body Warm-up', duration: '5 min' },
        { name: 'Light Bench Press', sets: 2, reps: 10 },
        { name: 'Light Deadlift', sets: 2, reps: 8 },
        { name: 'Bodyweight Squats', sets: 1, reps: 15 }
      ],
      exercises: [
        {
          id: 'fri-1', name: 'Heavy Bench Press', muscle: 'Chest / Triceps', muscleGroup: 'chest',
          sets: 5, reps: '3-5', rest: 180, weight: 65, equipment: 'Barbell', difficulty: 'Advanced',
          tips: 'Powerlifting setup. Tight arch. Leg drive. Controlled descent, explosive press. Aim for PRs.',
          mistakes: 'Losing tightness. Inconsistent bar path. Bouncing off chest.',
          alternatives: ['Close Grip Bench', 'Floor Press'],
          activation: 'Pectoralis major, anterior deltoids, triceps'
        },
        {
          id: 'fri-2', name: 'Trap Bar Deadlift', muscle: 'Full Body', muscleGroup: 'back',
          sets: 4, reps: '5-6', rest: 180, weight: 100, equipment: 'Trap Bar', difficulty: 'Advanced',
          tips: 'Stand in center. Grip handles firmly. Drive through floor. Keep chest up.',
          mistakes: 'Rounding back. Shifting weight to toes. Not locking out.',
          alternatives: ['Conventional Deadlift', 'Sumo Deadlift'],
          activation: 'Quads, glutes, hamstrings, traps, forearms'
        },
        {
          id: 'fri-3', name: 'Front Squat', muscle: 'Quads / Core', muscleGroup: 'legs',
          sets: 4, reps: '6-8', rest: 150, weight: 50, equipment: 'Barbell', difficulty: 'Advanced',
          tips: 'Clean grip or cross-arm. Keep elbows high. Upright torso. Full depth.',
          mistakes: 'Elbows dropping. Forward lean. Wrist pain (adjust grip).',
          alternatives: ['Goblet Squat', 'Zercher Squat'],
          activation: 'Quadriceps, core, glutes'
        },
        {
          id: 'fri-4', name: 'Farmer\'s Walk', muscle: 'Grip / Core / Full Body', muscleGroup: 'core',
          sets: 3, reps: '40 meters', rest: 90, weight: 30, equipment: 'Dumbbells', difficulty: 'Intermediate',
          tips: 'Heavy dumbbells or farmer handles. Tall posture. Brace core. Walk with purpose.',
          mistakes: 'Leaning to one side. Losing grip. Too short distance.',
          alternatives: ['Suitcase Carry', 'Waiter Walk'],
          activation: 'Forearms, traps, core, legs'
        },
        {
          id: 'fri-5', name: 'Battle Rope Slams', muscle: 'Full Body / Cardio', muscleGroup: 'cardio',
          sets: 4, reps: '30 sec', rest: 60, weight: 0, equipment: 'Battle Rope', difficulty: 'Intermediate',
          tips: 'Athletic stance. Slam with full force. Alternate or double-arm. Keep core braced.',
          mistakes: 'Only using arms. Standing too upright. Not using full force.',
          alternatives: ['Slam Ball Throws', 'Kettlebell Swings'],
          activation: 'Shoulders, lats, core, legs'
        },
        {
          id: 'fri-6', name: 'Kettlebell Swings', muscle: 'Posterior Chain', muscleGroup: 'legs',
          sets: 3, reps: '15-20', rest: 60, weight: 16, equipment: 'Kettlebell', difficulty: 'Intermediate',
          tips: 'Hip hinge, not squat. Explosive hip drive. Arms are just pendulums. Power from glutes.',
          mistakes: 'Squatting the swing. Using arms to lift. Not hinging properly.',
          alternatives: ['Dumbbell Swings', 'Hip Thrusts'],
          activation: 'Glutes, hamstrings, core, shoulders'
        },
        {
          id: 'fri-7', name: 'Box Jumps', muscle: 'Explosive Power', muscleGroup: 'legs',
          sets: 3, reps: '8-10', rest: 90, weight: 0, equipment: 'Plyo Box', difficulty: 'Intermediate',
          tips: 'Start with moderate height. Swing arms. Land softly. Step down, don\'t jump.',
          mistakes: 'Landing hard. Not using arms. Jumping down (injury risk).',
          alternatives: ['Jump Squats', 'Broad Jumps'],
          activation: 'Quads, glutes, calves, fast-twitch fibers'
        }
      ],
      core: [],
      finisher: {
        name: 'HIIT Finisher',
        type: 'hiit',
        exercises: [
          { name: 'Kettlebell Swings', duration: '30 sec' },
          { name: 'Rest', duration: '20 sec' },
          { name: 'Burpees', duration: '30 sec' },
          { name: 'Rest', duration: '20 sec' },
          { name: 'Mountain Climbers', duration: '30 sec' },
          { name: 'Rest', duration: '20 sec' }
        ],
        rounds: 3,
        totalTime: '15 min'
      }
    };
  }

  function getSaturday() {
    return {
      name: 'Arm Specialization',
      focus: 'Biceps • Triceps • Forearms • Shoulders',
      muscles: ['arms', 'shoulders', 'core'],
      emoji: '💎',
      estimatedTime: '45 / 90 min',
      isSaturday: true,
      fastingDay: true,
      morningQuick: {
        name: 'Quick Arms (IELTS Morning)',
        time: '45 min',
        exercises: [
          {
            id: 'sat-q1', name: 'EZ Bar Curl + Skull Crushers (Superset)', muscle: 'Biceps / Triceps', muscleGroup: 'arms',
            sets: 4, reps: '10-12 each', rest: 60, weight: 20, equipment: 'EZ Bar', difficulty: 'Intermediate',
            tips: 'Superset for efficiency. Minimal rest between exercises.',
            mistakes: 'Rushing form. Not controlling negatives.',
            alternatives: ['Dumbbell Curls + Overhead Extension'],
            activation: 'Biceps, triceps'
          },
          {
            id: 'sat-q2', name: 'Hammer Curl + Tricep Dips (Superset)', muscle: 'Arms', muscleGroup: 'arms',
            sets: 3, reps: '12 + To Failure', rest: 60, weight: 12, equipment: 'Dumbbells / Dip Station', difficulty: 'Intermediate',
            tips: 'Hammer curls to dips immediately. Bodyweight dips are fine.',
            mistakes: 'Going too heavy on hammers. Not going deep enough on dips.',
            alternatives: ['Concentration Curl + Pushdowns'],
            activation: 'Brachialis, triceps'
          },
          {
            id: 'sat-q3', name: 'Wrist Curls + Reverse Curls', muscle: 'Forearms', muscleGroup: 'arms',
            sets: 3, reps: '15-20', rest: 45, weight: 8, equipment: 'Barbell', difficulty: 'Beginner',
            tips: 'High reps for forearm pump. Full range of motion.',
            mistakes: 'Going too heavy. Rushing reps.',
            alternatives: ['Farmer Holds'],
            activation: 'Wrist flexors, brachioradialis'
          },
          {
            id: 'sat-q4', name: 'Lateral Raises', muscle: 'Side Delts', muscleGroup: 'shoulders',
            sets: 3, reps: '15', rest: 45, weight: 7, equipment: 'Dumbbells', difficulty: 'Beginner',
            tips: 'Light weight, high reps. Focus on contraction.',
            mistakes: 'Ego lifting.',
            alternatives: ['Cable Lateral Raises'],
            activation: 'Lateral deltoids'
          }
        ],
        core: [
          {
            id: 'sat-qc1', name: 'Ab Circuit', muscle: 'Core', muscleGroup: 'core',
            sets: 2, reps: '30 sec each', rest: 60, equipment: 'Bodyweight',
            note: 'Crunches → Leg Raises → Russian Twists → Plank'
          }
        ]
      },
      eveningFull: {
        name: 'Full Arm Day',
        time: '90 min',
        exercises: [
          {
            id: 'sat-e1', name: 'Barbell Curl (Standing)', muscle: 'Biceps', muscleGroup: 'arms',
            sets: 4, reps: '8-10', rest: 90, weight: 27.5, equipment: 'Barbell', difficulty: 'Intermediate',
            tips: 'Strict form. No swinging. Full range of motion. Squeeze hard at top.',
            mistakes: 'Leaning back. Partial reps. Using momentum.',
            alternatives: ['EZ Bar Curl'],
            activation: 'Biceps brachii (long and short head)'
          },
          {
            id: 'sat-e2', name: 'Close-Grip Bench Press', muscle: 'Triceps', muscleGroup: 'arms',
            sets: 4, reps: '8-10', rest: 90, weight: 45, equipment: 'Barbell', difficulty: 'Intermediate',
            tips: 'Hands shoulder-width. Keep elbows close. Heavy compound for triceps mass.',
            mistakes: 'Grip too narrow (wrist strain). Flaring elbows.',
            alternatives: ['JM Press', 'Dips'],
            activation: 'Triceps, inner chest'
          },
          {
            id: 'sat-e3', name: 'Incline Dumbbell Curl', muscle: 'Biceps Long Head', muscleGroup: 'arms',
            sets: 3, reps: '10-12', rest: 60, weight: 10, equipment: 'Dumbbells', difficulty: 'Intermediate',
            tips: 'Incline bench 45 degrees. Let arms hang. Maximizes stretch on long head.',
            mistakes: 'Swinging. Bench too flat. Moving elbows forward.',
            alternatives: ['Preacher Curl'],
            activation: 'Biceps long head'
          },
          {
            id: 'sat-e4', name: 'Overhead Tricep Extension (Dumbbell)', muscle: 'Triceps Long Head', muscleGroup: 'arms',
            sets: 3, reps: '10-12', rest: 60, weight: 16, equipment: 'Dumbbell', difficulty: 'Intermediate',
            tips: 'Seated, hold dumbbell with both hands overhead. Lower behind head. Extend fully.',
            mistakes: 'Flaring elbows. Not getting full stretch. Using too much weight.',
            alternatives: ['Cable Overhead Extension'],
            activation: 'Triceps long head'
          },
          {
            id: 'sat-e5', name: 'Concentration Curls', muscle: 'Biceps Peak', muscleGroup: 'arms',
            sets: 3, reps: '12-15', rest: 45, weight: 10, equipment: 'Dumbbell', difficulty: 'Beginner',
            tips: 'Elbow against inner thigh. Pure isolation. Squeeze hard at top. Slow negative.',
            mistakes: 'Using body momentum. Not squeezing at top.',
            alternatives: ['Spider Curls', 'Cable Curl'],
            activation: 'Biceps short head, peak'
          },
          {
            id: 'sat-e6', name: 'Tricep Kickbacks', muscle: 'Triceps', muscleGroup: 'arms',
            sets: 3, reps: '12-15', rest: 45, weight: 8, equipment: 'Dumbbells', difficulty: 'Beginner',
            tips: 'Hinge forward. Upper arm parallel to floor. Extend fully. Hold at top.',
            mistakes: 'Moving upper arm. Not fully extending. Going too heavy.',
            alternatives: ['Cable Kickbacks'],
            activation: 'Triceps (all heads, emphasis lateral)'
          },
          {
            id: 'sat-e7', name: 'Wrist Curl + Reverse Wrist Curl', muscle: 'Forearms', muscleGroup: 'arms',
            sets: 3, reps: '20 each', rest: 45, weight: 8, equipment: 'Barbell', difficulty: 'Beginner',
            tips: 'Superset both directions. High reps for pump.',
            mistakes: 'Rushing. Not using full range.',
            alternatives: ['Farmer Holds', 'Gripper'],
            activation: 'Wrist flexors and extensors'
          },
          {
            id: 'sat-e8', name: 'Arnold Press', muscle: 'Shoulders', muscleGroup: 'shoulders',
            sets: 3, reps: '10-12', rest: 60, weight: 12, equipment: 'Dumbbells', difficulty: 'Intermediate',
            tips: 'Start palms facing you. Rotate as you press up. Full rotation at top.',
            mistakes: 'Not fully rotating. Going too heavy. Pressing forward.',
            alternatives: ['Dumbbell Shoulder Press'],
            activation: 'All three deltoid heads'
          },
          {
            id: 'sat-e9', name: 'Front Raises', muscle: 'Front Delts', muscleGroup: 'shoulders',
            sets: 3, reps: '12-15', rest: 45, weight: 8, equipment: 'Dumbbells', difficulty: 'Beginner',
            tips: 'Alternating arms. Raise to eye level. Controlled movement.',
            mistakes: 'Swinging. Going above eye level unnecessarily.',
            alternatives: ['Cable Front Raise', 'Plate Front Raise'],
            activation: 'Anterior deltoids'
          }
        ],
        core: [
          {
            id: 'sat-ec1', name: 'Cable Crunches', muscle: 'Abs', muscleGroup: 'core',
            sets: 3, reps: '15-20', rest: 45, equipment: 'Cable'
          },
          {
            id: 'sat-ec2', name: 'Russian Twists', muscle: 'Obliques', muscleGroup: 'core',
            sets: 3, reps: '15 each side', rest: 45, equipment: 'Plate / Dumbbell'
          }
        ],
        cardioFinish: {
          name: 'Light Cardio',
          type: 'cardio',
          duration: '15 min',
          details: 'Incline walk or cycling at easy pace'
        }
      }
    };
  }

  function getSunday() {
    return {
      name: 'Recovery Day',
      focus: 'Stretching • Yoga • Foam Rolling • Walk',
      muscles: ['cardio'],
      emoji: '🧘',
      estimatedTime: '45-60 min',
      isRecovery: true,
      cheatMealAllowed: true,
      exercises: [
        {
          id: 'sun-1', name: 'Yoga Flow', muscle: 'Full Body', muscleGroup: 'cardio',
          sets: 1, reps: '15 min', rest: 0, weight: 0, equipment: 'Mat', difficulty: 'Beginner',
          tips: 'Sun salutations → Warrior poses → Tree pose → Triangle → Child\'s pose.',
          mistakes: 'Forcing flexibility. Not breathing. Rushing.',
          alternatives: ['Guided Yoga Video'],
          activation: 'Full body flexibility, balance, mindfulness'
        },
        {
          id: 'sun-2', name: 'Foam Rolling', muscle: 'Recovery', muscleGroup: 'cardio',
          sets: 1, reps: '15 min', rest: 0, weight: 0, equipment: 'Foam Roller', difficulty: 'Beginner',
          tips: 'Roll each muscle group 1-2 min: Quads, Hamstrings, IT Band, Calves, Back, Lats.',
          mistakes: 'Rolling too fast. Rolling directly on bone/joints. Holding breath.',
          alternatives: ['Massage Ball', 'Lacrosse Ball'],
          activation: 'Myofascial release, recovery'
        },
        {
          id: 'sun-3', name: 'Full Body Stretching', muscle: 'Flexibility', muscleGroup: 'cardio',
          sets: 1, reps: '15 min', rest: 0, weight: 0, equipment: 'Mat', difficulty: 'Beginner',
          tips: 'Hold each stretch 30-60 sec. Breathe deeply. Never bounce. Relax into the stretch.',
          mistakes: 'Bouncing. Holding breath. Stretching cold muscles.',
          alternatives: ['Assisted Stretching'],
          activation: 'Full body flexibility'
        },
        {
          id: 'sun-4', name: 'Outdoor Walk', muscle: 'Cardio / Mental Health', muscleGroup: 'cardio',
          sets: 1, reps: '30 min', rest: 0, weight: 0, equipment: 'None', difficulty: 'Beginner',
          tips: 'Easy pace. Enjoy nature. Family time. No phone if possible.',
          mistakes: 'Walking too fast. Not enjoying the moment.',
          alternatives: ['Light Cycling', 'Swimming'],
          activation: 'Cardiovascular, mental recovery'
        }
      ],
      core: [],
      finisher: null
    };
  }

  function getProgram(dayIndex) {
    return PROGRAMS[dayIndex] || PROGRAMS[0];
  }

  function getTodayProgram() {
    return getProgram(new Date().getDay());
  }

  return {
    WEEK_MODIFIERS,
    getProgram,
    getTodayProgram,
    getMonday, getTuesday, getWednesday, getThursday, getFriday, getSaturday, getSunday
  };
})();
