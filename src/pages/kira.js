import { t } from '../i18n.js';
import { renderHeader, renderNav } from '../components/nav.js';
import { speak, stop, getAllVoices } from '../utils/audio.js';
import { store } from '../store.js';
import { getKiraAIResponse } from '../utils/gemini.js';

// Simple text cleaner to remove markdown artifacts per user request
function cleanText(text) {
  return text
    .replace(/^#+\s/gm, '') // Remove headers (#)
    .replace(/\*\*/g, '')   // Remove bold symbols (**)
    .replace(/\*/g, '')     // Remove italic symbols (*)
    .replace(/__/g, '')     // Remove underline proxies (__)
    .replace(/`/g, '')      // Remove code symbols (`)
    .replace(/^- /gm, '')   // Remove list dashes (-)
    .replace(/\[|\]/g, '')  // Remove brackets
    .trim();
}

export function renderKira() {
  const page = document.createElement('div');
  page.className = 'page';

  // Header
  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.cssText = 'padding:1.5rem; display:flex; flex-direction:column; min-height:calc(100vh - 12rem);';

  // Kira Intro & Global Controls
  const introContainer = document.createElement('div');
  introContainer.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;';
  
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

  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex; gap:0.75rem; align-items:center;';

  // Auto-audio toggle
  const audioToggle = document.createElement('button');
  audioToggle.className = 'material-symbols-outlined';
  audioToggle.style.cssText = `cursor:pointer; background:none; border:none; transition: color 0.2s; ${store.state.autoPlayAudio ? 'color:var(--primary);' : 'color:var(--on-surface-variant);'}`;
  audioToggle.textContent = store.state.autoPlayAudio ? 'volume_up' : 'volume_off';
  audioToggle.title = 'Auto-play audio';
  audioToggle.onclick = () => {
    const newState = !store.state.autoPlayAudio;
    store.setAutoPlayAudio(newState);
    audioToggle.textContent = newState ? 'volume_up' : 'volume_off';
    audioToggle.style.color = newState ? 'var(--primary)' : 'var(--on-surface-variant)';
  };
  controls.appendChild(audioToggle);

  // Clear history
  const clearBtn = document.createElement('button');
  clearBtn.className = 'material-symbols-outlined';
  clearBtn.style.cssText = 'color:var(--on-surface-variant); cursor:pointer; background:none; border:none;';
  clearBtn.textContent = 'delete_sweep';
  clearBtn.title = 'Clear history';
  clearBtn.onclick = () => {
    store.clearKiraHistory();
    chatArea.innerHTML = '';
    addMessage("History cleared! ✨ How can I help you today?", true, false);
  };
  controls.appendChild(clearBtn);

  introContainer.appendChild(controls);
  content.appendChild(introContainer);

  // Voice Selection Dropdown (Livelier Voice)
  const voiceSelectionRow = document.createElement('div');
  voiceSelectionRow.style.cssText = 'display:flex; align-items:center; gap:0.5rem; margin-bottom:1.5rem; padding:0.5rem; background:var(--surface-container-low); border-radius:var(--radius-md);';
  
  const voiceIcon = document.createElement('span');
  voiceIcon.className = 'material-symbols-outlined';
  voiceIcon.style.cssText = 'font-size:1.25rem; color:var(--primary);';
  voiceIcon.textContent = 'record_voice_over';
  voiceSelectionRow.appendChild(voiceIcon);

  const voiceSelect = document.createElement('select');
  voiceSelect.style.cssText = 'flex:1; background:transparent; border:none; color:var(--on-surface); font-size:0.875rem; outline:none; cursor:pointer;';
  
  function updateVoiceList() {
    voiceSelect.innerHTML = '';
    const langCode = store.state.targetLang === 'no' ? 'no' : 'en';
    const allVoices = getAllVoices();
    const filteredVoices = allVoices.filter(v => 
      v.lang.startsWith(langCode) || 
      (langCode === 'no' && v.lang.startsWith('nb'))
    ).sort((a, b) => {
      // Prioritize Google and Premium voices in the list
      const aScore = (a.name.includes('Google') ? 2 : 0) + (a.name.includes('Premium') ? 1 : 0);
      const bScore = (b.name.includes('Google') ? 2 : 0) + (b.name.includes('Premium') ? 1 : 0);
      return bScore - aScore;
    });

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = langCode === 'no' ? 'Velg stemme (Norsk)' : 'Choose voice (English)';
    voiceSelect.appendChild(defaultOption);

    filteredVoices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      if (store.state.preferredVoice === v.name) opt.selected = true;
      voiceSelect.appendChild(opt);
    });
  }

  updateVoiceList();
  window.speechSynthesis.onvoiceschanged = updateVoiceList;

  voiceSelect.onchange = () => {
    store.setPreferredVoice(voiceSelect.value);
    speak(store.state.targetLang === 'no' ? "Hei! Hvordan høres denne stemmen ut?" : "Hello! How does this voice sound?", store.state.targetLang === 'no' ? 'nb-NO' : 'en-US');
  };

  voiceSelectionRow.appendChild(voiceSelect);
  content.appendChild(voiceSelectionRow);

  // Chat Area
  const chatArea = document.createElement('div');
  chatArea.id = 'kira-chat-area';
  chatArea.style.cssText = 'flex:1; display:flex; flex-direction:column; gap:1.25rem; overflow-y:auto; padding-bottom:2rem; max-height:45vh;';
  content.appendChild(chatArea);

  // Logic: Add Message
  function addMessage(text, isKira = false, save = true) {
    const msgWrapper = document.createElement('div');
    msgWrapper.className = 'animate-fade-in-up';
    msgWrapper.style.cssText = `display:flex; flex-direction:column; gap:0.25rem; ${isKira ? 'align-self:flex-start;' : 'align-self:flex-end;'}`;
    
    // Clean text per user request
    const cleanedText = isKira ? cleanText(text) : text;

    const msg = document.createElement('div');
    msg.style.cssText = `max-width:90%; padding:1rem; border-radius:var(--radius-md); font-size:0.95rem; line-height:1.5; ${
      isKira 
        ? 'background:var(--secondary-container); color:var(--on-secondary-container); border-bottom-left-radius:0;' 
        : 'background:var(--primary); color:white; border-bottom-right-radius:0;'
    }`;
    
    // Convert newlines to breaks
    msg.innerHTML = cleanedText.replace(/\n/g, '<br/>');
    msgWrapper.appendChild(msg);

    // AI Controls (Voice Play/Stop)
    if (isKira) {
      const msgTools = document.createElement('div');
      msgTools.style.cssText = 'display:flex; gap:0.5rem; margin-top:0.25rem; opacity:0.8;';
      
      const playBtn = document.createElement('button');
      playBtn.className = 'material-symbols-outlined';
      playBtn.style.cssText = 'font-size:1.1rem; cursor:pointer; color:var(--primary);';
      playBtn.textContent = 'volume_up';
      playBtn.onclick = () => speak(cleanedText, store.state.targetLang === 'no' ? 'nb-NO' : 'en-US');

      const stopBtn = document.createElement('button');
      stopBtn.className = 'material-symbols-outlined';
      stopBtn.style.cssText = 'font-size:1.1rem; cursor:pointer; color:var(--error);';
      stopBtn.textContent = 'stop_circle';
      stopBtn.onclick = () => stop();

      msgTools.appendChild(playBtn);
      msgTools.appendChild(stopBtn);
      msgWrapper.appendChild(msgTools);

      // Auto-play if enabled
      if (save && store.state.autoPlayAudio) {
        speak(cleanedText, store.state.targetLang === 'no' ? 'nb-NO' : 'en-US');
      }
    }

    chatArea.appendChild(msgWrapper);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // Load History
  const history = store.state.kiraHistory || [];
  if (history.length > 0) {
    history.forEach(h => {
      addMessage(h.parts[0].text, h.role === 'model', false);
    });
  } else {
    const welcome = store.state.targetLang === 'no' 
      ? "Hei! Jeg er Kira, din AI-studiekamerat. Spør meg om hva som helst på norsk! ✨"
      : "Hello! I'm Kira, your AI study buddy. Ask me anything about English! ✨";
    addMessage(welcome, true, false);
  }

  // Suggested Prompts
  const suggestions = document.createElement('div');
  suggestions.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;';
  
  const prompts = store.state.targetLang === 'no' ? [
    { text: "Sjekk grammatikken min", icon: 'spellcheck' },
    { text: "Forklar 'Passiv form'", icon: 'help_outline' },
    { text: "Øv på fortid", icon: 'history' },
    { text: "Fortell meg en spøk", icon: 'sentiment_very_satisfied' },
  ] : [
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
  input.placeholder = t('kira.placeholder') || (store.state.targetLang === 'no' ? 'Spør meg om hva som helst...' : 'Ask me anything...');
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
    
    // Stop ongoing speech when user sends a new message
    stop();

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
