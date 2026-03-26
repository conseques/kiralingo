const routes = {};
let currentPage = null;
let appContainer = null;

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return window.location.hash.slice(1) || '/home';
}

export function initRouter(container) {
  appContainer = container;

  const handleRoute = () => {
    const path = getCurrentRoute();
    const renderFn = routes[path] || routes['/home'];

    if (currentPage === path) return;
    currentPage = path;

    if (renderFn && appContainer) {
      // Clear and render new page
      appContainer.innerHTML = '';
      const pageEl = renderFn();
      if (pageEl) {
        appContainer.appendChild(pageEl);
      }

      // Update nav active state
      document.querySelectorAll('.bottom-nav__item').forEach(item => {
        const href = item.getAttribute('data-route');
        item.classList.toggle('active', href === path);
        const icon = item.querySelector('.material-symbols-outlined');
        if (icon) {
          if (href === path) {
            icon.classList.add('filled');
          } else {
            icon.classList.remove('filled');
          }
        }
      });
    }
  };

  window.addEventListener('hashchange', handleRoute);
  // Initial route
  if (!window.location.hash) {
    window.location.hash = '/home';
  } else {
    handleRoute();
  }
}

export function forceRefresh() {
  currentPage = null;
  const path = getCurrentRoute();
  const renderFn = routes[path] || routes['/home'];
  if (renderFn && appContainer) {
    appContainer.innerHTML = '';
    const pageEl = renderFn();
    if (pageEl) appContainer.appendChild(pageEl);
  }
}
