

import React from 'react';
import { useRecoilState } from 'recoil';
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

  const handleSendMessage = async () => {
      try {
      const response = await sendMessageToChatGPT('Hello, ChatGPT!');
      console.log('Response from ChatGPT:', response);
      } catch (error) {
      console.error('Error:', error);
      }
  };

  return (
    <div>
      {/* We could display the chatGPT UI here */}
    </div>
  );
};

export default AccessibleChat;