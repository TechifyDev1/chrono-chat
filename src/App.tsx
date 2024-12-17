import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import Conversation from "./components/Conversation";
import { auth } from "./components/firebase-config";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";


const App = () => {
  const [userLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  onAuthStateChanged(auth, (user) => {
    if (user) setIsUserLoggedIn(true);
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userLoggedIn ? (<ChatPage />) : (<SignUp />)}></Route>
        <Route path="/signup" element={userLoggedIn ? (<Navigate to='/' />) : (<SignUp />)}></Route>
        <Route path="/signin" element={userLoggedIn ? (<Navigate to='/' />) : (<SignIn />)}></Route>
        <Route path="/conversation/:id?" element={userLoggedIn ?? (<Conversation />)}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
