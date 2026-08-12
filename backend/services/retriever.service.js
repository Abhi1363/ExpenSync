import {getExpenseCollection} from  "./chroma.service.js";
import { generateEmbedding } from "./embedding.service.js";

export async function retrieveExpenses(query,userId){

    const collection = await getExpenseCollection();
    const embedding = await generateEmbedding(query);

    const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 5,
    where: {
          userId: String(userId)
    },
    include: ["documents", "metadatas"]
});

    return results;

}