import React from "react";
import { FaTrash } from "react-icons/fa";
import './ChatTitle.css';

const ChatTitle: React.FC = () => {
    return (
        <div className="d-flex justify-content-between align-items-center p-3 shadow-lg title-container rounded mb-3 position-relative">
            <span className="title" style={{ padding: 'none', margin: 'none' }}>How to bake a bread</span>
            <button className="d-flex p-1 justify-content-center align-items-center option-btn border-0 rounded background-none">
                <FaTrash color="rgb(160, 160, 160)" />
            </button>
        </div>
    )
}

export default ChatTitle;
