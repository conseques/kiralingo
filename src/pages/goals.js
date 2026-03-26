import { t } from '../i18n.js';
import { store } from '../store.js';
import { navigate } from '../router.js';
import { renderHeader, renderNav } from '../components/nav.js';

export function renderGoals() {
  const page = document.createElement('div');
  page.className = 'page';

  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.paddingTop = '1.5rem';

  const state = store.state;
  const xpPercent = Math.min(100, Math.round((state.xp.today / state.xp.dailyGoal) * 100));

  // Hero Streak Section
  const hero = document.createElement('section');
  hero.className = 'animate-fade-in-up';
  hero.style.cssText = 'position:relative;margin-bottom:3rem;';
  hero.innerHTML = `
    <div style="position:absolute;top:-3rem;right:-1rem;width:8rem;height:8rem;z-index:10;
      transition:transform 0.3s;" onmouseenter="this.style.transform='scale(1.05)'" onmouseleave="this.style.transform='scale(1)'">
      <img src="/images/kira-goals.webp" alt="Kira" style="width:100%;height:100%;drop-shadow:0 8px 20px rgba(0,0,0,0.15);object-fit:contain;" />
    </div>
    <div class="card" style="text-align:center;position:relative;overflow:hidden;padding:2rem;">
      <div style="position:absolute;top:0;left:0;right:0;height:0.25rem;background:var(--gradient-tertiary);"></div>
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:8rem;height:8rem;margin-bottom:1rem;background:color-mix(in srgb, var(--tertiary-container) 10%, transparent);
          border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;position:relative;">
          <span class="material-symbols-outlined filled" style="font-size:5rem;color:var(--tertiary);">
            local_fire_department
          </span>
          <div style="position:absolute;inset:0;background:color-mix(in srgb, var(--tertiary) 10%, transparent);
            filter:blur(1.5rem);border-radius:var(--radius-full);"></div>
        </div>
        <h2 style="font-family:var(--font-headline);font-weight:800;font-size:2.5rem;letter-spacing:-0.04em;
          color:var(--on-surface);margin-bottom:0.5rem;">
          ${t('goals.streak', { n: state.streak.current || 0 })}
        </h2>
        <p style="color:var(--on-surface-variant);max-width:18rem;margin:0 auto;">
          ${t('goals.streakMsg')}
        </p>
      </div>
    </div>
  `;
  content.appendChild(hero);

  // Daily Progress
  const progress = document.createElement('section');
  progress.className = 'animate-fade-in-up';
  progress.style.cssText = 'margin-bottom:3rem;background:var(--surface-container-low);padding:1.5rem;border-radius:var(--radius-md);animation-delay:0.1s;opacity:0;';
  progress.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:1rem;padding:0 0.5rem;">
      <div>
        <h3 style="font-family:var(--font-headline);font-weight:700;font-size:1.25rem;color:var(--primary);">
          ${t('goals.dailyXP')}
        </h3>
        <p style="color:var(--on-surface-variant);font-size:0.875rem;">
          ${t('goals.almost', { current: state.xp.today, goal: state.xp.dailyGoal })}
        </p>
      </div>
      <div style="color:var(--primary);font-weight:700;font-size:1.5rem;">${xpPercent}%</div>
    </div>
    <div class="progress-bar">
      <div class="progress-bar__fill" style="width:${xpPercent}%;"></div>
    </div>
  `;
  content.appendChild(progress);

  // Achievements
  const achSection = document.createElement('section');
  achSection.className = 'animate-fade-in-up';
  achSection.style.cssText = 'margin-bottom:3rem;animation-delay:0.2s;opacity:0;';

  const achievements = [
    { id: 'early_bird', icon: 'wb_twilight', color: 'secondary', nameKey: 'goals.earlyBird', descKey: 'goals.earlyBirdDesc' },
    { id: 'perfect_week', icon: 'workspace_premium', color: 'tertiary', nameKey: 'goals.perfectWeek', descKey: 'goals.perfectWeekDesc', highlight: true },
    { id: 'vocab_master', icon: 'dictionary', color: 'primary', nameKey: 'goals.vocabMaster', descKey: 'goals.vocabMasterDesc' },
    { id: 'first_lesson', icon: 'school', color: 'secondary', nameKey: 'goals.firstLesson', descKey: 'goals.firstLessonDesc' },
    { id: 'streak_starter', icon: 'local_fire_department', color: 'tertiary', nameKey: 'goals.streakStarter', descKey: 'goals.streakStarterDesc' },
    { id: 'dedicated', icon: 'star', color: 'primary', nameKey: 'goals.dedicated', descKey: 'goals.dedicatedDesc' },
  ];

  achSection.innerHTML = `
    <h3 style="font-family:var(--font-headline);font-weight:700;font-size:1.25rem;margin-bottom:1.5rem;padding:0 0.5rem;">
      ${t('goals.achievements')}
    </h3>
    <div id="achievements-grid" style="display:grid;grid-template-columns:repeat(2, 1fr);gap:1rem;"></div>
  `;

  content.appendChild(achSection);

  // Populate achievements after DOM render
  setTimeout(() => {
    const grid = page.querySelector('#achievements-grid');
    if (!grid) return;

    achievements.forEach((ach, i) => {
      const unlocked = state.achievements.includes(ach.id);
      const card = document.createElement('div');
      card.className = 'card animate-fade-in-up';
      card.style.cssText = `display:flex;flex-direction:column;align-items:center;text-align:center;
        padding:1.5rem;transition:all 0.2s;animation-delay:${0.3 + i * 0.05}s;opacity:0;
        ${ach.highlight && unlocked ? 'ring:2px;border:2px solid color-mix(in srgb, var(--tertiary) 20%, transparent);' : ''}
        ${!unlocked ? 'opacity:0.4 !important;' : ''}`;

      card.innerHTML = `
        <div style="width:4rem;height:4rem;background:color-mix(in srgb, var(--${ach.color}-container) ${unlocked ? '20%' : '10%'}, transparent);
          border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;margin-bottom:1rem;position:relative;">
          <span class="material-symbols-outlined filled" style="font-size:1.75rem;color:var(--${ach.color});">${ach.icon}</span>
          ${ach.highlight && unlocked ? `<div style="position:absolute;top:-0.25rem;right:-0.25rem;width:1.25rem;height:1.25rem;
            background:var(--tertiary);font-size:0.625rem;color:white;display:flex;align-items:center;justify-content:center;
            border-radius:var(--radius-full);font-weight:700;">!</div>` : ''}
        </div>
        <span style="font-family:var(--font-headline);font-weight:700;font-size:0.875rem;">${t(ach.nameKey)}</span>
        <p style="font-size:0.625rem;color:var(--on-surface-variant);margin-top:0.25rem;">${t(ach.descKey)}</p>
      `;

      if (!unlocked) {
        card.addEventListener('mouseenter', () => { card.style.opacity = '0.6'; card.style.transform = 'scale(1.05)'; });
        card.addEventListener('mouseleave', () => { card.style.opacity = '0.4'; card.style.transform = 'scale(1)'; });
      } else {
        card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
        card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
      }

      grid.appendChild(card);
    });
  }, 0);

  // CTA
  const cta = document.createElement('footer');
  cta.className = 'animate-fade-in-up';
  cta.style.cssText = 'margin-top:2rem;animation-delay:0.4s;opacity:0;padding-bottom:2rem;';
  cta.innerHTML = `
    <button id="continue-learning" class="btn-primary" style="box-shadow:0 4px 16px color-mix(in srgb, var(--primary) 20%, transparent);">
      ${t('goals.continueLearning')}
    </button>
    <p style="text-align:center;color:var(--on-surface-variant);font-size:0.875rem;margin-top:1rem;font-weight:500;font-style:italic;">
      ${t('goals.kiraQuote')}
    </p>
  `;
  content.appendChild(cta);

  page.appendChild(content);
  page.appendChild(renderNav());

  setTimeout(() => {
    page.querySelector('#continue-learning')?.addEventListener('click', () => navigate('/lesson'));
  }, 0);

  return page;
}
