import { t, getCurrentLang, setLanguage } from '../i18n.js';
import { store } from '../store.js';
import { forceRefresh } from '../router.js';
import { renderHeader, renderNav } from '../components/nav.js';

export function renderProfile() {
  const page = document.createElement('div');
  page.className = 'page relative min-h-screen bg-background font-body text-on-surface';

  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'pt-24 px-6 max-w-2xl mx-auto space-y-10 pb-32 stagger';

  const state = store.state;
  const lang = getCurrentLang();

  // Progress logic for Target Lang cards
  const engProgress = Math.min((state.xp.total / 1000) * 100, 100);
  const noProgress = state.targetLang === 'no' ? Math.min((state.xp.total / 1000) * 100, 100) : 0;

  content.innerHTML = `
    <!-- User Profile Hero -->
    <section class="flex flex-col items-center text-center space-y-6 animate-fade-in-up">
      <div class="relative">
        <div class="w-32 h-32 organic-pebble-1 bg-surface-container-highest overflow-hidden p-1 shadow-sm transition-transform active:scale-95 cursor-pointer">
          <img src="/images/kira-avatar.webp" class="w-full h-full object-cover organic-pebble-1 transition-transform duration-500 hover:scale-110" alt="User Avatar" />
        </div>
        <div class="absolute -bottom-2 -right-2 aurora-glow organic-pebble-2 px-4 py-2 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          <span class="font-headline font-bold text-on-primary-container text-sm">${state.streak.current}-Day Streak</span>
        </div>
      </div>
      <div class="w-full max-w-xs transition-all duration-300">
        <input id="user-name" type="text" value="${state.userName}" 
          class="text-3xl font-extrabold font-headline tracking-tight text-on-surface bg-transparent border-none text-center outline-none w-full placeholder-stone-400 focus:ring-0 focus:text-primary transition-colors" 
          placeholder="${t('profile.name')}" />
        <p class="text-on-surface-variant font-label text-sm uppercase tracking-widest mt-1">${t('profile.level')} ${store.getLevel()}</p>
      </div>
    </section>

    <!-- Stats Bento Grid -->
    <section class="grid grid-cols-2 gap-4 animate-fade-in-up" style="animation-delay: 0.1s; opacity: 0;">
      <div class="bg-surface-container-low p-6 rounded-lg flex flex-col items-center justify-center space-y-2 organic-pebble-3 border border-surface-container hover:-translate-y-1 transition-transform">
        <span class="material-symbols-outlined text-primary text-3xl">bolt</span>
        <span class="font-headline text-2xl font-extrabold text-on-surface">${state.xp.total}</span>
        <span class="font-label text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">${t('profile.totalXP')}</span>
      </div>
      <div class="bg-surface-container-low p-6 rounded-lg flex flex-col items-center justify-center space-y-2 organic-pebble-1 border border-surface-container hover:-translate-y-1 transition-transform">
        <span class="material-symbols-outlined text-secondary text-3xl">menu_book</span>
        <span class="font-headline text-2xl font-extrabold text-on-surface">${store.getLearnedWordCount()}</span>
        <span class="font-label text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">${t('profile.totalWords')}</span>
      </div>
    </section>

    <!-- Language Selection -->
    <section class="space-y-4 animate-fade-in-up" style="animation-delay: 0.2s; opacity: 0;">
      <div class="flex justify-between items-end">
        <h2 class="text-xl font-bold font-headline text-on-surface">${t('profile.targetLang')}</h2>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
        <!-- English Card -->
        <div id="target-en" class="flex-shrink-0 w-40 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 ${state.targetLang !== 'no' ? 'bg-surface-container organic-pebble-2 border-2 border-primary-container/30 shadow-sm' : 'bg-surface-container-low organic-pebble-1 opacity-80'}">
          <div class="flex justify-between items-start mb-6">
            <span class="text-2xl drop-shadow-sm">🇬🇧</span>
            ${state.targetLang !== 'no' ? '<span class="text-[10px] font-bold font-label bg-primary-container text-on-primary-container z-10 px-2 py-1 rounded-full uppercase tracking-wider animate-bounce-in">Active</span>' : ''}
          </div>
          <h3 class="font-bold font-headline text-on-surface${state.targetLang === 'no' ? '-variant' : ''}">${t('profile.english')}</h3>
          <div class="mt-4 w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full transition-all duration-1000" style="width: ${engProgress}%"></div>
          </div>
          <span class="text-[10px] font-label font-bold text-on-surface-variant mt-2 block">${Math.round(engProgress)}% Progress</span>
        </div>
        <!-- Norwegian Card -->
        <div id="target-no" class="flex-shrink-0 w-40 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 ${state.targetLang === 'no' ? 'bg-surface-container organic-pebble-3 border-2 border-secondary-container/50 shadow-sm' : 'bg-surface-container-low organic-pebble-2 opacity-80'}">
          <div class="flex justify-between items-start mb-6">
            <span class="text-2xl drop-shadow-sm">🇳🇴</span>
            ${state.targetLang === 'no' ? '<span class="text-[10px] font-bold font-label bg-secondary-container text-on-secondary-container z-10 px-2 py-1 rounded-full uppercase tracking-wider animate-bounce-in">Active</span>' : ''}
          </div>
          <h3 class="font-bold font-headline text-on-surface${state.targetLang !== 'no' ? '-variant' : ''}">${t('profile.norwegian')}</h3>
          <div class="mt-4 w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full bg-secondary rounded-full transition-all duration-1000" style="width: ${noProgress}%"></div>
          </div>
          <span class="text-[10px] font-label font-bold text-on-surface-variant mt-2 block">${Math.round(noProgress)}% Progress</span>
        </div>
      </div>
    </section>

    <!-- Difficulty Level Slider -->
    <section class="space-y-6 animate-fade-in-up" style="animation-delay: 0.3s; opacity: 0;">
      <h2 class="text-xl font-bold font-headline text-on-surface text-center">${t('profile.difficulty')}</h2>
      <div class="relative bg-surface-container-high p-2 rounded-full flex items-center justify-between" id="difficulty-control">
        <div class="absolute inset-y-2 w-[18%] bg-surface-container-lowest organic-pebble-1 shadow-sm transition-all duration-500 ease-spring" id="difficulty-indicator" style="left: ${2 + (['A1','A2','B1','B2','C1'].indexOf(state.difficulty) * 19.5)}%;"></div>
        ${['A1','A2','B1','B2','C1'].map((lvl, index) => `
          <button class="segmented-btn relative z-10 w-1/5 py-3 font-headline font-extrabold text-sm transition-colors duration-300 ${state.difficulty === lvl ? 'text-primary' : 'text-on-surface-variant hover:text-primary-dim'}" data-level="${lvl}" data-index="${index}">
            ${lvl}
          </button>
        `).join('')}
      </div>
      <p id="difficulty-desc" class="text-center text-[11px] font-label text-on-surface-variant px-8 tracking-wider uppercase font-bold">${t('difficulty.' + state.difficulty + '.short')}</p>
    </section>

    <!-- Settings & Account -->
    <section class="bg-surface-container-low rounded-2xl p-2 space-y-1 animate-fade-in-up organic-pebble-2 border border-surface-container" style="animation-delay: 0.4s; opacity: 0;">
      <!-- UI Language Selector -->
      <div class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-surface-container transition-colors cursor-default">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary">
            <span class="material-symbols-outlined">language</span>
          </div>
          <span class="font-bold font-headline text-on-surface">${t('profile.language')}</span>
        </div>
        <div class="flex bg-surface-container-highest rounded-full p-1 shadow-inner">
          <button id="lang-ru" class="px-3 py-1.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 ${lang === 'ru' ? 'bg-surface-container-low shadow-sm text-primary scale-105' : 'text-on-surface-variant hover:text-on-surface'}">РУС</button>
          <button id="lang-uk" class="px-3 py-1.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 ${lang === 'uk' ? 'bg-surface-container-low shadow-sm text-primary scale-105' : 'text-on-surface-variant hover:text-on-surface'}">УКР</button>
        </div>
      </div>
      <button id="reset-btn" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-error-container/20 transition-colors group">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-error-container/30 flex items-center justify-center text-error group-hover:bg-error-container/50 transition-colors">
            <span class="material-symbols-outlined">delete_forever</span>
          </div>
          <span class="font-bold font-headline text-error">${t('profile.reset')}</span>
        </div>
        <span class="material-symbols-outlined text-error opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">chevron_right</span>
      </button>
    </section>
  `;

  page.appendChild(content);
  page.appendChild(renderNav());

  // Restore the dynamic Tailwind config for smooth spring animations
  tailwind.config.theme.extend.transitionTimingFunction = {
    'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };

  // Wire events
  setTimeout(() => {
    const nameInput = page.querySelector('#user-name');
    nameInput?.addEventListener('change', (e) => {
      store.setUserName(e.target.value.trim() || 'Learner');
    });

    page.querySelector('#lang-ru')?.addEventListener('click', () => {
      setLanguage('ru');
      forceRefresh();
    });

    page.querySelector('#lang-uk')?.addEventListener('click', () => {
      setLanguage('uk');
      forceRefresh();
    });

    page.querySelector('#target-en')?.addEventListener('click', () => {
      if (state.targetLang === 'en') return;
      store.setTargetLang('en');
      forceRefresh();
    });

    page.querySelector('#target-no')?.addEventListener('click', () => {
      if (state.targetLang === 'no') return;
      store.setTargetLang('no');
      forceRefresh();
    });

    const indicator = page.querySelector('#difficulty-indicator');
    const desc = page.querySelector('#difficulty-desc');

    page.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lvl = btn.getAttribute('data-level');
        const index = parseInt(btn.getAttribute('data-index'), 10);
        
        if (state.difficulty === lvl) return;
        
        store.setDifficulty(lvl);

        indicator.style.left = `${2 + (index * 19.5)}%`;
        
        page.querySelectorAll('.segmented-btn').forEach(b => {
          b.classList.remove('text-primary');
          b.classList.add('text-on-surface-variant');
        });
        btn.classList.add('text-primary');
        btn.classList.remove('text-on-surface-variant');
        
        if (desc) desc.textContent = t('difficulty.' + lvl + '.short');
      });
    });

    page.querySelector('#reset-btn')?.addEventListener('click', () => {
      if (confirm(t('profile.resetConfirm'))) {
        store.resetProgress();
        forceRefresh();
      }
    });

    // Animate progress bars on load
    setTimeout(() => {
      const bars = page.querySelectorAll('.bg-primary, .bg-secondary');
      bars.forEach(b => {
        const w = b.style.width;
        b.style.width = '0%';
        b.getBoundingClientRect(); // force reflow
        b.style.width = w;
      });
    }, 50);

  }, 0);

  return page;
}
