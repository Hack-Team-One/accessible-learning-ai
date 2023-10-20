import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'gpt-3-encoder';
import { Message } from '../../types';

const countTokensInText = (text: string): number => {
  const encoded: number[] = encode(text);
  return encoded.length;
};

export default function countTokens (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages }: { messages: Message[] } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const totalTokens = messages.reduce((acc: number, message: Message) => acc + countTokensInText(message.content), 0);

  return res.json({ totalTokens });
};
