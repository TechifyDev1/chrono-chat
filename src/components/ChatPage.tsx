import MessageInput from "./MessageInput";
import NavBar from "./NavBar";
import NoMessage from "./NoMessage";

const ChatPage = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: "#0a0f23", color: "rgb(160, 160, 160)" }}>
            <NavBar />
            <NoMessage />
            <MessageInput />
        </div>
    )
}

export default ChatPage;
