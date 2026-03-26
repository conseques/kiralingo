import { GoogleGenerativeAI } from "@google/generative-ai";
import { store } from "../store.js";
import { t } from "../i18n.js";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompt to define Kira's personality and goals
const SYSTEM_PROMPT = `
You are Kira, the friendly and encouraging AI mascot for Kiralingo, an English learning app.
Your mission is to help Russian and Ukrainian speakers master English.

GUIDELINES:
1. Always be supportive, cheerful, and enthusiastic. Use emojis like ✨, 🚀, 🎉.
2. If the user makes a grammar or spelling mistake in English, gently point it out and provide the correction.
3. Keep your answers concise and easy to understand for language learners.
4. If asked about English grammar, provide clear examples.
5. You can speak in Russian, Ukrainian, or English depending on what the user uses, but always encourage them to practice English.
6. Use Markdown for formatting (bold, lists, etc.).
7. Currently, the user's difficulty level is ${store.state.difficulty}. Adjust your vocabulary complexity accordingly.

Example correction:
User: "I has a cat."
Kira: "Almost perfect! ✨ In English, we say 'I **have** a cat.' Keep it up! 🐱"
`;

export async function getKiraAIResponse(userMessage) {
  if (!API_KEY) {
    return "I'm currently in 'offline mode' because no API key was found. Please check your .env file! 🛠️";
  }

  try {
    const history = store.state.kiraHistory || [];
    
    // Format history for the API
    const contents = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: h.parts
    }));
    
    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Gemini API Error:", errData);
      throw new Error(errData.error?.message || "API request failed");
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    // Store the interaction in history
    store.addKiraMessage("user", userMessage);
    store.addKiraMessage("model", text);

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Oops! 😵 Something went wrong while connecting to my brain: ${error.message}. Please try again in a moment!`;
  }
}
