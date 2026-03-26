// LocalStorage-backed store for the Kiralingo app
const STORAGE_KEY = 'kiralingo_data';

const DEFAULT_STATE = {
  lang: 'ru', // 'ru' or 'uk'
  targetLang: 'en', // 'en' or 'no' (English or Norwegian)
  difficulty: 'A1', // 'A1', 'A2', 'B1', 'B2', 'C1'
  streak: { current: 0, lastDate: null, best: 0 },
  xp: { today: 0, total: 0, dailyGoal: 500, lastDate: null },
  hearts: 5,
  gems: 0,
  completedLessons: [],   // lesson IDs
  selectedUnitId: null,      // for jumping to specific units
  currentUnit: 0,
  currentLesson: 0,
  kiraHistory: [],         // [{ role: 'user' | 'model', parts: [{ text: string }] }]
  vocabulary: {},          // { wordId: { mastery: 0-3, lastPracticed: date } }
  achievements: [],        // achievement IDs
  inventory: [],           // [{ id, count, type }]
  userName: 'Learner',
  autoPlayAudio: false,
};

class Store {
  constructor() {
    this._state = this._load();
    this._listeners = [];
    this._checkDailyReset();
  }

  _load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) { /* ignore */ }
    return { ...DEFAULT_STATE };
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (e) { /* ignore */ }
    this._notify();
  }

  _notify() {
    this._listeners.forEach(fn => fn(this._state));
  }

  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }

  get state() { return this._state; }

  _checkDailyReset() {
    const today = new Date().toISOString().slice(0, 10);
    if (this._state.xp.lastDate !== today) {
      // Check streak
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (this._state.xp.lastDate === yesterday) {
        // Continue streak
      } else if (this._state.xp.lastDate && this._state.xp.lastDate !== today) {
        // Streak broken
        this._state.streak.current = 0;
      }
      this._state.xp.today = 0;
      this._state.xp.lastDate = today;
      this._state.hearts = 5;
      this._save();
    }
  }

  addXP(amount) {
    const today = new Date().toISOString().slice(0, 10);
    this._state.xp.today += amount;
    this._state.xp.total += amount;
    this._state.xp.lastDate = today;

    // Update streak
    if (this._state.streak.lastDate !== today) {
      this._state.streak.current += 1;
      this._state.streak.lastDate = today;
      if (this._state.streak.current > this._state.streak.best) {
        this._state.streak.best = this._state.streak.current;
      }
    }

    this._save();
  }

  addGems(amount) {
    this._state.gems += amount;
    this._save();
  }

  buyItem(id, price, type = 'consumable') {
    if (this._state.gems >= price) {
      this._state.gems -= price;
      
      const existing = this._state.inventory.find(i => i.id === id);
      if (existing) {
        existing.count += 1;
      } else {
        this._state.inventory.push({ id, count: 1, type });
      }
      
      this._save();
      return { success: true };
    }
    return { success: false, error: 'insufficient_gems' };
  }

  useItem(id) {
    const itemIdx = this._state.inventory.findIndex(i => i.id === id);
    if (itemIdx !== -1 && this._state.inventory[itemIdx].count > 0) {
      this._state.inventory[itemIdx].count -= 1;
      if (this._state.inventory[itemIdx].count === 0) {
        this._state.inventory.splice(itemIdx, 1);
      }
      this._save();
      return true;
    }
    return false;
  }

  restoreHearts() {
    this._state.hearts = 5;
    this._save();
  }

  loseHeart() {
    if (this._state.hearts > 0) {
      this._state.hearts -= 1;
      this._save();
    }
    return this._state.hearts;
  }

  completeLesson(lessonId) {
    if (!this._state.completedLessons.includes(lessonId)) {
      this._state.completedLessons.push(lessonId);
    }
    this._save();
  }

  isLessonCompleted(lessonId) {
    return this._state.completedLessons.includes(lessonId);
  }

  learnWord(wordId) {
    if (!this._state.vocabulary[wordId]) {
      this._state.vocabulary[wordId] = { mastery: 0, lastPracticed: null };
    }
    this._state.vocabulary[wordId].mastery = Math.min(3, this._state.vocabulary[wordId].mastery + 1);
    this._state.vocabulary[wordId].lastPracticed = new Date().toISOString();
    this._save();
  }

  getWordMastery(wordId) {
    return this._state.vocabulary[wordId]?.mastery || 0;
  }

  unlockAchievement(id) {
    if (!this._state.achievements.includes(id)) {
      this._state.achievements.push(id);
      this._save();
      return true;
    }
    return false;
  }

  setLanguage(lang) {
    this._state.lang = lang;
    this._save();
  }

  setDifficulty(level) {
    this._state.difficulty = level;
    this._save();
  }

  setTargetLang(lang) {
    this._state.targetLang = lang;
    this._save();
  }

  setSelectedUnit(unitId) {
    this._state.selectedUnitId = unitId;
    this._save();
  }

  clearSelectedUnit() {
    this._state.selectedUnitId = null;
    this._save();
  }

  addKiraMessage(role, text) {
    if (!this._state.kiraHistory) this._state.kiraHistory = [];
    this._state.kiraHistory.push({ role, parts: [{ text }] });
    // Keep only last 20 messages for performance
    if (this._state.kiraHistory.length > 20) {
      this._state.kiraHistory.shift();
    }
    this._save();
  }

  clearKiraHistory() {
    this._state.kiraHistory = [];
    this._save();
  }

  setUserName(name) {
    this._state.userName = name;
    this._save();
  }

  setAutoPlayAudio(enabled) {
    this._state.autoPlayAudio = enabled;
    this._save();
  }

  resetProgress() {
    this._state = { ...DEFAULT_STATE, lang: this._state.lang, userName: this._state.userName };
    this._save();
  }

  getLearnedWordCount() {
    return Object.keys(this._state.vocabulary).length;
  }

  getLevel() {
    const totalXP = this._state.xp.total;
    if (totalXP >= 5000) return 10;
    if (totalXP >= 3000) return 8;
    if (totalXP >= 2000) return 6;
    if (totalXP >= 1000) return 4;
    if (totalXP >= 500) return 3;
    if (totalXP >= 200) return 2;
    return 1;
  }
}

export const store = new Store();
