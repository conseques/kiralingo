// ─── B2 Units ──────────────────────────────────────────
export const UNITS_B2 = [
  {
    id: 'business_eng', nameKey: 'unit.business', icon: 'business', level: 'B2',
    lessons: [
      {
        id: 'business-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Revenue', local: { ru: 'Доход', uk: 'Дохід' } }, { en: 'Profit', local: { ru: 'Прибыль', uk: 'Прибуток' } }, { en: 'Investment', local: { ru: 'Инвестиция', uk: 'Інвестиція' } }, { en: 'Strategy', local: { ru: 'Стратегия', uk: 'Стратегія' } }, { en: 'Budget', local: { ru: 'Бюджет', uk: 'Бюджет' } }] },
          { type: 'fill-blank', sentence: 'The company needs a new ___ to increase sales', options: ['strategy', 'weather', 'breakfast', 'garden'], correctIndex: 0, context: { ru: 'Компании нужна новая ___ для увеличения продаж', uk: 'Компанії потрібна нова ___ для збільшення продажів' } },
          { type: 'sentence-order', words: ['We', 'should', 'negotiate', 'the', 'terms', 'of', 'the', 'contract'], answer: ['We', 'should', 'negotiate', 'the', 'terms', 'of', 'the', 'contract'], context: { ru: 'Мы должны обсудить условия контракта', uk: 'Ми повинні обговорити умови контракту' } },
          { type: 'typing', prompt: { ru: 'Предприниматель', uk: 'Підприємець' }, answer: 'Entrepreneur' },
          { type: 'true-false', statement: { en: 'Negotiate', ru: 'Вести переговоры', uk: 'Вести переговори' }, isTrue: true },
        ]
      },
      {
        id: 'business-2',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Нам нужно оценить результаты', uk: 'Нам потрібно оцінити результати' }, answer: ['We', 'need', 'to', 'evaluate', 'the', 'results'], bank: ['We', 'Need', 'To', 'Evaluate', 'The', 'Results', 'See', 'Buy'] },
          { type: 'fill-blank', sentence: 'The stakeholders want to ___ a new approach', options: ['implement', 'sleep', 'cook', 'swim'], correctIndex: 0, context: { ru: 'Заинтересованные стороны хотят ___ новый подход', uk: 'Зацікавлені сторони хочуть ___ новий підхід' } },
          { type: 'typing', prompt: { ru: 'Конкуренция', uk: 'Конкуренція' }, answer: 'Competition' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Investment', ru: 'Инвестиция', uk: 'Інвестиція' }, options: [{ en: 'Investigation', ru: 'Расследование', uk: 'Розслідування' }, { en: 'Investment', ru: 'Инвестиция', uk: 'Інвестиція' }, { en: 'Invention', ru: 'Изобретение', uk: 'Винахід' }, { en: 'Invitation', ru: 'Приглашение', uk: 'Запрошення' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Budget', ru: 'Бюджет', uk: 'Бюджет' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'science_unit', nameKey: 'unit.science', icon: 'science', level: 'B2',
    lessons: [
      {
        id: 'science-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Research', local: { ru: 'Исследование', uk: 'Дослідження' } }, { en: 'Experiment', local: { ru: 'Эксперимент', uk: 'Експеримент' } }, { en: 'Theory', local: { ru: 'Теория', uk: 'Теорія' } }, { en: 'Evidence', local: { ru: 'Доказательство', uk: 'Доказ' } }, { en: 'Data', local: { ru: 'Данные', uk: 'Дані' } }] },
          { type: 'fill-blank', sentence: 'The ___ supports our initial theory', options: ['evidence', 'breakfast', 'weather', 'garden'], correctIndex: 0, context: { ru: '___ подтверждают нашу первоначальную теорию', uk: '___ підтверджують нашу початкову теорію' } },
          { type: 'typing', prompt: { ru: 'Гипотеза', uk: 'Гіпотеза' }, answer: 'Hypothesis' },
          { type: 'sentence-order', words: ['Scientists', 'discovered', 'a', 'new', 'method'], answer: ['Scientists', 'discovered', 'a', 'new', 'method'], context: { ru: 'Учёные открыли новый метод', uk: 'Вчені відкрили новий метод' } },
          { type: 'true-false', statement: { en: 'Analysis', ru: 'Анализ', uk: 'Аналіз' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'env_sustainability', nameKey: 'unit.environmentSustainability', icon: 'eco', level: 'B2',
    lessons: [
      {
        id: 'env-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Renewable resources', local: { ru: 'Возобновляемые ресурсы', uk: 'Відновлювані ресурси' } }, { en: 'Sustainability', local: { ru: 'Устойчивость', uk: 'Сталість' } }, { en: 'Emissions', local: { ru: 'Выбросы', uk: 'Викиди' } }, { en: 'Ecosystem', local: { ru: 'Экосистема', uk: 'Екосистема' } }, { en: 'Biodiversity', local: { ru: 'Биоразнообразие', uk: 'Біорізноманіття' } }] },
          { type: 'fill-blank', sentence: 'We must switch to ___ to protect the planet', options: ['renewable resources', 'fossil fuels', 'hamburgers', 'emails'], correctIndex: 0, context: { ru: 'Мы должны перейти на ___, чтобы защитить планету', uk: 'Ми повинні перейти на ___, щоб захистити планету' } },
          { type: 'typing', prompt: { ru: 'Разнообразие (эко)', uk: 'Біорізноманіття' }, answer: 'Biodiversity' },
          { type: 'sentence-order', words: ['Deforestation', 'causes', 'habitat', 'loss', 'for', 'many', 'species'], answer: ['Deforestation', 'causes', 'habitat', 'loss', 'for', 'many', 'species'], context: { ru: 'Обезлесение вызывает потерю среды обитания для многих видов', uk: 'Знеліснення спричиняє втрату середовища проживання для багатьох видів' } },
          { type: 'true-false', statement: { en: 'Eco-friendly', ru: 'Экологичный', uk: 'Екологічний' }, isTrue: true },
        ]
      },
      {
        id: 'env-2',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Conservation', local: { ru: 'Сохранение', uk: 'Збереження' } }, { en: 'Pollution', local: { ru: 'Загрязнение', uk: 'Забруднення' } }, { en: 'Wildlife', local: { ru: 'Дикая природа', uk: 'Дика природа' } }, { en: 'Global warming', local: { ru: 'Глобальное потепление', uk: 'Глобальне потепління' } }, { en: 'Ozone layer', local: { ru: 'Озоновый слой', uk: 'Озоновий шар' } }] },
          { type: 'fill-blank', sentence: '___ is melting the polar ice caps', options: ['Global warming', 'Cooking', 'Dancing', 'Reading'], correctIndex: 0, context: { ru: '___ растапливает полярные ледяные шапки', uk: '___ розтоплює полярні льодові шапки' } },
          { type: 'typing', prompt: { ru: 'Загрязнение', uk: 'Забруднення' }, answer: 'Pollution' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Sustainable', ru: 'Устойчивый', uk: 'Сталий' }, options: [{ en: 'Expensive', ru: 'Дорогой', uk: 'Дорогий' }, { en: 'Sustainable', ru: 'Устойчивый', uk: 'Сталий' }, { en: 'Fragile', ru: 'Хрупкий', uk: 'Крихкий' }, { en: 'Dangerous', ru: 'Опасный', uk: 'Небезпечний' }], correctIndex: 1 },
        ]
      },
      {
        id: 'env-3',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Мы должны перерабатывать пластик', uk: 'Ми повинні переробляти пластик' }, answer: ['We', 'must', 'recycle', 'plastic'], bank: ['We', 'Must', 'Recycle', 'Plastic', 'Sell', 'Buy', 'Eat'] },
          { type: 'sentence-order', words: ['Protecting', 'the', 'environment', 'is', 'everyone\'s', 'responsibility'], answer: ['Protecting', 'the', 'environment', 'is', 'everyone\'s', 'responsibility'], context: { ru: 'Защита окружающей среды — обязанность каждого', uk: 'Захист довкілля — обов’язок кожного' } },
          { type: 'fill-blank', sentence: '___ products are better for the earth', options: ['Eco-friendly', 'Plastic', 'Old', 'Broken'], correctIndex: 0, context: { ru: '___ продукты лучше для земли', uk: '___ продукти кращі для землі' } },
        ]
      }
    ]
  },
  {
    id: 'idioms', nameKey: 'unit.idioms', icon: 'auto_awesome', level: 'B2',
    lessons: [
      {
        id: 'idioms-1',
        exercises: [
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'A piece of cake', ru: 'Очень просто', uk: 'Дуже просто' }, options: [{ en: 'Very difficult', ru: 'Очень сложно', uk: 'Дуже складно' }, { en: 'Very tasty', ru: 'Очень вкусно', uk: 'Дуже смачно' }, { en: 'Very easy', ru: 'Очень просто', uk: 'Дуже просто' }, { en: 'Very expensive', ru: 'Очень дорого', uk: 'Дуже дорого' }], correctIndex: 2 },
          { type: 'true-false', statement: { en: 'Under the weather', ru: 'Плохо себя чувствовать', uk: 'Погано себе почувати' }, isTrue: true },
          { type: 'match-pairs', pairs: [{ en: 'Break the ice', local: { ru: 'Разрядить обстановку', uk: 'Розрядити обстановку' } }, { en: 'Spill the beans', local: { ru: 'Проболтаться', uk: 'Проговоритися' } }, { en: 'Cost an arm and a leg', local: { ru: 'Стоить целое состояние', uk: 'Коштувати цілий статок' } }, { en: 'Burn bridges', local: { ru: 'Сжигать мосты', uk: 'Спалювати мости' } }, { en: 'Once in a blue moon', local: { ru: 'Очень редко', uk: 'Дуже рідко' } }] },
          { type: 'fill-blank', sentence: 'That exam was ___! I finished in ten minutes.', options: ['a piece of cake', 'under the weather', 'once in a blue moon', 'breaking the ice'], correctIndex: 0, context: { ru: 'Этот экзамен был ___! Я закончил за десять минут.', uk: 'Цей іспит був ___! Я закінчив за десять хвилин.' } },
          { type: 'typing', prompt: { ru: 'Начать с начала (идиома: Back to...)', uk: 'Почати з початку (ідіома: Back to...)' }, answer: 'Back to square one' },
        ]
      }
    ]
  },
  {
    id: 'culture_society', nameKey: 'unit.cultureSociety', icon: 'public', level: 'B2',
    lessons: [
      {
        id: 'culture-soc-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Democracy', local: { ru: 'Демократия', uk: 'Демократія' } }, { en: 'Freedom', local: { ru: 'Свобода', uk: 'Свобода' } }, { en: 'Justice', local: { ru: 'Справедливость', uk: 'Справедливість' } }, { en: 'Diversity', local: { ru: 'Разнообразие', uk: 'Різноманітність' } }, { en: 'Identity', local: { ru: 'Идентичность', uk: 'Ідентичність' } }] },
          { type: 'fill-blank', sentence: 'Cultural ___ enriches our society', options: ['diversity', 'salary', 'password', 'breakfast'], correctIndex: 0, context: { ru: 'Культурное ___ обогащает наше общество', uk: 'Культурна ___ збагачує наше суспільство' } },
          { type: 'typing', prompt: { ru: 'Справедливость', uk: 'Справедливість' }, answer: 'Justice' },
          { type: 'sentence-order', words: ['Social', 'inequality', 'remains', 'a', 'significant', 'challenge'], answer: ['Social', 'inequality', 'remains', 'a', 'significant', 'challenge'], context: { ru: 'Социальное неравенство остаётся серьёзной проблемой', uk: 'Соціальна нерівність залишається серйозною проблемою' } },
          { type: 'true-false', statement: { en: 'Influence', ru: 'Влияние', uk: 'Вплив' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'psychology', nameKey: 'unit.psychology', icon: 'psychology', level: 'B2',
    lessons: [
      {
        id: 'psych-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Empathy', local: { ru: 'Эмпатия', uk: 'Емпатія' } }, { en: 'Anxiety', local: { ru: 'Тревога', uk: 'Тривога' } }, { en: 'Motivation', local: { ru: 'Мотивация', uk: 'Мотивація' } }, { en: 'Awareness', local: { ru: 'Осведомлённость', uk: 'Обізнаність' } }, { en: 'Attitude', local: { ru: 'Отношение', uk: 'Ставлення' } }] },
          { type: 'fill-blank', sentence: 'A positive ___ can change everything', options: ['attitude', 'weather', 'ticket', 'garden'], correctIndex: 0, context: { ru: 'Позитивное ___ может изменить всё', uk: 'Позитивне ___ може змінити все' } },
          { type: 'typing', prompt: { ru: 'Эмпатия', uk: 'Емпатія' }, answer: 'Empathy' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Resilient', ru: 'Стойкий', uk: 'Стійкий' }, options: [{ en: 'Vulnerable', ru: 'Уязвимый', uk: 'Вразливий' }, { en: 'Resilient', ru: 'Стойкий', uk: 'Стійкий' }, { en: 'Ambiguous', ru: 'Двусмысленный', uk: 'Двозначний' }, { en: 'Subtle', ru: 'Тонкий', uk: 'Тонкий' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Consciousness', ru: 'Сознание', uk: 'Свідомість' }, isTrue: true },
        ]
      }
    ]
  },
];
