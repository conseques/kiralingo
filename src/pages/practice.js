import { t, getCurrentLang } from '../i18n.js';
import { store } from '../store.js';
import { VOCABULARY, KIRA_INSIGHTS, getVocabForLevel, LEVELS } from '../data/vocabulary.js';
import { renderHeader, renderNav } from '../components/nav.js';
import { speak } from '../utils/audio.js';

export function renderPractice() {
  const page = document.createElement('div');
  page.className = 'page';
  const lang = getCurrentLang();

  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.paddingTop = '1.5rem';

  let activeCategory = 'all';
  let activeLevel = 'all';
  let searchTerm = '';

  function getFilteredWords() {
    const baseVocab = activeLevel === 'all' ? VOCABULARY : getVocabForLevel(activeLevel);
    return baseVocab.filter(w => {
      const matchCat = activeCategory === 'all' || w.category === activeCategory;
      const matchSearch = !searchTerm ||
        w.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w[lang]?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  function render() {
    content.innerHTML = '';

    // Header section
    const header = document.createElement('section');
    header.className = 'animate-fade-in-up';
    header.style.cssText = 'margin-bottom:2.5rem; position:relative;';
    header.innerHTML = `
      <div style="position:absolute;top:-1.5rem;right:-1rem;opacity:0.1;pointer-events:none;">
        <span class="material-symbols-outlined" style="font-size:7.5rem;color:var(--primary);">menu_book</span>
      </div>
      <h1 style="font-size:3rem;font-weight:800;letter-spacing:-0.04em;color:var(--on-surface);margin-bottom:0.5rem;font-family:var(--font-headline);">
        ${t('vocab.title')}
      </h1>
      <p style="color:var(--on-surface-variant);font-size:1.125rem;max-width:24rem;line-height:1.6;">
        ${t('vocab.subtitle')}
      </p>
    `;
    content.appendChild(header);

    // Search & Filters
    const filters = document.createElement('div');
    filters.style.cssText = 'margin-bottom:3rem;';
    filters.innerHTML = `
      <div style="position:relative;margin-bottom:1.5rem;">
        <span class="material-symbols-outlined" style="position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);color:var(--on-surface-variant);">search</span>
        <input id="vocab-search" type="text" placeholder="${t('vocab.search')}"
          style="width:100%;background:var(--surface-container-low);border:none;border-radius:var(--radius-full);
          padding:1.25rem 1.5rem 1.25rem 3.5rem;color:var(--on-surface);font-size:1rem;outline:none;
          transition:box-shadow 0.2s;" value="${searchTerm}" />
      </div>
      <div id="chip-container" style="display:flex;gap:0.75rem;overflow-x:auto;padding-bottom:0.5rem;" class="no-scrollbar"></div>
    `;
    content.appendChild(filters);

    // Chips
    const chipContainer = filters.querySelector('#chip-container');
    const categories = [
      { id: 'all', labelKey: 'vocab.allWords' },
      { id: 'nouns', labelKey: 'vocab.nouns' },
      { id: 'verbs', labelKey: 'vocab.verbs' },
      { id: 'adjectives', labelKey: 'vocab.adjectives' },
      { id: 'phrases', labelKey: 'vocab.phrases' },
      { id: 'numbers', labelKey: 'vocab.numbers' },
    ];

    categories.forEach(cat => {
      const chip = document.createElement('button');
      chip.className = `chip ${cat.id === activeCategory ? 'chip--active' : 'chip--inactive'}`;
      chip.textContent = t(cat.labelKey);
      chip.addEventListener('click', () => {
        activeCategory = cat.id;
        render();
      });
      chipContainer.appendChild(chip);
    });

    // Level chips
    const levelChipsWrap = document.createElement('div');
    levelChipsWrap.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;padding-top:0.75rem;';
    levelChipsWrap.className = 'no-scrollbar';
    [{ id: 'all', label: t('vocab.allLevels') }, ...LEVELS.map(l => ({ id: l, label: l }))].forEach(lvl => {
      const chip = document.createElement('button');
      chip.className = `chip ${lvl.id === activeLevel ? 'chip--active' : 'chip--inactive'}`;
      chip.style.cssText = 'padding:0.5rem 1rem;font-size:0.8125rem;font-weight:700;';
      chip.textContent = lvl.label;
      chip.addEventListener('click', () => { activeLevel = lvl.id; render(); });
      levelChipsWrap.appendChild(chip);
    });
    filters.querySelector('#chip-container').after(levelChipsWrap);

    // Search listener
    const searchInput = filters.querySelector('#vocab-search');
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderWordList();
    });
    // Focus
    setTimeout(() => {
      if (searchTerm) searchInput.focus();
    }, 0);

    // Word list container
    const wordListContainer = document.createElement('div');
    wordListContainer.id = 'word-list';
    content.appendChild(wordListContainer);

    renderWordList();
  }

  function renderWordList() {
    const container = content.querySelector('#word-list');
    if (!container) return;
    container.innerHTML = '';

    const words = getFilteredWords();
    const colors = ['primary', 'secondary', 'tertiary'];

    words.forEach((word, i) => {
      const colorIdx = i % 3;
      const color = colors[colorIdx];
      const mastery = store.getWordMastery(word.id);
      const isNew = mastery === 0;

      const card = document.createElement('div');
      card.className = 'card animate-fade-in-up';
      card.style.cssText = `display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;
        animation-delay:${i * 0.03}s;opacity:0;`;

      card.innerHTML = `
        <div style="display:flex;align-items:center;gap:1.5rem;">
          <div style="width:3rem;height:3rem;border-radius:var(--radius-lg);
            background:color-mix(in srgb, var(--${color}-container) 10%, transparent);
            display:flex;align-items:center;justify-content:center;color:var(--${color});">
            <span class="material-symbols-outlined">${word.icon}</span>
          </div>
          <div>
            <h3 style="font-size:1.25rem;font-weight:700;font-family:var(--font-headline);
              transition:color 0.2s;">${word.en}</h3>
            <p style="color:var(--on-surface-variant);">${word[lang]}</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:1rem;">
          ${isNew ? `<span style="padding:0.25rem 0.75rem;background:color-mix(in srgb, var(--tertiary-container) 20%, transparent);
            color:var(--on-tertiary-container);font-size:0.75rem;font-weight:700;border-radius:var(--radius-full);">
            ${t('vocab.new')}</span>` : ''}
          <button class="audio-btn" data-word="${word.en}" style="width:2.5rem;height:2.5rem;border-radius:var(--radius-full);
            background:var(--surface-container-high);display:flex;align-items:center;justify-content:center;
            color:var(--secondary);transition:all 0.15s;">
            <span class="material-symbols-outlined">volume_up</span>
          </button>
        </div>
      `;

      // Hover effect
      card.addEventListener('mouseenter', () => {
        const h3 = card.querySelector('h3');
        if (h3) h3.style.color = `var(--${color})`;
      });
      card.addEventListener('mouseleave', () => {
        const h3 = card.querySelector('h3');
        if (h3) h3.style.color = 'inherit';
      });

      container.appendChild(card);

      // Kira insight after second word
      if (i === 1) {
        const insightWord = words[1];
        const insight = KIRA_INSIGHTS[insightWord?.id];
        if (insight) {
          const tip = document.createElement('div');
          tip.className = 'glass animate-fade-in-up';
          tip.style.cssText = `padding:2rem;border-radius:var(--radius-md);margin:1.5rem 0;
            border-left:4px solid var(--secondary);display:flex;gap:1.5rem;align-items:flex-start;
            animation-delay:0.15s;opacity:0;`;
          tip.innerHTML = `
            <div style="width:4rem;height:4rem;border-radius:var(--radius-full);flex-shrink:0;
              background:rgba(255,255,255,0.2);padding:0.25rem;overflow:hidden;">
              <img src="/images/kira-avatar.webp" alt="Kira" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-full);" />
            </div>
            <div>
              <h4 style="font-weight:700;color:var(--secondary);font-size:1.125rem;font-family:var(--font-headline);margin-bottom:0.25rem;">
                ${t('vocab.kiraInsight')}
              </h4>
              <p style="color:var(--on-surface);line-height:1.6;">${insight[lang]}</p>
            </div>
          `;
          container.appendChild(tip);
        }
      }
    });

    // Audio buttons
    container.querySelectorAll('.audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wordText = btn.getAttribute('data-word');
        speak(wordText);
        btn.style.background = 'var(--secondary-container)';
        btn.querySelector('.material-symbols-outlined').style.color = 'var(--on-secondary-container)';
        setTimeout(() => {
          btn.style.background = 'var(--surface-container-high)';
          btn.querySelector('.material-symbols-outlined').style.color = 'var(--secondary)';
        }, 1000);
      });
    });
  }

  render();
  content.style.paddingBottom = '3rem';
  page.appendChild(content);

  // FAB
  const fab = document.createElement('button');
  fab.style.cssText = `position:fixed;bottom:6rem;right:1.5rem;width:4rem;height:4rem;border-radius:var(--radius-full);
    background:var(--gradient-primary);color:var(--on-primary);box-shadow:var(--shadow-xl);
    display:flex;align-items:center;justify-content:center;z-index:40;transition:transform 0.2s;`;
  fab.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.75rem;">play_arrow</span>`;
  fab.addEventListener('click', () => {
    import('../router.js').then(r => r.navigate('/lesson'));
  });
  fab.addEventListener('mouseenter', () => fab.style.transform = 'scale(1.1)');
  fab.addEventListener('mouseleave', () => fab.style.transform = 'scale(1)');
  page.appendChild(fab);

  page.appendChild(renderNav());
  return page;
}
