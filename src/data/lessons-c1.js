// ─── C1 Units ──────────────────────────────────────────
export const UNITS_C1 = [
  {
    id: 'academic_eng', nameKey: 'unit.academic', icon: 'school', level: 'C1',
    lessons: [
      {
        id: 'academic-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Paradigm', local: { ru: 'Парадигма', uk: 'Парадигма' } }, { en: 'Methodology', local: { ru: 'Методология', uk: 'Методологія' } }, { en: 'Phenomenon', local: { ru: 'Феномен', uk: 'Феномен' } }, { en: 'Correlation', local: { ru: 'Корреляция', uk: 'Кореляція' } }, { en: 'Discourse', local: { ru: 'Дискурс', uk: 'Дискурс' } }] },
          { type: 'fill-blank', sentence: 'The ___ of this study require further investigation', options: ['implications', 'breakfasts', 'gardens', 'tickets'], correctIndex: 0, context: { ru: '___ этого исследования требуют дополнительного изучения', uk: '___ цього дослідження вимагають подальшого вивчення' } },
          { type: 'typing', prompt: { ru: 'Методология', uk: 'Методологія' }, answer: 'Methodology' },
          { type: 'sentence-order', words: ['The', 'research', 'findings', 'corroborate', 'our', 'initial', 'hypothesis'], answer: ['The', 'research', 'findings', 'corroborate', 'our', 'initial', 'hypothesis'], context: { ru: 'Результаты исследования подтверждают нашу первоначальную гипотезу', uk: 'Результати дослідження підтверджують нашу початкову гіпотезу' } },
          { type: 'true-false', statement: { en: 'Consensus', ru: 'Консенсус', uk: 'Консенсус' }, isTrue: true },
        ]
      },
      {
        id: 'academic-2',
        exercises: [
          { type: 'fill-blank', sentence: 'We need to ___ the data before drawing conclusions', options: ['scrutinize', 'forget', 'cook', 'swim'], correctIndex: 0, context: { ru: 'Мы должны ___ данные перед тем, как делать выводы', uk: 'Ми повинні ___ дані перед тим, як робити висновки' } },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Это требует дальнейшего анализа', uk: 'Це вимагає подальшого аналізу' }, answer: ['This', 'requires', 'further', 'analysis'], bank: ['This', 'Requires', 'Further', 'Analysis', 'Small', 'Weather', 'Big', 'Good'] },
          { type: 'typing', prompt: { ru: 'Обосновывать', uk: 'Обґрунтовувати' }, answer: 'Substantiate' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Elucidate', ru: 'Прояснять', uk: 'Прояснювати' }, options: [{ en: 'Complicate', ru: 'Усложнять', uk: 'Ускладнювати' }, { en: 'Elucidate', ru: 'Прояснять', uk: 'Прояснювати' }, { en: 'Eliminate', ru: 'Устранять', uk: 'Усувати' }, { en: 'Exaggerate', ru: 'Преувеличивать', uk: 'Перебільшувати' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Extrapolate', ru: 'Экстраполировать', uk: 'Екстраполювати' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'nuance_register', nameKey: 'unit.nuance', icon: 'tune', level: 'C1',
    lessons: [
      {
        id: 'nuance-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Meticulous', local: { ru: 'Скрупулёзный', uk: 'Скрупульозний' } }, { en: 'Eloquent', local: { ru: 'Красноречивый', uk: 'Красномовний' } }, { en: 'Ephemeral', local: { ru: 'Эфемерний', uk: 'Ефемерний' } }, { en: 'Compelling', local: { ru: 'Убедительный', uk: 'Переконливий' } }, { en: 'Concise', local: { ru: 'Лаконичный', uk: 'Лаконічний' } }] },
          { type: 'fill-blank', sentence: 'Her ___ attention to detail impressed the team', options: ['meticulous', 'fast', 'cheap', 'cold'], correctIndex: 0, context: { ru: 'Её ___ внимание к деталям впечатлило команду', uk: 'Її ___ увага до деталей вразила команду' } },
          { type: 'typing', prompt: { ru: 'Эфемерный', uk: 'Ефемерний' }, answer: 'Ephemeral' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Ubiquitous', ru: 'Вездесущий', uk: 'Вездесущий' }, options: [{ en: 'Rare', ru: 'Редкий', uk: 'Рідкісний' }, { en: 'Ubiquitous', ru: 'Вездесущий', uk: 'Вездесущий' }, { en: 'Beautiful', ru: 'Красивый', uk: 'Гарний' }, { en: 'Dangerous', ru: 'Опасный', uk: 'Небезпечний' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Pragmatic', ru: 'Прагматичный', uk: 'Прагматичний' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'climate_geo', nameKey: 'unit.climateGeo', icon: 'public', level: 'C1',
    lessons: [
      {
        id: 'climate-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Geothermal', local: { ru: 'Геотермальный', uk: 'Геотермальний' } }, { en: 'Photovoltaic', local: { ru: 'Фотоэлектрический', uk: 'Фотоелектричний' } }, { en: 'Hydroelectric', local: { ru: 'Гидроэлектрический', uk: 'Гідроелектричний' } }, { en: 'Carbon footprint', local: { ru: 'Углеродный след', uk: 'Вуглецевий слід' } }, { en: 'Sequestration', local: { ru: 'Секвестрация', uk: 'Секвестрація' } }] },
          { type: 'fill-blank', sentence: '___ technology converts sunlight into electricity', options: ['Photovoltaic', 'Geothermal', 'Hydroelectric', 'Nuclear'], correctIndex: 0, context: { ru: '___ технология преобразует солнечный свет в электричество', uk: '___ технологія перетворює сонячне світло на електрику' } },
          { type: 'typing', prompt: { ru: 'Углеродный след', uk: 'Вуглецевий слід' }, answer: 'Carbon footprint' },
          { type: 'sentence-order', words: ['Carbon', 'sequestration', 'is', 'vital', 'for', 'climate', 'mitigation'], answer: ['Carbon', 'sequestration', 'is', 'vital', 'for', 'climate', 'mitigation'], context: { ru: 'Секвестрация углерода жизненно важна для смягчения последствий изменения климата', uk: 'Секвестрація вуглецю життєво важлива для пом’якшення наслідків зміни клімату' } },
          { type: 'true-false', statement: { en: 'Resilience', ru: 'Стойкость', uk: 'Стійкість' }, isTrue: true },
        ]
      },
      {
        id: 'climate-2',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Biodiversity', local: { ru: 'Биоразнообразие', uk: 'Біорізноманіття' } }, { en: 'Ecosystem', local: { ru: 'Экосистема', uk: 'Екосистема' } }, { en: 'Deforestation', local: { ru: 'Обезлесение', uk: 'Вирубка лісів' } }, { en: 'Sustainability', local: { ru: 'Устойчивость', uk: 'Стійкість' } }, { en: 'Mitigation', local: { ru: 'Смягчение', uk: 'Пом\'якшення' } }] },
          { type: 'fill-blank', sentence: 'Protecting ___ is crucial for a healthy planet', options: ['biodiversity', 'cars', 'buildings', 'phones'], correctIndex: 0, context: { ru: 'Защита ___ имеет решающее значение для здоровой планеты', uk: 'Захист ___ має вирішальне значення для здорової планети' } },
          { type: 'typing', prompt: { ru: 'Устойчивое развитие', uk: 'Сталий розвиток' }, answer: 'Sustainable development' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Adaptation', ru: 'Адаптация', uk: 'Адаптація' }, options: [{ en: 'Resistance', ru: 'Сопротивление', uk: 'Опір' }, { en: 'Adaptation', ru: 'Адаптация', uk: 'Адаптація' }, { en: 'Destruction', ru: 'Разрушение', uk: 'Руйнування' }, { en: 'Creation', ru: 'Создание', uk: 'Створення' }], correctIndex: 1 },
          { type: 'true-false', statement: { en: 'Desertification', ru: 'Опустынивание', uk: 'Опустелювання' }, isTrue: true },
        ]
      },
      {
        id: 'climate-3',
        exercises: [
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Возобновляемые источники энергии имеют решающее значение', uk: 'Відновлювані джерела енергії мають вирішальне значення' }, answer: ['Renewable', 'energy', 'sources', 'are', 'crucial'], bank: ['Renewable', 'Energy', 'Sources', 'Are', 'Crucial', 'Old', 'Dirty', 'Expensive'] },
          { type: 'sentence-order', words: ['Climate', 'change', 'is', 'a', 'global', 'challenge'], answer: ['Climate', 'change', 'is', 'a', 'global', 'challenge'], context: { ru: 'Изменение климата — это глобальная проблема', uk: 'Зміна клімату — це глобальна проблема' } },
          { type: 'fill-blank', sentence: 'The ___ of glaciers contributes to sea level rise', options: ['melting', 'growth', 'stability', 'freezing'], correctIndex: 0, context: { ru: '___ ледников способствует повышению уровня моря', uk: '___ льодовиків сприяє підвищенню рівня моря' } },
          { type: 'typing', prompt: { ru: 'Парниковый эффект', uk: 'Парниковий ефект' }, answer: 'Greenhouse effect' },
          { type: 'true-false', statement: { en: 'Fossil fuels are a renewable resource', ru: 'Ископаемое топливо является возобновляемым ресурсом', uk: 'Викопне паливо є відновлюваним ресурсом' }, isTrue: false },
        ]
      }
    ]
  },
  {
    id: 'debate', nameKey: 'unit.debate', icon: 'forum', level: 'C1',
    lessons: [
      {
        id: 'debate-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Moreover', local: { ru: 'Более того', uk: 'Більш того' } }, { en: 'Nevertheless', local: { ru: 'Тем не менее', uk: 'Тим не менш' } }, { en: 'Notwithstanding', local: { ru: 'Несмотря на', uk: 'Незважаючи на' } }, { en: 'Henceforth', local: { ru: 'Впредь', uk: 'Відтепер' } }, { en: 'As opposed to', local: { ru: 'В отличие от', uk: 'На відміну від' } }] },
          { type: 'fill-blank', sentence: 'The plan failed; ___, we learned from the experience', options: ['nevertheless', 'because', 'although', 'since'], correctIndex: 0, context: { ru: 'План провалился; ___ мы извлекли уроки из этого опыта', uk: 'План провалився; ___ ми отримали урок з цього досвіду' } },
          { type: 'sentence-order', words: ['In', 'light', 'of', 'recent', 'events', 'we', 'must', 'reconsider'], answer: ['In', 'light', 'of', 'recent', 'events', 'we', 'must', 'reconsider'], context: { ru: 'В свете последних событий мы должны пересмотреть', uk: 'У світлі останніх подій ми повинні переглянути' } },
          { type: 'typing', prompt: { ru: 'Тем не менее', uk: 'Тим не менш' }, answer: 'Nevertheless' },
          { type: 'true-false', statement: { en: 'Moreover', ru: 'Более того', uk: 'Більш того' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'literature_unit', nameKey: 'unit.literature', icon: 'menu_book', level: 'C1',
    lessons: [
      {
        id: 'literature-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Allegory', local: { ru: 'Аллегория', uk: 'Алегорія' } }, { en: 'Metaphor', local: { ru: 'Метафора', uk: 'Метафора' } }, { en: 'Irony', local: { ru: 'Ирония', uk: 'Іронія' } }, { en: 'Narrative', local: { ru: 'Повествование', uk: 'Оповідь' } }, { en: 'Protagonist', local: { ru: 'Главный герой', uk: 'Головний герой' } }] },
          { type: 'fill-blank', sentence: 'The author uses ___ to compare life to a journey', options: ['metaphor', 'money', 'weather', 'breakfast'], correctIndex: 0, context: { ru: 'Автор использует ___ для сравнения жизни с путешествием', uk: 'Автор використовує ___ для порівняння життя з подорожжю' } },
          { type: 'typing', prompt: { ru: 'Метафора', uk: 'Метафора' }, answer: 'Metaphor' },
          { type: 'multiple-choice', questionKey: 'lesson.chooseCorrect', questionWord: { en: 'Protagonist', ru: 'Главный герой', uk: 'Головний герой' }, options: [{ en: 'Antagonist', ru: 'Злодей', uk: 'Злодій' }, { en: 'Narrator', ru: 'Рассказчик', uk: 'Оповідач' }, { en: 'Protagonist', ru: 'Главный герой', uk: 'Головний герой' }, { en: 'Author', ru: 'Автор', uk: 'Автор' }], correctIndex: 2 },
          { type: 'true-false', statement: { en: 'Irony', ru: 'Ирония', uk: 'Іронія' }, isTrue: true },
        ]
      }
    ]
  },
  {
    id: 'collocations', nameKey: 'unit.collocations', icon: 'link', level: 'C1',
    lessons: [
      {
        id: 'collocations-1',
        exercises: [
          { type: 'match-pairs', pairs: [{ en: 'Breakthrough', local: { ru: 'Прорыв', uk: 'Прорив' } }, { en: 'Nuance', local: { ru: 'Нюанс', uk: 'Нюанс' } }, { en: 'Conundrum', local: { ru: 'Головоломка', uk: 'Головоломка' } }, { en: 'Dilemma', local: { ru: 'Дилемма', uk: 'Дилема' } }, { en: 'Catalyst', local: { ru: 'Катализатор', uk: 'Каталізатор' } }] },
          { type: 'fill-blank', sentence: 'The invention was a ___ in renewable energy', options: ['breakthrough', 'breakfast', 'garden', 'ticket'], correctIndex: 0, context: { ru: 'Изобретение стало ___ в возобновляемой энергетике', uk: 'Винахід став ___ у відновлюваній енергетиці' } },
          { type: 'typing', prompt: { ru: 'Нюанс', uk: 'Нюанс' }, answer: 'Nuance' },
          { type: 'word-bank', questionKey: 'lesson.howToSay', questionParam: { ru: 'Это может подорвать весь процесс', uk: 'Це може підірвати весь процес' }, answer: ['This', 'could', 'undermine', 'the', 'entire', 'process'], bank: ['This', 'Could', 'Undermine', 'The', 'Entire', 'Process', 'Small', 'Big'] },
          { type: 'true-false', statement: { en: 'Autonomy', ru: 'Автономия', uk: 'Автономія' }, isTrue: true },
        ]
      }
    ]
  },
];
