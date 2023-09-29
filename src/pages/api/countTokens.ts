import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'gpt-3-encoder';
import { Message } from '../../types';

const countTokens = (text: string): number => {
  const encoded: number[] = encode(text);
  return encoded.length;
};

const countTokensApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages }: { messages: Message[] } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const totalTokens = messages.reduce((acc: number, message: Message) => acc + countTokens(message.content), 0);

  return res.json({ totalTokens });
};

export default countTokensApi;



