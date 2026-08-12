import { retrieveExpenses } from "./retriever.service.js";
import { buildPrompt } from "./prompt.service.js";
import { askGemini } from "./gemini.service.js";

export const chatWithAI = async (message, userId) => {
    try {

        const retrievedData = await retrieveExpenses(message, userId);

        const documents = retrievedData.documents?.[0] || [];

        const prompt = buildPrompt(message, documents);

        const reply = await askGemini(prompt);

        return reply;

    } catch (error) {

        console.error("Chat Service Error:", error);
        throw error;

    }
};