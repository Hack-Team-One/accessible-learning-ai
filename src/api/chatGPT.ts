import OpenAI from 'openai';
import { toast } from 'react-toastify';

const API_KEY: string | undefined = process.env.CHATGPT_API_KEY;
const CHATGPT_MODEL: string = process.env.CHATGPT_MODEL || 'gpt-3.5-turbo';
const MAX_TOKEN_LIMIT: number = parseInt(process.env.CHATGPT_MAX_TOKEN_LIMIT || '150');

const openai = new OpenAI({
  apiKey: API_KEY,
});

export const sendMessageToChatGPT = async (message: string) => {
  // VALIDATE THE TOKEN COUNT BEFORE SENDING THE MESSAGE
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: message }],
      model: CHATGPT_MODEL,
      max_tokens: MAX_TOKEN_LIMIT,
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

    return chatCompletion.choices[0];
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
