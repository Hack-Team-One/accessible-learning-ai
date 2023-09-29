import { toast } from 'react-toastify';
import { countTokens, MAX_TOKEN_LIMIT } from './index';

export const validateMessages = (messages) => {
  const totalTokens = messages.reduce((acc, message) => acc + countTokens(message.content), 0);
  
  if (totalTokens > MAX_TOKEN_LIMIT) {
    toast.error('Token limit exceeded for chat history! Please refresh the page to start a new conversation.');
  }
}
