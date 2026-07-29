import { pipeline } from "@huggingface/transformers";

let extractor = null;

/**
 * Load the model only once.
 */
async function getExtractor() {
    if (!extractor) {
        console.log("Loading embedding model...");

        extractor = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );

        console.log("Embedding model loaded.");
    }

    return extractor;
}

export async function generateEmbedding(text) {
    const extractor = await getExtractor();

    const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}