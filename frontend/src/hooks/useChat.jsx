import {useState} from "react";
import {askAI} from "../services/ai.service";


export default function useChat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message) => {
          if(!message.trim()) return;
          
          const userMessage = { 
            role: "user",
            text: message
         };
          setLoading(true);
          setMessages((prevMessages) => [...prevMessages, userMessage]);

          try {
            const replyData = await askAI(message);
            const replyText = replyData?.reply ?? replyData?.message ?? String(replyData || "");

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "assistant",
                    text: replyText,
                },
            ]);
          } catch (error) {
            console.error("AI chat error:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "assistant",
                    text: "Sorry, I couldn't generate a response.",
                },
            ]);
          } finally {
            setLoading(false);
          }
    }
      return {
        messages,
        loading,
        sendMessage,
    };
}
