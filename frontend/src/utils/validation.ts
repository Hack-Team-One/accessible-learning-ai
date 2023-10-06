import { toast } from 'react-toastify';
import { countAllTokens, MAX_TOKEN_LIMIT } from './index';
import { Message } from '../types';

export const validateMessages = async (messages: Message[]) => {
  const totalTokens: number = await countAllTokens(messages);
  
  if (totalTokens > MAX_TOKEN_LIMIT) {
    toast.error('Token limit exceeded for chat history! Please refresh the page to start a new conversation.');
  }
}
