import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { countAllTokens } from '../../utils';
import { Message } from '../../types';

type ChatGPTProps = {
  messages: Message[];
  CHATGPT_MODEL: string;
  MAX_TOKEN_LIMIT: number;
};

export default async function chatGPT (req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { 
    messages,
    CHATGPT_MODEL,
    MAX_TOKEN_LIMIT,
  }: ChatGPTProps = req.body;

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const totalTokens: number = await countAllTokens(messages);

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
