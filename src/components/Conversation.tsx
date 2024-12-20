import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "./Chat";
import ContinueChatInp from "./ContinueChatInp";
import { auth, db } from "./firebase-config";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Conversation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = auth.currentUser?.uid;
    const [conv, setConv] = useState<any[]>([]); // To store chat history
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);

    useEffect(() => {
        if (!id || !userId) {
            navigate('/');
            return;
        }

        const chatRef = doc(db, "userchats", userId);

        const unsubscribe = onSnapshot(chatRef, (docSnap) => {
            if (!docSnap.exists()) {
                console.error("User chat document does not exist.");
                navigate('/');
                return;
            }

            const data = docSnap.data();
            const currentChatMessages = data?.[id];
            document.title = currentChatMessages[0];

            if (!currentChatMessages) {
                console.error("Chat not found or no messages for this ID.");
                navigate('/');
                return;
            }

            // Remove the first item (the title) and keep the rest
            const chatHistory = currentChatMessages.slice(1);

            // Ensure the chat history alternates between user and AI (even number)
            setConv(chatHistory);
        });

        return () => unsubscribe();
    }, [userId, id, navigate]);

    if (!id || !userId) return <div>Loading...</div>;

    const handleToggleNav = () => {
        setIsSideBarVisible((prevState) => !prevState);
    };

    return (
        <>
            {/* Sidebar */}
            <SideBar onButtonClick={handleToggleNav} navState={isSideBarVisible} />

            {/* Main Chat Area */}
            <div
                style={{
                    width: isSideBarVisible && window.innerWidth > 725 ? "75%" : "100%",
                    height: "100vh",
                    backgroundColor: "#0a0f23",
                    color: "rgb(160, 160, 160)",
                    position: "fixed",
                    right: "0",
                    transition: "width 0.5s",
                }}
            >
                <NavBar toggleSideBar={handleToggleNav} />

                <div className="chat-container container p-3">
                    {conv.length > 0 ? (
                        conv.map((message, index) => (
                            <Chat
                                key={index}
                                aiRes={message.role === "model" ? message.parts[0]?.text : ""}
                                userRes={message.role === "user" ? message.parts[0]?.text : ""}
                            />
                        ))
                    ) : (
                        <p>No messages yet. Start chatting!</p>
                    )}
                </div>

                <ContinueChatInp chatId={`${id}`} />
            </div>
        </>
    );
};

export default Conversation;
