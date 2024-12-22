import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase-config";
import { generateResponse, generateTitle } from "./handle-prompt";

const MessageInput = () => {
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleMessage = async () => {
        if (message.trim() === "") return; // Prevent sending if the input is empty

        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            // Generate a new conversation ID and AI response
            const newId = `c_${Date.now()}`;
            const aiRes = await generateResponse(message);
            const title = await generateTitle(aiRes);

            const userMes = {
                role: "user",
                parts: [{ text: message }],
            };
            const aiMes = {
                role: "model",
                parts: [{ text: aiRes }],
            };

            // Update Firestore with the new conversation
            const userChatRef = doc(db, "userchats", userId);
            await updateDoc(userChatRef, {
                [newId]: [title, userMes, aiMes],
            });

            navigate(`/conversation/${newId}`);

            setMessage("");
        } catch (e: any) {
            console.error("Error handling message:", e);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleMessage();
        }
    };

    return (
        <Container
            className="p-2 shadow position-fixed bottom-1 start-0 end-0 mb-3 m-auto"
            style={{
                maxWidth: "800px",
                borderRadius: "50px",
                backgroundColor: "rgb(31, 38, 66)",
            }}
        >
            <Row>
                <Col>
                    <InputGroup className="d-flex justify-content-between">
                        <Button
                            variant="outline-secondary"
                            className="d-flex align-items-center"
                            style={{ borderRadius: "50%", border: "none", background: "none" }}
                        >
                            <FaPaperclip size={20} />
                        </Button>
                        <Form.Control
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown} // Trigger message sending on Enter
                            className="custom-input"
                            placeholder="Send a message..."
                            style={{
                                borderRadius: "15px",
                                background: "none",
                                border: "none",
                                outline: "none",
                                color: "rgb(160, 160, 160)",
                            }}
                        />
                        <Button
                            onClick={handleMessage}
                            variant="primary"
                            className="d-flex align-items-center"
                            style={{ borderRadius: "50%", border: "none", background: "none" }}
                        >
                            <FaPaperPlane size={20} color="rgb(160, 160, 160)" />
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

export default MessageInput;
