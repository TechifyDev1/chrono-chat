import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmDelete from "./ConfirmDelete";
import { auth, db } from "./firebase-config";

interface ChatTitleProps {
    id: string; // Unique ID for the chat
    title: string; // Title of the chat
    onDelete: () => void; // Callback to refresh the parent component after delete
}

const ChatTitle: React.FC<ChatTitleProps> = ({ id, title, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            const chatRef = doc(db, "userchats", userId);

            // Use updateDoc with the FieldValue.delete() to remove the specific chat
            await updateDoc(chatRef, {
                [id]: null, // Removes the field for the given chat ID
            });

            // Notify the parent to refresh the chat list
            onDelete();

            // Close the modal after deletion
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    return (
        <div
            className={`d-flex justify-content-between align-items-center p-3 shadow-lg title-container rounded mb-3 position-relative`}
            style={{ cursor: "pointer" }}
        >
            <span className="title" style={{ padding: "none", margin: "none" }}>
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
