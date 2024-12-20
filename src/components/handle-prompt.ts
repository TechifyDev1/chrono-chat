import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const activateAi = new GoogleGenerativeAI(apiKey);
const model = activateAi.getGenerativeModel({ model: 'gemini-pro' });

interface Message {
  role: string;
  parts: { text: string }[];
}

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
  try {
    // Check if the user is asking about the creator
    if (isCreatorQuestion(message)) {
      return "I was created by Abdulqudus, also known as TechifyDev or Alqudusy. He's an aspiring full-stack developer with a strong passion for backend development. Even though he's still honing his skills, he already thinks and works like a backend pro!";
    }

    const formattedMessage = `${message}`;
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
