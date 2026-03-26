import { t } from '../i18n.js';
import { store } from '../store.js';
import { renderHeader, renderNav } from '../components/nav.js';

export function renderShop() {
  const page = document.createElement('div');
  page.className = 'page';

  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.paddingTop = '1.5rem';

  const state = store.state;

  const items = [
    { id: 'streak_freeze', price: 200, icon: 'ac_unit', color: 'tertiary' },
    { id: 'health_fill', price: 100, icon: 'favorite', color: 'primary' },
    { id: 'double_xp', price: 500, icon: 'rocket_launch', color: 'secondary' },
  ];

  function render() {
    content.innerHTML = `
      <section class="animate-fade-in-up" style="margin-bottom:2.5rem;text-align:center;">
        <h1 style="font-size:2.5rem;font-weight:800;font-family:var(--font-headline);margin-bottom:0.5rem;">
          ${t('shop.title')}
        </h1>
        <p style="color:var(--on-surface-variant);">${t('shop.subtitle')}</p>
      </section>

      <div style="display:grid;grid-template-columns:1fr;gap:1rem;margin-bottom:3rem;">
        ${items.map((item, i) => {
          const owned = state.inventory.find(inv => inv.id === item.id)?.count || 0;
          return `
            <div class="card animate-fade-in-up" style="display:flex;align-items:center;justify-content:space-between;
              padding:1.25rem;animation-delay:${0.1 + i * 0.05}s;opacity:0;">
              <div style="display:flex;align-items:center;gap:1.25rem;">
                <div style="width:4rem;height:4rem;border-radius:var(--radius-md);
                  background:color-mix(in srgb, var(--${item.color}-container) 15%, transparent);
                  display:flex;align-items:center;justify-content:center;color:var(--${item.color});">
                  <span class="material-symbols-outlined filled" style="font-size:2rem;">${item.icon}</span>
                </div>
                <div style="flex:1;">
                  <h3 style="font-weight:700;font-family:var(--font-headline);font-size:1.125rem;">
                    ${t(`item.${item.id}.name`)}
                  </h3>
                  <p style="font-size:0.75rem;color:var(--on-surface-variant);margin-top:0.25rem;max-width:12rem;">
                    ${t(`item.${item.id}.desc`)}
                  </p>
                  <p style="font-size:0.6875rem;font-weight:700;color:var(--${item.color});margin-top:0.5rem;">
                    ${t('shop.owned', { n: owned })}
                  </p>
                </div>
              </div>
              <button class="buy-btn" data-id="${item.id}" data-price="${item.price}" 
                style="padding:0.75rem 1.25rem;background:var(--surface-container-high);
                border-radius:var(--radius-full);font-weight:800;font-size:0.875rem;
                display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;">
                <span>${item.price}</span>
                <span style="font-size:1rem;">💎</span>
              </button>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Level Progress Goal -->
      <section class="card animate-fade-in-up" style="animation-delay:0.3s;opacity:0;background:var(--surface-container-low);">
         <h3 style="font-family:var(--font-headline);font-weight:700;font-size:1rem;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">
           <span class="material-symbols-outlined" style="color:var(--primary);">trending_up</span>
           Next Level Goal
         </h3>
         <div style="display:flex;justify-content:space-between;font-size:0.75rem;font-weight:700;margin-bottom:0.5rem;">
           <span>Level ${store.getLevel()}</span>
           <span>Level ${store.getLevel() + 1}</span>
         </div>
         <div class="progress-bar">
            <div class="progress-bar__fill" style="width: ${Math.min(100, (state.xp.total % 1000) / 10)}%;"></div>
         </div>
         <p style="text-align:center;font-size:0.6875rem;color:var(--on-surface-variant);margin-top:0.75rem;">
           ${1000 - (state.xp.total % 1000)} XP until next big milestone
         </p>
      </section>
    `;

    // Wire buy buttons
    content.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const price = parseInt(btn.getAttribute('data-price'), 10);
        
        const result = store.buyItem(id, price);
        if (result.success) {
          // Visual feedback
          btn.style.background = 'var(--primary-container)';
          btn.style.color = 'var(--on-primary-container)';
          showToast(t('lesson.correct'));
          
          if (id === 'health_fill') {
            store.restoreHearts();
          }

          setTimeout(() => render(), 500);
        } else {
          showToast(t('shop.insufficient'), 'error');
          btn.classList.add('animate-shake');
          setTimeout(() => btn.classList.remove('animate-shake'), 400);
        }
      });
    });
  }

  function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  render();
  page.appendChild(content);
  page.appendChild(renderNav());
  return page;
}
