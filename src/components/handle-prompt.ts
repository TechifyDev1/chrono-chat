import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const activateAi = new GoogleGenerativeAI(apiKey);
const model = activateAi.getGenerativeModel({ model: 'gemini-pro' });

interface Message {
  role: string;
  parts: { text: string }[];
}

export const generateResponse = async (message: string, conversation: Message[] = []) => {
  try {
    // Include instruction in the user's current message
    const formattedMessage = `${message}`;

    // Ensure conversation starts with a user message
    const updatedConversation = [...conversation];

    const chatSession = model.startChat({ history: updatedConversation });
    const result = await chatSession.sendMessage(formattedMessage);

    const responseText = result.response.text();
    console.log(responseText);

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
    console.log(result.response.text());
    return result.response.text()
  } catch (e: any) {
    console.log(e);
  }
}
