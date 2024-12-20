import React from "react";
import { FaClipboard } from "react-icons/fa";
import './Chat.css';

interface ChatProps {
    aiRes: string;
    userRes: string;
}

// Utility function to format text into HTML
const formatToHTML = (text: string): string => {
    // Replace code blocks with <pre><code> tags
    const codeBlockPattern = /```(.*?)```/gs;
    text = text.replace(codeBlockPattern, (_, code) => `<pre><code>${code.trim()}</code></pre>`);

    // Replace inline code with <code> tags
    const inlineCodePattern = /`([^`]+)`/g;
    text = text.replace(inlineCodePattern, (_, code) => `<code>${code}</code>`);

    // Replace bold text (e.g., **word**) with <strong> tags
    const boldTextPattern = /\*\*(.+?)\*\*/g;
    text = text.replace(boldTextPattern, '<strong>$1</strong>');

    // Replace markdown lists (*) with <ul><li> tags
    const listItemPattern = /^(\s*)\* (.+)$/gm;
    text = text.replace(listItemPattern, (_, spaces, item) => {
        const indentLevel = spaces.length / 2;
        const indent = '&nbsp;'.repeat(indentLevel * 4);
        return `${indent}<li>${item}</li>`;
    });

    // Wrap consecutive <li> elements in <ul>
    text = text.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

    // Replace headings (e.g., ###, ##, #) with corresponding <h1>, <h2>, <h3>
    text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Replace line breaks with <br> for plain text
    text = text.replace(/\n/g, '<br>');

    return text;
};


const Chat: React.FC<ChatProps> = ({ aiRes, userRes }) => {
    const formattedAiRes = formatToHTML(aiRes);

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
