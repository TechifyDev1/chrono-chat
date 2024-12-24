import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const activateAi = new GoogleGenerativeAI(apiKey);
const model = activateAi.getGenerativeModel({ model: 'gemini-pro' });

interface Message {
  role: string;
  parts: { text: string }[];
}

const userId = auth.currentUser?.uid;
let name: string = "";
let email: string = "";
let memory: string = "";
const fetchMemory = async () => {
  if (!userId) return;
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      name = userData.name || "Unknown User";
      email = userData.email || "No Email Provided";
      memory = userData.memory || "No Memory Available";
      return userData;
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

let userMemory: Message[] = [];

const initializeUserMemory = async () => {
  const userData = await fetchMemory();
  if (userData) {
    userMemory = [
      { role: "user", parts: [{text: `Hello, I'm ${name} and my email is ${email} and make sure you remember ${memory}`}]},
      { role: "model", parts: [{ text: "Hello, I'm ChronoChat, a chatbot. I can help you with a variety of topics. Feel free to ask me anything!",}]},
    ];
  }
};



// Helper function to check for creator-related questions Chatgpt generate this one!!!
const isCreatorQuestion = (input: string): boolean => {
  const creatorKeywords = [
    /who.*(created|built|made).*you/i,
    /your.*(creator|builder|developer)/i,
    /who.*(designed|developed).*you/i,
    /who.*(invented|programmed).*you/i,
    /who.*made.*you/i
  ];
  return creatorKeywords.some((regex) => regex.test(input));
};

export const generateResponse = async (message: string, conversation: Message[] = []) => {
  initializeUserMemory();
  try {
    // Check if the user is asking about the creator
    if (isCreatorQuestion(message)) {
      return "I was created by Abdulqudus, also known as TechifyDev or Alqudusy. He's an aspiring full-stack developer with a strong passion for backend development. Even though he's still honing his skills, he already thinks and works like a backend pro!";
    }

    const formattedMessage = `${message}`;
    const updatedConversation = [...conversation, ...userMemory];

    const chatSession = model.startChat({ history: updatedConversation });
    const result = await chatSession.sendMessage(formattedMessage);

    const responseText = result.response.text();

    return responseText;
  } catch (e: any) {
    console.error("Error generating response:", e);
    throw e; // Ensure the error propagates if needed
  }
};

export const generateTitle = async (message: string | undefined) => {
  try {
    const chatSession = model.startChat();
    const result = await chatSession.sendMessage(`give a short title not more than three words for this: ${message}`);
    return result.response.text()
  } catch (e: any) {
    console.log(e);
  }
}
