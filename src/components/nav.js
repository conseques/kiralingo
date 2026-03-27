import { t } from '../i18n.js';
import { navigate, getCurrentRoute } from '../router.js';
import { store } from '../store.js';

export function renderNav() {
  const nav = document.createElement('nav');
  nav.className = 'fixed bottom-0 left-0 w-full flex justify-between overflow-x-auto no-scrollbar items-center px-4 pb-8 pt-4 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-2xl z-50 rounded-t-[2.5rem] shadow-[0_-12px_40px_rgba(46,52,50,0.06)]';

  const items = [
    { route: '/home', icon: 'home', labelKey: 'nav.home' },
    { route: '/practice', icon: 'auto_stories', labelKey: 'nav.practice' },
    { route: '/reading', icon: 'menu_book', labelKey: 'nav.reading' },
    { route: '/kira', icon: 'smart_toy', labelKey: 'nav.kira' },
    { route: '/goals', icon: 'local_fire_department', labelKey: 'nav.goals' },
    { route: '/shop', icon: 'shopping_bag', labelKey: 'nav.shop' },
    { route: '/profile', icon: 'person', labelKey: 'nav.profile' },
  ];

  const current = getCurrentRoute();

  items.forEach(item => {
    const isActive = current === item.route;
    const a = document.createElement('a');
    a.href = `#${item.route}`;
    a.setAttribute('data-route', item.route);
    
    // Construct animated Tailwind classes
    const baseClasses = 'flex flex-col items-center justify-center px-4 py-2 transition-all duration-300 ease-spring active:scale-90 min-w-[72px] shrink-0';
    const activeClasses = 'bg-emerald-100/50 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100 rounded-[45%_55%_50%_50%] scale-105';
    const inactiveClasses = 'text-stone-400 dark:text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-300 hover:-translate-y-1';
    
    a.className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

    a.innerHTML = `
      <span class="material-symbols-outlined transition-transform duration-300 ${isActive ? 'scale-110' : ''}" style="font-variation-settings: 'FILL' ${isActive ? '1' : '0'};">
        ${item.icon}
      </span>
      <span class="font-['Manrope'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}">
        ${t(item.labelKey)}
      </span>
    `;

    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(item.route);
    });

    nav.appendChild(a);
  });

  return nav;
}

export function renderHeader() {
  const header = document.createElement('nav');
  header.className = 'fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xl transition-all duration-300';

  const state = store.state;

  header.innerHTML = `
    <div class="flex items-center gap-3 active:scale-95 transition-transform cursor-pointer" onclick="window.location.hash='#/profile'">
      <div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary-container shadow-sm">
        <img src="/images/kira-avatar.webp" alt="Kira" class="w-full h-full object-cover" />
      </div>
      <span class="text-emerald-900 dark:text-emerald-100 font-extrabold tracking-tighter text-lg font-headline">Norskly</span>
    </div>
    <div class="flex bg-surface-container-high px-4 py-1.5 rounded-full items-center gap-3 shadow-sm text-sm font-bold font-headline text-stone-700 dark:text-stone-200">
      <span class="flex items-center gap-1 hover:scale-110 transition-transform cursor-default"><span class="material-symbols-outlined text-orange-500 text-lg" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>${state.streak.current}</span>
      <span class="flex items-center gap-1 hover:scale-110 transition-transform cursor-default"><span class="text-blue-400 text-lg">💎</span>${state.gems}</span>
      <span class="flex items-center gap-1 hover:scale-110 transition-transform cursor-default"><span class="text-red-500 text-lg">❤️</span>${state.hearts}</span>
    </div>
  `;

  return header;
}
