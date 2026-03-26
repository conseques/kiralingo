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
 * Finds the best available voice for a given language.
 * Priorities:
 * 1. Voices with "Google" in the name (often higher quality)
 * 2. Voices with "Premium" or "High Quality"
 * 3. Specific preferred names like "Samantha", "Daniel"
 * 4. First available voice for the lang
 */
export function getBestVoice(lang = 'en-US') {
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }

  const langVoices = voices.filter(v => v.lang.startsWith(lang.split('-')[0]));
  if (langVoices.length === 0) return null;

  // 1. Check for Google voices
  const googleVoice = langVoices.find(v => v.name.includes('Google'));
  if (googleVoice) return googleVoice;

  // 2. Check for common premium-sounding names on macOS/iOS
  const preferredNames = ['Samantha', 'Daniel', 'Karen', 'Moira'];
  for (const name of preferredNames) {
    const v = langVoices.find(v => v.name.includes(name));
    if (v) return v;
  }

  // 3. Just return the first one for that lang
  return langVoices[0];
}

/**
 * Speaks the given text using the best available voice.
 */
export function speak(text, lang = 'en-US', rate = 0.9) {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
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
