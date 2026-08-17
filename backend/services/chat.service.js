import { retrieveExpenses } from "./retriever.service.js";
import { buildPrompt } from "./prompt.service.js";
import { askGemini } from "./gemini.service.js";
import { saveMessage, getChatHistory } from "./chatHistory.service.js";

export const chatWithAI = async (message, userId) => {
    try {
        // 1. Get previous conversation
        const history = await getChatHistory(userId, 10);

        // 2. Save user's message
        await saveMessage(userId, "user", message);

        // 3. Retrieve relevant expenses from ChromaDB
        const retrievedData = await retrieveExpenses(message, userId);

        const documents = retrievedData.documents?.[0] || [];

        // 4. Build prompt
        const prompt = buildPrompt(message, documents, history);

        const reply = await askGemini(prompt);
        // 6. Save AI response
        await saveMessage(
            userId,
            "assistant",
            reply
        );

        return reply;

    } catch (error) {

        console.error("Chat Service Error:", error);
        throw error;

    }
};