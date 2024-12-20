import { useState } from "react";
import MessageInput from "./MessageInput";
import NavBar from "./NavBar";
import NoMessage from "./NoMessage";
import SideBar from "./SideBar";

const ChatPage = () => {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);

    const handleToggleNav = () => {
        setIsSideBarVisible((prevState) => !prevState);
    };

    return (
        <>
            <SideBar onButtonClick={handleToggleNav} navState={isSideBarVisible} />
            <div
                style={{
                    width: isSideBarVisible ? (window.innerWidth <= 725 ? "0" : "75%") : "100%",
                    height: "100vh",
                    backgroundColor: "#0a0f23",
                    color: "rgb(160, 160, 160)",
                    position: "fixed",
                    right: "0",
                    transition: "width 0.5s",
                }}
            >
                <NavBar toggleSideBar={handleToggleNav} />

                <div className="chat-container container p-3 d-flex justify-content-center align-items-center">
                    <NoMessage />
                </div>

                <MessageInput />
            </div>
        </>
    );
};

export default ChatPage;
