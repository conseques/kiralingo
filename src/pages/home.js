import { t } from '../i18n.js';
import { store } from '../store.js';
import { navigate } from '../router.js';
import { getActiveUnits, getNextLesson } from '../data/lessons.js';
import { renderHeader, renderNav } from '../components/nav.js';

export function renderHome() {
  const page = document.createElement('div');
  page.className = 'page';

  const state = store.state;
  const UNITS = getActiveUnits(store);
  const next = getNextLesson(store);
  const activeUnitIndex = next ? next.unitIndex : UNITS.length;
  const unitName = next ? t(next.unit.nameKey) : '';

  // Header
  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.paddingTop = '1.5rem';

  // Kira Guidance
  const guidance = document.createElement('div');
  guidance.className = 'animate-fade-in-up';
  guidance.style.cssText = 'display:flex; align-items:flex-end; margin-bottom:3rem; position:relative;';
  guidance.innerHTML = `
    <div style="position:relative; z-index:10; width:33%; flex-shrink:0; filter:drop-shadow(0 10px 15px rgba(0,0,0,0.1));">
      <img src="/images/kira-greeting.webp" alt="Kira"
        style="border-radius:var(--radius-md); object-fit:cover; aspect-ratio:3/4; width:100%;" />
    </div>
    <div style="width:67%; padding-left:1rem; margin-bottom:1rem;">
      <div style="background:color-mix(in srgb, var(--secondary-container) 80%, transparent);
        backdrop-filter:blur(8px); padding:1.25rem; border-radius:var(--radius-md);
        border-bottom-left-radius:0; box-shadow:var(--shadow-sm);">
        <p style="color:var(--on-secondary-container); font-weight:500; line-height:1.6;">
          "${t('home.greeting', { name: state.userName })} <strong style="text-decoration:underline;">${unitName}</strong>!"
        </p>
      </div>
    </div>
  `;
  content.appendChild(guidance);

  // Level badge
  const levelBadge = document.createElement('div');
  levelBadge.style.cssText = 'display:flex;justify-content:center;margin-bottom:2rem;';
  levelBadge.innerHTML = `
    <div style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1.25rem;
      background:var(--primary-container);border-radius:var(--radius-full);box-shadow:var(--shadow-sm);">
      <span class="material-symbols-outlined filled" style="font-size:1.25rem;color:var(--primary);">school</span>
      <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-primary-container);font-size:0.875rem;">
        ${state.difficulty} — ${t('difficulty.' + state.difficulty + '.short')}
      </span>
    </div>
  `;
  content.appendChild(levelBadge);

  // Learning Path
  const section = document.createElement('section');
  section.style.cssText = 'position:relative; min-height:800px; display:flex; flex-direction:column; align-items:center; gap:5rem; padding:2.5rem 0;';

  // SVG line
  section.innerHTML = `
    <svg style="position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:0;pointer-events:none;opacity:0.1;"
      width="128" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none">
      <path d="M50,0 Q80,100 20,200 T50,400 T80,600 T20,800 T50,1000"
        fill="none" stroke="currentColor" stroke-dasharray="12 12" stroke-width="8"/>
    </svg>
  `;

  const offsets = [0, 3, -4, 2, -2.5, 0];
  const jumpableLevels = ['B1', 'B2', 'C1'];
  const isJumpable = jumpableLevels.includes(state.difficulty);

  UNITS.forEach((unit, i) => {
    const isCompleted = i < activeUnitIndex;
    const isActive = i === activeUnitIndex;
    const isLocked = i > activeUnitIndex && !isJumpable; // Allow non-sequential for B1, B2, C1
    const isMilestone = i === UNITS.length - 1 && isLocked;

    const node = document.createElement('div');
    node.className = 'path-node animate-fade-in-up';
    node.style.cssText = `transform: translateX(${offsets[i] || 0}rem); animation-delay: ${i * 0.08}s; opacity: 0;`;

    if (isJumpable) {
       node.style.cursor = 'pointer';
       node.addEventListener('click', () => {
         store.setSelectedUnit(unit.id);
         navigate('/lesson');
       });
    }

    if (isCompleted && i === 0 && !isJumpable) {
      // Crowned node
      node.innerHTML = `
        <div style="position:relative;">
          <div class="path-node__circle" style="width:6rem;height:6rem;background:var(--primary-container);
            box-shadow:var(--shadow-lg);">
            <span class="material-symbols-outlined filled" style="font-size:2.5rem;color:var(--on-primary-container);">emoji_events</span>
          </div>
          <div style="position:absolute;top:-1rem;right:-0.5rem;background:var(--tertiary);color:white;
            font-size:0.625rem;font-weight:700;padding:0.25rem 0.5rem;border-radius:var(--radius-full);
            box-shadow:var(--shadow-sm);ring:2px solid white;">${t('home.crowned')}</div>
        </div>
        <span class="path-node__label" style="color:var(--on-surface);">${t(unit.nameKey)}</span>
      `;
    } else if (isCompleted) {
      node.innerHTML = `
        <div class="path-node__circle" style="width:5rem;height:5rem;background:color-mix(in srgb, var(--primary-container) 60%, transparent);
          box-shadow:var(--shadow-md);">
          <span class="material-symbols-outlined filled" style="font-size:1.75rem;color:var(--primary);">check_circle</span>
        </div>
        <span class="path-node__label" style="color:var(--on-surface);">${t(unit.nameKey)}</span>
      `;
    } else if (isActive) {
      node.innerHTML = `
        <div style="position:relative;">
          <div style="position:absolute;inset:0;border-radius:var(--radius-full);border:4px solid color-mix(in srgb, var(--primary) 20%, transparent);transform:scale(1.25);"></div>
          <div style="position:absolute;inset:0;border-radius:var(--radius-full);border-top:4px solid var(--primary);transform:scale(1.25) rotate(-45deg);"></div>
          <button class="path-node__circle animate-pulse" id="start-lesson-btn"
            style="width:7rem;height:7rem;background:var(--gradient-primary);box-shadow:var(--shadow-xl);cursor:pointer;">
            <span class="material-symbols-outlined filled" style="font-size:3rem;color:white;">play_arrow</span>
          </button>
          <div style="position:absolute;bottom:-2.5rem;left:50%;transform:translateX(-50%);
            background:var(--surface-container-highest);padding:0.375rem 1rem;border-radius:var(--radius-full);
            box-shadow:var(--shadow-sm);">
            <span style="font-size:0.75rem;font-weight:700;white-space:nowrap;">${t('home.startLesson')}</span>
          </div>
        </div>
        <span class="path-node__label" style="margin-top:3.5rem;color:var(--primary);font-size:1.25rem;font-weight:800;">${t(unit.nameKey)}</span>
      `;
    } else if (isMilestone) {
      node.innerHTML = `
        <div style="width:8rem;height:8rem;border-radius:var(--radius-md);transform:rotate(12deg);
          background:var(--surface-container-low);display:flex;align-items:center;justify-content:center;
          border:4px dashed var(--outline-variant);opacity:0.4;">
          <span class="material-symbols-outlined" style="font-size:3rem;color:var(--outline-variant);">card_giftcard</span>
        </div>
        <span class="path-node__label" style="margin-top:1rem;color:var(--outline-variant);">${t('home.milestone')}</span>
      `;
    } else {
      node.innerHTML = `
        <div class="path-node__circle" style="width:5rem;height:5rem;background:var(--surface-container-highest);opacity:0.6;">
          <span class="material-symbols-outlined" style="font-size:1.75rem;color:var(--outline);">lock</span>
        </div>
        <span class="path-node__label" style="color:var(--outline);font-weight:500;">${t(unit.nameKey)}</span>
      `;
    }

    section.appendChild(node);
  });

  content.appendChild(section);
  page.appendChild(content);

  // FAB
  const fab = document.createElement('button');
  fab.style.cssText = `position:fixed;bottom:6rem;right:1.5rem;width:4rem;height:4rem;border-radius:var(--radius-full);
    background:var(--tertiary-container);box-shadow:var(--shadow-xl);display:flex;align-items:center;justify-content:center;
    z-index:40;transition:transform 0.2s;`;
  fab.innerHTML = `<span class="material-symbols-outlined filled" style="font-size:1.75rem;color:var(--on-tertiary-container);">bolt</span>`;
  fab.addEventListener('click', () => navigate('/practice'));
  fab.addEventListener('mouseenter', () => fab.style.transform = 'scale(1.1)');
  fab.addEventListener('mouseleave', () => fab.style.transform = 'scale(1)');
  page.appendChild(fab);

  // Bottom nav
  page.appendChild(renderNav());

  // Wire up
  setTimeout(() => {
    const btn = page.querySelector('#start-lesson-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        store.clearSelectedUnit(); // Clear any specific selection to use default next
        navigate('/lesson');
      });
    }
  }, 0);

  return page;
}
