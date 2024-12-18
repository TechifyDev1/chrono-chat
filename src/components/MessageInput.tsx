import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase-config";
import { generateResponse, generateTitle } from "./handle-prompt";

const MessageInput = () => {
    const [conversationId, setConversationId] = useState('');
    const [aiChat, setAiChat] = useState<any>();
    const [message, setMessage] = useState<string>('');
    const [chatTitle, setChatTitle] = useState<any>();
    const navigate = useNavigate();
    const handleMessage = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;
            const newId = `c-${Date.now()}`;
            const aiRes = await generateResponse(message);
            const title = await generateTitle(aiRes);
            setAiChat(aiRes);
            setChatTitle(title);
            const userMes = {
                role: "user",
                parts: [{ text: message }],
                id: `c_${Date.now()}`,
            }
            const aiMes = {
                role: "model",
                parts: [{ text: aiChat }],
                id: `c_${Date.now()}`,
            }
            const userChatRef = doc(db, 'userchats', userId);

            await updateDoc(userChatRef, {
                [newId]: [title, userMes, aiMes]
            });
            setConversationId(newId);
            navigate(`/conversation/${conversationId}`);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Container className="p-3 shadow position-absolute bottom-0 start-0 end-0 mb-3" style={{ maxWidth: '800px', borderRadius: '50px', backgroundColor: 'rgb(31, 38, 66)' }}>
            <Row>
                <Col>
                    <InputGroup className="d-flex justify-content-between">
                        <Button variant="outline-secondary" className="d-flex align-items-center" style={{ borderRadius: '50%', border: 'none', background: 'none' }}>
                            <FaPaperclip size={30} />
                        </Button>
                        <Form.Control type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="custom-input" placeholder="Send a message..." style={{ borderRadius: '15px', background: 'none', border: 'none', outline: 'none', color: 'rgb(160, 160, 160)' }} />
                        <Button onClick={handleMessage} variant="primary" className="d-flex align-items-center" style={{ borderRadius: '50%', border: 'none', background: 'none' }}>
                            <FaPaperPlane size={30} color="rgb(160, 160, 160)" />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <style>
                {`
                .custom-input::placeholder
                    {
                        color: rgb(160, 160, 160);
                        font-size: 20px;
                    }
                `}
            </style>
        </Container>
    );
}

export default MessageInput;
