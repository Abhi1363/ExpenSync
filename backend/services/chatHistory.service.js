import ChatHistory from "../models/chatHistory.js";

export const saveMessage = async (userId, role, message) => {
    return await ChatHistory.create({
         userId, role, message
         });
}


export const getChatHistory = async (userId,limit = 10) => {
    const messages = await ChatHistory.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

    return messages.reverse();
}