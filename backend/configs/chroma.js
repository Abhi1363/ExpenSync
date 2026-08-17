import {ChromaClient} from "chromadb";

export const chromaClient = new ChromaClient({
    path: process.env.CHROMA_URL
});