// Weekday-indexed home workout split (0 = Sunday ... 6 = Saturday), matching
// JS Date#getDay(). Bodyweight + two 3 kg plates only — no bar, bench or
// machines. Edit freely — the dashboard just reads whatever is here for
// the current day.
export const WORKOUT_PLAN = {
  0: {
    title: 'Rest & Recovery',
    focus: 'Rest day',
    isRest: true,
    exercises: [
      { name: 'Easy walk (optional)', sets: '1', reps: '20–30 min' },
      { name: 'Mobility', sets: '1', reps: '8–10 min' },
    ],
  },
  1: {
    title: 'Chest, Side Delts & Triceps',
    focus: 'Chest + Side Delts + Triceps',
    exercises: [
      { name: 'Push-ups', sets: '4', reps: '8–20' },
      { name: 'Feet-elevated push-ups', sets: '3', reps: '6–15' },
      { name: 'Plate squeeze press', sets: '3', reps: '12–20' },
      { name: 'Plate lateral raise', sets: '4', reps: '15–25' },
      { name: 'Diamond push-ups', sets: '3', reps: '6–15' },
      { name: 'Overhead plate triceps extension', sets: '3', reps: '12–20' },
    ],
  },
  2: {
    title: 'Back, Rear Delts, Biceps & Neck',
    focus: 'Back + Rear Delts + Biceps + Neck',
    exercises: [
      { name: 'Plate bent-over row', sets: '4', reps: '12–20' },
      { name: 'One-arm plate row', sets: '3', reps: '12–20/side' },
      { name: 'Prone Y-T-W', sets: '3', reps: '8–12 each' },
      { name: 'Reverse snow angels', sets: '3', reps: '10–15' },
      { name: 'Plate curl', sets: '3', reps: '12–20' },
      { name: 'Hammer-style plate curl', sets: '3', reps: '12–20' },
      { name: 'Neck flexion', sets: '2', reps: '12–15' },
      { name: 'Neck extension', sets: '2', reps: '12–15' },
      { name: 'Neck side flexion', sets: '2', reps: '10–12/side' },
    ],
  },
  3: {
    title: 'Legs, Abs & Cardio',
    focus: 'Legs + Abs + Cardio',
    exercises: [
      { name: 'Bulgarian split squat', sets: '4', reps: '8–15/leg' },
      { name: 'Tempo squat', sets: '3', reps: '15–25' },
      { name: 'Reverse lunge', sets: '3', reps: '10–15/leg' },
      { name: 'Single-leg Romanian deadlift', sets: '3', reps: '10–15/leg' },
      { name: 'Glute bridge', sets: '3', reps: '15–25' },
      { name: 'Single-leg calf raise', sets: '4', reps: '15–25/leg' },
      { name: 'Reverse crunch', sets: '3', reps: '12–20' },
      { name: 'Plank', sets: '3', reps: '30–60 sec' },
      { name: 'Brisk walk', sets: '1', reps: '20–25 min' },
    ],
  },
  4: {
    title: 'Shoulders, Chest & Arms',
    focus: 'Shoulders + Chest + Arms',
    exercises: [
      { name: 'Pike push-ups', sets: '4', reps: '6–15' },
      { name: 'Push-ups', sets: '3', reps: '8–20' },
      { name: 'Plate lateral raise', sets: '4', reps: '15–25' },
      { name: 'Plate rear-delt fly', sets: '3', reps: '12–20' },
      { name: 'Plate squeeze press', sets: '3', reps: '12–20' },
      { name: 'Plate curl', sets: '3', reps: '12–20' },
      { name: 'Overhead plate triceps extension', sets: '3', reps: '12–20' },
    ],
  },
  5: {
    title: 'Back, Lats, Traps, Biceps & Neck',
    focus: 'Back + Lats + Traps + Biceps + Neck',
    exercises: [
      { name: 'One-arm plate row', sets: '4', reps: '12–20/side' },
      { name: 'Plate bent-over row', sets: '3', reps: '12–20' },
      { name: 'Prone Y-T raises', sets: '3', reps: '10–15 each' },
      { name: 'Reverse snow angels', sets: '3', reps: '10–15' },
      { name: 'Plate shrugs', sets: '4', reps: '15–25' },
      { name: 'Hammer-style plate curl', sets: '3', reps: '12–20' },
      { name: 'Neck flexion', sets: '2', reps: '12–15' },
      { name: 'Neck extension', sets: '2', reps: '12–15' },
      { name: 'Neck side flexion', sets: '2', reps: '10–12/side' },
    ],
  },
  6: {
    title: 'Legs, Abs & Cardio',
    focus: 'Legs + Abs + Cardio',
    exercises: [
      { name: 'Bulgarian split squat', sets: '4', reps: '10–15/leg' },
      { name: 'Walking / reverse lunge', sets: '3', reps: '12–20/leg' },
      { name: 'Single-leg glute bridge', sets: '3', reps: '12–20/leg' },
      { name: 'Single-leg calf raise', sets: '4', reps: '15–25/leg' },
      { name: 'Mountain climbers', sets: '3', reps: '30–45 sec' },
      { name: 'Dead bug', sets: '3', reps: '8–12/side' },
      { name: 'Reverse crunch', sets: '3', reps: '12–20' },
      { name: 'Brisk walk', sets: '1', reps: '20–30 min' },
    ],
  },
}
