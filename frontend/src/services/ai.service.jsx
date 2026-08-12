import axiosInstance from "../utils/axiosInstance";

export const askAI = async (message) => {
    const response = await axiosInstance.post("/ai/chat", { message });
    return response.data;
};