import { useRecoilValue } from "recoil";
import {
  bgColorState,
  borderColorState,
 } from "@/states/colorState";
import {
  textColorState,
  textFontState,
  fontSizeState,
  lineHeightState, 
 } from "@/states/textState";

export default function useDynamicStyles() {
  const textColor = useRecoilValue(textColorState);
  const bgColor = useRecoilValue(bgColorState);
  const borderColor = useRecoilValue(borderColorState);
  const fontSize = useRecoilValue(fontSizeState);
  const lineHeight = useRecoilValue(lineHeightState);

    // Generate textSize styles for each key
    const textSizeKeys = Object.keys(fontSize).filter(key => key.startsWith('text_'));
    const textSizeStyles = {};
    textSizeKeys.forEach(key => {
      textSizeStyles[key] = `text-[${fontSize[key]}px]/[${lineHeight[key]}px]`;
    });

  const textStyles = {
    'primary': `text-${textColor.primary}`,
    'secondary': `text-${textColor.secondary}`,
  };
  const bgStyles = {
    'primary': `bg-${bgColor.primary}`,
    'secondary': `bg-${bgColor.secondary}`,
    'buttonPrimary': `bg-${bgColor.buttonPrimary}`,
    'buttonSecondary': `bg-${bgColor.buttonSecondary}`,
  };
  const borderStyles = {
    'primary': `border border-${borderColor.primary} rounded-md`,
    'secondary': `border border-${borderColor.secondary} rounded-md`,
  };

  return {
    textColor,
    bgColor,
    borderColor,
    textStyles,
    bgStyles,
    borderStyles,
  };
}
