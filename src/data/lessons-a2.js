// ─── A2 Units ──────────────────────────────────────────
export const UNITS_A2 = [
  {
    id: 'daily_routine', nameKey: 'unit.dailyRoutine', icon: 'schedule', level: 'A2',
    lessons: [
      {
        id: 'daily-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Breakfast', local: { ru: 'Завтрак', uk: 'Сніданок' } }, { en: 'Lunch', local: { ru: 'Обед', uk: 'Обід' } }, { en: 'Dinner', local: { ru: 'Ужин', uk: 'Вечеря' } }, { en: 'Morning', local: { ru: 'Утро', uk: 'Ранок' } }, { en: 'Evening', local: { ru: 'Вечер', uk: 'Вечір' } }] },
          { type: 'sentence-order', words: ['I', 'have', 'breakfast', 'every', 'morning'], answer: ['I', 'have', 'breakfast', 'every', 'morning'], context: { ru: 'Я завтракаю каждое утро', uk: 'Я снідаю щоранку' } },
          { type: 'fill-blank', sentence: 'I ___ to school every day', options: ['go', 'eat', 'sleep', 'drink'], correctIndex: 0, context: { ru: 'Я ___ в школу каждый день', uk: 'Я ___ до школи щодня' } },
          { type: 'typing', prompt: { ru: 'Завтрак', uk: 'Сніданок' }, answer: 'Breakfast' },
          { type: 'true-false', statement: { en: 'Weekend', ru: 'Будни', uk: 'Будні' }, isTrue: false, correctTranslation: { ru: 'Выходные', uk: 'Вихідні' } },
        ]
      },
      {
        id: 'daily-2',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Я иду на работу', uk: 'Я йду на роботу' }, answer: ['I', 'go', 'to', 'work'], bank: ['I', 'Go', 'To', 'Work', 'School', 'Am'] },
          { type: 'fill-blank', sentence: 'She ___ dinner at 7 PM', options: ['cooks', 'reads', 'drives', 'swims'], correctIndex: 0, context: { ru: 'Она ___ ужин в 7 вечера', uk: 'Вона ___ вечерю о 7' } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Weekend', ru: 'Выходные', uk: 'Вихідні' }, options: [{ en: 'Monday', ru: 'Понедельник', uk: 'Понеділок' }, { en: 'Holiday', ru: 'Праздник', uk: 'Свято' }, { en: 'Weekend', ru: 'Выходные', uk: 'Вихідні' }, { en: 'Morning', ru: 'Утро', uk: 'Ранок' }], correctIndex: 2 },
          { type: 'sentence-order', words: ['We', 'study', 'English', 'together'], answer: ['We', 'study', 'English', 'together'], context: { ru: 'Мы учим английский вместе', uk: 'Ми вчимо англійську разом' } },
          { type: 'typing', prompt: { ru: 'Работать', uk: 'Працювати' }, answer: 'Work' },
        ]
      }
    ]
  },
  {
    id: 'shopping', nameKey: 'unit.shopping', icon: 'shopping_cart', level: 'A2',
    lessons: [
      {
        id: 'shopping-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Money', local: { ru: 'Деньги', uk: 'Гроші' } }, { en: 'Price', local: { ru: 'Цена', uk: 'Ціна' } }, { en: 'Cheap', local: { ru: 'Дешёвый', uk: 'Дешевий' } }, { en: 'Expensive', local: { ru: 'Дорогой', uk: 'Дорогий' } }, { en: 'Market', local: { ru: 'Рынок', uk: 'Ринок' } }] },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Сколько это стоит?', uk: 'Скільки це коштує?' }, answer: ['How', 'much', 'is', 'this'], bank: ['How', 'Much', 'Is', 'This', 'That', 'Many'] },
          { type: 'fill-blank', sentence: 'This shirt is too ___', options: ['expensive', 'happy', 'fast', 'blue'], correctIndex: 0, context: { ru: 'Эта рубашка слишком ___', uk: 'Ця сорочка занадто ___' } },
          { type: 'true-false', statement: { en: 'Buy', ru: 'Продавать', uk: 'Продавати' }, isTrue: false, correctTranslation: { ru: 'Покупать', uk: 'Купувати' } },
          { type: 'typing', prompt: { ru: 'Деньги', uk: 'Гроші' }, answer: 'Money' },
        ]
      }
    ]
  },
  {
    id: 'weather_unit', nameKey: 'unit.weather', icon: 'cloud', level: 'A2',
    lessons: [
      {
        id: 'weather-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Rain', local: { ru: 'Дождь', uk: 'Дощ' } }, { en: 'Snow', local: { ru: 'Снег', uk: 'Сніг' } }, { en: 'Sun', local: { ru: 'Солнце', uk: 'Сонце' } }, { en: 'Wind', local: { ru: 'Ветер', uk: 'Вітер' } }, { en: 'Cloud', local: { ru: 'Облако', uk: 'Хмара' } }] },
          { type: 'fill-blank', sentence: 'It is ___ today, take an umbrella', options: ['rainy', 'sunny', 'warm', 'cold'], correctIndex: 0, context: { ru: 'Сегодня ___, возьми зонт', uk: 'Сьогодні ___, візьми парасольку' } },
          { type: 'sentence-order', words: ['The', 'weather', 'is', 'beautiful', 'today'], answer: ['The', 'weather', 'is', 'beautiful', 'today'], context: { ru: 'Сегодня прекрасная погода', uk: 'Сьогодні чудова погода' } },
          { type: 'true-false', statement: { en: 'Snow', ru: 'Снег', uk: 'Сніг' }, isTrue: true },
          { type: 'typing', prompt: { ru: 'Погода', uk: 'Погода' }, answer: 'Weather' },
        ]
      }
    ]
  },
  {
    id: 'home_furniture', nameKey: 'unit.home', icon: 'home', level: 'A2',
    lessons: [
      {
        id: 'home-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Kitchen', local: { ru: 'Кухня', uk: 'Кухня' } }, { en: 'Bedroom', local: { ru: 'Спальня', uk: 'Спальня' } }, { en: 'Bathroom', local: { ru: 'Ванная', uk: 'Ванна' } }, { en: 'Table', local: { ru: 'Стол', uk: 'Стіл' } }, { en: 'Chair', local: { ru: 'Стул', uk: 'Стілець' } }] },
          { type: 'fill-blank', sentence: 'Please close the ___', options: ['door', 'sun', 'rain', 'fish'], correctIndex: 0, context: { ru: 'Пожалуйста, закройте ___', uk: 'Будь ласка, зачиніть ___' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Моя комната большая', uk: 'Моя кімната велика' }, answer: ['My', 'room', 'is', 'big'], bank: ['My', 'Room', 'Is', 'Big', 'Small', 'Your'] },
          { type: 'typing', prompt: { ru: 'Окно', uk: 'Вікно' }, answer: 'Window' },
          { type: 'true-false', statement: { en: 'Garden', ru: 'Сад', uk: 'Сад' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'emotions', nameKey: 'unit.emotions', icon: 'mood', level: 'A2',
    lessons: [
      {
        id: 'emotions-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Happy', local: { ru: 'Счастливый', uk: 'Щасливий' } }, { en: 'Sad', local: { ru: 'Грустный', uk: 'Сумний' } }, { en: 'Angry', local: { ru: 'Злой', uk: 'Злий' } }, { en: 'Tired', local: { ru: 'Уставший', uk: 'Втомлений' } }, { en: 'Scared', local: { ru: 'Испуганный', uk: 'Наляканий' } }] },
          { type: 'fill-blank', sentence: 'I am very ___ today', options: ['happy', 'table', 'water', 'door'], correctIndex: 0, context: { ru: 'Я очень ___ сегодня', uk: 'Я дуже ___ сьогодні' } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Excited', ru: 'Взволнованный', uk: 'Схвильований' }, options: [{ en: 'Bored', ru: 'Скучающий', uk: 'Знуджений' }, { en: 'Tired', ru: 'Уставший', uk: 'Втомлений' }, { en: 'Excited', ru: 'Взволнованный', uk: 'Схвильований' }, { en: 'Angry', ru: 'Злой', uk: 'Злий' }], correctIndex: 2 },
          { type: 'typing', prompt: { ru: 'Удивлённый', uk: 'Здивований' }, answer: 'Surprised' },
          { type: 'true-false', statement: { en: 'Proud', ru: 'Гордый', uk: 'Гордий' }, isTrue: true },
        ]
      }
    ]
  },
];
