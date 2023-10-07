import React, { useState } from 'react';
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
import useDynamicStyling from '../../hooks/useDynamicStyling';
import { useTheme } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

const AccessibleChat: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Add "Loading ..." text for when loading is true
  // Space out paragraphs within the reponse
  // Make code appear differently and have copy feature
  // Check if lineHeight is being adjusted accurately
  // Check if downsizing is working properly
  // Check why letter spacing is off
  // Test github actions

  const {
    textFont,
    contentScaling,
    fontSize,
    lineHeight,
    letterSpacing,
  } = useDynamicStyling();

  const theme = useTheme();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    updatedMessages: Message[],
    includeUserInput: boolean = true
  ) => {
    e.preventDefault();

    setIsLoading(true);
    
    if (includeUserInput) {
      updatedMessages.push({ role: 'user', content: userInput });
    }

    validateMessages(updatedMessages);
  
    try {
      const response = await sendMessageToChatGPT(updatedMessages);
      setIsLoading(false);
      if (response) {
        setMessages([...updatedMessages, { role: 'system', content: response }]);
        setUserInput('');
      } else {
        setMessages([...updatedMessages, { role: 'system', content: 'Something went wrong. Please try again.' }]);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };  

  const handleRegenerate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const updatedMessages: Message[] = messages.slice(0, -1); // Remove last response

    setMessages(updatedMessages);

    handleSubmit(e as any, updatedMessages, false);
  };

  return (
    <FormContainer
      textFont={textFont}
      contentScaling={contentScaling}
      fontSize={fontSize}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      onSubmit={(e) => handleSubmit(e, messages)}
    >
      <ResponseDiv id="responseDiv" >
        {messages.map((message, index) => (
          <MessageDiv 
            key={index} 
            role={message.role}
            fontSize={fontSize}
          >
            {message.content}
          </MessageDiv>
        ))}
        {messages.length > 0 && !isLoading && (
          <RegenerateButton
            disabled={messages.length < 1}
            onClick={handleRegenerate}
          >
            <LoopIcon /> Regenerate
          </RegenerateButton>
        )}
        {isLoading && <CircularProgress style={{ marginLeft: '50%', marginRight: '50%' }}/>}
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
