import React, { CSSProperties } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Import Google Icon
import { Link } from "react-router-dom";

const SignUpComponent: React.FC = () => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            backgroundColor: "#0a0f23",
            display: "flex",
            alignItems: 'center',
            height: '100vh'
        },
        card: {
            background: "none",
            color: "rgb(160, 160, 160)",
            padding: "2rem",
            textAlign: "center",
            width: '100%',
            height: '80%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '3rem'
        },
        button: {
            backgroundColor: "rgb(68, 56, 208)", // Ultraviolet Purple
            border: "none",
            transition: "0.3s ease",
            marginTop: '1rem',
            width: '90%'
        },
        googleButton: {
            backgroundColor: "rgb(160, 160, 160)", // White background
            color: "#000", // Black text
            border: "1px solid rgb(160, 160, 160)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
            width: '90%',
            margin: 'auto'
        },
        input: {
            backgroundColor: "#0a0f23",
            padding: '0.5rem',
            borderColor: 'rgb(160, 160, 160)',
            width: '90%',
            margin: 'auto'
        },
        title: {
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "rgb(160, 160, 160)",
            letterSpacing: "1px",
            textShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        },
        label: {
            color: "rgb(160, 160, 160)",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            display: "block",
            textAlign: "left",
            background: 'none',
            marginLeft: '2rem'
        },
        fileInput: {
            backgroundColor: 'rgb(160, 160, 160)'
        }
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <img src="/user.png" alt="" style={{ width: '50%', objectFit: 'cover' }} />
                <Card.Body style={{ width: '30%' }}>
                    <h2 style={styles.title}>SignUp to ChronoChat</h2>
                    <Form>
                        <Form.Group controlId="formBasicUsername" className="mb-3">
                            <Form.Label style={styles.label}>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                style={styles.input}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label style={styles.label}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                style={styles.input}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label style={styles.label}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                style={styles.input}
                            />
                        </Form.Group>


                        <Button
                            style={styles.button}
                            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                                if (styles.buttonHover.backgroundColor) {
                                    e.currentTarget.style.backgroundColor =
                                        styles.buttonHover.backgroundColor;
                                }
                            }}
                            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                                if (styles.button.backgroundColor) {
                                    e.currentTarget.style.backgroundColor =
                                        styles.button.backgroundColor;
                                }
                            }}
                        >
                            Sign up
                        </Button>

                        <span style={{ display: 'inline-block', height: '1px', background: 'rgb(160, 160, 160)', width: '90%' }}></span>

                        {/* Google Sign-Up Button */}
                        <Button style={styles.googleButton} className="mt-3">
                            <FcGoogle size={20} className="me-2" />
                            Sign up with Google
                        </Button>
                    </Form>
                    <div className="mt-3" style={{ color: 'rgb(160, 160, 160)' }}>Already have an account? <Link to='/signin' className='text-decoration-none text-white'>Sign in</Link></div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SignUpComponent;
