import { t, getCurrentLang } from '../i18n.js';
import { store } from '../store.js';
import { navigate, forceRefresh } from '../router.js';
import { getActiveUnits, getNextLesson } from '../data/lessons.js';
import { speak } from '../utils/audio.js';

export function renderLesson() {
  const page = document.createElement('div');
  page.style.cssText = 'min-height:100dvh;display:flex;flex-direction:column;background:var(--surface);';

  const lang = getCurrentLang();
  const next = getNextLesson(store);

  if (!next) {
    page.innerHTML = `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;">
        <span class="material-symbols-outlined filled" style="font-size:5rem;color:var(--primary);margin-bottom:1.5rem;">emoji_events</span>
        <h2 style="font-family:var(--font-headline);font-size:2rem;font-weight:800;margin-bottom:1rem;">${t('lesson.complete')}</h2>
        <p style="color:var(--on-surface-variant);margin-bottom:2rem;">${t('goals.kiraQuote')}</p>
        <button id="back-home" class="btn-primary" style="max-width:300px;">
          <span class="material-symbols-outlined">home</span>
          ${t('nav.home')}
        </button>
      </div>
    `;
    setTimeout(() => {
      page.querySelector('#back-home')?.addEventListener('click', () => navigate('/home'));
    }, 0);
    return page;
  }

  const { lesson, unit } = next;
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

    // Header
    const header = document.createElement('header');
    header.className = 'lesson-header';
    header.innerHTML = `
      <button id="lesson-close" class="lesson-close">
        <span class="material-symbols-outlined">close</span>
      </button>
      <div class="lesson-progress">
        <div class="progress-bar" style="height:1rem;">
          <div class="progress-bar__fill" style="width:${progress}%;
            box-shadow:inset 0 1px 2px rgba(255,255,255,0.3);"></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0.75rem;
        background:var(--surface-container-low);border-radius:var(--radius-full);">
        <span style="color:var(--tertiary);font-weight:700;">${store.state.streak.current} 🔥</span>
      </div>
    `;
    page.appendChild(header);

    // Main content
    const main = document.createElement('main');
    main.style.cssText = 'flex:1;padding:6rem 1.5rem 10rem;max-width:600px;margin:0 auto;width:100%;display:flex;flex-direction:column;';

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
    const hasAnswer = checked || selectedWords.length > 0 || typedAnswer.length > 0 || tfAnswer !== null || selectedOption !== null || matchedPairs.length > 0;
    const footer = document.createElement('footer');
    footer.style.cssText = `position:fixed;bottom:0;left:0;right:0;background:var(--surface-container-lowest);
      padding:1.5rem;display:flex;justify-content:center;align-items:center;
      box-shadow:0 -8px 40px rgba(0,0,0,0.04);border-top:1px solid color-mix(in srgb, var(--outline-variant) 10%, transparent);`;
    footer.innerHTML = `
      <div style="width:100%;max-width:600px;display:flex;justify-content:space-between;align-items:center;gap:1.5rem;">
        <button id="skip-btn" style="display:flex;align-items:center;gap:0.5rem;font-family:var(--font-headline);
          font-weight:700;color:var(--on-surface-variant);transition:color 0.15s;padding:0.5rem;">
          <span class="material-symbols-outlined">skip_next</span>
          ${t('lesson.skip')}
        </button>
        <button id="check-btn" class="btn-primary" style="flex:1;max-width:300px;${hasAnswer ? '' : 'opacity:0.5;pointer-events:none;'}">
          ${checked ? t('lesson.continue') : t('lesson.check')}
          <span class="material-symbols-outlined filled">check_circle</span>
        </button>
      </div>
    `;
    page.appendChild(footer);

    // Wire events
    setTimeout(() => {
      page.querySelector('#lesson-close')?.addEventListener('click', () => {
        store.clearSelectedUnit();
        navigate('/home');
      });
      page.querySelector('#skip-btn')?.addEventListener('click', () => {
        nextExercise();
      });
      page.querySelector('#check-btn')?.addEventListener('click', handleCheck);
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

  // ═══════════════════════════════════════════
  // Kira bubble helper
  // ═══════════════════════════════════════════
  function kiraSection(html) {
    const sec = document.createElement('section');
    sec.className = 'animate-fade-in-up';
    sec.style.cssText = 'display:flex;align-items:flex-end;gap:1rem;margin-top:2rem;margin-bottom:3rem;';
    sec.innerHTML = `
      <div style="flex-shrink:0;margin-bottom:-1rem;">
        <div style="width:5rem;height:5rem;overflow:hidden;border-radius:var(--radius-full);
          background:color-mix(in srgb, var(--secondary-container) 20%, transparent);
          border:4px solid var(--surface-container-lowest);position:relative;">
          <img src="/images/kira-lesson.webp" alt="Kira" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:-0.25rem;right:-0.25rem;background:var(--primary);
            color:white;padding:0.375rem;border-radius:var(--radius-full);box-shadow:var(--shadow-sm);">
            <span class="material-symbols-outlined filled" style="font-size:0.75rem;">auto_awesome</span>
          </div>
        </div>
      </div>
      <div class="glass" style="flex:1;padding:1.5rem;border-radius:var(--radius-md) var(--radius-md) var(--radius-md) 0;
        border:1px solid color-mix(in srgb, var(--secondary-container) 20%, transparent);box-shadow:var(--shadow-sm);">
        ${html}
      </div>
    `;
    return sec;
  }

  function feedbackBlock(main, exercise) {
    if (!checked) return;
    const fb = document.createElement('div');
    fb.className = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
    fb.style.cssText = 'margin-top:1.5rem;';
    let extra = '';
    if (!isCorrect && exercise.answer) {
      extra = `<p style="margin-top:0.5rem;color:var(--on-surface-variant);">${t('lesson.correctAnswer')} ${Array.isArray(exercise.answer) ? exercise.answer.join(' ') : exercise.answer}</p>`;
    }
    if (!isCorrect && exercise.correctTranslation) {
      const ct = exercise.correctTranslation[lang] || exercise.correctTranslation.ru;
      extra = `<p style="margin-top:0.5rem;color:var(--on-surface-variant);">${t('lesson.correctAnswer')} ${ct}</p>`;
    }
    fb.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <span class="material-symbols-outlined filled" style="color:${isCorrect ? 'var(--primary)' : 'var(--error)'};">
          ${isCorrect ? 'check_circle' : 'cancel'}
        </span>
        <span style="font-family:var(--font-headline);font-weight:700;font-size:1.125rem;">
          ${isCorrect ? t('lesson.correct') : t('lesson.incorrect')}
        </span>
      </div>
      ${extra}
    `;
    main.appendChild(fb);
  }

  // ═══════════════════════════════════════════
  // WORD BANK
  // ═══════════════════════════════════════════
  function renderWordBank(main, exercise) {
    const question = exercise.questionParam[lang] || exercise.questionParam.ru;
    main.appendChild(kiraSection(`
      <p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
        line-height:1.4;letter-spacing:-0.02em;font-size:1.125rem;display:flex;align-items:center;gap:0.5rem;">
        ${t('lesson.howToSay', { word: question })}
        <button id="speak-question" style="background:none;border:none;color:var(--secondary);cursor:pointer;display:flex;align-items:center;">
          <span class="material-symbols-outlined" style="font-size:1.25rem;">volume_up</span>
        </button>
      </p>
    `));

    // Wire speak
    setTimeout(() => {
      page.querySelector('#speak-question')?.addEventListener('click', () => {
        const answerText = Array.isArray(exercise.answer) ? exercise.answer.join(' ') : exercise.answer;
        speak(answerText);
      });
    }, 0);

    // Answer zone
    const answerZone = document.createElement('section');
    answerZone.style.cssText = 'flex:1;display:flex;flex-direction:column;justify-content:center;min-height:8rem;';
    const answerArea = document.createElement('div');
    answerArea.style.cssText = `width:100%;padding:2rem 0;border-bottom:2px dashed color-mix(in srgb, var(--outline-variant) 30%, transparent);
      display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;min-height:6rem;`;
    selectedWords.forEach((item, i) => {
      const tile = document.createElement('div');
      tile.className = 'word-tile word-tile--placed';
      tile.textContent = item.word;
      if (!checked) {
        tile.style.cursor = 'pointer';
        tile.addEventListener('click', () => { selectedWords.splice(i, 1); renderExercise(); });
      }
      answerArea.appendChild(tile);
    });
    answerZone.appendChild(answerArea);
    main.appendChild(answerZone);

    // Bank
    const bankSection = document.createElement('section');
    bankSection.style.cssText = 'margin-top:2rem;';
    const bank = document.createElement('div');
    bank.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;';
    exercise.bank.forEach((word, i) => {
      const isUsed = selectedWords.some(w => w.index === i);
      const tile = document.createElement('button');
      tile.className = `word-tile${isUsed ? ' word-tile--used' : ''}`;
      tile.textContent = word;
      tile.style.animationDelay = `${i * 0.05}s`;
      if (!isUsed && !checked) {
        tile.addEventListener('click', () => { selectedWords.push({ word, index: i }); renderExercise(); });
      }
      bank.appendChild(tile);
    });
    bankSection.appendChild(bank);
    main.appendChild(bankSection);
    feedbackBlock(main, exercise);
  }

  // ═══════════════════════════════════════════
  // MULTIPLE CHOICE
  // ═══════════════════════════════════════════
  function renderMultipleChoice(main, exercise) {
    const questionWord = exercise.questionWord[lang] || exercise.questionWord.ru;
    main.appendChild(kiraSection(`
      <p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
        line-height:1.4;letter-spacing:-0.02em;font-size:1.125rem;">
        ${t('lesson.chooseCorrect')}<br/>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-top:0.25rem;">
          <span style="font-size:1.5rem;color:var(--secondary);">"${questionWord}"</span>
          <button id="speak-question-word" style="background:none;border:none;color:var(--secondary);cursor:pointer;display:flex;align-items:center;">
            <span class="material-symbols-outlined" style="font-size:1.5rem;">volume_up</span>
          </button>
        </div>
      </p>
    `));

    // Wire speak
    setTimeout(() => {
      page.querySelector('#speak-question-word')?.addEventListener('click', () => {
        speak(exercise.questionWord.en);
      });
    }, 0);

    const optionsSection = document.createElement('section');
    optionsSection.className = 'stagger';
    optionsSection.style.cssText = 'display:flex;flex-direction:column;gap:1rem;margin-top:1rem;';
    exercise.options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.className = 'card animate-fade-in-up';
      btn.style.cssText = `text-align:left;padding:1.25rem 1.5rem;cursor:pointer;opacity:0;
        animation-delay:${i * 0.08}s;border:2px solid transparent;transition:all 0.2s;`;
      if (checked) {
        if (i === exercise.correctIndex) {
          btn.style.borderColor = 'var(--primary)';
          btn.style.background = 'color-mix(in srgb, var(--primary-container) 15%, transparent)';
        } else if (i === selectedWords[0]?.index && i !== exercise.correctIndex) {
          btn.style.borderColor = 'var(--error)';
          btn.style.background = 'color-mix(in srgb, var(--error-container) 15%, transparent)';
        }
      }
      btn.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <p style="font-family:var(--font-headline);font-weight:700;font-size:1.125rem;">${option.en}</p>
            <p style="color:var(--on-surface-variant);font-size:0.875rem;margin-top:0.25rem;">${option[lang] || option.ru}</p>
          </div>
          ${checked && i === exercise.correctIndex ? '<span class="material-symbols-outlined filled" style="color:var(--primary);">check_circle</span>' : ''}
          ${checked && i === selectedWords[0]?.index && i !== exercise.correctIndex ? '<span class="material-symbols-outlined filled" style="color:var(--error);">cancel</span>' : ''}
        </div>
      `;
      if (!checked) {
        btn.addEventListener('click', () => {
          selectedWords = [{ word: option.en, index: i }];
          checked = true;
          isCorrect = i === exercise.correctIndex;
          if (!isCorrect) store.loseHeart();
          if (isCorrect) { store.addXP(25); store.addGems(5); correctCount++; }
          renderExercise();
        });
      }
      optionsSection.appendChild(btn);
    });
    main.appendChild(optionsSection);
    feedbackBlock(main, exercise);
  }

  // ═══════════════════════════════════════════
  // FILL BLANK
  // ═══════════════════════════════════════════
  function renderFillBlank(main, exercise) {
    const ctx = exercise.context[lang] || exercise.context.ru;
    main.appendChild(kiraSection(`<p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
      line-height:1.4;font-size:1.125rem;">
      ${t('lesson.fillBlank')}<br/>
      <span style="font-size:0.9rem;color:var(--on-surface-variant);font-weight:400;">${ctx}</span>
    </p>`));

    // Sentence
    const sentenceDiv = document.createElement('div');
    sentenceDiv.style.cssText = 'text-align:center;padding:2rem 0;font-family:var(--font-headline);font-size:1.5rem;font-weight:700;';
    const parts = exercise.sentence.split('___');
    const blankVal = selectedOption !== null ? exercise.options[selectedOption] : '___';
    const blankStyle = selectedOption !== null
      ? (checked ? (isCorrect ? 'color:var(--primary);border-bottom:3px solid var(--primary);' : 'color:var(--error);border-bottom:3px solid var(--error);') : 'color:var(--secondary);border-bottom:3px solid var(--secondary);')
      : 'color:var(--outline);border-bottom:3px dashed var(--outline-variant);';
    sentenceDiv.innerHTML = `${parts[0]}<span style="padding:0.25rem 0.5rem;${blankStyle}">${blankVal}</span>${parts[1] || ''}`;
    main.appendChild(sentenceDiv);

    // Options
    const optDiv = document.createElement('div');
    optDiv.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:2rem;';
    exercise.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'word-tile';
      btn.textContent = opt;
      if (selectedOption === i) btn.classList.add('word-tile--placed');
      if (checked) {
        if (i === exercise.correctIndex) btn.style.borderColor = 'var(--primary)';
        if (i === selectedOption && i !== exercise.correctIndex) btn.style.borderColor = 'var(--error)';
      }
      if (!checked) {
        btn.addEventListener('click', () => { selectedOption = i; renderExercise(); });
      }
      optDiv.appendChild(btn);
    });
    main.appendChild(optDiv);
    feedbackBlock(main, { ...exercise, answer: exercise.options[exercise.correctIndex] });
  }

  // ═══════════════════════════════════════════
  // TYPING
  // ═══════════════════════════════════════════
  function renderTyping(main, exercise) {
    const prompt = exercise.prompt[lang] || exercise.prompt.ru;
    main.appendChild(kiraSection(`<p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
      line-height:1.4;font-size:1.125rem;">
      ${t('lesson.typeAnswer')}<br/>
      <span style="font-size:1.5rem;color:var(--secondary);">"${prompt}"</span>
    </p>`));

    const inputWrap = document.createElement('div');
    inputWrap.style.cssText = 'margin-top:2rem;';
    if (!checked) {
      inputWrap.innerHTML = `
        <input id="type-input" type="text" value="${typedAnswer}" autocomplete="off" spellcheck="false"
          placeholder="${t('lesson.typeHint')}"
          style="width:100%;padding:1.25rem;font-size:1.25rem;font-family:var(--font-headline);font-weight:700;
            border:2px solid var(--outline-variant);border-radius:var(--radius-md);background:var(--surface-container-lowest);
            color:var(--on-surface);text-align:center;outline:none;transition:border-color 0.2s;" />
      `;
    } else {
      const color = isCorrect ? 'var(--primary)' : 'var(--error)';
      inputWrap.innerHTML = `
        <div style="width:100%;padding:1.25rem;font-size:1.25rem;font-family:var(--font-headline);font-weight:700;
          border:2px solid ${color};border-radius:var(--radius-md);background:color-mix(in srgb, ${color} 5%, transparent);
          color:${color};text-align:center;">
          ${typedAnswer}
        </div>
      `;
    }
    main.appendChild(inputWrap);

    setTimeout(() => {
      const inp = page.querySelector('#type-input');
      if (inp) {
        inp.focus();
        inp.addEventListener('input', (e) => { typedAnswer = e.target.value; });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && typedAnswer.length > 0) handleCheck(); });
      }
    }, 50);

    feedbackBlock(main, exercise);
  }

  // ═══════════════════════════════════════════
  // MATCH PAIRS
  // ═══════════════════════════════════════════
  function renderMatchPairs(main, exercise) {
    main.appendChild(kiraSection(`<p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
      line-height:1.4;font-size:1.125rem;">
      ${t('lesson.matchPairs')}<br/>
      <span style="font-size:0.85rem;color:var(--on-surface-variant);font-weight:400;">${t('lesson.tapPairs')}</span>
    </p>`));

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:1rem;';

    // Shuffle right side
    const rightOrder = exercise.pairs.map((_, i) => i);
    if (!checked && matchedPairs.length === 0) {
      for (let i = rightOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rightOrder[i], rightOrder[j]] = [rightOrder[j], rightOrder[i]];
      }
      // Store shuffled order
      exercise._rightOrder = rightOrder;
    }
    const order = exercise._rightOrder || rightOrder;

    // Left column (English)
    exercise.pairs.forEach((pair, i) => {
      const isMatched = matchedPairs.includes(i);
      const leftBtn = document.createElement('button');
      leftBtn.className = 'card animate-fade-in-up';
      leftBtn.style.cssText = `padding:1rem;text-align:center;cursor:pointer;opacity:0;animation-delay:${i * 0.06}s;
        border:2px solid ${selectedLeft === i ? 'var(--primary)' : 'transparent'};
        transition:all 0.2s;${isMatched ? 'opacity:0.4;pointer-events:none;background:color-mix(in srgb, var(--primary-container) 15%, transparent);' : ''}`;
      leftBtn.innerHTML = `<span style="font-family:var(--font-headline);font-weight:700;">${pair.en}</span>`;
      if (!isMatched && !checked) {
        leftBtn.addEventListener('click', () => {
          selectedLeft = i;
          if (selectedRight !== null) tryMatch(exercise);
          else renderExercise();
        });
      }
      grid.appendChild(leftBtn);

      // Right column
      const ri = order[i];
      const rPair = exercise.pairs[ri];
      const rMatched = matchedPairs.includes(ri);
      const rightBtn = document.createElement('button');
      rightBtn.className = 'card animate-fade-in-up';
      rightBtn.style.cssText = `padding:1rem;text-align:center;cursor:pointer;opacity:0;animation-delay:${i * 0.06 + 0.03}s;
        border:2px solid ${selectedRight === ri ? 'var(--secondary)' : 'transparent'};
        transition:all 0.2s;${rMatched ? 'opacity:0.4;pointer-events:none;background:color-mix(in srgb, var(--primary-container) 15%, transparent);' : ''}`;
      rightBtn.innerHTML = `<span style="font-weight:500;color:var(--on-surface-variant);">${rPair.local[lang] || rPair.local.ru}</span>`;
      if (!rMatched && !checked) {
        rightBtn.addEventListener('click', () => {
          selectedRight = ri;
          if (selectedLeft !== null) tryMatch(exercise);
          else renderExercise();
        });
      }
      grid.appendChild(rightBtn);
    });

    main.appendChild(grid);

    // Auto-check when all matched
    if (matchedPairs.length === exercise.pairs.length && !checked) {
      checked = true;
      isCorrect = true;
      store.addXP(35);
      store.addGems(5);
      correctCount++;
      setTimeout(() => renderExercise(), 300);
    }
    feedbackBlock(main, exercise);
  }

  function tryMatch(exercise) {
    if (selectedLeft === selectedRight) {
      // Correct match!
      matchedPairs.push(selectedLeft);
    }
    selectedLeft = null;
    selectedRight = null;
    renderExercise();
  }

  // ═══════════════════════════════════════════
  // SENTENCE ORDER
  // ═══════════════════════════════════════════
  function renderSentenceOrder(main, exercise) {
    const ctx = exercise.context[lang] || exercise.context.ru;
    main.appendChild(kiraSection(`<p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
      line-height:1.4;font-size:1.125rem;">
      ${t('lesson.orderSentence')}<br/>
      <span style="font-size:0.9rem;color:var(--on-surface-variant);font-weight:400;">${ctx}</span>
    </p>`));

    // Answer zone (placed words)
    const answerArea = document.createElement('div');
    answerArea.style.cssText = `width:100%;padding:2rem 0;border-bottom:2px dashed color-mix(in srgb, var(--outline-variant) 30%, transparent);
      display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;min-height:4rem;margin-bottom:2rem;`;
    selectedWords.forEach((item, i) => {
      const tile = document.createElement('div');
      tile.className = 'word-tile word-tile--placed';
      tile.textContent = item.word;
      if (!checked) {
        tile.style.cursor = 'pointer';
        tile.addEventListener('click', () => { selectedWords.splice(i, 1); renderExercise(); });
      }
      answerArea.appendChild(tile);
    });
    main.appendChild(answerArea);

    // Shuffled word bank (shuffle once)
    if (!exercise._shuffled) {
      exercise._shuffled = [...exercise.words].sort(() => Math.random() - 0.5);
    }
    const bankDiv = document.createElement('div');
    bankDiv.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;';
    exercise._shuffled.forEach((word, i) => {
      const isUsed = selectedWords.some(w => w.originalIndex === i);
      const tile = document.createElement('button');
      tile.className = `word-tile${isUsed ? ' word-tile--used' : ''}`;
      tile.textContent = word;
      if (!isUsed && !checked) {
        tile.addEventListener('click', () => { selectedWords.push({ word, originalIndex: i }); renderExercise(); });
      }
      bankDiv.appendChild(tile);
    });
    main.appendChild(bankDiv);
    feedbackBlock(main, exercise);
  }

  // ═══════════════════════════════════════════
  // TRUE / FALSE
  // ═══════════════════════════════════════════
  function renderTrueFalse(main, exercise) {
    const stEn = exercise.statement.en;
    const stLocal = exercise.statement[lang] || exercise.statement.ru;
    main.appendChild(kiraSection(`<p style="font-family:var(--font-headline);font-weight:700;color:var(--on-secondary-container);
      line-height:1.4;font-size:1.125rem;">
      ${t('lesson.trueFalse')}
    </p>`));

    // Statement card
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'padding:2rem;text-align:center;margin-top:1rem;';
    card.innerHTML = `
      <p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:800;color:var(--on-surface);margin-bottom:0.5rem;">${stEn}</p>
      <p style="font-size:1.25rem;color:var(--on-surface-variant);">= ${stLocal}</p>
    `;
    main.appendChild(card);

    // Buttons
    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:1rem;margin-top:2rem;justify-content:center;';

    [{ val: true, label: t('lesson.true'), icon: 'check', color: 'var(--primary)' },
     { val: false, label: t('lesson.false'), icon: 'close', color: 'var(--error)' }].forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'card';
      let borderColor = 'transparent';
      if (checked && tfAnswer === opt.val) {
        borderColor = isCorrect ? 'var(--primary)' : 'var(--error)';
      }
      if (checked && opt.val === exercise.isTrue) borderColor = 'var(--primary)';
      btn.style.cssText = `flex:1;max-width:200px;padding:1.5rem;text-align:center;cursor:pointer;
        border:3px solid ${borderColor};transition:all 0.2s;`;
      btn.innerHTML = `
        <span class="material-symbols-outlined filled" style="font-size:2rem;color:${opt.color};">${opt.icon}</span>
        <p style="font-family:var(--font-headline);font-weight:700;margin-top:0.5rem;">${opt.label}</p>
      `;
      if (!checked) {
        btn.addEventListener('click', () => {
          tfAnswer = opt.val;
          checked = true;
          isCorrect = (tfAnswer === exercise.isTrue);
          if (!isCorrect) store.loseHeart();
          if (isCorrect) { store.addXP(20); store.addGems(3); correctCount++; }
          renderExercise();
        });
      }
      btnRow.appendChild(btn);
    });
    main.appendChild(btnRow);
    feedbackBlock(main, exercise);
  }

  // ═══════════════════════════════════════════
  // CHECK HANDLER
  // ═══════════════════════════════════════════
  function handleCheck() {
    const exercise = exercises[currentExercise];

    if (checked) { nextExercise(); return; }

    switch (exercise.type) {
      case 'word-bank':
        if (selectedWords.length === 0) return;
        isCorrect = JSON.stringify(selectedWords.map(w => w.word.toLowerCase())) ===
                    JSON.stringify(exercise.answer.map(w => w.toLowerCase()));
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
        isCorrect = typedAnswer.trim().toLowerCase() === exercise.answer.toLowerCase();
        checked = true;
        if (isCorrect) { store.addXP(35); store.addGems(5); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      case 'sentence-order':
        if (selectedWords.length === 0) return;
        isCorrect = JSON.stringify(selectedWords.map(w => w.word.toLowerCase())) ===
                    JSON.stringify(exercise.answer.map(w => w.toLowerCase()));
        checked = true;
        if (isCorrect) { store.addXP(30); store.addGems(5); correctCount++; } else store.loseHeart();
        renderExercise();
        break;

      // multiple-choice, true-false, match-pairs handle their own check inline
      default:
        break;
    }
  }

  // ═══════════════════════════════════════════
  // FINISH LESSON
  // ═══════════════════════════════════════════
  function finishLesson() {
    store.completeLesson(lesson.id);
    store.addXP(50);
    if (store.state.completedLessons.length === 1) store.unlockAchievement('first_lesson');
    if (store.state.streak.current >= 3) store.unlockAchievement('streak_starter');
    if (store.state.xp.total >= 1000) store.unlockAchievement('dedicated');
    if (store.getLearnedWordCount() >= 50) store.unlockAchievement('vocab_master');

    page.innerHTML = '';
    page.style.cssText = 'min-height:100dvh;display:flex;flex-direction:column;background:var(--surface);';
    const complete = document.createElement('div');
    complete.className = 'animate-bounce-in';
    complete.style.cssText = `flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;`;
    complete.innerHTML = `
      <div style="width:8rem;height:8rem;border-radius:var(--radius-full);background:color-mix(in srgb, var(--primary-container) 20%, transparent);
        display:flex;align-items:center;justify-content:center;margin-bottom:2rem;">
        <span class="material-symbols-outlined filled" style="font-size:4rem;color:var(--primary);">celebration</span>
      </div>
      <h2 style="font-family:var(--font-headline);font-size:2.5rem;font-weight:800;color:var(--on-surface);margin-bottom:0.5rem;">
        ${t('lesson.complete')}
      </h2>
      <p style="font-size:1.25rem;color:var(--primary);font-weight:700;margin-bottom:0.5rem;">
        ${t('lesson.xpEarned', { xp: 50 + (correctCount * 30) })}
      </p>
      <p style="color:var(--on-surface-variant);margin-bottom:3rem;font-style:italic;">
        ${t('goals.kiraQuote')}
      </p>
      <div style="display:flex;gap:1rem;width:100%;max-width:400px;flex-direction:column;">
        <button id="continue-btn" class="btn-primary">
          ${t('goals.continueLearning')}
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
        <button id="home-btn" class="btn-secondary">
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
