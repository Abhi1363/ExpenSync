import { buildPrompt } from "./prompt.service.js";
import { askGemini } from "./gemini.service.js";

export const chatWithAI = async (message) => {
  const prompt = buildPrompt(message);

  const reply = await askGemini(prompt);

  return reply;
};