import { useRecoilValue } from "recoil";
import {
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
  defaultFontSizeState,
 } from "../states/textState";

 export type DynamicStylingProps = {
  textFont?: TextFontStateType,
  contentScaling?: ContentScalingStateType,
  fontSize?: FontSizeStateType,
  lineHeight?: LineHeightStateType,
  letterSpacing?: LetterSpacingStateType,
}

 const useDynamicCSS = () => {
   const textFont = useRecoilValue<TextFontStateType>(textFontState);
   const contentScaling = useRecoilValue<ContentScalingStateType>(contentScalingState);
   const fontSize = useRecoilValue<FontSizeStateType>(fontSizeState) || defaultFontSizeState;
   const lineHeight = useRecoilValue<LineHeightStateType>(lineHeightState);
   const letterSpacing = useRecoilValue<LetterSpacingStateType>(letterSpacingState);
 
  return {
    textFont,
    contentScaling,
    fontSize,
    lineHeight,
    letterSpacing,
  };
 };
 
 export default useDynamicCSS;
 