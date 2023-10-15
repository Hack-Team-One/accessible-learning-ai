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
  LoadingAnimation,
  CodeDiv,
  CodeDivHeader,
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
  // Add icons next to user and system messages

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

  function copyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  } 

  function findCodeType(text: string) {
    const codeTypeAbbreviation = text.slice(3, 6);
    if (codeTypeAbbreviation === 'jsx') return 'JavaScript';
    if (codeTypeAbbreviation === 'tsx') return 'TypeScript';
    if (codeTypeAbbreviation === 'css') return 'CSS';
    return '';
  }

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
            content={message.content}
          >
            {message.content.split('\n').map((line, idx) => (
              message.content.startsWith('```') && message.content.endsWith('```') ? 
              <CodeDiv key={idx} content={message.content}>
                <CodeDivHeader>
                  <p>{findCodeType(message.content)}</p>
                  <button onClick={() => copyToClipboard(line.slice(6, -3))}>Copy to Clipboard</button>
                </CodeDivHeader>
                <p key={idx} style={{ margin: "0.5em 0" }}>{line}</p>
              </CodeDiv>
              :
              <p key={idx} style={{ margin: "0.5em 0" }}>{line}</p>
            ))}
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
        {isLoading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSize.text_xl}px`}}
          >
            <br />
            <p>Loading...</p>
            <br />
            <CircularProgress />
          </div>
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
            {isLoading ? <LoadingAnimation fontSize={fontSize} /> : <SendIcon />}
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
