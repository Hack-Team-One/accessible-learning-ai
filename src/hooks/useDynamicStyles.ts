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
    const dynamicFontSize: number = Math.round(fontSize[key] * fontSize.multiplier);
    const dynamicLineHeight: number = Math.round(lineHeight[key] * lineHeight.multiplier);
    textSize[key] = `[${dynamicFontSize}px]/[${dynamicLineHeight}px]`;
  });

  // leading-none: line-height: 1;
  // leading-tight: line-height: 1.25;
  // leading-snug: line-height: 1.375;
  // leading-normal: line-height: 1.5;
  // leading-relaxed: line-height: 1.625;
  // leading-loose: line-height: 2;

  // Group the text color, size, and font into a single class
  const textStyles = {
    'primary': `text-${textColor.primary} text-${textSize.text_base} font-${textFont.primary}`,
    'secondary': `text-${textColor.secondary} text-${textSize.text_base} font-${textFont.primary}`,
    'prompt': `text-${textColor.primary} text-${textSize.text_base} font-${textFont.primary} leading-relaxed`, // TODO: make LH dynamic
    'response': `text-${textColor.primary} text-${textSize.text_base} font-${textFont.primary} leading-relaxed`, // TODO: make LH dynamic
  };
  const bgStyles = {
    'primary': `bg-${bgColor.primary}`,
    'secondary': `bg-${bgColor.secondary}`,
    'tertiary': `bg-${bgColor.tertiary}`,
    'response': `bg-${bgColor.response}`,
    'buttonPrimary': `bg-${bgColor.buttonPrimary}`,
    'buttonSecondary': `bg-${bgColor.buttonSecondary}`,
  };
  const borderStyles = {
    'primary': `border border-${borderColor.primary} rounded-md`,
    'secondary': `border border-${borderColor.secondary} rounded-md`,
  };

  console.log('textStyles:', textStyles);

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
