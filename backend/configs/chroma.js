import {ChromaClient} from "chromadb";

console.log("CHROMA_URL:", process.env.CHROMA_URL);

export const chromaClient = new ChromaClient({
    path: process.env.CHROMA_URL
});