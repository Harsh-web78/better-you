// The daily checklist. `time` is a display label, `sortKey` (minutes past
// midnight) keeps items in chronological order regardless of edits here.
export const TASKS = [
  { id: 'wake',        time: '7:00 AM',            label: 'Wake up + 500 ml water',            icon: 'Droplet',    sortKey: 7 * 60 },
  { id: 'posture',     time: '7:15 AM',             label: 'Face / posture routine',            detail: '5–10 min', icon: 'Sparkles', sortKey: 7 * 60 + 15 },
  { id: 'breakfast',   time: '7:45 – 8:15 AM',      label: 'Protein-rich breakfast',             icon: 'Utensils',  sortKey: 7 * 60 + 45 },
  { id: 'am-snack',    time: '10:30 AM',            label: 'Snack + 300–400 ml water',          icon: 'Apple',     sortKey: 10 * 60 + 30 },
  { id: 'lunch',       time: '1:00 – 1:30 PM',      label: 'Lunch',                              icon: 'Utensils',  sortKey: 13 * 60 },
  { id: 'movement',    time: '3:30 PM',             label: 'Movement break + 200–300 ml water', icon: 'Footprints',sortKey: 15 * 60 + 30 },
  { id: 'pre-workout', time: '4:00 PM',             label: 'Pre-workout snack',                 icon: 'Zap',       sortKey: 16 * 60 },
  { id: 'pre-water',   time: '4:45 PM',             label: '300–500 ml water',                  icon: 'Droplet',   sortKey: 16 * 60 + 45 },
  { id: 'workout',     time: '5:00 – 6:00 PM',      label: 'Workout',                            icon: 'Dumbbell',  sortKey: 17 * 60, expandable: true },
  { id: 'post-workout',time: '6:30 – 7:00 PM',      label: 'Post-workout meal',                  icon: 'Utensils',  sortKey: 18 * 60 + 30 },
  { id: 'dinner',      time: '8:30 – 9:00 PM',      label: 'Dinner',                             icon: 'Utensils',  sortKey: 20 * 60 + 30 },
  { id: 'night',       time: '10:30 PM',            label: 'Night routine + optional milk/snack',icon: 'Moon',      sortKey: 22 * 60 + 30 },
  { id: 'sleep',       time: '11:00 – 11:30 PM',    label: 'Sleep',                              icon: 'BedDouble', sortKey: 23 * 60 },
]

// A day counts as "complete" for streak purposes once this fraction of
// the checklist is done — misses a task or two without breaking a streak.
export const STREAK_THRESHOLD = 0.8
