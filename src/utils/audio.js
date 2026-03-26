/**
 * Audio utility for Kiralingo
 * Handles high-quality voice selection and speech synthesis.
 */

let voices = [];

// Initialize voices
if ('speechSynthesis' in window) {
  // Wait for voices to be loaded (sometimes async)
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
  voices = window.speechSynthesis.getVoices();
}

/**
 * Gets all available voices.
 */
export function getAllVoices() {
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }
  return voices;
}

/**
 * Finds the best available voice for a given language.
 * Priorities:
 * 0. User preferred voice from store
 * 1. Voices with "Google" in the name (often higher quality)
 * 2. Voices with "Premium" or "Enhanced" or "High Quality"
 * 3. Specific preferred names for the lang
 * 4. First available voice for the lang
 */
export function getBestVoice(lang = 'en-US') {
  const allVoices = getAllVoices();
  const langCode = lang.split('-')[0];
  const langVoices = allVoices.filter(v => v.lang.startsWith(langCode));
  
  if (langVoices.length === 0) return null;

  // 0. User preferred voice
  const preferred = store.state.preferredVoice;
  if (preferred) {
    const userVoice = langVoices.find(v => v.name === preferred);
    if (userVoice) return userVoice;
  }

  // 1. Check for Google voices
  const googleVoice = langVoices.find(v => v.name.includes('Google'));
  if (googleVoice) return googleVoice;

  // 2. Check for "Premium" or "Enhanced"
  const premiumVoice = langVoices.find(v => v.name.includes('Premium') || v.name.includes('Enhanced'));
  if (premiumVoice) return premiumVoice;

  // 3. Specific preferred names
  const preferredNames = {
    'en': ['Samantha', 'Daniel', 'Karen', 'Moira'],
    'no': ['Nora', 'Henrik', 'Jon']
  };

  const names = preferredNames[langCode] || [];
  for (const name of names) {
    const v = langVoices.find(v => v.name.includes(name));
    if (v) return v;
  }

  // 4. Just return the first one for that lang
  return langVoices[0];
}

/**
 * Speaks the given text using the best available voice.
 * Filters out emojis per user request.
 */
export function speak(text, lang = 'en-US', rate = 0.9) {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Filter out emojis from the text
  // Comprehensive regex for emojis and pictographs
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F100}-\u{1F1FF}\u{1F400}-\u{1F4FF}\u{1F500}-\u{1F5FF}\u{1F300}-\u{1F5FF}]/gu;
  const cleanedText = text.replace(emojiRegex, '');

  if (!cleanedText.trim()) return;

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = lang;
  utterance.rate = rate;

  const voice = getBestVoice(lang);
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Stops any ongoing speech.
 */
export function stop() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
