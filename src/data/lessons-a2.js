// ─── A2 Units ──────────────────────────────────────────
export const UNITS_A2 = [
  {
    id: 'daily_routine', nameKey: 'unit.dailyRoutine', icon: 'schedule', level: 'A2',
    lessons: [
      {
        id: 'daily-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Breakfast', no: 'Frokost', local: { ru: 'Завтрак', uk: 'Сніданок' } }, { en: 'Lunch', no: 'Lunsj', local: { ru: 'Обед', uk: 'Обід' } }, { en: 'Dinner', no: 'Middag', local: { ru: 'Ужин', uk: 'Вечеря' } }, { en: 'Morning', no: 'Morgen', local: { ru: 'Утро', uk: 'Ранок' } }, { en: 'Evening', no: 'Kveld', local: { ru: 'Вечер', uk: 'Вечір' } }] },
          { type: 'sentence-order', words: { en: ['I', 'have', 'breakfast', 'every', 'morning'], no: ['Jeg', 'spiser', 'frokost', 'hver', 'morgen'] }, answer: { en: ['I', 'have', 'breakfast', 'every', 'morning'], no: ['Jeg', 'spiser', 'frokost', 'hver', 'morgen'] }, context: { ru: 'Я завтракаю каждое утро', uk: 'Я снідаю щоранку' } },
          { type: 'fill-blank', sentence: { en: 'I ___ to school every day', no: 'Jeg ___ til skolen hver dag' }, options: { en: ['go', 'eat', 'sleep', 'drink'], no: ['går', 'spiser', 'sover', 'drikker'] }, correctIndex: 0, context: { ru: 'Я ___ в школу каждый день', uk: 'Я ___ до школи щодня' } },
          { type: 'typing', prompt: { ru: 'Завтрак', uk: 'Сніданок' }, answer: { en: 'Breakfast', no: 'Frokost' } },
          { type: 'true-false', statement: { en: 'Weekend', no: 'Helg', ru: 'Будни', uk: 'Будні' }, isTrue: false, correctTranslation: { ru: 'Выходные', uk: 'Вихідні' } },
        ]
      },
      {
        id: 'daily-2',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Я иду на работу', uk: 'Я йду на роботу' }, answer: { en: ['I', 'go', 'to', 'work'], no: ['Jeg', 'går', 'på', 'jobb'] }, bank: { en: ['I', 'Go', 'To', 'Work', 'School', 'Am'], no: ['Jeg', 'Går', 'På', 'Jobb', 'Skole', 'Er'] } },
          { type: 'fill-blank', sentence: { en: 'She ___ dinner at 7 PM', no: 'Hun ___ middag klokken 7' }, options: { en: ['cooks', 'reads', 'drives', 'swims'], no: ['lager', 'leser', 'kjører', 'svømmer'] }, correctIndex: 0, context: { ru: 'Она ___ ужин в 7 вечера', uk: 'Вона ___ вечерю о 7' } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Weekend', ru: 'Выходные', uk: 'Вихідні' }, options: [{ en: 'Monday', no: 'Mandag', ru: 'Понедельник', uk: 'Понеділок' }, { en: 'Holiday', no: 'Ferie', ru: 'Праздник', uk: 'Свято' }, { en: 'Weekend', no: 'Helg', ru: 'Выходные', uk: 'Вихідні' }, { en: 'Morning', no: 'Morgen', ru: 'Утро', uk: 'Ранок' }], correctIndex: 2 },
          { type: 'sentence-order', words: { en: ['We', 'study', 'English', 'together'], no: ['Vi', 'studerer', 'engelsk', 'sammen'] }, answer: { en: ['We', 'study', 'English', 'together'], no: ['Vi', 'studerer', 'engelsk', 'sammen'] }, context: { ru: 'Мы учим английский вместе', uk: 'Ми вчимо англійську разом' } },
          { type: 'typing', prompt: { ru: 'Работать', uk: 'Працювати' }, answer: { en: 'Work', no: 'Jobbe' } },
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
          { type: 'match-pairs', pairs: [{ en: 'Money', no: 'Penger', local: { ru: 'Деньги', uk: 'Гроші' } }, { en: 'Price', no: 'Pris', local: { ru: 'Цена', uk: 'Ціна' } }, { en: 'Cheap', no: 'Billig', local: { ru: 'Дешёвый', uk: 'Дешевий' } }, { en: 'Expensive', no: 'Dyr', local: { ru: 'Дорогой', uk: 'Дорогий' } }, { en: 'Market', no: 'Marked', local: { ru: 'Рынок', uk: 'Ринок' } }] },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Сколько это стоит?', uk: 'Скільки це коштує?' }, answer: { en: ['How', 'much', 'is', 'this'], no: ['Hvor', 'mye', 'koster', 'dette'] }, bank: { en: ['How', 'Much', 'Is', 'This', 'That', 'Many'], no: ['Hvor', 'Mye', 'Koster', 'Dette', 'Det', 'Mange'] } },
          { type: 'fill-blank', sentence: { en: 'This shirt is too ___', no: 'Denne skjorten er for ___' }, options: { en: ['expensive', 'happy', 'fast', 'blue'], no: ['dyr', 'glad', 'rask', 'blå'] }, correctIndex: 0, context: { ru: 'Эта рубашка слишком ___', uk: 'Ця сорочка занадто ___' } },
          { type: 'true-false', statement: { en: 'Buy', no: 'Kjøp', ru: 'Продавать', uk: 'Продавати' }, isTrue: false, correctTranslation: { ru: 'Покупать', uk: 'Купувати' } },
          { type: 'typing', prompt: { ru: 'Деньги', uk: 'Гроші' }, answer: { en: 'Money', no: 'Penger' } },
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
          { type: 'match-pairs', pairs: [{ en: 'Rain', no: 'Regn', local: { ru: 'Дождь', uk: 'Дощ' } }, { en: 'Snow', no: 'Snø', local: { ru: 'Снег', uk: 'Сніг' } }, { en: 'Sun', no: 'Sol', local: { ru: 'Солнце', uk: 'Сонце' } }, { en: 'Wind', no: 'Vind', local: { ru: 'Ветер', uk: 'Вітер' } }, { en: 'Cloud', no: 'Sky', local: { ru: 'Облако', uk: 'Хмара' } }] },
          { type: 'fill-blank', sentence: { en: 'It is ___ today, take an umbrella', no: 'Det er ___ i dag, ta med en paraply' }, options: { en: ['rainy', 'sunny', 'warm', 'cold'], no: ['regnfullt', 'solrikt', 'varmt', 'kaldt'] }, correctIndex: 0, context: { ru: 'Сегодня ___, возьми зонт', uk: 'Сьогодні ___, візьми парасольку' } },
          { type: 'sentence-order', words: { en: ['The', 'weather', 'is', 'beautiful', 'today'], no: ['Været', 'er', 'nydelig', 'i', 'dag'] }, answer: { en: ['The', 'weather', 'is', 'beautiful', 'today'], no: ['Været', 'er', 'nydelig', 'i', 'dag'] }, context: { ru: 'Сегодня прекрасная погода', uk: 'Сьогодні чудова погода' } },
          { type: 'true-false', statement: { en: 'Snow', no: 'Snø', ru: 'Снег', uk: 'Сніг' }, isTrue: true },
          { type: 'typing', prompt: { ru: 'Погода', uk: 'Погода' }, answer: { en: 'Weather', no: 'Vær' } },
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
          { type: 'match-pairs', pairs: [{ en: 'Kitchen', no: 'Kjøkken', local: { ru: 'Кухня', uk: 'Кухня' } }, { en: 'Bedroom', no: 'Soverom', local: { ru: 'Спальня', uk: 'Спальня' } }, { en: 'Bathroom', no: 'Bad', local: { ru: 'Ванная', uk: 'Ванна' } }, { en: 'Table', no: 'Bord', local: { ru: 'Стол', uk: 'Стіл' } }, { en: 'Chair', no: 'Stol', local: { ru: 'Стул', uk: 'Стілець' } }] },
          { type: 'fill-blank', sentence: { en: 'Please close the ___', no: 'Vennligst lukk ___' }, options: { en: ['door', 'sun', 'rain', 'fish'], no: ['døren', 'solen', 'regnet', 'fisken'] }, correctIndex: 0, context: { ru: 'Пожалуйста, закройте ___', uk: 'Будь ласка, зачиніть ___' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Моя комната большая', uk: 'Моя кімната велика' }, answer: { en: ['My', 'room', 'is', 'big'], no: ['Mitt', 'rom', 'er', 'stort'] }, bank: { en: ['My', 'Room', 'Is', 'Big', 'Small', 'Your'], no: ['Mitt', 'Rom', 'Er', 'Stort', 'Lite', 'Ditt'] } },
          { type: 'typing', prompt: { ru: 'Окно', uk: 'Вікно' }, answer: { en: 'Window', no: 'Vindu' } },
          { type: 'true-false', statement: { en: 'Garden', no: 'Hage', ru: 'Сад', uk: 'Сад' }, isTrue: true },
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
          { type: 'match-pairs', pairs: [{ en: 'Happy', no: 'Glad', local: { ru: 'Счастливый', uk: 'Щасливий' } }, { en: 'Sad', no: 'Trist', local: { ru: 'Грустный', uk: 'Сумний' } }, { en: 'Angry', no: 'Sint', local: { ru: 'Злой', uk: 'Злий' } }, { en: 'Tired', no: 'Trøtt', local: { ru: 'Уставший', uk: 'Втомлений' } }, { en: 'Scared', no: 'Redd', local: { ru: 'Испуганный', uk: 'Наляканий' } }] },
          { type: 'fill-blank', sentence: { en: 'I am very ___ today', no: 'Jeg er veldig ___ i dag' }, options: { en: ['happy', 'table', 'water', 'door'], no: ['glad', 'bord', 'vann', 'dør'] }, correctIndex: 0, context: { ru: 'Я очень ___ сегодня', uk: 'Я дуже ___ сьогодні' } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Excited', ru: 'Взволнованный', uk: 'Схвильований' }, options: [{ en: 'Bored', no: 'Kjeder meg', ru: 'Скучающий', uk: 'Знуджений' }, { en: 'Tired', no: 'Trøtt', ru: 'Уставший', uk: 'Втомлений' }, { en: 'Excited', no: 'Spent', ru: 'Взволнованный', uk: 'Схвильований' }, { en: 'Angry', no: 'Sint', ru: 'Злой', uk: 'Злий' }], correctIndex: 2 },
          { type: 'typing', prompt: { ru: 'Удивлённый', uk: 'Здивований' }, answer: { en: 'Surprised', no: 'Overrasket' } },
          { type: 'true-false', statement: { en: 'Proud', no: 'Stolt', ru: 'Гордый', uk: 'Гордий' }, isTrue: true },
        ]
      }
    ]
  },
];
