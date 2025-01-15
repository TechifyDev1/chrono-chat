// Importing necessary functions from Firebase Firestore
import { doc, onSnapshot } from "firebase/firestore";
// Importing necessary functions and hooks from React
import React, { useEffect, useState } from "react";
// Import Spinner component from React-Bootstrap
import { Spinner } from 'react-bootstrap'; // Import Spinner from React-Bootstrap
// Importing icons from react-icons
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
// Importing useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";
// Importing ChatTitle component
import ChatTitle from "./ChatTitles";
// Importing Firebase authentication and database configuration
import { auth, db } from "./firebase-config";
// Importing CSS for the component
import "./SideBar.css";

// Defining the shape of a Chat object
interface Chat {
    id: string;
    title: string;
}

// Defining the shape of the props expected by the SideBar component
interface ChildProps {
    onButtonClick: () => void;
    navState?: boolean;
}

// Defining the SideBar component
const SideBar: React.FC<ChildProps> = ({ onButtonClick, navState }) => {
    // State to store chat titles
    const [titles, setTitles] = useState<Chat[]>([]);
    // State to track loading state
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Effect to fetch chat titles when the component mounts
    useEffect(() => {
        const userId = auth.currentUser?.uid; // Get the current user's ID
        if (!userId) return; // If no user is logged in, do nothing

        const chatRef = doc(db, "userchats", userId); // Reference to the user's chats document

        // Subscribe to real-time updates of the user's chats document
        const unsubscribe = onSnapshot(chatRef, (docSnap) => {
            setLoading(true); // Set loading to true when fetching
            if (docSnap.exists()) { // If the document exists
                const data = docSnap.data(); // Get the data

                // Extract chat titles from the data
                const chatTitles = Object.entries(data)
                    .filter(([_, value]) => value !== null) // Filter out null values
                    .map(([id, value]) => { // Map entries to chat titles
                        const title = Array.isArray(value) ? value[0] : "Untitled Chat"; // Use the first element as the title or "Untitled Chat"
                        return { id, title }; // Return the chat object
                    });

                setTitles(chatTitles); // Update the state with chat titles
            } else { // If the document doesn't exist
                console.log("No chat titles found."); // Log a message
                setTitles([]); // Set chat titles to an empty array
            }
            setLoading(false); // Set loading to false once the data is fetched
        });

        return () => unsubscribe(); // Unsubscribe from updates when the component unmounts
    }, []);

    // Function to handle creating a new chat
    const handleNewChat = () => {
        onButtonClick(); // Trigger the button click handler
        navigate('/'); // Navigate to the home page
    };

    // Function to refresh chat titles
    const refreshTitles = () => {
        const userId = auth.currentUser?.uid; // Get the current user's ID
        if (!userId) return; // If no user is logged in, do nothing

        const chatRef = doc(db, "userchats", userId); // Reference to the user's chats document

        // Subscribe to real-time updates of the user's chats document
        onSnapshot(chatRef, (docSnap) => {
            setLoading(true); // Set loading to true when fetching
            if (docSnap.exists()) { // If the document exists
                const data = docSnap.data(); // Get the data

                // Extract chat titles from the data
                const chatTitles = Object.entries(data)
                    .filter(([_, value]) => value !== null) // Filter out null values
                    .map(([id, value]) => { // Map entries to chat titles
                        const title = Array.isArray(value) ? value[0] : "Untitled Chat"; // Use the first element as the title or "Untitled Chat"
                        return { id, title }; // Return the chat object
                    });

                setTitles(chatTitles); // Update the state with chat titles
            } else { // If the document doesn't exist
                setTitles([]); // Set chat titles to an empty array
            }
            setLoading(false); // Set loading to false once the data is fetched
        });
    };

    return (
        // Main container for the sidebar
        <nav className={`side-bar ${navState ? "visible" : ""}`}>
            {/* Header section with close button and new chat button */}
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

            {/* Loading spinner or chat titles */}
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

// Exporting the SideBar component as the default export
export default SideBar;
