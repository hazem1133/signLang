const API_URL = 'http://mohamed3333.runasp.net/api/chatbot';

export const chatbotService = {
  sendMessage: async (message) => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId') || 'anonymous-user';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message, userId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send message');
      }

      const data = await response.json();
      console.log("API response:", data); 
      return data;

    } catch (error) {
      console.error("API error:", error.message);


      await new Promise(resolve => setTimeout(resolve, 1000));
      const lower = message.toLowerCase();

      if (lower.includes('hello') || lower.includes('hi')) {
        return { reply: "Hello! How can I help you with sign language today?" };
      } else if (lower.includes('help')) {
        return { reply: "I can help you learn sign language, our app features, or answer questions. What would you like to know?" };
      } else if (lower.includes('download')) {
        return { reply: "You can download our app from the App Store or Google Play. Just search for 'SignLang'!" };
      } else if (lower.includes('features')) {
        return { reply: "Our platform includes a sign translator, video lessons, quizzes, and cultural guides!" };
      } else if (lower.includes('numbers')) {
        return { reply: "Try learning numbers 1–10 using hand signs and flashcards." };
      } else if (lower.includes('colors')) {
        return { reply: "Start with red, blue, and green. Point to items as you sign!" };
      } else if (lower.includes('thank')) {
        return { reply: "You're welcome! Anything else I can assist with?" };
      } else if (lower.includes('sign') && lower.includes('language')) {
        return { reply: "Sign language uses hand shapes and facial expressions. Our app helps you learn step-by-step." };
      } else {
        return { reply: "Sorry! Try asking about features, ASL topics, or learning tips." };
      }
    }
  }
};
