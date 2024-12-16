import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {

    return (
        <Container className="p-3 shadow position-absolute bottom-0 start-0 end-0 mb-3" style={{ maxWidth: '800px', borderRadius: '50px', backgroundColor: 'rgb(31, 38, 66)' }}>
            <Row>
                <Col>
                    <InputGroup className="d-flex justify-content-between">
                        <Button variant="outline-secondary" className="d-flex align-items-center" style={{ borderRadius: '50%', border: 'none', background: 'none' }}>
                            <FaPaperclip size={30} />
                        </Button>
                        <Form.Control type="text" className="custom-input" placeholder="Send a message..." style={{ borderRadius: '15px', background: 'none', border: 'none', outline: 'none', color: 'rgb(160, 160, 160)' }} />
                        <Button variant="primary" className="d-flex align-items-center" style={{ borderRadius: '50%', border: 'none', background: 'none' }}>
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
