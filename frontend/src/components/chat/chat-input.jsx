import { useState } from "react";

export default function ChatInput({ sendMessage, loading }) {

    const [message, setMessage] = useState("");
    const handleSend = () => {
        sendMessage(message);
        setMessage("");
    }

    return (

        <div
            style={{
                display: "flex",
                gap: 10,
                padding: 20,
                justifyContent: "end",
                alignItems: "center",
            }}
        >

            <textarea
                placeholder="Type your message..."
                rows={2}
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                style={{
                    padding: 12,
                    border: "1px solid #ccc",
                }}
            />

            <button className="send-button"
                disabled={loading}
                onClick={handleSend}
                style={{
                    padding: "12px 15px",
                     width: "10%", 
                }}
            >
                Send
            </button>

        </div>

    );
}