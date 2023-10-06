import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { countAllTokens } from '../../utils';
import { Message } from '../../types';

export const CHATGPT_MODEL: string = process.env.NEXT_PUBLIC_CHATGPT_MODEL || 'gpt-3.5-turbo';
export const MAX_TOKEN_LIMIT: number = parseInt(process.env.NEXT_PUBLIC_CHATGPT_MAX_TOKEN_LIMIT || '150');
const API_KEY: string | undefined = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // keep this private

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function chatGPT (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { messages }: { messages: Message[] } = req.body;

  const totalTokens: number = await countAllTokens(messages);
  console.log('totalTokens:', totalTokens)

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
