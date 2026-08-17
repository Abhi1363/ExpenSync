import { model } from "../configs/gemini.js";
import { llm } from "../configs/langChain.js";


export const askGemini = async (prompt) => {
  try {
    const result = await llm.invoke(prompt);

    return result.content;
  } catch (err) {
    console.error(err);
    throw new Error("Gemini Error");
  }
};