// ─── B1 Units ──────────────────────────────────────────

const UNITS_B1_EN = [
  {
    id: 'work_career', nameKey: 'unit.workCareer', icon: 'work', level: 'B1', onlyLang: 'en',
    lessons: [
      {
        id: 'work-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Salary', local: { ru: 'Зарплата', uk: 'Зарплата' } }, { en: 'Meeting', local: { ru: 'Встреча', uk: 'Зустріч' } }, { en: 'Office', local: { ru: 'Офис', uk: 'Офіс' } }, { en: 'Colleague', local: { ru: 'Коллега', uk: 'Колега' } }, { en: 'Deadline', local: { ru: 'Дедлайн', uk: 'Дедлайн' } }] },
          { type: 'fill-blank', sentence: 'I have a job ___ tomorrow morning', options: ['interview', 'breakfast', 'garden', 'weather'], correctIndex: 0, context: { ru: 'У меня ___ на работу завтра утром', uk: 'У мене ___ на роботу завтра вранці' } },
          { type: 'sentence-order', words: ['She', 'has', 'a', 'lot', 'of', 'experience'], answer: ['She', 'has', 'a', 'lot', 'of', 'experience'], context: { ru: 'У неё много опыта', uk: 'У неї багато досвіду' } },
          { type: 'typing', prompt: { ru: 'Проект', uk: 'Проєкт' }, answer: 'Project' },
          { type: 'true-false', statement: { en: 'Boss', ru: 'Начальник', uk: 'Начальник' }, isTrue: true },
        ]
      },
      {
        id: 'work-2',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Я работаю в офисе', uk: 'Я працюю в офісі' }, answer: ['I', 'work', 'in', 'an', 'office'], bank: ['I', 'Work', 'In', 'An', 'Office', 'At', 'The'] },
          { type: 'fill-blank', sentence: 'We need to finish this ___ the deadline', options: ['before', 'after', 'under', 'over'], correctIndex: 0, context: { ru: 'Мы должны закончить это ___ дедлайна', uk: 'Ми повинні закінчити це ___ дедлайну' } },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Experience', ru: 'Опыт', uk: 'Досвід' }, options: [{ en: 'Experiment', ru: 'Эксперимент', uk: 'Експеримент' }, { en: 'Experience', ru: 'Опыт', uk: 'Досвід' }, { en: 'Explanation', ru: 'Объяснение', uk: 'Пояснення' }, { en: 'Expression', ru: 'Выражение', uk: 'Вираз' }], correctIndex: 1 },
          { type: 'typing', prompt: { ru: 'Собеседование', uk: 'Співбесіда' }, answer: 'Interview' },
          { type: 'sentence-order', words: ['The', 'meeting', 'starts', 'at', 'nine'], answer: ['The', 'meeting', 'starts', 'at', 'nine'], context: { ru: 'Встреча начинается в девять', uk: 'Зустріч починається о дев\'ятій' } },
        ]
      }
    ]
  },
  {
    id: 'health_unit', nameKey: 'unit.health', icon: 'favorite', level: 'B1', onlyLang: 'en',
    lessons: [
      {
        id: 'health-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Health', local: { ru: 'Здоровье', uk: "Здоров'я" } }, { en: 'Medicine', local: { ru: 'Лекарство', uk: 'Ліки' } }, { en: 'Doctor', local: { ru: 'Врач', uk: 'Лікар' } }, { en: 'Pain', local: { ru: 'Боль', uk: 'Біль' } }, { en: 'Diet', local: { ru: 'Диета', uk: 'Дієта' } }] },
          { type: 'fill-blank', sentence: 'You should eat ___ food', options: ['healthy', 'expensive', 'fast', 'dangerous'], correctIndex: 0, context: { ru: 'Ты должен есть ___ еду', uk: 'Ти маєш їсти ___ їжу' } },
          { type: 'sentence-order', words: ['Exercise', 'is', 'important', 'for', 'health'], answer: ['Exercise', 'is', 'important', 'for', 'health'], context: { ru: 'Упражнения важны для здоровья', uk: "Вправи важливі для здоров'я" } },
          { type: 'typing', prompt: { ru: 'Врач', uk: 'Лікар' }, answer: 'Doctor' },
          { type: 'true-false', statement: { en: 'Medicine', ru: 'Лекарство', uk: 'Ліки' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'travel_advanced', nameKey: 'unit.travelAdv', icon: 'flight', level: 'B1', onlyLang: 'en',
    lessons: [
      {
        id: 'travel-adv-1',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Я хочу забронировать номер', uk: 'Я хочу забронювати номер' }, answer: ['I', 'want', 'to', 'book', 'a', 'room'], bank: ['I', 'Want', 'To', 'Book', 'A', 'Room', 'Buy', 'See'] },
          { type: 'fill-blank', sentence: 'The flight ___ at 6 AM', options: ['departs', 'eats', 'sleeps', 'reads'], correctIndex: 0, context: { ru: 'Рейс ___ в 6 утра', uk: 'Рейс ___ о 6 ранку' } },
          { type: 'sentence-order', words: ['Could', 'you', 'recommend', 'a', 'good', 'restaurant'], answer: ['Could', 'you', 'recommend', 'a', 'good', 'restaurant'], context: { ru: 'Не могли бы вы порекомендовать хороший ресторан?', uk: 'Чи не могли б ви порекомендувати гарний ресторан?' } },
          { type: 'typing', prompt: { ru: 'Путешествовать', uk: 'Подорожувати' }, answer: 'Travel' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Ticket', ru: 'Билет', uk: 'Квиток' }, options: [{ en: 'Passport', ru: 'Паспорт', uk: 'Паспорт' }, { en: 'Ticket', ru: 'Билет', uk: 'Квиток' }, { en: 'Luggage', ru: 'Багаж', uk: 'Багаж' }, { en: 'Guide', ru: 'Гид', uk: 'Гід' }], correctIndex: 1 },
        ]
      }
    ]
  },
  {
    id: 'media_tech', nameKey: 'unit.mediaTech', icon: 'smartphone', level: 'B1', onlyLang: 'en',
    lessons: [
      {
        id: 'media-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Internet', local: { ru: 'Интернет', uk: 'Інтернет' } }, { en: 'Website', local: { ru: 'Веб-сайт', uk: 'Веб-сайт' } }, { en: 'Email', local: { ru: 'Эл. почта', uk: 'Ел. пошта' } }, { en: 'Password', local: { ru: 'Пароль', uk: 'Пароль' } }, { en: 'Download', local: { ru: 'Скачать', uk: 'Завантажити' } }] },
          { type: 'fill-blank', sentence: 'I need to ___ this file from the internet', options: ['download', 'cook', 'sleep', 'swim'], correctIndex: 0, context: { ru: 'Мне нужно ___ этот файл из интернета', uk: 'Мені потрібно ___ цей файл з інтернету' } },
          { type: 'typing', prompt: { ru: 'Пароль', uk: 'Пароль' }, answer: 'Password' },
          { type: 'sentence-order', words: ['Technology', 'changes', 'our', 'lives', 'every', 'day'], answer: ['Technology', 'changes', 'our', 'lives', 'every', 'day'], context: { ru: 'Технологии меняют нашу жизнь каждый день', uk: 'Технології змінюють наше життя щодня' } },
          { type: 'true-false', statement: { en: 'Computer', ru: 'Компьютер', uk: "Комп'ютер" }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'environment_unit', nameKey: 'unit.environment', icon: 'eco', level: 'B1', onlyLang: 'en',
    lessons: [
      {
        id: 'environ-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Pollution', local: { ru: 'Загрязнение', uk: 'Забруднення' } }, { en: 'Climate', local: { ru: 'Климат', uk: 'Клімат' } }, { en: 'Forest', local: { ru: 'Лес', uk: 'Ліс' } }, { en: 'Ocean', local: { ru: 'Океан', uk: 'Океан' } }, { en: 'Recycle', local: { ru: 'Перерабатывать', uk: 'Переробляти' } }] },
          { type: 'fill-blank', sentence: 'We must ___ the environment', options: ['protect', 'forget', 'sell', 'buy'], correctIndex: 0, context: { ru: 'Мы должны ___ окружающую среду', uk: 'Ми повинні ___ довкілля' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Изменение климата — серьёзная проблема', uk: 'Зміна клімату — серйозна проблема' }, answer: ['Climate', 'change', 'is', 'a', 'serious', 'problem'], bank: ['Climate', 'Change', 'Is', 'A', 'Serious', 'Problem', 'Small', 'Good'] },
          { type: 'typing', prompt: { ru: 'Окружающая среда', uk: 'Довкілля' }, answer: 'Environment' },
          { type: 'true-false', statement: { en: 'Pollution', ru: 'Загрязнение', uk: 'Забруднення' }, isTrue: true },
        ]
      }
    ]
  }
];

