import { atom } from 'recoil';
import { FontNames } from '../utils/enums';

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

const defaultFontState = { 
  primary: FontNames.Arial,
  secondary: FontNames.Arial,
  tertiary: FontNames.Arial,
  titlePrimary: FontNames.Arial,
  titleSecondary: FontNames.Arial,
};
export type FontStateType = typeof defaultFontState;

export const textFontState = atom<FontStateType>({
  key: 'textFontState',
  default: {...defaultFontState},
});

export const defaultFontSizeState = {
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
export type LetterSpacingStateType = typeof defaultLetterSpacingState;

export const letterSpacingState = atom<LetterSpacingStateType>({
  key: 'letterSpacingState',
  default: {...defaultLetterSpacingState},
});
