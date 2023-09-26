import { atom } from 'recoil';

export const textColorState = atom({
  key: 'textColorState',
  default: {
    primary: 'black',
    secondary: 'blue',
  }
});

export const textFontState = atom({
  key: 'textFontState',
  default: { 
    primary: 'Arial',
  }
});

export const textSizeState = atom({
  key: 'textSizeState',
  default: {
    primary: '12px',
  }
});


