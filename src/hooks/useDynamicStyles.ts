import { useRecoilValue } from "recoil";
import {
  bgColorState,
  borderColorState,
 } from "../states/colorState";
import {
  textColorState,
  textFontState,
  fontSizeState,
  lineHeightState, 
 } from "../states/textState";
 import { FontNames } from "../utils/enums";

export default function useDynamicStyles() {
  const textFont: Record<string, FontNames> = useRecoilValue(textFontState);
  const fontSize: Record<string, number> = useRecoilValue(fontSizeState);
  const lineHeight: Record<string, number> = useRecoilValue(lineHeightState);

  const textColor: Record<string, string> = useRecoilValue(textColorState);

  const bgColor: Record<string, string> = useRecoilValue(bgColorState);
  const borderColor: Record<string, string> = useRecoilValue(borderColorState);


  // Generate a textSize for each key that include dynamic states: font size, line height
  const textSizeKeys: string[] = Object.keys(fontSize).filter(key => key.startsWith('text_'));
  const textSize: Record<string, string> = {};
  textSizeKeys.forEach((key: string) => {
    textSize[key] = `text-[${fontSize[key]}px]/[${lineHeight[key]}px]`;
  });

  // Group the text color, size, and font into a single class
  const textStyles = {
    'primary': `text-${textColor.primary} ${textSize.text_base} font-${textFont.primary}}`,
    'secondary': `text-${textColor.secondary} ${textSize.text_base} font-${textFont.primary}}`,
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
    textFont,
    textSize,
    textColor,
    bgColor,
    borderColor,
    textStyles,
    bgStyles,
    borderStyles,
  };
}
