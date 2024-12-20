import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap'; // Import Spinner from React-Bootstrap
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
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const navigate = useNavigate();

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const chatRef = doc(db, "userchats", userId);

        const unsubscribe = onSnapshot(chatRef, (docSnap) => {
            setLoading(true); // Set loading to true when fetching
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
            setLoading(false); // Set loading to false once the data is fetched
        });

        return () => unsubscribe();
    }, []);

    const handleNewChat = () => {
        onButtonClick();
        navigate('/');
    };

    const refreshTitles = () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const chatRef = doc(db, "userchats", userId);

        onSnapshot(chatRef, (docSnap) => {
            setLoading(true); // Set loading to true when fetching
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
                setTitles([]);
            }
            setLoading(false); // Set loading to false once the data is fetched
        });
    };

    return (
        <nav className={`side-bar ${navState ? "visible" : ""}`}>
            <div className="d-flex justify-content-between align-items-center p-2 mb-4">
                <button className="close-side-bar" onClick={onButtonClick}>
                    <AiOutlineClose
                        className="d-flex justify-content-center align-items-center"
                        style={{ color: "rgb(160, 160, 160)" }}
                    />
                </button>
                <h2 className="brand fw-normal text-white">Chrono</h2>
                <button
                    className="new-chat-icon d-flex justify-content-center align-items-center"
                    onClick={() => handleNewChat()}
                >
                    <FaPlus style={{ color: "rgb(160, 160, 160)" }} />
                </button>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="light" />
                </div>
            ) : (
                <>
                    {titles.length > 0 ? (
                        titles.map((chat) => (
                            <ChatTitle
                                key={chat.id}
                                id={chat.id}
                                title={chat.title}
                                onDelete={refreshTitles}
                                onClick={onButtonClick} // Pass the toggle function here
                            />
                        ))
                    ) : (
                        <p className="text-white">No chats available.</p>
                    )}
                </>
            )}
        </nav>
    );
};

export default SideBar;
