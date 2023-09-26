import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, TextareaAutosize } from '@mui/base';
import TextInput from '../components/TextInput';
import {
  textColorState,
  textFontState,
  textSizeState,
} from '../states/textState';
import { bgColorState, borderColorState } from '../states/colorState';
import { sendMessageToChatGPT } from '../api/chatGPT';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';

const CHATGPT_MODEL = process.env.NEXT_PUBLIC_CHATGPT_MODEL || 'gpt-3.5-turbo';

const AccessibleChat: React.FC = () => {
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [borderColor, setBorderColor] = useRecoilState(borderColorState);
  const [textColor, setTextColor] = useRecoilState(textColorState);
  const [textFont, setTextFont] = useRecoilState(textFontState);
  const [textSize, setTextSize] = useRecoilState(textSizeState);

  const [userInput, setUserInput] = useState('');
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMessageToChatGPT(userInput);
      if (response) setChatGPTResponse(response);
      else setChatGPTResponse('Something went wrong. Please try again.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegenerate = async (e) => {
    handleSubmit(e);
  };
  

  return (
    <form className="h-screen w-full justify-center items-center mx-2 flex flex-col gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl" onSubmit={handleSubmit}>
      <div id="responseDiv" className="flex-1 w-full overflow-auto p-4">
        <TextareaAutosize 
          value={chatGPTResponse}
          onChange={(e) => setChatGPTResponse(e.target.value)}
          className={`text-${textColor.primary} w-full`}
        />
        {chatGPTResponse.length > 0 && <Button
          className={`text-${textColor.primary} bg-${bgColor.primary} border border-${borderColor.primary} float-right button-regenerate rounded-md p-1 `}
          disabled={userInput.trim().length < 3}
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
            className={`text-${textColor.primary} w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 pl-3 md:pl-4 overflow-y-auto`}
          />
          <Button
            className={`text-${textColor.primary} bg-${bgColor.secondary} button-send absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 transition-colors disabled:opacity-40`}
            disabled={userInput.trim().length < 3}
            type="submit"
            style={{ zIndex: 1 }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
      <p className={`text-gray-500 text-xs mb-3`}>
        ChatGPT may produce inaccurate information about people, places, or facts. <u>ChatGPT model: {CHATGPT_MODEL}</u>
      </p>
    </form>
  );
};

export default AccessibleChat;
