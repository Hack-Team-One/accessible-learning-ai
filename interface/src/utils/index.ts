import { toast } from 'react-toastify';
import { Message } from '../types';
import OpenAI from 'openai';

export const CHATGPT_MODEL: string = process.env.NEXT_PUBLIC_CHATGPT_MODEL || 'gpt-3.5-turbo';
export const MAX_TOKEN_LIMIT: number = parseInt(process.env.NEXT_PUBLIC_CHATGPT_MAX_TOKEN_LIMIT || '150');

// Helper function to get the base URL
const getBaseUrl = () => {
  return window.location.href.includes('localhost:3000') ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

const BASE_URL = getBaseUrl();

export const countAllTokens = async (messages: Message[]) => {
  const response = await fetch(`${BASE_URL}/api/countTokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });
  
  const data = await response.json();
  const totalTokens = data.totalTokens;
  return totalTokens;
}  

export const sendMessageToChatGPT = async (messages: Message[]) => {
  try {
    const response = await fetch(`${BASE_URL}/api/chatGPT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        CHATGPT_MODEL,
        MAX_TOKEN_LIMIT,
      }),
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
