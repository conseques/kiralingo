import { t } from '../i18n.js';
import { renderHeader, renderNav } from '../components/nav.js';
import { speak } from '../utils/audio.js';
import { store } from '../store.js';
import { getReadingCorrection } from '../utils/gemini.js';

// Sample texts per language and level
const SAMPLE_TEXTS = {
  en: {
    A1: [
      { title: "My Family", text: "I have a big family. My mother is a teacher. My father is a doctor. I have one brother and one sister. We live in a house. I love my family very much.", hint: "Try to rewrite this text in your own words." },
      { title: "My Day", text: "I wake up at seven. I eat breakfast. Then I go to school. After school, I play with friends. In the evening, I read a book and go to sleep.", hint: "Describe your typical day." },
    ],
    A2: [
      { title: "A Trip to the Park", text: "Last weekend, I went to the park with my friends. The weather was sunny and warm. We played football and had a picnic. I ate a sandwich and drank juice. It was a wonderful day.", hint: "Write about your last weekend." },
      { title: "My Hobby", text: "I like reading books in my free time. My favourite books are about adventures. I also enjoy playing video games with my brother. Sometimes we go cycling together.", hint: "Tell about your hobbies." },
    ],
    B1: [
      { title: "Climate Change", text: "Climate change is one of the biggest problems facing our planet today. Rising temperatures are causing ice caps to melt, sea levels to rise, and extreme weather events to become more frequent. Everyone can help by reducing their carbon footprint.", hint: "Write your opinion on environmental protection." },
      { title: "Technology in Education", text: "Modern technology has transformed education in many ways. Students can now access learning materials online, attend virtual classes, and use educational apps. However, some people argue that too much screen time can be harmful.", hint: "Share your thoughts on technology in learning." },
    ],
    B2: [
      { title: "The Future of Work", text: "The rapid advancement of artificial intelligence and automation is reshaping the global workforce. While some jobs may become obsolete, new opportunities are emerging in fields such as data science, renewable energy, and digital marketing. The key to thriving in this changing landscape is lifelong learning and adaptability.", hint: "Discuss how AI might change your profession." },
    ],
    C1: [
      { title: "Cultural Identity in a Globalised World", text: "In an increasingly interconnected world, maintaining cultural identity while embracing globalisation presents a nuanced challenge. The proliferation of social media and international commerce has fostered unprecedented cultural exchange, yet it has also raised concerns about cultural homogenisation and the erosion of indigenous traditions.", hint: "Analyze the tension between globalization and cultural preservation." },
    ],
  },
  no: {
    A1: [
      { title: "Min familie", text: "Jeg har en stor familie. Moren min er lærer. Faren min er lege. Jeg har en bror og en søster. Vi bor i et hus. Jeg elsker familien min.", hint: "Prøv å skrive om din familie." },
      { title: "Min dag", text: "Jeg våkner klokka sju. Jeg spiser frokost. Så går jeg på skolen. Etter skolen leker jeg med venner. Om kvelden leser jeg en bok og legger meg.", hint: "Beskriv en vanlig dag." },
    ],
    A2: [
      { title: "En tur i parken", text: "Forrige helg gikk jeg i parken med vennene mine. Været var fint og varmt. Vi spilte fotball og hadde piknik. Jeg spiste et smørbrød og drakk juice. Det var en fin dag.", hint: "Skriv om helgen din." },
      { title: "Hobbyen min", text: "Jeg liker å lese bøker på fritiden. Favorittbøkene mine handler om eventyr. Jeg liker også å spille dataspill med broren min. Noen ganger sykler vi sammen.", hint: "Fortell om hobbyene dine." },
    ],
    B1: [
      { title: "Livet i Norge", text: "Norge er kjent for sin vakre natur, med fjorder, fjell og nordlys. Nordmenn er glad i friluftsliv og bruker mye tid utendørs. Vinteren er kald og mørk, men mange liker å gå på ski. Sommeren er kort, men veldig vakker med lange, lyse dager.", hint: "Skriv om hva du vet om norsk kultur." },
      { title: "Bærekraft og miljø", text: "Norge er et av verdens ledende land innen fornybar energi. Landet produserer mye vannkraft og satser på elbiler. Mange nordmenn er opptatt av miljøet og resirkulerer avfall. Regjeringen har ambisiøse klimamål for fremtiden.", hint: "Skriv om miljøproblemer og løsninger." },
    ],
    B2: [
      { title: "Det norske velferdssamfunnet", text: "Den norske velferdsstaten er basert på prinsippet om at alle borgere skal ha tilgang til grunnleggende tjenester som helsevesen, utdanning og sosial sikkerhet. Systemet finansieres gjennom skatter og avgifter. Selv om modellen er kostbar, har den bidratt til at Norge konsekvent rangeres blant verdens mest levbare land.", hint: "Diskuter fordeler og ulemper med den norske velferdsmodellen." },
    ],
    C1: [
      { title: "Språkpolitikk i Norge", text: "Norges unike språklige situasjon med to skriftspråk — bokmål og nynorsk — gjenspeiler landets komplekse kulturelle og politiske historie. Mens bokmål har sitt utspring i dansk-norsk skriftspråk, ble nynorsk utviklet av Ivar Aasen basert på norske dialekter. I dag er begge sidestilte offisielle skriftspråk, men debatten om deres rolle i samfunnet fortsetter.", hint: "Analyser den norske språksituasjonen." },
    ],
  }
};

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^### (.*$)/gm, '<h4 style="margin:0.75rem 0 0.25rem; color:var(--primary);">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 style="margin:1rem 0 0.5rem; color:var(--primary);">$1</h3>')
    .replace(/^- (.*$)/gm, '<li style="margin-left:1rem;">$1</li>')
    .replace(/✅/g, '<span style="color:#4caf50">✅</span>')
    .replace(/⚠️/g, '<span style="color:#ff9800">⚠️</span>')
    .replace(/💡/g, '<span style="color:#2196f3">💡</span>')
    .replace(/⭐/g, '<span style="color:#ffc107">⭐</span>')
    .replace(/\n/g, '<br/>');
}

