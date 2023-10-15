import { atom } from 'recoil';

export const defaultTextColorState = {
  primary: '#000000', // black
  secondary: '#FFFFFF', // white
  tertiary: '#0000FF', // blue
  code: '#FFFFFF', // white
  css:  '#FFA500', // orange
  titlePrimary: '#000000', // black
  titleSecondary: '#0000FF', // blue
};
export type TextColorStateType = typeof defaultTextColorState;

export const textColorState = atom<TextColorStateType>({
  key: 'textColorState',
  default: {...defaultTextColorState},
});

export const defaultBgColorState = {
  primary: '#FFFFFF', // white
  secondary: '#E5E4E2', // platinum gray 	rgb(229, 228, 226)
  tertiary: '#0000FF', // blue
  response: '#D3D3D3', // light gray rgb(211, 211, 211)
  code: '#000000', // black
  buttonPrimary: '#0000FF', // blue
  buttonSecondary: '#BF40BF', // Bright Purple rgb(191, 64, 191)
};
export type BgColorStateType = typeof defaultBgColorState;

export const bgColorState = atom<BgColorStateType>({
  key: 'bgColorPrimaryState',
  default: {...defaultBgColorState},
});

export const defaultBorderColorState = {
  primary: '#000000', // black
  secondary: '#0000FF', // blue
  tertiary: '#808080', // gray rgb(128, 128, 128)
};
export type BorderColorStateType = typeof defaultBorderColorState;

export const borderColorState = atom<BorderColorStateType>({
  key: 'borderColorPrimaryState',
  default: {...defaultBorderColorState},
});
