import { t } from '../i18n.js';
import { navigate, getCurrentRoute } from '../router.js';
import { store } from '../store.js';

export function renderNav() {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  const items = [
    { route: '/home', icon: 'home', labelKey: 'nav.home' },
    { route: '/practice', icon: 'auto_stories', labelKey: 'nav.practice' },
    { route: '/goals', icon: 'local_fire_department', labelKey: 'nav.goals' },
    { route: '/shop', icon: 'shopping_bag', labelKey: 'nav.shop' },
    { route: '/profile', icon: 'person', labelKey: 'nav.profile' },
  ];

  const current = getCurrentRoute();

  items.forEach(item => {
    const a = document.createElement('a');
    a.className = `bottom-nav__item${current === item.route ? ' active' : ''}`;
    a.setAttribute('data-route', item.route);
    a.href = `#${item.route}`;

    const icon = document.createElement('span');
    icon.className = `material-symbols-outlined${current === item.route ? ' filled' : ''}`;
    icon.textContent = item.icon;

    const label = document.createElement('span');
    label.className = 'bottom-nav__label';
    label.textContent = t(item.labelKey);

    a.appendChild(icon);
    a.appendChild(label);

    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(item.route);
    });

    nav.appendChild(a);
  });

  return nav;
}

export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'app-header';

  const state = store.state;

  header.innerHTML = `
    <div class="app-header__brand">
      <div class="app-header__avatar">
        <img src="/images/kira-avatar.webp" alt="Kira" />
      </div>
      <span class="app-header__title">Kiralingo</span>
    </div>
    <div class="app-header__stats">
      <span>${state.streak.current} 🔥</span>
      <span>${state.gems} 💎</span>
      <span>${state.hearts} ❤️</span>
    </div>
  `;

  return header;
}
