import { chromaClient } from "../configs/chroma.js";
import { generateEmbedding } from "./embedding.service.js";
import { createExpenseDocument } from "./document.service.js";

const COLLECTION_NAME = "expenses";

export async function getExpenseCollection() {
    return await chromaClient.getOrCreateCollection({
        name: COLLECTION_NAME,
        embeddingFunction: null,
    });
}

export const storeExpenseVector = async (expense) => {
    const collection = await getExpenseCollection();

    const document = createExpenseDocument(expense);

    console.log("Document:");
    console.log(document);

    // Generate embedding using Hugging Face
    const embedding = await generateEmbedding(document);

    const metadataDate =
        expense.date instanceof Date
            ? expense.date.toISOString()
            : expense.date;

    await collection.add({
        ids: [expense._id.toString()],
        documents: [document],
        embeddings: [embedding],
        metadatas: [
            {
                userId: expense.userId.toString(),
                category: expense.category,
                amount: expense.amount,
                date: metadataDate,
                description: expense.description,
            },
        ],
    });

    const data = await collection.get({
        include: ["documents", "metadatas"],
    });

    console.log(JSON.stringify(data, null, 2));
};

export async function deleteExpenseVector(expenseId) {
    const collection = await getExpenseCollection();

    await collection.delete({
        ids: [expenseId.toString()],
    });
}