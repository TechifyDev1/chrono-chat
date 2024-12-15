import { CSSProperties } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Import Google Icon from React Icons
import { Link } from "react-router-dom";

const SignIn = () => {
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
                <img src="/logIn.png" alt="" style={{ width: '50%', objectFit: 'cover' }} />
                <Card.Body>
                    <h2 style={styles.title}>SignIn to ChronoChat</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label style={styles.label}>Email</Form.Label>
                            <Form.Control
                                placeholder="Enter your email"
                                type="email"
                                style={styles.input}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={styles.label}>Password</Form.Label>
                            <Form.Control
                                style={styles.input}
                                placeholder="Enter your password"
                                type="password"
                            />
                        </Form.Group>
                        <Button
                            style={styles.button}
                            className=""
                            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.currentTarget.style.backgroundColor =
                                    styles.buttonHover.backgroundColor!;
                            }}
                            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.currentTarget.style.backgroundColor =
                                    styles.button.backgroundColor!;
                            }}
                        >
                            Sign In
                        </Button>
                        <Button style={styles.googleButton} className="mt-3">
                            <FcGoogle size={20} className="me-2" />
                            Sign in with Google
                        </Button>
                    </Form>
                    <div className="mt-3">Don't have an account? <Link to='/signup' className="text-decoration-none text-white">Sign up</Link></div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SignIn;
