import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '@mui/base';
import TextInput from '../components/TextInput'; // Import the custom TextInput component
import {
  textColorPrimaryState,
  textFontPrimaryState,
  textSizePrimaryState,
} from '../states/textState';
import { sendMessageToChatGPT } from '../api/chatGPT';

const CHATGPT_MODEL: string = process.env.NEXT_PUBLIC_CHATGPT_MODEL || 'gpt-3.5-turbo';

const AccessibleChat: React.FC = () => {
  const [textColorPrimary, setTextColorPrimary] = useRecoilState(textColorPrimaryState);
  const [textFontPrimary, setTextFontPrimary] = useRecoilState(textFontPrimaryState);
  const [textSizePrimary, setTextSizePrimary] = useRecoilState(textSizePrimaryState);
  const [userInput, setUserInput] = useState('');
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  const handleSendMessage = async () => {

    // VALIDATE THE TOKEN COUNT
    
    try {
      const response = await sendMessageToChatGPT(userInput);
      if (response) setChatGPTResponse(response);
      else setChatGPTResponse('Something went wrong. Please try again.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegenerate = async () => {
    handleSendMessage();
  };

  return (
    <div className="flex flex-col h-[400px] border border-gray-400 rounded overflow-auto">
      <div className="flex-1 p-4">
        <TextInput value={chatGPTResponse} onChange={setChatGPTResponse} />
      </div>
      <div className="flex justify-between items-center p-4">
        <TextInput
          value={userInput}
          onChange={setUserInput}
          placeholder="Type your message..."
        />
        <Button
          className="bg-blue-500 text-white"
          disabled={userInput.trim().length < 3}
          onClick={handleSendMessage}
        >
          Send
        </Button>
        <Button
          className="border border-blue-500 text-blue-500"
          disabled={userInput.trim().length < 3}
          onClick={handleRegenerate}
        >
          Regenerate
        </Button>
      </div>
      <div className="text-center text-xs p-2">
        ChatGPT may produce inaccurate information about people, places, or facts. Using {CHATGPT_MODEL}.
      </div>
    </div>
  );
};

export default AccessibleChat;
