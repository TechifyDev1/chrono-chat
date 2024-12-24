import { onAuthStateChanged } from "firebase/auth";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import Conversation from "./components/Conversation";
import { auth } from "./components/firebase-config";
import Settings from "./components/Settings";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";

const App = () => {
  const [userLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user); // `true` if user is logged in, otherwise `false`
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  if (userLoggedIn === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0a0f23",
        }}
      >
        <Spinner
          animation="grow"
          style={{
            width: "3rem",
            height: "3rem",
            color: "rgb(68, 56, 208)",
          }}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userLoggedIn ? <ChatPage /> : <SignUp />} />
        <Route path="/signup" element={userLoggedIn ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/signin" element={userLoggedIn ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/conversation/:id?" element={userLoggedIn ? <Conversation /> : <SignUp />} />
        <Route path="/settings" element={userLoggedIn ? <Settings /> : <Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
