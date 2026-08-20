import { useEffect, useRef } from "react";
import MessageBubble from "./messageBubble";
import "./chat.css";

export default function ChatWindow({messages, clearChat}) {
        const messagesEndRef = useRef(null);
   useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="ai-chat-container">
            <div className="chat-header">
                <div className="title">AI Assistant</div>
                <div className="status-clear-container">
                    <div className="status">Online</div>
                    <div className="clearChat" onClick={clearChat}>Clear</div>
                </div>
            </div>

            <div className="messages" id="chat-messages">
                {(!messages || messages.length === 0) ? (
                    <div className="chat-empty">Start the conversation by typing a message.</div>
                ) : (
                    messages.map((msg, index) => (
                        <MessageBubble 
                          key={index} 
                          role={msg.role}
                          text={msg.text} 
                        />
                    ))
                )}
                {/* Invisible element at the bottom */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}