import axios from 'axios';

const CHATGPT_API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions'; // This is an example endpoint; replace with the appropriate endpoint if different.
const API_KEY = 'YOUR_CHATGPT_API_KEY';

const axiosInstance = axios.create({
  baseURL: CHATGPT_API_ENDPOINT,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const sendMessageToChatGPT = async (message: string) => {
  try {
    const response = await axiosInstance.post('', {
      prompt: message,
      max_tokens: 150, // Adjust as needed
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error);
    throw error;
  }
};
