// Unified vocabulary — re-exports from per-level modules
import { VOCAB_A1 } from './vocab-a1.js';
import { VOCAB_A2 } from './vocab-a2.js';
import { VOCAB_B1 } from './vocab-b1.js';
import { VOCAB_B2 } from './vocab-b2.js';
import { VOCAB_C1 } from './vocab-c1.js';

export const VOCABULARY = [
  ...VOCAB_A1,
  ...VOCAB_A2,
  ...VOCAB_B1,
  ...VOCAB_B2,
  ...VOCAB_C1,
];

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

// All levels at or below the given level
export function getVocabUpToLevel(level) {
  const idx = LEVELS.indexOf(level);
  if (idx === -1) return VOCABULARY;
  return VOCABULARY.filter(w => LEVELS.indexOf(w.level) <= idx);
}

// Only words at exactly this level
export function getVocabForLevel(level) {
  return VOCABULARY.filter(w => w.level === level);
}

export const KIRA_INSIGHTS = {
  // A1
  cat: { ru: '«Cat» — одно из первых слов, которое учат. Кот или кошка — наши маленькие друзья!', uk: '«Cat» — одне з перших слів, які вчать. Кіт або кішка — наші маленькі друзі!' },
  dog: { ru: '«Dog» — верный друг человека. Интересно, что в английском dog — это и кобель, и сука.', uk: '«Dog» — вірний друг людини. Цікаво, що в англійській dog — це і кобель, і сучка.' },
  apple: { ru: '«Apple» — не только фрукт, но и знаменитая компания! «An apple a day keeps the doctor away.»', uk: '«Apple» — не тільки фрукт, але й відома компанія! «An apple a day keeps the doctor away.»' },
  // A2
  weather: { ru: '«Weather» — отличная тема для small talk! Англичане обожают обсуждать погоду.', uk: '«Weather» — чудова тема для small talk! Англійці обожнюють обговорювати погоду.' },
  beautiful: { ru: '«Beautiful» — сильнее, чем «pretty» или «nice». Используйте для описания чего-то по-настоящему прекрасного!', uk: '«Beautiful» — сильніше, ніж «pretty» або «nice». Використовуйте для опису чогось справді прекрасного!' },
  // B1
  ambitious: { ru: '«Ambitious» — прилагательное для целеустремлённого человека. Ambitious people achieve great things!', uk: '«Ambitious» — прикметник для цілеспрямованої людини. Ambitious people achieve great things!' },
  environment: { ru: '«Environment» — не только окружающая среда, но и обстановка. «Work environment» — рабочая обстановка.', uk: '«Environment» — не тільки довкілля, а й обстановка. «Work environment» — робоча обстановка.' },
  // B2
  piece_of_cake: { ru: '«A piece of cake» — идиома, значит «проще простого». Не путайте с настоящим куском торта! 🍰', uk: '«A piece of cake» — ідіома, означає «простіше простого». Не плутайте зі справжнім шматком торта! 🍰' },
  resilient: { ru: '«Resilient» — способный быстро восстанавливаться. Resilient people bounce back from adversity.', uk: '«Resilient» — здатний швидко відновлюватися. Resilient people bounce back from adversity.' },
  // C1
  paradigm: { ru: '«Paradigm» — модель или образец мышления. «Paradigm shift» — фундаментальное изменение подхода.', uk: '«Paradigm» — модель або зразок мислення. «Paradigm shift» — фундаментальна зміна підходу.' },
  ephemeral: { ru: '«Ephemeral» — мимолётный, существующий очень короткое время. Красивое слово для поэзии!', uk: '«Ephemeral» — мимовільний, що існує дуже короткий час. Гарне слово для поезії!' },
  juxtapose: { ru: '«Juxtapose» — ставить рядом для сравнения. Часто используется в академических текстах.', uk: '«Juxtapose» — ставити поруч для порівняння. Часто використовується в академічних текстах.' },
};
