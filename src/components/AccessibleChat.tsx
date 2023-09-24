import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Box } from '@mui/base';
import TextInput from '../components/TextInput'; // Import the custom TextInput component
import {
  textColorPrimaryState,
  textFontPrimaryState,
  textSizePrimaryState,
} from '../states/textState';
import { sendMessageToChatGPT } from '../api/chatGPT';

const AccessibleChat: React.FC = () => {
  const [textColorPrimary, setTextColorPrimary] = useRecoilState(textColorPrimaryState);
  const [textFontPrimary, setTextFontPrimary] = useRecoilState(textFontPrimaryState);
  const [textSizePrimary, setTextSizePrimary] = useRecoilState(textSizePrimaryState);
  const [userInput, setUserInput] = useState('');
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await sendMessageToChatGPT(userInput);
      setChatGPTResponse(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegenerate = async () => {
    handleSendMessage();
  };

  return (
    <Box className="flex flex-col h-[400px] border border-gray-400 rounded overflow-auto">
      <Box className="flex-1 p-4">
        <TextInput value={chatGPTResponse} onChange={setChatGPTResponse} />
      </Box>
      <Box className="flex justify-between items-center p-4">
        <TextInput
          value={userInput}
          onChange={setUserInput}
          placeholder="Type your message..."
        />
        <Button className="bg-blue-500 text-white" onClick={handleSendMessage}>
          Send
        </Button>
        <Button className="border border-blue-500 text-blue-500" onClick={handleRegenerate}>
          Regenerate
        </Button>
      </Box>
      <Box className="text-center text-xs p-2">
        ChatGPT may produce inaccurate information about people, places, or facts. Using {process.env.CHATGPT_MODEL}.
      </Box>
    </Box>
  );
};

export default AccessibleChat;
