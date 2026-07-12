/* ============================================================
   PROJECT PRIME — Exercise Library
   Searchable/filterable exercise database
   ============================================================ */

window.ExerciseLibrary = (() => {
  const EXERCISES = [
    // === CHEST ===
    { id: 'ex-1', name: 'Barbell Bench Press', primary: 'Chest', secondary: 'Triceps, Front Delts', group: 'chest', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Lie flat, feet planted. Grip bar slightly wider than shoulders.', 'Unrack bar, lower to mid-chest with control.', 'Press up explosively to full lockout.', 'Keep shoulder blades retracted throughout.'], mistakes: ['Bouncing bar off chest', 'Flaring elbows 90°', 'Lifting hips'], alternatives: ['Dumbbell Bench Press', 'Machine Press'] },
    { id: 'ex-2', name: 'Incline Barbell Press', primary: 'Upper Chest', secondary: 'Front Delts, Triceps', group: 'chest', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Set bench to 30° incline.', 'Grip slightly wider than shoulders.', 'Lower to upper chest, press up.'], mistakes: ['Bench too steep (>45°)', 'Losing arch'], alternatives: ['Incline Dumbbell Press'] },
    { id: 'ex-3', name: 'Flat Dumbbell Press', primary: 'Chest', secondary: 'Triceps', group: 'chest', equipment: 'Dumbbells', difficulty: 'Intermediate', steps: ['Sit on bench, dumbbells on thighs.', 'Kick back and press up.', 'Lower with control, elbows at 45°.', 'Press up, squeezing chest at top.'], mistakes: ['Dumbbells too wide', 'Partial range'], alternatives: ['Barbell Bench'] },
    { id: 'ex-4', name: 'Cable Flyes', primary: 'Chest', secondary: 'Front Delts', group: 'chest', equipment: 'Cable', difficulty: 'Intermediate', steps: ['Set cables to shoulder height.', 'Step forward, slight lean.', 'Bring handles together with slight elbow bend.', 'Squeeze chest, control return.'], mistakes: ['Bending arms too much', 'Using momentum'], alternatives: ['Dumbbell Flyes', 'Pec Deck'] },
    { id: 'ex-5', name: 'Push-ups', primary: 'Chest', secondary: 'Triceps, Core', group: 'chest', equipment: 'Bodyweight', difficulty: 'Beginner', steps: ['Hands shoulder-width, body straight.', 'Lower chest to near floor.', 'Push up to full extension.'], mistakes: ['Sagging hips', 'Not going deep enough'], alternatives: ['Incline Push-ups', 'Decline Push-ups'] },

    // === BACK ===
    { id: 'ex-10', name: 'Conventional Deadlift', primary: 'Full Back', secondary: 'Glutes, Hamstrings', group: 'back', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Bar over mid-foot. Hip-width stance.', 'Hinge at hips, grip outside knees.', 'Brace core, drive through floor.', 'Lock out hips at top.'], mistakes: ['Rounding back', 'Bar too far from body', 'Jerking weight'], alternatives: ['Trap Bar Deadlift', 'Sumo Deadlift'] },
    { id: 'ex-11', name: 'Barbell Row', primary: 'Mid Back', secondary: 'Lats, Biceps', group: 'back', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Hinge at hips, 45° torso angle.', 'Pull bar to lower chest.', 'Squeeze shoulder blades.', 'Lower with control.'], mistakes: ['Too upright', 'Using momentum'], alternatives: ['Dumbbell Row', 'T-Bar Row'] },
    { id: 'ex-12', name: 'Lat Pulldown', primary: 'Lats', secondary: 'Biceps, Rear Delts', group: 'back', equipment: 'Cable', difficulty: 'Intermediate', steps: ['Wide grip, lean back slightly.', 'Pull bar to upper chest.', 'Squeeze lats at bottom.', 'Return with full stretch.'], mistakes: ['Pulling behind neck', 'Using too much momentum'], alternatives: ['Pull-ups', 'Neutral Grip Pulldown'] },
    { id: 'ex-13', name: 'Seated Cable Row', primary: 'Mid Back', secondary: 'Lats, Biceps', group: 'back', equipment: 'Cable', difficulty: 'Intermediate', steps: ['Sit tall, feet on platform.', 'Pull handle to lower ribs.', 'Squeeze blades together.', 'Return with stretch.'], mistakes: ['Excessive lean', 'Rounding shoulders'], alternatives: ['Machine Row'] },
    { id: 'ex-14', name: 'Pull-ups', primary: 'Lats', secondary: 'Biceps, Core', group: 'back', equipment: 'Bodyweight', difficulty: 'Advanced', steps: ['Overhand grip, slightly wider than shoulders.', 'Pull chin over bar.', 'Lower with control to full hang.'], mistakes: ['Kipping', 'Partial reps', 'Crossing legs'], alternatives: ['Lat Pulldown', 'Assisted Pull-ups'] },

    // === SHOULDERS ===
    { id: 'ex-20', name: 'Overhead Press', primary: 'Front Delts', secondary: 'Side Delts, Triceps', group: 'shoulders', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Bar at collarbone height.', 'Brace core, press overhead.', 'Lock out, bring head through.', 'Lower to collarbone.'], mistakes: ['Excessive back lean', 'Not locking out'], alternatives: ['Dumbbell Press', 'Machine Press'] },
    { id: 'ex-21', name: 'Lateral Raises', primary: 'Side Delts', secondary: 'Traps', group: 'shoulders', equipment: 'Dumbbells', difficulty: 'Beginner', steps: ['Arms at sides, slight elbow bend.', 'Raise to shoulder height.', 'Lead with pinky/elbow.', 'Lower with control.'], mistakes: ['Too heavy', 'Shrugging', 'Swinging'], alternatives: ['Cable Lateral Raises'] },
    { id: 'ex-22', name: 'Face Pulls', primary: 'Rear Delts', secondary: 'Rotator Cuff, Traps', group: 'shoulders', equipment: 'Cable', difficulty: 'Beginner', steps: ['Set cable high, rope attachment.', 'Pull to face, elbows high.', 'External rotate at end.', 'Squeeze rear delts.'], mistakes: ['Too heavy', 'No external rotation'], alternatives: ['Reverse Flyes'] },
    { id: 'ex-23', name: 'Arnold Press', primary: 'All Delts', secondary: 'Triceps', group: 'shoulders', equipment: 'Dumbbells', difficulty: 'Intermediate', steps: ['Start with palms facing you at chin.', 'Rotate as you press up.', 'Full rotation at lockout.', 'Reverse on the way down.'], mistakes: ['No rotation', 'Too heavy'], alternatives: ['Dumbbell Press'] },
    { id: 'ex-24', name: 'Barbell Shrugs', primary: 'Traps', secondary: 'Rhomboids', group: 'shoulders', equipment: 'Barbell', difficulty: 'Beginner', steps: ['Hold barbell at thighs.', 'Shrug straight up to ears.', 'Hold 2 seconds at top.', 'Lower with control.'], mistakes: ['Rolling shoulders', 'Too light'], alternatives: ['Dumbbell Shrugs'] },

    // === ARMS ===
    { id: 'ex-30', name: 'Barbell Curl', primary: 'Biceps', secondary: 'Forearms', group: 'arms', equipment: 'Barbell', difficulty: 'Intermediate', steps: ['Shoulder-width grip on barbell.', 'Curl up, keeping elbows at sides.', 'Squeeze at top.', 'Lower with control.'], mistakes: ['Body swing', 'Moving elbows'], alternatives: ['EZ Bar Curl', 'Dumbbell Curl'] },
    { id: 'ex-31', name: 'Hammer Curls', primary: 'Brachialis', secondary: 'Biceps, Forearms', group: 'arms', equipment: 'Dumbbells', difficulty: 'Beginner', steps: ['Neutral grip (palms facing each other).', 'Curl up, keep elbows steady.', 'Squeeze at top.', 'Lower slowly.'], mistakes: ['Swinging', 'Partial range'], alternatives: ['Rope Cable Curls'] },
    { id: 'ex-32', name: 'Tricep Pushdowns', primary: 'Triceps', secondary: 'None', group: 'arms', equipment: 'Cable', difficulty: 'Beginner', steps: ['Rope or bar attachment.', 'Elbows pinned to sides.', 'Push down to full extension.', 'Slow negative return.'], mistakes: ['Elbow movement', 'Body lean'], alternatives: ['Overhead Extension'] },
    { id: 'ex-33', name: 'Skull Crushers', primary: 'Triceps', secondary: 'None', group: 'arms', equipment: 'EZ Bar', difficulty: 'Intermediate', steps: ['Lie flat, EZ bar overhead.', 'Lower to forehead by bending elbows.', 'Extend back up.', 'Keep upper arms still.'], mistakes: ['Flaring elbows', 'Too heavy'], alternatives: ['Cable Overhead Extension'] },
    { id: 'ex-34', name: 'Concentration Curls', primary: 'Biceps Peak', secondary: 'None', group: 'arms', equipment: 'Dumbbell', difficulty: 'Beginner', steps: ['Seated, elbow on inner thigh.', 'Curl up, squeezing hard.', 'Hold at top 1 sec.', 'Lower slowly.'], mistakes: ['Using momentum', 'Moving elbow'], alternatives: ['Spider Curls'] },
    { id: 'ex-35', name: 'Wrist Curls', primary: 'Forearms', secondary: 'None', group: 'arms', equipment: 'Barbell', difficulty: 'Beginner', steps: ['Rest forearms on bench or knees.', 'Curl wrists up.', 'Full range of motion.', 'High reps (15-20).'], mistakes: ['Moving forearms', 'Too heavy'], alternatives: ['Dumbbell Wrist Curls'] },
    { id: 'ex-36', name: 'Dips', primary: 'Triceps', secondary: 'Chest, Front Delts', group: 'arms', equipment: 'Dip Station', difficulty: 'Intermediate', steps: ['Grip bars, arms straight.', 'Lower until upper arms parallel.', 'Lean forward for chest emphasis.', 'Press up to lockout.'], mistakes: ['Going too deep', 'Shrugging shoulders'], alternatives: ['Bench Dips', 'Machine Dips'] },

    // === LEGS ===
    { id: 'ex-40', name: 'Barbell Back Squat', primary: 'Quads', secondary: 'Glutes, Hamstrings, Core', group: 'legs', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Bar on upper traps, feet shoulder-width.', 'Break at hips and knees together.', 'Squat to parallel or below.', 'Drive through full foot.'], mistakes: ['Knees caving', 'Rising on toes', 'Not hitting depth'], alternatives: ['Front Squat', 'Goblet Squat'] },
    { id: 'ex-41', name: 'Romanian Deadlift', primary: 'Hamstrings', secondary: 'Glutes, Lower Back', group: 'legs', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Stand tall with bar.', 'Hinge at hips, pushing them back.', 'Lower bar along legs.', 'Feel hamstring stretch, return.'], mistakes: ['Rounding back', 'Too much knee bend'], alternatives: ['Dumbbell RDL'] },
    { id: 'ex-42', name: 'Leg Press', primary: 'Quads', secondary: 'Glutes', group: 'legs', equipment: 'Machine', difficulty: 'Intermediate', steps: ['Feet shoulder-width on platform.', 'Lower platform to 90° knee bend.', 'Press up, don\'t lock knees.'], mistakes: ['Locking knees', 'Hips lifting'], alternatives: ['Hack Squat'] },
    { id: 'ex-43', name: 'Walking Lunges', primary: 'Quads', secondary: 'Glutes, Hamstrings', group: 'legs', equipment: 'Dumbbells', difficulty: 'Intermediate', steps: ['Hold dumbbells at sides.', 'Step forward into lunge.', 'Back knee near floor.', 'Drive through front heel to next step.'], mistakes: ['Short steps', 'Leaning forward'], alternatives: ['Reverse Lunges', 'Bulgarian Split Squats'] },
    { id: 'ex-44', name: 'Leg Curl', primary: 'Hamstrings', secondary: 'Calves', group: 'legs', equipment: 'Machine', difficulty: 'Beginner', steps: ['Lie face down on machine.', 'Curl weight up, squeeze hammies.', 'Control the negative.'], mistakes: ['Lifting hips', 'Partial reps'], alternatives: ['Nordic Curls'] },
    { id: 'ex-45', name: 'Leg Extension', primary: 'Quads', secondary: 'None', group: 'legs', equipment: 'Machine', difficulty: 'Beginner', steps: ['Sit in machine, adjust pad.', 'Extend legs fully.', 'Hold 1 sec at top.', 'Lower with control.'], mistakes: ['Using momentum', 'Partial extension'], alternatives: ['Sissy Squats'] },
    { id: 'ex-46', name: 'Calf Raises', primary: 'Calves', secondary: 'None', group: 'legs', equipment: 'Machine', difficulty: 'Beginner', steps: ['Stand on platform edge.', 'Rise up on toes fully.', 'Hold squeeze at top.', 'Lower slowly to deep stretch.'], mistakes: ['Bouncing', 'No full stretch'], alternatives: ['Seated Calf Raises'] },
    { id: 'ex-47', name: 'Front Squat', primary: 'Quads', secondary: 'Core, Glutes', group: 'legs', equipment: 'Barbell', difficulty: 'Advanced', steps: ['Clean grip or cross-arm.', 'Keep elbows high.', 'Squat upright to depth.', 'Drive up maintaining position.'], mistakes: ['Elbows dropping', 'Forward lean'], alternatives: ['Goblet Squat'] },

    // === CORE ===
    { id: 'ex-50', name: 'Hanging Leg Raises', primary: 'Lower Abs', secondary: 'Hip Flexors', group: 'core', equipment: 'Pull-up Bar', difficulty: 'Advanced', steps: ['Hang from bar, arms straight.', 'Raise legs to 90° or above.', 'Control the negative.', 'Avoid swinging.'], mistakes: ['Swinging', 'Using momentum', 'Partial range'], alternatives: ['Knee Raises', 'Captain Chair'] },
    { id: 'ex-51', name: 'Plank', primary: 'Core', secondary: 'Shoulders', group: 'core', equipment: 'Bodyweight', difficulty: 'Beginner', steps: ['Forearms on floor, body straight.', 'Brace core tight.', 'Hold position without sagging.', 'Breathe steadily.'], mistakes: ['Hips sagging', 'Hips too high'], alternatives: ['Side Plank'] },
    { id: 'ex-52', name: 'Russian Twists', primary: 'Obliques', secondary: 'Abs', group: 'core', equipment: 'Plate', difficulty: 'Intermediate', steps: ['Seated, lean back slightly.', 'Feet off floor (harder) or on floor.', 'Rotate torso side to side.', 'Touch weight to floor each side.'], mistakes: ['Only moving arms', 'No rotation'], alternatives: ['Cable Woodchops'] },
    { id: 'ex-53', name: 'Ab Wheel Rollout', primary: 'Core', secondary: 'Lats, Shoulders', group: 'core', equipment: 'Ab Wheel', difficulty: 'Advanced', steps: ['Kneel, grip ab wheel.', 'Roll forward, extending body.', 'Go as far as you can control.', 'Roll back using abs.'], mistakes: ['Sagging hips', 'Going too far'], alternatives: ['Stability Ball Rollout'] },
    { id: 'ex-54', name: 'Cable Crunches', primary: 'Abs', secondary: 'None', group: 'core', equipment: 'Cable', difficulty: 'Intermediate', steps: ['Kneel facing cable, rope behind head.', 'Crunch down, rounding spine.', 'Squeeze abs hard at bottom.', 'Control return.'], mistakes: ['Using hip flexors', 'Not rounding spine'], alternatives: ['Weighted Crunches'] },

    // === CARDIO / CONDITIONING ===
    { id: 'ex-60', name: 'Incline Treadmill Walk', primary: 'Cardio', secondary: 'Calves, Glutes', group: 'cardio', equipment: 'Treadmill', difficulty: 'Beginner', steps: ['Set incline 10-12%.', 'Speed 5.5-6.0 km/h.', 'Walk naturally, no holding rails.', 'Maintain for 20-30 min.'], mistakes: ['Holding rails', 'Speed too fast'], alternatives: ['Outdoor Walk', 'Stair Master'] },
    { id: 'ex-61', name: 'Battle Ropes', primary: 'Full Body', secondary: 'Core, Shoulders', group: 'cardio', equipment: 'Battle Rope', difficulty: 'Intermediate', steps: ['Athletic stance, one rope each hand.', 'Alternate slams or double slams.', 'Use full body, not just arms.', '30 sec on, 30 sec off.'], mistakes: ['Only using arms', 'Standing too upright'], alternatives: ['Slam Ball'] },
    { id: 'ex-62', name: 'Kettlebell Swings', primary: 'Glutes', secondary: 'Hamstrings, Core, Shoulders', group: 'cardio', equipment: 'Kettlebell', difficulty: 'Intermediate', steps: ['Hinge at hips, not squat.', 'Swing KB between legs.', 'Explosively drive hips forward.', 'Arm swing is passive.'], mistakes: ['Squatting', 'Using arms to lift', 'Rounding back'], alternatives: ['Dumbbell Swings'] },
    { id: 'ex-63', name: 'Farmer\'s Walk', primary: 'Grip', secondary: 'Core, Traps, Full Body', group: 'cardio', equipment: 'Dumbbells', difficulty: 'Beginner', steps: ['Heavy weight in each hand.', 'Stand tall, brace core.', 'Walk with purpose.', '40m or 30-45 seconds.'], mistakes: ['Leaning', 'Too light'], alternatives: ['Trap Bar Carry'] },
    { id: 'ex-64', name: 'Box Jumps', primary: 'Explosive Power', secondary: 'Quads, Calves', group: 'cardio', equipment: 'Plyo Box', difficulty: 'Intermediate', steps: ['Stand in front of box.', 'Swing arms, jump up.', 'Land softly, full foot.', 'Step down (don\'t jump).'], mistakes: ['Landing hard', 'Jumping down'], alternatives: ['Jump Squats'] },
    { id: 'ex-65', name: 'Burpees', primary: 'Full Body', secondary: 'Cardio', group: 'cardio', equipment: 'Bodyweight', difficulty: 'Intermediate', steps: ['Stand, drop to push-up position.', 'Perform push-up.', 'Jump feet to hands.', 'Jump up with arms overhead.'], mistakes: ['No push-up', 'Landing stiff'], alternatives: ['Squat Thrusts'] }
  ];

  function getAll() { return EXERCISES; }

  function getByGroup(group) {
    return EXERCISES.filter(e => e.group === group);
  }

  function search(query) {
    const q = query.toLowerCase();
    return EXERCISES.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.primary.toLowerCase().includes(q) ||
      e.secondary.toLowerCase().includes(q) ||
      e.equipment.toLowerCase().includes(q)
    );
  }

  function getById(id) {
    return EXERCISES.find(e => e.id === id);
  }

  function getGroups() {
    return ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'cardio'];
  }

  return { EXERCISES, getAll, getByGroup, search, getById, getGroups };
})();
