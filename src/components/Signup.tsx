import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { ChangeEvent, CSSProperties, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Import Google Icon
import { Link } from "react-router-dom";
import { auth, db } from "./firebase-config";

const SignUpComponent: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false); // Track loading state

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
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '2rem',
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
    };

    const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        setLoading(true); // Start loading spinner
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const userId = user.uid;
            const userData = {
                userId,
                name,
                email
            };
            const userRef = doc(db, 'users', userId);
            const userChatRef = doc(db, 'userchats', userId);
            await setDoc(userChatRef, {});
            await setDoc(userRef, userData);
            console.log("User successfully signed up");
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                {/* Hide image in mobile view */}
                <img src="/user.png" alt="" className="d-none d-md-block" style={{ width: '50%', objectFit: 'cover' }} />
                <Card.Body style={{ width: '30%' }}>
                    <h2 style={styles.title}>SignUp to ChronoChat</h2>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group controlId="formBasicUsername" className="mb-3">
                            <Form.Label style={styles.label}>Username</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Enter your username"
                                style={styles.input}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label style={styles.label}>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                style={styles.input}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label style={styles.label}>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                style={styles.input}
                                required
                            />
                        </Form.Group>

                        {/* Button with spinner */}
                        <Button type="submit" style={styles.button} disabled={loading}>
                            {loading ? <Spinner animation="border" variant="light" size="sm" /> : "Sign up"}
                        </Button>

                        <span style={{ display: 'inline-block', height: '1px', background: 'rgb(160, 160, 160)', width: '90%' }}></span>

                        {/* Google Sign-Up Button */}
                        <Button style={styles.googleButton} className="mt-3">
                            <FcGoogle size={20} className="me-2" />
                            Sign up with Google
                        </Button>
                    </Form>
                    <div className="mt-3" style={{ color: 'rgb(160, 160, 160)' }}>
                        Already have an account? <Link to='/signin' className='text-decoration-none text-white'>Sign in</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SignUpComponent;
