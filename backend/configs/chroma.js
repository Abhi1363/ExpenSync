import {ChromaClient} from "chromadb";

console.log("CHROMA_URL:", process.env.CHROMA_URL);

const chromaUrl = new URL(process.env.CHROMA_URL || "http://localhost:8000");

export const chromaClient = new ChromaClient({
    ssl: chromaUrl.protocol === "https:",
    host: chromaUrl.hostname,
    port: Number(chromaUrl.port) || (chromaUrl.protocol === "https:" ? 443 : 80),
});