import React from "react";
import { FaClipboard } from "react-icons/fa";
import './Chat.css';

interface ChatProps {
    aiRes: string;
    userRes: string;
}

const Chat: React.FC<ChatProps> = ({ aiRes, userRes }) => {
    const handleCopyResponse = () => {
        navigator.clipboard.writeText(aiRes)
            .then(() => {
                console.log('message copied')
            })
            .catch((error) => {
                console.error("error copying the message", error);
            })
    }
    return (
        <>
            <div className={`w-100 ${userRes === '' ? 'd-none' : 'd-flex'} flex-column align-items-end my-4`}>
                <div className="human-response rounded-5 p-3">
                    {userRes}
                </div>
            </div>
            <div className={`ai-response p-3 ${aiRes === '' ? 'd-none' : ''}`}>
                <div className="d-flex gap-3">
                    <img
                        src="/Hannah.png"
                        alt=""
                        style={{
                            height: '3rem',
                            width: '3rem',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                    <div>
                        <p className="response" style={{ width: '70%' }}>
                            {aiRes}
                        </p>
                        <button className="copy-btn" onClick={handleCopyResponse}>
                            <FaClipboard />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;


