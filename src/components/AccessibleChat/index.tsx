import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { sendMessageToChatGPT, CHATGPT_MODEL } from '../../utils';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import { Message } from '../../types';
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

// Styling
// import styled from '@emotion/styled';
// import { css } from '@emotion/react';
// import { Button as MUIButton, TextareaAutosize } from '@mui/base';
import useDynamicStyling, { DynamicStylingProps } from '../../hooks/useDynamicStyling';

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

// Emotion styled components that accept dynamic values as props

// export const FormContainer = styled.form<DynamicStylingProps>`
//   height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   padding: 0.5rem;
//   justify-content: center;
//   align-items: center;
//   font-family: ${props => props?.textFont?.primary};
//   @media (min-width: 768px) {
//     padding: 1rem;
//   }
//   @media (min-width: 1024px) {
//     max-width: 42rem;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   @media (min-width: 1280px) {
//     max-width: 48rem;
//   }
// `;

// export const ResponseDiv = styled.div`
//   flex: 1;
//   width: 100%;
//   border: 1px solid ${(props) => props.theme.palette.border.primary};
//   overflow: auto;
//   padding: 1rem;
//   border-radius: 0.375rem;
//   background-color: ${(props) => props.theme.palette.background.default};
// `;

// export const MessageDiv = styled.div<DynamicStylingProps>`
//   font-size: ${(props) => props?.fontSize?.text_base};
//   line-height: ${(props) => props?.lineHeight?.text_base};
//   color: ${(props) => (props.role === 'user' ? 'inherit' : props.theme.palette.text.primary)};
//   background-color: ${(props) => (props.role === 'user' ? 'transparent' : props.theme.palette.background.response)};
// `;

// export const PromptDiv = styled.div<DynamicStylingProps>`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;
// `;

// export const TextareaContainer = styled.div<DynamicStylingProps>`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   position: relative;
//   border: 1px solid rgba(0, 0, 0, 0.1);
//   border-radius: 0.375rem;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// `;

// export const TextareaPrompt = styled(TextareaAutosize)<DynamicStylingProps>`
//   color: ${props => props?.textColor?.primary};
//   width: 100%;
//   resize: none;
//   border: none;
//   background-color: transparent;
//   padding: 0.625rem 2.5rem 0.625rem 0.75rem;
//   overflow-y: auto;
//   &::placeholder {
//     color: rgba(107, 114, 128, 1);
//   }
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// export const RegenerateButton = styled(MUIButton)<DynamicStylingProps>`
//   color: ${(props) => props.theme.palette.text.primary};
//   background-color: ${(props) => props.theme.palette.background.buttonPrimary};
//   border: 1px solid ${props => props?.borderColor?.primary};
//   border-radius: 0.375rem;
//   padding: 0.25rem;
//   position: relative;
//   right: 50%;
//   transform: translateX(50%);
//   z-index: 1;
// `;

// export const SendButton = styled(MUIButton)<DynamicStylingProps>`
// color: ${(props) => props.theme.palette.text.tertiary};
//   background-color: ${(props) => props.theme.palette.background.buttonSecondary};
//   position: absolute;
//   padding: 0.25rem;
//   min-width: 7.5rem;
//   bottom: 0.75rem;
//   right: 0.75rem;
//   z-index: 1;
//   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
//   &:disabled {
//     opacity: 0.4;
//   }
// `;

// export const InfoText = styled.p<DynamicStylingProps>`
//   font-size: ${props => props?.fontSize?.text_xs}px;
//   color: rgba(107, 114, 128, 1);
//   margin-bottom: 0.75rem;
// `;

