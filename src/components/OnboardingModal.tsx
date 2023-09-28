import React, { useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, TextareaAutosize } from '@mui/base';
import { sendMessageToChatGPT } from '../api/chatGPT';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import useDynamicStyles from '@/hooks/useDynamicStyles';
import TextInput from './TextInput';

const OnboardingModal: React.FC = () => {
  // const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [userInput, setUserInput] = useState('');
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  const {
    textColor,
    textFont,
    textSize,
    textStyles,
    bgStyles,
    borderStyles,
  } = useDynamicStyles();



// function OnboardingModal({
//   classes, open, setOpen, children, right, y, title, content,
// }) {
  const targetElement = document.getElementById(mainContentDiv);
  const infoBoxRef = React.createRef(null);
  const [infoBoxDimensions, setInfoBoxDimensions] = React.useState({ x: 0, y });
  const headerElement = document.getElementById('header')?.getBoundingClientRect()?.height || 0;
  useLayoutEffect(() => {
    if (infoBoxRef.current) {
      setInfoBoxDimensions({ x: right + 50, y: y - (infoBoxRef.current.getBoundingClientRect().height / 2) + headerElement });
    }
  }, [right, y]);
  return Number.isInteger(open) && targetElement
    ? ReactDOM.createPortal(
      <div className={classes.wrapper}>
        {children}
        <div className={classes.container} ref={infoBoxRef} style={{ top: infoBoxDimensions.y, left: infoBoxDimensions.x }}>
          <TextInput className={`${textStyles.primary}`}>
            {title}
          </TextInput>
          <TextInput className={`${textStyles.primary}`}>
            {content}
          </TextInput>
          <Button className={classes.button} onClick={() => setOpen()}>
            Next
          </Button>
        </div>
      </div>,
      targetElement,
    )
    : null;
}

  

//   return (
//     <form className="h-screen w-full justify-center items-center mx-2 flex flex-col gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl" onSubmit={handleSubmit}>
//       <div id="responseDiv" className="flex-1 w-full overflow-auto p-4">
//         <TextareaAutosize 
//           value={chatGPTResponse}
//           onChange={(e) => setChatGPTResponse(e.target.value)}
//           className={`text-${textColor.primary} w-full`}
//         />
//         {chatGPTResponse.length > 0 && <Button
//           className={`text-${textColor.primary} bg-${bgColor.primary} border border-${borderColor.primary} float-right button-regenerate rounded-md p-1 `}
//           disabled={userInput.trim().length < 3}
//           onClick={handleRegenerate}
//           style={{ zIndex: 1 }}
//         >
//           <LoopIcon /> Regenerate
//         </Button>}
//       </div>
//       <div id="promptDiv" className="flex w-full justify-center items-center gap-3">
//         <div className="flex flex-col w-full relative border border-black/10 dark:border-gray-900/50 dark:text-white rounded-xl shadow-xs dark:shadow-xs dark:bg-gray-700 bg-white">
//           <TextareaAutosize
//             id="prompt-textarea"
//             value={userInput}
//             maxRows={10}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="Send a message..."
//             className={`text-${textColor.primary} w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 pl-3 md:pl-4 overflow-y-auto`}
//           />
//           <Button
//             className={`text-${textColor.primary} bg-${bgColor.secondary} button-send absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 transition-colors disabled:opacity-40`}
//             disabled={userInput.trim().length < 3}
//             type="submit"
//             style={{ zIndex: 1 }}
//           >
//             <SendIcon />
//           </Button>
//         </div>
//       </div>
//       <p className={`text-gray-500 text-xs mb-3`}>
//         ChatGPT may produce inaccurate information about people, places, or facts. <u>ChatGPT model: {CHATGPT_MODEL}</u>
//       </p>
//     </form>
//   );
// };

export default OnboardingModal;
