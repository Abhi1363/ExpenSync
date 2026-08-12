import "./chat.css";

export default function MessageBubble({ role, text }) {
  const isUser = role === "user";
  const avatarText = isUser ? "U" : "AI";

  return (
    <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
      <div className="avatar">{avatarText}</div>
      <div className="bubble">{text}</div>
    </div>
  );
}