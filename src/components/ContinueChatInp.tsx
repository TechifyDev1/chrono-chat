import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { auth, db } from "./firebase-config";
import { generateResponse } from "./handle-prompt";

const ContinueChatInp = ({ chatId }: { chatId: string }) => {
    const [aiChat, setAiChat] = useState<any>('');
    const [message, setMessage] = useState<string>('');
    const [chatTitle, setChatTitle] = useState<string>('');
    const userId = auth.currentUser?.uid;

    const handleMessage = async () => {
        try {
            if (!userId) {
                console.error("User not authenticated.");
                return;
            }

            // Generate AI Response
            const aiRes = await generateResponse(message);
            setAiChat(aiRes);

            const userMes = {
                role: "user",
                parts: [{ text: message }],
            };
            const aiMes = {
                role: "model",
                parts: [{ text: aiRes }], // Use aiRes instead of aiChat
            };

            // Fetch Existing Chat Data
            const userChatRef = doc(db, "userchats", userId);
            const allChat = await getDoc(userChatRef);
            const currentChat = allChat.data()?.[chatId];

            if (currentChat && currentChat.length > 0) {
                setChatTitle(currentChat[0]); // Assume first item is the title
            } else {
                console.error("No chat found for the given chatId.");
                return;
            }

            const history = currentChat.slice(1); // Exclude title if necessary
            const aiHistory = history.map((item: any) => ({ ...item }));

            // Uncomment for Firestore Updates
            await updateDoc(userChatRef, {
                [chatId]: [chatTitle, userMes, aiMes, ...aiHistory],
            });
        } catch (e) {
            console.error("Error in handleMessage:", e);
        }
    };

    return (
        <Container className="p-3 shadow position-absolute bottom-0 start-0 end-0 mb-3" style={{ maxWidth: '800px', borderRadius: '50px', backgroundColor: 'rgb(31, 38, 66)' }}>
            <Row>
                <Col>
                    <InputGroup className="d-flex justify-content-between">
                        <Button variant="outline-secondary" className="d-flex align-items-center" style={{ borderRadius: '50%', border: 'none', background: 'none' }}>
                            <FaPaperclip size={30} />
                        </Button>
                        <Form.Control
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="custom-input"
                            placeholder="Send a message..."
                            style={{
                                borderRadius: '15px',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                color: 'rgb(160, 160, 160)',
                            }}
                        />
                        <Button onClick={handleMessage} variant="primary" className="d-flex align-items-center" style={{ borderRadius: '50%', border: 'none', background: 'none' }}>
                            <FaPaperPlane size={30} color="rgb(160, 160, 160)" />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <style>
                {`
                .custom-input::placeholder {
                    color: rgb(160, 160, 160);
                    font-size: 20px;
                }
                `}
            </style>
        </Container>
    );
};

export default ContinueChatInp;
