import { atom } from 'recoil';

export const defaultbgColorState = {
  primary: 'white',
  secondary: 'blue-900',
  tertiary: 'gray-100',
  response: 'gray-300',
  buttonPrimary: 'blue-500',
  buttonSecondary: 'purple',
};

export type BgColorStateType = typeof defaultbgColorState;

export const bgColorState = atom<BgColorStateType>({
  key: 'bgColorPrimaryState',
  default: {...defaultbgColorState},
});

export const defaultBorderColorState = {
  primary: 'black',
  secondary: 'blue',
  tertiary: 'gray',
};

export type BorderColorStateType = typeof defaultBorderColorState;

export const borderColorState = atom<BorderColorStateType>({
  key: 'borderColorPrimaryState',
  default: {...defaultBorderColorState},
});
