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
    const chatSession = model.startChat({ history: conversation });
    const result = await chatSession.sendMessage(message);
    console.log(result.response.text());
    return result.response.text();
  } catch (e: any) {
    console.log(e);
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
