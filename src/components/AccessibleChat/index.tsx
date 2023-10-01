import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button as MUIButton, TextareaAutosize } from '@mui/base';
import { sendMessageToChatGPT, CHATGPT_MODEL } from '../../utils';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import { Message } from '../../types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useDynamicStyling from '../../hooks/useDynamicStyling';
import { validateMessages } from '../../utils/validation';
import {
  FormContainer,
  ResponseDiv,
  MessageDiv,
  RegenerateButton,
  PromptDiv,
  TextareaContainer,
  TextareaPrompt,
  SendButton,
  InfoText,
} from './styles';

const AccessibleChat: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // Maintains conversation history

  const {
    textFont,
    contentScaling,
    fontSize,
    lineHeight,
    letterSpacing,
  } = useDynamicStyling();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, includeUserInput: boolean = true) => {
    e.preventDefault();
    
    let newMessages = [...messages];
    if (includeUserInput) {
      newMessages.push({ role: 'user', content: userInput });
    }

    validateMessages(newMessages);
  
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

  console.log('ACCESS CHAT FONTSIZE = ', fontSize)

  return (
    <FormContainer 
      textFont={textFont}
      contentScaling={contentScaling}
      fontSize={fontSize}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      onSubmit={handleSubmit}
    >
      <ResponseDiv id="responseDiv" >
        {messages.map((message, index) => (
          <MessageDiv 
            key={index} 
            role={message.role}
            fontSize={fontSize}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
          >
            {message.content}
          </MessageDiv>
        ))}
        {messages.length > 0 && (
          <RegenerateButton
            disabled={messages.length < 1}
            onClick={handleRegenerate}
          >
            <LoopIcon /> Regenerate
          </RegenerateButton>
        )}
      </ResponseDiv>
      <PromptDiv id="promptDiv">
        <TextareaContainer>
          <TextareaPrompt
            id="prompt-textarea"
            value={userInput}
            maxRows={10}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Send a message..."
          />
          <SendButton
            disabled={userInput.trim().length < 2}
            type="submit"
          >
            <SendIcon />
          </SendButton>
        </TextareaContainer>
      </PromptDiv>
      <InfoText fontSize={fontSize}>
        ChatGPT may produce inaccurate information about people, places, or facts. <u>ChatGPT model: {CHATGPT_MODEL}</u>
      </InfoText>
    </FormContainer>
  );  
};

export default AccessibleChat;
