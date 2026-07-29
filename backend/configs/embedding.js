import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai";

export const embeddings = new GoogleGenerativeAIEmbeddings({
    model:"text-embedding-001",
    apiKey:process.env.GEMINI_API_KEY,
});