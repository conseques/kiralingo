import { t } from '../i18n.js';
import { renderHeader, renderNav } from '../components/nav.js';
import { speak } from '../utils/audio.js';

export function renderKira() {
  const page = document.createElement('div');
  page.className = 'page';

  // Header
  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.cssText = 'padding:1.5rem; display:flex; flex-direction:column; min-height:calc(100vh - 12rem);';

  // Kira Intro
  const intro = document.createElement('div');
  intro.style.cssText = 'display:flex; align-items:center; gap:1rem; margin-bottom:2rem;';
  intro.innerHTML = `
    <div style="width:4rem; height:4rem; border-radius:var(--radius-full); overflow:hidden; border:2px solid var(--primary);">
      <img src="/images/kira-greeting.webp" alt="Kira" style="width:100%; height:100%; object-fit:cover;" />
    </div>
    <div>
      <h2 style="font-family:var(--font-headline); font-size:1.25rem; font-weight:800; color:var(--primary);">Kira AI</h2>
      <p style="font-size:0.875rem; color:var(--on-surface-variant);">${t('kira.introduction') || 'Your personal English companion'}</p>
    </div>
  `;
  content.appendChild(intro);

  // Chat Area
  const chatArea = document.createElement('div');
  chatArea.id = 'kira-chat-area';
  chatArea.style.cssText = 'flex:1; display:flex; flex-direction:column; gap:1rem; overflow-y:auto; padding-bottom:2rem;';
  content.appendChild(chatArea);

  // Suggested Prompts
  const suggestions = document.createElement('div');
  suggestions.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;';
  const prompts = [
    { text: "Explain 'Passive Voice'", icon: 'help_outline' },
    { text: "Practice past tense", icon: 'history' },
    { text: "Give me a challenge", icon: 'bolt' },
    { text: "Tell me a joke", icon: 'sentiment_very_satisfied' },
  ];

  prompts.forEach(p => {
    const btn = document.createElement('button');
    btn.style.cssText = `display:flex; align-items:center; gap:0.5rem; padding:0.5rem 1rem; border-radius:var(--radius-full);
      background:var(--surface-container-high); border:1px solid var(--outline-variant); color:var(--on-surface);
      font-size:0.875rem; cursor:pointer; transition:all 0.2s;`;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:1rem;">${p.icon}</span> ${p.text}`;
    btn.onclick = () => handleSend(p.text);
    suggestions.appendChild(btn);
  });
  content.appendChild(suggestions);

  // Input Area
  const inputGroup = document.createElement('div');
  inputGroup.style.cssText = 'display:flex; gap:0.75rem; align-items:center; background:var(--surface-container-highest); padding:0.75rem; border-radius:var(--radius-lg);';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = t('kira.placeholder') || 'Ask me anything...';
  input.style.cssText = 'flex:1; background:transparent; border:none; outline:none; color:var(--on-surface); font-size:1rem;';
  
  const sendBtn = document.createElement('button');
  sendBtn.style.cssText = 'width:3rem; height:3rem; border-radius:var(--radius-full); background:var(--primary); color:white; display:flex; align-items:center; justify-content:center; cursor:pointer; border:none;';
  sendBtn.innerHTML = '<span class="material-symbols-outlined">send</span>';
  
  inputGroup.appendChild(input);
  inputGroup.appendChild(sendBtn);
  content.appendChild(inputGroup);

  page.appendChild(content);
  page.appendChild(renderNav());

  // Logic
  function addMessage(text, isKira = false) {
    const msg = document.createElement('div');
    msg.className = 'animate-fade-in-up';
    msg.style.cssText = `max-width:85%; padding:1rem; border-radius:var(--radius-md); ${
      isKira 
        ? 'align-self:flex-start; background:var(--secondary-container); color:var(--on-secondary-container); border-bottom-left-radius:0;' 
        : 'align-self:flex-end; background:var(--primary); color:white; border-bottom-right-radius:0;'
    }`;
    msg.textContent = text;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;

    if (isKira) {
      speak(text);
    }
  }

  function handleSend(val) {
    const text = val || input.value.trim();
    if (!text) return;
    
    input.value = '';
    addMessage(text, false);

    // Simulated AI Response
    setTimeout(() => {
      const response = getKiraResponse(text);
      addMessage(response, true);
    }, 1000);
  }

  function getKiraResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes('joke')) return "Why don't scientists trust atoms? Because they make up everything!";
    if (lower.includes('passive voice')) return "The passive voice is used when the action is more important than the person doing it. Example: 'The cake was eaten' (by Kira!).";
    if (lower.includes('challenge')) return "I challenge you to complete 3 lessons in a row without a mistake! Ready?";
    if (lower.includes('past tense')) return "Regular past tense verbs end in -ed, like 'walked' or 'played'. Irregular ones are tricky, like 'go' becomes 'went'.";
    return "That's an interesting question! As your AI assistant, I'm here to help you master English. What topic should we dive into next?";
  }

  sendBtn.onclick = () => handleSend();
  input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

  // initial greeting
  setTimeout(() => {
    addMessage("Hello! I'm Kira, your AI study buddy. How can I help you today?", true);
  }, 500);

  return page;
}