const UNITS_B1_NO = [
  {
    id: 'nav_welfare', nameKey: 'unit.navWelfare', icon: 'account_balance', level: 'B1', onlyLang: 'no',
    lessons: [
      {
        id: 'nav-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Sykemelding', local: { ru: 'Больничный', uk: 'Лікарняний' } }, { en: 'Dagpenger', local: { ru: 'Пособие по безработице', uk: 'Допомога по безробіттю' } }, { en: 'Meldekort', local: { ru: 'Отчетная карта', uk: 'Звітна картка' } }, { en: 'Søknad', local: { ru: 'Заявление', uk: 'Заява' } }, { en: 'Kontor', local: { ru: 'Офис', uk: 'Офіс' } }] },
          { type: 'fill-blank', sentence: 'Du må fylle ut en ___ for å få dagpenger.', options: ['søknad', 'bil', 'mat', 'stol'], correctIndex: 0, context: { ru: 'Ты должен заполнить заявление, чтобы получить пособие.', uk: 'Ти повинен заповнити заяву, щоб отримати допомогу.' } },
          { type: 'sentence-order', words: ['Jeg', 'må', 'sende', 'meldekort', 'i', 'dag'], answer: ['Jeg', 'må', 'sende', 'meldekort', 'i', 'dag'], context: { ru: 'Мне нужно отправить отчетную карту сегодня', uk: 'Мені потрібно відправити звітну картку сьогодні' } },
          { type: 'typing', prompt: { ru: 'Больничный', uk: 'Лікарняний' }, answer: 'Sykemelding' },
          { type: 'true-false', statement: { en: 'Dagpenger', ru: 'Пособие по безработице', uk: 'Допомога по безробіттю' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'work_norway', nameKey: 'unit.workNorway', icon: 'work', level: 'B1', onlyLang: 'no',
    lessons: [
      {
        id: 'work-no-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Arbeidsmiljølov', local: { ru: 'Закон об условиях труда', uk: 'Закон про умови праці' } }, { en: 'Tillitsvalgt', local: { ru: 'Профсоюзный делегат', uk: 'Профспілковий делегат' } }, { en: 'Tariffavtale', local: { ru: 'Коллективный договор', uk: 'Колективний договір' } }, { en: 'Lønn', local: { ru: 'Зарплата', uk: 'Зарплата' } }, { en: 'Overtid', local: { ru: 'Сверхурочные', uk: 'Надурочні' } }] },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Поговори со своим делегатом', uk: 'Поговори зі своїм делегатом' }, answer: ['Snakk', 'med', 'din', 'tillitsvalgt'], bank: ['Snakk', 'Med', 'Din', 'Tillitsvalgt', 'Sjef', 'Lege'] },
          { type: 'fill-blank', sentence: 'Jeg jobbet mye ___ denne uken.', options: ['overtid', 'kaffe', 'syk', 'ferie'], correctIndex: 0, context: { ru: 'На этой неделе я много работал сверхурочно.', uk: 'Цього тижня я багато працював надурочно.' } },
          { type: 'typing', prompt: { ru: 'Зарплата', uk: 'Зарплата' }, answer: 'Lønn' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Arbeidsmiljølov', ru: 'Закон об условиях труда', uk: 'Закон про умови праці' }, options: [{ en: 'Veiloven', ru: 'Дорожный закон', uk: 'Дорожній закон' }, { en: 'Arbeidsmiljølov', ru: 'Закон об условиях труда', uk: 'Закон про умови праці' }, { en: 'Straffeloven', ru: 'Уголовный кодекс', uk: 'Кримінальний кодекс' }, { en: 'Skatteloven', ru: 'Налоговый закон', uk: 'Податковий закон' }], correctIndex: 1 },
        ]
      }
    ]
  }
];

export const UNITS_B1 = [...UNITS_B1_EN, ...UNITS_B1_NO];
