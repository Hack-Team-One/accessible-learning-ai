import { atom } from 'recoil';
import { FontNames } from '@/utils/enums';

export const textColorState = atom({
  key: 'textColorState',
  default: {
    primary: 'black',
    secondary: 'blue',
    tertiary: 'red',
    titlePrimary: 'black',
    titleSecondary: 'blue',
  }
});



export const textFontState = atom({
  key: 'textFontState',
  default: { 
    primary: FontNames.Arial,
    secondary: FontNames.Arial,
    tertiary: FontNames.Arial,
    titlePrimary: FontNames.Arial,
    titleSecondary: FontNames.Arial,
  }
});

export type fontSizeStateType = {
  multiplier: number;
  text_xs: number;
  text_sm: number;
  text_base: number;
  text_lg: number;
  text_xl: number;
  text_2xl: number;
  text_3xl: number;
  text_4xl: number;
  text_5xl: number;
  text_6xl: number;
  text_7xl: number;
  text_8xl: number;
  text_9xl: number;
  titlePrimary: number;
  titleSecondary: number;
};

export const fontSizeState = atom<fontSizeStateType>({
  key: 'fontSizeState',
  default: {
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
  }
});

export const lineHeightState = atom({
  key: 'lineHeightState',
  default: {
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
  }
});


