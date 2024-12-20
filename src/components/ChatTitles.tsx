import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { auth, db } from "./firebase-config";

interface ChatTitleProps {
    id: string;
    title: string;
    onDelete: () => void;
    onClick: () => void; // New prop to handle sidebar toggle
}

const ChatTitle: React.FC<ChatTitleProps> = ({ id, title, onDelete, onClick }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            const chatRef = doc(db, "userchats", userId);

            await updateDoc(chatRef, {
                [id]: null,
            });

            onDelete();
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    const navigateToChat = (id: string) => {
        navigate(`/conversation/${id}`);
        onClick(); // Close the sidebar after navigating
    };

    return (
        <div
            className={`d-flex justify-content-between align-items-center p-3 shadow-lg title-container rounded mb-3 position-relative`}
            style={{ cursor: "pointer" }}
        >
            <span
                className="title"
                style={{ padding: "none", margin: "none" }}
                onClick={() => navigateToChat(id)}
            >
                {title}
            </span>
            <button
                className="d-flex p-1 justify-content-center align-items-center option-btn border-0 rounded background-none"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                }}
            >
                <FaTrash color="rgb(160, 160, 160)" />
            </button>

            {/* Confirm Delete Modal */}
            <ConfirmDelete
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={handleDelete}
            />
        </div>
    );
};

export default ChatTitle;
