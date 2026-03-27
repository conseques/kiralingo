import { t, getCurrentLang } from '../i18n.js';
import { store } from '../store.js';
import { VOCABULARY, KIRA_INSIGHTS, getVocabForLevel, LEVELS } from '../data/vocabulary.js';
import { renderHeader, renderNav } from '../components/nav.js';
import { speak } from '../utils/audio.js';
import { navigate } from '../router.js';

export function renderPractice() {
  const page = document.createElement('div');
  page.className = 'page relative min-h-screen bg-background text-on-surface font-body selection:bg-primary-container';
  const lang = getCurrentLang();
  const targetLang = store.state.targetLang === 'no' ? 'no' : 'en';

  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'pt-24 pb-32 px-6 max-w-3xl mx-auto space-y-10 stagger';

  let activeCategory = 'all';
  let activeLevel = 'all';
  let searchTerm = '';

  function getFilteredWords() {
    const baseVocab = activeLevel === 'all' ? VOCABULARY : getVocabForLevel(activeLevel);
    return baseVocab.filter(w => {
      const matchCat = activeCategory === 'all' || w.category === activeCategory;
      const matchSearch = !searchTerm ||
        w[targetLang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w[lang]?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  function render() {
    content.innerHTML = '';

    // Header section
    const header = document.createElement('header');
    header.className = 'space-y-6 animate-fade-in-up';
    header.innerHTML = `
      <div class="space-y-2">
        <h1 class="text-4xl font-extrabold font-headline tracking-tight text-primary">${t('vocab.title')}</h1>
        <p class="text-on-surface-variant font-label text-sm">${t('vocab.subtitle')}</p>
      </div>
      <div class="relative group">
        <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <span class="material-symbols-outlined text-outline">search</span>
        </div>
        <input id="vocab-search" type="text" placeholder="${t('vocab.search')}" value="${searchTerm}"
          class="w-full bg-surface-container-low border-none organic-pebble-1 py-5 pl-14 pr-6 outline-none focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline-variant transition-all shadow-sm" />
      </div>
    `;
    content.appendChild(header);

    // Categories
    const categoriesSection = document.createElement('section');
    categoriesSection.className = 'flex flex-wrap gap-3 animate-fade-in-up';
    categoriesSection.style.animationDelay = '0.05s';
    
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
      const isActive = cat.id === activeCategory;
      chip.className = `px-6 py-2 rounded-full font-label font-bold text-sm transition-all active:scale-95 ${isActive ? 'wood-texture text-on-tertiary-container shadow-sm scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container'}`;
      chip.textContent = t(cat.labelKey);
      chip.addEventListener('click', () => {
        activeCategory = cat.id;
        render();
      });
      categoriesSection.appendChild(chip);
    });

    // Level chips
    [{ id: 'all', label: t('vocab.allLevels') }, ...LEVELS.map(l => ({ id: l, label: l }))].forEach(lvl => {
      const chip = document.createElement('button');
      const isActive = lvl.id === activeLevel;
      chip.className = `px-4 py-1.5 rounded-full font-headline font-extrabold text-xs transition-all active:scale-95 ${isActive ? 'bg-primary text-on-primary shadow-sm scale-105' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'}`;
      chip.textContent = lvl.label;
      chip.addEventListener('click', () => { activeLevel = lvl.id; render(); });
      categoriesSection.appendChild(chip);
    });

    content.appendChild(categoriesSection);

    // Search listener
    const searchInput = header.querySelector('#vocab-search');
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderWordList();
    });
    // Focus
    setTimeout(() => { if (searchTerm) searchInput.focus(); }, 0);

    // Word list container
    const wordListContainer = document.createElement('div');
    wordListContainer.id = 'word-list';
    wordListContainer.className = 'space-y-4 pt-4 pb-20';
    content.appendChild(wordListContainer);

    renderWordList();
  }

  function renderWordList() {
    const container = content.querySelector('#word-list');
    if (!container) return;
    container.innerHTML = '';

    const words = getFilteredWords();
    const shapes = ['organic-pebble-1', 'organic-pebble-2', 'organic-pebble-3'];

    if (words.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 opacity-40 animate-fade-in-up">
          <span class="material-symbols-outlined text-4xl mb-2">landscape</span>
          <p class="font-label shadow-sm">${t('vocab.empty') || 'Keep wandering to find more stones.'}</p>
        </div>
      `;
      return;
    }

    words.forEach((word, i) => {
      const shape = shapes[i % shapes.length];
      const mastery = store.getWordMastery(word.id);
      const isNew = mastery === 0;
      const targetWord = word[targetLang] || word.en;

      const isSpecial = word.icon === 'forest'; // Earthy Wood Variation
      const cardClasses = isSpecial 
        ? `wood-texture p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:brightness-95 transition-all group animate-fade-in-up`
        : `bg-surface-container-low ${shape} p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-surface-container-high transition-colors group animate-fade-in-up border border-surface-container-high`;

      const textPrimary = isSpecial ? 'text-on-tertiary-fixed' : 'text-on-surface';
      const textSecondary = isSpecial ? 'text-on-tertiary-container' : 'text-on-surface-variant';
      const labelColor = isSpecial ? 'text-tertiary' : 'text-outline';
      
      const btnClasses = isSpecial
        ? 'w-12 h-12 rounded-full bg-tertiary-fixed-dim flex items-center justify-center text-on-tertiary-fixed group-hover:bg-tertiary group-hover:text-on-tertiary transition-all active:scale-90 self-end sm:self-auto shrink-0'
        : 'w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all active:scale-90 shadow-sm self-end sm:self-auto shrink-0';

      const card = document.createElement('div');
      card.className = cardClasses;
      card.style.animationDelay = `${i * 0.05}s`;
      card.style.opacity = '0';

      card.innerHTML = `
        <div class="flex flex-col mb-4 sm:mb-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] sm:text-xs font-bold font-label uppercase tracking-widest ${labelColor}">${t('vocab.' + word.category) || word.category}</span>
            ${isNew ? '<span class="text-[9px] font-bold uppercase tracking-wider bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full">New</span>' : ''}
          </div>
          <h4 class="text-2xl font-headline font-bold ${textPrimary} break-words">${targetWord}</h4>
          <p class="${textSecondary} font-label mt-1 text-sm sm:text-base">${word[lang]}</p>
        </div>
        <button class="audio-btn ${btnClasses}" data-word="${targetWord}">
          <span class="material-symbols-outlined transition-transform group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        </button>
      `;

      container.appendChild(card);

      // Kira insight after second word
      if (i === 1) {
        const insightWord = words[1];
        const insight = KIRA_INSIGHTS[insightWord?.id];
        if (insight) {
          const tip = document.createElement('section');
          tip.className = 'relative my-8 animate-fade-in-up';
          tip.style.animationDelay = `${(i + 1) * 0.05}s`;
          tip.style.opacity = '0';
          tip.innerHTML = `
            <div class="aurora-gradient rounded-2xl p-[3px] shadow-xl hover:-translate-y-1 transition-transform">
              <div class="bg-surface-container-lowest/90 backdrop-blur-md rounded-[calc(1rem-2px)] p-6 flex flex-col sm:flex-row items-center gap-6">
                <div class="flex-shrink-0">
                  <div class="w-20 h-20 rounded-full bg-tertiary-container flex items-center justify-center overflow-hidden border-4 border-surface-container-lowest shadow-sm">
                    <img src="/images/kira-avatar.webp" class="w-full h-full object-cover">
                  </div>
                </div>
                <div class="space-y-2 text-center sm:text-left">
                  <h3 class="font-headline font-extrabold text-primary flex items-center justify-center sm:justify-start gap-2">
                    <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                    ${t('vocab.kiraInsight')}
                  </h3>
                  <p class="text-on-surface leading-relaxed text-sm font-italic">${insight[lang]}</p>
                </div>
              </div>
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
        
        // Add active pulse visual
        const icon = btn.querySelector('.material-symbols-outlined');
        btn.classList.add('scale-110');
        icon.classList.add('text-secondary-container');
        setTimeout(() => {
          btn.classList.remove('scale-110');
          icon.classList.remove('text-secondary-container');
        }, 300);
      });
    });
  }

  // Initial render
  render();

  page.appendChild(content);

  // FAB
  const fab = document.createElement('button');
  fab.className = 'fixed bottom-28 right-6 w-14 h-14 rounded-full bg-primary text-on-primary shadow-xl flex items-center justify-center z-40 transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce-in';
  fab.innerHTML = `<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">local_library</span>`;
  fab.addEventListener('click', () => {
    navigate('/lesson');
  });
  page.appendChild(fab);

  page.appendChild(renderNav());
  return page;
}
