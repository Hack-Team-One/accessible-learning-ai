import { toast } from 'react-toastify';
import { Message } from '../types';
import OpenAI from 'openai';
import { encode } from 'gpt-3-encoder';

export { CHATGPT_MODEL, MAX_TOKEN_LIMIT } from '../pages/api/chatGPT';

export const countTokens = (text: string): number => {
  const encoded = encode(text);
  return encoded.length;
};

export const sendMessageToChatGPT = async (messages: Message[]) => {
  try {
    const response = await fetch('/api/chatGPT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error);
    
    if (error instanceof OpenAI.BadRequestError) {
        toast.error('Bad Request');
      } else if (error instanceof OpenAI.AuthenticationError) {
        toast.error('Authentication Error');
      } else if (error instanceof OpenAI.PermissionDeniedError) {
        toast.error('Permission Denied');
      } else if (error instanceof OpenAI.NotFoundError) {
        toast.error('Not Found');
      } else if (error instanceof OpenAI.UnprocessableEntityError) {
        toast.error('Unprocessable Entity');
      } else if (error instanceof OpenAI.RateLimitError) {
        toast.error('Rate Limit Exceeded');
      } else if (error instanceof OpenAI.InternalServerError) {
        toast.error('Internal Server Error');
      } else if (error instanceof OpenAI.APIConnectionError) {
        toast.error('API Connection Error');
      } else {
        toast.error('An unexpected error occurred');
      }

    throw error;
  }
};
