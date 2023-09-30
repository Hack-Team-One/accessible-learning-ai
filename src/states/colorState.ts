import { atom } from 'recoil';

export const bgColorState = atom({
  key: 'bgColorPrimaryState',
  default: {
    primary: 'white',
    secondary: 'blue-900',
    tertiary: 'gray-100',
    response: 'gray-300',
    buttonPrimary: 'blue-500',
    buttonSecondary: 'purple',
  },
});

export const borderColorState = atom({
  key: 'borderColorPrimaryState',
  default: {
    primary: 'black',
    secondary: 'blue',
    tertiary: 'gray',
  },
});
