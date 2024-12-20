import React from "react";
import { FaClipboard } from "react-icons/fa";
import './Chat.css';
import { markDownToHtml } from "./formatResponse";

interface ChatProps {
    aiRes: string;
    userRes: string;
}

const Chat: React.FC<ChatProps> = ({ aiRes, userRes }) => {
    const formattedAiRes = markDownToHtml(aiRes);

    const handleCopyResponse = () => {
        navigator.clipboard.writeText(aiRes)
            .then(() => {
                console.log('Message copied');
            })
            .catch((error) => {
                console.error("Error copying the message:", error);
            });
    };

    return (
        <>
            {/* User Response */}
            <div className={`w-100 ${userRes === '' ? 'd-none' : 'd-flex'} flex-column align-items-end my-4`}>
                <div className="human-response rounded-5 p-3">
                    {userRes}
                </div>
            </div>

            {/* AI Response */}
            <div className={`ai-response p-3 ${aiRes === '' ? 'd-none' : ''}`} style={{ width: '100%' }}>
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
                    <div style={{ width: '100%' }}>
                        <p
                            className="response"
                            style={{ width: '70%' }}
                            dangerouslySetInnerHTML={{ __html: formattedAiRes }}
                        />
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
