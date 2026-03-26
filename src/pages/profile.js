import { t, getCurrentLang, setLanguage } from '../i18n.js';
import { store } from '../store.js';
import { forceRefresh } from '../router.js';
import { renderHeader, renderNav } from '../components/nav.js';

export function renderProfile() {
  const page = document.createElement('div');
  page.className = 'page';

  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.paddingTop = '1.5rem';

  const state = store.state;
  const lang = getCurrentLang();

  content.innerHTML = `
    <!-- Profile Header -->
    <section class="animate-fade-in-up" style="text-align:center;margin-bottom:3rem;">
      <div style="width:6rem;height:6rem;border-radius:var(--radius-full);margin:0 auto 1rem;
        background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;
        box-shadow:var(--shadow-lg);">
        <span class="material-symbols-outlined filled" style="font-size:3rem;color:white;">person</span>
      </div>
      <h1 style="font-family:var(--font-headline);font-size:2rem;font-weight:800;margin-bottom:0.25rem;">
        ${state.userName}
      </h1>
      <p style="color:var(--on-surface-variant);">${t('profile.level')} ${store.getLevel()}</p>
    </section>

    <!-- Name -->
    <section class="card animate-fade-in-up" style="margin-bottom:1.5rem;animation-delay:0.05s;opacity:0;">
      <label style="display:block;font-family:var(--font-headline);font-weight:700;font-size:0.875rem;
        color:var(--on-surface-variant);margin-bottom:0.5rem;">${t('profile.name')}</label>
      <input id="user-name" type="text" value="${state.userName}"
        style="width:100%;background:var(--surface-container-low);border:none;border-radius:var(--radius-md);
        padding:0.875rem 1rem;color:var(--on-surface);font-size:1rem;outline:none;" />
    </section>

    <!-- Language Selector -->
    <section class="card animate-fade-in-up" style="margin-bottom:1.5rem;animation-delay:0.1s;opacity:0;">
      <h3 style="font-family:var(--font-headline);font-weight:700;font-size:1rem;margin-bottom:1rem;">
        ${t('profile.language')}
      </h3>
      <div style="display:flex;gap:0.75rem;">
        <button id="lang-ru" class="chip ${lang === 'ru' ? 'chip--active' : 'chip--inactive'}" style="flex:1;">
          🇷🇺 ${t('profile.russian')}
        </button>
        <button id="lang-uk" class="chip ${lang === 'uk' ? 'chip--active' : 'chip--inactive'}" style="flex:1;">
          🇺🇦 ${t('profile.ukrainian')}
        </button>
      </div>
    </section>

    <!-- Difficulty Selector -->
    <section class="card animate-fade-in-up" style="margin-bottom:1.5rem;animation-delay:0.12s;opacity:0;border:1px solid var(--surface-container-highest);">
      <h3 style="font-family:var(--font-headline);font-weight:700;font-size:1rem;margin-bottom:1.25rem;text-align:center;">
        ${t('profile.difficulty')}
      </h3>
      <div class="segmented-control" id="difficulty-control">
        <div class="segmented-indicator" id="difficulty-indicator" style="width: 20%; left: ${['A1','A2','B1','B2','C1'].indexOf(state.difficulty) * 20}%;"></div>
        ${['A1','A2','B1','B2','C1'].map((lvl, index) => `
          <button class="segmented-btn ${state.difficulty === lvl ? 'segmented-btn--active' : ''}" data-level="${lvl}" data-index="${index}">
            ${lvl}
          </button>
        `).join('')}
      </div>
      <p id="difficulty-desc" style="text-align:center;font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.05em;font-weight:800;color:var(--primary);margin-top:0.75rem;opacity:0.8;">
        ${t('difficulty.' + state.difficulty + '.short')}
      </p>
    </section>

    <!-- Stats -->
    <section class="card animate-fade-in-up" style="margin-bottom:1.5rem;animation-delay:0.15s;opacity:0;">
      <h3 style="font-family:var(--font-headline);font-weight:700;font-size:1rem;margin-bottom:1.25rem;">
        ${t('profile.stats')}
      </h3>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">
        <div style="background:var(--surface-container-low);padding:1.25rem;border-radius:var(--radius-md);text-align:center;">
          <p style="font-family:var(--font-headline);font-weight:800;font-size:1.75rem;color:var(--primary);">
            ${store.getLearnedWordCount()}
          </p>
          <p style="font-size:0.75rem;color:var(--on-surface-variant);margin-top:0.25rem;">${t('profile.totalWords')}</p>
        </div>
        <div style="background:var(--surface-container-low);padding:1.25rem;border-radius:var(--radius-md);text-align:center;">
          <p style="font-family:var(--font-headline);font-weight:800;font-size:1.75rem;color:var(--secondary);">
            ${state.xp.total}
          </p>
          <p style="font-size:0.75rem;color:var(--on-surface-variant);margin-top:0.25rem;">${t('profile.totalXP')}</p>
        </div>
        <div style="background:var(--surface-container-low);padding:1.25rem;border-radius:var(--radius-md);text-align:center;">
          <p style="font-family:var(--font-headline);font-weight:800;font-size:1.75rem;color:var(--tertiary);">
            ${state.streak.best} ${t('profile.days')}
          </p>
          <p style="font-size:0.75rem;color:var(--on-surface-variant);margin-top:0.25rem;">${t('profile.bestStreak')}</p>
        </div>
        <div style="background:var(--surface-container-low);padding:1.25rem;border-radius:var(--radius-md);text-align:center;">
          <p style="font-family:var(--font-headline);font-weight:800;font-size:1.75rem;color:var(--primary);">
            ${store.getLevel()}
          </p>
          <p style="font-size:0.75rem;color:var(--on-surface-variant);margin-top:0.25rem;">${t('profile.level')}</p>
        </div>
      </div>
    </section>

    <!-- Reset -->
    <section class="animate-fade-in-up" style="margin-bottom:3rem;animation-delay:0.2s;opacity:0;">
      <button id="reset-btn" style="width:100%;padding:1rem;border-radius:var(--radius-md);
        background:color-mix(in srgb, var(--error-container) 30%, transparent);
        color:var(--on-error-container);font-family:var(--font-headline);font-weight:700;
        transition:all 0.15s;font-size:0.875rem;">
        ${t('profile.reset')}
      </button>
    </section>
  `;

  page.appendChild(content);
  page.appendChild(renderNav());

  // Wire events
  setTimeout(() => {
    // Name input
    const nameInput = page.querySelector('#user-name');
    nameInput?.addEventListener('change', (e) => {
      store.setUserName(e.target.value.trim() || 'Learner');
    });

    // Language buttons
    page.querySelector('#lang-ru')?.addEventListener('click', () => {
      setLanguage('ru');
      forceRefresh();
    });

    page.querySelector('#lang-uk')?.addEventListener('click', () => {
      setLanguage('uk');
      forceRefresh();
    });

    // Difficulty segmented control
    const indicator = page.querySelector('#difficulty-indicator');
    const desc = page.querySelector('#difficulty-desc');

    page.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lvl = btn.getAttribute('data-level');
        const index = parseInt(btn.getAttribute('data-index'), 10);
        
        // Update state
        store.setDifficulty(lvl);

        // Update UI (smooth transition without refresh)
        indicator.style.left = `${index * 20}%`;
        
        page.querySelectorAll('.segmented-btn').forEach(b => b.classList.remove('segmented-btn--active'));
        btn.classList.add('segmented-btn--active');
        
        if (desc) desc.textContent = t('difficulty.' + lvl + '.short');
      });
    });

    // Reset
    page.querySelector('#reset-btn')?.addEventListener('click', () => {
      if (confirm(t('profile.resetConfirm'))) {
        store.resetProgress();
        forceRefresh();
      }
    });
  }, 0);

  return page;
}
