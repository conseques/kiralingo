import { t } from '../i18n.js';
import { navigate } from '../router.js';

export function renderPremium() {
  const page = document.createElement('div');
  page.className = 'page relative min-h-screen bg-background text-on-surface font-body selection:bg-primary-container';

  // Back button overlay
  const backBtn = document.createElement('button');
  backBtn.className = 'absolute top-[calc(1.5rem+env(safe-area-inset-top,0rem))] right-6 w-10 h-10 rounded-full bg-surface/50 backdrop-blur flex items-center justify-center text-on-surface z-50 hover:bg-surface transition-colors shadow-sm';
  backBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
  backBtn.onclick = () => window.history.back();
  page.appendChild(backBtn);

  // Aurora Header
  const header = document.createElement('header');
  header.className = 'relative w-full h-[calc(18rem+env(safe-area-inset-top,0rem))] rounded-b-[3rem] overflow-hidden shadow-lg';
  header.innerHTML = `
    <div class="absolute inset-0 aurora-gradient opacity-90"></div>
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 5l2 2-2 2-2-2 2-2zM5 20l2 2-2 2-2-2 2-2zm30 0l2 2-2 2-2-2 2-2zM20 35l2 2-2 2-2-2 2-2z\\' fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')]"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-[env(safe-area-inset-top,0rem)]">
      <div class="w-20 h-20 mt-4 mb-4 bg-surface rounded-full flex items-center justify-center shadow-xl animate-bounce-in">
        <span class="material-symbols-outlined text-4xl text-primary" style="font-variation-settings: 'FILL' 1;">diamond</span>
      </div>
      <h1 class="text-4xl font-extrabold font-headline text-on-primary tracking-tight animate-fade-in-up">Norskly Premium</h1>
      <p class="text-primary-container mt-2 font-label font-bold tracking-wide uppercase text-sm animate-fade-in-up" style="animation-delay: 0.1s">Unlock Fluency Faster</p>
    </div>
  `;
  page.appendChild(header);

  const content = document.createElement('main');
  content.className = 'px-4 sm:px-6 -mt-8 max-w-xl mx-auto relative z-10 pb-24 stagger';

  // Features
  const features = document.createElement('div');
  features.className = 'bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-xl border border-surface-container-high space-y-6 animate-fade-in-up';
  features.style.animationDelay = '0.2s';
  features.innerHTML = `
    <ul class="space-y-5">
      <li class="flex items-center gap-4 group">
        <div class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">favorite</span>
        </div>
        <div>
          <h3 class="font-headline font-bold text-lg text-on-surface">Unlimited Hearts</h3>
          <p class="text-sm font-label text-on-surface-variant">Make as many mistakes as you need.</p>
        </div>
      </li>
      <li class="flex items-center gap-4 group">
        <div class="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">offline_bolt</span>
        </div>
        <div>
          <h3 class="font-headline font-bold text-lg text-on-surface">Offline Mode</h3>
          <p class="text-sm font-label text-on-surface-variant">Download lessons and learn anywhere.</p>
        </div>
      </li>
      <li class="flex items-center gap-4 group">
        <div class="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">record_voice_over</span>
        </div>
        <div>
          <h3 class="font-headline font-bold text-lg text-on-surface">Kira AI Voice Analysis</h3>
          <p class="text-sm font-label text-on-surface-variant">Perfect your Norwegian pronunciation.</p>
        </div>
      </li>
      <li class="flex items-center gap-4 group">
        <div class="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">block</span>
        </div>
        <div>
          <h3 class="font-headline font-bold text-lg text-on-surface">No Ads, Ever</h3>
          <p class="text-sm font-label text-on-surface-variant">Focus completely on learning.</p>
        </div>
      </li>
    </ul>
  `;
  content.appendChild(features);

  // Pricing & CTA
  const ctaSection = document.createElement('div');
  ctaSection.className = 'mt-8 text-center animate-fade-in-up';
  ctaSection.style.animationDelay = '0.3s';
  ctaSection.innerHTML = `
    <p class="text-on-surface-variant font-label text-sm mb-4">First 7 days free, then <span class="font-bold text-on-surface">kr 99.00 / month</span></p>
    <a href="https://buy.stripe.com/test_3cs3eg8xM1abcOQ144" target="_blank" rel="noopener noreferrer" class="block w-full">
      <button class="w-full py-4 px-8 rounded-full bg-primary text-on-primary font-headline font-extrabold text-lg shadow-lg hover:bg-primary-dim active:scale-95 transition-all flex items-center justify-center gap-2">
        Start 7-Day Free Trial
        <span class="material-symbols-outlined text-xl">arrow_forward</span>
      </button>
    </a>
    <button class="mt-6 text-primary font-label text-sm font-bold uppercase tracking-wider hover:underline w-full py-2">
      Restore Purchases
    </button>
  `;
  content.appendChild(ctaSection);

  page.appendChild(content);

  return page;
}
