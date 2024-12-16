import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import ChatTitle from "./ChatTitles";
import './SideBar.css';

const SideBar: React.FC = () => {
    return (
        <nav className="side-bar position-fixed left-0 top-0 d-flex flex-column px-3">
            <div className="d-flex justify-content-between align-items-center p-2 mb-4">
                <button className="close-side-bar">
                    <AiOutlineClose style={{ color: 'rgb(160, 160, 160)' }} />
                </button>
                <h2 className="brand fw-normal text-white">Chrono</h2>
                <button className="new-chat-icon">
                    <FaPlus style={{ color: 'rgb(160, 160, 160)' }} />
                </button>
            </div>
            <ChatTitle />
            <ChatTitle />
            <ChatTitle />
            <ChatTitle />
        </nav>
    );
}

export default SideBar;
