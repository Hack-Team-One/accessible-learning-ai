import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { countTokens } from '../../utils';

export const CHATGPT_MODEL: string = process.env.CHATGPT_MODEL || 'gpt-3.5-turbo';
export const MAX_TOKEN_LIMIT: number = parseInt(process.env.CHATGPT_MAX_TOKEN_LIMIT || '150');
const API_KEY: string | undefined = process.env.OPENAI_API_KEY; // keep this private

const openai = new OpenAI({
  apiKey: API_KEY
});

const chatGPT = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { messages } = req.body;

  const totalTokens = messages.reduce((acc, message) => acc + countTokens(message.content), 0);

  if (totalTokens > MAX_TOKEN_LIMIT) {
    return res.status(400).json({ error: 'Token limit exceeded' });
  }

  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: messages,
      model: CHATGPT_MODEL,
      max_tokens: MAX_TOKEN_LIMIT,
      temperature: 0.6,
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

    return res.json({ content: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

export default chatGPT;
