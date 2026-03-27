import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: {
  maxOutputTokens: 8192,
}});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function translateFile(filePath, promptPrefix) {
  console.log(`Processing ${path.basename(filePath)}...`);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already looks translated
  if (content.includes("no: '") || content.includes("no: ['")) {
    console.log(`  -> Skipped (likely already translated)`);
    return;
  }

  const prompt = `
${promptPrefix}

CRITICAL RULES:
1. You MUST return ONLY the raw JavaScript code.
2. DO NOT wrap the output in markdown blocks like \`\`\`javascript or \`\`\`. Start directly with the code.
3. Preserve all comments exactly.
4. Preserve all formatting, indentation, and structure exactly.

Here is the original JavaScript file:
======
${content}
======
`;

  let retries = 3;
  while (retries > 0) {
    try {
      const response = await model.generateContent(prompt);
      let output = response.response.text();
      
      if (output.startsWith('\`\`\`javascript\n')) {
        output = output.substring(14);
      } else if (output.startsWith('\`\`\`js\n')) {
        output = output.substring(6);
      } else if (output.startsWith('\`\`\`\n')) {
        output = output.substring(4);
      }
      if (output.endsWith('\n\`\`\`')) {
        output = output.slice(0, -4);
      } else if (output.endsWith('\`\`\`')) {
        output = output.slice(0, -3);
      }

      fs.writeFileSync(filePath, output.trim() + '\n', 'utf-8');
      console.log(`  -> Successfully translated and saved.`);
      await delay(5000); // 5 sec delay to respect rate limit
      return;
    } catch (err) {
      console.error(`  -> Failed (Retries left: ${retries - 1}):`, err.message);
      retries--;
      await delay(6000); // Backoff before retry
    }
  }
}

async function main() {
  const dataDir = path.resolve('src/data');

  const vocabFiles = ['vocab-a1.js', 'vocab-a2.js', 'vocab-b1.js', 'vocab-b2.js', 'vocab-c1.js'];
  const lessonFiles = ['lessons-a1.js', 'lessons-a2.js', 'lessons-b1.js', 'lessons-b2.js', 'lessons-c1.js'];

  const vocabPrompt = `You are a professional Norwegian translator. Your task is to inject a Norwegian translation property ('no') into every vocabulary object in this array.
For example, if the object is: { id: 'one', en: 'One', ru: 'Один', uk: 'Один', ... }
Change it to: { id: 'one', en: 'One', no: 'En', ru: 'Один', uk: 'Один', ... }
Translate from English to Bokmål Norwegian in a context-appropriate way. Translate ALL objects in the array.`;

  const lessonPrompt = `You are an expert JS parser and Norwegian translator. Your task is to update this lessons array so it supports both English ('en') and Norwegian Bokmål ('no') target learning languages simultaneously.

Rules for modifying the JS objects:
1. If you see \`answer: ['Word', 'Word']\`, change it to \`answer: { en: ['Word', 'Word'], no: ['Ord', 'Ord'] }\`
2. If you see \`answer: 'Word'\`, change it to \`answer: { en: 'Word', no: 'Ord' }\`
3. If you see \`bank: ['Word', 'Other']\`, change to \`bank: { en: ['Word', 'Other'], no: ['Ord', 'Annet'] }\`
4. If you see \`options: [{ en: 'Word', ru: 'Слово' }]\`, change to \`options: [{ en: 'Word', no: 'Ord', ru: 'Слово' }]\`
5. If you see \`statement: { en: '...' }\`, change to \`statement: { en: '...', no: '...' }\`
6. If you see \`sentence: '___ morning!'\`, change to \`sentence: { en: '___ morning!', no: '___ morgen!' }\`
7. If you see \`words: ['My', 'name']\`, change to \`words: { en: ['My', 'name'], no: ['Mitt', 'navn'] }\`
8. If you see \`pairs: [{ en: 'One', local: { ... } }]\`, change to \`pairs: [{ en: 'One', no: 'En', local: { ... } }]\`
9. If you see \`questionWord: { en: '...', ... }\`, change to \`questionWord: { en: '...', no: '...', ... }\`

Ensure ALL objects in the array are translated. DO NOT miss any. Preserve all existing Russian ('ru') and Ukrainian ('uk') fields. Preserve the 'id', 'type', and logic-related fields exactly as they are.`;

  console.log("Starting vocabulary translation...");
  for (const file of vocabFiles) {
    await translateFile(path.join(dataDir, file), vocabPrompt);
  }

  console.log("\\nStarting lessons translation...");
  for (const file of lessonFiles) {
    await translateFile(path.join(dataDir, file), lessonPrompt);
  }
}

main();
