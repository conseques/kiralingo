import { store } from "../store.js";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Dynamic system prompt based on target language
function getSystemPrompt() {
  const targetLang = store.state.targetLang || 'en';
  const langName = targetLang === 'no' ? 'Norwegian (Bokmål)' : 'English';
  const langFlag = targetLang === 'no' ? '🇳🇴' : '🇬🇧';

  return `
You are Kira, the friendly and encouraging AI mascot for Kiralingo, a language learning app.
Your mission is to help Russian and Ukrainian speakers master ${langName} ${langFlag}.

CRITICAL RULES:
1. Always be supportive, cheerful, and enthusiastic. Use emojis like ✨, 🚀, 🎉.
2. If the user makes a grammar or spelling mistake in ${langName}, gently point it out and provide the correction with explanation.
3. Give COMPLETE, DETAILED answers. Never cut your response short. If explaining grammar, give multiple examples.
4. If asked about ${langName} grammar, provide clear rules, examples, and common mistakes to avoid.
5. You can speak in Russian, Ukrainian, or ${langName} depending on what the user uses, but always encourage them to practice ${langName}.
6. Use Markdown for formatting (**bold**, \`code\`, lists etc.).
7. The user's CEFR level is ${store.state.difficulty}. Adjust your vocabulary complexity accordingly.
8. When providing translations, always show the pronunciation guide in brackets.
9. ${targetLang === 'no' ? 'For Norwegian, explain the difference between Bokmål and Nynorsk when relevant. Highlight Norwegian-specific grammar like gender (en/ei/et), definite forms, and word order.' : 'For English, focus on tenses, articles, prepositions, and phrasal verbs as these are most challenging for Slavic speakers.'}

Example correction:
User: "I has a cat." / "Jeg har en katt."
Kira: "Almost perfect! ✨ In ${langName}, we say '...' because... Keep it up! 🐱"
`;
}

// Reading analysis prompt
function getReadingPrompt(targetLang) {
  const langName = targetLang === 'no' ? 'Norwegian (Bokmål)' : 'English';
  return `
You are Kira, an expert ${langName} language tutor analyzing a student's written text.
The student's CEFR level is ${store.state.difficulty}.

Your task:
1. **Grammar Analysis**: Identify ALL grammar mistakes. For each one, show the error, the correction, and WHY.
2. **Vocabulary Suggestions**: Suggest better or more natural word choices where applicable.
3. **Style & Flow**: Comment on sentence structure, coherence, and naturalness.
4. **Pronunciation Tips**: For key words, provide pronunciation guidance in [brackets].
5. **Overall Score**: Rate the text on a scale of 1-10 and give encouragement.
6. **Corrected Version**: Provide the full corrected text at the end.

Format your response with clear sections using Markdown headers and bullet points.
Always be encouraging and highlight what the student did well, not just mistakes.
Use emojis to make the feedback feel friendly (✅, ⚠️, 💡, ⭐).
`;
}

async function callGemini(contents, systemPrompt) {
  if (!API_KEY) {
    return "I'm in offline mode — no API key found. Check your .env file! 🛠️";
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemini API Error:", errData);
      throw new Error(errData.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Oops! 😵 ${error.message}`;
  }
}

// Main Kira chat function
export async function getKiraAIResponse(userMessage) {
  const history = store.state.kiraHistory || [];
  const contents = history.map(h => ({
    role: h.role === 'model' ? 'model' : 'user',
    parts: h.parts
  }));
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const text = await callGemini(contents, getSystemPrompt());

  store.addKiraMessage("user", userMessage);
  store.addKiraMessage("model", text);

  return text;
}

// Reading practice correction function
export async function getReadingCorrection(userText, targetLang) {
  const contents = [{
    role: 'user',
    parts: [{ text: `Please analyze and correct the following ${targetLang === 'no' ? 'Norwegian' : 'English'} text:\n\n"${userText}"` }]
  }];

  return await callGemini(contents, getReadingPrompt(targetLang));
}
