// Unified lessons index — re-exports from per-level modules
import { UNITS_A1 } from './lessons-a1.js';
import { UNITS_A2 } from './lessons-a2.js';
import { UNITS_B1 } from './lessons-b1.js';
import { UNITS_B2 } from './lessons-b2.js';
import { UNITS_C1 } from './lessons-c1.js';

export const ALL_UNITS = [...UNITS_A1, ...UNITS_A2, ...UNITS_B1, ...UNITS_B2, ...UNITS_C1];

// Legacy export (filtered by difficulty)
export function getUnitsForLevel(level) {
  return ALL_UNITS.filter(u => u.level === level);
}

// Kept for backward compat — returns units for the store's current difficulty
export function getActiveUnits(store) {
  return getUnitsForLevel(store.state.difficulty || 'A1');
}

// Same interface as before but filtered by difficulty
export function getNextLesson(store) {
  const units = getActiveUnits(store);
  const selectedUnitId = store.state.selectedUnitId;

  // If a specific unit is selected, only look for lessons in that unit
  if (selectedUnitId) {
    const unitIndex = units.findIndex(u => u.id === selectedUnitId);
    if (unitIndex !== -1) {
      const unit = units[unitIndex];
      for (let li = 0; li < unit.lessons.length; li++) {
        const lesson = unit.lessons[li];
        if (!store.isLessonCompleted(lesson.id)) {
          return { unitIndex, lessonIndex: li, lesson, unit };
        }
      }
      // If all lessons in selected unit are completed, fall back to sequential
    }
  }

  // Default sequential logic
  for (let ui = 0; ui < units.length; ui++) {
    const unit = units[ui];
    for (let li = 0; li < unit.lessons.length; li++) {
      const lesson = unit.lessons[li];
      if (!store.isLessonCompleted(lesson.id)) {
        return { unitIndex: ui, lessonIndex: li, lesson, unit };
      }
    }
  }
  return null; // All completed for this level
}

// Legacy alias
export const UNITS = ALL_UNITS;
