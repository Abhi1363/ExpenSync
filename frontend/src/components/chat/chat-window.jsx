import MessageBubble from "./messageBubble";
import "./chat.css";

export default function ChatWindow({ messages }) {
    return (
        <div className="ai-chat-container">
            <div className="chat-header">
                <div className="title">AI Assistant</div>
                <div className="status">Online</div>
            </div>

            <div className="messages" id="chat-messages">
                {(!messages || messages.length === 0) ? (
                    <div className="chat-empty">Start the conversation by typing a message.</div>
                ) : (
                    messages.map((msg, index) => (
                        <MessageBubble key={index} role={msg.role} text={msg.text} />
                    ))
                )}
            </div>
        </div>
    );
}