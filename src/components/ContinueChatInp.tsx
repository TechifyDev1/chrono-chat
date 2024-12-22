import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { auth, db } from "./firebase-config";
import { generateResponse } from "./handle-prompt";

const ContinueChatInp = ({ chatId }: { chatId: string }) => {
    const [message, setMessage] = useState<string>("");
    const userId = auth.currentUser?.uid;

    const handleMessage = async () => {
        if (message.trim() === "") return; // Prevent sending if the input is empty

        try {
            if (!userId) {
                console.error("User not authenticated.");
                return;
            }

            const userChatRef = doc(db, "userchats", userId);
            const chatSnapshot = await getDoc(userChatRef);
            const currentChat = chatSnapshot.data()?.[chatId];

            if (!currentChat || currentChat.length < 1) {
                console.error("Invalid chat data or empty chat history.");
                return;
            }

            const chatTitle = currentChat[0];
            const history = currentChat.slice(1);

            document.title = chatTitle;

            const aiHistory = history.map((item: any) => ({
                role: item.role,
                parts: item.parts || [],
            }));

            const aiRes = await generateResponse(message, aiHistory);
            if (!aiRes) {
                console.error("Failed to generate AI response.");
                return;
            }

            const userMessage = {
                role: "user",
                parts: [{ text: message }],
                id: `m_${Date.now()}`,
            };
            const aiMessage = {
                role: "model",
                parts: [{ text: aiRes }],
                id: `m_${Date.now() + 1}`,
            };

            await updateDoc(userChatRef, {
                [chatId]: [chatTitle, ...history, userMessage, aiMessage],
            });

            setMessage('');
        } catch (error) {
            console.error("Error in handleMessage:", error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleMessage();
        }
    };

    return (
        <Container
            className="p-2 shadow position-absolute fixed-bottom end-0 bottom-5"
            style={{
                maxWidth: "800px",
                borderRadius: "50px",
                backgroundColor: "rgb(31, 38, 66)",
                marginBottom: "6rem"
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
                            <FaPaperclip size={30} />
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
