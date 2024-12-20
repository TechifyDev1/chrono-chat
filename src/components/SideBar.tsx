import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ChatTitle from "./ChatTitles";
import { auth, db } from "./firebase-config";
import "./SideBar.css";

interface Chat {
    id: string;
    title: string;
}

interface ChildProps {
    onButtonClick: () => void;
    navState?: boolean;
}

const SideBar: React.FC<ChildProps> = ({ onButtonClick, navState }) => {
    const [titles, setTitles] = useState<Chat[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const chatRef = doc(db, "userchats", userId);

        // Real-time listener with onSnapshot
        const unsubscribe = onSnapshot(chatRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                const chatTitles = Object.entries(data)
                    .filter(([_, value]) => value !== null)
                    .map(([id, value]) => {
                        const title = Array.isArray(value) ? value[0] : "Untitled Chat";
                        return { id, title };
                    });

                setTitles(chatTitles);
            } else {
                console.log("No chat titles found.");
                setTitles([]);
            }
        });

        return () => unsubscribe();
    }, []);
    const handleNewChat = () => {
        navigate('/');
    }
    const refreshTitles = () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const chatRef = doc(db, "userchats", userId);

        onSnapshot(chatRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                // Map and filter out null chats
                const chatTitles = Object.entries(data)
                    .filter(([_, value]) => value !== null) // Exclude null values
                    .map(([id, value]) => {
                        const title = Array.isArray(value) ? value[0] : "Untitled Chat";
                        return { id, title };
                    });

                setTitles(chatTitles);
            } else {
                setTitles([]);
            }
        });
    };

    return (
        <nav className="side-bar position-fixed left-0 top-0 d-flex flex-column px-3" style={{ transform: navState ? 'translateX(0)' : 'translateX(-100)' }}>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4">
                <button className="close-side-bar" onClick={onButtonClick}>
                    <AiOutlineClose style={{ color: "rgb(160, 160, 160)" }} />
                </button>
                <h2 className="brand fw-normal text-white">Chrono</h2>
                <button className="new-chat-icon" onClick={() => handleNewChat()}>
                    <FaPlus style={{ color: "rgb(160, 160, 160)" }} />
                </button>
            </div>
            {titles.length > 0 ? (
                titles.map((chat) => (
                    <ChatTitle
                        key={chat.id}
                        id={chat.id}
                        title={chat.title}
                        onDelete={refreshTitles}
                    />
                ))
            ) : (
                <p className="text-white">No chats available.</p>
            )}
        </nav>
    );
};

export default SideBar;
