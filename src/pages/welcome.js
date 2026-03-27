import { signInWithGoogle, signUpWithEmail, signInWithEmail } from '../services/firebase.js';
import { navigate, forceRefresh } from '../router.js';

export function renderWelcome() {
  const page = document.createElement('div');
  page.className = 'page relative min-h-screen bg-surface-container-lowest text-on-surface font-body flex flex-col items-center justify-center p-6';

  let mode = 'login'; // 'login' | 'signup'

  function renderForm() {
    return `
      <form id="auth-form" class="w-full space-y-4 mb-6 relative z-20">
        ${mode === 'signup' ? `
        <div class="relative animate-fade-in-up" style="animation-duration: 0.3s;">
          <input type="text" id="auth-name" required placeholder="Choose a username"
            class="w-full bg-surface-container-lowest border-2 border-surface-container-high px-6 py-4 rounded-xl font-headline font-bold text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder-outline" />
        </div>
        ` : ''}
        <div class="relative">
          <input type="email" id="auth-email" required placeholder="Email address"
            class="w-full bg-surface-container-lowest border-2 border-surface-container-high px-6 py-4 rounded-xl font-headline font-bold text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder-outline" />
        </div>
        <div class="relative">
          <input type="password" id="auth-password" required placeholder="Password"
            class="w-full bg-surface-container-lowest border-2 border-surface-container-high px-6 py-4 rounded-xl font-headline font-bold text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder-outline" />
        </div>
        <button type="submit" class="w-full bg-primary text-on-primary font-headline font-extrabold py-4 px-6 rounded-xl shadow-[0_4px_16px_rgba(58,103,79,0.3)] hover:-translate-y-1 active:scale-95 transition-all mt-2">
          ${mode === 'login' ? 'Log In' : 'Create Account'}
        </button>
      </form>
      
      <div class="w-full text-center relative z-20 mb-6">
        <button id="toggle-mode" class="text-sm font-label font-bold text-on-surface-variant hover:text-primary transition-colors">
          ${mode === 'login' ? "Don't have an account? <b class='text-primary'>Sign up</b>" : "Already have an account? <b class='text-primary'>Log in</b>"}
        </button>
      </div>

      <div class="relative flex items-center py-2 w-full z-20">
        <div class="flex-grow border-t border-surface-container-high"></div>
        <span class="flex-shrink-0 mx-4 text-outline font-label text-xs uppercase tracking-widest font-bold">Or</span>
        <div class="flex-grow border-t border-surface-container-high"></div>
      </div>

      <div class="w-full space-y-4 mt-6 relative z-20">
        <button type="button" id="btn-google" class="w-full bg-surface-container-lowest outline outline-2 outline-surface-container-high text-on-surface font-headline font-extrabold py-3.5 px-6 rounded-xl shadow-sm hover:outline-primary-container hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" alt="Google Logo" />
          Continue with Google
        </button>
      </div>
    `;
  }

  function mountView() {
    page.innerHTML = `
      <div class="fixed inset-0 pointer-events-none aurora-gradient opacity-10"></div>
      
      <div class="absolute top-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none">
        <div class="absolute -top-[20%] -right-[10%] w-[120%] h-[120%] bg-primary-container blur-[100px] rounded-full opacity-30 animate-pulse"></div>
        <div class="absolute top-[30%] -left-[20%] w-[80%] h-[80%] bg-secondary-container blur-[120px] rounded-full opacity-20 animate-pulse" style="animation-delay: 2s"></div>
      </div>

      <div class="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center animate-fade-in-up mt-8">
        <div class="w-24 h-24 mb-6 bg-surface rounded-3xl organic-pebble-2 flex items-center justify-center shadow-xl border border-surface-container-highest relative animate-bounce-in">
          <span class="material-symbols-outlined text-5xl text-primary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
        </div>
        
        <h1 class="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2 text-center">Norskly</h1>
        <p class="text-on-surface-variant font-label text-base mb-8 text-center max-w-[280px]">Take your languages to the next level.</p>
        
        <div id="auth-container" class="w-full">
          ${renderForm()}
        </div>
      </div>
    `;

    setTimeout(() => {
      // Setup initial bindings
      bindFormEvents();
    }, 0);
  }

  function bindFormEvents() {
    const toggleBtn = page.querySelector('#toggle-mode');
    toggleBtn?.addEventListener('click', () => {
      mode = mode === 'login' ? 'signup' : 'login';
      page.querySelector('#auth-container').innerHTML = renderForm();
      bindFormEvents(); // Rebind after DOM replacement
    });

    const form = page.querySelector('#auth-form');
    const emailInp = page.querySelector('#auth-email');
    const passInp = page.querySelector('#auth-password');
    const googleBtn = page.querySelector('#btn-google');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInp.value;
      const pass = passInp.value;
      const name = mode === 'signup' ? page.querySelector('#auth-name').value : null;
      
      try {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Please wait...';
        btn.disabled = true;
        btn.classList.add('opacity-70');
        
        if (mode === 'signup') {
          await signUpWithEmail(email, pass, name);
          alert('Account created! A verification link has been sent to your email.');
        } else {
          await signInWithEmail(email, pass);
        }
        // Redirect handled by store.js onAuthStateChanged listener
      } catch (err) {
        alert(err.message || 'Authentication failed. Please check your credentials.');
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = mode === 'login' ? 'Log In' : 'Create Account';
        btn.disabled = false;
        btn.classList.remove('opacity-70');
      }
    });

    googleBtn?.addEventListener('click', async () => {
      try {
        await signInWithGoogle();
      } catch (e) {
        alert('Google Sign-In failed or is not available. Please use email instead.');
      }
    });
  }

  mountView();
  return page;
}
