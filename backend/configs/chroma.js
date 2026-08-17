import {ChromaClient} from "chromadb";

const chromaClient = new ChromaClient({
    path: process.env.CHROMA_URL
});