import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, TextareaAutosize } from '@mui/base';
import { sendMessageToChatGPT, CHATGPT_MODEL } from '../api/chatGPT';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import { Message } from '../types';
import useDynamicStyles from '@/hooks/useDynamicStyles';

const AccessibleChat: React.FC = () => {
  const {
    textColor,
    textFont,
    textSize,
    textStyles,
    bgStyles,
    borderStyles,
  } = useDynamicStyles();


  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // Maintains conversation history

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, includeUserInput: boolean = true) => {
    e.preventDefault();
    
    let newMessages = [...messages];
    if (includeUserInput) {
      newMessages.push({ role: 'user', content: userInput });
    }
  
    try {
      const response = await sendMessageToChatGPT(newMessages);
      if (response) {
        setMessages([...newMessages, { role: 'system', content: response }]);
        setUserInput('');
      } else {
        setMessages([...newMessages, { role: 'system', content: 'Something went wrong. Please try again.' }]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const handleRegenerate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const updatedMessages: Message[] = messages.slice(0, -2); // Remove last response
    setMessages(updatedMessages);

    handleSubmit(e as any, false);
  };
  

  return (
    <form className="h-screen w-full justify-center items-center mx-2 flex flex-col gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl" onSubmit={handleSubmit}>
      <div id="responseDiv" className="flex-1 w-full overflow-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            {message.content}
          </div>
        ))}
        {messages.length > 0 && <Button
          className={`${textStyles.primary} ${bgStyles.buttonPrimary} ${borderStyles.primary} button-centered float-right p-1 `}
          disabled={messages.length < 1}
          onClick={handleRegenerate}
          style={{ zIndex: 1 }}
        >
          <LoopIcon /> Regenerate
        </Button>}
      </div>
      <div id="promptDiv" className="flex w-full justify-center items-center gap-3">
        <div className="flex flex-col w-full relative border border-black/10 dark:border-gray-900/50 dark:text-white rounded-xl shadow-xs dark:shadow-xs dark:bg-gray-700 bg-white">
          <TextareaAutosize
            id="prompt-textarea"
            value={userInput}
            maxRows={10}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Send a message..."
            className={`${textStyles.primary} w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 pl-3 md:pl-4 overflow-y-auto`}
          />
          <Button
            className={`${textStyles.primary} ${bgStyles.buttonSecondary} button-centered absolute p-1 min-w-120 md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 transition-colors disabled:opacity-40`}
            disabled={userInput.trim().length < 2}
            type="submit"
            style={{ zIndex: 1 }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
      <p className={`${textSize.text_xs} text-gray-500 mb-3`}>
        ChatGPT may produce inaccurate information about people, places, or facts. <u>ChatGPT model: {CHATGPT_MODEL}</u>
      </p>
    </form>
  );
};

export default AccessibleChat;
