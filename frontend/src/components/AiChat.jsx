import ChatWindow from "./chat/chat-window";
import ChatInput from "./chat/chat-input";
import useChat from "../hooks/useChat";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Footer from "./footer";
import Sidebar from "./sidebar";
import "./chat/chat.css";

export default function AiChat() {
    const { messages, loading,setMessage, sendMessage } = useChat();
    const token = localStorage.getItem("token");


    useEffect(() => {
        axiosInstance
            .get("/userInfo", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .catch((err) => console.error("Error fetching profile:", err));
    }, [token]);

    const clearChat = () => {
        localStorage.removeItem("chatMessages");
        setMessage([]);
     }

    return (

        <div>
            <div style={{ display: "flex",width:"100%" }}>
                <Sidebar />
                <div className="ai-chat-wrapper" style={{width:"100%", display:"flex", flexDirection:"column", height: '100vh'}}>
                    <ChatWindow messages={messages} clearChat={clearChat} />
                    <div>
                        <ChatInput loading={loading} sendMessage={sendMessage} />
                    </div>
                </div>
            </div>
         <Footer>  </Footer>
        </div >

    );
}