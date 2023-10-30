import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button as MUIButton, TextareaAutosize } from '@mui/base';
import { DynamicStylingProps } from '../../hooks/useDynamicStyling';

// Emotion styled components that accept dynamic values as props

export const FormContainer = styled.form<DynamicStylingProps>`
  font-size: ${(props) => props?.fontSize?.text_base}px;
  line-height: ${(props) => props?.lineHeight?.text_base}px;
  letter-spacing: ${(props) => props?.letterSpacing?.text_base}em;
  height: calc(100vh - ${(props) => props?.lineHeight?.text_7xl}px);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  font-family: ${props => props?.textFont?.primary};
  @media (min-width: 768px) {
    padding: 1rem;
  }
  @media (min-width: 1024px) {
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 1280px) {
    max-width: 48rem;
  }
`;

// border: 1px solid ${(props) => props.theme.palette.border.primary};
// background-color: ${(props) => props.theme.palette.background.default};
export const ResponseDiv = styled.div`
  flex: 1;
  width: 100%;
  // border: 1px solid ${(props) => props.theme.palette.primary.main}; // May need to edit this
  // border-radius: 0.375rem;
  overflow-y: auto;
  // background-color: ${(props) => props.theme.palette.custom.background.primary};
`;

export const MessageDiv = styled.div<DynamicStylingProps>`
  font-size: ${(props) => props?.fontSize?.text_base}px;
  color: ${(props) => (props.role === 'user' ? 'inherit' : props.theme.palette.text.primary)};
  background-color: ${(props) => (props.role === 'user' ? 'transparent' : props.theme.palette.custom.background.secondary)};
  margin-top: 20px;
`;

export const CodeDiv = styled.div<DynamicStylingProps>`
  background-color: ${props => props.theme.palette.custom.background.code};
  color: ${props => 
    props.content?.slice(3, 6) === 'css'
      ? props.theme.palette.custom.text.css
      : props.theme.palette.custom.text.code
  };
  padding: 1em;
  border-radius: 0.375rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CodeDivHeader = styled.div<DynamicStylingProps>`
  display: flex;
  justify-content: space-between;
  background-color: #808080; // gray
  padding: 0.5em;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
`;

export const PromptDiv = styled.div<DynamicStylingProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const TextareaContainer = styled.div<DynamicStylingProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const TextareaPrompt = styled(TextareaAutosize)<DynamicStylingProps>`
  color: ${(props) => props.theme.palette.text.primary};
  width: 100%;
  resize: none;
  border: none;
  background-color: transparent;
  padding: 0.625rem 2.5rem 0.625rem 0.75rem;
  overflow-y: auto;
  &::placeholder {
    color: rgba(107, 114, 128, 1);
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const RegenerateButton = styled(MUIButton)<DynamicStylingProps>`
  color: ${(props) => props.theme.palette.text.primary};
  background-color: ${(props) => props.theme.palette.custom.background.primary};
  border: 1px solid ${props => props?.borderColor?.primary};
  border-radius: 0.375rem;
  padding: 0.25rem;
  margin: 1rem;
  position: relative;
  float: right;
  z-index: 1;
`;

export const SendButton = styled(MUIButton)<DynamicStylingProps>`
  color: ${(props) => props.theme.palette.text.primary};
  // background-color: ${(props) => props.theme.palette.custom.background.buttonSecondary};
  background-color: '#007FFF';
  position: absolute;
  padding: 0.25rem;
  min-width: 7.5rem;
  bottom: 0.4rem;
  right: 0.75rem;
  z-index: 1;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  &:disabled {
    opacity: 0.4;
  }
`;

export const InfoText = styled.p<DynamicStylingProps>`
  font-size: ${props => props?.fontSize?.text_xs}px;
  color: rgba(107, 114, 128, 1);
  margin-bottom: 1rem;
`;

export const LoadingAnimation = styled.div<DynamicStylingProps>`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${props => props?.fontSize?.text_xl}px;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
    100% {
      content: "";
    }
  }
`;

