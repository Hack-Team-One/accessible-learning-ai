import { useRecoilValue } from "recoil";
import {
  BgColorStateType,
  BorderColorStateType,
  bgColorState,
  borderColorState,
 } from "../states/colorState";
import {
  textColorState,
  TextColorStateType,
  contentScalingState,
  ContentScalingStateType,
  textFontState,
  TextFontStateType,
  fontSizeState,
  FontSizeStateType,
  lineHeightState,
  LineHeightStateType,
  letterSpacingState,
  LetterSpacingStateType,
 } from "../states/textState";

 export type DynamicStylingProps = {
  textFont?: TextFontStateType,
  textColor?: TextColorStateType,
  bgColor?: BgColorStateType,
  borderColor?: BorderColorStateType,
  contentScaling?: ContentScalingStateType,
  fontSize?: FontSizeStateType,
  lineHeight?: LineHeightStateType,
  letterSpacing?: LetterSpacingStateType,
}

 const useDynamicCSS = (): DynamicStylingProps => {
   const textFont = useRecoilValue<TextFontStateType>(textFontState);
   const textColor = useRecoilValue<TextColorStateType>(textColorState);
   const bgColor = useRecoilValue<BgColorStateType>(bgColorState);
   const borderColor = useRecoilValue<BorderColorStateType>(borderColorState);

   const contentScaling = useRecoilValue<ContentScalingStateType>(contentScalingState);
   const fontSize = useRecoilValue<FontSizeStateType>(fontSizeState);
   const lineHeight = useRecoilValue<LineHeightStateType>(lineHeightState);
   const letterSpacing = useRecoilValue<LetterSpacingStateType>(letterSpacingState);

     // Generate a textSize for each key that include dynamic states: font size, line height
  const textSizeKeys: string[] = Object.keys(fontSize).filter(key => key.startsWith('text_'));
  const textSize: Record<string, string> = {};
  textSizeKeys.forEach((key: string) => {
    const dynamicFontSize: number = Math.round(fontSize[key] * fontSize.multiplier);
    const dynamicLineHeight: number = Math.round(lineHeight[key] * lineHeight.multiplier);
    textSize[key] = `[${dynamicFontSize}px]/[${dynamicLineHeight}px]`;
  });
 
  return {
    textFont,
    textColor,
    bgColor,
    borderColor,
    contentScaling,
    fontSize,
    lineHeight,
    letterSpacing,
  };
 };
 
 export default useDynamicCSS;
 