import React from "react";
import { FaClipboard } from "react-icons/fa";
import './Chat.css';
const Chat: React.FC = () => {
    return (
        <>
            <div className="w-100 d-flex flex-column align-items-end my-4">
                <div className="human-response rounded-5 p-3">
                    Human Response. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
            </div>
            <div className="ai-response p-3">
                <div className="d-flex gap-3">
                    <img src="/Hannah.png" alt="" style={{ height: '3rem', width: '3rem', objectFit: 'cover', borderRadius: '50%' }} />
                    <div>
                        <p className="response" style={{ width: '70%' }}>Ai Response
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit veritatis recusandae debitis quisquam ipsa a nemo cupiditate nisi optio,
                            eum perspiciatis sed ratione est eligendi praesentium voluptas necessitatibus beatae tempore?
                        </p>
                        <button className="copy-btn">
                            <FaClipboard />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;
