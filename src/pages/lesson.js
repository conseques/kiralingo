import { t, getCurrentLang } from '../i18n.js';
import { store } from '../store.js';
import { navigate, forceRefresh } from '../router.js';
import { getNextLesson } from '../data/lessons.js';
import { speak } from '../utils/audio.js';

export function renderLesson() {
  const page = document.createElement('div');
  page.className = 'page relative min-h-screen bg-background text-on-background font-body flex flex-col selection:bg-primary-container';

  const lang = getCurrentLang();
  const targetLang = store.state.targetLang === 'no' ? 'no' : 'en';
  const getTarget = (val) => (val && val[targetLang] !== undefined ? val[targetLang] : (val && val.en !== undefined ? val.en : val));
  
  const next = getNextLesson(store);

  if (!next) {
    page.innerHTML = `
      <div class="max-w-2xl mx-auto flex flex-col items-center justify-center flex-1 px-6 text-center animate-fade-in-up mt-32">
        <div class="w-32 h-32 rounded-full flex items-center justify-center bg-primary-container mb-8 organic-pebble-1 shadow-xl animate-bounce-in">
          <span class="material-symbols-outlined filled text-7xl text-primary" >emoji_events</span>
        </div>
        <h2 class="font-headline text-4xl font-extrabold text-on-surface mb-4 tracking-tight">${t('lesson.complete')}</h2>
        <p class="text-on-surface-variant font-label text-lg mb-12 italic">"${t('goals.kiraQuote')}"</p>
        <div class="relative group w-full max-w-xs">
          <div class="absolute -inset-1 aurora-gradient rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <button id="back-home" class="relative w-full bg-primary text-on-primary font-headline font-extrabold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-primary-dim active:scale-95 transition-all flex items-center gap-2 justify-center">
            <span class="material-symbols-outlined">home</span>
            ${t('nav.home')}
          </button>
        </div>
      </div>
    `;
    setTimeout(() => {
      page.querySelector('#back-home')?.addEventListener('click', () => navigate('/home'));
    }, 0);
    return page;
  }

  const { lesson } = next;
  const exercises = lesson.exercises;
  let currentExercise = 0;
  let correctCount = 0;
  let selectedWords = [];
  let checked = false;
  let isCorrect = undefined;
  // For match-pairs
  let matchedPairs = [];
  let selectedLeft = null;
  let selectedRight = null;
  // For typing
  let typedAnswer = '';
  // For true-false
  let tfAnswer = null;
  // For fill-blank
  let selectedOption = null;

  function renderExercise() {
    page.innerHTML = '';
    const exercise = exercises[currentExercise];
    const progress = (currentExercise / exercises.length) * 100;

    // Background Accents
    const bgAccents = document.createElement('div');
    bgAccents.className = 'fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-[0.05]';
    bgAccents.innerHTML = `
      <div class="absolute top-[10%] left-[5%] w-96 h-96 bg-primary-fixed rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary-container rounded-full blur-[150px]"></div>
    `;
    page.appendChild(bgAccents);

    // Header
    const header = document.createElement('header');
    header.className = 'bg-surface/80 dark:bg-surface/90 backdrop-blur-xl sticky top-0 z-40 border-b border-surface-container/50 shadow-sm';
    header.innerHTML = `
      <div class="flex justify-between items-center w-full px-4 md:px-6 py-4 max-w-5xl mx-auto">
        <div class="flex items-center gap-3 w-full">
          <button id="lesson-close" class="p-2 hover:bg-surface-container-highest transition-colors rounded-full text-on-surface-variant group flex-shrink-0">
            <span class="material-symbols-outlined group-hover:scale-110 transition-transform">close</span>
          </button>
          <div class="h-4 w-full max-w-md bg-surface-container-highest rounded-full overflow-hidden relative shadow-inner">
            <div class="aurora-gradient h-full rounded-full transition-all duration-700 ease-spring" style="width:${progress}%"></div>
          </div>
        </div>
        <div class="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-4 hidden sm:flex">
          <div class="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full shadow-sm">
            <span class="text-sm font-bold font-headline text-on-surface">${store.state.streak.current}</span>
            <span class="text-xs">🔥</span>
          </div>
          <div class="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full shadow-sm">
            <span class="text-sm font-bold font-headline text-on-surface">${store.state.gems}</span>
            <span class="text-xs">💎</span>
          </div>
          <div class="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full shadow-sm">
            <span class="text-sm font-bold font-headline text-on-surface">${store.state.hearts}</span>
            <span class="text-xs">❤️</span>
          </div>
        </div>
      </div>
    `;
    page.appendChild(header);

    // Main content
    const main = document.createElement('main');
    main.className = 'flex-grow flex flex-col items-center px-4 py-8 md:py-12 max-w-4xl mx-auto w-full pb-32';

    // Render by type
    switch (exercise.type) {
      case 'word-bank': renderWordBank(main, exercise); break;
      case 'multiple-choice': renderMultipleChoice(main, exercise); break;
      case 'fill-blank': renderFillBlank(main, exercise); break;
      case 'typing': renderTyping(main, exercise); break;
      case 'match-pairs': renderMatchPairs(main, exercise); break;
      case 'sentence-order': renderSentenceOrder(main, exercise); break;
      case 'true-false': renderTrueFalse(main, exercise); break;
      default: renderWordBank(main, exercise);
    }

    page.appendChild(main);

    // Footer
    const hasAnswer = checked || selectedWords.length > 0 || typedAnswer.length > 0 || tfAnswer !== null || selectedOption !== null || matchedPairs.length === exercise.pairs?.length;
    const footer = document.createElement('footer');
    footer.className = `fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur-2xl py-5 px-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-all ease-spring duration-500 transform ${hasAnswer || checked ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`;
    
    // Bottom border color reflects result
    let borderColor = 'border-t border-surface-container-high';
    if (checked && isCorrect === true) borderColor = 'border-t-4 border-t-primary';
    if (checked && isCorrect === false) borderColor = 'border-t-4 border-t-error';
    footer.className += ` ${borderColor}`;

    footer.innerHTML = `
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <button id="skip-btn" class="hidden sm:flex text-on-surface-variant font-bold font-label text-sm uppercase tracking-wider hover:text-primary transition-all items-center gap-2 group p-2">
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">skip_next</span>
          ${t('lesson.skip')}
        </button>
        <div class="relative group w-full sm:w-auto">
          ${hasAnswer && !checked ? '<div class="absolute -inset-1 aurora-gradient rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>' : ''}
          ${checked ? `<div class="absolute -inset-1 ${isCorrect ? 'bg-primary' : 'bg-error'} rounded-xl blur opacity-30 transition-opacity"></div>` : ''}
          <button id="check-btn" class="relative w-full sm:w-64 ${checked ? (isCorrect ? 'bg-primary text-on-primary hover:bg-primary-dim' : 'bg-error text-on-error hover:bg-error-dim') : 'bg-surface-container-highest text-on-surface hover:bg-surface-dim'} font-headline font-extrabold py-4 px-8 rounded-xl text-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
            ${checked ? t('lesson.continue') : t('lesson.check')}
            ${checked && isCorrect ? '<span class="material-symbols-outlined" >check_circle</span>' : ''}
          </button>
        </div>
      </div>
    `;
    page.appendChild(footer);

    // Feedback Panel (Inline between main and footer if checked)
    if (checked) {
      const fb = document.createElement('div');
      fb.className = `w-full max-w-4xl mx-auto p-6 rounded-2xl mb-8 animate-fade-in-up shadow-sm flex items-start gap-4 ${isCorrect ? 'bg-primary-container/30 border border-primary/20 text-on-primary-container' : 'bg-error-container/30 border border-error/20 text-on-error-container'}`;
      
      let extra = '';
      if (!isCorrect && exercise.answer) {
        extra = `<p class="mt-2 text-sm font-label opacity-80">${t('lesson.correctAnswer')} <span class="font-bold">${Array.isArray(exercise.answer) ? exercise.answer.join(' ') : exercise.answer}</span></p>`;
      }
      if (!isCorrect && exercise.correctTranslation) {
        const ct = exercise.correctTranslation[lang] || exercise.correctTranslation.ru;
        extra = `<p class="mt-2 text-sm font-label opacity-80">${t('lesson.correctAnswer')} <span class="font-bold">${ct}</span></p>`;
      }
      
      fb.innerHTML = `
        <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? 'bg-primary text-on-primary' : 'bg-error text-on-error'}">
          <span class="material-symbols-outlined text-2xl" >${isCorrect ? 'check' : 'close'}</span>
        </div>
        <div>
          <h3 class="font-headline font-extrabold text-xl tracking-tight">${isCorrect ? t('lesson.correct') : t('lesson.incorrect')}</h3>
          ${extra}
        </div>
      `;
      main.appendChild(fb);
    }

    // Wire events
    setTimeout(() => {
      page.querySelector('#lesson-close')?.addEventListener('click', () => {
        if (confirm("Are you sure you want to exit your lesson?")) {
          store.clearSelectedUnit();
          navigate('/home');
        }
      });
      page.querySelector('#skip-btn')?.addEventListener('click', () => {
        nextExercise();
      });
      page.querySelector('#check-btn')?.addEventListener('click', () => {
        if (!hasAnswer) return;
        handleCheck();
      });
    }, 0);
  }

  function nextExercise() {
    currentExercise++;
    resetState();
    if (currentExercise >= exercises.length) {
      finishLesson();
    } else {
      renderExercise();
    }
  }

  function resetState() {
    checked = false;
    isCorrect = undefined;
    selectedWords = [];
    matchedPairs = [];
    selectedLeft = null;
    selectedRight = null;
    typedAnswer = '';
    tfAnswer = null;
    selectedOption = null;
  }

  // Helper for Kira Speech Bubble UI
  function kiraSection(html) {
    const sec = document.createElement('section');
    sec.className = 'flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-12 w-full animate-fade-in-up';
    sec.innerHTML = `
      <div class="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 animate-bounce-in">
        <div class="absolute inset-0 bg-primary-container/20 rounded-[50%_50%_45%_55%] blur-xl pointer-events-none"></div>
        <img src="/images/kira-lesson.webp" class="relative z-10 w-full h-full object-contain drop-shadow-lg" />
      </div>
      <div class="relative bg-surface p-6 sm:p-8 rounded-2xl sm:rounded-[2rem_2rem_2rem_0] runic-pattern border border-surface-container-highest shadow-sm flex-grow w-full">
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:-left-3 sm:top-auto sm:translate-x-0 sm:bottom-6 w-6 h-6 bg-surface border-b sm:border-b-0 sm:border-l border-surface-container-highest rotate-45 pointer-events-none"></div>
        <div class="relative z-10 text-center sm:text-left">
          ${html}
        </div>
      </div>
    `;
    return sec;
  }

  // ═══════════════════════════════════════════
  // EXERCISES
  // ═══════════════════════════════════════════
  
  function renderWordBank(main, exercise) {
    const question = exercise.questionParam[lang] || exercise.questionParam.ru;
    
    const speakBtnHtml = `
      <button id="speak-question" class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors active:scale-90 ml-3 shrink-0 align-middle">
        <span class="material-symbols-outlined text-sm" >volume_up</span>
      </button>
    `;

    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-2">${t('lesson.howToSay', { word: '' })}</p>
      <div class="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start">
        <h2 class="text-2xl sm:text-3xl font-headline font-extrabold text-on-surface leading-tight text-center sm:text-left">
          <span class="text-primary italic">"${question}"</span>
        </h2>
        ${speakBtnHtml}
      </div>
    `));

    // Wire speak
    setTimeout(() => {
      page.querySelector('#speak-question')?.addEventListener('click', () => {
        const tgtAns = getTarget(exercise.answer);
        const answerText = Array.isArray(tgtAns) ? tgtAns.join(' ') : tgtAns;
        speak(answerText);
      });
    }, 0);

    // Selected Words 'Shelf'
    const answerZone = document.createElement('section');
    answerZone.className = 'w-full min-h-[140px] mb-12 relative animate-fade-in-up stagger';
    answerZone.innerHTML = '<div class="absolute bottom-0 left-0 w-full h-1.5 bg-surface-container-high rounded-full"></div>';
    
    const answerArea = document.createElement('div');
    answerArea.className = 'flex flex-wrap gap-3 justify-center items-center pb-6 min-h-[100px] z-10 relative';
    
    if (selectedWords.length === 0) {
      answerArea.innerHTML = '<div class="w-32 h-14 border-2 border-dashed border-outline-variant/30 rounded-full"></div>';
    }

    selectedWords.forEach((item, i) => {
      const tile = document.createElement('div');
      tile.className = 'organic-pebble-1 bg-surface-container-lowest text-on-surface px-6 py-4 font-headline font-bold text-lg shadow-sm border border-outline-variant/20 hover:-translate-y-1 transition-transform cursor-pointer shadow-hover';
      tile.textContent = item.word;
      if (checked) {
        tile.className = 'organic-pebble-1 px-6 py-4 font-headline font-bold text-lg shadow-inner text-on-surface opacity-80 bg-surface-container';
      } else {
        tile.addEventListener('click', () => { selectedWords.splice(i, 1); renderExercise(); });
      }
      answerArea.appendChild(tile);
    });
    answerZone.appendChild(answerArea);
    main.appendChild(answerZone);

    // Bank (Pebble Shapes)
    const bankSection = document.createElement('section');
    bankSection.className = 'w-full flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up';
    bankSection.style.animationDelay = '0.1s';
    const tgtBank = getTarget(exercise.bank);
    const shapes = ['organic-pebble-1', 'organic-pebble-2', 'organic-pebble-3'];
    
    tgtBank.forEach((word, i) => {
      const isUsed = selectedWords.some(w => w.index === i);
      const isSpecial = word.startsWith('_'); // Example: rare words could have special tags if we expand data
      const shape = shapes[i % shapes.length];
      
      const tile = document.createElement('button');
      tile.className = `${shape} transition-all px-6 py-4 text-base sm:text-lg font-bold font-label shadow-sm flex justify-center items-center
        ${isUsed || checked ? 'bg-surface-container text-on-surface-variant opacity-40 cursor-default scale-95 shadow-none' : 'bg-surface-container-low text-on-surface hover:bg-surface-container hover:-translate-y-1 active:scale-95 text-primary'}`;
      
      tile.textContent = word;
      if (!isUsed && !checked) {
        tile.addEventListener('click', () => { selectedWords.push({ word, index: i }); renderExercise(); });
      }
      bankSection.appendChild(tile);
    });
    main.appendChild(bankSection);
  }

  function renderMultipleChoice(main, exercise) {
    const questionWord = exercise.questionWord[lang] || exercise.questionWord.ru;
    
    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-2">${t('lesson.chooseCorrect')}</p>
      <div class="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start">
        <h2 class="text-3xl sm:text-4xl font-headline font-extrabold text-on-surface leading-tight text-center sm:text-left">
          <span class="text-secondary italic">"${questionWord}"</span>
        </h2>
        <button id="speak-question-word" class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-colors active:scale-90 ml-3 shrink-0 align-middle">
          <span class="material-symbols-outlined text-sm" >volume_up</span>
        </button>
      </div>
    `));

    setTimeout(() => {
      page.querySelector('#speak-question-word')?.addEventListener('click', () => {
        speak(getTarget(exercise.questionWord));
      });
    }, 0);

    const optionsSection = document.createElement('section');
    optionsSection.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up stagger';
    
    const tgtOptions = getTarget(exercise.options);
    const shapes = ['organic-pebble-1', 'organic-pebble-2', 'organic-pebble-3', 'organic-pebble-1'];

    tgtOptions.forEach((option, i) => {
      const btn = document.createElement('button');
      const shape = shapes[i % shapes.length];
      const isSelected = selectedWords[0]?.index === i;
      
      let optClass = `p-6 sm:p-8 flex items-center justify-between cursor-pointer transition-all duration-300 border-2 ${shape} group `;
      
      if (checked) {
        if (i === exercise.correctIndex) {
          optClass += 'bg-primary-container/30 border-primary shadow-sm';
        } else if (isSelected) {
          optClass += 'bg-error-container/30 border-error opacity-60';
        } else {
          optClass += 'bg-surface-container-low border-transparent opacity-50 filter grayscale';
        }
      } else {
        optClass += isSelected 
          ? 'bg-primary-container/20 border-primary shadow-md -translate-y-1' 
          : 'bg-surface-container-lowest border-surface-container-high hover:border-primary-container hover:-translate-y-1 hover:shadow-sm';
      }
      
      btn.className = optClass;
      btn.innerHTML = `
        <div class="text-left flex-1" style="min-width:0;">
          <p class="font-headline font-extrabold text-xl sm:text-2xl text-on-surface mb-1 truncate ${isSelected && !checked ? 'text-primary' : ''}">${getTarget(option)}</p>
          <p class="text-on-surface-variant font-label text-sm sm:text-base pr-2 truncate">${option[lang] || option.ru}</p>
        </div>
        ${checked && i === exercise.correctIndex ? '<span class="material-symbols-outlined text-3xl text-primary animate-bounce-in shrink-0" >check_circle</span>' : ''}
        ${checked && isSelected && i !== exercise.correctIndex ? '<span class="material-symbols-outlined text-3xl text-error animate-bounce-in shrink-0" >cancel</span>' : ''}
        ${!checked && isSelected ? '<div class="w-6 h-6 rounded-full bg-primary animate-scale-up shrink-0 border-4 border-surface shadow-sm"></div>' : ''}
        ${!checked && !isSelected ? '<div class="w-6 h-6 rounded-full border-2 border-outline-variant/40 group-hover:border-primary-container shrink-0 transition-colors"></div>' : ''}
      `;
      
      if (!checked) {
        btn.addEventListener('click', () => {
          selectedWords = [{ word: getTarget(option), index: i }];
          renderExercise(); // Keep UI updated, user hits "CHECK" below
        });
      }
      optionsSection.appendChild(btn);
    });
    main.appendChild(optionsSection);
  }

  function renderFillBlank(main, exercise) {
    const ctx = exercise.context[lang] || exercise.context.ru;
    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-1">${t('lesson.fillBlank')}</p>
      <p class="text-on-surface font-label text-sm opacity-80 italic">${ctx}</p>
    `));

    // Sentence Layout
    const tgtSentence = getTarget(exercise.sentence);
    const parts = tgtSentence.split('___');
    const tgtOptions = getTarget(exercise.options);
    const blankVal = selectedOption !== null ? tgtOptions[selectedOption] : '';
    
    const sentenceDiv = document.createElement('div');
    sentenceDiv.className = 'w-full bg-surface-container-lowest p-8 sm:p-12 rounded-3xl organic-pebble-2 text-center shadow-sm border border-surface-container-high mb-12 animate-fade-in-up flex flex-wrap items-center justify-center gap-x-2 gap-y-4';
    
    let blankClass = 'inline-flex items-center justify-center min-w-[120px] h-12 px-6 border-b-4 font-extrabold text-2xl transition-all duration-300 ';
    if (selectedOption !== null) {
      if (checked) {
        blankClass += isCorrect ? 'text-primary border-primary bg-primary-container/20 px-6 pt-2 organic-pebble-1' : 'text-error border-error bg-error-container/20 px-6 pt-2 organic-pebble-1';
      } else {
        blankClass += 'text-secondary border-secondary bg-secondary-container/20 px-6 pt-2 organic-pebble-1 translate-y-[-4px]';
      }
    } else {
      blankClass += 'text-transparent border-outline-variant/50 border-dashed';
    }

    sentenceDiv.innerHTML = `
      <span class="font-headline font-bold text-2xl sm:text-3xl text-on-surface">${parts[0]}</span>
      <span class="${blankClass}">${blankVal || '???'}</span>
      <span class="font-headline font-bold text-2xl sm:text-3xl text-on-surface">${parts[1] || ''}</span>
    `;
    main.appendChild(sentenceDiv);

    // Options Pebble Grid
    const optDiv = document.createElement('div');
    optDiv.className = 'w-full flex flex-wrap justify-center gap-4 animate-fade-in-up stagger';
    
    tgtOptions.forEach((opt, i) => {
      const isSelected = selectedOption === i;
      const btn = document.createElement('button');
      btn.className = `organic-pebble-3 px-8 py-4 font-headline font-extrabold text-xl transition-all ${isSelected || checked ? 'bg-surface-container text-on-surface-variant opacity-50 scale-95 shadow-none' : 'bg-surface-container-highest text-on-surface shadow-md hover:-translate-y-1 hover:bg-secondary-container hover:text-on-secondary-container active:scale-95 border border-surface-container-high'}`;
      btn.textContent = opt;
      if (!checked) {
        btn.addEventListener('click', () => { selectedOption = i; renderExercise(); });
      }
      optDiv.appendChild(btn);
    });
    main.appendChild(optDiv);
  }

  function renderTyping(main, exercise) {
    const prompt = exercise.prompt[lang] || exercise.prompt.ru;
    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-2">${t('lesson.typeAnswer')}</p>
      <h2 class="text-2xl sm:text-3xl font-headline font-extrabold text-secondary leading-tight text-center sm:text-left">
        "${prompt}"
      </h2>
    `));

    const inputWrap = document.createElement('div');
    inputWrap.className = 'w-full max-w-xl mx-auto animate-fade-in-up stagger';
    
    if (!checked) {
      inputWrap.innerHTML = `
        <div class="relative group">
          <input id="type-input" type="text" value="${typedAnswer}" autocomplete="off" spellcheck="false" placeholder="${t('lesson.typeHint')}"
            class="w-full bg-surface-container-lowest border-2 border-surface-container-highest organic-pebble-1 px-8 py-6 text-2xl font-headline font-extrabold text-center text-on-surface outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all shadow-sm placeholder-outline-variant" />
        </div>
      `;
    } else {
      const colorClass = isCorrect ? 'text-primary border-primary bg-primary-container/20' : 'text-error border-error bg-error-container/20';
      inputWrap.innerHTML = `
        <div class="w-full ${colorClass} border-2 organic-pebble-1 px-8 py-6 text-2xl font-headline font-extrabold text-center transition-all shadow-sm">
          ${typedAnswer}
        </div>
      `;
    }
    main.appendChild(inputWrap);

    setTimeout(() => {
      const inp = page.querySelector('#type-input');
      if (inp) {
        inp.focus();
        inp.addEventListener('input', (e) => { typedAnswer = e.target.value; renderExercise(); /* Trigger footer check btn enable */ });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && typedAnswer.length > 0) handleCheck(); });
      }
    }, 50);
  }

  function renderMatchPairs(main, exercise) {
    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-1">${t('lesson.matchPairs')}</p>
      <p class="text-on-surface font-label text-sm opacity-80 italic">${t('lesson.tapPairs')}</p>
    `));

    const grid = document.createElement('div');
    grid.className = 'w-full grid grid-cols-2 gap-3 sm:gap-6 w-full animate-fade-in-up stagger';

    const rightOrder = exercise.pairs.map((_, i) => i);
    if (!checked && matchedPairs.length === 0) {
      for (let i = rightOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rightOrder[i], rightOrder[j]] = [rightOrder[j], rightOrder[i]];
      }
      exercise._rightOrder = rightOrder;
    }
    const order = exercise._rightOrder || rightOrder;

    exercise.pairs.forEach((pair, i) => {
      const isMatchedLeft = matchedPairs.includes(i);
      const isSelectedLeft = selectedLeft === i;
      const leftBtn = document.createElement('button');
      
      let leftClass = `p-4 sm:p-6 organic-pebble-2 border-2 transition-all duration-300 font-headline font-bold text-lg sm:text-xl `;
      if (isMatchedLeft) {
        leftClass += 'bg-surface border-surface-container-high text-surface-container-high opacity-50 cursor-default scale-95 shadow-none';
      } else if (isSelectedLeft) {
        leftClass += 'bg-primary-container/20 border-primary text-primary shadow-md -translate-y-1';
      } else {
        leftClass += 'bg-surface-container-lowest border-surface-container-high hover:border-primary/50 text-on-surface hover:-translate-y-1 active:scale-95 shadow-sm';
      }
      
      leftBtn.className = leftClass;
      leftBtn.innerHTML = `${getTarget(pair)}`;
      if (!isMatchedLeft && !checked) {
        leftBtn.addEventListener('click', () => {
          selectedLeft = isSelectedLeft ? null : i;
          if (selectedLeft !== null && selectedRight !== null) tryMatch(exercise);
          else renderExercise();
        });
      }
      grid.appendChild(leftBtn);

      const ri = order[i];
      const rPair = exercise.pairs[ri];
      const isMatchedRight = matchedPairs.includes(ri);
      const isSelectedRight = selectedRight === ri;
      const rightBtn = document.createElement('button');
      
      let rightClass = `p-4 sm:p-6 organic-pebble-1 border-2 transition-all duration-300 font-headline font-bold text-lg sm:text-xl `;
      if (isMatchedRight) {
        rightClass += 'bg-surface border-surface-container-high text-surface-container-high opacity-50 cursor-default scale-95 shadow-none';
      } else if (isSelectedRight) {
        rightClass += 'bg-secondary-container/20 border-secondary text-secondary shadow-md -translate-y-1';
      } else {
        rightClass += 'bg-surface border-surface-container-highest hover:border-secondary/50 text-on-surface hover:-translate-y-1 active:scale-95 shadow-sm';
      }
      
      rightBtn.className = rightClass;
      rightBtn.innerHTML = `${rPair.local[lang] || rPair.local.ru}`;
      if (!isMatchedRight && !checked) {
        rightBtn.addEventListener('click', () => {
          selectedRight = isSelectedRight ? null : ri;
          if (selectedLeft !== null && selectedRight !== null) tryMatch(exercise);
          else renderExercise();
        });
      }
      grid.appendChild(rightBtn);
    });

    main.appendChild(grid);

    if (matchedPairs.length === exercise.pairs.length && !checked) {
      checked = true;
      isCorrect = true;
      store.addXP(35);
      store.addGems(5);
      correctCount++;
      setTimeout(() => renderExercise(), 300); // trigger big CTA rendering
    }
  }

  function tryMatch(exercise) {
    if (selectedLeft === selectedRight) {
      matchedPairs.push(selectedLeft);
    } else {
      // Visual feedback for wrong match? Currently handled passively by resetting
    }
    selectedLeft = null;
    selectedRight = null;
    renderExercise();
  }

  function renderSentenceOrder(main, exercise) {
    const ctx = exercise.context[lang] || exercise.context.ru;
    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-1">${t('lesson.orderSentence')}</p>
      <p class="text-on-surface font-label text-sm opacity-80 italic">${ctx}</p>
    `));

    // Answer Zone
    const answerZone = document.createElement('section');
    answerZone.className = 'w-full min-h-[140px] mb-12 relative animate-fade-in-up stagger p-4 border-2 border-dashed border-outline-variant/30 rounded-[2rem_2rem_3rem_3rem]';
    
    const answerArea = document.createElement('div');
    answerArea.className = 'flex flex-wrap gap-3 justify-start items-center relative z-10 w-full min-h-[100px]';
    
    if (selectedWords.length === 0) {
      answerZone.classList.add('flex', 'items-center', 'justify-center');
      answerArea.innerHTML = `<span class="text-outline-variant font-label font-bold text-center w-full block">Tap the words below to build the sentence</span>`;
    } else {
      answerZone.classList.remove('justify-center');
    }

    selectedWords.forEach((item, i) => {
      const tile = document.createElement('div');
      tile.className = 'organic-pebble-2 bg-surface-container-lowest text-on-surface px-6 py-4 font-headline font-bold text-xl shadow-md border border-outline-variant/20 hover:-translate-y-1 transition-transform cursor-pointer shadow-hover scale-100 animate-bounce-in';
      tile.textContent = item.word;
      if (checked) {
        tile.className = 'organic-pebble-2 px-6 py-4 font-headline font-extrabold text-xl shadow-none text-on-surface bg-surface-container border border-surface-container-highest opacity-90';
        if (isCorrect) tile.classList.add('!bg-primary/10', '!text-primary', '!border-primary/30');
      } else {
        tile.addEventListener('click', () => { selectedWords.splice(i, 1); renderExercise(); });
      }
      answerArea.appendChild(tile);
    });
    answerZone.appendChild(answerArea);
    main.appendChild(answerZone);

    // Shuffled Word Bank
    const tgtWords = getTarget(exercise.words);
    if (!exercise._shuffled || exercise._shuffledLang !== targetLang) {
      exercise._shuffled = [...tgtWords].sort(() => Math.random() - 0.5);
      exercise._shuffledLang = targetLang;
    }
    
    const bankDiv = document.createElement('div');
    bankDiv.className = 'w-full flex flex-wrap justify-center gap-4 animate-fade-in-up pointer-events-auto';
    
    exercise._shuffled.forEach((word, i) => {
      const isUsed = selectedWords.some(w => w.originalIndex === i);
      const tile = document.createElement('button');
      tile.className = `organic-pebble-1 px-6 py-4 font-headline font-bold text-xl shadow-sm transition-all ${isUsed || checked ? 'bg-surface-container-highest text-surface-container opacity-20 cursor-default shadow-none scale-95 border border-transparent' : 'bg-surface-container-highest border border-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-low hover:-translate-y-1 hover:shadow-md active:scale-95'}`;
      tile.textContent = word;
      if (!isUsed && !checked) {
        tile.addEventListener('click', () => { selectedWords.push({ word, originalIndex: i }); renderExercise(); });
      }
      bankDiv.appendChild(tile);
    });
    main.appendChild(bankDiv);
  }

  function renderTrueFalse(main, exercise) {
    const stTgt = getTarget(exercise.statement);
    const stLocal = exercise.statement[lang] || exercise.statement.ru;
    
    main.appendChild(kiraSection(`
      <p class="text-on-surface-variant font-label text-xs uppercase tracking-widest font-extrabold mb-1">${t('lesson.trueFalse')}</p>
    `));

    const card = document.createElement('div');
    card.className = 'w-full bg-surface-container-low p-8 sm:p-12 mb-10 text-center animate-fade-in-up border-2 border-surface-container-high organic-pebble-3 shadow-sm';
    card.innerHTML = `
      <p class="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface mb-2 leading-tight">"${stTgt}"</p>
      <div class="h-0.5 w-16 bg-surface-container-highest mx-auto my-4"></div>
      <p class="font-label text-xl text-on-surface-variant italic font-semibold">="${stLocal}"</p>
    `;
    main.appendChild(card);

    const btnRow = document.createElement('div');
    btnRow.className = 'w-full flex sm:flex-row flex-col gap-4 justify-center animate-fade-in-up stagger';

    [{ val: true, label: t('lesson.true'), icon: 'check', color: 'primary' },
     { val: false, label: t('lesson.false'), icon: 'close', color: 'error' }].forEach(opt => {
      const btn = document.createElement('button');
      
      let btnClass = `flex-1 max-w-[280px] p-6 text-center cursor-pointer border-4 transition-all duration-300 organic-pebble-1 flex flex-col items-center justify-center gap-2 group mx-auto w-full `;
      
      if (checked) {
        if (tfAnswer === opt.val) {
          btnClass += isCorrect ? `bg-${opt.color}-container/30 border-${opt.color} shadow-md scale-105` : `bg-error-container/30 border-error opacity-60 scale-95`;
        } else if (opt.val === exercise.isTrue) {
          btnClass += `bg-${opt.color}-container/30 border-${opt.color} shadow-sm`;
        } else {
          btnClass += 'bg-surface-container-lowest border-surface-container opacity-40 grayscale';
        }
      } else {
        btnClass += tfAnswer === opt.val 
          ? `bg-${opt.color}-container/20 border-${opt.color} shadow-lg -translate-y-2` 
          : `bg-surface-container-lowest border-surface-container hover:border-${opt.color}/50 hover:bg-${opt.color}/5 hover:-translate-y-1 shadow-sm`;
      }

      btn.className = btnClass;
      btn.innerHTML = `
        <div class="w-16 h-16 rounded-full ${checked && tfAnswer === opt.val ? `bg-${opt.color} text-on-${opt.color}` : `bg-surface-container-highest text-${opt.color} group-hover:scale-110`} flex items-center justify-center transition-all">
          <span class="material-symbols-outlined text-4xl" >${opt.icon}</span>
        </div>
        <p class="font-headline font-extrabold text-2xl text-${opt.color} uppercase tracking-wider">${opt.label}</p>
      `;
      
      if (!checked) {
        btn.addEventListener('click', () => {
          tfAnswer = opt.val;
          renderExercise(); // allow user to choose then hit "CHECK" in footer
        });
      }
      btnRow.appendChild(btn);
    });
    main.appendChild(btnRow);
  }

  function handleCheck() {
    const exercise = exercises[currentExercise];
    if (checked) { nextExercise(); return; }

    switch (exercise.type) {
      case 'word-bank':
        if (selectedWords.length === 0) return;
        isCorrect = JSON.stringify(selectedWords.map(w => w.word.toLowerCase())) ===
                    JSON.stringify(getTarget(exercise.answer).map(w => w.toLowerCase()));
        checked = true;
        if (isCorrect) { store.addXP(30); store.addGems(5); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'fill-blank':
        if (selectedOption === null) return;
        isCorrect = selectedOption === exercise.correctIndex;
        checked = true;
        if (isCorrect) { store.addXP(20); store.addGems(3); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'typing':
        if (typedAnswer.trim().length === 0) return;
        isCorrect = typedAnswer.trim().toLowerCase() === getTarget(exercise.answer).toLowerCase();
        checked = true;
        if (isCorrect) { store.addXP(35); store.addGems(5); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'sentence-order':
        if (selectedWords.length === 0) return;
        isCorrect = JSON.stringify(selectedWords.map(w => w.word.toLowerCase())) ===
                    JSON.stringify(getTarget(exercise.answer).map(w => w.toLowerCase()));
        checked = true;
        if (isCorrect) { store.addXP(30); store.addGems(5); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'multiple-choice':
        if (selectedWords.length === 0) return;
        isCorrect = selectedWords[0].index === exercise.correctIndex;
        checked = true;
        if (isCorrect) { store.addXP(25); store.addGems(5); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'true-false':
        if (tfAnswer === null) return;
        isCorrect = (tfAnswer === exercise.isTrue);
        checked = true;
        if (isCorrect) { store.addXP(20); store.addGems(3); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'match-pairs':
        // Match pairs checks itself on click when completed. 
        // We only trigger this button if it's already completed to 'Continue'
        if (matchedPairs.length === exercise.pairs.length) {
            nextExercise();
        }
        break;
      default:
        break;
    }
  }

  function finishLesson() {
    store.completeLesson(lesson.id);
    store.addXP(50);
    if (store.state.completedLessons.length === 1) store.unlockAchievement('first_lesson');
    if (store.state.streak.current >= 3) store.unlockAchievement('streak_starter');
    if (store.state.xp.total >= 1000) store.unlockAchievement('dedicated');
    if (store.getLearnedWordCount() >= 50) store.unlockAchievement('vocab_master');

    page.innerHTML = '';
    const complete = document.createElement('div');
    complete.className = 'w-full h-screen fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up';
    
    // Confetti / Accents
    const bgAccents = document.createElement('div');
    bgAccents.className = 'fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30';
    bgAccents.innerHTML = `
      <div class="absolute top-[20%] left-[20%] w-64 h-64 bg-primary-fixed rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-[20%] right-[20%] w-64 h-64 bg-secondary-fixed rounded-full blur-[100px] animate-pulse"></div>
    `;
    complete.appendChild(bgAccents);

    complete.innerHTML += `
      <div class="relative mb-8">
        <div class="absolute inset-0 bg-primary-container blur-2xl rounded-full scale-150 opacity-60 animate-rotate"></div>
        <div class="w-32 h-32 rounded-full border-8 border-surface-container-lowest bg-primary-container flex items-center justify-center relative z-10 organic-pebble-1 shadow-2xl animate-bounce-in">
          <span class="material-symbols-outlined filled text-7xl text-primary" >celebration</span>
        </div>
      </div>
      <h2 class="font-headline text-5xl sm:text-6xl font-extrabold text-on-surface mb-2 tracking-tight">
        ${t('lesson.complete')}
      </h2>
      <div class="bg-surface-container-low px-6 py-2 rounded-full border border-surface-container-highest mb-8 flex items-center gap-3 organic-pebble-3 shadow-sm">
        <span class="text-3xl font-extrabold text-primary">+${50 + (correctCount * 30)}</span>
        <span class="text-lg font-bold text-on-surface-variant tracking-wider uppercase">XP Earned</span>
      </div>
      <p class="text-on-surface-variant font-label text-xl mb-12 italic max-w-md">
        "${t('goals.kiraQuote')}"
      </p>
      
      <div class="w-full max-w-sm flex flex-col gap-4">
        <div class="relative group">
          <div class="absolute -inset-1 aurora-gradient rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <button id="continue-btn" class="relative w-full bg-primary text-on-primary font-headline font-extrabold py-5 px-8 rounded-2xl text-xl shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 justify-center organic-pebble-1">
            ${t('goals.continueLearning')}
            <span class="material-symbols-outlined text-3xl">arrow_forward</span>
          </button>
        </div>
        <button id="home-btn" class="w-full bg-surface-container-highest text-on-surface hover:bg-surface-variant font-headline font-bold py-4 px-8 rounded-2xl text-lg transition-all flex items-center gap-2 justify-center organic-pebble-2 border border-outline-variant/30">
          <span class="material-symbols-outlined">home</span>
          ${t('nav.home')}
        </button>
      </div>
    `;
    page.appendChild(complete);
    setTimeout(() => {
      page.querySelector('#continue-btn')?.addEventListener('click', () => {
        navigate('/lesson');
        setTimeout(() => forceRefresh(), 50);
      });
      page.querySelector('#home-btn')?.addEventListener('click', () => {
        store.clearSelectedUnit();
        navigate('/home');
      });
    }, 0);
  }

  renderExercise();
  return page;
}
