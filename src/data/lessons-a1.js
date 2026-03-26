// ─── A1 Units ──────────────────────────────────────────
export const UNITS_A1 = [
  {
    id: 'basics', nameKey: 'unit.basics', icon: 'emoji_events', level: 'A1',
    lessons: [
      {
        id: 'basics-1',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Доброе утро', uk: 'Доброго ранку' }, answer: ['Good', 'morning'], bank: ['Hello', 'Good', 'Morning', 'Night', 'Evening'] },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Hello', ru: 'Привет', uk: 'Привіт' }, options: [{ en: 'Hello', ru: 'Привет', uk: 'Привіт' }, { en: 'Goodbye', ru: 'До свидания', uk: 'До побачення' }, { en: 'Thank you', ru: 'Спасибо', uk: 'Дякую' }, { en: 'Sorry', ru: 'Извините', uk: 'Вибачте' }], correctIndex: 0 },
          { type: 'true-false', statement: { en: 'Good morning', ru: 'Добрый вечер', uk: 'Добрий вечір' }, isTrue: false, correctTranslation: { ru: 'Доброе утро', uk: 'Доброго ранку' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Спасибо', uk: 'Дякую' }, answer: ['Thank', 'you'], bank: ['Thank', 'You', 'Please', 'Sorry', 'Welcome'] },
          { type: 'typing', prompt: { ru: 'Пожалуйста', uk: 'Будь ласка' }, answer: 'Please' },
        ]
      },
      {
        id: 'basics-2',
        exercises: [
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Goodbye', ru: 'До свидания', uk: 'До побачення' }, options: [{ en: 'Good night', ru: 'Спокойной ночи', uk: 'На добраніч' }, { en: 'Good morning', ru: 'Доброе утро', uk: 'Доброго ранку' }, { en: 'Goodbye', ru: 'До свидания', uk: 'До побачення' }, { en: 'Hello', ru: 'Привет', uk: 'Привіт' }], correctIndex: 2 },
          { type: 'true-false', statement: { en: 'Thank you', ru: 'Спасибо', uk: 'Дякую' }, isTrue: true },
          { type: 'fill-blank', sentence: '___ morning!', options: ['Good', 'Nice', 'Fine', 'Well'], correctIndex: 0, context: { ru: 'Доброе утро!', uk: 'Доброго ранку!' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'До свидания', uk: 'До побачення' }, answer: ['Goodbye'], bank: ['Goodbye', 'Hello', 'Thanks', 'Please'] },
          { type: 'typing', prompt: { ru: 'Привет', uk: 'Привіт' }, answer: 'Hello' },
        ]
      }
    ]
  },
  {
    id: 'greetings', nameKey: 'unit.greetings', icon: 'waving_hand', level: 'A1',
    lessons: [
      {
        id: 'greetings-1',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Добрый вечер', uk: 'Добрий вечір' }, answer: ['Good', 'evening'], bank: ['Good', 'Evening', 'Morning', 'Night', 'Hello'] },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'How are you?', ru: 'Как дела?', uk: 'Як справи?' }, options: [{ en: 'Where are you?', ru: 'Где ты?', uk: 'Де ти?' }, { en: 'How are you?', ru: 'Как дела?', uk: 'Як справи?' }, { en: 'Who are you?', ru: 'Кто ты?', uk: 'Хто ти?' }, { en: 'What is this?', ru: 'Что это?', uk: 'Що це?' }], correctIndex: 1 },
          { type: 'sentence-order', words: ['My', 'name', 'is', 'Kira'], answer: ['My', 'name', 'is', 'Kira'], context: { ru: 'Меня зовут Кира', uk: 'Мене звати Кіра' } },
          { type: 'true-false', statement: { en: 'Nice to meet you', ru: 'Приятно познакомиться', uk: 'Приємно познайомитися' }, isTrue: true },
          { type: 'typing', prompt: { ru: 'Как дела?', uk: 'Як справи?' }, answer: 'How are you' },
        ]
      }
    ]
  },
  {
    id: 'numbers_colours', nameKey: 'unit.numbersColours', icon: 'palette', level: 'A1',
    lessons: [
      {
        id: 'numbers-1',
        exercises: [
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Red', ru: 'Красный', uk: 'Червоний' }, options: [{ en: 'Blue', ru: 'Синий', uk: 'Синій' }, { en: 'Red', ru: 'Красный', uk: 'Червоний' }, { en: 'Green', ru: 'Зелёный', uk: 'Зелений' }, { en: 'Yellow', ru: 'Жёлтый', uk: 'Жовтий' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Blue', ru: 'Зелёный', uk: 'Зелений' }, isTrue: false, correctTranslation: { ru: 'Синий', uk: 'Синій' } },
          { type: 'match-pairs', pairs: [{ en: 'One', local: { ru: 'Один', uk: 'Один' } }, { en: 'Two', local: { ru: 'Два', uk: 'Два' } }, { en: 'Three', local: { ru: 'Три', uk: 'Три' } }, { en: 'Four', local: { ru: 'Четыре', uk: 'Чотири' } }, { en: 'Five', local: { ru: 'Пять', uk: "П'ять" } }] },
          { type: 'typing', prompt: { ru: 'Чёрный', uk: 'Чорний' }, answer: 'Black' },
          { type: 'fill-blank', sentence: 'The sky is ___', options: ['blue', 'red', 'green', 'yellow'], correctIndex: 0, context: { ru: 'Небо ___', uk: 'Небо ___' } },
        ]
      }
    ]
  },
  {
    id: 'family', nameKey: 'unit.family', icon: 'family_restroom', level: 'A1',
    lessons: [
      {
        id: 'family-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Mother', local: { ru: 'Мама', uk: 'Мама' } }, { en: 'Father', local: { ru: 'Папа', uk: 'Тато' } }, { en: 'Sister', local: { ru: 'Сестра', uk: 'Сестра' } }, { en: 'Brother', local: { ru: 'Брат', uk: 'Брат' } }, { en: 'Family', local: { ru: 'Семья', uk: "Сім'я" } }] },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Mother', ru: 'Мама', uk: 'Мама' }, options: [{ en: 'Father', ru: 'Папа', uk: 'Тато' }, { en: 'Mother', ru: 'Мама', uk: 'Мама' }, { en: 'Sister', ru: 'Сестра', uk: 'Сестра' }, { en: 'Brother', ru: 'Брат', uk: 'Брат' }], correctIndex: 1 },
          { type: 'typing', prompt: { ru: 'Брат', uk: 'Брат' }, answer: 'Brother' },
          { type: 'true-false', statement: { en: 'Sister', ru: 'Брат', uk: 'Брат' }, isTrue: false, correctTranslation: { ru: 'Сестра', uk: 'Сестра' } },
          { type: 'fill-blank', sentence: 'My ___ is a teacher', options: ['mother', 'table', 'car', 'book'], correctIndex: 0, context: { ru: 'Моя ___ учительница', uk: 'Моя ___ вчителька' } },
        ]
      }
    ]
  },
  {
    id: 'food', nameKey: 'unit.food', icon: 'restaurant', level: 'A1',
    lessons: [
      {
        id: 'food-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Water', local: { ru: 'Вода', uk: 'Вода' } }, { en: 'Bread', local: { ru: 'Хлеб', uk: 'Хліб' } }, { en: 'Milk', local: { ru: 'Молоко', uk: 'Молоко' } }, { en: 'Apple', local: { ru: 'Яблоко', uk: 'Яблуко' } }, { en: 'Tea', local: { ru: 'Чай', uk: 'Чай' } }] },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Coffee', ru: 'Кофе', uk: 'Кава' }, options: [{ en: 'Tea', ru: 'Чай', uk: 'Чай' }, { en: 'Milk', ru: 'Молоко', uk: 'Молоко' }, { en: 'Coffee', ru: 'Кофе', uk: 'Кава' }, { en: 'Water', ru: 'Вода', uk: 'Вода' }], correctIndex: 2 },
          { type: 'typing', prompt: { ru: 'Яблоко', uk: 'Яблуко' }, answer: 'Apple' },
          { type: 'true-false', statement: { en: 'Cheese', ru: 'Сыр', uk: 'Сир' }, isTrue: true },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Я хочу воды', uk: 'Я хочу води' }, answer: ['I', 'want', 'water'], bank: ['I', 'Want', 'Water', 'Milk', 'Tea', 'Need'] },
        ]
      }
    ]
  },
];
