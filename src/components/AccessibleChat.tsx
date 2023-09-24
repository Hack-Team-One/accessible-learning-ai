import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Input, Typography, Box } from '@mui/base';
import {
  textColorPrimaryState,
  textFontPrimaryState,
  textSizePrimaryState,
} from '../states/textState';
import { sendMessageToChatGPT } from '../api/chatGPT';

const CHATGPT_VERSION = process.env.NEXT_PUBLIC_CHATGPT_VERSION || 'Unknown Version';

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
    // For now, we'll just resend the same input. In a more advanced setup, you might want to adjust the prompt or parameters.
    handleSendMessage();
  };

  return (
    <Box display="flex" flexDirection="column" height="400px" border="1px solid gray" borderRadius="5px" overflow="auto">
      <Box flex="1" padding="16px">
        <Typography>{chatGPTResponse}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
        <Input
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
        <Button variant="outlined" color="primary" onClick={handleRegenerate}>
          Regenerate
        </Button>
      </Box>
      <Typography variant="caption" align="center">
        ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT {CHATGPT_VERSION}
      </Typography>
    </Box>
  );
};

export default AccessibleChat;
