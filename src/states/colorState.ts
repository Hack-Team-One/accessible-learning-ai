import { atom } from 'recoil';

export const bgColorState = atom({
  key: 'bgColorPrimaryState',
  default: {
    primary: 'blue-900',
    secondary: 'purple',
  },
});

export const borderColorState = atom({
  key: 'borderColorPrimaryState',
  default: {
    primary: 'black',
    secondary: 'blue',
  },
});
