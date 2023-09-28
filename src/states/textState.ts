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

export const fontSizeState = atom({
  key: 'fontSizeState',
  default: {
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


