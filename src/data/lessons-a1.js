// ─── A1 Units ──────────────────────────────────────────
export const UNITS_A1 = [
  {
    id: 'basics', nameKey: 'unit.basics', icon: 'emoji_events', level: 'A1',
    lessons: [
      {
        id: 'basics-1',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Доброе утро', uk: 'Доброго ранку' }, answer: { en: ['Good', 'morning'], no: ['God', 'morgen'] }, bank: { en: ['Hello', 'Good', 'Morning', 'Night', 'Evening'], no: ['Hei', 'God', 'Morgen', 'Natt', 'Kveld'] } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Hello', ru: 'Привет', uk: 'Привіт' }, options: [{ en: 'Hello', no: 'Hei', ru: 'Привет', uk: 'Привіт' }, { en: 'Goodbye', no: 'Ha det', ru: 'До свидания', uk: 'До побачення' }, { en: 'Thank you', no: 'Takk', ru: 'Спасибо', uk: 'Дякую' }, { en: 'Sorry', no: 'Unnskyld', ru: 'Извините', uk: 'Вибачте' }], correctIndex: 0 },
          { type: 'true-false', statement: { en: 'Good morning', no: 'God morgen', ru: 'Добрый вечер', uk: 'Добрий вечір' }, isTrue: false, correctTranslation: { ru: 'Доброе утро', uk: 'Доброго ранку' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Спасибо', uk: 'Дякую' }, answer: { en: ['Thank', 'you'], no: ['Takk'] }, bank: { en: ['Thank', 'You', 'Please', 'Sorry', 'Welcome'], no: ['Takk', 'Vennligst', 'Unnskyld', 'Hei', 'Velkommen'] } },
          { type: 'typing', prompt: { ru: 'Пожалуйста', uk: 'Будь ласка' }, answer: { en: 'Please', no: 'Vennligst' } },
        ]
      },
      {
        id: 'basics-2',
        exercises: [
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Goodbye', ru: 'До свидания', uk: 'До побачення' }, options: [{ en: 'Good night', no: 'God natt', ru: 'Спокойной ночи', uk: 'На добраніч' }, { en: 'Good morning', no: 'God morgen', ru: 'Доброе утро', uk: 'Доброго ранку' }, { en: 'Goodbye', no: 'Ha det', ru: 'До свидания', uk: 'До побачення' }, { en: 'Hello', no: 'Hei', ru: 'Привет', uk: 'Привіт' }], correctIndex: 2 },
          { type: 'true-false', statement: { en: 'Thank you', no: 'Takk', ru: 'Спасибо', uk: 'Дякую' }, isTrue: true },
          { type: 'fill-blank', sentence: { en: '___ morning!', no: '___ morgen!' }, options: { en: ['Good', 'Nice', 'Fine', 'Well'], no: ['God', 'Fin', 'Bra', 'Vel'] }, correctIndex: 0, context: { ru: 'Доброе утро!', uk: 'Доброго ранку!' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'До свидания', uk: 'До побачення' }, answer: { en: ['Goodbye'], no: ['Ha', 'det'] }, bank: { en: ['Goodbye', 'Hello', 'Thanks', 'Please'], no: ['Ha', 'Det', 'Hei', 'Takk', 'Vennligst'] } },
          { type: 'typing', prompt: { ru: 'Привет', uk: 'Привіт' }, answer: { en: 'Hello', no: 'Hei' } },
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
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Добрый вечер', uk: 'Добрий вечір' }, answer: { en: ['Good', 'evening'], no: ['God', 'kveld'] }, bank: { en: ['Good', 'Evening', 'Morning', 'Night', 'Hello'], no: ['God', 'Kveld', 'Morgen', 'Natt', 'Hei'] } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'How are you?', ru: 'Как дела?', uk: 'Як справи?' }, options: [{ en: 'Where are you?', no: 'Hvor er du?', ru: 'Где ты?', uk: 'Де ти?' }, { en: 'How are you?', no: 'Hvordan har du det?', ru: 'Как дела?', uk: 'Як справи?' }, { en: 'Who are you?', no: 'Hvem er du?', ru: 'Кто ты?', uk: 'Хто ти?' }, { en: 'What is this?', no: 'Hva er dette?', ru: 'Что это?', uk: 'Що це?' }], correctIndex: 1 },
          { type: 'sentence-order', words: { en: ['My', 'name', 'is', 'Kira'], no: ['Mitt', 'navn', 'er', 'Kira'] }, answer: { en: ['My', 'name', 'is', 'Kira'], no: ['Mitt', 'navn', 'er', 'Kira'] }, context: { ru: 'Меня зовут Кира', uk: 'Мене звати Кіра' } },
          { type: 'true-false', statement: { en: 'Nice to meet you', no: 'Hyggelig å møte deg', ru: 'Приятно познакомиться', uk: 'Приємно познайомитися' }, isTrue: true },
          { type: 'typing', prompt: { ru: 'Как дела?', uk: 'Як справи?' }, answer: { en: 'How are you', no: 'Hvordan har du det' } },
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
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Red', ru: 'Красный', uk: 'Червоний' }, options: [{ en: 'Blue', no: 'Blå', ru: 'Синий', uk: 'Синій' }, { en: 'Red', no: 'Rød', ru: 'Красный', uk: 'Червоний' }, { en: 'Green', no: 'Grønn', ru: 'Зелёный', uk: 'Зелений' }, { en: 'Yellow', no: 'Gul', ru: 'Жёлтый', uk: 'Жовтий' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Blue', no: 'Blå', ru: 'Зелёный', uk: 'Зелений' }, isTrue: false, correctTranslation: { ru: 'Синий', uk: 'Синій' } },
          { type: 'match-pairs', pairs: [{ en: 'One', no: 'En', local: { ru: 'Один', uk: 'Один' } }, { en: 'Two', no: 'To', local: { ru: 'Два', uk: 'Два' } }, { en: 'Three', no: 'Tre', local: { ru: 'Три', uk: 'Три' } }, { en: 'Four', no: 'Fire', local: { ru: 'Четыре', uk: 'Чотири' } }, { en: 'Five', no: 'Fem', local: { ru: 'Пять', uk: "П'ять" } }] },
          { type: 'typing', prompt: { ru: 'Чёрный', uk: 'Чорний' }, answer: { en: 'Black', no: 'Svart' } },
          { type: 'fill-blank', sentence: { en: 'The sky is ___', no: 'Himmelen er ___' }, options: { en: ['blue', 'red', 'green', 'yellow'], no: ['blå', 'rød', 'grønn', 'gul'] }, correctIndex: 0, context: { ru: 'Небо ___', uk: 'Небо ___' } },
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
          { type: 'match-pairs', pairs: [{ en: 'Mother', no: 'Mor', local: { ru: 'Мама', uk: 'Мама' } }, { en: 'Father', no: 'Far', local: { ru: 'Папа', uk: 'Тато' } }, { en: 'Sister', no: 'Søster', local: { ru: 'Сестра', uk: 'Сестра' } }, { en: 'Brother', no: 'Bror', local: { ru: 'Брат', uk: 'Брат' } }, { en: 'Family', no: 'Familie', local: { ru: 'Семья', uk: "Сім'я" } }] },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Mother', ru: 'Мама', uk: 'Мама' }, options: [{ en: 'Father', no: 'Far', ru: 'Папа', uk: 'Тато' }, { en: 'Mother', no: 'Mor', ru: 'Мама', uk: 'Мама' }, { en: 'Sister', no: 'Søster', ru: 'Сестра', uk: 'Сестра' }, { en: 'Brother', no: 'Bror', ru: 'Брат', uk: 'Брат' }], correctIndex: 1 },
          { type: 'typing', prompt: { ru: 'Брат', uk: 'Брат' }, answer: { en: 'Brother', no: 'Bror' } },
          { type: 'true-false', statement: { en: 'Sister', no: 'Søster', ru: 'Брат', uk: 'Брат' }, isTrue: false, correctTranslation: { ru: 'Сестра', uk: 'Сестра' } },
          { type: 'fill-blank', sentence: { en: 'My ___ is a teacher', no: 'Min ___ er en lærer' }, options: { en: ['mother', 'table', 'car', 'book'], no: ['mor', 'bord', 'bil', 'bok'] }, correctIndex: 0, context: { ru: 'Моя ___ учительница', uk: 'Моя ___ вчителька' } },
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
          { type: 'match-pairs', pairs: [{ en: 'Water', no: 'Vann', local: { ru: 'Вода', uk: 'Вода' } }, { en: 'Bread', no: 'Brød', local: { ru: 'Хлеб', uk: 'Хліб' } }, { en: 'Milk', no: 'Melk', local: { ru: 'Молоко', uk: 'Молоко' } }, { en: 'Apple', no: 'Eple', local: { ru: 'Яблоко', uk: 'Яблуко' } }, { en: 'Tea', no: 'Te', local: { ru: 'Чай', uk: 'Чай' } }] },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Coffee', ru: 'Кофе', uk: 'Кава' }, options: [{ en: 'Tea', no: 'Te', ru: 'Чай', uk: 'Чай' }, { en: 'Milk', no: 'Melk', ru: 'Молоко', uk: 'Молоко' }, { en: 'Coffee', no: 'Kaffe', ru: 'Кофе', uk: 'Кава' }, { en: 'Water', no: 'Vann', ru: 'Вода', uk: 'Вода' }], correctIndex: 2 },
          { type: 'typing', prompt: { ru: 'Яблоко', uk: 'Яблуко' }, answer: { en: 'Apple', no: 'Eple' } },
          { type: 'true-false', statement: { en: 'Cheese', no: 'Ost', ru: 'Сыр', uk: 'Сир' }, isTrue: true },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Я хочу воды', uk: 'Я хочу води' }, answer: { en: ['I', 'want', 'water'], no: ['Jeg', 'vil', 'ha', 'vann'] }, bank: { en: ['I', 'Want', 'Water', 'Milk', 'Tea', 'Need'], no: ['Jeg', 'Vil', 'Ha', 'Vann', 'Melk', 'Te', 'Trenger'] } },
        ]
      }
    ]
  },
];
