import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";

const App = () => {
  const [userLoggedIn, setIsUserLoggedIn] = useState<boolean>(true)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userLoggedIn ? (<ChatPage />) : (<SignUp />)}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
