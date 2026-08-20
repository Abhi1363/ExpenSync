import { useEffect, useState } from "react";
import { askAI } from "../services/ai.service";

const STORAGE_KEY = "chatMessages";

export default function useChat() {

    // Load saved messages when component is created
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem(STORAGE_KEY);

        return savedMessages
            ? JSON.parse(savedMessages)
            : [];
    });

    const [loading, setLoading] = useState(false);

    // Save messages whenever they change
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(messages)
        );
    }, [messages]);


    const sendMessage = async (message) => {

        if (!message.trim()) return;

        const userMessage = {
            role: "user",
            text: message
        };

        // Add user message
        setMessages((prevMessages) => [
            ...prevMessages,
            userMessage
        ]);

        setLoading(true);

        try {

            const replyData = await askAI(message);

            const replyText =
                replyData?.reply ??
                replyData?.message ??
                String(replyData || "");

            // Add AI response
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "assistant",
                    text: replyText
                }
            ]);

        } catch (error) {

            console.error("AI chat error:", error);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "assistant",
                    text: "Sorry, I couldn't generate a response."
                }
            ]);

        } finally {

            setLoading(false);

        }
    };

    return {
        messages,
        loading,
        setMessage: setMessages,
        sendMessage
    };
}