export function renderReading() {
  const page = document.createElement('div');
  page.className = 'page';
  page.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'page-content';
  content.style.cssText = 'padding:1.5rem; display:flex; flex-direction:column; gap:1.5rem;';

  const targetLang = store.state.targetLang || 'en';
  const difficulty = store.state.difficulty || 'A1';
  const langName = targetLang === 'no' ? 'Norsk 🇳🇴' : 'English 🇬🇧';

  // Title
  const titleSection = document.createElement('div');
  titleSection.innerHTML = `
    <h2 style="font-family:var(--font-headline); font-size:1.5rem; font-weight:800; color:var(--primary); margin-bottom:0.25rem;">
      <span class="material-symbols-outlined" style="vertical-align:middle; margin-right:0.5rem;">menu_book</span>
      ${t('reading.title') || 'Reading Practice'}
    </h2>
    <p style="font-size:0.875rem; color:var(--on-surface-variant);">${t('reading.subtitle') || 'Read, write, and let Kira correct your text'} — ${langName} (${difficulty})</p>
  `;
  content.appendChild(titleSection);

  // Mode tabs: Sample Text | Free Write
  const tabs = document.createElement('div');
  tabs.style.cssText = 'display:flex; gap:0.5rem; margin-bottom:0.5rem;';
  let activeMode = 'sample';

  const sampleTab = document.createElement('button');
  sampleTab.style.cssText = 'flex:1; padding:0.75rem; border-radius:var(--radius-md); font-weight:600; cursor:pointer; transition:all 0.2s; border:2px solid var(--primary); background:var(--primary); color:white;';
  sampleTab.textContent = t('reading.sampleText') || '📖 Sample Text';

  const freeTab = document.createElement('button');
  freeTab.style.cssText = 'flex:1; padding:0.75rem; border-radius:var(--radius-md); font-weight:600; cursor:pointer; transition:all 0.2s; border:2px solid var(--outline-variant); background:var(--surface-container); color:var(--on-surface);';
  freeTab.textContent = t('reading.freeWrite') || '✍️ Free Write';

  tabs.appendChild(sampleTab);
  tabs.appendChild(freeTab);
  content.appendChild(tabs);

  // Content Area
  const contentArea = document.createElement('div');
  content.appendChild(contentArea);

  function switchTab(mode) {
    activeMode = mode;
    if (mode === 'sample') {
      sampleTab.style.cssText = 'flex:1; padding:0.75rem; border-radius:var(--radius-md); font-weight:600; cursor:pointer; transition:all 0.2s; border:2px solid var(--primary); background:var(--primary); color:white;';
      freeTab.style.cssText = 'flex:1; padding:0.75rem; border-radius:var(--radius-md); font-weight:600; cursor:pointer; transition:all 0.2s; border:2px solid var(--outline-variant); background:var(--surface-container); color:var(--on-surface);';
      renderSampleMode();
    } else {
      freeTab.style.cssText = 'flex:1; padding:0.75rem; border-radius:var(--radius-md); font-weight:600; cursor:pointer; transition:all 0.2s; border:2px solid var(--primary); background:var(--primary); color:white;';
      sampleTab.style.cssText = 'flex:1; padding:0.75rem; border-radius:var(--radius-md); font-weight:600; cursor:pointer; transition:all 0.2s; border:2px solid var(--outline-variant); background:var(--surface-container); color:var(--on-surface);';
      renderFreeMode();
    }
  }

  sampleTab.onclick = () => switchTab('sample');
  freeTab.onclick = () => switchTab('free');

  function renderSampleMode() {
    contentArea.innerHTML = '';
    const samples = SAMPLE_TEXTS[targetLang]?.[difficulty] || SAMPLE_TEXTS[targetLang]?.['A1'] || [];

    if (samples.length === 0) {
      contentArea.innerHTML = '<p style="color:var(--on-surface-variant); text-align:center; padding:2rem;">No texts available for this level yet.</p>';
      return;
    }

    samples.forEach((sample, idx) => {
      const card = document.createElement('div');
      card.style.cssText = 'background:var(--surface-container); border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1rem; border:1px solid var(--outline-variant);';

      const header = document.createElement('div');
      header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;';
      header.innerHTML = `
        <h3 style="font-weight:700; color:var(--on-surface); font-size:1.1rem;">${sample.title}</h3>
        <button class="material-symbols-outlined" style="background:none; border:none; cursor:pointer; color:var(--primary); font-size:1.5rem;" id="speak-sample-${idx}">volume_up</button>
      `;
      card.appendChild(header);

      const textEl = document.createElement('p');
      textEl.style.cssText = 'font-size:1rem; line-height:1.7; color:var(--on-surface); background:var(--surface-container-highest); padding:1rem; border-radius:var(--radius-md); font-style:italic; border-left:3px solid var(--primary);';
      textEl.textContent = sample.text;
      card.appendChild(textEl);

      const hint = document.createElement('p');
      hint.style.cssText = 'font-size:0.85rem; color:var(--on-surface-variant); margin-top:0.5rem;';
      hint.innerHTML = `💡 <em>${sample.hint}</em>`;
      card.appendChild(hint);

      const textarea = document.createElement('textarea');
      textarea.placeholder = t('reading.writePlaceholder') || 'Write your text here...';
      textarea.style.cssText = 'width:100%; min-height:8rem; padding:1rem; border-radius:var(--radius-md); border:2px solid var(--outline-variant); background:var(--surface); color:var(--on-surface); font-size:1rem; line-height:1.6; resize:vertical; margin-top:1rem; font-family:inherit; box-sizing:border-box;';
      card.appendChild(textarea);

      const btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex; gap:0.75rem; margin-top:0.75rem;';

      const checkBtn = document.createElement('button');
      checkBtn.style.cssText = 'flex:1; padding:0.875rem; border-radius:var(--radius-md); background:var(--primary); color:white; font-weight:700; border:none; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; transition:opacity 0.2s;';
      checkBtn.innerHTML = '<span class="material-symbols-outlined">checklist</span> ' + (t('reading.checkText') || 'Check My Text');
      btnRow.appendChild(checkBtn);
      card.appendChild(btnRow);

      const resultArea = document.createElement('div');
      resultArea.style.cssText = 'margin-top:1rem; display:none;';
      card.appendChild(resultArea);

      // Events
      header.querySelector(`#speak-sample-${idx}`).onclick = () => speak(sample.text, targetLang === 'no' ? 'nb-NO' : 'en-US');
      checkBtn.onclick = async () => {
        const userText = textarea.value.trim();
        if (!userText) return;
        checkBtn.disabled = true;
        checkBtn.style.opacity = '0.5';
        checkBtn.innerHTML = '<span class="material-symbols-outlined" style="animation:spin 1s linear infinite;">progress_activity</span> Analyzing...';

        const correction = await getReadingCorrection(userText, targetLang);
        resultArea.style.display = 'block';
        resultArea.innerHTML = `
          <div style="background:var(--secondary-container); border-radius:var(--radius-md); padding:1.25rem; color:var(--on-secondary-container); line-height:1.6; font-size:0.95rem;">
            ${parseMarkdown(correction)}
          </div>
        `;
        checkBtn.disabled = false;
        checkBtn.style.opacity = '1';
        checkBtn.innerHTML = '<span class="material-symbols-outlined">checklist</span> ' + (t('reading.checkAgain') || 'Check Again');
        store.addXP(15);
      };

      contentArea.appendChild(card);
    });
  }

  function renderFreeMode() {
    contentArea.innerHTML = '';

    const freeCard = document.createElement('div');
    freeCard.style.cssText = 'background:var(--surface-container); border-radius:var(--radius-lg); padding:1.5rem; border:1px solid var(--outline-variant);';

    freeCard.innerHTML = `
      <h3 style="font-weight:700; color:var(--on-surface); margin-bottom:0.5rem;">✍️ ${t('reading.freeWriteTitle') || 'Free Writing Practice'}</h3>
      <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-bottom:1rem;">${t('reading.freeWriteDesc') || 'Write anything you want and Kira will analyze your grammar, vocabulary, and style.'}</p>
    `;

    const textarea = document.createElement('textarea');
    textarea.placeholder = targetLang === 'no'
      ? 'Skriv noe på norsk her...'
      : 'Write something in English here...';
    textarea.style.cssText = 'width:100%; min-height:12rem; padding:1rem; border-radius:var(--radius-md); border:2px solid var(--outline-variant); background:var(--surface); color:var(--on-surface); font-size:1rem; line-height:1.6; resize:vertical; font-family:inherit; box-sizing:border-box;';
    freeCard.appendChild(textarea);

    const checkBtn = document.createElement('button');
    checkBtn.style.cssText = 'width:100%; padding:1rem; border-radius:var(--radius-md); background:var(--primary); color:white; font-weight:700; border:none; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; margin-top:1rem; transition:opacity 0.2s;';
    checkBtn.innerHTML = '<span class="material-symbols-outlined">rate_review</span> ' + (t('reading.analyzeText') || 'Analyze My Text');
    freeCard.appendChild(checkBtn);

    const resultArea = document.createElement('div');
    resultArea.style.cssText = 'margin-top:1rem; display:none;';
    freeCard.appendChild(resultArea);

    checkBtn.onclick = async () => {
      const userText = textarea.value.trim();
      if (!userText) return;
      checkBtn.disabled = true;
      checkBtn.style.opacity = '0.5';
      checkBtn.innerHTML = '<span class="material-symbols-outlined" style="animation:spin 1s linear infinite;">progress_activity</span> Analyzing...';

      const correction = await getReadingCorrection(userText, targetLang);
      resultArea.style.display = 'block';
      resultArea.innerHTML = `
        <div style="background:var(--secondary-container); border-radius:var(--radius-md); padding:1.25rem; color:var(--on-secondary-container); line-height:1.6; font-size:0.95rem;">
          ${parseMarkdown(correction)}
        </div>
      `;
      checkBtn.disabled = false;
      checkBtn.style.opacity = '1';
      checkBtn.innerHTML = '<span class="material-symbols-outlined">rate_review</span> ' + (t('reading.analyzeAgain') || 'Analyze Again');
      store.addXP(15);
    };

    contentArea.appendChild(freeCard);
  }

  // Initialize with sample mode
  renderSampleMode();

  page.appendChild(content);
  page.appendChild(renderNav());
  return page;
}
