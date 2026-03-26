import { registerRoute, initRouter } from './router.js';
import { renderHome } from './pages/home.js';
import { renderPractice } from './pages/practice.js';
import { renderLesson } from './pages/lesson.js';
import { renderGoals } from './pages/goals.js';
import { renderProfile } from './pages/profile.js';
import { renderShop } from './pages/shop.js';
import { renderKira } from './pages/kira.js';
import { renderReading } from './pages/reading.js';

// Register routes
registerRoute('/home', renderHome);
registerRoute('/practice', renderPractice);
registerRoute('/lesson', renderLesson);
registerRoute('/goals', renderGoals);
registerRoute('/kira', renderKira);
registerRoute('/reading', renderReading);
registerRoute('/shop', renderShop);
registerRoute('/profile', renderProfile);

// Initialize
const app = document.getElementById('app');
initRouter(app);
