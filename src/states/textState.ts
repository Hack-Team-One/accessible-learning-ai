import { atom } from 'recoil';
import { FontNames } from '@/utils/enums';

export const defaultTextFontState = { 
  primary: FontNames.Arial,
  secondary: FontNames.Arial,
  tertiary: FontNames.Arial,
  titlePrimary: FontNames.Arial,
  titleSecondary: FontNames.Arial,
};
export type TextFontStateType = typeof defaultTextFontState;

export const textFontState = atom<TextFontStateType>({
  key: 'textFontState',
  default: {...defaultTextFontState},
});

export const defaultContentScalingState = {
  multiplier: 1,
  text_xs: 0,
  text_sm: 0,
  text_base: 0,
  text_lg: 0,
  text_xl: 0,
  text_2xl: 0,
  text_3xl: 0,
  text_4xl: 0,
  text_5xl: 0,
  text_6xl: 0,
  text_7xl: 0,
  text_8xl: 0,
  text_9xl: 0,
  titlePrimary: 0, // adjust these initial values to match figma design
  titleSecondary: 0, // adjust these initial values to match figma design
};
export type ContentScalingStateType = typeof defaultContentScalingState;

export const contentScalingState = atom<ContentScalingStateType>({
  key: 'contentScalingState',
  default: {...defaultContentScalingState},
});

export const defaultFontSizeState = {
  multiplier: 1,
  text_xs: 12,
  text_sm: 14,
  text_base: 16, // WCAG 2.1 recommended font size for body text
  text_lg: 18,
  text_xl: 20,
  text_2xl: 24,
  text_3xl: 30,
  text_4xl: 36,
  text_5xl: 48,
  text_6xl: 60,
  text_7xl: 72,
  text_8xl: 96,
  text_9xl: 128,
  titlePrimary: 48, // adjust these initial values to match figma design
  titleSecondary: 60, // adjust these initial values to match figma design
};
export type FontSizeStateType = typeof defaultFontSizeState;

export const fontSizeState = atom<FontSizeStateType>({
  key: 'fontSizeState',
  default: {...defaultFontSizeState},
});

export const defaultLineHeightState = {
  multiplier: 1,
  text_xs: 16,
  text_sm: 20,
  text_base: 24,
  text_lg: 28,
  text_xl: 28,
  text_2xl: 32,
  text_3xl: 36,
  text_4xl: 40,
  text_5xl: 48,
  text_6xl: 60,
  text_7xl: 72,
  text_8xl: 96,
  text_9xl: 128,
  titlePrimary: 48, // adjust these initial values to match figma design
  titleSecondary: 60, // adjust these initial values to match figma design
};
export type LineHeightStateType = typeof defaultLineHeightState;

export const lineHeightState = atom<LineHeightStateType>({
  key: 'lineHeightState',
  default: {...defaultLineHeightState},
});

export const defaultLetterSpacingState = {
  multiplier: 1,
  text_xs: 0.01, // em
  text_sm: 0.01, // em
  text_base: 0.01, // em
  text_lg: 0.02, // em
  text_xl: 0.02, // em
  text_2xl: 0.03, // em
  text_3xl: 0.03, // em
  text_4xl: 0.04, // em
  text_5xl: 0.05, // em
  text_6xl: 0.06, // em
  text_7xl: 0.07, // em
  text_8xl: 0.08, // em
  text_9xl: 0.08, // em
  titlePrimary: 0.03, // em (adjust based on design)
  titleSecondary: 0.04, // em (adjust based on design)
};
export type LetterSpacingStateType = typeof defaultLetterSpacingState;

export const letterSpacingState = atom<LetterSpacingStateType>({
  key: 'letterSpacingState',
  default: {...defaultLetterSpacingState},
});
