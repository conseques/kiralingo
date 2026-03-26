import { t } from '../i18n.js';
import { renderHeader, renderNav } from '../components/nav.js';
import { speak } from '../utils/audio.js';
import { store } from '../store.js';
import { getKiraAIResponse } from '../utils/gemini.js';

// Simple markdown parser for bold and code
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}

export function renderKira() {
  const page = document.createElement('div');
  page.className = 'page';

  // Header
  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.cssText = 'padding:1.5rem; display:flex; flex-direction:column; min-height:calc(100vh - 12rem);';

  // Kira Intro & Header
  const introContainer = document.createElement('div');
  introContainer.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;';
  
  const intro = document.createElement('div');
  intro.style.cssText = 'display:flex; align-items:center; gap:1rem;';
  intro.innerHTML = `
    <div style="width:4rem; height:4rem; border-radius:var(--radius-full); overflow:hidden; border:2px solid var(--primary);">
      <img src="/images/kira-greeting.webp" alt="Kira" style="width:100%; height:100%; object-fit:cover;" />
    </div>
    <div>
      <h2 style="font-family:var(--font-headline); font-size:1.25rem; font-weight:800; color:var(--primary);">Kira AI</h2>
      <p style="font-size:0.875rem; color:var(--on-surface-variant);">${t('kira.introduction') || 'Your personal English companion'}</p>
    </div>
  `;
  introContainer.appendChild(intro);

  const clearBtn = document.createElement('button');
  clearBtn.className = 'material-symbols-outlined';
  clearBtn.style.cssText = 'color:var(--on-surface-variant); cursor:pointer; background:none; border:none;';
  clearBtn.textContent = 'delete_sweep';
  clearBtn.onclick = () => {
    store.clearKiraHistory();
    chatArea.innerHTML = '';
    addMessage("History cleared! ✨ How can I help you today?", true, false);
  };
  introContainer.appendChild(clearBtn);

  content.appendChild(introContainer);

  // Chat Area
  const chatArea = document.createElement('div');
  chatArea.id = 'kira-chat-area';
  chatArea.style.cssText = 'flex:1; display:flex; flex-direction:column; gap:1rem; overflow-y:auto; padding-bottom:2rem; max-height:50vh;';
  content.appendChild(chatArea);

  // Logic: Add Message
  function addMessage(text, isKira = false, save = true) {
    const msg = document.createElement('div');
    msg.className = 'animate-fade-in-up';
    msg.style.cssText = `max-width:85%; padding:1rem; border-radius:var(--radius-md); font-size:0.95rem; line-height:1.5; ${
      isKira 
        ? 'align-self:flex-start; background:var(--secondary-container); color:var(--on-secondary-container); border-bottom-left-radius:0;' 
        : 'align-self:flex-end; background:var(--primary); color:white; border-bottom-right-radius:0;'
    }`;
    
    if (isKira) {
      msg.innerHTML = parseMarkdown(text);
      // Only speak new messages, not history load
      if (save) speak(text);
    } else {
      msg.textContent = text;
    }

    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // Load History
  const history = store.state.kiraHistory || [];
  if (history.length > 0) {
    history.forEach(h => {
      addMessage(h.parts[0].text, h.role === 'model', false);
    });
  } else {
    addMessage("Hello! I'm Kira, your AI study buddy. Ask me anything about English! ✨", true, false);
  }

  // Suggested Prompts
  const suggestions = document.createElement('div');
  suggestions.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;';
  const prompts = [
    { text: "Check my grammar", icon: 'spellcheck' },
    { text: "Explain 'Passive Voice'", icon: 'help_outline' },
    { text: "Practice past tense", icon: 'history' },
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
  sendBtn.style.cssText = 'width:3rem; height:3rem; border-radius:var(--radius-full); background:var(--primary); color:white; display:flex; align-items:center; justify-content:center; cursor:pointer; border:none; transition:opacity 0.2s;';
  sendBtn.innerHTML = '<span class="material-symbols-outlined">send</span>';
  
  inputGroup.appendChild(input);
  inputGroup.appendChild(sendBtn);
  content.appendChild(inputGroup);

  page.appendChild(content);
  page.appendChild(renderNav());

  async function handleSend(val) {
    const text = val || input.value.trim();
    if (!text) return;
    
    input.value = '';
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.5';
    
    addMessage(text, false);

    // AI Response
    const response = await getKiraAIResponse(text);
    addMessage(response, true);
    
    sendBtn.disabled = false;
    sendBtn.style.opacity = '1';
  }

  sendBtn.onclick = () => handleSend();
  input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

  return page;
}
